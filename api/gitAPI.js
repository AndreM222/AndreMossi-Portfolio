import axios from 'axios'

const gitUserApi = axios.create({
    baseURL: 'https://api.github.com/users/AndreM222'
})

export const fetchAPI = async (page, per_page, extraParams = {}) => {
    let { data } = await gitUserApi.get('repos', {
        headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
        params: { per_page: per_page, page: page, ...extraParams }
    })

    return data
}

export const fetchStats = async () => {
    const max = 100
    let page = 1

    const stats = {
        totalStars: 0,
        totalRepos: 1,
        totalAwards: 2,
        totalForks: 0
    }

    while (true) {
        try {
            let fetchVal = await fetchAPI(page, max)

            fetchVal.map(item => {
                stats.totalStars += item.stargazers_count
                stats.totalRepos++
                stats.totalForks += item.fork
            })

            if (!fetchVal || fetchVal.length < max) break

            page++
        } catch (error) {
            console.log(error)
            break
        }
    }

    return stats
}

export const fetchTopRepos = async () => {
    try {
        const { data } = await axios.get(
            'https://api.github.com/search/repositories',
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                },
                params: {
                    q: 'user:AndreM222 fork:false',
                    sort: 'stars',
                    order: 'desc',
                    per_page: 3
                }
            }
        )

        return data.items.map(repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            url: repo.html_url,
            language: repo.language,
            forks: repo.forks_count,
            licence: repo.license?.name || 'None'
        }))
    } catch (error) {
        console.log(error)
        return []
    }
}

export const fetchPinRepos = async () => {
    try {
        const query = {
            query: `
            {
              user(login: "AndreM222") {
                pinnedItems(first: 6, types: REPOSITORY) {
                  nodes {
                    ... on Repository {
                      name
                      description
                      stargazerCount
                      forkCount
                      url
                      primaryLanguage {
                        name
                      }
                      licenseInfo {
                        name
                      }
                    }
                  }
                }
              }
            }
            `
        }

        const { data } = await axios.post(
            'https://api.github.com/graphql',
            query,
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                }
            }
        )

        let repos = data.data.user.pinnedItems.nodes.map(repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazerCount,
            url: repo.url,
            language: repo.primaryLanguage?.name || 'Unknown',
            forks: repo.forkCount,
            licence: repo.licenseInfo?.name || 'None'
        }))

        repos.sort((a, b) => b.stars - a.stars)

        return repos
    } catch (error) {
        console.log(error)
        return []
    }
}

export const fetchRecentCommits = async (limit = 25) => {
    try {
        const repos = await fetchAPI(1, 100)

        const commits = await Promise.all(
            repos.slice(0, 10).map(async repo => {
                try {
                    const { data } = await gitUserApi.get(
                        `repos/${repo.name}/commits`,
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                            },
                            params: {
                                per_page: 1,
                                sort: 'created',
                                direction: 'desc'
                            }
                        }
                    )
                    return { ...data[0], repo: repo.name }
                } catch {
                    return null
                }
            })
        )

        return commits
            .filter(Boolean)
            .sort(
                (a, b) =>
                    new Date(b.commit.author.date) -
                    new Date(a.commit.author.date)
            )
            .slice(0, limit)
    } catch (error) {
        console.error('Fetch commits failed:', error)
        return []
    }
}

export const parseCommitForNews = commit => {
    const message = commit.commit.message
    const match = message.match(/^(\w+)(?:\(([^)]+)\))?: (.+)/i)
    console.log('⚡ REGEX MATCH:', match)

    if (match) {
        const [, type, scope, summary] = match
        console.log('✅ PARSED:', { type, scope, summary })
        return {
            id: commit.sha,
            type: type.toLowerCase(),
            category: getCategory(type.toLowerCase()),
            date: new Date(commit.commit.author.date)
                .toISOString()
                .split('T')[0],
            title: scope || type,
            summary: summary,
            description: commit.commit.message
                .split('\n')
                .slice(1)
                .join('\n')
                .trim(),
            branch: commit.commit.committer.name,
            commit: commit.sha.slice(-7),
            goldGlow: type.toLowerCase() === 'feat',
            repo: commit.repo || 'unknown'
        }
    } else {
        console.log('❌ NO MATCH - using chore')
    }

    return {
        id: commit.sha,
        type: 'chore',
        category: 'developer',
        date: new Date(commit.commit.author.date).toISOString().split('T')[0],
        title: 'Update',
        summary: commit.commit.message.split('\n')[0],
        description: commit.commit.message,
        branch: commit.commit.committer.name,
        commit: commit.sha.slice(-7),
        goldGlow: false,
        repo: commit.repo
    }
}

function getCategory(type) {
    const mapping = {
        feat: 'developer',
        fix: 'developer',
        perf: 'developer',
        refactor: 'developer',
        docs: 'developer',
        style: 'developer',
        chore: 'developer',
        intern: 'experience',
        research: 'experience',
        awards: 'experience',
        projects: 'experience',
        timeline: 'general',
        about: 'general',
        'resume-en': 'resume',
        'resume-es': 'resume',
        'resume-jp': 'resume'
    }
    return mapping[type] || 'developer'
}

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

export const fetchRecentCommits = async () => {
    try {
        const { data } = await gitUserApi.get('/events')

        const commits = []

        for (const event of data) {
            if (event.type === 'PushEvent') {
                const repoName = event.repo.name
                const commitSha = event.payload.head

                const commitRes = await axios.get(
                    `https://api.github.com/repos/${repoName}/commits/${commitSha}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                        }
                    }
                )

                commits.push({
                    repo: repoName,
                    message: commitRes.data.commit.message,
                    url: commitRes.data.html_url,
                    date: commitRes.data.commit.author.date
                })
            }
        }
        return commits.slice(0, 5)
    } catch (error) {
        console.error('Fetch commits failed:', error)
        return []
    }
}

export const parseCommitForNews = commit => {
    if (!commit || !commit.message) return null

    const firstLine = commit.message.split('\n')[0]

    const match = firstLine.match(/^(\w+)(?:\(([^)]+)\))?: (.+)/i)

    const type = match ? match[1].toLowerCase() : 'chore'
    const scope = match ? match[2] : null
    const summary = match ? match[3] : firstLine

    return {
        id: commit.url,
        type,
        category: 'developer',
        date: commit.date.split('T')[0],
        title: scope || type,
        summary,
        description: commit.message.split('\n').slice(1).join('\n').trim(),
        branch: commit.repo,
        commit: commit.url.slice(-7),
        repo: commit.repo
    }
}

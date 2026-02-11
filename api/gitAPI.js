import axios from 'axios'

const gitApi = axios.create({
    baseURL: 'https://api.github.com/users/AndreM222'
})

export const fetchAPI = async (page, per_page, extraParams = {}) => {
    let { data } = await gitApi.get("repos", {
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
            "https://api.github.com/search/repositories",
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
                },
                params: {
                    q: "user:AndreM222 fork:false",
                    sort: "stars",
                    order: "desc",
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
            licence: repo.license?.name || "None"
        }))

    } catch (error) {
        console.log(error)
        return []
    }
}

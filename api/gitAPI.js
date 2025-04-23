import axios from 'axios'

const gitApi = axios.create({
  baseURL: "https://api.github.com/users/AndreM222"
})

export const fetchAPI = async (page, per_page) => {

    let { data } = await gitApi.get("repos", {
        headers: { Authorization: process.env.NEXT_PUBLIC_GITHUB_TOKEN },
        params: { per_page: per_page, page: page }
    })

    return data
}

export const fetchStats = async () => {
    const max = 100
    let page = 1;

    const stats = {
        totalStars: 0,
        totalRepos: 1,
        totalAwards: 2
    }

    while(true){

        try {
            let fetchVal = await fetchAPI(page, max)

            fetchVal.map(item => {
                stats.totalStars += item.stargazers_count
                stats.totalRepos++
            })


            if(!fetchVal || fetchVal.length < max) break;

            page++
        } catch (error) {
            console.log(error)
            break
        }
    }

    return stats
}

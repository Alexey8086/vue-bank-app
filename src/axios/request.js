import axios from 'axios'
import router from '@/router'

const requestAxios = axios.create({
    baseURL: process.env.VUE_APP_FB_URL
})

requestAxios.interceptors.response.use(null, (e) => {
    if (e.response.status === 404) {
        router.push('/auth?message=auth')
    }

    return Promise.reject(e)
})

export default requestAxios
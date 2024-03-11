import axios from 'axios'

const managementApi = axios.create({
    baseURL: '/api',
})

export default managementApi

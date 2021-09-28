import axios from 'axios'

export const HTTP = axios.create({
    baseURL: 'http://167.172.170.251:1000/api',
})
import axios from 'axios'

export default axios.create({
    baseURL: process.env.API_BASE_PATH,
    headers: {
        'Content-Type': 'application/json',
    },
})
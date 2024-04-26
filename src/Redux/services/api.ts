import axios from "axios";
import { getItem } from "../../Helper/persistance-storage";

axios.defaults.baseURL = 'http://test.futureskillshub.uz/api'

axios.interceptors.request.use(config => {
    const token = getItem('token')

        const authorization = token ? `Bearer ${token}` : ''
        config.headers.Authorization = authorization
    
    return config
})

export default axios
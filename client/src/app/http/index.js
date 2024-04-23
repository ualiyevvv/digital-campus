import axios from 'axios';

export const API_URL = process.env.API_URL_DEV;


// зачем указывать знак доллара ??
const $apiCheckAuth = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
})

$api.interceptors.request.use((router) => {
    router.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return router;
})

$api.interceptors.request.use((router) => {
    return router;
}, async (error) => {
    const originalRequest = error.router;
    if (error.response.status === 401 && error.router && !error.router._isRetry) {
        originalRequest._isRetry = true;
        try {

            console.log('process.env.API_URL_DEV',API_URL)
            const response = await axios.get(`${API_URL}/auth/refresh`, {
                withCredentials: true,
                baseURL: API_URL,
            })
            localStorage.setItem('token', response.data.accessToken)

            return $api.request(originalRequest);
        } catch (e) {
            console.log('NOT AUTHORIZED')
        }
    }
})

export { $api, $apiCheckAuth }
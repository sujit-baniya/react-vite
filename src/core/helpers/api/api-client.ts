import axios, {AxiosResponse} from 'axios'
import {encrypt} from '~/core/helpers/encryption'
import {AxiosQueueManager} from "~/core/helpers/api/queue";
import {IHttpMethod} from "~/core/helpers/api/queue/interfaces";

const baseURL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
    // @ts-ignore
    baseURL: baseURL,
    maxRedirects: 0,
    validateStatus: function (status: number) {
        return status >= 200 && status < 300
    },
})
axiosInstance.interceptors.request.use(
    (requestConfig) => {
        let time = ((Date.now() % 1000) / 1000) * 1000000
        if (requestConfig.headers) {
            requestConfig.headers['x-request-id'] = encrypt(time.toString(), import.meta.env.VITE_SECRET)
        }
        return requestConfig
    },
    (requestError) => {
        return Promise.reject(requestError)
    }
)

const queueManager = new AxiosQueueManager({client: axiosInstance})

export const HttpClient = {
    request(conf: any = {}) {
        return this.response(axiosInstance.request(conf))
    },
    get(url: string, conf: any = {}) {
        return this.response(axiosInstance.get(url, conf))
    },
    delete(url: string, conf: any = {}) {
        return this.response(axiosInstance.delete(url, conf))
    },
    head(url: string, conf: any = {}) {
        return this.response(axiosInstance.head(url, conf))
    },
    options(url: string, conf: any = {}) {
        return this.response(axiosInstance.options(url, conf))
    },
    post(url: string, data = {}, conf: any = {}) {
        return this.response(axiosInstance.post(url, data, conf))
    },
    put(url: string, data = {}, conf: any = {}) {
        return this.response(axiosInstance.put(url, data, conf))
    },
    patch(url: string, data = {}, conf: any = {}) {
        return this.response(axiosInstance.patch(url, data, conf))
    },
    queue(url: string, method: IHttpMethod, data = {}, conf: any = {}) {
        return this.response(queueManager.request(url, method, data, conf))
    },
    response(resp: Promise<AxiosResponse>) {
        return resp
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error))
    },
}

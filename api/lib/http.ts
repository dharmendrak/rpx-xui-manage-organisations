import axios, { AxiosInstance } from 'axios'
import { errorInterceptor, requestInterceptor, successInterceptor } from './interceptors'

export const http: AxiosInstance = axios.create({})

http.interceptors.request.use(requestInterceptor)
http.interceptors.response.use(successInterceptor, errorInterceptor)

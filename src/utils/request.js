import axios from 'axios'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: true,
  timeout: 20000
})

// request拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    const res = response
    if (res.data.Code === 0) {
      return res.data
    } else if (res.data.hasOwnProperty('error')) {
      message.error(res.data.error)
      return res.data
    } else {
      message.error('出错啦')
      return Promise.reject(res.data)
    }
  },
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

export default service

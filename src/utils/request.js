import axios from 'axios'

const service = axios.create({
  baseURL: process.env.BASE_API,
  withCredentials: false,
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
      return res.data.data
    } else if (res.hasOwnProperty('error')) {
      alert(res.error)
      return Promise.reject(res)
    } else {
      alert('出错啦')
      return Promise.reject(res.data)
    }
  },
  error => {
    alert(error)
    return Promise.reject(error)
  }
)

export default service

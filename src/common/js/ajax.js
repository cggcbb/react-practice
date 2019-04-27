import axios from 'axios'
import { Modal } from 'antd'

const STATUS_SUCCESS = 200
const CODE_SUCCESS = 0

const instance = axios.create({
  baseURL: 'https://www.easy-mock.com/mock/5cabf67f1a2ff67cf5210f83/manager/mock',
  timeout: 5000
})

// 发送ajax请求之前
instance.interceptors.request.use((config) => {
  return config
}, error => {
  return Promise.reject(error)
})
// 接收到数据, 处理数据之前
instance.interceptors.response.use((res) => {
  return res
}, error => {
  return Promise.reject(error)
})

export const ajax = (options) => {
  let loading
  let { isShowLoading = true } = options
  if (isShowLoading) {
    loading = document.getElementById('loadingWrapper')
    loading.style.display = 'block'
  }
  return new Promise((resolve, reject) => {
    instance({
      url: options.url,
      method: options.method || 'get',
      params: options.params || ''
    }).then(res => {
      if (loading) {
        loading.style.display = 'none'
      }
      if (res.status === STATUS_SUCCESS) {
        if (res.data.code === CODE_SUCCESS) {
          resolve(res.data)
        } else {
          Modal.error({
            title: '错误',
            content: res.data.msg,
            centered: true
          })
          resolve(res)
        }
      } else {
        reject(res)
      }
    })
  })
}
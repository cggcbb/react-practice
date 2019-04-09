import axios from 'axios'
import { Modal } from 'antd'


const STATUS_SUCCESS = 200
const CODE_SUCCESS = 0

export const ajax = (options) => {
  const baseURL = 'https://www.easy-mock.com/mock/5cabf67f1a2ff67cf5210f83/manager/mock'
  return new Promise((resolve, reject) => {
    axios({
      url: options.url,
      method: options.method || 'get',
      baseURL,
      timeout: 5000,
      params: options.params || ''
    }).then(res => {
      if (res.status === STATUS_SUCCESS) {
        if (res.data.code === CODE_SUCCESS) {
          resolve(res.data)
        } else {
          Modal.error({
            title: '错误',
            content: res.data.msg
          })
        }
      } else {
        reject(res.data)
      }
    })
  })
}
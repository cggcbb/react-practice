import { jsonp } from 'common/js/jsonp'

// 请求成都天气
const getChengduWeather = () => {
  let url = 'https://restapi.amap.com/v3/weather/weatherInfo'
  let params = {
    key: 'baf3a52fc1041cd53bce4eb850eeaa7b',
    city: '510100',
    extensions: 'base',
    output: 'json'
  }
  return jsonp(url, params)
}

export {
  getChengduWeather
}
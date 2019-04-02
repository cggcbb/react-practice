import moduleJsonp from 'jsonp'

// encapsulate jsonp into Promise
export const jsonp = (url, data, option) => {
  url += (url.includes('?') ? '&' : '?') + splicing(data)
  return new Promise((resolve, reject) => {
    moduleJsonp(url, option, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// put together the param to url
const splicing = data => {
  let url = ''
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key] ? data[key] : ''
      url += `&${key}=${encodeURIComponent(value)}`
    }
  }
  return url ? url.substring(1) : ''
}
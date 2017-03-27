import { AsyncStorage } from 'react-native'
import { SERVICE_BASE } from 'domain/def'
import qs from 'qs'
import { get_local_token, set_local_token } from 'domain/store/storage'

const http_factory = (method) => {
  return async(url, params) => {
    url = url_mapper(url)

    let token = await get_local_token()

    const requestOptions = {
      method,
      headers: {
        Accept: 'application/json',
        token
      }
    }

    if (method == 'GET') {
      const queryString = qs.stringify(params)
      url = `${url}${queryString && '?'+queryString}`
    } else {
      requestOptions.headers = {
        ...requestOptions.headers,
        'Content-Type': 'application/json'
      }
      requestOptions.body = JSON.stringify(params)
    }
    console.log(url, requestOptions)
    const send_request = () => {
      return new Promise((resolve, reject) => {
        fetch(url, requestOptions).then(res => {
          resolve(res)
        }).catch(e => {
          store.dispatch({
            type: 'NETWORK_ERROR',
            cache: {
              url,
              requestOptions,
              resolve
            }
          })
        })
      })
    }

    try {
      const http_result = await send_request()
      const text = await http_result.text()
      const json = JSON.parse(text)
      console.log(json)
      if (json.token) {
        set_local_token(json.token)
      }
      return json
    } catch (e) {
      console.error(e + ':' + url)
    }
  }
}

export const url_mapper = (url) => {
  const fullUrl = SERVICE_BASE.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
  return fullUrl
}

export const http_get = http_factory('GET')
export const http_post = http_factory('POST')
export const http_put = http_factory('PUT')
export const http_delete = http_factory('DELETE')

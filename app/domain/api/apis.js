import { http_get, http_post, http_put, url_mapper } from 'domain/api/http'
import { get_local_token } from 'domain/store/storage'

// token不存在时，请求token 
export const get_token = async(force) => {
  if (!force && store.getState().user.token) {
    return
  }
  return await http_get('/api/token')
}

// 请求列表数据
export const get_itemList = async(start, take) => {
  return await http_get('/api/itemList', { start, take })
}

import { request } from '@/api/service'
export const urlPrefix = '/api/twitter/tweet/stream/'

export function GetList (query) {
  return request({
    url: urlPrefix + 'getRules/',
    method: 'get',
    params: query
  })
}

export function AddObj (obj) {
  return request({
    url: urlPrefix + 'addRules/',
    method: 'post',
    data: obj
  })
}

export function DelObj (id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'delete',
    data: { id }
  })
}

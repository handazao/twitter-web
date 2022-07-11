import { request } from '@/api/service'
export const urlPrefix = '/api/twitter/tweet/'

export function GetList (query) {
  return request({
    url: urlPrefix + 'getTweet/',
    method: 'get',
    params: query
  })
}

import { request } from '@/api/service'
export const urlPrefix = '/api/twitter/tweet/'

export function GetList (query) {
  return request({
    url: urlPrefix + 'getUsersTweets/',
    method: 'get',
    params: query
  })
}

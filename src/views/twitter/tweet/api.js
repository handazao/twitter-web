import { request } from '@/api/service'
export const urlPrefix = '/api/twitter/tweet/'

export function GetList (query) {
  return request({
    url: urlPrefix + 'searchRecentTweets/',
    method: 'get',
    params: query
  })
}

export function getUsersMentions (query) {
  return request({
    url: urlPrefix + 'getUsersMentions/',
    method: 'get',
    params: query
  })
}

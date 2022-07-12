import { request } from '@/api/service'
export const urlPrefix = '/api/twitter/tweet/'

export function GetList (query) {
  return request({
    url: urlPrefix + 'getHomeTimeline/',
    method: 'get',
    params: query
  })
}

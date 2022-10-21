import {request} from '@/api/service'

export const urlPrefix = '/api/server/services/'

export function getServiceList(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

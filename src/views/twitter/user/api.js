import { request, downloadFile } from '@/api/service'
export const urlPrefix = '/api/twitter/user/'

export function GetList (query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

export function SaveObj (params) {
  return request({
    url: urlPrefix + 'saveTwitterUser/',
    method: 'post',
    data: params
  })
}

/**
 * 导出
 * @param params
 */
export function exportData (params) {
  return downloadFile({
    url: urlPrefix + 'export/',
    params: params,
    method: 'post'
  })
}

export function GetTwitterList (query) {
  return request({
    url: urlPrefix + 'getUser/',
    method: 'get',
    params: query
  })
}

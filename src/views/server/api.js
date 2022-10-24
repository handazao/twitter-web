import {request} from '@/api/service'

export const urlPrefix = '/api/server/services/'

/**
 * 列表查询
 */
export function getServiceList(query) {
  return request({
    url: urlPrefix,
    method: 'get',
    params: query
  })
}

export function getInfo (id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'get'
  })
}

/**
 * 新增
 */
export function saveServices (params) {
  return request({
    url: urlPrefix,
    method: 'post',
    data: params
  })
}

/**
 * 修改
 */
export function updateServices (obj) {
  return request({
    url: urlPrefix + obj.id + '/',
    method: 'put',
    data: obj
  })
}
/**
 * 删除
 */
export function delServices (id) {
  return request({
    url: urlPrefix + id + '/',
    method: 'delete',
    data: { id }
  })
}

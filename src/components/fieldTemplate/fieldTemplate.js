import {request} from '@/api/service'

export const urlPrefix = '/api/fieldTemplate/'

// 查询模板
export function getFieldTemplate(type) {
  return request({
    url: urlPrefix + type,
    method: 'get',
    data: {type}
  })
}

// 保存模板
export function addFieldTemplate(data) {
  return request({
    url: urlPrefix + 'fieldTemplate/',
    method: 'post',
    data: data
  })
}

// 修改模板
export function updateFieldTemplate(data) {
  return request({
    url: urlPrefix + 'fieldTemplate/' + data.id + '/',
    method: 'put',
    data: data
  })
}

//删除字段
export function deleteField(type, field) {
  return request({
    url: urlPrefix + type + '/' + field,
    method: 'delete',
  })
}

// 查询字段
export function queryOption(type, field) {
  return request({
    url: urlPrefix + type + '/' + field,
    method: 'get',
  })
}

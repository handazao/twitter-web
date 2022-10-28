import {request} from '@/api/service'

export const urlPrefix = '/api/fieldTemplate/'


export function getFieldTemplate(type) {
  return request({
    url: urlPrefix + 'type/' + type,
    method: 'get',
    data: { type }
  })
}

export function addFieldTemplate(data) {
  return request({
    url: urlPrefix + 'addField',
    method: 'post',
    data: data
  })
}

export function deleteField(field, type) {
  return request({
    url: urlPrefix + field + '/' + type,
    method: 'delete',
  })
}

export function queryOption(field, type) {
  return request({
    url: urlPrefix + 'option/' + field + '/' + type,
    method: 'get',
  })
}

export function queryFieldTemplate(type) {
  return request({
    url: urlPrefix + type,
    method: 'get',
  })
}

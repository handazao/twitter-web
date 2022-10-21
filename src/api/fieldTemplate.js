import { request } from '@/api/service'

export const URI = 'http://localhost:8083'

export function getFieldTemplate (query) {
  return request({
    url: URI + '/field/template/type/',
    method: 'get'
  })
}

export function addFieldTemplate (data) {
  return request({
    url: URI + '/field/template/addField',
    method: 'post',
    data: data
  })
}

export function deleteField (field, type) {
  return request({
    url: URI + '/field/template/' + field + '/' + type,
    method: 'delete'
  })
}

export function queryOption (field, type) {
  return request({
    url: URI + '/field/template/option/' + field + '/' + type,
    method: 'get'
  })
}

export function queryFieldTemplate (type) {
  return request({
    url: URI + '/field/template/' + type,
    method: 'get'
  })
}

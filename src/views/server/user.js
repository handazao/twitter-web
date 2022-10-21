import axios from 'axios'

const URI = 'http://localhost:8083'
const request = axios.request

export function getUserList () {
  return request({
    url: URI + '/field/user/list',
    method: 'post'
  })
}

export function saveOrUpdate (user) {
  return request({
    url: URI + '/field/user/edit',
    method: 'post',
    data: user
  })
}

export function getInfo (id) {
  return request({
    url: URI + '/field/user/' + id,
    method: 'get'
  })
}

export function delUser (id) {
  return request({
    url: URI + '/field/user/' + id,
    method: 'DELETE'
  })
}

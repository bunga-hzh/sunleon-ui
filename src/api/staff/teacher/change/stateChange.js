import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/staff/zzjgchange/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/staff/zzjgchange',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/staff/zzjgchange/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/staff/zzjgchange/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/staff/zzjgchange',
    method: 'put',
    data: obj
  })
}

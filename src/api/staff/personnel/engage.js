import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/staff/zzjgexpert/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/staff/zzjgexpert',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/staff/zzjgexpert/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/staff/zzjgexpert/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/staff/zzjgexpert',
    method: 'put',
    data: obj
  })
}

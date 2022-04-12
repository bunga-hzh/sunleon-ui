import request from '@/router/axios'

export function fetchList(type, query) {
  return request({
    url: '/staff/zzjg' + type + '/page',
    method: 'get',
    params: query
  })
}

export function addObj(type, obj) {
  return request({
    url: '/staff/zzjg' + type,
    method: 'post',
    data: obj
  })
}

export function getObj(type, id) {
  return request({
    url: '/staff/zzjg' + type + '/' + id,
    method: 'get'
  })
}

export function delObj(type, id) {
  return request({
    url: '/staff/zzjg' + type + '/' + id,
    method: 'delete'
  })
}

export function putObj(type, obj) {
  return request({
    url: '/staff/zzjg' + type,
    method: 'put',
    data: obj
  })
}

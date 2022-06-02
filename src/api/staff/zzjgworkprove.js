import request from '@/router/axios'

export function fetchList(query) {
  return request({
    url: '/staff/zzjgworkprove/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/staff/zzjgworkprove',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/staff/zzjgworkprove/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/staff/zzjgworkprove/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/staff/zzjgworkprove',
    method: 'put',
    data: obj
  })
}

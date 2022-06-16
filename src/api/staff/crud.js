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

export function getAll() {
  return request({
    url: '/staff/zzjginfo/all',
    method: 'get',
  })
}

export function getRegionTreeApi(id) {
  let url = "";
  if (id) {
    url = `/admin/sysRegion/getRegionTree?id=${id}`;
  } else {
    url = `/admin/sysRegion/getRegionTree?id=-1`;
  }
  return request({
    url: url,
    method: 'get'
  })
}

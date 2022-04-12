import request from '@/router/axios'

// 获取用户信息
export function getInfo(query) {
  return request({
    url: '/staff/zzjginfo/page',
    method: 'get',
    params: query
  })
}

// 添加用户信息
export function addInfo(obj) {
  return request({
    url: '/staff/zzjginfo',
    method: 'post',
    data: obj
  })
}

// 修改用户信息
export function editInfo(obj) {
  return request({
    url: '/staff/zzjginfo',
    method: 'put',
    data: obj
  })
}

// 获取子表信息
export function getChild(type, query) {
  return request({
    url: '/staff/zzjg' + type + '/page',
    method: 'get',
    params: query
  })
}

// 子表提交
export function submitChild(type, obj) {
  return request({
    url: '/staff/zzjg' + type,
    method: 'post',
    data: obj
  })
}

// 子表修改
export function editChild(type, obj) {
  return request({
    url: '/staff/zzjg' + type,
    method: 'put',
    data: obj
  })
}

// 子表删除
export function delChild(type, id) {
  return request({
    url: '/staff/zzjg' + type + '/' + id,
    method: 'delete',
  })
}

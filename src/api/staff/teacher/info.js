import request from '@/router/axios'

// 获取字典项
export function getDictItems(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get',
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

// 子表添加
export function addChild(type, obj) {
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

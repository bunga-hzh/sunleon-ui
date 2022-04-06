import request from '@/router/axios'

// 获取字典项
export function getDictItem(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get',
  })
}

// 获取部门
export function getDeptTree() {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
  })
}

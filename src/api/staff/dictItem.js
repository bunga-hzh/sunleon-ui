import request from '@/router/axios'

// 获取字典项
export function getDictItem(type) {
  return request({
    url: '/admin/dict/type/' + type,
    method: 'get',
  })
}

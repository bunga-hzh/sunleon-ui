import request from '@/router/axios'

// 添加用户信息
export function addJbxxInfo(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 添加教育经历
export function addJyjlInfo(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 添加联系方式
export function addlxfslInfo(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 添加职称信息
export function addZcxxlInfo(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 添加其他个人信息
export function addQtgrxxInfo(obj) {
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 获取用户信息
export function getInfo(query) {
  return request({
    url: '',
    method: 'get',
    data: query
  })
}

// 根据id查询用户信息
export function queryInfoById(id) {
  return request({
    url: '' + id,
    method: 'get',
  })
}

// 修改用户信息
export function putInfo(obj) {
  return request({
    url: '',
    method: 'put',
    data: obj
  })
}

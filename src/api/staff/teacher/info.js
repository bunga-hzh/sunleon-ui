import request from '@/router/axios'

// 添加用户信息
export function addInfo(obj){
  return request({
    url: '',
    method: 'post',
    data: obj
  })
}

// 获取用户信息
export function getInfo(query){
  return request({
    url: '',
    method: 'get',
    data: query
  })
}

// 根据id查询用户信息
export function queryInfoById(id){
  return request({
    url: '' + id,
    method: 'get',
  })
}

// 修改用户信息
export function putInfo(obj){
  return request({
    url: '',
    method: 'put',
    data: obj
  })
}
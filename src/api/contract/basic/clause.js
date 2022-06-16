import request from '@/router/axios'

export function fetchTree(query){
  return request({
    url: '/act/htLx/tree',
    method: 'get',
    params: query
  })
}

export function fetchList(query){
  return request({
    url:'/act/htLxTk/page',
    method:'get',
    params:query
  })
}

export function saveObj(obj){
  return request({
    url:'/act/htLxTk/add',
    method:'post',
    data:obj
  })
}

export function putObj(obj){
  return request({
    url:'/act/htLxTk/update',
    method:'put',
    data:obj
  })
}


export function delObj(id){
  return request({
    url:'/act/htLxTk/del/'+id,
    method:'delete'
  })
}

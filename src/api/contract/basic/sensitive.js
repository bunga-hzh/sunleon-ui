import request from '@/router/axios'

export function fetchList(query){
  return request({
    url:'/act/htMgc/page',
    method:'get',
    params:query
  })
}


export function saveObj(obj){
  return request({
    url:'/act/htMgc/add',
    method:'post',
    data:obj
  })
}


export function putObj(obj){
  return request({
    url:'/act/htMgc/update',
    method:'put',
    data:obj
  })
}


export function delObj(id){
  return request({
    url:'/act/htMgc/del/'+id,
    method:'delete'
  })
}

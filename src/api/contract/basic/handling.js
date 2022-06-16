import request from '@/router/axios'

export function fetchList(query){
  return request({
    url:'/act/htGlJb/page',
    method:'get',
    params:query
  })
}


export function saveObj(obj){
  return request({
    url:'/act/htGlJb/add',
    method:'post',
    data:obj
  })
}

export function putObj(obj){
  return request({
    url:'/act/htGlJb/update',
    method:'put',
    data:obj
  })
}


export function delObj(id){
  return request({
    url:'/act/htGlJb/del/'+id,
    method:'delete'
  })
}

import request from '@/router/axios'

export function fetchList(query){
  return request({
    url:'/act/htGlZj/page',
    method:'get',
    params:query
  })
}


export function saveObj(obj){
  return request({
    url:'/act/htGlZj/add',
    method:'post',
    data:obj
  })
}

export function putObj(obj){
  return request({
    url:'/act/htGlZj/update',
    method:'put',
    data:obj
  })
}


export function delObj(id){
  return request({
    url:'/act/htGlZj/del/'+id,
    method:'delete'
  })
}

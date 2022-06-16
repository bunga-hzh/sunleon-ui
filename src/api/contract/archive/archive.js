import request from "@/router/axios";

export function fetchList(query,params){
  return request({
    url:'/act/htGl/gd/page',
    method:'post',
    params:query,
    data:params
  })
}


export function getFileList(query,id){
  return request({
    url:'/act/htGl/get/file/page',
    method:'get',
    params:Object.assign(query,{htglId:id})
  })
}

import request from "@/router/axios";

export function fetchList(query,params){
  return request({
    url:'/act/htGl/gys/page',
    method:'post',
    params:query,
    data:params
  })
}

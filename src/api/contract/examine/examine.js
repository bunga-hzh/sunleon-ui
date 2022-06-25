import request from "@/router/axios";

export function fetchList(query,params){
  return request({
    url:'/act/htGl/sp/page',
    method:'post',
    params:query,
    data:params
  })
}


/**
 * 提交审批
 */
export function examLcs(data){
  return request({
    url:'/act/task/submit/ht_task',
    method:'post',
    data:data
  })
}


export function checkExam(taskId){
  return request({
    url:'/act/htGl/check_is_zjfzr',
    method:'get',
    params:{
      taskId:taskId
    }
  })
}

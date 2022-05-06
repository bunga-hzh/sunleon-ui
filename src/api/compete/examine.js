import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchDeliverListList(query,page) {
  return request({
    url: '/act/jpGwgl/page/examine',
    method: 'post',
    data: query,
    params:page
  })
}

/**
 * 获取已审核的记录
 * @param query
 * @param page
 * @returns {AxiosPromise}
 */
export function fetchHistoryExamine(query,page) {
  return request({
    url: '/act/jpGwgl/page/history_examine',
    method: 'post',
    data: query,
    params:page
  })
}

/**
 * 查询对应人的申请列表
 */
export function fetchApplyList(id){
  return request({
    url:'/act/jpGwgl/deliverList/user',
    method:'get',
    params:{
      id:id
    }
  })
}

/**
 * 查询审核记录
 * @param id
 * @returns {AxiosPromise}
 */
export function fetchExamineHistory(id){
  return request({
    url:'/act/jpGwgl/operation/get_review_process',
    method:'get',
    params:{
      jpTdId:id
    }
  })
}

/**
 * 获取左侧表单
 * @param userId
 * @returns {*}
 */
export function getLeftFormInfo(id){
  return request({
    url:'/act/jpGwgl/intention/info',
    method:'get',
    params:{
      id:id
    }
  })
}

/**
 * 获取操作记录
 * @param userId
 * @returns {AxiosPromise}
 */
export function getBottomTimelineInfo(id){
  return request({
    url:'/act/jpGwgl/operation/record',
    method:'get',
    params:{
      id:id
    }
  })
}


/**
 * 提交审核数据
 * @param data
 * @returns {AxiosPromise}
 */
export function postExamine(data){
  return request({
    url:'/act/task/submit/jp_zy_task',
    method:'post',
    data:data
  })
}

/**
 * 获取操作按钮
 * @param taskId
 * @param withData
 * @returns {AxiosPromise}
 */
export function getOptionButtton(taskId,withData){
  return request({
    url:'/act/task/get_jp_zy_task',
    method:'get',
    params:{
      taskId:taskId,
      withData:withData
    }
  })
}

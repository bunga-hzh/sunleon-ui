import request from "@/router/axios";


/**
 * 提交审核意见
 * @param data
 * @returns {AxiosPromise}
 */
export function postReviewComments(data){
  return request({
    url:'/act/task/submit/zzcl_task',
    method:'post',
    data:data
  })
}

/**
 * 获取常量中的数据
 * @param key
 * @returns {AxiosPromise}
 */
export function getConstantByKey(key) {
  return request({
    url: '/admin/param/publicValue/'+key,
    method: 'get'
  })
}


/**
 * 获取操作记录
 * @param userId
 * @returns {AxiosPromise}
 */
export function getOperationByKey(deliveryId) {
  return request({
    url: '/act/resume/getOperation',
    method: 'get',
    params:{
      deliveryId:deliveryId
    }
  })
}

/**
 * 面试记录
 * @param deliveryId
 * @returns {AxiosPromise}
 */
export function getInterviewRecord(deliveryId) {
  return request({
    url: '/act/resume/getOperation/fraction',
    method: 'get',
    params:{
      deliveryId:deliveryId
    }
  })
}

/**
 * 获取当前轮
 * @param deliveryId
 * @param interviewNumber
 * @returns {AxiosPromise}
 */
export function getCurrentRecord(deliveryId,interviewNumber){
  return request({
    url:'/act/resume/interviewer',
    method:'get',
    params:{
      deliveryId:deliveryId,
      interviewNumber:interviewNumber
    }
  })
}


/**
 * 更新审核人
 * @param data
 * @returns {AxiosPromise}
 */
export function updateActivitiMember(data){
  return request({
    url:'/admin/param/update_public_value',
    method:'post',
    data:data
  })
}

/**
 * 获取流程审核人
 * @param key
 * @returns {AxiosPromise}
 */
export function getActivitiMember(key){
  return request({
    url:'admin/param/publicValue/'+key,
    method:'get'
  })
}


export function getRegionTreeApi(id) {
  let url = "";
  if (id) {
    url = `/act/sysRegion/getRegionTree?id=${id}`;
  } else {
    url = `/act/sysRegion/getRegionTree?id=-1`;
  }
  return request({
    url:url,
    method:'get'
  })
}


/**
 * 获取终面评分报表
 * @returns {AxiosPromise}
 */
export function getFinalScore(query){
  return request({
    url:'/act/reports/zp_zm_pf_page',
    method:'get',
    parmas:query
  })
}

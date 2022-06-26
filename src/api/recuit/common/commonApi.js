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

// /**
//  * 简历修改记录
//  * @param deliveryId
//  * @returns {AxiosPromise}
//  */
export function getUpdateResumeRecord(query) {
  return request({
    url: '/act/jlLog/page',
    method: 'get',
    params:query
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

/**
 * 提交工作交接单
 * @param data
 * @param gwtdId
 * @returns {*}
 */
export function postHandOff(data,gwtdId){
  return request({
    url:'/act/jpGwgl/upload/'+gwtdId,
    method:'post',
    data:data
  })
}

export function downloadResume(id){
  return request({
    url:'/act/resume/do_zip_by_user_id/'+id,
    method:'get',
    responseType: 'blob'
  })
}

/**
 * 获取竞聘投递、未投递报表
 * @returns {AxiosPromise}
 */
export function getJpTDReort(params){
  return request({
    url:'/act/reports/jp_gw_td/list',
    method:'get',
    params:params
  })
}

/**
 * 获取竞聘未投递报表
 * @returns {AxiosPromise}
 */
export function getJpUndeliveredTDReort(params){
  return request({
    url:'/act/reports/jp_gw_not_td/list',
    method:'get',
    params:params
  })
}


/**
 * 获取竞聘超额
 * @returns {AxiosPromise}
 */
export function getJpExcessTDReort(params){
  return request({
    url:'/act/reports/jp_gw_excess_td/list',
    method:'get',
    params:params
  })
}



/**
 * 获取候选人
 * @returns {AxiosPromise}
 */
export function getJpHxrTDReort(params){
  return request({
    url:'/act/reports/jp_gw_adopt/list',
    method:'get',
    params:params
  })
}

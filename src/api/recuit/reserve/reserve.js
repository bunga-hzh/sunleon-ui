import request from '@/router/axios'

/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchList(query,page) {
  return request({
    url: '/act/resume/appointment/page',
    method: 'post',
    data: query,
    params:page
  })
}


/**
 * 提交预约数据
 * @param data
 */
export function postReserveData(data) {
  return request({
    url:'/act/resume/reserve/add',
    method:'PUT',
    data:data
  })
}


/**
 * 结束面试
 * @param deliveryId
 * @returns {AxiosPromise}
 */
export function examState(deliveryId,content,stage){
  return request({
    url:'/act/resume/end',
    method:'PUT',
    data:{
      deliveryId:deliveryId,
      content:content,
      endStageId:stage
    }
  })
}

/**
 * 简历确认
 * @param data
 * @returns {AxiosPromise}
 */
export function confirmResume(data){
  return request({
    url:'/act/resume/send_perfect',
    method:'put',
    data:data
  })
}

/**
 * 撤回
 * @returns {AxiosPromise}
 */
export function setCallback(id,apiName){
  return request({
    url:'/act/resume/'+apiName+'/'+id,
    method:'put'
  })
}


export function setStopCallBack(id){
  return request({
    url:'/act/resume/return_over/'+id,
    method:'put'
  })
}

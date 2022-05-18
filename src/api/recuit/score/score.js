import request from '@/router/axios'


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchScoreList(query,page) {
  return request({
    url: '/act/resume/fraction/page',
    method: 'post',
    data: query,
    params:page
  })
}


/**
 * 获取评分老师列表
 * @param deliveryId 中间表id
 * @param interviewNumber 对应的轮数
 */
export function getGradingTeacher(deliveryId,interviewNumber){
  return request({
    url:'/act/resume/interviewer',
    method:'get',
    params:{
      deliveryId,
      interviewNumber
    }
  })
}


/**
 * 提交评分数据
 * @param data
 * @returns {AxiosPromise}
 */
export function postScoreData(data){
  return request({
    url:'/act/resume/score/add',
    method:'PUT',
    data:data
  })
}

/**
 * 转入预约
 * @param data
 * @returns {AxiosPromise}
 */
export function transferInReserve(data){
  return request({
    url:'/act/resume/again/reserve',
    method:'put',
    params:data
  })
}

/**
 * 终面通过
 * @param data
 * @returns {AxiosPromise}
 */
export function finalPass(data){
  return request({
    url:'/act/resume/adopt/endFace',
    method:'put',
    params:data
  })
}


/**
 * 批量转入
 * @param data
 * @returns {*}
 */
export function batchReservation(data){
  return request({
    url:'/resume/batch/again/reserve',
    method:'put',
    data:data
  })
}

/**
 * 批量结束
 * @param data
 * @returns {*}
 */
export function batchEnd(data){
  return request({
    url:'/resume/batch/end',
    method:'put',
    data:data
  })
}

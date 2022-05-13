import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchManageList(query,page) {
  return request({
    url: '/act/jpGwgl/page/manage',
    method: 'post',
    data: query,
    params:page
  })
}

/**
 * 设置分数
 */
export function settingFraction(data) {
  return request({
    url:'/act/jpGwgl/set/fraction',
    method:'post',
    params:data
  })
}

/**
 * 竞聘成功是否存在变动
 * @param data
 * @returns {AxiosPromise}
 */
export function settingConfirm(data) {
  return request({
    url:'/act/jpGwgl/success',
    method:'post',
    params:data
  })
}

/**
 * 批量通过
 * @returns {AxiosPromise}
 */
export function batchSettingConfirm(data){
  return request({
    url:'/act/jpGwgl/adopt/batch',
    method:'post',
    data:data
  })
}

/**
 * 设置不通过
 * @param data
 * @returns {AxiosPromise}
 */
export function settingRefuse(data) {
  return request({
    url:'/act/jpGwgl/refuse',
    method:'post',
    data:data
  })
}


/**
 * 竞聘确认
 * @param data
 * @constructor
 */
export function JPConfirmation(data){
  return request({
    url:'/act/jpGwgl/employ',
    method:'post',
    data:data
  })
}

export function JPWorkState(data){
  return request({
    url:'/act/jpGwgl/handover',
    method:'post',
    params:data
  })
}


export function getHandOffWorkAssets(id){
  return request({
    url:'/act/jpGwgl/resource/'+id,
    method:'get'
  })
}

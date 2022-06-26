import request from "@/router/axios";

export function fetchList(query,params){
  return request({
    url:'/act/htGl/page',
    method:'post',
    params:query,
    data:params
  })
}

export function fetchMyList(query,params){
  return request({
    url:'/act/htGl/my/page',
    method:'post',
    params:query,
    data:params
  })
}


/**
 * 获取合同详细信息
 * @param id
 * @returns {AxiosPromise}
 */
export function fetchContractInfo(id){
  return request({
    url:'/act/htGl/get/'+id,
    method:'get'
  })
}

/**
 * 保存合同信息
 * @param data
 * @returns {*}
 */
export function saveObj(data){
  return request({
    url:'/act/htGl/update',
    method:'post',
    data:data
  })
}

/**
 * 获取合同类型ID
 * @param id
 * @returns {AxiosPromise}
 */
export function getHtlxInfo(id){
  return request({
    url:'/act/htLx/get/'+id,
    method:'get'
  })
}


//提交审批
export function SubmitForReview(){

}


/**
 * 合同归档
 * @param data
 * @returns {AxiosPromise}
 */
export function putArchive(data){
  return request({
    url:'/act/htGl/file/end',
    method:'put',
    data:data
  })
}

/**
 * 生成合同
 * @param id
 * @returns {AxiosPromise}
 */
export function genContractFile(id){
  return request({
    url:'/act/htGl/do_gen_ht_preview/'+id,
    method:'post'
  })
}

/**
 * 获取预览接口
 * @param id
 * @returns {AxiosPromise}
 */
export function getPreViewUrl(id){
  return request({
    url:'/act/htGl/get_ht_preview/'+id,
    method:'get'
  })
}

export function getHis(query){
  return request({
    url:'/act/htGl/record',
    method:'get',
    params:query
  })
}


/**
 * 提交审核
 * @param id
 * @returns {AxiosPromise}
 */
export function submitHT(id){
  return request({
    url:'/act/htGl/submit/ht_review',
    method:'put',
    params:{
      htGlId:id
    }
  })
}

/**
 * 获取资金来源
 * @returns {AxiosPromise}
 */
export function getMyZJLY(userId){
  return request({
    url:'/act/htGlZj/my/select',
    method:'get',
    params:{
      userId:userId
    }
  })
}


export function getPreViewUrlAll(obsKey){
  return request({
    url:'/act/htGl/get_sign_file_url',
    method:'get',
    params:{
      obsKey:obsKey
    }
  })
}

/**
 * 验收
 * @param id
 * @param date
 * @param status
 * @returns {AxiosPromise}
 */
export function putCheckContract(params){
  return request({
    url:'/act/htGl/zbj/status',
    method:'put',
    params:params
  })
}

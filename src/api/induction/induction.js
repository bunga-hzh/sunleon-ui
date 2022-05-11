import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchInductionList(query,page) {
  return request({
    url: '/act/resume/induction/page',
    method: 'post',
    data: query,
    params:page
  })
}

//查询人员合同处信息
export function fetchContract(id) {
  return request({
    url:'/act/rzgl/getInfo',
    method:'get',
    params:{
      id:id
    }
  })
}

/**
 * 获取个人基本信息
 * @param id
 * @returns {AxiosPromise}
 */
export function fetchUserInfo(id){
  return request({
    url:'/act/jzgJbxx/get/jbxx/'+id,
    method:'get'
  })
}

export function saveUserInfo(data){
  return request({
    url:'/act/jzgJbxx/jbxx/add',
    method:'post',
    data:data
  })
}

//提交合同信息
export function postContract(data){
  return request({
    url:'/act/rzgl/add',
    method:'post',
    data:data
  })
}

/**
 * 查询数据
 * @param id
 * @param type
 * @returns {AxiosPromise}
 */
export function fetchListByType(id,type){
  return request({
    url:`/act/jzgJbxx/get/${id}?type=${type}`,
    method:'get'
  })
}

/**
 * 保存信息
 * @param data
 * @returns {AxiosPromise}
 */
export function saveListInfo(data,id){
  return request({
    url:'/act/jzgJbxx/add',
    method:'post',
    data:data,
    params:{
      gwtdId:id
    }
  })
}

import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchReleaseList(query,page) {
  return request({
    url: '/act/jpGwgl/page/release',
    method: 'post',
    data: query,
    params:page
  })
}


/**
 * 设置发布或者撤回
 * @param isBoolean true:发布, false:撤回
 * @param array
 * @returns {AxiosPromise}
 */
export function optionRelease(isBoolean,array){
  return request({
    url:'/act/jpGwgl/release/'+isBoolean,
    method:'post',
    data:array
  })
}

/**
 * 删除岗位
 * @param array
 * @returns {AxiosPromise}
 */
export function deletePost(array){
  return request({
    url:'/act/jpGwgl/del',
    method:'delete',
    data:array
  })
}

/**
 * 查询部门
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchTree(query) {
  return request({
    url: '/admin/dept/tree',
    method: 'get',
    params: query
  })
}

/**
 * 提交用户申请表
 * @param data
 * @returns {AxiosPromise}
 */
export function applyForm(data){
  return request({
    url:'/act/jpGwgl/user/deliver',
    method:'post',
    data:data
  })
}


/**
 * 检测是否已提交申请
 */
export function checkApplyHistory(){
  return request({
    url:'/act/jpGwgl/verification/userId',
    method:'get'
  })
}

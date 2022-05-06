import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchCompeteList(query,page) {
  return request({
    url: '/act/jpGwgl/page',
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
export function optionRelease(array){
  return request({
    url:'/act/jpGwgl/release',
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
 * 添加竞聘岗位
 * @param data
 * @returns {AxiosPromise}
 */
export function addCompeteObj(data){
  return request({
    url:'/act/jpGwgl/add',
    method:'post',
    data:data
  })
}

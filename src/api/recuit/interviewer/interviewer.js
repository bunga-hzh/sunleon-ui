import request from '@/router/axios'


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
*/
export function fetchList(query) {
    return request({
        url:'/act/jlMsgWb/page',
        method:'get',
        params:query
    })
}

/**
 * 保存
 * @param obj
 * @returns {AxiosPromise}
 */
export function saveObj(obj){
    return request({
      url:'/act/jlMsgWb/add',
      method:"post",
      data:obj
    })
}

/**
 * 修改
 * @param obj
 * @returns {AxiosPromise}
 */
export function putObj(obj){
  return request({
    url:'/act/jlMsgWb/update',
    method:"put",
    data:obj
  })
}

/**
 * 删除
 * @param id
 * @returns {AxiosPromise}
 */
export function delObj(id){
  return request({
    url:'/act/jlMsgWb/del/'+id,
    method:'delete'
  })
}

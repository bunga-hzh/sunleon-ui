import request from '@/router/axios'


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchList(query,page) {
  return request({
    url: '/act/resume/screen/page',
    method: 'post',
    data: query,
    params:page
  })
}

/**
 * 审核筛选
 * @param type
 * @returns {AxiosPromise}
 */
export function examine(type,array) {
  return request({
    url:'/act/resume/screen/adopt/'+type,
    method:'put',
    data:array
  })
}

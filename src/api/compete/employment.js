import request from "@/router/axios";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchEmployList(query,page) {
  return request({
    url: '/act/jpGwgl/page/info',
    method: 'post',
    data: query,
    params:page
  })
}

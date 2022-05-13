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

/**
 * 更新竞聘者聘期信息
 * @param data
 * @returns {AxiosPromise}
 */
export function updateEmployObj(data){
  return request({
    url:'/act/jpGwgl/employ/edit',
    method:'post',
    data:data
  })
}

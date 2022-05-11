import request from "@/router/axios";

/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchArrangeList(query,page) {
  return request({
    url: '/act/resume/arrange/page',
    method: 'post',
    data: query,
    params:page
  })
}


/**
 * 面试安排提交数据
 * @param data
 * @returns {AxiosPromise}
 */
export function postArrangeData(data){
  return request({
    url:'/act/resume/arrange/add',
    method:'PUT',
    data:data
  })
}

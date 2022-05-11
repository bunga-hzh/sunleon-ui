import request from '@/router/axios'


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchMemberList(query,page){
  return request({
    url:'/act/resume/endFace/page',
    method:'post',
    data: query,
    params:page
  })

}

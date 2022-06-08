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

export function exportZip(data){
  return request({
    url:'/act/resume/endFace/batch_export_doc',
    method:'post',
    data:data,
    responseType: 'blob'
  })
}


export function exportPersonal(data){
  return request({
    url:'/act/resume/endFace/one_export_doc',
    method:'post',
    data:data,
    responseType: 'blob'
  })
}

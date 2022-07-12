import request from '@/router/axios'


export function fetchList(query) {
  return request({
    url: '/act/htLx/page',
    method: 'get',
    params: query
  })
}

export function fetchTempList(query) {
  return request({
    url: '/act/htGlMb/page',
    method: 'get',
    params: query
  })
}

export function saveTempObj(data){
  return request({
    url:'/act/htGlMb/add',
    method:'post',
    data:data
  })
}

/**
 * 保存
 * @param data
 * @returns {AxiosPromise}
 */
export function saveObj(data){
  return request({
    url:'/act/htLx/add',
    method:'post',
    data:data
  })
}

/**
 * 修改
 * @param data
 */
export function putObj(data){
  return request({
    url:'/act/htLx/update',
    method:'put',
    data:data
  })
}

/**
 * 删除合同类型
 * @param id
 * @returns {AxiosPromise}
 */
export function delObj(id){
  return request({
    url:'/act/htLx/del/'+id,
    method:'delete'
  })
}


import request from '@/router/axios'

export function getFLowXml(deploymentId,processonDefinitionId){
  // this.actPicUrl =
  //   `/act/process/resource/` +
  //   row.deploymentId +
  //   '/' +
  //   row.processonDefinitionId +
  //   '/image';
  return request({
    url:`/act/process/resource/${deploymentId}/${processonDefinitionId}/xml`,
    method:'get'
  })
}

export function fetchFlowList(query) {
  return request({
    url: '/act/process',
    method: 'get',
    params: query
  })
}



/**
 * 更新审核人
 * @param data
 * @returns {AxiosPromise}
 */
export function updateFlowUser(data){
  return request({
    url:'/admin/param/update_public_value',
    method:'post',
    data:data
  })
}

export function fetchFowUser(taskId){
  return request({
    url:'/admin/param/publicValue/'+taskId,
    method:'get'
  })
}

// update_public_value

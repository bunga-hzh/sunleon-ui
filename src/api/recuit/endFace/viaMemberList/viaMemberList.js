import request from '@/router/axios'

/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchViaMemberList(query,page){
  return request({
    url:'act/resume/endFaceManage/page',
    method:'post',
    data: query,
    params:page
  })
}

/**
 * 查询佐证材料详情
 */
export function fetchMaterialsInfo(deliveryId){
  return request({
    url:'/act/resume/get_zzcl',
    method:'get',
    params:{
      gwTdId:deliveryId
    }
  })
}

/**
 * 转入入职
 * @param deliveryId
 * @returns {AxiosPromise}
 */
export function transferInduction(deliveryId){
return request({
  url:'/act/resume/transfer/manage',
  method:'put',
  params:{
    deliveryId:deliveryId
  }
})
}

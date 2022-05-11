import request from '@/router/axios'
import {jimuUrl} from "@/config/env";


/**
 * 查询列表
 * @param query
 * @returns {AxiosPromise}
 */
export function fetchList(query,page) {
  return request({
    url: '/act/gwFb/page',
    method: 'post',
    data: query,
    params:page
  })
}

export function exportExcel(excelConfigId,queryParam){
  return request({
    url:'/act/jmreport/exportAllExcelStream',
    method:'post',
    responseType: 'blob',
    data:{
      excelConfigId:excelConfigId,
      queryParam:queryParam
    }
  })
}

// http://127.0.0.1:5005/reports/jp_name_list_manage/page?yearTime
// /**
//  * 竞聘导出
//  * @param excelConfigId
//  * @param queryParam
//  * @returns {AxiosPromise}
//  */
// export function exportJpExcel(excelConfigId,queryParam){
//   return request({
//     url:'/act/jp_name_list_manage/page',
//     method:'post',
//     responseType: 'blob',
//     data:{
//       excelConfigId:excelConfigId,
//       queryParam:queryParam
//     }
//   })
// }

export function exportPdf(excelConfigId,queryParam){
  return request({
    url:'/act/jmreport/exportPdfStream',
    method:'post',
    responseType: 'blob',
    data:{
      excelConfigId:excelConfigId,
      queryParam:queryParam
    }
  })
}



/**
 * 保存数据
 * @returns {AxiosPromise}
 */
export function addObj(obj) {
  return request({
    url: '/act/gwFb/add',
    method: 'post',
    data: obj
  })
}

/**
 * 删除
 * @param id
 * @returns {AxiosPromise}
 */
export function delObj(ids) {
  return request({
    url: '/act/gwFb/del',
    method: 'delete',
    data:ids
  })
}


/**
 * 发布/撤销
 * @param ids
 * @param state
 */
export function release(ids,state){
  return request({
    url:'/act/gwFb/update/'+state,
    method:'put',
    data:ids
  })
}

/**
 * 修改表单
 * @param obj
 * @returns {AxiosPromise}
 */
export function putObj(obj) {
  return request({
    url: '/act/gwFb/update',
    method: 'put',
    data: obj
  })
}

export function getPostinfo(id) {
  return request({
    url: '/act/sysPostMaintain/get/'+id,
    method:'get'
  })
}

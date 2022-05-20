import request from '@/router/axios'

export function getNoticeMsg(query) {
  return request({
    url: '/admin/sysmsguser/notice/page',
    method: 'get',
    params: query
  })
}
export function getSysNoticeMsg(query) {
  return request({
    url: '/admin/sysmsguser/sysnotice/page',
    method: 'get',
    params: query
  })
}

export function fetchList(query) {
  return request({
    url: '/admin/sysmsg/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/sysmsg',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/sysmsg/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/sysmsg/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/sysmsg',
    method: 'put',
    data: obj
  })
}

export function putMsgUserObj(obj) {
  return request({
    url: '/admin/sysmsguser',
    method: 'put',
    data: obj
  })
}

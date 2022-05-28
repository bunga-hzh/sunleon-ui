import request from '@/router/axios'
import {
  dateFormat
} from "@/util/date"

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

// 修改阅读状态
export function setReadStatus(id) {
  return request({
    url: '/admin/sysmsguser',
    method: 'put',
    data: {
      id: id,
      status: 1,
      finishTime: dateFormat(new Date()).substring(0, dateFormat(new Date()).indexOf(' '))
    }
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

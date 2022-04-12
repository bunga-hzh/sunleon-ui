import {
  fetchList,
  addObj,
  getObj,
  delObj,
  putObj
} from '@/api/staff/crud'

export function get(type, page, params, search) {
  return fetchList(type, Object.assign({
      current: page.currentPage,
      size: page.pageSize,
    },
    params,
    search))
}

export function add(type, obj) {
  return addObj(type, obj)
}

export function edit(type, obj) {
  return putObj(type, obj)
}

export function del(type, id) {
  return delObj(type, id)
}

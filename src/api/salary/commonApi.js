import request from "@/router/axios";

/**
 * 查询
 * @param {*} type
 * @param {*} query
 * @returns
 */
export function fetchList(type, query) {
  return request({
    url: "/salary/sal" + type + "/page",
    method: "get",
    params: query,
  });
}

/**
 * 根据id查询
 * @param {*} type
 * @param {*} id
 * @returns
 */
export function getObj(type, id) {
  return request({
    url: "/salary/sal" + type + "/" + id,
    method: "get",
  });
}

/**
 * 添加
 * @param {*} type
 * @param {*} obj
 * @returns
 */
export function addObj(type, obj) {
  return request({
    url: "/salary/sal" + type,
    method: "post",
    data: obj,
  });
}

/**
 * 修改
 * @param {*} type
 * @param {*} obj
 * @returns
 */
export function putObj(type, obj) {
  return request({
    url: "/salary/sal" + type,
    method: "put",
    data: obj,
  });
}

/**
 * 删除
 * @param {*} type
 * @param {*} id
 * @returns
 */
export function delObj(type, id) {
  return request({
    url: "/salary/sal" + type + "/" + id,
    method: "delete",
  });
}

/**
 * 字典查询
 * @param {*} type
 * @returns
 */
export function getDict(type) {
  return request({
    url: "/admin/dict/type/" + type,
    method: "get",
  });
}

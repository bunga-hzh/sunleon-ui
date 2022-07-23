import request from "@/router/axios";

/**
 * 获取列表数据
 * @returns
 */
export function setStatus(obj) {
  return request({
    url: "/salary/salsetting/switch",
    method: "post",
    data: obj,
  });
}

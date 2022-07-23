import request from "@/router/axios";

/**
 * 获取列表数据
 * @returns
 */
export function fetchList() {
  return request({
    url: "/salary/saltype",
    method: "get",
  });
}

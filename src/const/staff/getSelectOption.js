import {
  getDictItem,
  getDeptTree
} from "@/api/staff/dictItem";
import {
  dictItems
} from "@/const/staff/dictItems";

// 获取组织架构
export function getDept() {
  return getDeptTree()
}

// 获取在职状态
export function getDqztk() {
  return getDictItem(dictItems['dqztk'])
}

// 获取健康状况
export function getJkzk() {
  return getDictItem(dictItems['jkzk'])
}

// 获取婚姻状况
export function getHyzk() {
  return getDictItem(dictItems['hyzk'])
}

// 获取户籍类别
export function getHjlb() {
  return getDictItem(dictItems['hjlb'])
}

// 获取合同类型
export function getHtlx() {
  return getDictItem(dictItems['htlx'])
}

// 获取教师类型
export function getJslx() {
  return getDictItem(dictItems['jslx'])
}

// 获取编制类型
export function getBzlx() {
  return getDictItem(dictItems['bzlx'])
}

// 获取增减类型
export function getZjx() {
  return getDictItem(dictItems['zjx'])
}

// 获取项目分类
export function getXmfl() {
  return getDictItem(dictItems['xmfl'])
}

// 获取使用状态
export function getSyzt() {
  return getDictItem(dictItems['syzt'])
}

// 获取人员岗位类型
export function getRygwlx() {
  return getDictItem(dictItems['rygwlx'])
}

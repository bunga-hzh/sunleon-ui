import {
  validatenull
} from "@/util/validate";

export function splitUploadData(url) {
  if (validatenull(url)) return undefined;
  return [{
    label: url.split("/")[4],
    value: url,
  }]
}

// 判断一个值是否存在数组中
export function isInArray(arr, value) {
  for (var i = 0; i < arr.length; i++) {
    if (value === arr[i]) {
      return true;
    }
  }
  return false;
}

// 判断是否为数组
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === "[object Array]";
}

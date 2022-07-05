let microvan = {}
microvan.checkFloatNum = function (value) {
  var pattern = /^([1-9]\d*|0)(\.\d*[1-9])?$/
  if (pattern.exec(value)) {
    return true
  }
  return false
}

microvan.checkPhone = function (value) {
  var pattern = /^0?1[3|4|5|7|8][0-9]\d{8}$/
  if (pattern.exec(value)) {
    return true
  }
  return false;
};

microvan.checkIdCard = function (value) {
  var pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (pattern.test(value) === false) {
    return false
  }
  return true
}

microvan.isEmpty = function (value) {
  if (value == "" || value.trim() == "" || value == null || typeof (value) == "undefined") {
    return true
  }
  return false
}

microvan.isNotEmpty = function (value) {
  return !microvan.isEmpty(value)
}

/**
 * 比较两个日期，格式yyyy-MM-dd
 * @param start
 * @param end
 * @returns {boolean}
 */
microvan.compareDate = function (start, end) {
  var d1 = new Date(start.replace(/-/g, "/"));
  var d2 = new Date(end.replace(/-/g, "/"));
  if (d1 > d2) {
    return false
  }
  return true
}

/**
 * 计算两个日期间隔天数，格式yyyy-MM-dd
 * @param start
 * @param end
 * @returns {number}
 */
microvan.computeDay = function (start, end) {
  if (microvan.isNotEmpty(start) && microvan.isNotEmpty(end)) {
    let startDate = new Date(start.replace(/-/g, "/"))
    let endDate = new Date(end.replace(/-/g, "/"))
    let time = endDate.getTime() - startDate.getTime()
    let day = parseInt(time / (1000 * 60 * 60 * 24))
    return day
  } else {
    return 0
  }
}

/**
 * 只能输入数字及小数，指定小数位数
 * @param obj
 * @param decLength
 */
microvan.verifyDigital = function (obj, decLength) {
  var regu = /^[0-9]+\.?[0-9]*$/
  var num = obj.val();
  if (!regu.test(num)) {
    return false;
  } else {
    if (num.indexOf('.') > -1) {
      if (num.split('.')[1].length > decLength) {
        return false;
      }
      if (num.split('.')[1] == '') {
        num = num.replace(".", "")
        obj.val(num)
      }
    }
  }
  return true
}

/**
 * 传入小数及保留位数
 * @param obj
 * @param pos
 */
microvan.formatDigital = function (obj, pos) {
  return Math.round(obj * Math.pow(10, pos)) / Math.pow(10, pos)
}

/**
 * 判断是否为图片或pdf类型
 * @param ext
 * @returns {boolean}
 */
microvan.isAssetTypeAnImage = function (ext) {
  return ['png', 'jpg', 'jpeg', 'bmp', 'pdf', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(ext.toLowerCase()) !== -1
}

/**
 * 根据身份证号获取出生年月
 * @param idCard
 *
 */
microvan.obatinBirthday = function (idCard) {
  let birthday = ""
  if (microvan.isNotEmpty(idCard) && microvan.checkIdCard(idCard)) {
    if (idCard.length == 15) {
      birthday = "19" + idCard.substr(6, 4)
    } else if (idCard.length == 18) {
      birthday = idCard.substr(6, 6)
    }
    birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2");
  }
  return birthday
}

export default microvan

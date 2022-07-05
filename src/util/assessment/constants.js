export const codeMessage = {
  201: '太棒了，保存成功！',
  202: '您的请求已提交，请耐心等待服务器处理！',
  204: '太棒了，删除成功！',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

export const STATUS = {
  NORMAL: 1,
  DELETE: 2
}

export const ASSESS_TYPE = {
  DZLDPZC: 1,
  FGLDPZC: 2,
  ZCZPHP: 3,
  QZPZC: 4,
  ZCPYG: 5
}

export const RANGE_TYPE = {
  DZLD: 1,
  FGLD: 2,
  BMFZR: 3,
  QTZC: 4,
  PTYG: 5
}

export const REG_STATE = {
  OPINION: 1,
  SUBMIT: 2,
  SUCCESS: 3,
  BACK: 4
}

export const SEX = {
  MALE: 1,
  FEMALE: 2
}

export const OPER_TYPE = {
  SEND_NORM: 1,
  RESULT: 2
}

export const ASSESS_STATE = {
  SAVE: 1,
  SUBMIT: 2
}
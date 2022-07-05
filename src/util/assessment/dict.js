import {
  STATUS,
  ASSESS_TYPE,
  REG_STATE,
  SEX,
  OPER_TYPE,
  ASSESS_STATE,
  RANGE_TYPE
} from './constants'

export const statusDict = {
  [STATUS.NORMAL]: '正常',
  [STATUS.DELETE]: '删除'
}

export const assessType = {
  [ASSESS_TYPE.DZLDPZC]: '党政领导评中层',
  [ASSESS_TYPE.FGLDPZC]: '分管领导评中层',
  [ASSESS_TYPE.ZCZPHP]: '中层自评互评',
  [ASSESS_TYPE.ZCPYG]: '中层评员工'
}

export const rangeType = {
  [RANGE_TYPE.DZLD]: '正职校级领导',
  [RANGE_TYPE.FGLD]: '副职校级领导',
  [RANGE_TYPE.BMFZR]: '部门负责人',
  [RANGE_TYPE.QTZC]: '其他中层',
  [RANGE_TYPE.PTYG]: '普通员工'
}

export const regState = {
  [REG_STATE.OPINION]: '待部门领导评鉴',
  [REG_STATE.SUBMIT]: '待审核',
  [REG_STATE.SUCCESS]: '审核通过',
  [REG_STATE.BACK]: '已退回'
}

export const sexDict = {
  [SEX.MALE]: '男',
  [SEX.FEMALE]: '女'
}

export const operType = {
  [OPER_TYPE.SEND_NORM]: '测评表下发',
  [OPER_TYPE.RESULT]: '考核结果生成'
}

export const assessState = {
  [ASSESS_STATE.SAVE]: '保存',
  [ASSESS_STATE.SUBMIT]: '提交'
}

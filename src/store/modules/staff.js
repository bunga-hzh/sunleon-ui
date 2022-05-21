const teacherInfo = {
  state: {
    staffId: undefined, //教职工ID
    dialogType: undefined, //弹窗类型
  },
  getters: {
    // 获取教职工ID
    getStaffId: state => {
      return state.staffId
    },
    // 获取教职工ID
    getDialogType: state => {
      return state.dialogType
    }
  },
  mutations: {
    // 设置教职工ID
    setStaffId(state, staffId) {
      state.staffId = staffId
    },
    // 清空教职工ID
    emptyStaffId(state) {
      state.staffId = undefined
    },
    // 设置弹窗类型
    setDialogType(state, type) {
      state.dialogType = type
    },
    // 清空弹窗类型
    emptyDialogType(state) {
      state.dialogType = undefined
    },
  }
}

export default teacherInfo

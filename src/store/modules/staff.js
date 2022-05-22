const teacherInfo = {
  state: {
    staffId: undefined, //教职工ID
    dialogType: undefined, //弹窗类型
    activeItem: undefined, //激活项
    data: [], // 表格数据
    obj: {}, // 对象数据
  },
  getters: {
    // 获取教职工ID
    getStaffId: state => {
      return state.staffId
    },
    // 获取教职工ID
    getDialogType: state => {
      return state.dialogType
    },
    // 获取激活项
    getActiveItem: state => {
      return state.activeItem
    },
    // 获取表格数据
    getData: state => {
      return state.data
    },
    // 获取对象数据
    getObj: state => {
      return state.obj
    },
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
    // 设置激活项
    setActiveItem(state, item) {
      state.activeItem = item
    },
    // 清空激活项
    emptyActiveItem(state) {
      state.activeItem = undefined
    },
    // 设置表格数据
    setData(state, data) {
      state.data = data
    },
    // 清空表格数据
    emptyData(state) {
      state.data = undefined
    },
    // 设置对象数据
    setObj(state, obj) {
      state.obj = obj
    },
    // 清空对象数据
    emptyObj(state) {
      state.obj = {}
    },
  }
}

export default teacherInfo

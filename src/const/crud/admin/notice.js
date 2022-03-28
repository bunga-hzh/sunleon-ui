export const data = [{
    title: "测试",
    notice_type: "通知公告",
    publisher: "张三",
    priority: "高",
    notice_obj: "全体用户",
    pub_status: "已发布",
    pub_time: "2022-03-26 11:51:10",
    revoke_time: "",
  },
  {
    title: "测试",
    notice_type: "通知公告",
    publisher: "张三",
    priority: "高",
    notice_obj: "全体用户",
    pub_status: "已发布",
    pub_time: "2022-03-26 11:51:10",
    revoke_time: "",
  },
]
export const option = {
  addBtn: false,
  delBtn: false,
  editBtn: false,
  align: "center",
  searchMenuSpan: 4,
  border: true,
  column: [{
      label: "标题",
      prop: "title",
      search: true,
    },
    {
      label: "消息类型",
      prop: "notice_type",
    },
    {
      label: "发布人",
      prop: "publisher",
    },
    {
      label: "优先级",
      prop: "priority",
    },
    {
      label: "通告对象",
      prop: "notice_obj",
    },
    {
      label: "发布状态",
      prop: "pub_status",
    },
    {
      label: "发布时间",
      prop: "pub_time",
      width: 150,
    },
    {
      label: "撤销时间",
      prop: "revoke_time",
      width: 150,
    },
  ],
}
export const rules = {
  type: [{
    required: true,
    message: "选择消息类型"
  }],
  title: [{
    required: true,
    message: "请输入标题",
    trigger: "blur"
  }],
  summary: [{
    required: true,
    message: "请输入摘要",
    trigger: "blur"
  }],
  up_by_time: [{
    required: true,
    message: "请选择结束时间"
  }],
  user_type: [{
    required: true,
    message: "请选择结束用户"
  }],
}
export const selectUserOption = {
  searchMenuSpan: 6,
  addBtn: false,
  border: true,
  menu: false,
  selection: true,
  column: [{
      label: "教职工号",
      prop: "uid",
      search: true,
    },
    {
      label: "姓名",
      prop: "name",
      search: true,
    },
    {
      label: "部门",
      prop: "dep",
      search: true,
      searchslot: true,
    },
  ],
}
export const selectUserData = [{
    uid: 123,
    name: "张三",
    dep: "部门一",
  },
  {
    uid: 456,
    name: "李四",
    dep: "部门一",
  },
  {
    uid: 789,
    name: "王五",
    dep: "部门一",
  },
]
export const depOptions = [{
    id: "1",
    depName: "部门一",
  },
  {
    id: "2",
    depName: "部门二",
  },
  {
    id: "3",
    depName: "部门三",
  },
]
export const selectOption = {
  menuWidth: 100,
  addBtn: false,
  columnBtn: false,
  refreshBtn: false,
  editBtn: false,
  border: true,
  column: [{
    label: "姓名",
    prop: "name",
  }, ],
}
export const selectUserOptions = [{
    uid: 123,
    name: "张三",
  },
  {
    uid: 456,
    name: "李四",
  },
  {
    uid: 789,
    name: "王五",
  },
]

export const data = [{
    user: "zhangsan",
    name: "张三",
    sex: "男",
    dep: "党委组织部",
    identity: "教工",
    cardId: "111111111111111111",
    phone: "13888888888",
    status: "在职员工",
    a: "在职员工",
    b: "在职员工",
    c: "在职员工",
  },
  {
    user: "zhangsan",
    name: "老六老六",
    sex: "男",
    dep: "党委组织部",
    identity: "教工",
    cardId: "111111111111111111",
    phone: "13888888888",
    status: "在职员工",
    a: "在职员工",
    b: "在职员工",
    c: "在职员工",
  },
]

export const option = {
  align: 'center',
  addBtn: false,
  border: true,
  searchMenuSpan: 4,
  viewBtn: true,
  delBtn: false,
  column: [{
      label: "账号",
      prop: "user",
    },
    {
      label: "姓名",
      prop: "name",
      search: true,
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "组织机构",
      prop: "dep",
      search: true,
    },
    {
      label: "身份类型",
      prop: "identity",
    },
    {
      label: "身份证号",
      prop: "cardId",
      minWidth: 100,
    },
    {
      label: "手机号",
      prop: "phone",
    },
    {
      label: "在职状态",
      prop: "status",
      search: true,
    },
  ],
}

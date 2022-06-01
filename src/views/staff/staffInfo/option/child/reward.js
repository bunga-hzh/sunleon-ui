export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
      label: "教职工ID",
      prop: "staffId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "change"
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "change"
      }],
    },
    {
      label: "所属部门",
      prop: "deptId",
      search: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请选择 部门",
        trigger: "change"
      }],
    },
    {
      label: "奖励名称",
      prop: "jlmc",
    },
    {
      label: "荣誉奖励级别",
      prop: "jljbm",

    },
    {
      label: "奖励类别",
      prop: "jllbm",
    },
    {
      label: "荣誉和奖励原因",
      prop: "jlyy",
      width: 120,
    },
    {
      label: "奖励时间",
      prop: "jlsj",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "奖励单位",
      prop: "jldw",
    },
    {
      label: "备注",
      prop: "bz",
      type: "textarea",
      span: 24,
    },
  ]
}

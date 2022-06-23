export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  searchSpan: 8,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "blur"
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
        trigger: "blur"
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
        message: "请选择 所属部门",
        trigger: "blur"
      }],
    },
    {
      label: "奖励名称",
      prop: "jlmc",
      rules: [{
        required: true,
        message: "请选择 奖励名称",
        trigger: "blur"
      }],
    },
    {
      label: "荣誉奖励级别",
      prop: "jljbm",
      rules: [{
        required: true,
        message: "请选择 荣誉奖励级别",
        trigger: "blur"
      }],

    },
    {
      label: "奖励类别",
      prop: "jllbm",
      rules: [{
        required: true,
        message: "请选择 奖励类别",
        trigger: "blur"
      }],
    },
    {
      label: "荣誉和奖励原因",
      prop: "jlyy",
      width: 120,
      rules: [{
        required: true,
        message: "请选择 荣誉和奖励原因",
        trigger: "blur"
      }],
    },
    {
      label: "奖励时间",
      prop: "jlsj",
      type: "date",
      valueFormat: "yyyy-MM-dd",
      rules: [{
        required: true,
        message: "请选择 奖励时间",
        trigger: "blur"
      }],
    },
    {
      label: "奖励单位",
      prop: "jldw",
      rules: [{
        required: true,
        message: "请选择 奖励单位",
        trigger: "blur"
      }],
    },
    {
      label: "备注",
      prop: "bz",
      type: "textarea",
      span: 24,
    },
  ]
}

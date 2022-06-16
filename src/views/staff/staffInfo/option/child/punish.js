export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  searchSpan: 8,
  searchLabelWidth: 120,
  viewBtn: true,
  addBtn: false,
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
      label: "处分类别",
      prop: "cflb",
    },
    {
      label: "处分原因",
      prop: "cfyy",
    },
    {
      label: "处分记录描述",
      prop: "cfjlms",
    },
    {
      label: "处分单位名称",
      prop: "cfdwmc",
    },
    // {
    //   label: "处分日期",
    //   prop: "cfrq",
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    // {
    //   label: "处分撤销日期",
    //   prop: "cfcxrq",
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    {
      label: "处分日期-撤销日期",
      prop: "cfrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '处分日期',
      endPlaceholder: '撤销日期',
      rules: [{
        required: true,
        message: '请选择处分日期-撤销日期'
      }],
      slot: true,
      width: 160,
    },
    {
      label: "处分撤销原因",
      prop: "cfcxyy",
      type: "textarea",
      span: 24,
    },
  ]
}
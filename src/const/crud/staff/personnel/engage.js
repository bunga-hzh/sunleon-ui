export const option = {
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  align: 'center',
  labelWidth: 120,
  menuWidth: 140,
  index: true,
  viewBtn: true,
  menuWidth: 200,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
    },
    {
      label: "部门",
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
    },
    {
      label: "聘任名称",
      prop: "engageName",
    },
    {
      label: "专家级别",
      prop: "expertLevel",
    },
    {
      label: "待遇",
      prop: "salary",
    },
    {
      label: "原因",
      prop: "reason",
      type: 'textarea',
      span: 24,
    },
    {
      label: "聘任起止时间",
      prop: "sarteDate",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '聘任开始日期',
      endPlaceholder: '聘任结束日期',
      span: 24,
      searchLabelWidth: 120,
      width: 160,
      rules: [{
        required: true,
        message: '请选择聘任起止时间'
      }]
    },
    // {
    //   searchLabelWidth: 120,
    //   label: "聘任开始时间",
    //   prop: "sarteDate",
    //   type: "date",
    //   addDisplay: false,
    //   editDisplay: false,
    //   width: 200,
    //   valueFormat: 'yyyy-MM-dd'
    // },
    // {
    //   searchLabelWidth: 120,
    //   label: "聘任结束时间",
    //   prop: "endDate",
    //   type: "date",
    //   addDisplay: false,
    //   editDisplay: false,
    //   width: 200,
    //   valueFormat: 'yyyy-MM-dd'
    // },
    {
      label: "备注",
      prop: "memo",
      type: 'textarea',
      span: 24,
    },
  ],
}

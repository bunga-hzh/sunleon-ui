export const option = {
  align: 'center',
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  index: true,
  labelWidth: 150,
  menuWidth: 160,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      editDisabled: true,
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
    },
    {
      label: "所属部门",
      prop: "orgId",
      search: true,
      addDisabled: true,
      editDisabled: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
    },
    {
      label: "薪资",
      prop: "xz",
      type: "number",
      minRows: 0,
      value: 0,
    },
    {
      label: "岗位名称",
      prop: "gwmc",
    },
    // {
    //   label: "开始时间",
    //   prop: "startDate",
    //   width: 170,
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    // {
    //   label: "结束时间",
    //   prop: "endDate",
    //   width: 170,
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    {
      label: "开始时间-结束时间",
      prop: "startDate",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      width: 180,
      rules: [{
        required: true,
        message: '请选择开始时间-结束时间'
      }]
    },
    {
      label: "备注",
      prop: "bz",
      type: "textarea",
      span: 24,
    },
  ],
}

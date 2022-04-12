export const option = {
  border: true,
  searchMenuSpan: 4,
  searchSpan: 7,
  align: 'center',
  labelWidth: 120,
  index: true,
  column: [{
      label: "工号",
      prop: "gh",
      search: true,
      // type: 'number',
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
    },
    {
      label: "部门",
      prop: "deptId",
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/post_type',
      props: {
        "label": "label",
        "value": "value"
      },
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
    },
    {
      searchLabelWidth: 120,
      label: "聘任开始时间",
      prop: "sarteDate",
      type: "date",
      search: true,
      width: 200,
      valueFormat: 'yyyy-MM-dd'
    },
    {
      searchLabelWidth: 120,
      label: "聘任结束时间",
      prop: "endDate",
      type: "date",
      search: true,
      width: 200,
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "备注",
      prop: "memo",
      type: 'textarea',
    },
  ],
}

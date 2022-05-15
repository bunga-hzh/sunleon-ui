// 表格配置对象
export const option = {
  align: 'center',
  border: true,
  index: true,
  searchMenuSpan: 4,
  labelWidth: 120,
  searchSpan: 7,
  menuWidth: 140,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      searchSpan: 7,
      slotForm: true,
    },
    {
      label: "工号",
      prop: "staffId",
      search: true,
      addDisabled: true,
      editDisabled: true,
    },
    {
      label: "部门名称",
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
      width: 120,
    },
    {
      label: "异动类型",
      prop: "changeType",
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/dqztk_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: "异动时间",
      prop: "changeDate",
      width: 100,
      type: 'date',
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "异动开始时间",
      prop: "changeStartDate",
      width: 170,
      type: 'date',
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "异动结束时间",
      prop: "changeEndDate",
      width: 170,
      type: 'date',
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "异动原因",
      prop: "changeReason",
    },
    {
      label: "备注",
      prop: "memo",
      type: "textarea",
      span: 24,
    },
    {
      label: "证明附件",
      prop: "changeEvidence",
      type: 'upload',
      propsHttp: {
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
  ],
}

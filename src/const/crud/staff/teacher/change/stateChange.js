// 表格配置对象
export const option = {
  align: 'center',
  border: true,
  index: true,
  labelWidth: 120,
  searchSpan: 6,
  menuWidth: 100,
  viewBtn: true,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      rules: [{
        required: true,
        message: "请输入 姓名",
        trigger: "blur"
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "blur"
      }],
    },
    {
      label: "部门名称",
      prop: "deptId",
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
      rules: [{
        required: true,
        message: "请选择 部门名称",
        trigger: "blur"
      }],
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
      rules: [{
        required: true,
        message: "请输入 异动类型",
        trigger: "blur"
      }],
    },
    {
      label: "异动时间",
      prop: "changeDate",
      width: 100,
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 异动时间",
        trigger: "blur"
      }],
    },
    {
      label: "异动原因",
      prop: "changeReason",
      rules: [{
        required: true,
        message: "请输入 异动原因",
        trigger: "blur"
      }],
    },
    // {
    //   label: "异动开始时间",
    //   prop: "changeStartDate",
    //   width: 170,
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd'
    // },
    // {
    //   label: "异动结束时间",
    //   prop: "changeEndDate",
    //   width: 170,
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd'
    // },
    {
      label: "异动起止时间",
      prop: "changeStartDate",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '异动开始时间',
      endPlaceholder: '异动结束时间',
      slot: true,
      width: 160,
      span: 24,
      rules: [{
        required: true,
        message: '请选择异动起止时间'
      }]
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
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
  ],
}

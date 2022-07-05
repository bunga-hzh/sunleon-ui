export const option = {
  align: 'center',
  border: true,
  searchSpan: 6,
  index: true,
  menuWidth: 200,
  labelWidth: 120,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请选择 用户',
        trigger: 'blur',
      }]
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入 工号',
        trigger: 'blur',
      }]
    },
    {
      label: "所属部门",
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
      rules: [{
        required: true,
        message: '请选择 所属部门',
        trigger: 'blur',
      }]
    },
    {
      label: "岗位",
      prop: "gwmc",
      addDisabled: true,
      editDisabled: true,
      type: "select",
      dicUrl: 'staff/zzjgcommon/all/post',
      search: true,
      props: {
        label: "postName",
        value: "postId",
      },
      rules: [{
        required: true,
        message: '请选择 岗位',
        trigger: 'blur',
      }]
    },
    {
      label: "试用期（月）",
      prop: "syq",
      type: "number",
      minRows: 0,
      valueDefault: 0,
      rules: [{
        required: true,
        message: '请输入 试用期（月）',
        trigger: 'blur',
      }]
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
      label: "起止时间",
      prop: "startDate",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      width: 180,
      rules: [{
        required: true,
        message: '请选择开始时间-结束时间',
        trigger: 'blur',
      }]
    },
    {
      label: "不合格原因",
      prop: "reason",
      type: "textarea",
      span: 24,
      rules: [{
        required: true,
        message: '请输入 不合格原因',
        trigger: 'blur',
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

export const option = {
  align: 'center',
  border: true,
  searchSpan: 8,
  index: true,
  labelWidth: 150,
  menuWidth: 200,
  viewBtn: true,
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
    // {
    //   label: "入职日期",
    //   prop: "lzrq",
    //   width: 160,
    //   type: 'date',
    //   valueFormat: "yyyy-MM-dd",
    // },
    // {
    //   label: "转正日期",
    //   prop: "zzrq",
    //   width: 160,
    //   type: 'date',
    //   valueFormat: "yyyy-MM-dd",
    // },
    {
      label: "入职日期-转正日期",
      prop: "lzrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '入职日期',
      endPlaceholder: '转正日期',
      width: 180,
      span: 24,
      rules: [{
        required: true,
        message: '请选择入职日期-转正日期'
      }]
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
    },
  ],
}

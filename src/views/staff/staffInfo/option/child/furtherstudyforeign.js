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
      label: "护照证件种类",
      prop: 'hzzjzldm',
      type: 'select',
      dicUrl: "/admin/dict/type/passport_type",
      rules: [{
        required: true,
        message: '请选择 护照证件种类',
        trigger: "blur",
      }]
    },
    {
      label: "护照号/通行证号",
      prop: 'hzhtxzh',
      rules: [{
        required: true,
        message: '请输入 护照号/通行证号',
        trigger: "blur",
      }]
    },
    {
      label: "签发地点",
      prop: 'qfdd',
      rules: [{
        required: true,
        message: '请输入 签发地点',
        trigger: "blur",
      }]
    },
    {
      label: "签发机关",
      prop: 'qfjg',
      rules: [{
        required: true,
        message: '请输入 签发机关',
        trigger: "blur",
      }]
    },
    // {
    //   label: "签发日期",
    //   prop: 'qfrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "终止日期",
    //   prop: 'zzrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "签发日期-终止日期",
      prop: "qfrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '签发日期',
      endPlaceholder: '终止日期',
      slot: true,
      width: 160,
      rules: [{
        required: true,
        message: '请选择签发日期-终止日期'
      }]
    },
  ]
}

export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "护照证件种类",
      prop: 'hzzjzldm',
      type: 'select',
      dicUrl: "/admin/dict/type/passport_type",
      rules: [{
        required: true,
        message: "请选择 护照证件种类",
        trigger: "blur"
      }],
    },
    {
      label: "护照号/通行证号",
      prop: 'hzhtxzh',
      rules: [{
        required: true,
        message: "请输入 护照号/通行证号",
        trigger: "blur"
      }],
    },
    {
      label: "签发地点",
      prop: 'qfdd',
      rules: [{
        required: true,
        message: "请输入 护照号/通行证号",
        trigger: "blur"
      }],
    },
    {
      label: "签发机关",
      prop: 'qfjg',
      rules: [{
        required: true,
        message: "请输入 护照号/通行证号",
        trigger: "blur"
      }],
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
        message: "请输入 签发日期-终止日期",
        trigger: "blur"
      }],
    },
  ]
}

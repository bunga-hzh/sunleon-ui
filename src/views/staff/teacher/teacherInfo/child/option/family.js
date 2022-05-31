export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  addBtn: true,
  column: [{
      label: "称谓",
      prop: 'cw',
      rules: [{
        required: true,
        message: '请输入 称谓'
      }]
    },
    {
      label: "姓名",
      prop: 'xm',
      rules: [{
        required: true,
        message: '请输入 姓名'
      }]
    },
    {
      label: "出生日期",
      prop: 'csrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 出生日期'
      }]
    },
    {
      label: "政治面貌",
      prop: 'zzmmm',
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/politics_type',
      rules: [{
        required: true,
        message: '请选择 政治面貌'
      }]
    },
    {
      label: "单位名称",
      prop: 'dwmc',
      rules: [{
        required: true,
        message: '请输入 单位名称'
      }]
    },
    {
      label: "职务",
      prop: 'jtcyzym',
      rules: [{
        required: true,
        message: '请输入 职务'
      }]
    },
    {
      label: "联系方式",
      prop: 'lxfs',
    },
  ]
}

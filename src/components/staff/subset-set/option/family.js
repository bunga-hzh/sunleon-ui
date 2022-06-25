export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "称谓",
      prop: 'cw',
      rules: [{
        required: true,
        message: "请输入 称谓",
        trigger: "blur"
      }],
    },
    {
      label: "家庭成员姓名",
      prop: 'jtcyxm',
      rules: [{
        required: true,
        message: "请输入 家庭成员姓名",
        trigger: "blur"
      }],
    },
    {
      label: "出生日期",
      prop: 'csrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 出生日期",
        trigger: "blur"
      }],
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
        message: "请选择 政治面貌",
        trigger: "blur"
      }],
    },
    {
      label: "单位名称",
      prop: 'dwmc',
      rules: [{
        required: true,
        message: "请输入 单位名称",
        trigger: "blur"
      }],
    },
    {
      label: "职务",
      prop: 'jtcyzym',
      rules: [{
        required: true,
        message: "请输入 职务",
        trigger: "blur"
      }],
    },
    {
      label: "联系方式",
      prop: 'lxfs',
    },
  ]
}

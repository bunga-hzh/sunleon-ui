export const familyOption = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  addBtn: true,
  column: [{
      label: "称谓",
      prop: 'cw',
    },
    {
      label: "姓名",
      prop: 'xm',
    },
    {
      label: "出生日期",
      prop: 'csrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
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
    },
    {
      label: "单位名称",
      prop: 'dwmc',
    },
    {
      label: "家庭成员职业",
      prop: 'jtcyzym',
    },
    {
      label: "联系方式",
      prop: 'lxfs',
    },
  ]
}

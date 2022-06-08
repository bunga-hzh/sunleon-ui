export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "姓名",
      prop: "xm",
    },
    {
      label: "工号",
      prop: "gh",
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
    },
    {
      label: "护照证件种类",
      prop: 'hzzjzldm',
      type: 'select',
      dicUrl: "/admin/dict/type/passport_type",
    },
    {
      label: "护照号/通行证号",
      prop: 'hzhtxzh',
    },
    {
      label: "签发地点",
      prop: 'qfdd',
    },
    {
      label: "签发机关",
      prop: 'qfjg',
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
    },
  ]
}

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
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
    },
    {
      label: "称谓",
      prop: 'cw',
    },
    {
      label: "家庭成员姓名",
      prop: 'jtcyxm',
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
      label: "职务",
      prop: 'jtcyzym',
    },
    {
      label: "联系方式",
      prop: 'lxfs',
    },
  ]
}

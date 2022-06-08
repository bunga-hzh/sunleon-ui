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
      label: "奖励名称",
      prop: "jlmc",
    },
    {
      label: "荣誉奖励级别",
      prop: "jljbm",

    },
    {
      label: "奖励类别",
      prop: "jllbm",
    },
    {
      label: "荣誉和奖励原因",
      prop: "jlyy",
      width: 120,
    },
    {
      label: "奖励时间",
      prop: "jlsj",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "奖励单位",
      prop: "jldw",
    },
    {
      label: "备注",
      prop: "bz",
      type: "textarea",
      span: 24,
    },
  ]
}

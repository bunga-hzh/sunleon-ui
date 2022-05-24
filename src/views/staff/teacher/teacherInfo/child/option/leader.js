export const option = {
  align: 'center',
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  addBtn: true,
  column: [{
      label: "部门",
      prop: 'bm',
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
    },
    {
      label: "职务名称",
      prop: 'zwmc',
    },
    {
      label: "任职方式",
      prop: 'rzfsm',
      type: "select",
      dicUrl: "/admin/dict/type/appointment_type"
    },
    {
      label: "任免职文号",
      prop: 'rmzwh',
    },
    {
      label: "职务级别",
      prop: 'zwjbm',
    },
    {
      label: "任本职级时间",
      prop: 'rbzjsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "领导任职文件",
      prop: "ldrzwj",
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'res_id',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
    },
  ]
}

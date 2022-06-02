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
    // {
    //   label: "起始时间",
    //   prop: 'qssj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "终止时间",
    //   prop: 'zzsj',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "起止时间",
      prop: "qssj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '起始时间',
      endPlaceholder: '终止时间',
      slot: true,
      width: 160,
    },
    {
      label: "所在单位",
      prop: 'szdw',
    },
    {
      label: "职务",
      prop: 'zw',
    },
    {
      label: "聘任时限",
      prop: 'prsx',
      type: "number",
    },
    {
      label: "单位所在省份",
      prop: 'dwszsf',
      width: 120,
    },
    {
      label: "证明人",
      prop: 'zmr',
    },
    {
      label: "上传电子证明",
      prop: 'scdzzm',
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
  ]
}

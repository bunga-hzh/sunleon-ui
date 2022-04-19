export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  labelWidth: 120,
  column: [{
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '职工编码',
      prop: 'zgbh',
      search: true,
    },
    {
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '证件号码',
      prop: 'zjhm',
      search: true,
    },
    {
      label: '人员分类',
      prop: 'ryfl',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/rygwlx_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: '生成时间',
      prop: 'scsj',
    },
    {
      label: '在职证明文件',
      prop: 'zzzmwj',
      span: 24,
      formslot: true,
    },
  ]
}

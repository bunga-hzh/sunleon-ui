export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  labelWidth: 150,
  column: [{
      label: '字段编号',
      prop: 'zdbh',
      search: true,
      searchSpan: 7,
      rules: [{
        required: true,
        message: '请输入字段名称',
        trigger: 'blur',
      }]
    },
    {
      label: '工资项名称',
      prop: 'gzxmc',
      search: true,
      searchLabelWidth: 120,
      searchSpan: 7,
      width: 240,
      rules: [{
        required: true,
        message: '请输入工资项名称',
        trigger: 'blur',
      }]
    },
    {
      label: '项目分类',
      prop: 'xmfl',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      rules: [{
        required: true,
        message: '请选择项目分类',
        trigger: 'blur',
      }]
    },
    {
      label: '增减项',
      prop: 'zjx',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      slot: true,
      rules: [{
        required: true,
        message: '请选择增减项',
        trigger: 'blur',
      }]
    },
    {
      label: '使用状态',
      prop: 'syzt',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      slot: true,
      rules: [{
        required: true,
        message: '请选择使用状态',
        trigger: 'blur',
      }]
    },
    {
      label: '描述',
      prop: 'ms',
      formslot: true,
    }
  ]
}

export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  labelWidth: 120,
  menuWidth: 340,
  column: [{
      label: '编号',
      prop: 'bh',
      search: true,
    },
    {
      label: '名称',
      prop: 'mc',
      search: true,
    },
    {
      label: '开始时间',
      prop: 'kssj',
    },
    {
      label: '结束时间',
      prop: 'jssj',
    },
    {
      label: '使用状态',
      prop: 'syzt',
    },
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 8,
  labelWidth: 120,
  column: [{
      label: '岗位等级',
      prop: 'gwdj',
      search: true,
    },
    {
      label: '工资标准（元）',
      prop: 'gzbz',
    },
  ]
}

export const datas = [
  [{}],
]

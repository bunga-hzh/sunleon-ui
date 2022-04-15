export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 280,
  addBtn: false,
  searchSpan: 7,
  column: [{
      label: '流程名称',
      prop: 'lcmc',
      search: true,
    },
    {
      label: '创建时间',
      prop: 'cjsj',
    },
    {
      label: '审核状态',
      prop: 'shzt',
      search: true,
      type: 'select',
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}

export const data = [{
  lcmc: '校内奖金发放',
  cjsj: '2019-01-01',
  shzt: '审核中',
  ms: '描述1'
}, {
  lcmc: '绩效内零星收入',
  cjsj: '2019-01-01',
  shzt: '审核中',
  ms: '描述1'
}, {
  lcmc: '绩效外零星收入',
  cjsj: '2019-01-01',
  shzt: '审核中',
  ms: '描述1'
}, {
  lcmc: '其它不定时发放',
  cjsj: '2019-01-01',
  shzt: '审核中',
  ms: '描述1'
}]

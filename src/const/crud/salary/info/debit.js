export const option = {
  algin: 'center',
  border: true,
  index: true,
  searchMenuSpan: 4,
  searchSpan: 7,
  column: [{
      label: '职工编码',
      prop: 'zgbh',
      search: true,
    },
    {
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '字段名称',
      prop: 'zdmc',
      search: true,
    },
    {
      label: '扣款名称',
      prop: 'kkmc',
      search: true,
    },
    {
      label: '扣款金额',
      prop: 'kkje',
      type: 'number',
    },
    {
      label: '扣款原因',
      prop: 'kkyy',
      type: 'number',
    },
    {
      label: '扣款时间',
      prop: 'kksj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: '备注',
      prop: 'bz',
      type: 'textarea',
    },
  ]
}

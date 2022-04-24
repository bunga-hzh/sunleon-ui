export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 6,
  column: [{
      label: '审核部门',
      prop: 'shbm',
      search: true,
      type: 'select',
    },
    {
      label: '审核人',
      prop: 'shr',
      search: true,
    },
    {
      label: '审核内容',
      prop: 'shnr',
      search: true,
      type: 'select',
    },
    {
      label: '添加时间',
      prop: 'tjsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    {
      label: '备注',
      prop: 'bz',
    }
  ]
}

export const sensitiveOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan:4,
  column: [
    {
      label: '不合规名称',
      prop: 'mgcMc',
      search:true,
      searchLabelWidth:160
    },
    {
      label: '创建时间',
      prop: 'cjsj',
      addDisplay:false,
      editDisplay:false,
    },
    {
      label: '最后修改时间',
      prop: 'gxsj',
      addDisplay:false,
      editDisplay:false,
    },
    {
      label: '创建人',
      prop: 'userName',
      addDisplay:false,
      editDisplay:false,
    },
  ]
}

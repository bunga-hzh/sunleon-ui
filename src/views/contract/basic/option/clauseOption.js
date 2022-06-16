export const clauseOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan:8,
  column: [
    {
      label: '条款编号',
      prop: 'tkBh',
      search:true,
      span: 24
    },
    {
      label: '条款信息',
      prop: 'tkXx',
      search:true,
      span: 24
    },
    {
      label: '所属合同类型',
      prop:'htlxMc',
      addDisplay:false,
      editDisplay:false,
    },
    {
      label: '所属合同类型',
      span: 24,
      hide:true,
      prop: 'htlxId',
      filter:true,
      type: 'tree',
      dicUrl: '/act/htLx/tree',
      props: {
        label: 'htlxMc',
        value: 'id'
      }
    },
    {
      label: '条款类型',
      prop: 'tklxId',
      type: "select",
      span: 24,
      dicUrl: "/admin/dict/type/httk_type"
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
    }
  ]
}

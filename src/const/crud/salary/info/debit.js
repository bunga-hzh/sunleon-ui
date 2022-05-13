export const option = {
  algin: 'center',
  border: true,
  index: true,
  searchMenuSpan: 4,
  searchSpan: 7,
  column: [{
      label: '工号',
      prop: 'gh',
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
      label: '月份',
      prop: 'yf',
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
      searchSpan: 6,
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

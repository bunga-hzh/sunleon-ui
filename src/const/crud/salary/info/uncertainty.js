export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  column: [{
      label: '业务年度',
      prop: 'ywnd',
      search: 'true',
      type: 'year'
    },
    {
      label: '月份',
      prop: 'yf',
      search: 'true',
      type: 'month',
    },
    {
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
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
      label: '发放事由',
      prop: 'ffsy',
      type: 'select',
      search: true,
    },
    {
      label: '发放奖励',
      prop: 'ffjl',
    },
    {
      label: '发放金额',
      prop: 'ffje',
    },
    {
      label: '发放原因',
      prop: 'ffyy',
    },
    {
      label: '备注',
      prop: 'bz',
    },
  ]
}

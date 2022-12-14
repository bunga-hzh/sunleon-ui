export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 7,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: '月份',
      prop: 'yf',
      search: true,
      type: 'month',
    },
    {
      label: '表格名称',
      prop: 'bgmc',
      search: true,
    },
    {
      label: '生成时间',
      prop: 'scsj',
      type: 'date'
    },
    {
      label: '备注',
      prop: 'bz',
    }
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  menu: false,
  addBtn: false,
  columnBtn: false,
  column: [{
      label: '部门',
      prop: 'bm',
    },
    {
      label: '工号',
      prop: 'gh',
    },
    {
      label: '姓名',
      prop: 'xm',
    },
    {
      label: '银行卡号',
      prop: 'yhkh',
    },
    {
      label: '工作月份',
      prop: 'gzyf',
    },
    {
      label: '工作系数',
      prop: 'gzxs',
    },
    {
      label: '应发1',
      prop: 'yf1',
    },
    {
      label: '应发2',
      prop: 'yf2',
    },
    {
      label: '应发3',
      prop: 'yf3',
    },
    {
      label: '应发4',
      prop: 'yf4',
    },
    {
      label: '应发5',
      prop: 'yf5',
    },
    {
      label: '应发6',
      prop: 'yf6',
    },
    {
      label: '应发7',
      prop: 'yf7',
    },
    {
      label: '应发8',
      prop: 'yf8',
    },
    {
      label: '应发9',
      prop: 'yf9',
    },
    {
      label: '应发10',
      prop: 'yf10',
    },
    {
      label: '扣减金额',
      prop: 'kjje',
    },
    {
      label: '个税扣款',
      prop: 'gskk',
    },
    {
      label: '合计实发',
      prop: 'hjsf',
    },
    {
      label: '备注',
      prop: 'bz',
    },
  ]
}

export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 6,
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
      width: '200',
      search: true,
    },
    {
      label: '总金额',
      prop: 'zje',
      type: 'Number',
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
  menuWidth: 120,
  addBtn: false,
  columnBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
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
      label: '人员分类',
      prop: 'ryfl',
    },
    {
      label: '月份',
      prop: 'yf',
    },
    {
      label: '加班费',
      prop: 'jbf',
    },
    {
      label: '值班费',
      prop: 'zbf',
    },
    {
      label: '劳务费',
      prop: 'lwf',
    },
    {
      label: '各种津贴费',
      prop: 'gzjtf',
      width: 120,
    },
    {
      label: '各种奖励费',
      prop: 'gzjlf',
      width: 120,
    },
    {
      label: '课题费',
      prop: 'ktf',
    },
    {
      label: '高温费',
      prop: 'gwf',
    },
    {
      label: '饭贴',
      prop: 'ft',
    },
    {
      label: '一次性奖励',
      prop: 'ycxjl',
      width: 120,
    },
    {
      label: '增发能级',
      prop: 'zfnj',
    },
    {
      label: '其他',
      prop: 'qt',
    },
    {
      label: '合计',
      prop: 'hj',
    },
    {
      label: '校务会通过时间',
      prop: 'xwhtgsj',
    },
    {
      label: '附件',
      prop: 'fj',
    },
  ]
}

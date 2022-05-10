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
    },
    {
      label: '审核通过时间',
      prop: 'shtgsj',
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
  menuWidth: 140,
  addBtn: false,
  columnBtn: false,
  column: [{
      label: '工号',
      prop: 'gh',
    },
    {
      label: '姓名',
      prop: 'xm',
    },
    {
      label: '部门名称',
      prop: 'bmmc',
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
      label: '字段名称',
      prop: 'zdmc',
    },
    {
      label: '扣款名称',
      prop: 'kkmc',
    },
    {
      label: '扣款金额',
      prop: 'kkje',
    },
    {
      label: '扣款原因',
      prop: 'kkyy',
    },
    {
      label: '扣款时间',
      prop: 'kksj',
    },
    {
      label: '备注',
      prop: 'bz',
    },
  ]
}

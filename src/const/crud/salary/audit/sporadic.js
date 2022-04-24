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
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '月份',
      prop: 'yf'
    },
    {
      label: '表格名称',
      prop: 'bgmc',
      width: '200',
    },
    {
      label: '绩效类型',
      prop: 'jxlx',
      search: true,
      type: 'select',
    },
    {
      label: '总金额',
      prop: 'zje',
      type: 'Number',
    },
    {
      label: '申请时间',
      prop: 'sqsj',
      type: 'date'
    },
    {
      label: '审核状态',
      prop: 'shzt',
      search: true,
      type: 'select',
      slot: true,
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
      label: '项目名称',
      prop: 'xmmc',
    },
  ]
}

export const rules = {
  bgmc: [{
    required: true,
    message: '请输入表格名称',
    trigger: 'blur'
  }],
  jxlx: [{
    required: true,
    message: '请选择绩效类型',
  }]
}

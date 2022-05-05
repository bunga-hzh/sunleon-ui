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
      label: '表格名称',
      prop: 'bgmc'
    },
    {
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

export const options = [{
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 260,
    searchSpan: 6,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    column: [{
        label: '表格名称',
        prop: 'bgmc',
        width: '200',
      },
      {
        label: '部门名称',
        prop: 'bmmc',
      },
      {
        label: '月份',
        prop: 'yf',
        search: true,
        type: 'month',
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
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 260,
    searchSpan: 6,
    addBtn: false,
    editBtn: false,
    delBtn: false,
    column: [{
        label: '表格名称',
        prop: 'bgmc',
        width: '200',
      },
      {
        label: '部门名称',
        prop: 'bmmc',
      },
      {
        label: '月份',
        prop: 'yf',
        search: true,
        type: 'month',
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
  },
]

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
      label: '工作月份',
      prop: 'gzyf',
    },
    {
      label: '工作系数',
      prop: 'gzxs',
    },
    {
      label: '项目名称',
      prop: 'xmmc',
    },
  ]
}

export const rules = {
  xmmc: [{
    required: true,
    message: '请输入表格名称',
    trigger: 'blur'
  }],
  zjlx: [{
    required: true,
    message: '请选择绩效类型',
  }],
  je: [{
    required: true,
    message: '请输入金额',
    trigger: 'blur'
  }]
}

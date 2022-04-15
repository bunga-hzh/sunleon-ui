export const opiton = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  addBtn: false,
  column: [{
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
      label: '职工编码',
      prop: 'zgbh',
      search: true,
    },
    {
      label: '证件号码',
      prop: 'zjhm',
    },
    {
      label: '级数',
      prop: 'js',
      search: true,
      type: 'select'
    },
    {
      label: '税率（%）',
      prop: '税率',
    },
    {
      label: '数算扣款数',
      prop: 'sskks',
    },
  ]
}

export const data = [{
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '1',
    qnynssde: '不超过36000元的',
    '税率': '3',
    sskks: '0'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '2',
    qnynssde: '超过36000元至144000',
    '税率': '10',
    sskks: '2520'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '3',
    qnynssde: '超过144000元至300000',
    '税率': '20',
    sskks: '16920'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '4',
    qnynssde: '超过300000元至420000',
    '税率': '25',
    sskks: '31920'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '5',
    qnynssde: '超过420000元至660000',
    '税率': '30',
    sskks: '52920'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '6',
    qnynssde: '超过660000元至960000',
    '税率': '35',
    sskks: '85920'
  },
  {
    xm: '张三',
    bmmc: '部门一',
    zgbh: '123456',
    zjhm: '111111111111111111',
    js: '7',
    qnynssde: '超过960000元的部分',
    '税率': '45',
    sskks: '181920'
  },
]

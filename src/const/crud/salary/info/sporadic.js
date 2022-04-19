export const options = [{
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 160,
    labelWidth: 160,
    searchSpan: 7,
    column: [{
        label: '部门名称',
        prop: 'bmmc',
        search: true,
        type: 'select'
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
        search: true,
        type: 'month',
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
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 160,
    labelWidth: 160,
    searchSpan: 7,
    column: [{
        label: '部门名称',
        prop: 'bmmc',
        search: true,
        type: 'select'
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
        search: true,
        type: 'month',
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
        label: '校务会审核时间',
        prop: 'xwhshsj',
        width: 120,
      },
      {
        label: '审核附件',
        prop: 'shfj',
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 160,
    labelWidth: 160,
    searchSpan: 7,
    column: [{
        label: '部门名称',
        prop: 'bmmc',
        search: true,
        type: 'select'
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
        search: true,
        type: 'month',
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
    ]
  },
]

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  addBtn: false,
  columnBtn: false,
  searchBtn: false,
  menuWidth: 120,
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
      label: '校务会审核时间',
      prop: 'xwhshsj',
      width: 120,
    },
    {
      label: '审核附件',
      prop: 'shfj',
    },
  ]
}

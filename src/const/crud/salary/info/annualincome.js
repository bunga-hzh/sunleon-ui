export const options = [{
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 190,
    searchSpan: 7,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '月份',
        prop: 'yf',
        search: true,
        type: 'month',
      },
      {
        label: '护进博工作奖励',
        prop: 'hjbgzjl',
        width: 120,
      },
      {
        label: '增发能级 ',
        prop: 'zfnj',

      },
      {
        label: '内控检查第一阶段工作奖励 ',
        prop: 'nkjcdyjdgzjl',
        width: 180,
      },
      {
        label: '工作奖励 ',
        prop: 'gzjl',
      },
      {
        label: '元旦过节费 ',
        prop: 'ydgjf',
        width: 120,
      },
      {
        label: '绩效内奖励合计 ',
        prop: 'jxnjlhj',
        width: 120,
      },
      {
        label: '校内收入（税前）',
        prop: 'xnsrsq',
        width: 120,
      },
      {
        label: '1-12月工会费',
        prop: 'ghf',
        width: 120,
      },
      {
        label: '1-12月社保',
        prop: 'sb',
        width: 120,
      },
      {
        label: '1-12月公积金',
        prop: 'gjj',
        width: 120,
      },
      {
        label: '代扣代缴合计',
        prop: 'dkdjhj',
        width: 120,
      },
      {
        label: '校内收入（税后）',
        prop: 'xnsrsh',
        width: 120,
      },
      {
        label: '培训中心税前合计',
        prop: 'pxzxsqhj',
        width: 120,
      },
      {
        label: '社会化考试收入合计',
        prop: 'shhkssrhj',
        width: 140,
      },
      {
        label: '产假生育补贴',
        prop: 'cjsybt',
        width: 120,
      },
      {
        label: '税前总收入(含五金)',
        prop: 'sqzsrhwj',
        width: 140,
      },
      {
        label: '净收入不含五金和税',
        prop: 'jsrbhwjhs',
        width: 140,
      },
      {
        label: '备注',
        prop: 'bz',
        type: 'textarea',
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '应发合计',
        prop: 'yfhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      },
      {
        label: '统一扣减项',
        prop: 'tykjx',
        width: 120,
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,

        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '应发合计',
        prop: 'yfhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      },
      {
        label: '统一扣减项',
        prop: 'tykjx',
        width: 120,
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '应发合计',
        prop: 'yfhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      },
      {
        label: '统一扣减项',
        prop: 'tykjx',
        width: 120,
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '代扣合计',
        prop: 'dkhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      }
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,

        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '代扣合计',
        prop: 'dkhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      }
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        slot: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '代扣合计',
        prop: 'dkhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      }
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '代扣合计',
        prop: 'dkhj',
      },
      {
        label: '1月 ',
        prop: 'one',
      },
      {
        label: '2月 ',
        prop: 'two',
      },
      {
        label: '3月 ',
        prop: 'three',
      },
      {
        label: '4月 ',
        prop: 'four',
      },
      {
        label: '5号',
        prop: 'five',
      },
      {
        label: '6号',
        prop: 'six',
      },
      {
        label: '7号',
        prop: 'seven',
      },
      {
        label: '8号',
        prop: 'eight',
      },
      {
        label: '9号',
        prop: 'nine',
      },
      {
        label: '10号',
        prop: 'ten',
      },
      {
        label: '11号',
        prop: 'eleven',
      },
      {
        label: '12号',
        prop: 'twelve',
      }
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    searchSpan: 7,
    column: [{
        label: '姓名',
        prop: 'xm',
        search: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '工号',
        prop: 'gh',
        search: true,
        rules: [{
          required: true,
          message: '请输入工号',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '月份',
        prop: 'yf',
        search: true,
        type: 'month',
      },
      {
        label: '培训工作奖励',
        prop: 'ndpxgzjl',
        width: 140,
      },
      {
        label: '合计',
        prop: 'hj',
      },
      {
        label: '绩效内统发',
        prop: 'jxntf',
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    indexLabel: '序号',
    searchMenuSpan: 4,
    menuWidth: 240,
    labelWidth: 150,
    searchSpan: 7,
    column: [{
        label: '备注',
        prop: 'bz',
      },
      {
        label: '姓名',
        prop: 'xm',
        search: true,
        slot: true,
        rules: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur',
        }]
      },
      {
        label: '业务年度',
        prop: 'ywnd',
        search: true,
        type: 'year',
      },
      {
        label: '月份',
        prop: 'yf',
        search: true,
        type: 'month',
      },
      {
        label: '收入合计',
        prop: 'srhj',
      },
      {
        label: '会计初级0515-1516',
        prop: 'kjcj0515-1516',
        width: 160,
      },
      {
        label: '会计初级0529-0530',
        prop: 'kjcj0529-0530',
        width: 160,
      },
      {
        label: '注册会计师0827-0829',
        prop: 'zckjs0827-0829',
        width: 160,
      },
      {
        label: '会计中级0904-0905',
        prop: 'kjzj0904-0905',
        width: 160,
      },
      {
        label: '法考客观题0911-0912',
        prop: 'fkkgt0911-0912',
        width: 160,
      },
    ]
  },
]

export const option = {
  menuWidth: 160,
  align: 'center',
  border: true,
  searchMenuSpan: 4,
  labelWidth: 160,
  index: true,
  column: [{
      label: "工号",
      prop: "gh",
      search: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
    },
    {
      label: "部门",
      prop: "orgId",
      search: true,
      type: 'select'
    },
    {
      label: "性别",
      prop: "xbm",
      type: 'radio',
      dicUrl: '/admin/dict/type/xb_type',
      props: {
        "label": "label",
        "value": "value",
      },
      valueDefault: '1',
    },
    {
      label: "民族",
      prop: "mzm",
    },
    {
      label: "出生日期",
      prop: "csrq",
      width: 150,
      type: 'date',
    },
    {
      label: "身份证号码",
      prop: "sfzjh",
      width: 150,
    },
    {
      label: "性质",
      prop: "xz",
    },
    {
      label: "家庭地址",
      prop: "jtdz",
      width: 180,
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "户口",
      prop: "hz",
    },
    {
      label: "四金缴纳",
      prop: "sjjn",
    },
    {
      label: "是否已参加综合保险",
      prop: "sfycjzhbx",
      width: 150,
    },
    {
      label: "学历",
      prop: "xl",
    },
    {
      label: "学位",
      prop: "xw",
    },
    {
      label: "参加工作（年月）",
      prop: "cjgzrq",
      width: 150,
      type: 'date',
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "教师资格证",
      prop: "jszgz",
      width: 150,
    },
    {
      label: "双师型教师",
      prop: "xsxjs",
      width: 150,
    },
    {
      label: "所学专业名称",
      prop: "sxzymc",
      width: 150,
    },
    {
      label: "职业资格证书相关详情",
      prop: "zyzgzsxgxq",
      width: 150,
      slot: true,
      display: false
    },
    {
      label: "当前专职工作背景",
      prop: "dqzzgbj",
      width: 150,
      slot: true,
      display: false
    },
  ],
}

export const childOption = [{
    align: 'center',
    border: true,
    align: 'center',
    index: true,
    labelWidth: 160,
    column: [{
        label: "证书类别",
        prop: "zslb",
      },
      {
        label: "证书等级",
        prop: "zsdj",
      },
      {
        label: "证书名称",
        prop: "zsmc",
      },
      {
        label: "发证单位",
        prop: "fzdw",
      },
      {
        label: "证书编号",
        prop: "zsbh",
      },
      {
        label: "获取日期",
        prop: "hqrq",
        type: 'date',
        valueFormat: 'yyyy-MM-dd'
      },
    ]
  },
  {
    align: 'center',
    border: true,
    index: true,
    labelWidth: 160,
    column: [{
        label: "职称名称",
        prop: "zcmc",
      },
      {
        label: "职称等级",
        prop: "zcdj",
      },
      {
        label: "发证单位",
        prop: "fzdw",
      },
      {
        label: "获取日期",
        prop: "hqrq",
        type: 'date',
        valueFormat: 'yyyy-MM-dd'
      }
    ]
  }
]

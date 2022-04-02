export const data = [{
  xm: '张三'
}]

export const option = {
  menuWidth: 80,
  align: 'center',
  editBtn: false,
  border: true,
  searchMenuSpan: 4,
  labelWidth: 160,
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
      prop: "objId",
      search: true,
      searchslot: true,
      formslot: true,
    },
    {
      label: "性别",
      prop: "xbm",
      formslot: true,
    },
    {
      label: "民族",
      prop: "mzm",
    },
    {
      label: "出生日期",
      prop: "csrq",
      formslot: true,
    },
    {
      label: "身份证号码",
      prop: "sfzjh",
    },
    {
      label: "性质",
      prop: "xz",
    },
    {
      label: "家庭地址",
      prop: "jtzz",
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
      prop: "cjgzny",
      width: 150,
      formslot: true,
    },
    {
      label: "教师资格证",
      prop: "jszgz",
      width: 150,
    },
    {
      label: "双师型教师",
      prop: "ssxjs",
      width: 150,
    },
    {
      label: "所学专业名称",
      prop: "sxzymc",
      width: 150,
    },
    {
      label: "职称等级",
      prop: "zcdj",
    },
    {
      label: "职称名称",
      prop: "zcmc",
    },
    {
      label: "发证单位",
      prop: "fzdw",
    },
    {
      label: "获取日期（年月日）",
      prop: "hqrqnyr",
      width: 150,
      formslot: true,
    },
    {
      label: "职业资格证书类别",
      prop: "zyzgzslb",
      width: 150,
    },
    {
      label: "职业资格证书等级",
      prop: "zyzgzsdj",
      width: 150,
    },
    {
      label: "职业资格证书相关详情",
      prop: "zyzgzsxgxq",
      width: 150,
      slot: true
    },
    {
      label: "当前专职工作背景",
      prop: "dqzzgbj",
      width: 150,
      slot: true
    },
  ],
}

export const childOption = [{
    align: 'center',
    menu: false,
    border: true,
    labelWidth: 160,
    column: [{
        label: "名称（全称）",
        prop: "mcqc",
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
        label: "获取日期（年月日）",
        prop: "hqrqnyr",
        formslot: true,
      },
    ]
  },
  {
    align: 'center',
    menu: false,
    border: true,
    labelWidth: 160,
    column: [{
        label: "单位名称",
        prop: "dwmc",
      },
      {
        label: "职务",
        prop: "zw",
      },
      {
        label: "任职日期（年月日）",
        prop: "rzrqnyr",
        formslot: true,
      }
    ]
  }
]

export const childData = [
  [{
    mcqc: '张三'
  }],
  [{
    dwmc: '李四'
  }],
]

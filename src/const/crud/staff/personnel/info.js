export const data = [{
  name: '张三'
}]

export const option = {
  menuWidth: 80,
  align: 'center',
  editBtn: false,
  border: true,
  searchMenuSpan: 4,
  column: [{
      label: "姓名",
      prop: "name",
      search: true,
      searchSpan: 7,
    },
    {
      label: "性别",
      prop: "sex",
      searchSpan: 7,
    },
    {
      label: "民族",
      prop: "nation",
    },
    {
      label: "出生日期",
      prop: "date_of_birth",
    },
    {
      label: "身份证号码",
      prop: "card_id",
    },
    {
      label: "性质",
      prop: "nature",
    },
    {
      label: "家庭地址",
      prop: "family_address",
    },
    {
      label: "联系电话",
      prop: "phone",
    },
    {
      label: "户口",
      prop: "account",
    },
    {
      label: "四金缴纳",
      prop: "sjjn",
    },
    {
      label: "是否已参加综合保险",
      prop: "zhbx",
    },
    {
      label: "学历",
      prop: "education",
    },
    {
      label: "学位",
      prop: "degree",
    },
    {
      label: "参加工作（年月）",
      prop: "work_time",
    },
    {
      label: "教师资格证",
      prop: "jszgz",
    },
    {
      label: "双师型教师",
      prop: "ssxjs",
    },
    {
      label: "所学专业名称",
      prop: "specialty",
    },
    {
      label: "职称等级",
      prop: "job_level",
    },
    {
      label: "职称名称",
      prop: "job_title",
    },
    {
      label: "发证单位",
      prop: "Issuing_unit",
    },
    {
      label: "获取日期（年月日）",
      prop: "get_time",
    },
    {
      label: "职业资格证书类别",
      prop: "zyzgzs_type",
    },
    {
      label: "职业资格证书等级",
      prop: "zyzgzs_level",
    },
    {
      label: "职业资格证书相关详情",
      prop: "zyzgzs_details",
      slot: true
    },
    {
      label: "当前专职工作背景",
      prop: "dqzzgzbj_details",
      slot: true
    },
  ],
}

// export const depList = [{
//     id: 1,
//     name: "部门1"
//   },
//   {
//     id: 2,
//     name: "部门2"
//   },
//   {
//     id: 3,
//     name: "部门3"
//   },
//   {
//     id: 4,
//     name: "部门4"
//   },
//   {
//     id: 5,
//     name: "部门5"
//   },
//   {
//     id: 6,
//     name: "部门6"
//   },
//   {
//     id: 7,
//     name: "部门7"
//   },
// ]

// export const bzList = [{
//     id: 1,
//     name: "事业编制"
//   },
//   {
//     id: 2,
//     name: "非事业编制"
//   },
// ]

// export const ryList = [{
//     id: 1,
//     name: "在职人员"
//   },
//   {
//     id: 2,
//     name: "离校人员"
//   },
//   {
//     id: 3,
//     name: "退休人员"
//   },
// ]

// export const jsList = [{
//     id: 1,
//     name: "外聘教师"
//   },
//   {
//     id: 2,
//     name: "非外聘教师"
//   },
// ]

export const childOption = [{
    align: 'center',
    menu: false,
    column: [{
        label: "名称（全称）",
        prop: "name",
      },
      {
        label: "发证单位",
        prop: "Issuing_unit",
      },
      {
        label: "证书编号",
        prop: "number",
      },
      {
        label: "获取日期（年月日）",
        prop: "get_time",
      },
    ]
  },
  {
    align: 'center',
    menu: false,
    column: [{
        label: "单位名称",
        prop: "name",
      },
      {
        label: "职务",
        prop: "position",
      },
      {
        label: "任职日期年月日）",
        prop: "take_office_time",
      }
    ]
  }
]

export const childData = [
  [{
    name: '张三'
  }],
  [{
    name: '李四'
  }],
]

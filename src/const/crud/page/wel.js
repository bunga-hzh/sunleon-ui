export const option = {
  index: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  refreshBtn: false,
  column: [{
      prop: 'sxmc',
      label: '事项名称'
    },
    {
      prop: 'sqsj',
      label: '申请时间',
      width: 160,
    },
    {
      prop: 'sqr',
      label: '申请人'
    },
    {
      prop: 'shzt',
      label: '审核状态'
    },
    {
      prop: 'ms',
      label: '描述'
    },
  ]
}
export const dataOption = {
  span: 8,
  data: [{
      click: function (item) {
        alert(JSON.stringify(item));
      },
      title: '待办事项',
      count: 22139,
      icon: 'el-icon-success',
      href: 'https://avuejs.com',
      target: '_blank'
    },
    {
      click: function (item) {
        alert(JSON.stringify(item));
      },
      title: '在办事项',
      count: 12678,
      decimals: 2,
      icon: 'el-icon-tickets',
      href: 'https://avuejs.com',
      target: '_blank'
    },
    {
      click: function (item) {
        alert(JSON.stringify(item));
      },
      title: '消息',
      count: 16826,
      icon: 'el-icon-message',
      href: 'https://avuejs.com',
      target: '_blank'
    }
  ]
}


export const chartData = [{
    item: "课时",
    我的数据: 70,
    单位平均值: 30
  },
  {
    item: "课时得分",
    我的数据: 60,
    单位平均值: 70
  },
  {
    item: "专业证书",
    我的数据: 50,
    单位平均值: 60
  },
  {
    item: "培训",
    我的数据: 40,
    单位平均值: 50
  },
  {
    item: "科研",
    我的数据: 60,
    单位平均值: 70
  },
]

export const listData = [{
    id: 1,
    title: "课时",
    score: 70
  },
  {
    id: 2,
    title: "科研",
    score: 60
  },
  {
    id: 3,
    title: "培训",
    score: 50
  },
  {
    id: 4,
    title: "专业证书",
    score: 40
  },
  {
    id: 5,
    title: "测评得分",
    score: 30
  },
]

export const iconList = [{
    id: 1,
    title: "组织架构",
    icon: "https://s1.ax1x.com/2022/03/12/b7AS91.png",
    path: '#'
  },
  {
    id: 2,
    title: "教职工信息",
    icon: "https://s1.ax1x.com/2022/03/12/b7EgoQ.png",
    path: '#'
  },
  {
    id: 3,
    title: "招聘竞聘",
    icon: "https://s1.ax1x.com/2022/03/12/b7EoLT.png",
    path: '#'
  },
  {
    id: 4,
    title: "绩效考核",
    icon: "https://s1.ax1x.com/2022/03/12/b7VSOK.png",
    path: '#'
  },
  {
    id: 5,
    title: "教师研修",
    icon: "https://s1.ax1x.com/2022/03/12/b7VkYd.png",
    path: '#'
  },
  {
    id: 6,
    title: "薪酬福利",
    icon: "https://s1.ax1x.com/2022/03/12/b7VDh9.png",
    path: '#'
  },
  {
    id: 7,
    title: "合同管理",
    icon: "https://s1.ax1x.com/2022/03/12/b7ZiuV.png",
    path: '#'
  },
  {
    id: 8,
    title: "自助服务",
    icon: "https://s1.ax1x.com/2022/03/12/b7ZmC9.png",
    path: '#'
  },
  {
    id: 9,
    title: "我的工资",
    icon: "https://s1.ax1x.com/2022/04/16/LYgmf1.png",
    path: "/salary/info/mysalary",
  },
]

export const upcomingList = [{
    id: 1,
    title: "招聘审核"
  },
  {
    id: 2,
    title: "合同审核"
  },
  {
    id: 3,
    title: "个人信息填报"
  },
]

export const notifyList = [{
    id: 1,
    title: "招聘竞聘通知"
  },
  {
    id: 2,
    title: "关于行政管理中心2022年寒假值班时间安排的通知"
  },
  {
    id: 3,
    title: " 教职工培训通知"
  },
]

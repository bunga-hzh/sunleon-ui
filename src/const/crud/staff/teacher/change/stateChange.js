// tab标签集合
export const tabList = [{
    id: '1',
    label: '异动状态'
  },
  {
    id: '2',
    label: '其他'
  },
  // {
  //   id: '3',
  //   label: '退休'
  // },
  // {
  //   id: '4',
  //   label: '辞职'
  // },
  // {
  //   id: '5',
  //   label: '合同终止'
  // },
  // {
  //   id: '6',
  //   label: '外借（含挂职锻炼）'
  // },
  // {
  //   id: '7',
  //   label: '内退'
  // },
  // {
  //   id: '8',
  //   label: '参军'
  // },
  // {
  //   id: '9',
  //   label: '停薪留职'
  // },
  // {
  //   id: '10',
  //   label: '转当公'
  // },
  // {
  //   id: '11',
  //   label: '自费留学'
  // },
  // {
  //   id: '12',
  //   label: '从全民所有制单位转出'
  // },
  // {
  //   id: '13',
  //   label: '从集体所有制单位转出'
  // },
  // {
  //   id: '14',
  //   label: '开除'
  // },
  // {
  //   id: '15',
  //   label: '辞退'
  // },
  // {
  //   id: '16',
  //   label: '解聘'
  // },
  // {
  //   id: '17',
  //   label: '调离'
  // },
  // {
  //   id: '18',
  //   label: '合同制终止和解除合同'
  // },
  // {
  //   id: '19',
  //   label: '死亡'
  // },
  // {
  //   id: '20',
  //   label: '其他减员'
  // },
  // {
  //   id: '21',
  //   label: '长并病假'
  // },
  // {
  //   id: '22',
  //   label: '其他'
  // },
]
// 表格配置对象
export const optionList = [{
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 8,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 8,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 8,
        searchslot: true,
      },
      {
        label: "异动状态",
        prop: "statusChange",
        search: true,
        searchSpan: 8,
        searchslot: true,
      },
      {
        label: "退休时间",
        prop: "time",
      },
      {
        label: "备注",
        prop: "remark",
      },
      {
        label: "证明附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "异动转态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "异动状态",
        prop: "statusChange", 
      },
      {
        label: "异动时间段",
        prop: "time", 
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "证明附件",
        prop: "prove",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "开始时间",
        prop: "start_time",
      },
      {
        label: "退休时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "开始时间",
        prop: "start_time",
      },
      {
        label: "辞职时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "开始时间",
        prop: "start_time",
      },
      {
        label: "结束时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "开始时间",
        prop: "start_time",
      },
      {
        label: "结束时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "开始时间",
        prop: "start_time",
      },
      {
        label: "内退时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
  {
    border: true,
    searchMenuSpan: 4,
    menu: false,
    column: [{
        label: "姓名",
        prop: "name",
        search: true,
        searchSpan: 6,
      },
      {
        label: "部门",
        prop: "dep",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "在职状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "参军时间",
        prop: "start_time",
      },
      {
        label: "结束时间",
        prop: "end_time",
      },
      {
        label: "原因",
        prop: "reason",
      },
      {
        label: "附件",
        prop: "annex",
      },
    ],
  },
]
//表格数据源
export const dataList = [
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: "2022/02/02",
    remark: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: "2022/02/02",
    reason: "无",
    prove: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    start_time: "2022/02/02",
    end_time: "2022/02/02",
    reason: "无",
    annex: "无",
  }, ],
]
// 异动下拉数据
export const statusChangeList = [
  { id: 1, name: "异动状态" },
  { id: 2, name: "其他" },
  { id: 3, name: "退休" },
  { id: 4, name: "辞职" },
  { id: 5, name: "合同终止" },
  { id: 6, name: "外借（含挂职锻炼）" },
  { id: 7, name: "内退" },
  { id: 8, name: "参军" },
  { id: 9, name: "停薪留职" },
  { id: 10, name: "转当公" },
  { id: 11, name: "自费留学" },
  { id: 12, name: "从全民所有制单位转出" },
  { id: 13, name: "从集体所有制单位转出" },
  { id: 14, name: "开除" },
  { id: 15, name: "辞退" },
  { id: 16, name: "解聘" },
  { id: 17, name: "调离" },
  { id: 18, name: "合同制终止和解除合同" },
  { id: 19, name: "死亡" },
  { id: 20, name: "其他减员" },
  { id: 21, name: "长并病假" },
]
// 部门下拉集合
export const depList = [
  { id: 1, name: "部门1" },
  { id: 2, name: "部门2" },
  { id: 3, name: "部门3" },
  { id: 4, name: "部门4" },
  { id: 5, name: "部门5" },
  { id: 6, name: "部门6" },
  { id: 7, name: "部门7" },
]
// 状态下拉集合
export const statusList = [
  { id: 1, name: "事业编制" },
  { id: 2, name: "非事业编制" },
]
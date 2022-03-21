export const tabList = [{
    id: '1',
    label: '实习期不合格'
  },
  {
    id: '2',
    label: '试用期不合格'
  },
  {
    id: '3',
    label: '转正'
  },
  {
    id: '4',
    label: '合同续签'
  },
  {
    id: '5',
    label: '转岗'
  },
  {
    id: '6',
    label: '自定义'
  },
]
export const statusList = [{
    id: 1,
    name: "事业编制"
  },
  {
    id: 2,
    name: "非事业编制"
  },
]
export const depList = [{
    id: 1,
    name: "部门1"
  },
  {
    id: 2,
    name: "部门2"
  },
  {
    id: 3,
    name: "部门3"
  },
  {
    id: 4,
    name: "部门4"
  },
  {
    id: 5,
    name: "部门5"
  },
  {
    id: 6,
    name: "部门6"
  },
  {
    id: 7,
    name: "部门7"
  },
]
export const dataList = [
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: "2022/02/02",
    reason: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: "2022/02/02",
    reason: "无",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: '2022/02/02',
    illu: '无'
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    period: "2021/02/02-2022/02/02",
    salary: "10000",
    job: "教师",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    period: "2021/02/02-2022/02/02",
    salary: "10000",
    old_job: "岗位1",
    new_job: "岗位2",
  }, ],
  [{
    name: "张三",
    dep: "未知",
    status: "在职人员",
    time: '2022/02/02',
    illu: '无'
  }, ],
]
export const optionList = [{
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "时间",
        prop: "time",
      },
      {
        label: "原因",
        prop: "reason",
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "时间",
        prop: "time",
      },
      {
        label: "原因",
        prop: "reason",
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "日期",
        prop: "time",
      },
      {
        label: "说明",
        prop: "illu",
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "续签时间段",
        prop: "period",
      },
      {
        label: "薪资",
        prop: "salary",
      },
      {
        label: "岗位",
        prop: "job",
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "转岗时间段",
        prop: "period",
      },
      {
        label: "薪资",
        prop: "salary",
      },
      {
        label: "原岗位",
        prop: "old_job",
      },
      {
        label: "新岗位",
        prop: "new_job",
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
        label: "状态",
        prop: "status",
        search: true,
        searchSpan: 6,
        searchslot: true,
      },
      {
        label: "时间",
        prop: "time",
      },
      {
        label: "说明",
        prop: "illu",
      },
    ],
  },
]
export const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }]
}
export const periodTableData = [{
  name: "张三",
  dep: "未知",
  status: "在职人员",
  period: "2021/02/02-2022/02/02",
  salary: "10000",
  job: "教师",
}]

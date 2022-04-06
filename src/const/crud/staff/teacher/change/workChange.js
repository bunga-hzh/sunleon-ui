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
    gh: '111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    sxq: "1年",
    sxsjd: "2022/02/02  至  2022/02/02",
    bz: "无",
  }, ],
  [{
    gh: '111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    syq: "1年",
    sysjd: "2022/02/02  至  2022/02/02",
    bhgyy: '无',
    bz: "无",
  }, ],
  [{
    gh: '111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    gw: "岗位一",
    rzrq: "2022/02/02",
    zszzrq: '2022/03/03',
    bz: "无",
  }, ],
  [{
    gh: '111111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    htdqsj: '2022/02/02',
    xqsjd: "2021/02/02-2022/02/02",
    xz: "10000",
    gwmc: "教师",
  }, ],
  [{
    gh: '111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    zgsj: "2021/02/02",
    xz: "10000",
    ygwmc: "岗位1",
    xgwmc: "岗位2",
  }, ],
  [{
    gh: '111111',
    xm: "张三",
    objId: "未知",
    zzztm: '在职',
    ydsj: '2022/02/02',
    bz: '无'
  }, ],
]
export const optionList = [{
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    index: true,
    labelWidth: 150,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "实习期（月）",
        prop: "sxq",
        formslot: true,
      },
      {
        label: "实习时间段",
        prop: "sxsjd",
        width: 170,
        formslot: true,
      },
      {
        label: "备注",
        prop: "bz",
        formslot: true,
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    index: true,
    labelWidth: 150,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "试用期（月）",
        prop: "syq",
        formslot: true,
      },
      {
        label: "试用时间段",
        prop: "sysjd",
        width: 170,
        formslot: true,
      },
      {
        label: "不合格原因",
        prop: "bhgyy",
        formslot: true,
      },
      {
        label: "备注",
        prop: "bz",
        formslot: true,
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    index: true,
    labelWidth: 150,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "岗位",
        prop: "gw",
      },
      {
        label: "入职日期",
        prop: "rzrq",
        width: 100,
        formslot: true,
      },
      {
        label: "正式转正日期",
        prop: "zszzrq",
        width: 100,
        formslot: true,
      },
      {
        label: "备注",
        prop: "bz",
        formslot: true,
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    labelWidth: 150,
    index: true,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "合同到期时间",
        prop: "htdqsj",
        addDisabled: true,
      },
      {
        label: "续签时间段",
        prop: "xqsjd",
        formslot: true,
      },
      {
        label: "薪资",
        prop: "xz",
        slot: true,
        formslot: true,
      },
      {
        label: "岗位名称",
        prop: "gwmc",
        slot: true
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    index: true,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "转岗时间",
        prop: "zgsj",
        formslot: true,
      },
      {
        label: "薪资",
        prop: "xz",
        formslot: true,
      },
      {
        label: "原岗位名称",
        prop: "ygwmc",
      },
      {
        label: "新岗位名称",
        prop: "xgwmc",
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    menu: false,
    index: true,
    column: [{
        label: "工号",
        prop: "gh",
        search: true,
        searchSpan: 5,
        addDisabled: true
      },
      {
        label: "姓名",
        prop: "xm",
        search: true,
        searchSpan: 5,
      },
      {
        label: "所属部门",
        prop: "objId",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "在职状态",
        prop: "zzztm",
        search: true,
        searchSpan: 5,
        searchslot: true,
        addDisabled: true
      },
      {
        label: "异动时间",
        prop: "ydsj",
        formslot: true,
      },
      {
        label: "备注",
        prop: "bz",
        formslot: true,
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
  },
  {
    name: "李四",
    dep: "未知",
    status: "在职人员",
    period: "2021/02/02-2022/02/02",
    salary: "800",
    job: "教师",
  }
]

export const selectRenewalPickerOptions = {
  disabledDate(time) {
    return time.getTime() > Date.now();
  },
  shortcuts: [{
    text: '一年',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
      picker.$emit('pick', date);
    }
  }, {
    text: '两年',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 2);
      picker.$emit('pick', date);
    }
  }, {
    text: '三年',
    onClick(picker) {
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 365 * 3);
      picker.$emit('pick', date);
    }
  }]
}

export const jobOptions = [{
  value: '选项1',
  label: '岗位1'
}, {
  value: '选项2',
  label: '岗位2'
}, {
  value: '选项3',
  label: '岗位3'
}, {
  value: '选项4',
  label: '岗位4'
}, {
  value: '选项5',
  label: '岗位5'
}]

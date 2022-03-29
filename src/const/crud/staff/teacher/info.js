export const data = [{
    user: "zhangsan",
    name: "张三",
    sex: "男",
    dep: "党委组织部",
    identity: "教工",
    cardId: "111111111111111111",
    phone: "13888888888",
    status: "在职员工",
    a: "在职员工",
    b: "在职员工",
    c: "在职员工",
  },
  {
    user: "zhangsan",
    name: "老六老六",
    sex: "男",
    dep: "党委组织部",
    identity: "教工",
    cardId: "111111111111111111",
    phone: "13888888888",
    status: "在职员工",
    a: "在职员工",
    b: "在职员工",
    c: "在职员工",
  },
]

export const option = {
  align: 'center',
  addBtn: false,
  border: true,
  searchMenuSpan: 4,
  viewBtn: true,
  delBtn: false,
  column: [{
      label: "账号",
      prop: "user",
    },
    {
      label: "姓名",
      prop: "name",
      search: true,
    },
    {
      label: "性别",
      prop: "sex",
    },
    {
      label: "组织机构",
      prop: "dep",
      search: true,
    },
    {
      label: "身份类型",
      prop: "identity",
    },
    {
      label: "身份证号",
      prop: "cardId",
      minWidth: 100,
    },
    {
      label: "手机号",
      prop: "phone",
    },
    {
      label: "在职状态",
      prop: "status",
      search: true,
    },
  ],
}
export const hjlbOptions = [{
  id: 1,
  type: '城镇'
}, {
  id: 2,
  type: '非城镇'
}]
export const jkzkOptions = [{
  id: 1,
  status: '健康或良好'
}, {
  id: 2,
  status: '一般或较弱'
}, {
  id: 3,
  status: '有慢性病'
}, {
  id: 4,
  status: '有生理缺陷'
}, {
  id: 5,
  status: '残废'
}, ]
export const hyzkOptions = [{
  id: 1,
  status: '未婚'
}, {
  id: 2,
  status: '已婚'
}, {
  id: 3,
  status: '丧偶'
}, {
  id: 4,
  status: '离婚'
}, {
  id: 5,
  status: '其他'
}, ]
export const dqztOptions = [{
    id: 1,
    status: '在岗'
  }, {
    id: 2,
    status: '离休'
  }, {
    id: 3,
    status: '退休'
  }, {
    id: 4,
    status: '辞职'
  }, {
    id: 5,
    status: '合同终止'
  },
  {
    id: 6,
    status: '外借（含挂职锻炼）'
  },
  {
    id: 7,
    status: '内退'
  },
  {
    id: 8,
    status: '参军'
  },
  {
    id: 9,
    status: '停薪留职'
  },
  {
    id: 10,
    status: '转当公'
  },
  {
    id: 11,
    status: '转当农民'
  },
  {
    id: 12,
    status: '自费留学'
  },
  {
    id: 13,
    status: '从全民所有制单位转出'
  },
  {
    id: 14,
    status: '从集体所有制单位转出'
  },
  {
    id: 15,
    status: '到非全民单位'
  },
  {
    id: 16,
    status: '开除'
  },
  {
    id: 17,
    status: '辞退'
  },
  {
    id: 18,
    status: '解聘'
  },
  {
    id: 19,
    status: '调离'
  },
  {
    id: 20,
    status: '合同制终止和解除合同'
  },
  {
    id: 21,
    status: '死亡'
  },
  {
    id: 22,
    status: '其他减员'
  },
  {
    id: 23,
    status: '长病假'
  },
  {
    id: 24,
    status: '其他'
  },
]
export const htlxOptions = [{
    id: 1,
    type: '长期'
  },
  {
    id: 2,
    type: '中期'
  },
  {
    id: 3,
    type: '短期'
  },
  {
    id: 4,
    type: '无固定'
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
// 基本信息表单
export const jbxx_form = {
  gh: undefined,
  xm: undefined,
  cymgh: undefined,
  xbm: "1",
  csrq: undefined,
  csd: undefined,
  sfzjh: undefined,
  jg: undefined,
  mzm: undefined,
  zzmmm: undefined,
  sfzsc: undefined,
}
// 教育经历表单
export const jyjl_form = {
  shxwm: undefined,
  sxzymc: undefined,
  byyx: undefined,
  xlsc: undefined,
}
// 联系方式表单
export const lxfs_form = {
  lxdh: undefined,
  dzyx: undefined,
  jtlxr: undefined,
  jtzz: undefined,
  hjlb: undefined,
  hkxxdz: undefined,
}
// 职称信息表单
export const zcxx_form = {
  jszc: undefined,
  ssjyz: undefined,
  dqztm: undefined,
  htlx: undefined,
  yhkh: undefined,
}
// 其他个人信息表单
export const qt_form = {
  jjzqssj: undefined,
  sflu: "2",
  jjzyxq: undefined,
  hzhtxzh: undefined,
  hzhtxzhyxq: undefined,
  fzdw: undefined,
  rdrq: undefined,
  bz: undefined,
}
// 任职信息表单
export const rzxx_form = {
  xnzw: undefined,
  cjgzsj: undefined,
  jrbdwgzsj: undefined,
  rznx: undefined,
  jyz: undefined,
  gl: undefined,
  sjgznx: undefined,
  jl: undefined,
  jrgwlbm: undefined,
  ygxs: undefined,
  rylb: undefined,
  rylply: undefined,
  sxqx: undefined,
  xxzgbmm: undefined,
  jysj: undefined,
}
// 教师发展信息表单
export const jsfzxx_form = {
  sxzh: undefined,
  jszgzsc: undefined,
}
// 薪酬福利信息表单
export const xcflxx_form = {
  tygzbs: undefined,
  gwjd: undefined,
  xj: undefined,
  gwdjm: undefined,
  gwdjm: undefined,
  xjdjfj: undefined,
}
// 子表表单
export const xl_form = {
  xl: undefined,
  rxsj: undefined,
  xxxsm: undefined,
  xz: undefined,
  bysj: undefined,
}
export const ll_form = {
  qssj: undefined,
  zzsj: undefined,
  szdw: undefined,
  zw: undefined,
  dwszsf: undefined,
}
export const zz_form = {
  zzmmm: undefined,
  cjrq: undefined,
  jsr: undefined,
  zzrq: undefined,
}
export const js_form = {
  cw: undefined,
  xm: undefined,
  csny: undefined,
  zzmmm: undefined,
  dwmc: undefined,
  lxfs: undefined,
}
export const zy_form = {
  zygz: undefined,
  zydj: undefined,
  bzjg: undefined,
  zyzgzsbh: undefined,
  zsbfrq: undefined,
}
export const xnzw_form = {
  xxzgbmm: undefined,
  zwmc: undefined,
  rzfsm: undefined,
  rmzwh: undefined,
  zwjbm: undefined,
  rzrq: undefined,
}
export const zyjszw_form = {
  zyjszgmc: undefined,
  qdzgtjm: undefined,
  hdzgsj: undefined,
  rzzgmcm: undefined,
  scprsj: undefined,
  prqsrq: undefined,
  przzrq: undefined,
  prqkm: undefined,
  scdzzj: undefined,
}
export const grjsdj_form = {
  grjsdjmc: undefined,
  grjszwmc: undefined,
  qdjszwsj: undefined,
  pzjszwdwmc: undefined,
  zsbh: undefined,
  grgzm: undefined,
  szdczj: undefined,
}
export const shjz_form = {
  shjzqsrq: undefined,
  shjzzzrq: undefined,
  rzzz: undefined,
  zzlx: undefined,
  jzzw: undefined,
  sfqc: undefined,
}
export const fwxy_form = {
  qssj: undefined,
  zzsj: undefined,
  sy: undefined,
  zje: undefined,
  bz: undefined,
}
export const jypx_form = {
  xxqssj: undefined,
  xxzzsj: undefined,
  pxbmc: undefined,
  pxxs: undefined,
  pxlb: undefined,
  zbdw: undefined,
  cjcgcj: undefined,
  sfxlxwjs: undefined,
}
export const jszgz_form = {
  jszgzzlm: undefined,
  jszgzhm: undefined,
  xjxkm: undefined,
}
export const cf_form = {
  cflb: undefined,
  ccmc: undefined,
  ccrq: undefined,
  ccyy: undefined,
  cccxrq: undefined,
  jcjgzjjyd: undefined,
}
export const jl_form = {
  hjlbm: undefined,
  jlmc: undefined,
  hjrq: undefined,
  bjdw: undefined,
}
export const zzkc_form = {
  kcsy: undefined,
  khrq: undefined,
  bz: undefined,
}
export const jsrzqk_form = {
  nd: undefined,
  khfs: undefined,
  khdj: undefined,
  tjryrs: undefined,
  tjryzmc: undefined,
  qxzyjsrys: undefined,
  qxzyjsrymc: undefined,
  bz: undefined,
}
export const hz_form = {
  hzzjzldm: undefined,
  hzhtxzh: undefined,
  qfdd: undefined,
  qfrq: undefined,
  qfjg: undefined,
  zjyxq: undefined,
}

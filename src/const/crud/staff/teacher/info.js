export const option = {
  align: 'center',
  addBtn: false,
  border: true,
  searchMenuSpan: 4,
  viewBtn: false,
  editBtn: false,
  index: true,
  searchSpan: 5,
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
      label: "性别",
      prop: "xbm",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/sex_type',
    },
    {
      label: "组织机构",
      prop: "orgId",
      search: true,
      type: 'tree',
      dicUrl: '/admin/dept/tree',
      props: {
        "label": "name",
        "value": "id",
        "children": "children"
      },
    },
    {
      label: "身份证号",
      prop: "sfzjh",
      minWidth: 100,
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "在职状态",
      prop: "dqztm",
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/dqztk_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
  ],
}

export const info_form = {
  gh: undefined,
  xm: undefined,
  cym: undefined,
  xbm: '1',
  csrq: undefined,
  jsnl: undefined,
  sfzjh: undefined,
  csd: undefined,
  jg: undefined,
  mzm: undefined,
  zzmmm: undefined,
  lxdh: undefined,
  jtzz: undefined,
  dzyx: undefined,
  jjlxrxm: undefined,
  jjlxrdh: undefined,
  orgId: undefined,
  sfzFrontImg: undefined,
  sfzBackImg: undefined,
  byyx: undefined,
  zgxl: undefined,
  zgxlzy: undefined,
  zgxwm: undefined,
  zgxwzy: undefined,
  zgxlbyyx: undefined,
  qrzxl: undefined,
  qrzzy: undefined,
  qrzxw: undefined,
  qrzbyyx: undefined,
  zgxlzsc: undefined,
  hjlb: undefined,
  dqztm: undefined,
  hkszdm: undefined,
  hkxxdz: undefined,
  jzxxdz: undefined,
  rdrq: undefined,
  jkzkm: undefined,
  hyzkm: undefined,
  htlx: undefined,
  sflh: '2',
  jzzqssj: undefined,
  jjzjzsj: undefined,
  zyjsrylb: undefined,
  sfjyzyzg: '2',
  bz: undefined,
}

export const office_form = {
  bm: undefined,
  rylb: undefined,
  gwlbm: undefined,
  gwdjm: undefined,
  gwprny: undefined,
  gwprnx: undefined,
  cjgzsj: undefined,
  cjgzny: undefined,
  jrbdwgzsj: undefined,
  xnzw: undefined,
  rxzwsj: undefined,
  ssjyz: undefined,
  jl: undefined,
  rylply: undefined,
  ygxs: undefined,
  syqx: undefined,
  jysj: undefined,
  sfwnsjgld: '2',
  xrzyjszw: undefined,
  zyjsdj: undefined,
  sflxhg: '2',
  sfcjr: '2',
  sfyjbys: '2',
  jyclsc: undefined,
}

export const examine_form = {
  xm: undefined,
  sfzjh: undefined,
  khnd: undefined,
  khjgm: undefined,
  khbz: undefined,
}

export const jsfzxx_form = {
  sxzh: undefined,
  ssxjsrd: undefined,
  sfjyzz: '2',
  jyzzbz: undefined,
  sfmsgzszcr: '2',
  msgzszcrjb: undefined,
  msgzszcrbz: undefined,
  sfxkdtr: '2',
  xkdtrbz: undefined,
  sfggjs: '2',
  ggjsbz: undefined,
  sfxswyhcy: '2',
  xswyhcybz: undefined,
  sfddzcy: '2',
  ddzcybz: undefined,
  jszgzsc: undefined,
}

export const jcxx_form = {
  cflb: undefined,
  cfyy: undefined,
  ccdw: undefined,
  ccrq: undefined,
  cccxrq: undefined,
  cccxyy: undefined,
  jljbm: undefined,
  jllbm: undefined,
  jlmc: undefined,
  jlyy: undefined,
  jlsj: undefined,
  jldw: undefined,
  bz: undefined,
}

export const salary_form = {
  gwjd: undefined,
  gwdjm: undefined,
  gwgz: undefined,
  xjdj: undefined,
  xjgz: undefined,
  sxbjtf: undefined,
  lybt: undefined,
  jt: undefined,
  gwjt: undefined,
  jsjt: undefined,
  ghf: undefined,
  ft: undefined,
  gznx: undefined,
  prgw: undefined,
  xrzsj: undefined,
  xjdjfj: undefined,
  xclb: undefined,
}

export const bankno_form = {
  zgjsyhkh: undefined,
  zggsyhkh: undefined,
  zgyhkh: undefined,
  gjjzh: undefined,
  bcgjjzh: undefined,
}

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

// 子表表单
export const xljxw_form = {
  xlm: undefined,
  rxsj: undefined,
  xxxsm: undefined,
  xx: undefined,
  sxzym: undefined,
  hdxwm: undefined,
  zmr: undefined,
  bysj: undefined,
  bz: undefined,
}
export const grll_form = {
  qssj: undefined,
  zzsj: undefined,
  szdw: undefined,
  zw: undefined,
  dwszsf: undefined,
  zmr: undefined,
  scdzzm: undefined,
}
export const zzmmjdjqk_form = {
  zzmmm: undefined,
  cjrq: undefined,
  jsr: undefined,
  zzrq: undefined,
}
export const family_form = {
  cw: undefined,
  xm: undefined,
  csrq: undefined,
  zzmmm: undefined,
  dwmc: undefined,
  jtcyzym: undefined,
  lxfs: undefined,
}
export const certificate_form = {
  zygz: undefined,
  zydj: undefined,
  bzjg: undefined,
  zyzgzsbh: undefined,
  zsbfrq: undefined,
}
export const leader_form = {
  bm: undefined,
  zwmc: undefined,
  rzfsm: undefined,
  rmzwh: undefined,
  zwjbm: undefined,
  rbzjsj: undefined,
  ldrzwj: undefined,
}
export const professionduty_form = {
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
export const workerskillgrade_form = {
  grjsdjmc: undefined,
  grjszwmc: undefined,
  qdjszwsj: undefined,
  pzjszwdwmc: undefined,
  zsbh: undefined,
  grgzm: undefined,
  szdczj: undefined,
}
export const parttimejob_form = {
  shjzqsrq: undefined,
  shjzzzrq: undefined,
  rzzz: undefined,
  zzlx: undefined,
  jzzw: undefined,
  sfqc: undefined,
}
export const servicetoenterprise_form = {
  qssj: undefined,
  zzsj: undefined,
  sy: undefined,
  zje: undefined,
  bz: undefined,
}
export const train_form = {
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
  zgzzl: undefined,
  zgzhm: undefined,
  rjxk: undefined,
  fzjg: undefined,
  zsbfrq: undefined,
}
export const punish_form = {
  cflb: undefined,
  cfyy: undefined,
  cfjlms: undefined,
  cfdwmc: undefined,
  cfrq: undefined,
  cfcxrq: undefined,
  cfcxyy: undefined,
}
export const reward_form = {
  jljbm: undefined,
  jllbm: undefined,
  jlmc: undefined,
  jlyy: undefined,
  jlsj: undefined,
  jldw: undefined,
  bz: undefined,
}
export const organiseinspect_form = {
  kcsy: undefined,
  khrq: undefined,
  bz: undefined,
}
export const jsrzqkcp_form = {
  nd: undefined,
  khfs: undefined,
  khdj: undefined,
  tjryrs: undefined,
  tjryzmc: undefined,
  qxzyjsrys: undefined,
  qxzyjsrymc: undefined,
  bz: undefined,
}
export const furtherstudyforeign_form = {
  hzzjzldm: undefined,
  hzhtxzh: undefined,
  qfdd: undefined,
  qfrq: undefined,
  qfjg: undefined,
  zzrq: undefined,
}

export const grjsdjOptions = [{
    id: '1',
    name: '初级技术工人'
  },
  {
    id: '2',
    name: '中级技术工人'
  },
  {
    id: '3',
    name: '高级技术工人'
  },
  {
    id: '4',
    name: '技师'
  },
  {
    id: '5',
    name: '高级技师'
  },
  {
    id: '6',
    name: '学徒工'
  },
]

export const zzlxOptions = [{
    id: 1,
    type: '社团类'
  },
  {
    id: 2,
    type: '垂直类'
  },
  {
    id: 3,
    type: '其他'
  },
]

export const rzfsOptions = [{
    id: 1,
    type: '选举'
  },
  {
    id: 2,
    type: '任命'
  },
  {
    id: 3,
    type: '轮岗'
  },
  {
    id: 4,
    type: '借调'
  },
  {
    id: 5,
    type: '其他'
  },
]

export const przzsjOptions = [{
    id: 1,
    type: '在聘'
  },
  {
    id: 2,
    type: '不在聘'
  },
  {
    id: 3,
    type: '高职低聘'
  },
]

export const zzjgOptions = [{
    id: 1,
    dep: '部门一'
  },
  {
    id: 2,
    dep: '部门二'
  },
  {
    id: 3,
    dep: '部门三'
  },
  {
    id: 4,
    dep: '部门四'
  },
  {
    id: 5,
    dep: '部门五'
  },
  {
    id: 6,
    dep: '部门六'
  },
]

export const zzztOptions = [{
    id: 1,
    status: '在职'
  },
  {
    id: 2,
    status: '离职'
  },
  {
    id: 3,
    status: '退休'
  },
]

export const jbxx_rules = {
  gh: [{
      required: true,
      message: '请输入工号',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 10,
      message: '长度在 2 到 10 个字符',
      trigger: 'blur'
    }
  ],
  xm: [{
      required: true,
      message: '请输入姓名',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 10,
      message: '长度在 2 到 10 个字符',
      trigger: 'blur'
    }
  ],
  cym: [{
      required: true,
      message: '请输入曾用名',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 10,
      message: '长度在 2 到 10 个字符',
      trigger: 'blur'
    }
  ],
  xbm: [{
    required: true,
    message: '请选择性别',
    trigger: 'blur'
  }],
  csrq: [{
    required: true,
    message: '请输入出生日期',
    trigger: 'blur'
  }],
  csd: [{
      required: true,
      message: '请输入出生地',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 20,
      message: '长度在 2 到 20 个字符',
      trigger: 'blur'
    }
  ],
  sfzjh: [{
    required: true,
    message: '请输入身份证号',
    trigger: 'blur'
  }],
  jg: [{
    required: true,
    message: '请输入籍贯',
    trigger: 'blur'
  }],
  mzm: [{
    required: true,
    message: '请输入民族',
    trigger: 'blur'
  }],
  zzmmm: [{
    required: true,
    message: '请输入政治面貌',
    trigger: 'blur'
  }],
  jkzkm: [{
    required: true,
    message: '请选择健康状况',
    trigger: 'blur'
  }],
  hyzkm: [{
    required: true,
    message: '请选择婚姻状况',
    trigger: 'blur'
  }],
  sfzsc: [{
    required: true,
    message: '请上传身份证件',
  }],
}

export const jyjl_rules = {
  byyx: [{
    required: true,
    message: '请输入毕业院校',
    trigger: 'blur'
  }, ],
  shxwm: [{
    required: true,
    message: '请输入学位',
    trigger: 'blur'
  }, ],
  sxzymc: [{
    required: true,
    message: '请输入专业',
    trigger: 'blur'
  }, ],
  xlsc: [{
    required: true,
    message: '请上传学历证件',
  }, ],
}

export const lxfs_rules = {
  lxdh: [{
    required: true,
    message: '请输入联系电话',
    trigger: 'blur'
  }, ],
  dzyx: [{
    required: true,
    message: '请输入电子邮箱',
    trigger: 'blur'
  }, ],
  jtlxr: [{
    required: true,
    message: '请输入家庭联系人',
    trigger: 'blur'
  }, ],
  jtzz: [{
    required: true,
    message: '请输入家庭住址',
    trigger: 'blur'
  }, ],
  hjlb: [{
    required: true,
    message: '请选择户籍类别',
    trigger: 'blur'
  }, ],
  hkxxdz: [{
    required: true,
    message: '请输入户口详细地址',
    trigger: 'blur'
  }, ],
}

export const zcxx_rules = {
  jszc: [{
    required: true,
    message: '请输入教师职称',
    trigger: 'blur'
  }, ],
  ssjyz: [{
    required: true,
    message: '请输入所属教研组',
    trigger: 'blur'
  }, ],
  yhkh: [{
    required: true,
    message: '请输入银行卡号',
    trigger: 'blur'
  }, ],
  dqztm: [{
    required: true,
    message: '请选择当前状态',
    trigger: 'blur'
  }, ],
  htlx: [{
    required: true,
    message: '请选择合同类型',
    trigger: 'blur'
  }, ],
}

export const qtgrxx_rules = {
  jjzqssj: [{
    required: true,
    message: '请输入居住证起始时间',
    trigger: 'blur'
  }, ],
  sflu: [{
    required: true,
    message: '请选择是否落户',
    trigger: 'blur'
  }, ],
  jjzyxq: [{
    required: true,
    message: '请输入居住证有效期',
    trigger: 'blur'
  }, ],
  dqztm: [{
    required: true,
    message: '请选择当前状态',
    trigger: 'blur'
  }, ],
  hzhtxzh: [{
    required: true,
    message: '请输入护照号/通行证号',
    trigger: 'blur'
  }, ],
  hzhtxzhyxq: [{
    required: true,
    message: '请输入护照号/通行证号有效期',
    trigger: 'blur'
  }, ],
  rdrq: [{
    required: true,
    message: '请输入入党日期',
    trigger: 'blur'
  }, ],
  bz: [{
    required: true,
    message: '请输备注',
    trigger: 'blur'
  }, ],
  ygyshzsc: [{
    required: true,
    message: '请输上传护照证件',
  }, ],
}

export const xljxw_rules = {
  xlm: [{
    required: true,
    message: '请输入学历',
    trigger: 'blur'
  }, ],
  rxsj: [{
    required: true,
    message: '请选择入学时间',
    trigger: 'blur'
  }, ],
  xxxsm: [{
    required: true,
    message: '请输入学习形式',
    trigger: 'blur'
  }, ],
  xz: [{
    required: true,
    message: '请输入学制',
    trigger: 'blur'
  }, ],
  bysj: [{
    required: true,
    message: '请输入毕业时间',
    trigger: 'blur'
  }, ],
}

export const grll_rules = {
  qssj: [{
    required: true,
    message: '请输入超始时间',
    trigger: 'blur'
  }, ],
  zzsj: [{
    required: true,
    message: '请输入终止时间',
    trigger: 'blur'
  }, ],
  szdw: [{
    required: true,
    message: '请输入所在单位',
    trigger: 'blur'
  }, ],
  zw: [{
    required: true,
    message: '请输入职务',
    trigger: 'blur'
  }, ],
  dwszsf: [{
    required: true,
    message: '请输入单位所在省份',
    trigger: 'blur'
  }, ],
}

export const zzmmjdjqk_rules = {
  zzmmm: [{
    required: true,
    message: '请输入政治面貌',
    trigger: 'blur'
  }, ],
  cjrq: [{
    required: true,
    message: '请输入参加党派时间',
    trigger: 'blur'
  }, ],
  jsr: [{
    required: true,
    message: '请输入介绍人',
    trigger: 'blur'
  }, ],
  zzrq: [{
    required: true,
    message: '请输入转正时间',
    trigger: 'blur'
  }, ],
}

export const js_rules = {
  cw: [{
    required: true,
    message: '请输入称谓',
    trigger: 'blur'
  }, ],
  xm: [{
    required: true,
    message: '请输入姓名',
    trigger: 'blur'
  }, ],
  csny: [{
    required: true,
    message: '请输入出生年月',
    trigger: 'blur'
  }, ],
  zzmmm: [{
    required: true,
    message: '请输入政治面貌',
    trigger: 'blur'
  }, ],
  dwmc: [{
    required: true,
    message: '请输入单位名称',
    trigger: 'blur'
  }, ],
  lxfs: [{
    required: true,
    message: '请输入联系方式',
    trigger: 'blur'
  }, ],
}

export const rzxx_rules = {
  xnzw: [{
    required: true,
    message: '请输入校内职务',
    trigger: 'blur'
  }, ],
  cjgzsj: [{
    required: true,
    message: '请输入参加工作时间',
    trigger: 'blur'
  }, ],
  jrbdwgzsj: [{
    required: true,
    message: '请输入进入本单位工作时间',
    trigger: 'blur'
  }, ],
  rznx: [{
    required: true,
    message: '请输入任职年限',
    trigger: 'blur'
  }, ],
  jyz: [{
    required: true,
    message: '请输入教研组',
    trigger: 'blur'
  }, ],
  gl: [{
    required: true,
    message: '请输入工龄',
    trigger: 'blur'
  }, ],
  sjgznx: [{
    required: true,
    message: '请输入实际工作年限',
    trigger: 'blur'
  }, ],
  jl: [{
    required: true,
    message: '请输入教龄',
    trigger: 'blur'
  }, ],
  jrgwlbm: [{
    required: true,
    message: '请输入岗位类别',
    trigger: 'blur'
  }, ],
  ygxs: [{
    required: true,
    message: '请输入用工形式',
    trigger: 'blur'
  }, ],
  rylb: [{
    required: true,
    message: '请输入人员类别',
    trigger: 'blur'
  }, ],
  rylply: [{
    required: true,
    message: '请输入人员录聘来源',
    trigger: 'blur'
  }, ],
  sxqx: [{
    required: true,
    message: '请输入实习期限',
    trigger: 'blur'
  }, ],
  xxzgbmm: [{
    required: true,
    message: '请输入部门（处室）',
    trigger: 'blur'
  }, ],
  jysj: [{
    required: true,
    message: '请输入减员时间',
    trigger: 'blur'
  }, ],
  jyclsc: [{
    required: true,
    message: '请上传减员材料',
    trigger: 'blur'
  }, ],
}

export const zyzgz_rules = {
  zygz: [{
    required: true,
    message: '请输入职业工种',
    trigger: 'blur'
  }, ],
  zydj: [{
    required: true,
    message: '请输入职业等级',
    trigger: 'blur'
  }, ],
  bzjg: [{
    required: true,
    message: '请输入颁证机构',
    trigger: 'blur'
  }, ],
  zyzgzsbh: [{
    required: true,
    message: '请输入证书编号',
    trigger: 'blur'
  }, ],
  zsbfrq: [{
    required: true,
    message: '请输入取得时间',
    trigger: 'blur'
  }, ],
}

export const xnzwb_rules = {
  xxzgbmm: [{
    required: true,
    message: '请输入部门',
    trigger: 'blur'
  }, ],
  zwmc: [{
    required: true,
    message: '请输入职务名称',
    trigger: 'blur'
  }, ],
  rzfsm: [{
    required: true,
    message: '请输入任职方式',
    trigger: 'blur'
  }, ],
  rmzwh: [{
    required: true,
    message: '请输入任免职文号',
    trigger: 'blur'
  }, ],
  zwjbm: [{
    required: true,
    message: '请输入职务级别',
    trigger: 'blur'
  }, ],
  rzrq: [{
    required: true,
    message: '请输入任本职级时间',
    trigger: 'blur'
  }, ],
}

export const zyjszw_rules = {
  zyjszgmc: [{
    required: true,
    message: '请输入专业技术资格名称',
    trigger: 'blur'
  }, ],
  qdzgtjm: [{
    required: true,
    message: '请输入取得资格途径',
    trigger: 'blur'
  }, ],
  hdzgsj: [{
    required: true,
    message: '请输入取得资格时间',
    trigger: 'blur'
  }, ],
  rzzgmcm: [{
    required: true,
    message: '请输入聘任专业技术职务名称',
    trigger: 'blur'
  }, ],
  scprsj: [{
    required: true,
    message: '请输入首次聘任时间',
    trigger: 'blur'
  }, ],
  prqsrq: [{
    required: true,
    message: '请输入聘任起始时间',
    trigger: 'blur'
  }, ],
  przzrq: [{
    required: true,
    message: '请选择聘任终止时间',
    trigger: 'blur'
  }, ],
  scdzzj: [{
    required: true,
    message: '请上传电子证件',
    trigger: 'blur'
  }, ],
}

export const grjsdjjzw_rules = {
  grjsdjmc: [{
    required: true,
    message: '请选择工人技术等级名称',
    trigger: 'blur'
  }, ],
  grjszwmc: [{
    required: true,
    message: '请选择工人技术职务名称',
    trigger: 'blur'
  }, ],
  qdjszwsj: [{
    required: true,
    message: '请输入取得技术职务时间',
    trigger: 'blur'
  }, ],
  pzjszwdwmc: [{
    required: true,
    message: '请输入批准技术职务单位名称',
    trigger: 'blur'
  }, ],
  zsbh: [{
    required: true,
    message: '请输入证书编号',
    trigger: 'blur'
  }, ],
  grgzm: [{
    required: true,
    message: '请输入职业工种',
    trigger: 'blur'
  }, ],
  szdczj: [{
    required: true,
    message: '请上传电子证件',
    trigger: 'blur'
  }, ],
}

export const shjz_rules = {
  shjzqsrq: [{
    required: true,
    message: '请输入起始时间',
    trigger: 'blur'
  }, ],
  shjzzzrq: [{
    required: true,
    message: '请输入终止时间',
    trigger: 'blur'
  }, ],
  rzzz: [{
    required: true,
    message: '请输入任职组织',
    trigger: 'blur'
  }, ],
  zzlx: [{
    required: true,
    message: '请选择组织类型',
  }, ],
  jzzw: [{
    required: true,
    message: '请输入兼职职务',
    trigger: 'blur'
  }, ],
  sfqc: [{
    required: true,
    message: '请输入是否取酬',
    trigger: 'blur'
  }, ],
}

export const fwxy_rules = {
  qssj: [{
    required: true,
    message: '请输入起始时间',
    trigger: 'blur'
  }, ],
  zzsj: [{
    required: true,
    message: '请输入终止时间',
    trigger: 'blur'
  }, ],
  sy: [{
    required: true,
    message: '请输入事由',
    trigger: 'blur'
  }, ],
  zje: [{
    required: true,
    message: '请输入总金额',
  }, ],
  bz: [{
    required: true,
    message: '请输入备注',
    trigger: 'blur'
  }, ],
}

export const jsfzxx_rules = {
  sxzh: [{
    required: true,
    message: '请输入师训帐号',
    trigger: 'blur'
  }, ],
  jszgzsc: [{
    required: true,
    message: '请上传教师资格证',
    trigger: 'blur'
  }, ],
}

export const jypx_rules = {
  xxqssj: [{
    required: true,
    message: '请输入学习起始时间',
    trigger: 'blur'
  }, ],
  xxzzsj: [{
    required: true,
    message: '请输入学习终止时间',
    trigger: 'blur'
  }, ],
  pxbmc: [{
    required: true,
    message: '请输入培训班名称',
    trigger: 'blur'
  }, ],
  pxxs: [{
    required: true,
    message: '请输入培训学时',
    trigger: 'blur'
  }, ],
  pxlb: [{
    required: true,
    message: '请输入培训类别',
    trigger: 'blur'
  }, ],
  zbdw: [{
    required: true,
    message: '请输入主办单位',
    trigger: 'blur'
  }, ],
  cjcgcj: [{
    required: true,
    message: '请输入参加出国出境',
    trigger: 'blur'
  }, ],
  sfxlxwjs: [{
    required: true,
    message: '请输入是否学历学位晋升',
    trigger: 'blur'
  }, ],
}

export const jszgz_rules = {
  jszgzzlm: [{
    required: true,
    message: '请输入资格种类',
    trigger: 'blur'
  }, ],
  jszgzhm: [{
    required: true,
    message: '请输入资格证号码',
    trigger: 'blur'
  }, ],
  rjxk: [{
    required: true,
    message: '请输入任教学科',
    trigger: 'blur'
  }, ],
}

export const cf_rules = {
  cflb: [{
    required: true,
    message: '请输入处分类别',
    trigger: 'blur'
  }, ],
  ccmc: [{
    required: true,
    message: '请输入处分名称',
    trigger: 'blur'
  }, ],
  ccrq: [{
    required: true,
    message: '请输入受处分时间',
    trigger: 'blur'
  }, ],
  ccyy: [{
    required: true,
    message: '请输入处分原因',
    trigger: 'blur'
  }, ],
  cccxrq: [{
    required: true,
    message: '请输入撤销处分时间',
    trigger: 'blur'
  }, ],
  jcjgzjjy: [{
    required: true,
    message: '请输入监察机关直接给予的',
    trigger: 'blur'
  }, ],
}

export const jl_rules = {
  hjlbm: [{
    required: true,
    message: '请输入奖励类别',
    trigger: 'blur'
  }, ],
  jlmc: [{
    required: true,
    message: '请输入奖励名称',
    trigger: 'blur'
  }, ],
  hjrq: [{
    required: true,
    message: '请输入奖励时间',
    trigger: 'blur'
  }, ],
  bjdw: [{
    required: true,
    message: '请输入奖励单位',
    trigger: 'blur'
  }, ],
}

export const zzkc_rules = {
  kcsy: [{
    required: true,
    message: '请输入考察（考核）事由',
    trigger: 'blur'
  }, ],
  khrq: [{
    required: true,
    message: '请输入考察（考核）时间',
    trigger: 'blur'
  }, ],
  bz: [{
    required: true,
    message: '请输入备注',
    trigger: 'blur'
  }, ],
}

export const jsrzqkpc_rules = {
  nd: [{
    required: true,
    message: '请输入年度',
    trigger: 'blur'
  }, ],
  khfs: [{
    required: true,
    message: '请输入考核分数',
    trigger: 'blur'
  }, ],
  khdj: [{
    required: true,
    message: '请输入考核等级',
    trigger: 'blur'
  }, ],
  tjryrs: [{
    required: true,
    message: '请输入同级人员人数',
    trigger: 'blur'
  }, ],
  tjryzmc: [{
    required: true,
    message: '请输入同级人员中名次',
    trigger: 'blur'
  }, ],
  qxzyjsrys: [{
    required: true,
    message: '请输入全校专业技术人员数',
    trigger: 'blur'
  }, ],
  qxzyjsrymc: [{
    required: true,
    message: '请输入全校专业技术人员名次',
    trigger: 'blur'
  }, ],
  bz: [{
    required: true,
    message: '请输入备注',
    trigger: 'blur'
  }, ],
}

export const xcflxx_rules = {
  tygzbs: [{
    required: true,
    message: '请选择套用工资标示',
    trigger: 'blur'
  }, ],
  gwjd: [{
    required: true,
    message: '请输入岗位绩点',
    trigger: 'blur'
  }, ],
  xj: [{
    required: true,
    message: '请输入薪级等级',
    trigger: 'blur'
  }, ],
  gwdjm: [{
    required: true,
    message: '请输入岗位等级',
    trigger: 'blur'
  }, ],
  xjdjfj: [{
    required: true,
    message: '请上传薪级等级附件',
    trigger: 'blur'
  }, ],
}

export const ygyshz_rules = {
  hzzjzldm: [{
    required: true,
    message: '请输入类别',
    trigger: 'blur'
  }, ],
  hzhtxzh: [{
    required: true,
    message: '请输入护照号',
    trigger: 'blur'
  }, ],
  qfdd: [{
    required: true,
    message: '请输入签发地点',
    trigger: 'blur'
  }, ],
  qfrq: [{
    required: true,
    message: '请输入签发日期',
    trigger: 'blur'
  }, ],
  qfjg: [{
    required: true,
    message: '请上传签发机关',
    trigger: 'blur'
  }, ],
  zjyxq: [{
    required: true,
    message: '请输入有效期',
    trigger: 'blur'
  }, ],
}

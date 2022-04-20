export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 240,
  searchSpan: 6,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: '月份',
      prop: 'yf',
      search: true,
      type: 'month',
    },
    {
      label: '表格名称',
      prop: 'bgmc',
      width: '200',
      search: true,
    },
    {
      label: '总金额',
      prop: 'zje',
    },
    {
      label: '生成时间',
      prop: 'scsj',
      type: 'date'
    },
    {
      label: '备注',
      prop: 'bz',
    }
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  menu: false,
  menuWidth: 140,
  addBtn: false,
  columnBtn: false,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
    },
    {
      label: '工号',
      prop: 'gh',
    },
    {
      label: '姓名',
      prop: 'xm',
    },
    {
      label: '身份证号',
      prop: 'sfzjh',
    },
    {
      label: '人员分类',
      prop: 'ryfl',
    },
    {
      label: '业务年度',
      prop: 'ywnd',
    },
    {
      label: '月份',
      prop: 'yf',
    },
    {
      label: '校内岗位津贴',
      prop: 'xngwjt',
      width: 120,
    },
    {
      label: '实训实验室津贴',
      prop: 'sxsysjt',
      width: 120,
    },
    {
      label: '技术津贴',
      prop: 'jsjt',
    },
    {
      label: '学科带头人津贴',
      prop: 'xkdtrjt',
      width: 120,
    },
    {
      label: '组长津贴',
      prop: 'zzjt',
    },
    {
      label: '学委津贴',
      prop: 'xwjt',
    },
    {
      label: '骨干教师',
      prop: 'ggjs',
    },
    {
      label: '督导组津贴',
      prop: 'ddzjt',
      width: 120,
    },
    {
      label: '行政兼课',
      prop: 'xzlk',
    },
    {
      label: '双师津贴',
      prop: 'ssjt',
    },
    {
      label: '租房补贴',
      prop: 'zfbt',
    },
    {
      label: '其他补贴',
      prop: 'qtbt',
    },
    {
      label: '班主任津贴',
      prop: 'bzrjt',
      width: 120,
    },
    {
      label: '班主任课时津贴',
      prop: 'bzrksjt',
      width: 120,
    },
    {
      label: '带教教师津贴',
      prop: 'djjsjt',
      width: 120,
    },
    {
      label: '工作室津贴',
      prop: 'gzsjt',
      width: 120,
    },
    {
      label: '财政岗位津贴',
      prop: 'czgwjt',
      width: 120,
    },
    {
      label: '各类特殊岗位津贴',
      prop: 'gltsgwjt',
      width: 120,
    },
    {
      label: '应发工资',
      prop: 'yfgz',
    },
    {
      label: '扣个税',
      prop: 'kgs',
    },
    {
      label: '扣职业年金',
      prop: 'kzynj',
      width: 120,
    },
    {
      label: '其他扣款',
      prop: 'qtkk',
    },
    {
      label: '扣款合计',
      prop: 'kkhj',
    },
    {
      label: '卡实发',
      prop: 'ksf',
    }
  ]
}

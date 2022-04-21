export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  labelWidth: 240,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '工号',
      prop: 'gh',
      search: true,
    },
    {
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '身份证号',
      prop: 'sfjjh',
      search: true,
    },
    {
      label: '人员分类',
      prop: 'ryfl',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/rygwlx_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: '业务年度',
      prop: 'ywnd',
      search: true,
      type: 'year'
    },
    {
      label: '月份',
      prop: 'yf',
      search: true,
      type: 'month',
    },
    {
      label: '岗位工资',
      prop: 'gwgz',
    },
    {
      label: '薪级工资',
      prop: 'xjgz',
    },
    {
      label: '上下班交通费补贴',
      prop: 'sxbjtfbt',
      width: 120,
    },
    {
      label: '独生子女父母奖励费',
      prop: 'dsznfmjlf',
      width: 140,
    },
    {
      label: '基础绩效奖',
      prop: 'jcjxj',
      width: 120,
    },
    {
      label: '教龄津贴',
      prop: 'jljt',
    },
    {
      label: '护龄津贴',
      prop: 'hljt',
    },
    {
      label: '政府特殊津贴',
      prop: 'zftsjt',
      width: 120,
    },
    {
      label: '各类特殊岗位津贴',
      prop: 'gltsgwjt',
      width: 120,
    },
    {
      label: '选派青年志愿人员赴云南扶贫补贴',
      prop: 'xpqnzyryfynfpbt',
      width: 220,
    },
    {
      label: '选派干部赴西藏等省市补贴',
      prop: 'xpgbfxzdxsbt',
      width: 180,
    },
    {
      label: '特级教师津贴',
      prop: 'tjjsjt',
      width: 120,
    },
    {
      label: '支教人员津贴',
      prop: 'zjryjt',
      width: 120,
    },
    {
      label: '其他',
      prop: 'qt',
    },
    {
      label: '统发应发工资',
      prop: 'tfyfgz',
      width: 120,
    },
    {
      label: '职业年金',
      prop: 'zynj',
    },
    {
      label: '养老金',
      prop: 'ylj',
    },
    {
      label: '住房公积金',
      prop: 'zfgjj',
      width: 120,
    },
    {
      label: '医疗保险金',
      prop: 'ylbxj',
      width: 120,
    },
    {
      label: '失业保险金',
      prop: 'sybxj',
      width: 120,
    },
    {
      label: '个人所得税',
      prop: 'grsds',
      width: 120,
    },
    {
      label: '工会费',
      prop: 'ghf',
    },
    {
      label: '其他扣项1',
      prop: 'qtkxy',
      width: 120,
    },
    {
      label: '其他扣项2',
      prop: 'qtkxe',
      width: 120,
    },
    {
      label: '其他扣项3',
      prop: 'qtkxs',
      width: 120,
    },
    {
      label: '其他扣项',
      prop: 'qtkx',
    },
    {
      label: '统发扣款工资',
      prop: 'tfkkgz',
      width: 120,
    },
    {
      label: '统发实发工资',
      prop: 'tfsfgz',
      width: 120,
    },
    {
      label: '应纳税所得额',
      prop: 'ynssde',
      width: 120,
    },
    {
      label: '补发工资应发额',
      prop: 'bfgzyfe',
      width: 120,
    },
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 8,
  searchSpan: 8,
  labelWidth: 240,
  menu: false,
  addBtn: false,
  columnBtn: false,
  column: [{
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '工号',
      prop: 'gh',
      search: true,
    },
    {
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '身份证号',
      prop: 'sfjjh',
      search: true,
    },
    {
      label: '人员分类',
      prop: 'ryfl',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/rygwlx_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
  ]
}

import { newVersionCardId } from "@/util/validate"
import { rule } from "@/util/validateRules"
import constants from "@/const/crud/salary/constants"

var validateIdCard = (rule, value, callback) => {
  if (newVersionCardId(value)) {
    callback()
  } else {
    callback(new Error('身份证号格式有误，请检查!'))
  }
}

export const option = {
  align: 'center',
  border: true,
  index: true,
  columnBtn: false,
  labelWidth: 240,
  menuWidth: 140,
  column: [
    {
      label: '部门',
      prop: 'deptId',
      type: 'tree',
      dicUrl: '/admin/dept/tree',
      disabled: true,
      addDisplay: false,
      fixed: true,
      search: true,
      props: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
    },
    {
      label: '姓名',
      fixed: true,
      prop: 'xm',
      search: true,
      rules: [
        {
          required: true,
          message: "姓名必须填写",
        },
      ],
    },
    {
      label: '工号',
      prop: 'gh',
      disabled: true,
      addDisplay: false,
      fixed: true,
      fixed: true,
      search: true,
    },
    {
      label: '身份证号',
      prop: 'sfzjh',
      fixed: true,
      search: true,
      rules: [
        {
          required: true,
          validator: validateIdCard,
          message: "身份证号必须填写",
        },
      ],
    },
    {
      label: '银行卡号',
      prop: 'yhkh',
      disabled: true,
      addDisplay: false,
      search: true,
      // rules: [
      //   {
      //     required: true,
      //     message: "银行卡号必须填写",
      //   },
      // ],
    },
    {
      label: '人员类型',
      prop: 'personType',
      type: 'select',
      search: true,
      disabled: true,
      addDisplay: false,
      dicUrl: '/admin/dict/type/sal_person_type',
      rules: [
        {
          required: true,
          message: "人员类型必须填写",
        },
      ],
    },
    {
      label: '业务年度',
      prop: 'year',
      type: 'year',
      search: true,
      disabled: true,
      addDisplay: false,
    },
    {
      label: '月份',
      prop: 'month',
      type: 'month',
      search: true,
      format: 'MM',
      valueFormat: 'MM',
      disabled: true,
      addDisplay: false,
    },
    {
      label: '岗位工资',
      prop: 'gwgz',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      disabled: true,
      addDisplay: false,
    },
    {
      label: '薪级工资',
      prop: 'xjgz',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      disabled: true,
      addDisplay: false,
    },
    {
      label: '上下班交通费补贴',
      prop: 'sxbjtfbt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "上下班交通费补贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '独生子女父母奖励费',
      prop: 'dsznfmjlf',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "独生子女父母奖励费必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '基础绩效奖',
      prop: 'jcjxj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "基础绩效奖必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '教龄津贴',
      prop: 'jljt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "教龄津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '护龄津贴',
      prop: 'hljt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "护龄津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '政府特殊津贴',
      prop: 'zftsjt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "政府特殊津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '各类特殊岗位津贴',
      prop: 'gltsgwjt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "各类特殊岗位津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '选派青年志愿人员赴云南扶贫补贴',
      prop: 'xpqnzyzryfynfpbt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "选派青年志愿人员赴云南扶贫补贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '选派干部赴西藏等省市补贴',
      prop: 'xpgbfxzdssbt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "选派干部赴西藏等省市补贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '特级教师津贴',
      prop: 'tjjsjt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "特级教师津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '支教人员津贴',
      prop: 'zjryjt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "支教人员津贴必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '其他',
      prop: 'qt',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "其他必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '统发应发工资',
      prop: 'tfyfgz',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "统发应发工资必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '职业年金',
      prop: 'zynj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "职业年金必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '养老金',
      prop: 'ylj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "养老金必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '住房公积金',
      prop: 'zfgjj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "住房公积金必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '医疗保险金',
      prop: 'ylbxj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "医疗保险金必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '失业保险金',
      prop: 'sybxj',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "失业保险金必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '个人所得税',
      prop: 'grsds',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "个人所得税必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '工会费',
      prop: 'ghh',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "工会费必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '其他扣项1',
      prop: 'qtkkxOne',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "其他扣项1必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '其他扣项2',
      prop: 'qtkkxTwo',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "其他扣项2必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '其他扣项3',
      prop: 'qtkkxThree',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "其他扣项3必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '其他扣项',
      prop: 'qtkx',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "其他扣项必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '统发扣款工资',
      prop: 'tfkkgz',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "统发扣款工资必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '统发实发工资',
      prop: 'tfsfgz',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "统发实发工资必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '应纳税所得额',
      prop: 'ynssde',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "应纳税所得额必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '补发工资应发额',
      prop: 'bfgzyfe',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "补发工资应发额必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
  ]
}

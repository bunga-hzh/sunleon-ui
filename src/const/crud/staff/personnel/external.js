import {
  newVersionCardId,
} from "@/util/validate";
import {
  sex_type,
  is_type,
  has_type,
} from "@/const/commonDict";

var validateIdCard = (rule, value, callback) => {
  if (newVersionCardId(value)) {
    callback();
  } else {
    callback(new Error('身份证号格式有误，请检查!'));
  }
}

export const option = {
  align: 'center',
  border: true,
  searchLabelWidth: 100,
  labelWidth: 160,
  index: true,
  menuWidth: 260,
  searchSpan: 8,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      rules: [{
        required: true,
        message: "请输入 姓名",
        trigger: "blur"
      }],
    },
    {
      label: "性别",
      prop: "xbm",
      type: 'radio',
      border: true,
      search: true,
      dicData: sex_type,
      props: {
        "label": "label",
        "value": "value",
      },
      rules: [{
        required: true,
        message: "请选择 性别",
        trigger: "blur"
      }],
    },
    {
      label: "民族",
      prop: "mzm",
      type: "select",
      search: true,
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/nation_type',
      rules: [{
        required: true,
        message: "请选择 民族",
        trigger: "blur"
      }],
    },
    {
      label: "出生日期",
      prop: "csrq",
      width: 150,
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 出生日期",
        trigger: "blur"
      }],
    },
    {
      label: "身份证号码",
      prop: "sfzjh",
      search: true,
      width: 150,
      rules: [{
          required: true,
          message: "请填写 身份证号码",
          trigger: "blur"
        },
        {
          validator: validateIdCard,
          trigger: 'blur'
        }
      ],
    },
    {
      label: "性质",
      prop: "xz",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_nature',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 性质",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "家庭地址",
      prop: "jtdz",
      rules: [{
        required: true,
        message: "请输入 家庭地址",
        trigger: "blur"
      }],
      width: 180,
    },
    {
      label: "联系电话",
      prop: "lxdh",
      rules: [{
        required: true,
        message: "请输入 联系电话",
        trigger: "blur"
      }],
      width: 120,
    },
    {
      label: "户口",
      prop: "hk",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_account',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 户口",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "四金缴纳",
      prop: "sjjn",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_four_gold_payments',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 四金缴纳",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "是否已参加综合保险",
      prop: "sfycjzhbx",
      width: 150,
      type: 'radio',
      border: true,
      searchLabelWidth: 150,
      dicData: is_type,
      rules: [{
        required: true,
        message: "请选择 教师资格证",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "学历",
      prop: "xl",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_education',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 学历",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "学位",
      prop: "xw",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_degree',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 学位",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "参加工作（年月）",
      prop: "cjgzrq",
      width: 150,
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 参加工作（年月）",
        trigger: "blur"
      }],
    },
    {
      label: "教师资格证",
      prop: "jszgz",
      width: 150,
      type: 'radio',
      border: true,
      dicData: has_type,
      rules: [{
        required: true,
        message: "请选择 教师资格证",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "双师型教师",
      prop: "xsxjs",
      width: 150,
      type: 'radio',
      border: true,
      dicData: is_type,
      rules: [{
        required: true,
        message: "请选择 双师型教师",
        trigger: "blur"
      }],
      search: true,
    },
    {
      label: "所学专业名称",
      prop: "sxzymc",
      width: 150,
      rules: [{
        required: true,
        message: "请输入 所学专业名称",
        trigger: "blur"
      }],
    },
    {
      label: "职称",
      addDisplay: false,
      editDisplay: false,
      children: [{
          label: "等级",
          prop: "dj",
          type: 'select',
          dicUrl: '/admin/dict/type/jzg_job_level',
          props: {
            label: 'label',
            value: 'value'
          },
          rules: [{
            required: true,
            message: "请选择 等级",
            trigger: "blur"
          }],
          search: true,
        },
        {
          label: "名称（全称）",
          prop: "mc",
          width: 120,
          rules: [{
            required: true,
            message: "请输入 名称",
            trigger: "blur"
          }],
        },
        {
          label: "发证单位",
          prop: "fzdw",
          rules: [{
            required: true,
            message: "请输入 发证单位",
            trigger: "blur"
          }],
        },
        {
          label: "获取日期（年月日）",
          prop: "hqrq",
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          rules: [{
            required: true,
            message: "请输入 获取日期",
            trigger: "blur"
          }],
          width: 140,
        },
      ],
    },
    {
      label: "当前专职工作背景",
      children: [{
          label: "单位名称",
          prop: 'dwmc',
          rules: [{
            required: true,
            message: "请输入 单位名称",
            trigger: "blur"
          }],
        },
        {
          label: "职务",
          prop: 'zw',
          rules: [{
            required: true,
            message: "请输入 职务",
            trigger: "blur"
          }],
        },
        {
          label: "任职日期（年月日）",
          prop: "rzrq",
          type: 'date',
          valueFormat: 'yyyy-MM-dd',
          rules: [{
            required: true,
            message: "请输入 任职日期",
            trigger: "blur"
          }],
          width: 140,
        },
      ],
    }
  ],
}

/**
 * 职业资格证书（子集）
 */
export const certificateOption = {
  align: 'center',
  border: true,
  align: 'center',
  index: true,
  labelWidth: 160,
  column: [{
      label: "类别",
      prop: "lb",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_certificate_type',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 类别",
        trigger: "blur"
      }],
    },
    {
      label: "等级",
      prop: "dj",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_certificate_level',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请选择 等级",
        trigger: "blur"
      }],
    },
    {
      label: "名称（全称）",
      prop: "mc",
      rules: [{
        required: true,
        message: "请输入 名称（全称）",
        trigger: "blur"
      }],
    },
    {
      label: "发证单位",
      prop: "fzdw",
      rules: [{
        required: true,
        message: "请输入 发证单位",
        trigger: "blur"
      }],
    },
    {
      label: "证书编号",
      prop: "zsbh",
      rules: [{
        required: true,
        message: "请输入 证书编号",
        trigger: "blur"
      }],
    },
    {
      label: "获取日期（年月日）",
      prop: "hqrq",
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      width: 140,
      rules: [{
        required: true,
        message: "请输入 获取日期（年月日）",
        trigger: "blur"
      }],
    },
  ]
}

/**
 * 拟承担的教学任务（子集）
 */
export const teachingTasksOption = {
  align: 'center',
  border: true,
  index: true,
  labelWidth: 160,
  column: [{
      label: "课程",
      prop: "kc",
      rules: [{
        required: true,
        message: "请输入 课程",
        trigger: "blur"
      }],
    },
    {
      label: "班级",
      prop: "bj",
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_class',
      props: {
        label: 'label',
        value: 'value'
      },
      rules: [{
        required: true,
        message: "请输入 班级",
        trigger: "blur"
      }],
    },
    {
      label: "课时（节×周）",
      prop: "ks",
      type: "number",
      minRows: 0,
      rules: [{
        required: true,
        message: "请输入 课时（节×周）",
        trigger: "blur"
      }],
    },
    {
      label: "单价",
      prop: "dj",
      type: "number",
      minRows: 0,
      rules: [{
        required: true,
        message: "请输入 单价",
        trigger: "blur"
      }],
    }
  ]
}

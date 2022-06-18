import {
  newVersionCardId,
} from "@/util/validate";

var validateIdCard = (rule, value, callback) => {
  if (newVersionCardId(value)) {
    callback();
  } else {
    callback(new Error('身份证号格式有误，请检查!'));
  }
}

export const option = {
  menuWidth: 160,
  align: 'center',
  border: true,
  searchMenuSpan: 4,
  labelWidth: 160,
  index: true,
  menuWidth: 200,
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
      dicData: [{
          label: "男",
          value: 1,
        },
        {
          label: "女",
          value: 2,
        }
      ],
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
      dicData: [{
          label: '有',
          value: '1'
        },
        {
          label: '无',
          value: '0'
        }
      ],
      rules: [{
        required: true,
        message: "请选择 教师资格证",
        trigger: "blur"
      }],
    },
    {
      label: "双师型教师",
      prop: "xsxjs",
      width: 150,
      type: 'radio',
      dicData: [{
          label: '是',
          value: '1'
        },
        {
          label: '否',
          value: '0'
        }
      ],
      rules: [{
        required: true,
        message: "请选择 双师型教师",
        trigger: "blur"
      }],
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
      rules: [{
        required: true,
        message: "请输入 班级",
        trigger: "blur"
      }],
    },
    {
      label: "课时（节×周）",
      prop: "ks",
      rules: [{
        required: true,
        message: "请输入 课时（节×周）",
        trigger: "blur"
      }],
    },
    {
      label: "单价",
      prop: "dj",
      rules: [{
        required: true,
        message: "请输入 单价",
        trigger: "blur"
      }],
    }
  ]
}

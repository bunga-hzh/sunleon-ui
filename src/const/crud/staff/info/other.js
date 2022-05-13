export const otherOption = {
  submitText: '保存',
  column: [{
      label: "户口所在地",
      prop: "hkszdm",
      labelWidth: 130,
    },
    {
      label: "户籍类别",
      prop: "hjlb",
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/census_type',
    },
    {
      label: "当前状态",
      prop: "dqztm",
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/dqztk_type',
    },
    {
      label: "户口详细地址",
      prop: "hkxxdz",
      labelWidth: 130,
    },
    {
      label: "居住详细地址",
      prop: "jzxxdz",
      labelWidth: 130,
    },
    {
      label: "入党日期",
      prop: "rdrq",
      labelWidth: 130,
    },
    {
      label: "健康状况",
      prop: "jkzkm",
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/healthy_tyep',
    },
    {
      label: "婚姻状况",
      prop: "hyzkm",
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/marriage_type',
    },
    {
      label: "合同类型",
      prop: "htlx",
      labelWidth: 130,
    },
    {
      label: "专技人员专业类别",
      prop: "zyjsrylb",
      labelWidth: 130,
    },
    {
      label: "居住证起始时间",
      prop: "jzzqssj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
      labelWidth: 130,
    },
    {
      label: "居住证截止时间",
      prop: "jjzjzsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
      labelWidth: 130,
    },
    {
      label: "是否落户",
      prop: "sflh",
      labelWidth: 130,
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/account_sh_type',
    },
    {
      label: "是否具有职业资格",
      prop: "sfjyzyzg",
      labelWidth: 130,
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_profession_qualifications',
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
      labelWidth: 130,
    },
  ]
}

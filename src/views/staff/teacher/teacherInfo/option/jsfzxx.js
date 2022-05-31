const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  labelWidth: 170,
  submitText: '添加',
  detail: false,
  group: [{
    label: '教师发展信息',
    column: [{
        label: "师训帐号",
        prop: "sxzh",
      },
      {
        label: "校内聘任双师型教师",
        prop: "ssxjsrd",
        // prop: "xnprssxjs",
      },
      {
        label: "是否教研组长",
        prop: "sfjyzz",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "教研组长备注",
        prop: "jyzzbz",
      },
      {
        label: "是否学科带头人",
        prop: "sfxkdtr",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "学科带头人备注",
        prop: "xkdtrbz",
      },
      {
        label: "是否骨干教师",
        prop: "sfggjs",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "骨干教师备注",
        prop: "ggjsbz",
      },
      {
        label: "是否学术委员会成员",
        prop: "sfxswyhcy",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "学术委员会成员备注",
        prop: "xswyhcybz",
      },
      {
        label: "是否督导组成员",
        prop: "sfddzcy",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "督导组成员备注",
        prop: "ddzcybz",
      },
      {
        label: "是否名师工作室主持人",
        prop: "sfmsgzszcr",
        type: "radio",
        props: {
          label: "label",
          value: 'value'
        },
        dicData: is_type,
      },
      {
        label: "名师工作室主持人备注",
        prop: "msgzszcrbz",
      },
      {
        label: "名师工作室主持人级别",
        prop: "msgzszcrjb",
        type: "select",
        props: {
          label: "label",
          value: 'value'
        },
        dicUrl: '/admin/dict/type/host_level',
      },
      {
        label: "教师资格证上传",
        prop: "jszgzsc",
        type: 'upload',
        limit: 1,
        fileSize: 5120,
        propsHttp: {
          url: 'url',
          name: 'originalName',
          res: 'data'
        },
        tip: '不超过5M',
        action: '/admin/sys-file/upload',
        span: 24,
      },
    ]
  }]
}

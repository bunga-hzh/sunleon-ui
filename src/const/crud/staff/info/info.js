export const infoOption = {
  submitText: '添加',
  readonly: false,
  column: [{
      label: "教职工编号",
      prop: "gh",
      labelWidth: 130,
      span: 12,
      rules: [{
        required: true,
        message: "教职工编号",
        trigger: "blur"
      }],
    },
    {
      label: "姓名",
      prop: "xm",
      span: 6,
      labelWidth: 60,
    },
    {
      label: "曾用名",
      prop: "cym",
      span: 6,
      labelWidth: 60,
    },
    {
      label: "出生日期",
      prop: "csrq",
      type: "date",
      labelWidth: 130,
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "年龄",
      prop: "jsnl",
      span: 6,
      type: "number",
      minRows: 0,
      maxRows: 120,
      labelWidth: 60,
    },
    {
      label: "性别",
      prop: "xbm",
      span: 6,
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/sex_type',
      labelWidth: 60,
    },
    {
      label: "籍贯",
      prop: "jg",
      labelWidth: 130,
    },
    {
      label: "身份证号",
      prop: "sfzjh",
    },
    {
      label: "出生地",
      prop: "csd",
      labelWidth: 130,
    },
    {
      label: "民族",
      prop: "mzm",
      span: 6,
      labelWidth: 60,
    },
    {
      label: "政治面貌",
      prop: "zzmmm",
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/politics_type',
    },
    {
      label: "家庭住址",
      prop: "jtzz",
      labelWidth: 130,
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "电子邮箱",
      prop: "dzyx",
      labelWidth: 130,
    },
    {
      label: "紧急联系人姓名",
      prop: "jjlxrxm",
      labelWidth: 130,
    },
    {
      label: "紧急联系人电话",
      prop: "jjlxrdh",
      labelWidth: 130,
    },
    {
      label: "组织机构",
      prop: "orgId",
      labelWidth: 130,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
    },
    {
      label: "身份证正面上传",
      prop: "sfzFrontImg",
      labelWidth: 130,
      type: 'upload',
      listType: 'picture-img',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload'
    },
    {
      label: "身份证反面上传",
      prop: "sfzBackImg",
      labelWidth: 130,
      type: 'upload',
      listType: 'picture-img',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload'
    },
  ]
}

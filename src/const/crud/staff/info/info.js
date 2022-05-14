export const infoOption = {
  submitText: '添加',
  detail: false,
  labelWidth: 130,
  addBtn: true,
  column: [{
      label: "教职工编号",
      prop: "gh",
      rules: [{
        required: true,
        message: "请输入教职工编号",
        trigger: "blur"
      }],
    },
    {
      label: "姓名",
      prop: "xm",
    },
    {
      label: "曾用名",
      prop: "cym",
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
      label: "年龄",
      prop: "jsnl",
      type: "number",
      minRows: 0,
      maxRows: 120,
    },
    {
      label: "出生日期",
      prop: "csrq",
      type: "date",
      valueFormat: "yyyy-MM-dd",
    },

    {
      label: "身份证号",
      prop: "sfzjh",
    },
    {
      label: "出生地",
      prop: "csd",
    },
    {
      label: "籍贯",
      prop: "jg",
    },
    {
      label: "民族",
      prop: "mzm",
    },
    {
      label: "政治面貌",
      prop: "zzmmm",
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
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "电子邮箱",
      prop: "dzyx",
    },
    {
      label: "紧急联系人姓名",
      prop: "jjlxrxm",
    },
    {
      label: "紧急联系人电话",
      prop: "jjlxrdh",
    },
    {
      label: "组织机构",
      prop: "orgId",
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
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
    {
      label: "身份证反面上传",
      prop: "sfzBackImg",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
  ]
}

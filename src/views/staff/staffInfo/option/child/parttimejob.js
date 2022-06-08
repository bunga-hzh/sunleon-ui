const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 140,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
      label: "教职工ID",
      prop: "staffId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "change"
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "change"
      }],
    },
    {
      label: "所属部门",
      prop: "deptId",
      search: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请选择 部门",
        trigger: "change"
      }],
    },
    // {
    //   label: "社会兼职起始日期",
    //   prop: 'shjzqsrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    // {
    //   label: "社会兼职终止日期",
    //   prop: 'shjzzzrq',
    //   type: 'date',
    //   valueFormat: 'yyyy-MM-dd',
    // },
    {
      label: "社会兼职起止时间",
      prop: "shjzqsrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '社会兼职起始日期',
      endPlaceholder: '社会兼职终止日期',
      slot: true,
      width: 160,
      rules: [{
        required: true,
        message: '请选择社会兼职起止时间'
      }]
    },
    {
      label: "任职组织",
      prop: 'rzzz',
      rules: [{
        required: true,
        message: '请输入 任职组织',
        trigger: "blur",
      }]
    },
    {
      label: "组织类型",
      prop: 'zzlx',
      type: 'select',
      props: {
        label: 'label',
        value: 'value'
      },
      dicFormatter: (data) => {
        return data.data.items;
      },
      dicUrl: `/admin/dict/type_with_dict_id/zzlx_type`,
      rules: [{
        required: true,
        message: '请输入 组织类型',
        trigger: "blur",
      }]
    },
    {
      label: "兼职职务",
      prop: 'jzzw',
      rules: [{
        required: true,
        message: '请输入 兼职职务',
        trigger: "blur",
      }]
    },
    {
      label: "是否取酬",
      prop: 'sfqc',
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      rules: [{
        required: true,
        message: '请选择 是否取酬',
        trigger: "change",
      }]
    },
  ]
}

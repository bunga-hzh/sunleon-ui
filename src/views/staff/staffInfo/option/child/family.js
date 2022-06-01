export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 130,
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
    {
      label: "称谓",
      prop: 'cw',
      rules: [{
        required: true,
        message: '请输入 称谓'
      }]
    },
    {
      label: "家庭成员姓名",
      prop: 'jtcyxm',
      rules: [{
        required: true,
        message: '请输入 家庭成员姓名'
      }]
    },
    {
      label: "出生日期",
      prop: 'csrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: '请输入 出生日期'
      }]
    },
    {
      label: "政治面貌",
      prop: 'zzmmm',
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/politics_type',
      rules: [{
        required: true,
        message: '请选择 政治面貌'
      }]
    },
    {
      label: "单位名称",
      prop: 'dwmc',
      rules: [{
        required: true,
        message: '请输入 单位名称'
      }]
    },
    {
      label: "职务",
      prop: 'jtcyzym',
      rules: [{
        required: true,
        message: '请输入 职务'
      }]
    },
    {
      label: "联系方式",
      prop: 'lxfs',
    },
  ]
}

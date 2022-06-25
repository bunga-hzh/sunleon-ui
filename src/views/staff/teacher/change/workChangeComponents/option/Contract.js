export const option = {
  align: 'center',
  border: true,
  searchSpan: 8,
  index: true,
  labelWidth: 180,
  menuWidth: 200,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      rules: [{
        required: true,
        message: '请输入 姓名',
        trigger: 'blur'
      }]
    },
    {
      label: "签约日",
      prop: "qyr",
      type: "date",
      valueFormat: "yyyy-MM-dd",
      search: true,
      rules: [{
        required: true,
        message: '请输入 签约日',
        trigger: 'blur'
      }],
      width: 120,
    },
    {
      label: "聘期（年）",
      prop: "pq",
      type: "number",
      search: true,
      rules: [{
        required: true,
        message: '请输入 聘期',
        trigger: 'blur'
      }],
      searchLabelWidth: 110,
      width: 100,
    },
    {
      label: "起始日-到期日",
      prop: "qsr",
      searchLabelWidth: 140,
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '起始日',
      endPlaceholder: '到期日',
      width: 180,
      rules: [{
        required: true,
        message: '请输入 起始日-到期日'
      }],
      slot: true,
    },
    {
      label: "试用期（月）",
      prop: "syq",
      type: 'number',
      search: true,
      rules: [{
        required: true,
        message: '请输入 试用期',
        trigger: 'blur'
      }],
      searchLabelWidth: 110,
      width: 100,
    },
    {
      label: "试用期(起止时间)",
      prop: "qssj",
      searchLabelWidth: 140,
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '起始时间',
      endPlaceholder: '终止时间',
      width: 180,
      slot: true,
    },
    {
      label: "内设部门",
      prop: "deptId",
      search: true,
      type: 'tree',
      cascader: ['nsgw'],
      dicUrl: '/admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      width: 120,
      rules: [{
        required: true,
        message: '请选择 内设部门',
        trigger: 'blur'
      }],
    },
    {
      label: "内设岗位",
      prop: "nsgw",
      type: 'select',
      search: true,
      rules: [{
        required: true,
        message: '请选择 内设岗位',
        trigger: 'blur'
      }],
      searchFilterable: true,
      filterable: true,
      filter: true,
      dicUrl: "/staff/zzjgcommon/postByDeptId/{{key}}",
      props: {
        label: "name",
        value: "id",
      },
      slot: true,
    },
    {
      label: "人员分类",
      prop: "ryfl",
      search: true,
      dicUrl: 'admin/dict/type/jzg_personnel_type',
      type: "select",
      props: {
        label: "label",
        value: "value"
      },
      width: 120,
      rules: [{
        required: true,
        message: '请选择 人员分类',
        trigger: 'blur'
      }]
    },
    {
      label: "专业技术职务、技能等级",
      prop: "zyjszwjndj",
      type: "select",
      dicUrl: 'admin/dict/type/jzg_skill_level',
      props: {
        label: "label",
        value: "value"
      },
      width: 160,
      search: true,
      searchLabelWidth: 180,
      rules: [{
        required: true,
        message: '请选择 专业技术职务、技能等级',
        trigger: 'blur'
      }]
    },
    {
      label: "岗位等级",
      prop: "gwdj",
      type: 'select',
      dicUrl: 'admin/dict/type/jzg_wpjs_post_level',
      props: {
        label: "label",
        value: "value"
      },
      search: true,
      rules: [{
        required: true,
        message: '请选择 岗位等级',
        trigger: 'blur'
      }]
    },
    {
      label: "薪级等级",
      prop: "xjdj",
      type: 'select',
      dicUrl: 'admin/dict/type/jzg_wpjs_salary_level',
      props: {
        label: "label",
        value: "value"
      },
      search: true,
      rules: [{
        required: true,
        message: '请选择 薪级等级',
        trigger: 'blur'
      }]
    },
    {
      label: "岗位工资",
      prop: "gwgz",
      type: "number",
      minRows: 0,
      rules: [{
        required: true,
        message: '请输入 岗位工资',
        trigger: 'blur'
      }]
    },
    {
      label: "薪级工资",
      prop: "xjgz",
      type: "number",
      minRows: 0,
      rules: [{
        required: true,
        message: '请输入 薪级工资',
        trigger: 'blur'
      }]
    },
    {
      label: "国家工资",
      prop: "gjgz",
      type: "number",
      minRows: 0,
      rules: [{
        required: true,
        message: '请输入 国家工资',
        trigger: 'blur'
      }]
    },
  ],
}

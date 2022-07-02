export const option = {
  align: 'center',
  border: true,
  searchSpan: 6,
  index: true,
  labelWidth: 150,
  searchLabelWidth: 100,
  menuWidth: 100,
  viewBtn: true,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入 姓名',
        trigger: 'blur'
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      rules: [{
        required: true,
        message: '请输入 工号',
        trigger: 'blur'
      }],
    },
    {
      label: "现属部门",
      prop: "deptId",
      search: true,
      addDisabled: true,
      editDisabled: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      // cascader: ['gwmc'],
      rules: [{
        required: true,
        message: '请输入 部门',
        trigger: 'blur'
      }],
    },
    {
      label: "现岗位名称",
      prop: "gwmc",
      type: 'select',
      search: true,
      rules: [{
        required: true,
        message: '请选择 原岗位',
        trigger: 'blur'
      }],
      dicUrl: "/staff/zzjgcommon/all/post",
      props: {
        label: "postName",
        value: "postId",
      },
      disabled: true,
    },
    {
      label: "转岗部门",
      prop: "oldDeptId",
      editDisabled: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      cascader: ['ygwmc'],
      rules: [{
        required: true,
        message: '请输入 部门',
        trigger: 'blur'
      }],
      headerslot: true,
    },
    {
      label: "新岗位名称",
      prop: "ygwmc",
      type: 'select',
      rules: [{
        required: true,
        message: '请选择 原岗位',
        trigger: 'blur'
      }],
      searchMultiple: true,
      searchFilterable: true,
      filterable: true,
      filter: true,
      dicUrl: "/staff/zzjgcommon/postByDeptId/{{key}}",
      props: {
        label: "name",
        value: "id",
      },
      slot: true,
      headerslot: true,
    },
    {
      label: "原薪资",
      prop: "yxz",
      type: 'number',
      minRows: 0,
      disabled: true,
    },
    {
      label: "现薪资",
      prop: "xxz",
      type: 'number',
      minRows: 0,
      // rules: [{
      //   required: true,
      //   message: '请输入 现薪资',
      //   trigger: 'blur'
      // }],
    },
    {
      label: "转岗时间",
      prop: "zgsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
      // search: true,
      rules: [{
        required: true,
        message: '请输入 转岗时间',
        trigger: 'blur'
      }],
      span: 24,
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
    },
    {
      label: "附件",
      prop: 'fj',
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
      hide: true,
    },
  ],
}

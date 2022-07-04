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
      label: "原部门",
      prop: "oldDeptId",
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
      rules: [{
        required: true,
        message: '请输入 部门',
        trigger: 'blur'
      }],
      labelslot: true,
    },
    {
      label: "原岗位",
      prop: "oldPostId",
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
      labelslot: true,
      slot: true,
    },
    {
      label: "转岗部门",
      prop: "newDeptId",
      editDisabled: true,
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      cascader: ['newPostId'],
      rules: [{
        required: true,
        message: '请输入 部门',
        trigger: 'blur'
      }],
    },
    {
      label: "转岗名称",
      prop: "newPostId",
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
    },
    {
      label: "原薪资",
      prop: "oldSalary",
      type: 'number',
      minRows: 0,
      disabled: true,
    },
    {
      label: "现薪资",
      prop: "newSalary",
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

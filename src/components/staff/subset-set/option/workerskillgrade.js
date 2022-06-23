export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 180,
  viewBtn: true,
  column: [{
      label: "职业技术等级名称",
      prop: 'zyjsdjmc',
      type: 'select',
      dicUrl: '/admin/dict/type/profession_type',
      rules: [{
        required: true,
        message: "请选择 职业技术等级名称",
        trigger: "blur"
      }],
    },
    {
      label: "职业技术职务名称",
      prop: 'zyjszwmc',
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_specialty_job_name',
      rules: [{
        required: true,
        message: "请选择 职业技术职务名称",
        trigger: "blur"
      }],
    },
    {
      label: "取得技术职务时间",
      prop: 'qdjszwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请输入 取得技术职务时间",
        trigger: "blur"
      }],
    },
    {
      label: "批准技术职务单位名称",
      prop: 'pzjszwdwmc',
      rules: [{
        required: true,
        message: "请输入 批准技术职务单位名称",
        trigger: "blur"
      }],
    },
    {
      label: "证书编号",
      prop: 'zsbh',
      rules: [{
        required: true,
        message: "请输入 证书编号",
        trigger: "blur"
      }],
    },
    {
      label: "工人工种",
      prop: 'grgzm',
      rules: [{
        required: true,
        message: "请输入 工人工种",
        trigger: "blur"
      }],
    },
    {
      label: "上传电子证件",
      prop: 'szdczj',
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
  ]
}

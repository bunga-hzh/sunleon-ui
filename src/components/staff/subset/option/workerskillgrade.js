export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "职业技术等级名称",
      prop: 'zyjsdjmc',
      type: 'select',
      dicUrl: '/admin/dict/type/profession_type',
    },
    {
      label: "职业技术职务名称",
      prop: 'zyjszwmc',
      type: 'select',
      dicUrl: '/admin/dict/type/jzg_specialty_job_name',
    },
    {
      label: "取得技术职务时间",
      prop: 'qdjszwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "批准技术职务单位名称",
      prop: 'pzjszwdwmc',
    },
    {
      label: "证书编号",
      prop: 'zsbh',
    },
    {
      label: "工人工种",
      prop: 'grgzm',
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

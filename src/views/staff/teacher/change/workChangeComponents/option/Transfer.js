export const option = {
  align: 'center',
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  index: true,
  labelWidth: 150,
  menuWidth: 200,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      formslot: true,
      editDisabled: true,
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
    },
    {
      label: "所属部门",
      prop: "orgId",
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
    },
    {
      label: "现属部门",
      prop: "xsbm",
      // type: 'tree',
      // dicUrl: 'admin/dept/tree',
      // props: {
      //   label: "name",
      //   value: "id",
      //   children: "children"
      // },
    },
    {
      label: "原岗位名称",
      prop: "ygwmc",
    },
    {
      label: "新岗位名称",
      prop: "xgwmc",
    },
    {
      label: "原薪资",
      prop: "yxz",
      type: 'number',
      minRows: 0,
      valueDefault: 0,
    },
    {
      label: "现薪资",
      prop: "xxz",
      type: 'number',
      minRows: 0,
      valueDefault: 0,
    },
    {
      label: "转岗时间",
      prop: "zgsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
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
    },
  ],
}

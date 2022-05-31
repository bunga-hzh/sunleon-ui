export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 260,
  searchSpan: 7,
  labelWidth: 120,
  viewBtn: true,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
    },
    {
      label: "部门",
      prop: "orgId",
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
    },
    {
      label: '人员分类',
      prop: 'rylb',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/rylb_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: '证明类型',
      prop: 'proveType',
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/prove_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: '生成时间',
      prop: 'createTime',
      addDisplay: false,
      editDisabled: true,
      width: 150,
    },
    {
      label: '事由',
      prop: 'sy',
      type: 'textarea',
      span: 24,
    }
  ]
}

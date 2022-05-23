export const option = {
  align: 'center',
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  index: true,
  labelWidth: 150,
  menuWidth: 160,
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
      label: "异动时间",
      prop: "ydsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
    },
  ],
}

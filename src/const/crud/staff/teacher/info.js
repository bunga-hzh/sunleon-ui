export const option = {
  align: 'center',
  addBtn: false,
  border: true,
  searchMenuSpan: 4,
  viewBtn: false,
  editBtn: false,
  index: true,
  searchSpan: 5,
  column: [{
      label: "工号",
      prop: "gh",
      search: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
    },
    {
      label: "性别",
      prop: "xbm",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/sex_type',
    },
    {
      label: "组织机构",
      prop: "orgId",
      search: true,
      type: 'tree',
      dicUrl: '/admin/dept/tree',
      props: {
        "label": "name",
        "value": "id",
        "children": "children"
      },
    },
    {
      label: "身份证号",
      prop: "sfzjh",
      minWidth: 100,
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "当前状态",
      prop: "dqztm",
      search: true,
      span: 6,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/dqztk_type',
    },
  ],
}

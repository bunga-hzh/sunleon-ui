export const option = {
  editBtn: false,
  addBtn: false,
  border: true,
  searchSpan: 7,
  searchMenuSpan: 4,
  menuWidth: 80,
  menu: false,
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
      width: 120,
    },
    {
      label: "编制类型",
      prop: "bzlx",
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/bz_type',
      props: {
        label: "label",
        value: "value",
      },
    },
    {
      label: "人员类型",
      prop: "rylx",
      search: true,
      searchSpan: 7,
      type: 'select',
      dicUrl: '/admin/dict/type/rylb_type',
      props: {
        label: "label",
        value: "value",
      },
    },
    {
      label: "教师类型",
      prop: "jslx",
      search: true,
      searchSpan: 6,
      type: 'select',
      dicUrl: '/admin/dict/type/teacher_type',
      props: {
        label: "label",
        value: "value",
      },
    },
    {
      label: "入职日期",
      prop: "rzrq",
    },
  ],
}

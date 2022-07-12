export const treeOption = {
  addBtn: false,
  props: {
    labelText: "角色列表",
    label: "label",
    value: "value",
  },
};

export const loadOption = {
  align: "center",
  border: true,
  editBtn: false,
  selection: true,
  column: [
    {
      type: "input",
      label: "教职工号",
      span: 24,
      display: true,
      prop: "gh",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "教职工号必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "教师姓名",
      span: 24,
      display: true,
      prop: "xm",
      rules: [
        {
          required: true,
          message: "教师姓名必须填写",
        },
      ],
      maxlength: 30,
      required: true,
    },
    {
      type: "input",
      label: "手机号",
      span: 24,
      display: true,
      prop: "lxdh",
      rules: [
        {
          required: true,
          message: "手机号必须填写",
        },
      ],
      maxlength: 11,
      required: true,
    },
  ],
};

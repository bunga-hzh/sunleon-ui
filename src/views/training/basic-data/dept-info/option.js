export const option = {
  align: "center",
  border: true,
  searchSpan: 6,
  searchMenuSpan: 4,
  column: [
    {
      type: "input",
      label: "部门",
      span: 24,
      display: true,
      prop: "deptId",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "部门必须填写",
        },
      ],
      search: true,
    },
  ],
};

export const option = {
  align: "center",
  border: true,
  menuWidth: 160,
  labelWidth: 100,
  column: [
    {
      type: "input",
      label: "工资项名称",
      span: 24,
      display: true,
      prop: "itemName",
      maxlength: 100,
      required: true,
      rules: [
        {
          required: true,
          message: "工资项名称必须填写",
        },
      ],
    },
    {
      type: "textarea",
      label: "描述",
      span: 24,
      display: true,
      prop: "itemDesc",
      maxlength: 200,
      value: "",
    },
  ],
};

export const option = {
  align: "center",
  border: true,
  dialogWidth: "40%",
  menuWidth: 140,
  index: true,
  column: [
    {
      type: "input",
      label: "等级",
      span: 24,
      display: true,
      prop: "salLevel",
      maxlength: 100,
      required: true,
      rules: [
        {
          required: true,
          message: "等级必须填写",
        },
      ],
    },
    {
      type: "number",
      label: "薪资标准",
      controls: true,
      span: 24,
      display: true,
      prop: "standard",
      minRows: 0,
      maxRows: 999999999999999,
      step: 0.01,
      controlsPosition: "right",
      required: true,
      rules: [
        {
          required: true,
          message: "薪资标准必须填写",
        },
      ],
    },
    {
      type: "number",
      label: "排序",
      controls: true,
      span: 24,
      display: true,
      prop: "sort",
      minRows: 0,
      maxRows: 999999999999999,
      step: 1,
      controlsPosition: "right",
      required: true,
      rules: [
        {
          required: true,
          message: "排序必须填写",
        },
      ],
    },
  ],
};

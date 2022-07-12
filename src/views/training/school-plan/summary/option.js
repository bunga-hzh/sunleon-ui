export const option = {
  labelWidth: 110,
  column: [
    {
      type: "textarea",
      label: "完成情况",
      span: 24,
      display: true,
      prop: "wcqk",
      maxlength: 200,
      showWordLimit: true,
      required: true,
      rules: [
        {
          required: true,
          message: "完成情况必须填写",
        },
      ],
    },
    {
      type: "textarea",
      label: "经验与亮点",
      span: 24,
      display: true,
      prop: "jyyld",
      rules: [
        {
          required: true,
          message: "经验与亮点必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      type: "textarea",
      label: "存在问题",
      span: 24,
      display: true,
      prop: "czwtynlfx",
      rules: [
        {
          required: true,
          message: "存在问题必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
  ],
};

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
      label: "主要收获",
      span: 24,
      display: true,
      prop: "zysh",
      rules: [
        {
          required: true,
          message: "主要收获必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      type: "textarea",
      label: "存在问题与努力方向",
      span: 24,
      display: true,
      prop: "czwtynlfx",
      rules: [
        {
          required: true,
          message: "存在问题与努力方向必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      type: "textarea",
      label: "学校评价",
      span: 24,
      display: true,
      prop: "xxpj",
      rules: [
        {
          required: true,
          message: "学校评价必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      type: "number",
      label: "本学年带教见习教师合格人数",
      controls: true,
      span: 24,
      display: true,
      prop: "bxndjjxjshgrs",
    },
    {
      prop: "elCard",
      formslot: true,
      span: 24,
    },
  ],
};

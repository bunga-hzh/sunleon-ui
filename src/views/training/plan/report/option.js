import { dateFormat } from "@/filters/index";

export const option = {
  column: [
    {
      type: "textarea",
      label: "研修目标",
      span: 24,
      display: true,
      prop: "yxmb",
      maxlength: 200,
      required: true,
      rules: [
        {
          required: true,
          message: "研修目标必须填写",
        },
      ],
      showWordLimit: true,
    },
    {
      type: "textarea",
      label: "研修任务",
      span: 24,
      display: true,
      prop: "yxrw",
      rules: [
        {
          required: true,
          message: "研修任务必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      type: "date",
      span: 24,
      display: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      value: dateFormat(new Date()),
      disabled: true,
      required: true,
      rules: [
        {
          required: true,
          message: "日期必须填写",
        },
      ],
    },
    {
      prop: "elCard",
      formslot: true,
      span: 24,
    },
  ],
};

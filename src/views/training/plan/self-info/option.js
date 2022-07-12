import { sex_type } from "@/const/commonDict";

export const option = {
  labelWidth: 120,
  column: [
    {
      type: "input",
      label: "姓名",
      span: 8,
      display: true,
      prop: "xm",
      maxlength: 30,
      readonly: true,
      required: true,
      rules: [
        {
          required: true,
          message: "姓名必须填写",
        },
      ],
    },
    {
      type: "radio",
      label: "性别",
      span: 8,
      display: true,
      prop: "xbm",
      rules: [
        {
          required: true,
          message: "请选择性别",
        },
      ],
      dicData: sex_type,
      props: {
        label: "label",
        value: "value",
      },
      border: true,
      required: true,
    },
    {
      type: "number",
      label: "年龄",
      controls: true,
      span: 8,
      display: true,
      prop: "nl",
      minRows: 0,
      maxRows: 150,
      step: 1,
      precision: 1,
      controlsPosition: "right",
      required: true,
      rules: [
        {
          required: true,
          message: "年龄必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "学历",
      span: 12,
      display: true,
      prop: "xl",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "学历必须填写",
        },
      ],
    },
    {
      type: "month",
      label: "从教起始年月",
      span: 12,
      display: true,
      format: "MM",
      valueFormat: "MM",
      prop: "cjqny",
      required: true,
      rules: [
        {
          required: true,
          message: "从教起始年月必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "任教学科",
      span: 8,
      display: true,
      prop: "rjxk",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "任教学科必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "任教年级",
      span: 8,
      display: true,
      prop: "rjnj",
      rules: [
        {
          required: true,
          message: "单行文本必须填写",
        },
      ],
      maxlength: 30,
      required: true,
    },
    {
      type: "input",
      label: "职 称",
      span: 8,
      display: true,
      prop: "zc",
      rules: [
        {
          required: true,
          message: "职 称必须填写",
        },
      ],
      maxlength: 30,
      required: true,
    },
    {
      type: "textarea",
      label: "优势分析",
      span: 24,
      display: true,
      prop: "ysfx",
      maxlength: 200,
      showWordLimit: true,
      required: true,
      rules: [
        {
          required: true,
          message: "优势分析必须填写",
        },
      ],
    },
    {
      type: "textarea",
      label: "不足分析",
      span: 24,
      display: true,
      prop: "bzfx",
      rules: [
        {
          required: true,
          message: "不足分析必须填写",
        },
      ],
      maxlength: 200,
      showWordLimit: true,
      required: true,
    },
    {
      prop: "elCard",
      formslot: true,
      span: 24,
    },
  ],
};

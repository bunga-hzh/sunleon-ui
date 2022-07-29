import { rule } from "@/util/validateRules"
import constants from "@/const/crud/salary/constants"

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
      label: "薪资标准",
      prop: "standard",
      type: "number",
      span: 24,
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "薪资标准必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
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
      min: 0,
      max: constants.MAX_VALUE,
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
}

import { rule } from "@/util/validateRules"
import constants from "@/const/crud/salary/constants"

export const option = {
  align: "center",
  border: true,
  dialogWidth: "40%",
  menuWidth: 140,
  inedx: true,
  labelWidth: 110,
  column: [
    {
      type: "input",
      label: "岗位等级",
      span: 24,
      display: true,
      prop: "salLevel",
      maxlength: 100,
      required: true,
      rules: [
        {
          required: true,
          message: "岗位等级必须填写",
        },
      ],
    },
    {
      type: "number",
      label: "4年以下",
      controls: true,
      span: 12,
      display: true,
      prop: "fourAndFollowing",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "4年以下必须填写",
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
      label: "5-9年",
      controls: true,
      span: 12,
      display: true,
      prop: "fiveToNine",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "5-9年必须填写",
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
      label: "10-14年",
      controls: true,
      span: 12,
      display: true,
      prop: "tenToFourteen",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "10-14年必须填写",
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
      label: "15-19年",
      controls: true,
      span: 12,
      display: true,
      prop: "fifteenToNineteen",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "15-19年必须填写",
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
      label: "20-24年",
      controls: true,
      span: 12,
      display: true,
      prop: "twentyToTwentyFour",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "20-24年必须填写",
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
      label: "25-29年",
      controls: true,
      span: 12,
      display: true,
      prop: "twentyFiveToTwentyNine",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "25-29年必须填写",
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
      label: "30-34年",
      controls: true,
      span: 12,
      display: true,
      prop: "thirtyToThirtyFour",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "30-34年必须填写",
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
      label: "35年及以上",
      controls: true,
      span: 12,
      display: true,
      prop: "thirtyFiveAndAbove",
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      rules: [
        {
          required: true,
          message: "35年及以上必须填写",
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

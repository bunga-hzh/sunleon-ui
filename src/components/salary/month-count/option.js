import { dateFormat } from "@/filters/index"
import { rule } from "@/util/validateRules"
import constants from "@/const/crud/salary/constants"

export const option = {
  align: 'center',
  border: true,
  index: true,
  viewBtn: true,
  columnBtn: false,
  searchSpan: 8,
  menuWidth: 400,
  column: [
    {
      label: '年份',
      prop: 'year',
      type: 'year',
      format: 'yyyy',
      valueFormat: 'yyyy',
      value: dateFormat(new Date()),
      disabled: true,
      search: true,
      rules: [
        {
          required: true,
          message: "年份必须填写",
        },
      ],
    },
    {
      label: '月份',
      prop: 'month',
      type: 'month',
      format: 'MM',
      valueFormat: 'MM',
      search: true,
      rules: [
        {
          required: true,
          message: "月份必须填写",
        },
      ],
    },
    {
      label: "表格名称",
      prop: 'tableName',
      maxlength: 100,
      search: true,
      rules: [
        {
          required: true,
          message: "表格名称必须填写",
        },
      ],
    },
    {
      label: '总金额',
      prop: 'moneySum',
      type: 'number',
      min: 0,
      max: constants.MAX_VALUE,
      step: 0.01,
      value: '0',
      rules: [
        {
          required: true,
          message: "总金额必须填写",
          trigger: 'blur'
        },
        {
          validator: rule.validMoney,
          trigger: 'blur'
        },
      ],
    },
    {
      label: '导入时间',
      prop: 'importTime',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
      disabled: true,
      addDisplay: false,
      editDisplay: false,
      span: 24,
    },
    {
      label: '备注',
      prop: 'bz',
      type: 'textarea',
      maxlength: 200,
      showWordLimit: true,
      span: 24,
      hide: true,
    },
  ]
}

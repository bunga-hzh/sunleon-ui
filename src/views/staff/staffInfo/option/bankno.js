export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 130,
  searchLabelWidth: 120,
  viewBtn: true,
  column: [{
      label: "教职工ID",
      prop: "staffId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "姓名",
      prop: "xm",
      search: true,
      slotForm: true,
      formslot: true,
      rules: [{
        required: true,
        message: "请选择 用户",
        trigger: "change"
      }],
    },
    {
      label: "工号",
      prop: "gh",
      search: true,
      addDisabled: true,
      editDisabled: true,
      width: 120,
      rules: [{
        required: true,
        message: "请输入 工号",
        trigger: "change"
      }],
    },
    {
      label: "中国建设银行卡号",
      prop: "zgjsyhkh",
      span: 24,
    },
    {
      label: "中国工商银行卡号",
      prop: "zggsyhkh",
      span: 24,
    },
    {
      label: "中国银行卡号",
      prop: "zgyhkh",
      span: 24,
    },
    {
      label: "公积金账号",
      prop: "gjjzh",
      span: 24,
    },
    {
      label: "补充公积金账号",
      prop: "bcgjjzh",
      span: 24,
    },
  ]
}

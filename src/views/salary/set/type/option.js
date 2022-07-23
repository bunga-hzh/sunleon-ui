let validataNumber = (rule, value, callback) => {
  if (!/^[1-9]$|^[12]\d$|^3[01]$/.test(value)) {
    callback(new Error("请输入1-31之间"));
  } else {
    callback();
  }
};

export const option = {
  align: "center",
  border: true,
  searchMenuSpan: 4,
  searchSpan: 7,
  menuWidth: 160,
  addBtn: false,
  delBtn: false,
  column: [
    {
      type: "select",
      label: "薪酬类型",
      dicUrl: "/admin/dict/type/sal_send_type",
      span: 12,
      // display: true,
      props: {
        label: "label",
        value: "value",
      },
      prop: "salType",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择薪酬类型",
        },
      ],
      disabled: true,
    },
    {
      type: "input",
      label: "发放日期",
      span: 12,
      display: true,
      prop: "sendTime",
      prepend: "每月",
      append: "号发放",
      controls: true,
      required: true,
      slot: true,
      rules: [
        {
          required: true,
          message: "请输入发放时间",
        },
        {
          validator: validataNumber,
          trigger: "blur",
        },
      ],
    },
    {
      type: "textarea",
      label: "描述",
      span: 24,
      display: true,
      prop: "detail",
      maxlength: 200,
      showWordLimit: true,
    },
  ],
};

export const option = {
  align: "center",
  border: true,
  selection: true,
  dialogWidth: "30%",
  column: [
    {
      type: "date",
      label: "活动时间",
      span: 24,
      display: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      prop: "hdsj",
      required: true,
      rules: [
        {
          required: true,
          message: "活动时间必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "活动地点",
      span: 24,
      display: true,
      prop: "hdddd",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "活动地点必须填写",
        },
      ],
    },
    {
      type: "select",
      label: "课程类型",
      dicData: [
        {
          label: "选项一",
          value: 0,
        },
        {
          label: "选项二",
          value: 1,
        },
        {
          label: "选项三",
          value: 2,
        },
      ],
      cascaderItem: [],
      span: 24,
      display: true,
      props: {
        label: "label",
        value: "value",
      },
      prop: "kclx",
      rules: [
        {
          required: true,
          message: "请选择课程类型",
        },
      ],
      required: true,
    },
    {
      type: "select",
      label: "活动类别",
      dicData: [
        {
          label: "选项一",
          value: 0,
        },
        {
          label: "选项二",
          value: 1,
        },
        {
          label: "选项三",
          value: 2,
        },
      ],
      cascaderItem: [],
      span: 24,
      display: true,
      props: {
        label: "label",
        value: "value",
      },
      prop: "hddlb",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择活动类别",
        },
      ],
    },
    {
      type: "textarea",
      label: "活动内容",
      span: 24,
      display: true,
      prop: "hdnr",
      maxlength: 500,
      showWordLimit: true,
      required: true,
      rules: [
        {
          required: true,
          message: "活动内容必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "主持人",
      span: 24,
      display: true,
      prop: "zcr",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "主持人必须填写",
        },
      ],
    },
  ],
};

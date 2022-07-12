export const option = {
  align: "center",
  border: true,
  selection: true,
  dialogWidth: "40%",
  labelWidth: 190,
  column: [
    {
      type: "select",
      label: "选择用户",
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
      prop: "userId",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择选择用户",
        },
      ],
    },
    {
      type: "number",
      label: "出勤次数",
      controls: true,
      span: 24,
      display: true,
      prop: "cqcs",
      minRows: 0,
      maxRows: 9999,
      step: 1,
      precision: 1,
      controlsPosition: "right",
      required: true,
      rules: [
        {
          required: true,
          message: "出勤次数必须填写",
        },
      ],
    },
    {
      type: "number",
      label: "师德修养小结或案例次数",
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
      dicOption: "static",
      props: {
        label: "label",
        value: "value",
      },
      prop: "sdxyxjhalcs",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "师德修养小结或案例次数必须填写",
        },
      ],
      minRows: 0,
      maxRows: 9999,
      step: 1,
      precision: 1,
      controls: true,
      controlsPosition: "right",
    },
    {
      type: "select",
      label: "考核成绩",
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
      prop: "khcj",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择考核成绩",
        },
      ],
    },
    {
      type: "number",
      label: "核定学分",
      controls: true,
      span: 24,
      display: true,
      prop: "hdxf",
      minRows: 0,
      maxRows: 9999,
      step: 1,
      precision: 1,
      rules: [
        {
          required: true,
          message: "核定学分必须填写",
        },
      ],
      controlsPosition: "right",
      required: true,
    },
    {
      type: "textarea",
      label: "备注",
      span: 24,
      display: true,
      prop: "bz",
      maxlength: 500,
      showWordLimit: true,
    },
  ],
};

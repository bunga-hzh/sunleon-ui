export const option = {
  align: "center",
  border: true,
  dialogWidth: "80%",
  selection: true,
  columnBtn: false,
  viewBtn: true,
  searchSpan: 8,
  labelWidth: 160,
  column: [
    {
      label: "学年",
      prop: "xn",
      type: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      search: true,
    },
    {
      type: "select",
      label: "部门",
      span: 8,
      display: true,
      prop: "deptId",
      cascaderItem: [],
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
      dicUrl: "/admin/dept/tree",
      dicMethod: "get",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择系处",
        },
      ],
      dicFlag: true,
      disabled: true,
    },
    {
      type: "input",
      label: "姓名",
      span: 8,
      display: true,
      prop: "xm",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "姓名必须填写",
        },
      ],
      disabled: true,
      search: true,
    },
    {
      type: "input",
      label: "师训账号",
      span: 8,
      display: true,
      prop: "sxzh",
      rules: [
        {
          required: true,
          message: "师训账号必须填写",
        },
      ],
      maxlength: 30,
      required: true,
      disabled: true,
    },
    {
      type: "date",
      label: "日期",
      span: 8,
      display: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      prop: "sj",
      required: true,
      rules: [
        {
          required: true,
          message: "日期必须填写",
        },
      ],
      hide: true,
    },
    {
      type: "input",
      label: "内容",
      span: 8,
      display: true,
      prop: "nr",
      maxlength: 30,
      rules: [
        {
          required: true,
          message: "内容必须填写",
        },
      ],
      required: true,
    },
    {
      type: "input",
      label: "学时",
      span: 8,
      display: true,
      prop: "xs",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "学时必须填写",
        },
      ],
      hide: true,
    },
    {
      type: "textarea",
      label: "师德修养小结或案例",
      span: 24,
      display: true,
      prop: "sdxyxjhal",
      maxlength: 10000,
      readonly: false,
      required: true,
      rules: [
        {
          required: true,
          message: "师德修养小结或案例必须填写",
        },
      ],
      hide: true,
    },
    {
      label: "状态",
      prop: "status",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      type: "select",
      search: true,
    },
    {
      component: "elAlert",
      params: {
        title: "说明:",
        type: "warning",
        description:
          "每5个学时（半天）折合一次学习活动，每参与6次活动认定1学分；",
        closable: false,
        showIcon: true,
      },
      span: 24,
      hide: true,
    },
    {
      prop: "steps",
      span: 24,
      hide: true,
      formslot: true,
      addDisplay: false,
    },
  ],
};

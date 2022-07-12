export const option = {
  column: [
    {
      type: "input",
      label: "姓名",
      span: 6,
      display: true,
      prop: "xm",
      maxlength: 30,
      rules: [
        {
          required: true,
          message: "姓名必须填写",
        },
      ],
      required: true,
      disabled: true,
    },
    {
      type: "tree",
      label: "部门",
      span: 6,
      display: true,
      prop: "deptId",
      rules: [
        {
          required: true,
          message: "请选择部门",
        },
      ],
      parent: true,
      props: {
        label: "name",
        value: "id",
      },
      dicUrl: "/admin/dept/tree",
      disabled: true,
      required: true,
    },
    {
      type: "input",
      label: "职务",
      span: 6,
      display: true,
      prop: "zw",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "职务必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "学历/学位",
      span: 6,
      display: true,
      prop: "xlxw",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "学历/学位必须填写",
        },
      ],
    },
    {
      type: "date",
      label: "出生年月",
      span: 12,
      display: true,
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      prop: "csny",
      disabled: false,
      required: true,
      rules: [
        {
          required: true,
          message: "出生年月必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "培训项目",
      span: 12,
      display: true,
      prop: "pxxm",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "培训项目必须填写",
        },
      ],
    },
    {
      type: "input",
      label: "培训机构",
      span: 12,
      display: true,
      prop: "pxjg",
      rules: [
        {
          required: true,
          message: "培训机构必须填写",
        },
      ],
      maxlength: 30,
      required: true,
    },
    {
      type: "date",
      label: "培训时间",
      span: 12,
      display: true,
      prop: "pxsj",
      rules: [
        {
          required: true,
          message: "培训时间必须填写",
        },
      ],
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      required: true,
    },
    {
      type: "textarea",
      label: "培训小结",
      span: 24,
      display: true,
      prop: "pxxj",
      maxlength: 1000,
      required: true,
      showWordLimit: true,
      rules: [
        {
          required: true,
          message: "培训小结必须填写",
        },
      ],
    },
  ],
};

export const option = {
  align: "center",
  border: true,
  dialogWidth: "80%",
  labelWidth: 120,
  selection: true,
  columnBtn: false,
  viewBtn: true,
  editBtn: false,
  searchSpan: 8,
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
      type: "daterange",
      label: "自主学习时间",
      span: 24,
      display: true,
      prop: "zzxxqssj",
      format: "yyyy-MM-dd",
      valueFormat: "yyyy-MM-dd",
      startPlaceholder: "自主学习时间开始日期",
      endPlaceholder: "自主学习时间结束日期",
      required: true,
      rules: [
        {
          required: true,
          message: "学年必须填写",
        },
      ],
      hide: true,
    },
    {
      type: "tree",
      label: "部门",
      span: 8,
      display: true,
      prop: "deptId",
      parent: true,
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
      dicUrl: "admin/dept/tree",
      dicMethod: "get",
      required: true,
      rules: [
        {
          required: true,
          message: "请选择部门",
        },
      ],
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
      readonly: true,
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
      type: "input",
      label: "书目名称",
      span: 8,
      display: true,
      prop: "smmc",
      rules: [
        {
          required: true,
          message: "书目名称必须填写",
        },
      ],
      maxlength: 30,
      required: true,
    },
    {
      type: "input",
      label: "作者",
      span: 8,
      display: true,
      prop: "zz",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "作者必须填写",
        },
      ],
      hide: true,
    },
    {
      type: "input",
      label: "出版社",
      span: 8,
      display: true,
      prop: "cbs",
      rules: [
        {
          required: true,
          message: "出版社必须填写",
        },
      ],
      maxlength: 30,
      required: true,
      hide: true,
    },
    {
      type: "textarea",
      label: "读书心得体会",
      span: 24,
      display: true,
      prop: "dsxdth",
      maxlength: 10000,
      showWordLimit: true,
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
      prop: "steps",
      span: 24,
      hide: true,
      formslot: true,
      addDisplay: false,
    },
  ],
};

export const option = {
  align: "center",
  searchMenuSpan: 4,
  border: true,
  // searchSpan: 7,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  column: [
    {
      label: "标题",
      prop: "title",
      // search: true,
      width: 500,
      span: 24,
      rules: [
        {
          required: true,
          message: "请填写标题",
          trigger: "blur",
        },
      ],
      maxlength: 30,
      showWordLimit: true,
    },
    {
      label: "消息类型",
      prop: "msgType",
      // search: true,
      type: "radio",
      props: {
        label: "label",
        value: "value",
      },
      dicData: [
        {
          label: "通知公告",
          value: "1",
        },
        {
          label: "待办事项",
          value: "2",
        },
      ],
      value: "1",
      span: 24,
      rules: [
        {
          required: true,
          message: "请填写消息类型",
          trigger: "blur",
        },
      ],
    },
    {
      label: "发布时间",
      prop: "createTime",
      width: 150,
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: "是否已读",
      prop: "status",
      slot: true,
    },
  ],
};

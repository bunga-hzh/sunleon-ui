export const option = {
  align: "center",
  searchMenuSpan: 4,
  border: true,
  menuWidth: 320,
  searchSpan: 7,
  viewBtn: true,
  column: [{
      label: "标题",
      prop: "title",
      search: true,
      width: 300,
      span: 24,
      rules: [{
        required: true,
        message: '请填写标题',
        trigger: 'blur'
      }]
    },
    {
      label: "消息类型",
      prop: "msgType",
      search: true,
      type: 'radio',
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/notice_type',
      value: '1',
      span: 24,
    },
    {
      label: "发布人",
      prop: "createUserName",
      addDisplay: false,
      editDisplay: false,
      span: 24,
    },
    {
      label: "发布人ID",
      prop: "createUserId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
    {
      label: "优先级",
      prop: "priority",
      type: 'radio',
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/priority_type',
      value: '1',
      span: 24,
      search: true,
    },
    {
      label: "通告对象",
      prop: "noticeObj",
      type: 'radio',
      formslot: true,
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/notice_obj',
      value: '1',
      span: 24,
      search: true,
    },
    {
      label: "发布状态",
      prop: "status",
      addDisplay: false,
      editDisplay: false,
      type: 'select',
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: '/admin/dict/type/release_status',
      search: true,
      value: '0',
      span: 24,
    },
    {
      label: "发布时间",
      prop: "createTime",
      width: 150,
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: "内容",
      prop: "content",
      hide: true,
      component: 'avueUeditor',
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      },
      span: 24,
    },
    {
      label: "资源ID",
      prop: "resId",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      hide: true,
    },
  ],
}

export const applyOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  viewBtn: true,
  addTitle: '新增招聘岗位',
  editTitle: '修改招聘岗位',
  viewTitle:'竞聘岗位详情',
  align: 'center',
  menuWidth: 280,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  gutter: 60,
  addBtn: false,
  filterParams:['yearTime'],
  column: [
    {
      label: '日期',
      prop: 'yearTime',
      search: true,
      viewDisplay:false,
      searchTitle: '日期',
      searchValue: new Date().getFullYear()+"",
      type: 'year',
      format: 'yyyy年',
      valueFormat: 'yyyy',
      editDisplay: false,
      addDisplay: false,
      editDisabled: true,
      showColumn: false,
      span: 24,
      hide:true
    },
    {
      label: '岗位类型',
      prop: 'gwlxId',
      type: 'select',
      search: true,
      span: 24,
      cascader: ['gwlbId'],
      dicUrl: "/admin/dict/type/POST_TYPE",
      rules: [{
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }]
    },
    {
      label: '所属岗位',
      prop:'postName',
    },
    {
      label: '所属岗位',
      prop:'gwlbId',
      search: true,
      type: "select",
      hide:true,
      rules: [{
        required: true,
        message: '请选择岗位类别'
      }],
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}",
      span: 24
    },
    {
      label: '工作部门',
      prop:'department',
      span: 24,
    },
    {
      label: '竞聘状态',
      prop:'isRelease',
      search: true,
      type:'select',
      span: 24,
      dicData:[
        {
          label:'竞聘未开始',
          value:2
        },
        {
          label:'竞聘进行中',
          value:3
        },
        {
          label:'竞聘已结束',
          value:4
        }
      ]
    },
    {
      label: '岗位绩点',
      prop:'gwjd',
      type:'number',
      hide:true,
      span: 24,
      rules: [{
        required: true,
        message: '请输入岗位绩点'
      }]
    },
    {
      label: '竞聘开始时间',
      prop:'startTime',
      type:'datetime',
      format: 'yyyy年MM月dd日',
      valueFormat: 'yyyy-MM-dd',
      span: 24,
    },
    {
      label: '竞聘结束时间',
      prop:'endTime',
      type:'datetime',
      format: 'yyyy年MM月dd日',
      valueFormat: 'yyyy-MM-dd',
      span: 24,
    },
    {
      label: '工作任务及职责',
      prop: 'gzrwzc',
      hide: true,
      type: 'ueditor',
      editDisabled: true,
      addDisabled: true,
      component: 'avueUeditor',
      span: 24,
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      }
    },
    {
      label: '工作要求及标准',
      prop:'gzrwyq',
      showColumn:false,
      hide:true,
      type: 'ueditor',
      component: 'avueUeditor',
      editDisabled: true,
      addDisabled: true,
      span: 24,
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      }
    },
    {
      label: '任职条件',
      prop:'rztj',
      showColumn:false,
      hide:true,
      type: 'ueditor',
      component: 'avueUeditor',
      editDisabled: true,
      addDisabled: true,
      span: 24,
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      }
    },
  ]
}

export const applyFormOption = {
    submitText: '确认申请',
    emptyText: '取消',
    span: 24,
    column: [
      {
        label: "姓名",
        prop: "name",
        disabled:true,
        span:12,
        rules: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }],
      },
      {
        label: "所属部门",
        prop: "ysgw",
        disabled:true,
        span:12,
        rules: [{
          required: true,
          message: "请选择部门",
          trigger: "blur"
        }],
      },
      {
        label: "第一志愿",
        prop: "gwdyId",
        type: 'select',
        remote: true,
        span:24,
        props:{
          label:'postName',
          value:'id'
        },
        dicUrl:`/act/jpGwgl/deliverList?postName={{key}}`,
        typeformat(item, label, value) {
          return `所属部门：${item.departmentName} ---- 岗位：${item[label]}`
        },
        rules: [
          {
            required: true,
            message: '请选择第一志愿',
            trigger: 'blur'
          }
        ]
      },
      {
        label: "第二志愿",
        prop: "gwdrId",
        type: 'select',
        remote: true,
        span:24,
        props:{
          label:'postName',
          value:'id'
        },
        dicUrl:`/act/jpGwgl/deliverList?postName={{key}}`,
        typeformat(item, label, value) {
          return `所属部门：${item.departmentName} ---- 岗位：${item[label]}`
        },
        // rules: [
        //   {
        //     required: true,
        //     message: '请选择第二志愿',
        //     trigger: 'blur'
        //   }
        // ]
      },
      {
        label: "第三志愿",
        prop: "gwdsId",
        type: 'select',
        remote: true,
        span:24,
        props:{
          label:'postName',
          value:'id'
        },
        dicUrl:`/act/jpGwgl/deliverList?postName={{key}}`,
        typeformat(item, label, value) {
          return `所属部门：${item.departmentName} ---- 岗位：${item[label]}`
        },
        // rules: [
        //   {
        //     required: true,
        //     message: '请选择第三志愿',
        //     trigger: 'blur'
        //   }
        // ]
      },
      {
        label: "本人应聘意向简要陈述",
        prop: "yxcs",
        type:'textarea',
        maxlength:500,
        showWordLimit:true,
        span:24,
        // type: 'te',
        // component: 'avueUeditor',
        // span: 24,
        // options: {
        //   action: "/admin/sys-file/upload",
        //   props: {
        //     res: "data",
        //     url: "url"
        //   },
        // },
        rules: [{
          required: true,
          message: "请输入",
          trigger: "blur"
        }],
      },
    ]
}

export const competePostOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  addTitle: '竞聘岗位维护',
  editTitle: '竞聘岗位维护',
  align: 'center',
  menuWidth: 280,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  gutter: 60,
  addBtn: true,
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
      hide:true,
      span: 24
    },
    {
      label: '工作部门',
      prop:'gzbmId',
      span: 24,
      rules: [{
        required: true,
        message: '请选择部门'
      }],
      props: {
        label: 'name',
        value: 'id'
      },
      filter:true,
      type: 'tree',
      dicUrl: '/act/jpGwgl/tree'
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
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '所属岗位',
      prop:'gwlbId',
      search: true,
      type: "select",
      hide:true,
      rules: [{
        required: true,
        message: '请选择岗位'
      }],
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}",
      span: 24
    },
    {
      label: '状态',
      prop:'isRelease',
      editDisplay: false,
      addDisplay: false,
      type:'select',
      span: 24,
      dicData:[
        {
          label:'未发布',
          value:'0'
        },
        {
          label:'已发布',
          value:'1'
        }
      ]
    },
    {
      label: '岗位绩点',
      prop:'gwjd',
      type:'number',
      hide:true,
      span: 24,
      minRows:0,
      maxRows:100,
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
      valueFormat: 'yyyy-MM-dd 00:00:00',
      span: 24,
      rules: [{
        required: true,
        message: '请选择开始时间'
      }]
    },
    {
      label: '竞聘结束时间',
      prop:'endTime',
      type:'datetime',
      format: 'yyyy年MM月dd日',
      valueFormat: 'yyyy-MM-dd 00:00:00',
      span: 24,
      rules: [{
        required: true,
        message: '请选择结束时间'
      }]
    },
    {
      label: '创建时间',
      prop:'createTime',
      editDisplay: false,
      addDisplay: false,
      span: 24
    },
    {
      label: '任职条件',
      prop:'rztj',
      showColumn:false,
      hide:true,
      type: 'ueditor',
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
      label: '更新时间',
      prop:'updateTime',
      editDisplay: false,
      addDisplay: false,
      span: 24
    }
  ]
}

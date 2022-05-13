import {getDetails} from '@/api/admin/user'


var validateUsername = (rule, value, callback) => {
  if(value>0){
    callback()
  }else{
    callback(new Error('招聘人数必须大于0'))
  }
}
export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  searchMenuSpan: 6,
  editBtn: true,
  delBtn: true,
  viewBtn:true,
  addTitle:'新增招聘岗位',
  editTitle:'修改招聘岗位',
  align: 'center',
  menuWidth:280,
  menuHeaderAlign:'center',
  labelWidth:120,
  gutter:60,
  addBtn: true,
  filterParams: ['yearTime'],
  column: [{
    fixed: true,
    label: 'id',
    prop: 'id',
    span: 24,
    viewDisplay:false,
    hide: true,
    editDisplay: false,
    addDisplay: false,
    showColumn: false
  }, {
    label: '岗位编号',
    prop: 'postCode',
    editDisabled: true,
    rules: [{
      required: true,
      message: '请输入岗位编号'
    },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      }
    ]
  },
    {
      // width: 180,
      label: '日期',
      prop: 'createTime',
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
      label: '岗位类型',
      prop: 'gwlxId',
      type: 'select',
      search: true,
      cascader: ['postNameId'],
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
      prop: 'postNameId',
      search: true,
      type: 'select',
      rules: [{
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }],
      hide:true,
      // filters:true,
      searchFilterable:true,
      filterable:true,
      filter:true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}"
    }, {
      label: '招聘负责人',
      prop: 'userName',
      editDisplay: false,
      addDisplay: false,
      viewDisplay:false,
    },
    {
      label: '状态',
      prop: 'isRelease',
      viewDisplay:false,
      type: 'select',
      editDisplay: false,
      addDisplay: false,
      dicData: [{
        label: '未发布',
        value: '0'
      }, {
        label: '已发布',
        value: '1'
      }]
    },
    {
      label: '招聘人数',
      prop: 'recruitNumber',
      type: 'number',
      rules: [{
        required: true,
        message: '请输入招聘人数'
      },
        // {
        //   min: 3,
        //   max: 20,
        //   message: '长度在 3 到 20 个字符',
        //   trigger: 'blur'
        // },
        {validator: validateUsername, trigger: 'blur'}
      ]
    },
    {
      label: '招聘起止时间',
      prop: 'startTime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "daterange",
      slot:true,
      startPlaceholder: '招聘开始日期',
      endPlaceholder: '招聘结束日期',
      rules: [{
        required: true,
        message: '请选择招聘起止时间'
      }]
    },
    // {
    //   label: '结束日期',
    //   prop: 'endTime',
    //   format: 'yyyy-MM-dd',
    //   valueFormat: 'yyyy-MM-dd HH:mm:ss',
    //   type: "date",
    //   // slot:true,
    //   startPlaceholder: '开始日期',
    //   endPlaceholder: '结束日期',
    //   rules: [{
    //     required: true,
    //     message: '请选择截止时间'
    //   }]
    // },
    {
      label: '招聘要求',
      prop: 'recruitRequire',
      hide: true,
      type: 'ueditor',
      component: 'avueUeditor',
      span: 24,
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      },
      rules: [{
        required: true,
        message: '请输入招聘要求'
      }]
    },
    {
      label: '岗位要求',
      prop:'postRequire',
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
      label: '岗位职责',
      prop:'postDuty',
      showColumn:false,
      hide:true,
      type: 'ueditor',
      component: 'avueUeditor',
      span: 24,
      editDisabled: true,
      addDisabled: true,
      options: {
        action: "/admin/sys-file/upload",
        props: {
          res: "data",
          url: "url"
        },
      }
    },
    {
      width: 200,
      label: '更新时间',
      // searchSpan:8,
      prop: 'updateTime',
      search: false,
      // searchTitle:'日期',
      // searchValue:'',
      type: 'datetime',
      searchRange: true,
      viewDisplay:false,
      format: 'yyyy-MM-dd HH:mm',
      valueFormat: 'yyyy-MM-dd HH:mm',
      editDisplay: false,
      addDisplay: false,
      span: 24
    }]
}

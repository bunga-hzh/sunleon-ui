export const reserveOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  align: 'center',
  menuWidth: 320,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  reserveSelection: true,
  gutter: 60,
  addBtn: false,
  column: [
    {
      fixed: true,
      label: 'reserveId',
      prop: 'reserveId',
      span: 24,
      viewDisplay:false,
      hide: true,
      editDisplay: false,
      addDisplay: false,
      showColumn: false
    },
    {
      // width: 180,
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
      label: '应聘者姓名',
      prop: 'candidateName',
      search: true,
      searchLabelWidth:90,
    },
    {
      label: '岗位类型',
      prop: 'gwlxId',
      type: 'select',
      search: true,
      cascader: ['postNameIds'],
      dicUrl: "/admin/dict/type/post_type",
      rules: [{
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }]
    },
    {
      label: '应聘岗位',
      prop:'postNameIds',
      type: 'select',
      multiple:true,
      search: true,
      showColumn: false,
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}"
    },
    {
      label: '应聘岗位',
      prop:'postName',
    },
    {
      label: '预约时间',
      prop: 'interviewTime',
      search: true,
      type:'datetime',
      searchSpan:8,
      searchType: "daterange",
      searchFormat:'yyyy年MM月dd日',
      searchValueFormat:'yyyy-MM-dd',
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
      format:'yyyy年MM月dd日 HH时mm分',
      valueFormat:'yyyy-MM-dd HH:mm',
    },
    {
      label: '预约状态',
      prop: 'resumeStatusName',
      slot:true
    },
    {
      label: '预约地点',
      prop: 'wzdz'
    }
  ]
}

export const formOption = {
  option: {
    submitText: '确定',
    emptyText:'取消',
    span:24,
    column: [
      {
        label: "应聘者",
        prop: "name",
        disabled:true,
        rules: [{
          required: true,
          message: "请输入姓名",
          trigger: "blur"
        }],
      },
      {
        label: "反馈",
        prop: "feedback",
        type: 'radio',
        dicData:[{
          label:'成功',
          value:'2'
        },{
          label:'失败',
          value:'3'
        }],
        rules: [{
          required: true,
          message: "请输入选择预约状态",
          trigger: "blur"
        }],
      },
      {
        label: "面试时间",
        prop: "interviewTime",
        type: "datetime",
        format:'yyyy年MM月dd日 HH时mm分',
        valueFormat:'yyyy-MM-dd HH:mm:ss',
        rules: [{
          required: true,
          message: "请选择面试时间",
          trigger: "blur"
        }],
      },
      {
        label: "面试地点",
        prop: "address",
        disabled:true,
        // row:true,
        span:12,
        // rules: [{
        //   required: true,
        //   message: "请输入面试地点",
        //   trigger: "blur"
        // }],
      },
      {
        label: "",
        labelWidth:0,
        prop: "detailAddress",
        // row:true,
        span:12,
        rules: [{
          required: true,
          message: "请输入详细地址",
          trigger: "blur"
        }],
      },
      {
        label: "备注",
        prop: "remark",
        type:'textarea',
        maxlength:200,
        showWordLimit:true
      },
      {
        label: "自定义消息",
        prop: "zdyxx",
        type:'textarea',
        maxlength:500,
        showWordLimit:true
      },
    ]
}
}

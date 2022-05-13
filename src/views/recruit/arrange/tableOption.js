export const arrangeOption = {
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
      label: 'id',
      prop: 'id',
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
      label: '应聘岗位',
      prop:'postName',
    },
    {
      label: '面试状态',
      prop: 'resumeStatusName'
    },
    {
      label: '面试时间',
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
      label: '面试地点',
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
        label: '竞聘者列表',
        prop: 'list',
        detail:true,
        type: 'dynamic',
        span: 24,
        children: {
          align: 'center',
          headerAlign: 'center',
          addBtn: false,
          detail:true,
          delBtn:false,
          selection: false,
          column: [
            {
              label: "应聘者",
              prop: "name",
              disabled:true
            },
            {
              label: "面试时间",
              prop: "interviewTime",
              type: "datetime",
              format:'yyyy年MM月dd日 HH时mm分',
              valueFormat:'yyyy-MM-dd HH:mm',
              disabled:true
            },
            {
              label: "面试地点",
              prop: "wzdz",
              disabled:true,
            },
          ],
        }
      },

      {
        label: '面试官',
        prop:"MSG",
        multiple:true,
        remote: true,
        span:24,
        type:'tree',
        props:{
          label:'username',
          value:'userId'
        },
        dicMethod:'get',
        dicUrl:`/act/resume/select/user?username={{key}}`,
        rules: [
          {
            required: true,
            message: '请选择面试官',
            trigger: 'blur'
          }
        ]
      },
      {
        label: "备注",
        prop: "remark",
        type:'textarea',
        maxlength:200,
        showWordLimit:true
      },
    ]
}
}

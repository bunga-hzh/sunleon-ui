export const nameListOption = {
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
  addTitle: '新增招聘岗位',
  editTitle: '修改招聘岗位',
  align: 'center',
  menuWidth: 300,
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
      label:'竞聘者姓名',
      prop:'candidateName',
      searchLabelWidth:90,
      search: true,
      span: 24,
    },
    {
      label: '状态',
      prop:'state',
      span: 24,
      type:'select',
      search: true,
      dicData:[
        {
          label:'待评分',
          value:'1'
        },
        {
          label:'待名单确认',
          value:'2'
        },
        {
          label:'竞聘结束',
          value:'3'
        },
        {
          label:'待交接',
          value:'4'
        },
        {
          label:'已转入聘期',
          value:'5'
        },
        {
          label:'交接中',
          value:'6'
        },
        {
          label:'交接完成，待转入',
          value:'7'
        },
        {
          label:'资料已提交，待审核',
          value:'8'
        }
      ]
    },
    {
      label: '原岗位',
      prop:'postName',
      span: 24,
    },
    {
      label: '新聘岗位',
      prop:'postChangeName',
      span: 24,
    },
    {
      label: '答辩分数',
      prop:'fraction',
      slot:true,
      span: 24,
    },
    {
      label: '申请时间',
      prop:'createTime',
      span: 24,
    },
  ]
}

export const nameFormOption = {
  submitText: '确定',
  emptyText: '取消',
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      span:24,
      label: "岗位是否有变动",
      prop: "exactly",
      labelWidth: 180,
      type: "radio",
      rules: [{
        required: true,
        message: "请选择",
        trigger: "blur"
      }],
      dicData: [
        {
          label: '是',
          value: 0
        },
        {
          label: '否',
          value: 1
        },
      ]
    },
  ]
};

//多选列表
export const nameListFormOption = {
  submitText: '确定',
  emptyText: '取消',
  column: [
    {
      label: '',
      prop: 'dynamic',
      type: 'dynamic',
      labelWidth: 0,
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        addBtn: false,
        delBtn: false,
        selection: false,
        index: false,
        column: [
          {
            label: "竞聘者",
            prop: "jpzName",
            addDetail: true,
            disabled: true,
            editDetail: true,
          },
          {
            label: "岗位是否有变动",
            prop: "exactly",
            type: "select",
            rules: [{
              required: true,
              message: "请选择",
              trigger: "blur"
            }],
            dicData: [
              {
                label: '是',
                value: 0
              },
              {
                label: '否',
                value: 1
              },
            ]
          },
        ]
      }
    }
    // {
    //   span:24,
    //   label: "岗位是否有变动",
    //   prop: "exactly",
    //   labelWidth: 180,
    //   type: "radio",
    //   rules: [{
    //     required: true,
    //     message: "请选择",
    //     trigger: "blur"
    //   }],
    //   dicData: [
    //     {
    //       label: '是',
    //       value: 0
    //     },
    //     {
    //       label: '否',
    //       value: 1
    //     },
    //   ]
    // },
  ]
};

//转入聘期
export const pinqiOption = {
  submitText: '确定',
  emptyText: '取消',
  column: [
    {
      label: '竞聘者',
      prop: 'dynamic',
      type: 'dynamic',
      labelWidth: 120,
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        addBtn: false,
        delBtn:false,
        selection: false,
        index: false,
        addDetail:true,
        editDetail:true,
        column: [
          {
            label: "竞聘者",
            prop: "jpzName",
            addDetail:true,
            disabled:true,
            editDetail:true,
          },
          {
            label: "新聘岗位",
            prop: "newPostName",
            editDetail:true,
            addDetail:true,
            disabled:true,
          },
        ]
      }
    },
    {
      label: '聘期起止日期',
      labelWidth: 120,
      prop:'startEndTime',
      type: "daterange",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      startPlaceholder: '聘期开始日期',
      endPlaceholder: '聘期结束日期',
      span: 24,
      rules: [{
        required: true,
        message: "请选择",
        trigger: "blur"
      }],
    },
    {
      label: "备注",
      prop: "remark",
      type:'textarea',
      labelWidth: 120,
      span: 24,
    },
  ]
};


export const stopJinpin = {
    submitText: '完成',
    span:24,
    column: [
      {
        label: "原因",
        prop: "name",
        type:'textarea',
        span: 24,
        labelWidth: 120,
        showWordLimit:true,
        maxlength:255,
        rules: [{
          required: true,
          message: "请输入原因",
          trigger: "blur"
        }],
      }
    ]
};

export const handOffExamOption = {
  submitText: '通过',
  column: [{
    label: "工作交接单",
    prop: "uploads",
    labelWidth: 160,
    span:24,
    type:'upload',
    disabled:true,
    listType: 'picture-card',
    accept:'image/png, image/jpeg',
    loadText: '附件上传中，请稍等',
    tip: '只能上传jpg/png文件，且不超过5MB',
    action:'/admin/sys-file/upload',
    propsHttp: {
      url:'url',
      name:'res_id',
      res: 'data'
    }
  }]
};

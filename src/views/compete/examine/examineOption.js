export const examineOption = {
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
      label:'竞聘者姓名',
      prop:'candidateName',
      search: true,
      searchLabelWidth:90,
      span: 24,
    },
    {
      label:'部门',
      prop:'department',
      span: 24,
    },
    {
      label: '申请竞聘岗位名称',
      prop:'postTypeName',
      span: 24,
    },
    {
      label: '岗位变动',
      prop:'sfyz',
      span: 24,
      dicData: [
        {
          value:false,
          label: "否"
        },
        {
          value:true,
          label: "是"
        }
      ]
    },
    {
      label: '状态',
      prop:'isRelease',
      span: 24,
      search: true,
      type:'select',
      dicData:[
        {
          label:'待审核',
          value:'0'
        },
        {
          label:'通过无需竞聘答辩',
          value:'1'
        },
        {
          label:'通过待竞聘答辩',
          value:'2'
        },
        {
          label:'竞聘不通过',
          value:'3'
        },
        {
          label:'审核失败，请点击审核查看审核原因',
          value:'4'
        }
      ]
    },
    {
      label: '申请时间',
      prop:'createTime',
      span: 24,
    }
  ]
}

export const examFormOption = {
  submitText: '确定',
  emptyText: '取消',
  submitBtn:false,
  emptyBtn:false,
  span: 24,
  detail:true,
  column: [
    {
      label: "竞聘者姓名",
      prop: "name",
      labelWidth:120,
      disabled:true,
      span:12,
      addDetail:true,
      editDetail:true
    },
    {
      label: "所属部门",
      prop: "department",
      disabled:true,
      span:12,
      addDetail:true,
    },
    {
      label: '竞聘岗位申请',
      labelWidth:120,
      prop: 'list',
      type: 'dynamic',
      span: 24,
      children: {

        align: 'center',
        headerAlign: 'center',
        addBtn: false,
        delBtn:false,
        selection: false,
        column: [
          {
            label: '部门名称',
            prop: "departmentName",
            // disabled:true,
          },
          {
            label: '竞聘岗位名称',
            prop: "postName",
            // disabled:true,
          }
        ],
      }
    },
    {
      label: "本人应聘意向简要陈述",
      prop: "describe",
      type: 'textarea',
      labelWidth:120,
      showWordLimit:true,
      disabled:true,
      span: 24
    },
  ]
};

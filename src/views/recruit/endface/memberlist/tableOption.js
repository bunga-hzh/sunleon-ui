
export const MemberListOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  // searchMenuSpan: 8,
  editBtn: false,
  delBtn: false,
  viewBtn: false,
  align: 'center',
  menuWidth: 360,
  searchSpan:8,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  reserveSelection: true,
  gutter: 10,
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
      prop: 'createTime',
      search: true,
      searchSpan:6,
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
      searchLabelWidth:180,
      search: true,
    },
    {
      label: '应聘岗位',
      prop:'postName',
    },
    {
      label: '简历是否完善',
      prop:'isPerfect',
      type:'select',
      dicData:[
        {
          label:'已完善',
          value:true
        },
        {
          label:'待完善',
          value:false
        }
      ]
    },
    {
      label: '面试时间',
      prop:'interviewTime',
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
      label: '面试状态',
      prop:"resumeStatusName"
    }
  ]
};

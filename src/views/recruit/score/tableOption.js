
export const scoreOption = {
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
  menuHeaderAlign: 'center',
  searchSpan:6,
  labelWidth: 120,
  reserveSelection:true,
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
      searchLabelWidth:90,
      search: true,
    },
    {
      label: '应聘岗位',
      prop:'postName',
    },
    {
      label: '面试时间',
      prop: 'interviewTime',
      type:'datetime',
      searchSpan:8,
      searchType: "daterange",
      searchFormat:'yyyy年MM月dd日',
      searchValueFormat:'yyyy-MM-dd',
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
      format:'yyyy年MM月dd日 HH时mm分',
      valueFormat:'yyyy-MM-dd HH:mm',
      search: true,
    },
    {
      label: '总分',
      prop: 'fraction'
    },
    {
      label: '评分状态',
      prop: 'resumeStatusName'
    }
  ]
};


export const scoreFormOption = {
  labelWidth: 110,
  column: [{
      label: '应聘者名称',
      prop: "name",
      span: 12,
      row: true,
      disabled:true
    },
    {
      label: '评分填写',
      prop: 'peopleVO',
      type: 'dynamic',
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        addBtn:false,
        delBtn:false,
        column: [
          {
            label: '面试官',
            prop: "userName",
            disabled:true
          },
          {
            label: '得分',
            prop: "fraction",
            type:'number',
            precision:2,
            minRows:0,
            maxRows:100,
            rules:[
              {
                required: true,
                message: "请填写分数",
                trigger: "blur"
              }],
          },
        ]
      }
    }
  ]
};

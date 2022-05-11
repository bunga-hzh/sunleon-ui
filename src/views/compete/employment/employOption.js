//聘期信息管理
export const employOptionOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  searchMenuSpan: 6,
  editBtn: true,
  delBtn: false,
  viewBtn: true,
  addBtn: false,
  addTitle: '竞聘岗位维护',
  editTitle: '竞聘岗位维护',
  align: 'center',
  menuWidth: 280,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  gutter: 60,
  filterParams: ['yearTime'],
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
      label:'竞聘者姓名',
      prop:'candidateName',
      searchLabelWidth:90,
      search: true,
      span: 24,
    },
    {
      label: '岗位名称',
      prop:'postName'
    },
    {
      label: '岗位类别',
      prop:'postTypeName'
    },
    {
      label: '入职日期',
      prop:'startTime',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd  HH:mm:ss',
      type: "date",
    },
    {
      label: '最后更新时间',
      prop:'updateTime',
      editDisplay: false
    },
  ]
}

export const pmOption = {
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
  menuWidth: 360,
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
      hide:true,
      span: 24
    },
    {
      label: '姓名',
      prop:'candidateName'
    },
    {
      label: '应聘岗位',
      prop:'postName'
    },
    {
      label: '面试通过时间',
      prop: 'adoptTime'
    },
    {
      label: '入职状态',
      prop:'stateName'
    }
  ]
};

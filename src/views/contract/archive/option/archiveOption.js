export const archiveOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: true,
  searchMenuSpan: 6,
  editBtn: false,
  delBtn: false,
  viewBtn: true,
  searchIndex: 3,
  searchIcon: true,
  align: 'center',
  menuHeaderAlign: 'center',
  labelWidth: 120,
  gutter: 60,
  addBtn: false,
  column: [
    {
      label:'合同编号',
      prop:'htbh',
      search:true
    },
    {
      label:'归档编号',
      prop:'gdbh',
      search:true
    },
    {
      label:'归档名称',
      prop:'gdmc',
      search:true
    },
    {
      label:'合同名称',
      prop:'htmc',
      search:true
    },
    {
      label:'合同金额',
      prop:'htje'
    },
    {
      label:'归档状态',
      prop:'gdzt',
      type:'select',
      dicData:[
        {
          value :0,
          label:'预归档'
        },
        {
          value :1,
          label:'已完整归档'
        }
      ]
    },
    {
      label:'创建日期',
      prop:'cjsj'
    },
    {
      label:'更新日期',
      prop:'gxsj'
    },
  ]
}

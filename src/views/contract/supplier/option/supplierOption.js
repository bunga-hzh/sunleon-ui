export const supplierOption = {
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
      label:'供应商',
      prop:'gysqc',
      search:true
    },
    {
      label:'签订日期',
      prop:'qdsj',
      search:true,
      searchTitle: '日期',
      type: "date",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      searchRange: true,
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
    },
    {
      label:'签订部门',
      prop:'qdbm',
      search:true,
      props: {
        label: 'name',
        value: 'id'
      },
      filter:true,
      type: 'tree',
      dicUrl: '/act/jpGwgl/tree'
    },
    {
      label:'完结日期',
      prop:'wcsj',
      search:true,
      searchTitle: '日期',
      type: "date",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      searchRange: true,
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
    },
    {
      label:'负责人',
      prop:'xfxmfzrName',
      search:true
    },
    {
      label:'合同金额',
      prop:'htje'
    },
    {
      label:'合同名称',
      prop:'htmc'
    },
    {
      label:'合同编号',
      prop:'htbh'
    }
  ]
}

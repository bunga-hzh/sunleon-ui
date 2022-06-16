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
  searchIndex:3,
  searchIcon:true,
  align: 'center',
  menuWidth: 340,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  gutter: 60,
  addBtn: false,
  column:[
    {
      label:'合同编号',
      prop:'htbh',
      search:true
    },
    {
      label: '合同名称',
      prop:'htmc',
      search:true
    },
    {
      label: '采购方式',
      prop:'cgfs',
      type:'select',
      dicUrl: '/admin/dict/type/purchase_type',
    },
    {
      label: '合同金额(元)',
      prop:'htje'
    },
    {
      label: '审核状态',
      prop:'spzt',
      type:'select',
      dicData:[
        {
          value: 0,
          label:'未开始'
        },
        {
          value:1,
          label:'履约中'
        },
        {
          value:2,
          label:'合同完结'
        },
        {
          value:3,
          label:'审核被驳回'
        },
        {
          value:4,
          label:'审核中'
        },
        {
          value:5,
          label:'审核通过'
        },
        {
          value:6,
          label:'已归档'
        }
      ]
    },
    {
      label: '签订部门',
      prop:'qdbm',
      searchLabel:"部门",
      props: {
        label: 'name',
        value: 'id'
      },
      filter:true,
      type: 'tree',
      dicUrl: '/act/jpGwgl/tree'
    },
    {
      label: '签订时间',
      prop: 'yearTime',
      viewDisplay:false,
      searchTitle: '日期',
      type: "date",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      searchRange: true,
      startPlaceholder: '日期开始范围自定义',
      endPlaceholder: '日期结束范围自定义',
      editDisplay: false,
      addDisplay: false,
      editDisabled: true,
      showColumn: false,
      span: 24,
      hide:true
    },
    {
      label: '供应商',
      prop:'gysqc'
    },
    {
      label: '负责人',
      prop:'xfxmfzrName'
    },
    {
      label: '资金来源',
      prop:'zjly',
      filter:true,
      type: 'select',
      dicUrl: '/admin/dict/type/source_type',
    },
    {
      label: '创建时间',
      prop:'cjsj'
    },

  ]
};

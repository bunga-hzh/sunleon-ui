export const adminOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  selection: false,
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
  excelBtn:true,
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
      search: true,
      type:'select',
      dicUrl: '/admin/dict/type/purchase_type',
    },
    {
      label: '合同金额(元)',
      prop:'htje'
    },
    {
      label: '状态',
      prop:'htzt',
      search:true,
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
      label: '是否有质保金',
      prop: 'sfzbj',
      type:'select',
      dicData:[
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ]
    },
    {
      label: '质保金',
      prop: 'zbj',
    },
    {
      label: '质保金状态',
      prop: 'zbjZtName',
    },
    {
      label: '验收时间',
      prop: 'yssj',
    },
    {
      label: '质保金退回时间',
      prop: 'zbjthsj',
    },
    {
      label: '签订部门',
      prop:'qdbm',
      searchLabel:"部门",
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
      label: '签订时间',
      prop: 'yearTime',
      search: true,
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
      prop:'gysqc',
      search: true
    },
    {
      label: '资金负责人',
      prop:'xfxmfzrName'
    },
    {
      label: '质保期(月)',
      prop:'bzqy'
    },
    {
      label: '资金来源',
      prop:'zjly',
      search: true,
      filter:true,
      type: 'select',
      dicUrl: '/admin/dict/type/source_type',
    },
    {
      label: '合同起止日期',
      prop:'htqzrq',
      type: "daterange",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      startPlaceholder: '合同生效日期',
      endPlaceholder: '合同结束日期',
      formatter:(val,value,label)=>{
        if(value && value!='[]'){
          return JSON.parse(value)[0]+" ~ "+JSON.parse(value)[1];
        }else{
         return ''
        }
      }
    },
    {
      label: '签订日期',
      prop:'qdsj'
    },

  ]
};

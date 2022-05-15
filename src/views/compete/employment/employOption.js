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
  viewBtn: false,
  addBtn: false,
  addTitle: '竞聘岗位维护',
  editTitle: '竞聘岗位维护',
  align: 'center',
  menuWidth: 180,
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
      label: '岗位类型',
      prop: 'gwlxId',
      type: 'select',
      search: true,
      span: 12,
      cascader: ['gwId'],
      dicUrl: "/admin/dict/type/POST_TYPE",
      rules: [{
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }]
    },
    {
      label: '所属岗位',
      prop:'postName',
      addDisplay: false,
      editDisplay: false
    },
    {
      label: '所属岗位',
      prop:'gwId',
      search: true,
      type: "select",
      searchMultiple:true,
      hide:true,
      rules: [{
        required: true,
        message: '请选择岗位'
      }],
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}",
      span: 12
    },
    // {
    //   label: '岗位名称',
    //   prop:'postName'
    // },
    // {
    //   label: '岗位类别',
    //   prop:'postTypeName'
    // },
    {
      label: '所属部门',
      prop:'bmId',
      props: {
        label: 'name',
        value: 'id'
      },
      filter:true,
      type: 'tree',
      dicUrl: '/act/jpGwgl/tree'
    },
    {
      label: '开始日期',
      prop:'rzksny',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "date",
    },
    {
      label: '到期日期',
      prop:'rzjsny',
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      type: "date",
    },
    {
      label: '续签职务职称',
      prop:'xqzwZc'
    },
    {
      label: '职称',
      prop:'zc'
    },
    {
      label: '岗位工资',
      prop:'gwGz',
      type:'number'
    },
    {
      label: '续签薪级级数',
      prop:'xqxjJs',
      type:'number'
    },
    {
      label: '续签薪级工资',
      prop:'xqxjGz',
      type:'number'
    },
    {
      label: '最后更新时间',
      prop:'updateTime',
      editDisplay: false
    },
  ]
}

export const resumeOption = {
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
  menuWidth: 180,
  menuHeaderAlign: 'center',
  labelWidth: 120,
  reserveSelection:true,
  gutter: 10,
  addBtn: false,
  filterParams: ['yearTime'],
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
      label: '日期',
      prop: 'yearTime',
      search: true,
      editDisplay: false,
      addDisplay: false,
      showColumn: false,
      hide: true,
      searchTitle: '日期',
      searchValue: new Date().getFullYear()+"",
      type: 'year',
      format: 'yyyy年',
      valueFormat: 'yyyy',
    },
    {
      label: '应聘者姓名',
      prop: 'candidateName',
      searchLabelWidth:120,
      search: true,
    },
    {
      label: '应聘岗位',
      prop:'postName',
    },
    {
      label: '应聘岗位',
      prop:'postNameIds',
      type: 'select',
      multiple:true,
      search: true,
      showColumn: false,
      hide: true,
      searchFilterable:true,
      filterable:true,
      filter:true,
      props: {
        label: 'postName',
        value: 'id'
      },
      dicUrl: "/act/sysPostMaintain/getSelect/List"
    },
    {
      label: '投递时间',
      prop:'deliveryTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    {
      label: '专业',
      prop:'major'
    },
    {
      label: '政治面貌',
      prop:'politics',
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/politics_type`
    },
    {
      label: '性别',
      prop:'sex',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/gender`

    },
    {
      label: '年龄',
      prop: 'age'
    },
    {
      label: '学历',
      prop: 'education',
      search: true,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/education_type`
    },
    {
      label: '上海户口',
      prop: 'isShHousehold',
      type:'radio',
      search:true,
      searchType:"radio",
      searchSpan:6,
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/account_sh_type`
    },
    {
      label: '状态',
      prop: 'statusName',
      slot:true
    },
    {
      label: '上海居住证',
      prop: 'residencePermitSh',
      searchLabelWidth:120,
      search: true,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/full_year`
    },
    {
      label: '教师资格证',
      prop: 'isTeacherCertificate',
      searchLabelWidth:120,
      searchType:"radio",
      type:'select',
      search: true,
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/card_teacher`
    }
  ]
}

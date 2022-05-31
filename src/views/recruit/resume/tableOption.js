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
  menuWidth: 320,
  menuHeaderAlign: 'center',
  searchLabelWidth: 120,
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
      searchLabelWidth:120,
      search: true,
      width:180,
    },
    {
      label: '应聘岗位',
      prop:'postName',
      width:180,
    },
    {
      label: '岗位类型',
      prop: 'gwlxId',
      type: 'select',
      search: true,
      width:180,
      cascader: ['postNameIds'],
      dicUrl: "/admin/dict/type/POST_TYPE",
      rules: [{
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }]
    },
    {
      label: '应聘岗位',
      prop:'postNameIds',
      type: 'select',
      width:180,
      multiple:true,
      search: true,
      showColumn: false,
      hide: true,
      props: {
        label: 'name',
        value: 'id'
      },
      dicUrl: "/act/gwFb/get_list/{{key}}"
    },
    {
      label: '投递时间',
      width:180,
      prop:'deliveryTime',
      format: 'yyyy-MM-dd HH:mm:ss',
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    },
    {
      label: '最高专业',
      prop:'major',
      width:180,
    },
    {
      label: '政治面貌',
      prop:'politics',
      type:'select',
      width:180,
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
      width:180,
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
      label:'年龄',
      prop:'ageTime',
      hide:true,
      width:180,
      search: true,
      searchType: "slider",
      // format:'yyyy-MM-dd',
      // valueFormat:'yyyy-MM-dd',
      // startPlaceholder: '出生日期开始',
      // endPlaceholder: '出生日期结束',
    },
    {
      label:'全日制学历',
      prop:'qrzxl',
      search: true,
      width:180,
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
      label:'全日制学位',
      prop:'qrzxw',
      width:180,
      search: true,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/jl_xwAll`
    },
    {
      label: '全日制专业',
      prop: 'qrzzy',
      width:180,
      search: true,
    },
    {
      label:'最高学历',
      prop:'zgxl',
      search: true,
      type:'select',
      width:180,
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
      label:'最高学位',
      prop:'zgxw',
      search: true,
      type:'select',
      width:180,
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/jl_xwAll`
    },
    {
      label: '最高专业',
      prop: 'zgzy',
      width:180,
      hide:true,
      search: true,
    },
    {
      label:'政治面貌',
      prop:'zzmmms',
      search: true,
      width:180,
      hide:true,
      searchMultiple:true,
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
      label:'性别',
      prop:'xbm',
      width:180,
      hide:true,
      search: true,
      type:'select',
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
      label:'教师资格证类别',
      prop:'jszgzlb',
      search: true,
      width:180,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/jl_jszgz`
    },
    {
      label: '年龄',
      width:180,
      prop: 'age'
    },
    {
      label: '出生日期',
      prop:'birthday',
      width:180,
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
    },
    // {
    //   label: '学历',
    //   prop: 'education',
    //   search: true,
    //   type:'select',
    //   props:{
    //     label:'label',
    //     value:'value'
    //   },
    //   dicFormatter:(data)=>{
    //     return data.data.items;
    //   },
    //   dicUrl:`/admin/dict/type_with_dict_id/education_type`
    // },
    {
      label: '上海户口',
      prop: 'isShHousehold',
      type:'radio',
      width:180,
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
      width:180,
      prop: 'status',
      searchLabelWidth:120,
      search: true,
      editDisplay: false,
      addDisplay: false,
      showColumn: false,
      hide: true,
      type:'select',
      dicData:[
        {
          value:'0',
          label:'待处理'
        },
        {
          value:'1',
          label:'筛选通过'
        },
        {
          value:'2',
          label:'筛选不通过'
        },
        {
          value:'19',
          label:'待定'
        }
      ]
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
      width:180,
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
      width:180,
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


export const tableOption = {
  border: true,
  index: true,
  indexLabel: '序号',
  stripe: true,
  menuAlign: 'center',
  searchMenuSpan:6,
  menu:false,
  editBtn: false,
  selection:true,
  reserveSelection:true,
  delBtn: false,
  align: 'center',
  addBtn: false,
  column: [{
    fixed: true,
    label: 'id',
    prop: 'userId',
    span: 24,
    hide: true,
    editDisabled: true,
    addDisplay: false
  }, {
    fixed: true,
    label: '教职工号',
    prop: 'username',
    editDisabled: true,
    slot: true,
    search: true,
    span: 24,
    rules: [{
      required: true,
      message: '请输入教职工号'
    },
      {
        min: 3,
        max: 20,
        message: '长度在 3 到 20 个字符',
        trigger: 'blur'
      }
    ]
  },
    {
      fixed: true,
      label: '姓名',
      prop: 'realName',
      slot: true,
      search: true,
      span: 24,
      rules: [{
        required: true,
        message: '请输入姓名'
      },
        {
          min: 2,
          max: 20,
          message: '长度在 2 到 20 个字符',
          trigger: 'blur'
        }
      ]
    }, {
      label: '所属部门',
      prop: 'deptId',
      formslot: true,
      slot: true,
      span: 24,
      hide: true,
      dataType:"number",
      rules: [{
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }]
    }]
}

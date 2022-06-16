export const capitalOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan:4,
  column: [
    {
      label: '资金负责人',
      prop: 'zjfzrId',
      editDisabled:true,
      span:24,
      remote: true,
      type:'tree',
      props:{
        label:'realName',
        value:'userId'
      },
      dicMethod:'get',
      dicUrl:`/act/resume/select/user?username={{key}}`,
    },
    {
      label: '负责资金',
      prop: 'zjlxId',
      span:24,
      multiple:true,
      type: 'select',
      dicUrl: '/admin/dict/type/source_type',
    },
    {
      label: '创建时间',
      prop: 'cjsj',
      addDisplay:false,
      editDisplay:false,
    },
  ]
}

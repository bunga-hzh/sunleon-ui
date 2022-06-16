export const handlingOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan:4,
  column: [
    {
      label: '经办人',
      prop: 'jbrId',
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
      label: '资金负责人',
      prop: 'zjfzrId',
      span:24,
      multiple:true,
      type: 'select',
      props:{
        label: 'zjfzrName',
        value: 'id'
      },
      dicUrl: '/act/htGlZj/select',
    },
    {
      label: '创建时间',
      prop: 'cjsj',
      addDisplay:false,
      editDisplay:false,
    },
  ]
}

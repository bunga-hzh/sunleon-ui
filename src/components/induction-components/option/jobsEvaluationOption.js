export default {
  submitText: '保存',
  size:'medium',
  emptyBtn:false,
  column: [
    {
      label: '',
      labelWidth: 0,
      prop: 'dynamic',
      type: 'dynamic',
      span: 24,
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '年度',
            prop: 'nd',
            type: 'year'
          },
          {
            label: '考核分数',
            prop: 'khfs'
          },
          {
            label: '考核等级',
            prop: 'khdj'
          },
          {
            label: '同级人员人数',
            prop: 'tjryrs'
          },
          {
            label: '同级人员中名次',
            prop: 'tjrybc'
          },
          {
            label: '全校专业技术人员数',
            prop: 'qxzyjsrs'
          },
          {
            label: '全校专业技术人员名次',
            prop: 'qxzyjsmc'
          },
          {
            label: '备注',
            prop: 'bz'
          },
        ]
      }
    }
  ]
}

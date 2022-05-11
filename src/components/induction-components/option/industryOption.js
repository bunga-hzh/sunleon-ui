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
            label: '工人技术等级名称',
            prop:'grjsdjmc',
            type: 'select',
            dicData: [
              {
                value: 0,
                label: '初级技术工人'
              }
            ]
          },
          {
            label: '工人技术职务名称',
            prop:'grjszwmc',
            type: 'select',
            dicData: [
              {
                value: 0,
                label: '中级技术工人'
              }
            ]
          },
          {
            label: '取得技术职务时间',
            prop:'qdjszwsj',
            type: "date"
          },
          {
            label: '批准技术职务单位名称',
            prop:'pzjszwdwmc'
          },
          {
            label: '证书编号',
            prop:'grjsdjzsbh'
          },
          {
            label: '职业工种',
            prop:'grjsdjzygz'
          },
          {
            label: '电子证件',
            prop:'grjsdjzjz',
            type: 'upload'
          }
        ]
      }
    }
  ]
}

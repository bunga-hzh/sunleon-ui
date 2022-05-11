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
        // type:'form',
        labelWidth:200,
        column: [
          {
            label: '专业技术资格名称',
            prop: "zyjszgmc"
          },
          {
            label: '取得资格途径',
            prop: "qdzgtj"
          },
          {
            label: '取得资格时间',
            prop: "qdzgsj",
            type: "date",
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd'
          },
          {
            label: '聘任专业技术职务名称',
            prop: "przyjszwmc"
          },
          {
            label: '首次聘任时间',
            prop: "scprsj",
            type:'date'
          },
          {
            label: '聘任开始时间',
            prop: "prkssj",
            type: "date",
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd'
          },
          {
            label: '聘任结束时间',
            prop: "prjssj",
            type: "date",
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd'
          },
          {
            label: '聘任情况',
            prop:'prqk',
            type: 'select',
            dicData: [
              {
                label: '在聘',
                value: 0
              },
              {
                label: '不在聘',
                value: 1
              },
              {
                label: '高职低聘',
                value: 2
              }
            ]
          },
          // {
          //   label: '电子证件',
          //   prop:'prdzzj',
          //   type: 'upload',
          //   action:'/admin/sys-file/upload',
          //   showFileList: true,
          //   props: {
          //     res: "data",
          //     url: "url"
          //   }
          // }
        ]
      }
    }
  ]
}

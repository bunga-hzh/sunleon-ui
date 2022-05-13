export const educateOption = {
  labelWidth: 130,
  submitText: '保存',
  column: [{
      label: "毕业院校",
      prop: "byyx",
    },
    {
      label: "最高学历",
      prop: "zgxl",
    },
    {
      label: "最高学历专业",
      prop: "zgxlzy",
    },
    {
      label: "最高学位",
      prop: "zgxwm",
    },
    {
      label: "最高学位专业",
      prop: "zgxwzy",
    },
    {
      label: "最高学历毕业院校",
      prop: "zgxlbyyx",
    },
    {
      label: "全日制学历",
      prop: "qrzxl",
    },
    {
      label: "全日制专业",
      prop: "qrzzy",
    },
    {
      label: "全日制学位",
      prop: "qrzxw",
    },
    {
      label: "全日制毕业院校",
      prop: "qrzbyyx",
    },
    {
      label: "最高学历证上传",
      prop: "zgxlzsc",
      type: 'upload',
      loadText: '附件上传中，请稍等',
      propsHttp: {
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload'
    },
    {
      label: "全日制学历证上传",
      prop: "qrzxlzsc",
      type: 'upload',
      loadText: '附件上传中，请稍等',
      propsHttp: {
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload'
    },
  ]
}

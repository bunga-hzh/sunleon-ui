export default {
  size:'small',
  gutter:80,
  submitBtn:false,
  emptyBtn:false,
  labelWidth:130,
  column: [
    {
      label: '',
      labelWidth: 0,
      span: 24,
      prop:'fjxx',
      type:'upload',
      dragFile: true,
      loadText: '附件上传中，请稍等',
      tip: '最大20MB/个',
      action:'/admin/sys-file/upload',
      propsHttp: {
        url:'url',
        name:'originalName',
        res: 'data'
      }
    }
  ]
}

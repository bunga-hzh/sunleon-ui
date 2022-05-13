//佐证材料提交
export const handOff ={
  submitText: '提交',
  column: [{
    label: "工作交接单上传",
    prop: "uploads",
    labelWidth: 160,
    span:24,
    type:'upload',
    listType: 'picture-card',
    accept:'image/png, image/jpeg',
    loadText: '附件上传中，请稍等',
    tip: '只能上传jpg/png文件，且不超过5MB',
    action:'/admin/sys-file/upload',
    propsHttp: {
      url:'url',
      name:'res_id',
      res: 'data'
    }
  }]
};

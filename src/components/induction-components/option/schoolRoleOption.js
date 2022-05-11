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
            label: '部门',
            prop: "bm"
          },
          {
            label: '职务名称',
            prop: "zwmc"
          },
          {
            label: '任职方式',
            prop: "rzfs",
            type: "select",
            dicUrl: "/admin/dict/type/appointment_type"
          },
          {
            label: '任免职文号',
            prop: "rmzwh"
          },
          {
            label: '职务级别',
            prop: "zwjb"
          },
          {
            label: '任本职级开始时间',
            prop: "rzbzwkssj",
            type: "date",
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd',
          },
          {
            label: '任本职级结束时间',
            prop: "rzbzwjssj",
            type: "date",
            format:'yyyy-MM-dd',
            valueFormat:'yyyy-MM-dd',
          },
        ]
      }
    }
  ]
}

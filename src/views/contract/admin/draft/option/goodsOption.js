import {fetchList} from "@/api/contract/basic/sensitive";

var validateSensitive = (rule, value, callback) => {
  fetchList({
    current: 1,
    size: 20,
    mgcMc:value
  }).then(response=>{
    if(response.data.data.total>0){
      callback(new Error('标的物名称不合规!'))
    }else{
      callback()
    }
  })
}

export default {
  size: 'small',
  gutter: 80,
  submitBtn: false,
  emptyBtn: false,
  column: [
    {
      label: '',
      labelWidth:0,
      prop: 'hwqdList',
      type: 'dynamic',

      span:24,
      children: {
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '名称',
            prop: "mc",
            rules: [
              {
                required: true,
                message: '请输入名称'
              },
              {validator: validateSensitive, trigger: 'blur'}
            ]
          },
          {
            label: '型号规格',
            prop: "xh"
          },
          {
            label: '单位',
            prop: "dw",
            type:'select',
            dicUrl: '/admin/dict/type/contract_goods_type',
            rules: [{
              required: true,
              message: '请选择单位',
              trigger: 'blur'
            }],
          },
          {
            label: '数量',
            prop: "sl"
          },
          {
            label: '单价(元)',
            prop: "je"
          },
          {
            label: '固定资产',
            prop: "gdzc",
            type: 'radio',
            dicData:[{
              label:'是',
              value:0
            },{
              label:'否',
              value:1
            }]
          },
          {
            label: '金额(元)',
            prop: "total",
            formslot: true,
          }
        ]
      }
    }
  ]
}

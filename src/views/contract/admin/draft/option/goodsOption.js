import {fetchList} from "@/api/contract/basic/sensitive";
import { Message } from 'element-ui';

var validateSensitive = (rule, value, callback,source,options) => {
  fetchList({
    current: 1,
    size: 20,
    mgcMc:value
  }).then(response=>{
    if(response.data.data.total>0){
      Message.warning("您所输入的标的物名称:"+value+" ,  不合规!")
      callback()
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
            prop: "xh",
            rules: [{
              required: true,
              message: '请输入型号',
              trigger: 'blur'
            }],
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
            prop: "sl",
            rules: [{
              required: true,
              message: '请输入数量',
              trigger: 'blur'
            }],
            change: (val) => {
              if(val.row.je && val.row.sl){
                var cache = localStorage.getItem("HT_GDZC");
                if(val.row.je*val.row.sl>=cache){
                  val.row.gdzc = 0;
                }else{
                  val.row.gdzc = 1;
                }
              }
            },
          },
          {
            label: '单价(元)',
            prop: "je",
            rules: [{
              required: true,
              message: '请输入单价',
              trigger: 'blur'
            }],
            change: (val) => {
              if(val.row.je && val.row.sl){
                var cache = localStorage.getItem("HT_GDZC");
                if(val.row.je*val.row.sl>=cache){
                  val.row.gdzc = 0;
                }else{
                  val.row.gdzc = 1;
                }
              }
            },
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
            }],
            rules: [{
              required: true,
              message: '请选择是否为固定资产',
              trigger: 'blur'
            }],
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

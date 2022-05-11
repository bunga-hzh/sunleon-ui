import {newVersionCardId} from "@/util/validate";
import {getRegionTreeApi} from "@/api/recuit/common/commonApi";

var validateIdCard = (rule, value, callback) => {
  if(newVersionCardId(value)){
    callback();
  }else{
    callback(new Error('身份证号格式有误，请检查!'));
  }
}

export default {
  submitText: '完成',
  size:'medium',
  emptyBtn:false,
  column: [
    {
      label: "职工账号",
      labelWidth:180,
      prop: "zh",
      span: 12,
      formslot:true,
      rules: [{
        required: true,
        message: "请点击右侧生成职工账号",
        trigger: "blur"
      }],
    },
    {
      label: "教职工编号",
      labelWidth:180,
      prop: "jzgbh",
      span: 12,
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      }],
    },
    {
      label: "身份证号",
      labelWidth:180,
      prop: "sfzjh",
      span: 12,
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      },
        {validator: validateIdCard, trigger: 'blur'}
      ],
    },
    {
      label: "曾用名",
      labelWidth:180,
      prop: "cym",
      span: 12,
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      }],
    },
    {
      label: "性别",
      labelWidth: 180,
      prop: "xb",
      span: 12,
      type: 'radio',
      border:true,
      dicData:[{
        label:'男',
        value:0
      },{
        label:'女',
        value:1
      }]
    },
    {
      label: "出生日期",
      labelWidth:180,
      prop: "csrq",
      span: 12,
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      }],
    },
    {
      label: "专业",
      labelWidth:180,
      prop: "zy",
      span: 12,
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      }],
    },
    {
      label: "毕业院校",
      labelWidth:180,
      prop: "byyx",
      span: 12,
      rules: [{
        required: true,
        message: "请填写",
        trigger: "blur"
      }],
    },
    {
      label: "出生地",
      labelWidth:180,
      prop: "csd",
      span: 12,
    },
    {
      label: "联系电话",
      labelWidth:180,
      prop: "lxdh",
      span: 12,
    },
    {
      label: "邮箱",
      labelWidth:180,
      prop: "dzyx",
      span: 12,
    },
    {
      label: "家庭住址",
      labelWidth:180,
      prop: "jtzz",
      span: 12,
    },
    {
      label: "紧急联系人姓名",
      labelWidth:180,
      prop: "jjlxrxm",
      span: 12,
    },
    {
      label: "紧急联系人电话",
      labelWidth:180,
      prop: "jjlxrdh",
      span: 12,
    },
    {
      label: "户口所在地",
      labelWidth:180,
      prop: "hkszdm",
      span: 12,
      type: 'cascader',
      lazy: true,
      lazyLoad: async (node, resolve) => {
        const {level} = node;
        let parent = "";
        if (level > 0) {
          parent = node.data.id;
        } else {
          parent = "-1";
        }
        await getRegionTreeApi(parent).then((res) => {
          if (res.data.code == 0) {
            let nodes = res.data.data.map((item) => {
              return {
                value: item.regionCode,
                label: item.regionName,
                id: item.id,
                leaf: item.leaf,
              };
            });
            resolve(nodes);
          }
        });
      }
    },
    {
      label: '户籍类别',
      type:'select',
      labelWidth:180,
      prop: "hjlbm",
      dicData:[{
        value:0,
        label:'城镇户口'
      },{
        value:1,
        label:'非城镇户口'
      }]
    },
    {
      label: "籍贯",
      labelWidth:180,
      prop: "jgm",
      span: 12,
      type: 'cascader',
      lazy: true,
      lazyLoad: async (node, resolve) => {
        const {level} = node;
        let parent = "";
        if (level > 0) {
          parent = node.data.id;
        } else {
          parent = "-1";
        }
        await getRegionTreeApi(parent).then((res) => {
          if (res.data.code == 0) {
            let nodes = res.data.data.map((item) => {
              return {
                value: item.regionCode,
                label: item.regionName,
                id: item.id,
                leaf: item.leaf,
              };
            });
            resolve(nodes);
          }
        });
      }
    },
    {
      label: "民族",
      labelWidth:180,
      prop: "mz",
      span: 12,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/nation_type`
    },
    {
      label: "政治面貌",
      labelWidth:180,
      prop: "zzmmm",
      span: 12,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/politics_type`
    },
    {
      label: "入党日期",
      labelWidth:180,
      prop: "rdrq",
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
      span: 12,
    },
    {
      label: "年龄",
      labelWidth:180,
      prop: "nl",
      type: "number",
      span: 12,
    },
    {
      label: "健康状况",
      prop:'jkzkm',
      labelWidth:180,
      type:'select',
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/healthy_tyep`
    },
    {
      label: "婚姻状况",
      prop: 'hyzkm',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/marriage_type`
    },
    {
      label: "参加工作时间",
      prop: 'cjgzsj',
      labelWidth:180,
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
    },
    {
      label: "进入本单位工作时间",
      prop: 'jrbdwsj',
      labelWidth:180,
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
    },
    {
      label: "任职时间",
      prop: 'rzsj',
      labelWidth:180,
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
    },
    {
      label: "任职年限(年)",
      prop: 'rznx',
      labelWidth:180,
    },
    {
      label: "教研组(需提供接口)",
      prop: 'jyz',
      labelWidth:180,
    },
    {
      label: "工龄",
      prop: 'gl',
      labelWidth:180,
    },
    {
      label: "实际工作年限",
      prop: 'sjgl',
      labelWidth:180,
    },
    {
      label: "教龄",
      prop: 'jl',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/jl_type`
    },
    {
      label: "用工形式",
      prop: 'ygxs',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/ygsj_type`
    },
    {
      label: "岗位类别",
      prop: 'gwlb',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/gwlb_type`
    },
    {
      label: "人员类别",
      prop: 'rylb',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/rylb_type`
    },
    {
      label: "人员录聘来源",
      prop: 'rypyly',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/rylply_type`
    },
    {
      label: "部门（处室）(需要接口)",
      prop: 'bm',
      labelWidth:180,
      type: "select",
      dicData:[]
    },

    {
      label: '当前状态',
      prop: 'dqzt',
      labelWidth:180,
      type: "select",
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/current_state_type`
    },
    {
      label: '减员时间',
      prop: 'jysj',
      labelWidth:180,
      type: "date",
      format:'yyyy年MM月dd日',
      valueFormat:'yyyy-MM-dd',
    },
    {
      label: "套用工资标示",
      prop: 'tygzbs',
      labelWidth:180,
      type: 'select',
      span: 12,
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/tygzbs_type`
    },
    {
      label: '岗位绩点',
      labelWidth:180,
      prop:'gwjd'
    },
    {
      label: '薪资等级',
      labelWidth:180,
      prop:'xjdj'
    },

    {
      label: '岗位等级',
      labelWidth:180,
      prop:'gwdj'
    },
    {
      label: '合同类型',
      prop:'htlx',
      type: 'select',
      labelWidth:180,
      span: 12,
      props:{
        label:'label',
        value:'value'
      },
      dicFormatter:(data)=>{
        return data.data.items;
      },
      dicUrl:`/admin/dict/type_with_dict_id/htlx`
    },
    {
      label: '居住证起止日期',
      prop: 'jzzqssj',
      labelWidth:180,
      type: "daterange",
      format:'yyyy-MM-dd',
      valueFormat:'yyyy-MM-dd',
      startPlaceholder: '居住证开始日期',
      endPlaceholder: '居住证结束日期',
    },
    {
      label: '是否落户',
      prop:'sflh',
      labelWidth:180,
      type: 'radio',
      border:true,
      dicData:[{
        label:'是',
        value:0
      },{
        label:'否',
        value:1
      }]
    },
    {
      label: '备注',
      labelWidth:180,
      prop:'bz'
    },
    {
      label: "最高学历",
      labelWidth:180,
      prop: "zgxl",
      type: 'upload',
      span: 12,
    },
    {
      label: "身份证证件",
      labelWidth:180,
      prop: "sfzzp",
      type: 'upload',
      span: 12,
      formslot:true,
      limit:2,
      accept:'image/png, image/jpeg',
      loadText: '证件上传中，请稍等',
      tip: '只能上传jpg/png文件，且不超过5MB'
    },
    {
      label: "薪级等级附件",
      prop: 'xzdjfj',
      type: 'upload',
      labelWidth:180,
      span: 12,
      limit:6,
      loadText: '附件上传中，请稍等',
      tip: '不超过25MB',
    },
    {
      label: "教师资格证上传",
      prop: 'jszgz',
      type: 'upload',
      labelWidth:180,
      span: 12,
      limit:2,
      accept:'image/png, image/jpeg',
      loadText: '证件上传中，请稍等',
      tip: '只能上传jpg/png文件，且不超过5MB',
    },
    {
      label: "减员材料",
      prop: 'jycl',
      labelWidth:180,
      type: 'upload',
      span: 12,
      limit:6,
      loadText: '证件上传中，请稍等',
      tip: '不超过5MB',
    }
  ]
}

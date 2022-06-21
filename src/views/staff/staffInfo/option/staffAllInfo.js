import {
  newVersionCardId,
  isMobile,
  isEmail
} from "@/util/validate";
import {
  getRegionTreeApi
} from "@/api/staff/crud";


var validateIdCard = (rule, value, callback) => {
  if (newVersionCardId(value)) {
    callback();
  } else {
    callback(new Error('身份证号格式有误，请检查!'));
  }
}

var vaildataPhone = (rule, value, callback) => {
  if (isMobile(value)) {
    callback()
  } else {
    callback(new Error('手机号格式有误，请检查!'));
  }
}

var vaildataEmail = (rule, value, callback) => {
  if (isEmail(value)) {
    callback()
  } else {
    callback(new Error('邮箱格式有误，请检查!'));
  }
}

const is_type = [{
  label: '是',
  value: "1",
}, {
  label: '否',
  value: "2",
}]

export const option = {
  align: 'center',
  border: true,
  menuWidth: 150,
  labelWidth: 160,
  searchLabelWidth: 120,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  column: [{
      label: "所属部门",
      prop: "deptId",
      width: 120,
      type: 'tree',
      dicUrl: 'admin/dept/tree',

      props: {
        label: "name",
        value: "id",
        children: "children"
      },
      rules: [{
        required: true,
        message: "请选择 所属部门",
        trigger: "change"
      }],
      search: true,
    },
    {
      label: "教职工编号",
      prop: "gh",
      rules: [{
        required: true,
        message: "请输入教职工编号",
        trigger: "blur"
      }],
      width: 120,
      search: true,
    },
    {
      label: "姓名",
      prop: "xm",
      rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "blur"
      }],
      search: true,
    },

    {
      label: "曾用名",
      prop: "cym",
    },
    {
      label: "性别",
      prop: "xbm",
      type: "radio",
      props: {
        label: "label",
        value: "value"
      },
      dicUrl: '/admin/dict/type/sex_type',
      rules: [{
        required: true,
        message: "请选择性别",
      }],
    },
    {
      label: "年龄",
      prop: "jsnl",
      type: "number",
      minRows: 0,
      maxRows: 120,
      rules: [{
        required: true,
        message: "请输入年龄",
        trigger: "blur",
      }],
    },
    {
      label: "出生日期",
      prop: "csrq",
      type: "date",
      valueFormat: "yyyy-MM-dd",
      rules: [{
        required: true,
        message: "请选择出生日期",
        trigger: "blur",
      }],
      width: 120,
    },
    {
      label: "身份证号",
      prop: "sfzjh",
      rules: [{
          required: true,
          message: "请填写",
          trigger: "blur"
        },
        {
          validator: validateIdCard,
          trigger: 'blur'
        }
      ],
      width: 200,
      search: true,
    },
    {
      label: "出生地",
      prop: "csd",
      rules: [{
        required: true,
        message: "请输入出生地",
        trigger: "blur",
      }],
      width: 200,
    },
    {
      label: "籍贯",
      prop: "jgCodes",
      slot: true,
      width: 200,
      type: 'cascader',
      lazy: true,
      lazyLoad: async (node, resolve) => {
        const {
          level
        } = node;
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
      },
      // formatter: (val, value, label) => {
      //   console.log(val);
      //   console.log(value);
      //   console.log(label);
      //   return label
      // },
    },
    {
      label: "民族",
      prop: "mzm",
      type: "select",
      props: {
        label: 'label',
        value: 'value'
      },
      dicFormatter: (data) => {
        return data.data.items;
      },
      dicUrl: `/admin/dict/type_with_dict_id/nation_type`
    },
    {
      label: "政治面貌",
      prop: "zzmmm",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/politics_type',
      width: 120,
    },
    {
      label: "家庭住址",
      prop: "jtzz",
      width: 200,
    },
    {
      label: "联系电话",
      prop: "lxdh",
      width: 120,
      rules: [{
        validator: vaildataPhone,
        trigger: 'blur'
      }]
    },
    {
      label: "电子邮箱",
      prop: "dzyx",
      width: 200,
      rules: [{
        validator: vaildataEmail,
        trigger: 'blur'
      }]
    },
    {
      label: "紧急联系人姓名",
      prop: "jjlxrxm",
      width: 120,
    },
    {
      label: "紧急联系人电话",
      prop: "jjlxrdh",
      width: 120,
      rules: [{
        validator: vaildataPhone,
        trigger: 'blur'
      }],
      width: 120,
    },
    {
      label: "身份证正面上传",
      prop: "sfzFrontImg",
      type: 'upload',
      accept: 'image/png, image/jpg',
      limit: 1,
      fileSize: 500,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500KB',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
    {
      label: "身份证反面上传",
      prop: "sfzBackImg",
      type: 'upload',
      accept: 'image/png, image/jpg',
      limit: 1,
      fileSize: 500,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500KB',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
    {
      label: "最高学历",
      prop: "zgxl",
    },
    {
      label: "最高学历专业",
      prop: "zgxlzy",
      width: 120,
    },
    {
      label: "最高学位",
      prop: "zgxwm",
    },
    {
      label: "最高学位专业",
      prop: "zgxwzy",
      width: 120,
    },
    {
      label: "最高学历毕业院校",
      prop: "zgxlbyyx",
      width: 120,
    },
    {
      label: "全日制学历",
      prop: "qrzxl",
      width: 120,
    },
    {
      label: "全日制专业",
      prop: "qrzzy",
      width: 120,
    },
    {
      label: "全日制学位",
      prop: "qrzxw",
      width: 120,
    },
    {
      label: "全日制毕业院校",
      prop: "qrzbyyx",
      width: 120,
    },
    {
      label: "最高学历证上传",
      prop: "zgxlzsc",
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
    {
      label: "全日制学历证上传",
      prop: "qrzxlzsc",
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
    {
      label: "户口所在地",
      prop: "hkszdmCodes",
      slot: true,
      width: 200,
      type: 'cascader',
      lazy: true,
      lazyLoad: async (node, resolve) => {
        const {
          level
        } = node;
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
      },
    },
    {
      label: "户籍类别",
      prop: "hjlb",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/census_type',
    },
    {
      label: "当前状态",
      prop: "dqztm",
      width: 120,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/dqztk_type',
    },
    {
      label: "户口详细地址",
      prop: "hkxxdz",
      width: 200,
    },
    {
      label: "居住详细地址",
      prop: "jzxxdz",
      width: 200,
    },
    {
      label: "入党日期",
      prop: "rdrq",
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "健康状况",
      prop: "jkzkm",
      width: 120,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/healthy_tyep',
    },
    {
      label: "婚姻状况",
      prop: "hyzkm",
      width: 120,
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/marriage_type',
    },
    {
      label: "合同类型",
      prop: "htlx",
      type: 'select',
      span: 12,
      props: {
        label: 'label',
        value: 'value'
      },
      dicFormatter: (data) => {
        return data.data.items;
      },
      dicUrl: `/admin/dict/type_with_dict_id/htlx`
    },
    {
      label: "专技人员专业类别",
      prop: "zyjsrylb",
      width: 120,
    },
    // {
    //   label: "居住证起始时间",
    //   prop: "jjzqssj",
    //   type: 'date',
    //   valueFormat: "yyyy-MM-dd",
    // },
    // {
    //   label: "居住证截止时间",
    //   prop: "jjzjzsj",
    //   type: 'date',
    //   valueFormat: "yyyy-MM-dd",
    // },
    {
      label: "居住证起止时间",
      prop: "jjzqssj",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '招聘开始日期',
      endPlaceholder: '招聘结束日期',
      span: 24,
      width: 150,
      slot: true,
    },
    {
      label: "是否落户",
      prop: "sflh",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
    },
    {
      label: "是否具有职业资格",
      prop: "sfjyzyzg",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 120,
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
    },
    {
      label: "人员类别",
      prop: "rylb",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/rylb_type',
    },
    {
      label: "岗位类别",
      prop: "gwlbm",
      type: "select",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/post_type',
    },
    {
      label: "岗位名称",
      prop: "gwmc",
      type: 'select'
    },
    {
      label: "岗位聘任年月",
      prop: "gwprny",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "岗位聘任年限",
      prop: "gwprnx",
      type: 'number',
      width: 120,
    },
    {
      label: "实际工作年限",
      prop: "sjgzny",
      type: 'number',
      width: 120,
    },
    {
      label: "进入本单位工作时间",
      prop: "jrbdwgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 130,
    },
    {
      label: "岗位等级",
      prop: "gwdjm",
    },
    {
      label: "参加工作时间",
      prop: "cjgzsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "实际工作年限",
      prop: "cjgzny",
      type: "number",
      width: 120,
    },
    {
      label: "校内职务",
      prop: "xnzw",
    },
    {
      label: "聘任时限",
      prop: "prsx",
      type: 'number',
    },
    {
      label: "任现职务时间",
      prop: "rxzwsj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
      width: 120,
    },
    {
      label: "用工形式",
      prop: "ygxs",
    },
    {
      label: "所属教研组",
      prop: "ssjyz",
      width: 120,
    },
    {
      label: "教龄",
      prop: "jl",
      type: 'number',
    },
    {
      label: "减员时间",
      prop: "jysj",
      type: "date",
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "人员录聘来源",
      prop: "rylply",
      width: 120,
    },
    {
      label: "试用期限",
      prop: "syqx",
    },
    {
      label: "专业技术职务",
      prop: "xrzyjszw",
      width: 120,
    },
    {
      label: "专业技术等级",
      prop: "zyjsdj",
      width: 120,
    },
    {
      label: "是否为内设机构领导",
      prop: "sfwnsjgld",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 140,
    },
    {
      label: "是否残疾人",
      prop: "sfcjr",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 120,
    },
    {
      label: "是否留学回国",
      prop: "sflxhg",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 120,
    },
    {
      label: "是否为应届毕业生",
      prop: "sfyjbys",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicData: is_type,
      width: 140,
    },
    {
      label: "减员材料上传",
      prop: "jyclsc",
      type: 'upload',
      limit: 1,
      fileSize: 5120,
      propsHttp: {
        url: 'url',
        name: 'originalName',
        res: 'data'
      },
      tip: '不超过5M',
      action: '/admin/sys-file/upload',
      span: 24,
      hide: true,
    },
    {
      label: "中国建设银行卡号",
      prop: "zgjsyhkh",
      span: 24,
      width: 120,
    },
    {
      label: "中国工商银行卡号",
      prop: "zggsyhkh",
      span: 24,
      width: 120,
    },
    {
      label: "中国银行卡号",
      prop: "zgyhkh",
      span: 24,
      width: 120,
    },
    {
      label: "公积金账号",
      prop: "gjjzh",
      span: 24,
      width: 120,
    },
    {
      label: "补充公积金账号",
      prop: "bcgjjzh",
      span: 24,
      width: 120,
    },
  ]
}

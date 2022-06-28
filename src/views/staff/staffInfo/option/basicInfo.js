import {
  newVersionCardId,
  isMobile,
  isEmail
} from "@/util/validate";
import {
  getRegionTreeApi
} from "@/api/staff/crud";
import {
  sex_type,
  is_type
}
from "@/const/commonDict"


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

export const option = {
  align: 'center',
  border: true,
  menuWidth: 200,
  labelWidth: 160,
  searchLabelWidth: 120,
  viewBtn: true,
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
      editDisabled: true,
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
      label: "教职工编号",
      prop: "gh",
      rules: [{
        required: true,
        message: "请输入教职工编号",
        trigger: "blur"
      }],
      width: 120,
      search: true,
      editDisabled: true,
    },
    {
      label: "曾用名",
      prop: "cym",
      rules: [{
        required: true,
        message: "请输入 曾用名",
        trigger: "blur",
      }],
    },
    {
      label: "性别",
      prop: "xbm",
      type: "radio",
      border: true,
      props: {
        label: "label",
        value: "value"
      },
      dicData: sex_type,
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
        validator: validateIdCard,
        trigger: 'blur'
      }],
      width: 150,
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
      width: 200,
      type: 'cascader',
      slot: true,
      props: {
        label: 'regionName',
        value: 'regionCode'
      },
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
            resolve(res.data.data);
          }
        });
      },
      rules: [{
        required: true,
        message: "请输入 请输入出生地",
        trigger: "blur",
      }],
    },
    {
      label: "民族",
      prop: "mzm",
      type: "select",
      props: {
        label: 'label',
        value: 'value'
      },
      dicUrl: `/admin/dict/type/nation_type`,
      rules: [{
        required: true,
        message: "请输入 请输入出生地",
        trigger: "blur",
      }],
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
      rules: [{
        required: true,
        message: "请输入 请输入出生地",
        trigger: "blur",
      }],
    },
    {
      label: "家庭住址",
      prop: "jtzz",
      width: 200,
      rules: [{
        required: true,
        message: "请输入 请输入出生地",
        trigger: "blur",
      }],
    },
    {
      label: "联系电话",
      prop: "lxdh",
      width: 120,
      rules: [{
        required: true,
        validator: vaildataPhone,
        trigger: "blur",
      }],
    },
    {
      label: "电子邮箱",
      prop: "dzyx",
      width: 200,
      rules: [{
        required: true,
        validator: vaildataEmail,
        trigger: "blur",
      }],
    },
    {
      label: "紧急联系人姓名",
      prop: "jjlxrxm",
      width: 120,
      rules: [{
        required: true,
        message: "请输入 紧急联系人姓名",
        trigger: "blur",
      }],
    },
    {
      label: "紧急联系人电话",
      prop: "jjlxrdh",
      width: 120,
      width: 120,
      rules: [{
        required: true,
        validator: vaildataPhone,
      }],
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
      width: 200,
      type: 'cascader',
      slot: true,
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
      editDisabled: true,
      rules: [{
        required: true,
        message: "请选择 当前状态",
        trigger: "blur",
      }],
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
      dicUrl: `/admin/dict/type/htlx`
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
      border: true,
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
      border: true,
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
  ]
}

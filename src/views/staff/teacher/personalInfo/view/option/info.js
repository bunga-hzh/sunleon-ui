import {
  newVersionCardId,
  isMobile,
  isEmail
} from "@/util/validate";
import {
  getRegionTreeApi
} from "@/api/recuit/common/commonApi";


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
  labelWidth: 160,
  detail: true,
  group: [{
      label: '个人基本信息',
      column: [{
          label: "教职工编号",
          prop: "gh",
          disabled: true,
        },
        {
          label: "姓名",
          prop: "xm",
          disabled: true,
        },
        {
          label: "曾用名",
          prop: "cym",
          disabled: true,
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
          disabled: true,
        },
        {
          label: "年龄",
          prop: "jsnl",
          type: "number",
          minRows: 0,
          maxRows: 120,
          disabled: true,
        },
        {
          label: "出生日期",
          prop: "csrq",
          type: "date",
          valueFormat: "yyyy-MM-dd",
          disabled: true,
        },
        {
          label: "身份证号",
          prop: "sfzjh",
          disabled: true,
        },
        {
          label: "出生地",
          prop: "csd",
          disabled: true,
        },
        {
          label: "籍贯",
          prop: "jg",
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
          disabled: true,
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
          dicUrl: `/admin/dict/type_with_dict_id/nation_type`,
          disabled: true,
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
        },
        {
          label: "家庭住址",
          prop: "jtzz",
        },
        {
          label: "联系电话",
          prop: "lxdh",
          rules: [{
            validator: vaildataPhone,
            trigger: 'blur'
          }]
        },
        {
          label: "电子邮箱",
          prop: "dzyx",
          rules: [{
            validator: vaildataEmail,
            trigger: 'blur'
          }]
        },
        {
          label: "紧急联系人姓名",
          prop: "jjlxrxm",
        },
        {
          label: "紧急联系人电话",
          prop: "jjlxrdh",
          rules: [{
            validator: vaildataPhone,
            trigger: 'blur'
          }],
        },
        {
          label: "所属部门",
          prop: "deptId",
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
          // dicFormatter: (data) => {
          //   const dic = undefined
          //   data.forEach(item => {
          //     if (item.id = 1) {
          //       dic.push({
          //         ...item,
          //         disabled: true,
          //       })
          //     } else {
          //       dic.push(item)
          //     }
          //   })
          //   return dic
          // },
          search: true,
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
        },
      ]
    },
    {
      label: "个人教育经历",
      column: [{
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
      ]
    },
    {
      label: "个人其他信息",
      column: [{
          label: "户口所在地",
          prop: "hkszdm",
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
        },
        {
          label: "居住详细地址",
          prop: "jzxxdz",
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
        },
        {
          label: "备注",
          prop: "bz",
          type: 'textarea',
          span: 24,
        },
      ]
    }
  ]
}
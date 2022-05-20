import {
  newVersionCardId
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

export const infoOption = {
  submitText: '添加',
  detail: false,
  labelWidth: 130,
  addBtn: true,
  column: [{
      label: "教职工编号",
      prop: "gh",
      rules: [{
        required: true,
        message: "请输入教职工编号",
        trigger: "blur"
      }],
    },
    {
      label: "姓名",
      prop: "xm",
      rules: [{
        required: true,
        message: "请填写姓名",
        trigger: "blur"
      }],
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
        value: 'value'
      },
      dicData: [{
          label: '男',
          value: '1',
        },
        {
          label: '女',
          value: '2',
        }
      ],
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
        message: "请选择性别",
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
        message: "请选择性别",
        trigger: "blur",
      }],
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
    },
    {
      label: "出生地",
      prop: "csd",
      rules: [{
        required: true,
        message: "请选择性别",
        trigger: "blur",
      }],
    },
    {
      label: "籍贯",
      prop: "jgm",
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
      }
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
    },
    {
      label: "家庭住址",
      prop: "jtzz",
    },
    {
      label: "联系电话",
      prop: "lxdh",
    },
    {
      label: "电子邮箱",
      prop: "dzyx",
    },
    {
      label: "紧急联系人姓名",
      prop: "jjlxrxm",
    },
    {
      label: "紧急联系人电话",
      prop: "jjlxrdh",
    },
    {
      label: "组织机构",
      prop: "orgId",
      type: 'tree',
      dicUrl: 'admin/dept/tree',
      props: {
        label: "name",
        value: "id",
        children: "children"
      },
    },
    {
      label: "身份证正面上传",
      prop: "sfzFrontImg",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
    {
      label: "身份证反面上传",
      prop: "sfzBackImg",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24,
    },
  ]
}

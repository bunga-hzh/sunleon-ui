import {
  newVersionCardId
} from "@/util/validate";
import {
  getRegionTreeApi
} from "@/api/recuit/common/commonApi";

export const otherOption = {
  submitText: '添加',
  detail: false,
  labelWidth: 140,
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
      }
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
    {
      label: "居住证起始时间",
      prop: "jjzqssj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "居住证截止时间",
      prop: "jjzjzsj",
      type: 'date',
      valueFormat: "yyyy-MM-dd",
    },
    {
      label: "是否落户",
      prop: "sflh",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/account_sh_type',
    },
    {
      label: "是否具有职业资格",
      prop: "sfjyzyzg",
      type: "radio",
      props: {
        label: "label",
        value: 'value'
      },
      dicUrl: '/admin/dict/type/is_profession_qualifications',
    },
    {
      label: "备注",
      prop: "bz",
      type: 'textarea',
      span: 24,
    },
  ]
}

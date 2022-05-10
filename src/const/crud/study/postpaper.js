export const option = {
  align: 'center',
  index: true,
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  labelWidth: 140,
  column: [{
      label: "姓名",
      prop: "xm",
      search: true,
    },
    {
      label: "性别",
      prop: "xbm",
      type: 'radio',
      dicUrl: '/admin/dict/type/xb_type',
      props: {
        "label": "label",
        "value": "value"
      },
      search: true,
    },
    {
      label: "出生年月",
      prop: "csny",
      type: 'date',
      valueFormat: 'yyyy-MM-dd'
    },
    {
      label: "部门",
      prop: "deptId",
      search: true,
      type: 'select',
      dicUrl: '/admin/dict/type/post_type',
      props: {
        "label": "label",
        "value": "value"
      },
    },
    {
      label: "职务",
      prop: "zw",
    },
    {
      label: "职称",
      prop: "zc",
    },
    {
      label: "学科专业",
      prop: "xkzy",
    },
    {
      label: "研究方向",
      prop: "yjfx",
    },
    {
      label: "论文类型",
      prop: "lwlx",
    },
    {
      label: "论文题目",
      prop: "lwtm",
    },
    {
      label: "发表刊物",
      prop: "fbkw",
    },
    {
      label: "刊号",
      prop: "kh",
    },
    {
      label: "级别",
      prop: "jb",
    },
    {
      label: "作者排序",
      prop: "zzpx",
    },
    {
      label: "附件（封面）",
      prop: "fm",
      type: 'upload',
      span: 24,
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload',
      width: 120,
    },
    {
      label: "附件（刊号页）",
      prop: "khy",
      type: 'upload',
      span: 24,
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload',
      width: 120,
    },
    {
      label: "附件（目录页）",
      prop: "mly",
      type: 'upload',
      span: 24,
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload',
      width: 120,
    },
    {
      label: "附件（正文页）",
      prop: "zwy",
      type: 'upload',
      span: 24,

      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload',
      width: 120,
    },
    {
      label: "附件（获奖证书）",
      prop: "hjzs",
      type: 'upload',
      span: 24,
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png文件，且不超过500kb',
      action: '/imgupload',
      width: 120,
    },
  ],
}

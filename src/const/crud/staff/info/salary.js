export const salaryOption = {
  submitText: '添加',
  detail: false,
  labelWidth: 120,
  column: [{
      label: "岗位绩点",
      prop: "gwjd",
    },
    {
      label: "薪酬类别",
      prop: "xclb",
    },
    {
      label: "岗位等级",
      prop: "gwdj",
    },
    {
      label: "岗位工资",
      prop: "gwgz",
      type: 'number',
    },
    {
      label: "薪级等级",
      prop: "xjdj",
    },
    {
      label: "薪级工资",
      prop: "xjgz",
      type: 'number',
    },
    {
      label: "上下班交通费",
      prop: "sxbjtf",
      type: 'number',
    },
    {
      label: "粮油补贴",
      prop: "lybt",
      type: 'number',
    },
    {
      label: "教贴",
      prop: "jt",
      type: 'number',
    },
    {
      label: "岗位津贴",
      prop: "gwjt",
      type: 'number',
    },
    {
      label: "技术津贴",
      prop: "jsjt",
      type: 'number',
    },
    {
      label: "工会费",
      prop: "ghf",
      type: 'number',
    },
    {
      label: "饭贴",
      prop: "ft",
      type: 'number',
    },
    {
      label: "工作年限",
      prop: "gznx",
      type: 'number',
    },
    {
      label: "聘任岗位",
      prop: "prgw",
    },
    {
      label: "任现职时间",
      prop: "xrzsj",
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "薪级等级附件",
      prop: "xjdjfj",
      type: 'upload',
      propsHttp: {
        url: 'url',
        name: 'name',
        res: 'data'
      },
      tip: '只能上传jpg/png格式，且不超过500kb',
      action: '/imgupload',
      span: 24
    },
  ]
}

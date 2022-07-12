export const option = {
  align: "center",
  border: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  selection: true,
  menu: false,
  index: true,
  column: [
    {
      label: "泼猴信息技术（上海）有限公司   学校(盖章)",
      children: [
        {
          label: "培训编码",
          prop: "pxbm",
        },
        {
          label: "姓名",
          prop: "xm",
        },
        {
          label: "成果类型",
          prop: "cglx",
        },
        {
          label: "组织部门或发表刊物",
          prop: "zzbmhfbkw",
          width: 140,
        },
      ],
    },
    {
      label: "学校审核人：演示账户",
      children: [
        {
          label: "时间",
          prop: "sj",
        },
        {
          label: "成果名称",
          prop: "xgmc",
        },
        {
          label: "成果名称",
          prop: "xgmc",
        },
        {
          label: "成果级别",
          children: [
            {
              label: "国家级",
              prop: "cgjbGjj",
              width: 40,
            },
            {
              label: "市级",
              prop: "cgjbSj",
              width: 40,
            },
            {
              label: "区级",
              prop: "cgjbQj",
              width: 40,
            },
            {
              label: "署级",
              prop: "cgjbSj",
              width: 40,
            },
            {
              label: "校级",
              prop: "cgjbXj",
              width: 40,
            },
          ],
        },
        {
          label: "备注",
          children: [
            {
              label: "是否独立完成",
              prop: "sfdlwc",
              width: 60,
            },
            {
              label: "署名人数",
              prop: "zmrs",
              width: 60,
            },
            {
              label: "排名次序",
              prop: "pmcx",
              width: 60,
            },
          ],
        },
      ],
    },
  ],
};

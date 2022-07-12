export const option = {
  align: "center",
  border: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  menu: false,
  index: true,
  column: [
    {
      label: "培训编码",
      prop: "pxbm",
    },
    {
      label: "姓名",
      prop: "xm",
    },
    {
      label: "",
      children: [
        {
          label: "读书",
          children: [
            {
              label: "心得篇数",
              prop: "xdps",
            },
          ],
        },
        {
          label: "听学术讲座",
          children: [
            {
              label: "活动次数",
              prop: "txsjz",
            },
          ],
        },
        {
          label: "参加学术活动",
          children: [
            {
              label: "活动次数",
              prop: "cjxshd",
            },
          ],
        },
        {
          label: "观课评课",
          children: [
            {
              label: "活动次数",
              prop: "gkpk",
            },
          ],
        },
        {
          label: "校级课题研究",
          children: [
            {
              label: "活动次数",
              prop: "xjktyj",
            },
          ],
        },
        {
          label: "专题研讨",
          children: [
            {
              label: "活动次数",
              prop: "ztyt",
            },
          ],
        },
        {
          label: "其他活动",
          children: [
            {
              label: "活动次数",
              prop: "qthd",
            },
          ],
        },
        {
          label: "带教见习教师",
          children: [
            {
              label: "合格人数",
              prop: "hgrs",
            },
          ],
        },
        {
          label: "过程学分",
          prop: "gcxf",
        },
      ],
    },
    {
      label: "成果",
      children: [
        {
          label: "发表论文（篇数）",
          children: [
            {
              label: "国家级",
              prop: "fblwGjj",
            },
            {
              label: "市级",
              prop: "fblwSj",
            },
            {
              label: "区级",
              prop: "fblwQj",
            },
            {
              label: "署级",
              prop: "fblwZj",
            },
            {
              label: "校级",
              prop: "fblwXj",
            },
          ],
        },
        {
          label: "成果获奖（篇数或节数）",
          children: [
            {
              label: "国家级",
              prop: "cghjGjj",
            },
            {
              label: "市级",
              prop: "cghjSj",
            },
            {
              label: "区级",
              prop: "cghjQj",
            },
            {
              label: "署级",
              prop: "cghjZj",
            },
            {
              label: "校级",
              prop: "cghjXj",
            },
          ],
        },
        {
          label: "公开课展示（节数）",
          children: [
            {
              label: "国家级",
              prop: "gkkzsGjj",
            },
            {
              label: "市级",
              prop: "gkkzsSj",
            },
            {
              label: "区级",
              prop: "gkkzsQj",
            },
            {
              label: "署级",
              prop: "gkkzsZj",
            },
            {
              label: "校级",
              prop: "gkkzsXj",
            },
          ],
        },
        {
          label: "成果学分",
          prop: "cgxf",
        },
      ],
    },
    {
      label: "合计申请学分",
      prop: "hjsqxf",
    },
    {
      label: "实际核定学分",
      prop: "sjhdxf",
    },
  ],
};

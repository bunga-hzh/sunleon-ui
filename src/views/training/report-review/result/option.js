import { is_type } from "@/const/commonDict";

export const option = {
  align: "center",
  border: true,
  dialogWidth: "80%",
  searchSpan: 8,
  viewBtn: true,
  addBtn: false,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  column: [
    {
      label: "学年",
      prop: "xn",
      type: "year",
      format: "yyyy",
      valueFormat: "yyyy",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      search: true,
    },
    {
      type: "select",
      label: "部门",
      span: 8,
      display: true,
      prop: "deptId",
      cascaderItem: [],
      props: {
        label: "name",
        value: "id",
        children: "children",
      },
      dicUrl: "/admin/dept/tree",
      dicMethod: "get",
      clearable: true,
      required: true,
      rules: [
        {
          required: true,
          message: "请选择系处",
        },
      ],
      dicFlag: true,
      disabled: true,
    },
    {
      type: "input",
      label: "姓名",
      span: 8,
      display: true,
      prop: "xm",
      maxlength: 30,
      required: true,
      rules: [
        {
          required: true,
          message: "姓名必须填写",
        },
      ],
      disabled: true,
      search: true,
    },
    {
      type: "input",
      label: "师训账号",
      span: 8,
      display: true,
      prop: "sxzh",
      rules: [
        {
          required: true,
          message: "师训账号必须填写",
        },
      ],
      maxlength: 30,
      required: true,
      disabled: true,
    },
    {
      type: "dynamic",
      label: "子表单",
      span: 24,
      display: true,
      children: {
        align: "center",
        headerAlign: "center",
        index: false,
        addBtn: true,
        delBtn: true,
        column: [
          {
            type: "select",
            label: "成果类型",
            dicData: [
              {
                label: "选项一",
                value: 0,
              },
              {
                label: "选项二",
                value: 1,
              },
              {
                label: "选项三",
                value: 2,
              },
            ],
            cascaderItem: [],
            span: 24,
            display: true,
            props: {
              label: "label",
              value: "value",
            },
            prop: "cglx",
            clearable: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请选择成果类型",
              },
            ],
          },
          {
            type: "input",
            label: "组织部门或发表刊物",
            span: 24,
            display: true,
            prop: "zzbmhfbkw",
            maxlength: 30,
            required: true,
            width: 160,
            rules: [
              {
                required: true,
                message: "组织部门或发表刊物必须填写",
              },
            ],
          },
          {
            type: "date",
            label: "时间",
            span: 24,
            display: true,
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd",
            prop: "sj",
            required: true,
            rules: [
              {
                required: true,
                message: "时间必须填写",
              },
            ],
          },
          {
            type: "input",
            label: "成果名称",
            dicData: [
              {
                label: "选项一",
                value: "0",
              },
              {
                label: "选项二",
                value: "1",
              },
              {
                label: "选项三",
                value: "2",
              },
            ],
            span: 24,
            display: true,
            dicOption: "static",
            props: {
              label: "label",
              value: "value",
            },
            prop: "cgmc",
            maxlength: 30,
            required: true,
            rules: [
              {
                required: true,
                message: "成果名称必须填写",
              },
            ],
          },
          {
            type: "select",
            label: "成果级别",
            dicData: [
              {
                label: "选项一",
                value: 0,
              },
              {
                label: "选项二",
                value: 1,
              },
              {
                label: "选项三",
                value: 2,
              },
            ],
            cascaderItem: [],
            span: 24,
            display: true,
            props: {
              label: "label",
              value: "value",
            },
            prop: "cgjb",
            clearable: true,
            required: true,
            rules: [
              {
                required: true,
                message: "请选择成果级别",
              },
            ],
          },
          {
            type: "radio",
            label: "是否独立完成",
            dicData: is_type,
            span: 24,
            display: true,
            props: {
              label: "label",
              value: "value",
            },
            prop: "sfdlwc",
            border: true,
            required: true,
            width: 180,
            rules: [
              {
                required: true,
                message: "请选择是否独立完成",
              },
            ],
          },
        ],
      },
      prop: "child",
    },
    {
      label: "状态",
      prop: "status",
      addDisplay: false,
      editDisplay: false,
      viewDisplay: false,
      type: "select",
      search: true,
    },
    {
      component: "elAlert",
      params: {
        title: "说明:",
        type: "warning",
        description: `
        1.成果类型包括发表论文署名人数和排名次序、成果获奖、公开课展示三种（校级课题/项目研究成果填在成果获奖里），其中论文、获奖要注明是否独立完成，合作完成的要注明署名人数和排名次序；
        2.各项成果的级别请在相应栏目内打“√”；
        3.同一成果分属不同类型的，按照最高级别归类，不重复认定；
        4.材料的摆放顺序同本表名单的顺序`,
        closable: false,
        showIcon: true,
      },
      span: 24,
      hide: true,
    },
    {
      prop: "steps",
      span: 24,
      hide: true,
      formslot: true,
      addDisplay: false,
    },
  ],
};

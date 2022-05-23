export const optionList = [{
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    searchSpan: 6,
    index: true,
    labelWidth: 150,
    menuWidth: 160,
    column: [{
        label: "姓名",
        prop: "xm",
        search: true,
        formslot: true,
        editDisabled: true,
      },
      {
        label: "工号",
        prop: "gh",
        search: true,
        addDisabled: true,
        editDisabled: true,
      },
      {
        label: "所属部门",
        prop: "orgId",
        search: true,
        addDisabled: true,
        editDisabled: true,
        type: 'tree',
        dicUrl: 'admin/dept/tree',
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
      },
      {
        label: "实习期（月）",
        prop: "sxq",
        type: "number",
        minRows: 0,
        valueDefault: 0,
      },
      {
        label: "开始时间",
        prop: "startDate",
        width: 170,
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "结束时间",
        prop: "endDate",
        width: 170,
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "不合格原因",
        prop: "reason",
        type: "textarea",
      },
      {
        label: "备注",
        prop: "bz",
        type: "textarea",
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    searchSpan: 6,
    index: true,
    labelWidth: 150,
    menuWidth: 160,
    column: [{
        label: "姓名",
        prop: "xm",
        search: true,
        formslot: true,
        editDisabled: true,
      },
      {
        label: "工号",
        prop: "gh",
        search: true,
        addDisabled: true,
        editDisabled: true,
      },
      {
        label: "所属部门",
        prop: "orgId",
        search: true,
        addDisabled: true,
        editDisabled: true,
        type: 'tree',
        dicUrl: 'admin/dept/tree',
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
      },
      {
        label: "试用期(月)",
        prop: "syq",
        type: "number",
        minRows: 0,
        valueDefault: 0,
      },
      {
        label: "开始时间",
        prop: "startDate",
        width: 170,
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "结束时间",
        prop: "endDate",
        width: 170,
        type: "date",
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "不合格原因",
        prop: "reason",
        type: "textarea",
      },
      {
        label: "备注",
        prop: "bz",
        type: "textarea",
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    searchSpan: 6,
    index: true,
    labelWidth: 150,
    menuWidth: 160,
    column: [{
        label: "姓名",
        prop: "xm",
        search: true,
        formslot: true,
        editDisabled: true,
      },
      {
        label: "工号",
        prop: "gh",
        search: true,
        addDisabled: true,
        editDisabled: true,
      },
      {
        label: "所属部门",
        prop: "orgId",
        search: true,
        addDisabled: true,
        editDisabled: true,
        type: 'tree',
        dicUrl: 'admin/dept/tree',
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
      },
      {
        label: "岗位",
        prop: "gw",
      },
      {
        label: "入职日期",
        prop: "lzrq",
        width: 160,
        type: 'date',
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "转正日期",
        prop: "zzrq",
        width: 160,
        type: 'date',
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "备注",
        prop: "bz",
        type: 'textarea',
      },
    ],
  },
  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    searchSpan: 7,
    index: true,
    labelWidth: 150,
    menuWidth: 200,
    selection: true,
    column: [{
        label: "姓名",
        prop: "xm",
        search: true,
        formslot: true,
        editDisabled: true,
      },
      {
        label: "工号",
        prop: "gh",
        search: true,
        addDisabled: true,
        editDisabled: true,
      },
      {
        label: "所属部门",
        prop: "orgId",
        search: true,
        addDisabled: true,
        editDisabled: true,
        type: 'tree',
        dicUrl: 'admin/dept/tree',
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
      },
      {
        label: "薪资",
        prop: "xz",
        type: 'number',
        minRows: 0,
        valueDefault: 0,
      },
      {
        label: "岗位名称",
        prop: "gwmc",
      },
      {
        label: "开始时间",
        prop: "startDate",
        width: 170,
        type: 'date',
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "结束时间",
        prop: "endDate",
        type: 'date',
        valueFormat: "yyyy-MM-dd",
        search: true,
      },
    ],
  },

  {
    align: 'center',
    border: true,
    searchMenuSpan: 4,
    searchSpan: 6,
    index: true,
    labelWidth: 150,
    menuWidth: 160,
    column: [{
        label: "姓名",
        prop: "xm",
        search: true,
        formslot: true,
        editDisabled: true,
      },
      {
        label: "工号",
        prop: "gh",
        search: true,
        addDisabled: true,
        editDisabled: true,
      },
      {
        label: "所属部门",
        prop: "orgId",
        search: true,
        addDisabled: true,
        editDisabled: true,
        type: 'tree',
        dicUrl: 'admin/dept/tree',
        props: {
          label: "name",
          value: "id",
          children: "children"
        },
      },
      {
        label: "异动时间",
        prop: "ydsj",
        type: 'date',
        valueFormat: "yyyy-MM-dd",
      },
      {
        label: "备注",
        prop: "bz",
        type: 'textarea',
      },
    ],
  },
]

export const tabList = [{
    label: '实习期不合格',
    value: '1'
  },
  {
    label: '试用期不合格',
    value: '2'
  },
  {
    label: '转正',
    value: '3'
  },
  {
    label: '合同续签',
    value: '4'
  },
  {
    label: '转岗',
    value: '5'
  },
  {
    label: '自定义',
    value: '6'
  },
]

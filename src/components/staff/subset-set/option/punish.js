export const option = {
  align: 'center',
  border: true,
  menuWidth: 100,
  labelWidth: 160,
  viewBtn: true,
  column: [{
      label: "处分类别",
      prop: "cflb",
    },
    {
      label: "处分原因",
      prop: "cfyy",
    },
    {
      label: "处分记录描述",
      prop: "cfjlms",
    },
    {
      label: "处分单位名称",
      prop: "cfdwmc",
    },
    // {
    //   label: "处分日期",
    //   prop: "cfrq",
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    // {
    //   label: "处分撤销日期",
    //   prop: "cfcxrq",
    //   type: "date",
    //   valueFormat: "yyyy-MM-dd",
    // },
    {
      label: "处分日期-撤销日期",
      prop: "cfrq",
      type: "daterange",
      format: 'yyyy-MM-dd',
      valueFormat: 'yyyy-MM-dd',
      startPlaceholder: '处分日期',
      endPlaceholder: '撤销日期',
      slot: true,
      width: 160,
    },
    {
      label: "处分撤销原因",
      prop: "cfcxyy",
      type: "textarea",
      span: 24,
    },
  ]
}

export const option = {
  border: true,
  searchMenuSpan: 4,
  searchSpan: 6,
  align: 'center',
  labelWidth: 120,
  index: true,
  rowKey: 'areaCode',
  rowParentKey: 'areaCode',
  column: [{
      label: "区域名称",
      prop: "areaName",
      search: true,
    },
    {
      label: "排序号",
      prop: "areaCode",
    },
    {
      label: "区域类型",
      prop: "areaType",
      search: true,
      type: 'select'
    },
    {
      label: "状态",
      prop: "status",
      search: true,
      type: 'select'
    },
    {
      label: "更新时间",
      prop: "updateDate",
    },
    {
      label: "备注信息",
      prop: "remark",
    },
  ]
}

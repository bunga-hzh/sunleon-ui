export const opiton = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 160,
  searchSpan: 7,
  addBtn: false,
  column: [{
      label: '姓名',
      prop: 'xm',
      search: true,
    },
    {
      label: '部门名称',
      prop: 'bmmc',
      search: true,
      type: 'select',
    },
    {
      label: '职工编码',
      prop: 'zgbh',
      search: true,
    },
    {
      label: '证件号码',
      prop: 'zjhm',
      search: true,
    },
    {
      label: '参加工作时间',
      prop: 'cjgzsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      width: 160,
    },
    {
      label: '参加工作年限',
      prop: 'cjgznx',
      type: 'number',
      width: 160,
    },
    {
      label: '进入学校时间',
      prop: 'jrxxsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      width: 160,
    },
    {
      label: '聘任到本岗位时间',
      prop: 'prdbgwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      width: 160,
    },
    {
      label: '任现职务时间',
      prop: 'rxzwsj',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
      width: 160,
    },
    {
      label: '在我校工作年限',
      prop: 'zwxgznx',
      type: 'number',
      width: 160,
    },
    {
      label: '教龄',
      prop: 'jl',
    },
    {
      label: '岗位绩点',
      prop: 'gwjd',
    },
    {
      label: '备注',
      prop: 'bz',
    },
  ]
}

export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  labelWidth: 120,
  column: [{
      label: '编号',
      prop: 'bh',
      search: true,
    },
    {
      label: '名称',
      prop: 'mc',
      search: true,
    },
    {
      label: '开始时间',
      prop: 'kssj',
    },
    {
      label: '结束时间',
      prop: 'jssj',
    },
  ]
}

export const optionChild = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 8,
  labelWidth: 120,
  menuWidth: 120,
  column: [{
      label: '岗位等级',
      prop: 'gwdj',
    },
    {
      label: '工作年限',
      children: [{
          label: '4年以下',
          prop: 'snyx',
        },
        {
          label: '5-9年',
          prop: 'wzjn',
        },
        {
          label: '10-14年',
          prop: 'szssn',
        },
        {
          label: '15-19年',
          prop: 'swzsjn',
        },
        {
          label: '20-24年',
          prop: 'eszessn',
        },
        {
          label: '25-29年',
          prop: 'eswzesjn',
        },
        {
          label: '30-34年',
          prop: 'sszsssn',
        },
        {
          label: '35年及以上',
          prop: 'sswnjys',
          width: 90,
        },
      ]
    }
  ]
}

export const datas = [
  [{}],
  [{}],
  [{}],
  [{}]
]

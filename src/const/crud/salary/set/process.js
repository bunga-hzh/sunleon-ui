export const option = {
  align: 'center',
  border: true,
  index: true,
  indexLabel: '序号',
  searchMenuSpan: 4,
  menuWidth: 280,
  addBtn: false,
  column: [{
      label: '流程名称',
      prop: 'lcmc',
      search: true,
      searchSpan: 7,
    },
    {
      label: '创建时间',
      prop: 'cjsj',
    },
    {
      label: '审核状态',
      prop: 'shzt',
      search: true,
      searchSpan: 7,
      searchslot: true,
      formslot: true,
      slot: true,
    },
    {
      label: '描述',
      prop: 'ms',
    },
  ]
}

export const flowOption = {
  "name": "流程A",
  "nodeList": [{
      "id": "nodeA",
      "name": "流程A-节点A",
      "left": 39,
      "top": 110,
    },
    {
      "id": "nodeB",
      "name": "流程A-节点B",
      "left": 340,
      "top": 161,
    },
    {
      "id": "nodeC",
      "name": "流程A-节点C",
      "left": 739,
      "top": 161,
    },
    {
      "id": "nodeD",
      "name": "节点D",
      "left": 739,
      "top": 20,
    }
  ],
  "lineList": [{
      "from": "nodeA",
      "to": "nodeB"
    },
    {
      "from": "nodeB",
      "to": "nodeC"
    },
    {
      "from": "nodeC",
      "to": "nodeD"
    }
  ]
}

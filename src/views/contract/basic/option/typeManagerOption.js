export const typeManagerOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  editBtn:false,
  delBtn:false,
  index: true,
  menuWidth:280,
  defaultExpandAll:true,
  column: [
    {
      label: '合同类型名称',
      prop: 'htlxMc',
      labelWidth:300,
      align:'left',
      span:24,
      headerAlign: 'left',
    },
    {
      label: '显示货物内容',
      prop: 'xshwnr',
      labelWidth:300,
      value:0,
      type: "radio",
      dicData:[{
        label: '否',
        value: 0
      }, {
        label: '是',
        value: 1
      }]
    },
    {
      label: '创建人',
      prop: 'userName',
      addDisplay:false,
      editDisplay:false
    },
    {
      label: '创建时间',
      prop:'cjsj',
      addDisplay:false,
      editDisplay:false,
    },
    {
      label: '最后修改时间',
      prop:'gxsj',
      addDisplay:false,
      editDisplay:false,
    },
    {
      label: "父级",
      prop:'fjId',
      hide:true,
      addDisplay:false,
      editDisplay:false,
    }
  ]
};

//模板管理
export const templateOption = {
  headerAlign: 'center',
  align: 'center',
  border: true,
  addBtn:false,
  editBtn:false,
  delBtn:false,
  index: true,
  column: [
    {
      label: '模板名称',
      prop: 'wjMc',
    },
    {
      label: '创建人',
      prop: 'userName',
    },
    {
      label: '上传时间',
      prop: 'cjsj',
    },
  ]
};

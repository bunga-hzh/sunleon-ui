export const tableOption = {
  "align": "center",
  "index": true,
  "border": true,
  "searchLabelWidth": 90,
  "column": [{
    "prop": "postType",
    "span": 12,
    "type": "select",
    "label": "岗位类型",
    "props": {"label": "label", "value": "value"},
    "rules": [{"message": "请选择岗位类型", "required": true}],
    "dicUrl": "/admin/dict/type/post_type",
    "display": true,
    "required": true,
  }, {
    "prop": "code",
    "span": 12,
    "type": "input",
    "label": "岗位编码",
    search: true,
    "rules": [{"message": "编码必须填写", "required": true}],
    "required": true,
    "maxlength": 100
  }, {
    "prop": "name",
    "span": 12,
    "type": "input",
    "label": "岗位名称",
    search: true,
    "rules": [{"message": "名称必须填写", "required": true}],
    "required": true,
    "maxlength": 150
  }, {"prop": "personNum", "span": 12, "type": "input", "label": "标配人数"}
    /*, {
      label: '所属部门',
      prop: 'deptId',
      formslot: true,
      slot: true,
      span: 24,
      hide: true,
      dataType:"number",
      rules: [{
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }]
    }*/, {
    "prop": "duty",
    "span": 24,
    "type": "textarea",
    "label": "岗位职责",
    "display": true,
    "maxlength": 500,
    "showWordLimit": true
  }],
  "gutter": 0,
  "stripe": true,
  "menuBtn": true,
  "emptyBtn": true,
  "emptyText": "清空",
  "menuAlign": "center",
  "submitBtn": true,
  "indexLabel": "序号",
  "labelWidth": 120,
  "submitText": "提交",
  "labelSuffix": "：",
  "menuPosition": "center",
  "labelPosition": "left",
  "searchMenuSpan": 6
}

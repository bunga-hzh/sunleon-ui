export const tableOption = {
  "align": "center",
  "index": true,
  "border": true,
  "searchLabelWidth": 90,
  "column": [{
    "prop": "code",
    "span": 12,
    "type": "input",
    search: true,
    "label": "校区编码",
    "rules": [{"message": "校区编码必须填写", "required": true}],
    "required": true,
    "maxlength": 100
  }, {
    "prop": "name",
    "span": 12,
    "type": "input",
    search: true,
    "label": "校区名称",
    "rules": [{"message": "校区名称必须填写", "required": true}],
    "required": true,
    "maxlength": 150
  }, {"prop": "adminUser", "span": 12, "type": "input", "label": "校区负责人"}, {
    "prop": "addr",
    "span": 12,
    "type": "input",
    "label": "地址"
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

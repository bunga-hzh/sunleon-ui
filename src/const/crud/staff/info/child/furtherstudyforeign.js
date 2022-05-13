export const furtherstudyforeignOption = {
  align: 'center',
  border: true,
  menuWidth: 120,
  labelWidth: 160,
  column: [{
      label: "护照证件种类代码",
      prop: 'hzzjzldm',
    },
    {
      label: "护照号/通行证号",
      prop: 'hzhtxzh',
    },
    {
      label: "签发地点",
      prop: 'qfdd',
    },
    {
      label: "签发日期",
      prop: 'qfrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
    {
      label: "签发机关",
      prop: 'qfjg',
    },
    {
      label: "终止日期",
      prop: 'zzrq',
      type: 'date',
      valueFormat: 'yyyy-MM-dd',
    },
  ]
}

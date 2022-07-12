import { dateFormat } from "@/filters/index";

export const option = {
  align: "center",
  border: true,
  index: true,
  selection: true,
  editBtn: false,
  searchMenuSpan: 4,
  column: [
    {
      label: "资料名称",
      prop: "zlmc",
      search: true,
    },
    {
      label: "资料类型",
      prop: "zllx",
      addDisplay: false,
    },
    {
      label: "上传时间",
      prop: "scsj",
      type: "date",
      value: dateFormat(new Date()),
      format: "yyyy年MM月dd日",
      valueFormat: "yyyy-MM-dd",
      addDisplay: false,
      editDisplay: false,
    },
  ],
};

import { dateFormat } from "@/filters/index";

export const option = {
  align: "center",
  border: true,
  editBtn: false,
  delBtn: false,
  columnBtn: false,
  selection: true,
  index: true,
  searchMenuSpan: 4,
  dialogWidth: "40%",
  column: [
    {
      label: "文件分类",
      prop: "wjfl",
      span: 24,
    },
    {
      label: "文件名称",
      prop: "wjmc",
      span: 24,
    },
    {
      label: "文件类型",
      prop: "wjlx",
      addDisplay: false,
      editDisplay: false,
    },
    {
      label: "上传人",
      prop: "scr",
      addDisplay: false,
      editDisplay: false,
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
    {
      label: "上传文件",
      prop: "scwj",
      type: "upload",
      hide: true,
    },
  ],
};

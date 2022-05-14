<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud :option="option" :data="data" :page.sync="page"> </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/personnel/info";

export default {
  name: "TableEngage",
  data() {
    return {
      // 数据源
      data: [
        {
          gh: "10086",
          xm: "张三",
          orgId: 1,
          bzlx: "事业编制",
          rylx: "在职人员",
          jslx: "外聘教师",
          rzrq: "2022-02-02",
        },
      ],
      option: option,
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border: #eee solid 1px;
  line-height: 40px;
  th {
    font-size: 16px;
    font-family: Medium;
    padding-left: 5px;
    background-color: rgba(242, 242, 242, 1);
  }
  td {
    padding-left: 5px;
    font-size: 14px;
    font-family: Base;
  }
}
/*  dialog*/
.el-dialog__header {
  padding: 15px 20px 15px;
}
.el-dialog__headerbtn {
  top: 15px;
}
/deep/.avue-crud__dialog__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
/deep/.el-dialog__title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  word-wrap: break-word;
}
/deep/.avue-crud__dialog__menu {
  padding-right: 20px;
  float: left;
}
/deep/.avue-crud__dialog__menu i {
  color: #909399;
  font-size: 15px;
}
/deep/.el-icon-full-screen {
  cursor: pointer;
  margin-bottom: 20px;
}
/deep/.el-icon-full-screen:before {
  content: "\e719";
}
</style>

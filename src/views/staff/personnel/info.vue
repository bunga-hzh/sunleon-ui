<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
        <template slot="zyzgzs_details" slot-scope="scpoe">
          <el-button type="text" @click="view(scpoe.row, 'zy')">查看</el-button>
        </template>
        <template slot="dqzzgzbj_details" slot-scope="scpoe">
          <el-button type="text" @click="view(scpoe.row, 'dq')">查看</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <avue-crud :option="childOption" :data="childData"></avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  data,
  option,
  childOption,
  childData,
} from "@/const/crud/staff/personnel/info";

export default {
  name: "TableEngage",
  data() {
    return {
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: data,
      // crud配置对象
      option: option,
      // 搜索的表单对象
      search: {},
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      childOption: childOption[0],
      childData: childData[0],
    };
  },
  methods: {
    view(row,type) {
      if(type === 'zy'){
        this.childOption = childOption[0]
        this.childData = childData[0]
      }
      if(type === 'dq'){
        this.childOption = childOption[1]
        this.childData = childData[1]
      }
      this.dialogVisible = true;
    },
  },
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

<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
        v-model="form"
      >
        <template slot="objIdSearch">
          <el-select v-model="search.objId" placeholder="请选择">
            <el-option
              v-for="item in objIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="objIdForm">
          <el-select v-model="form.objId" placeholder="请选择">
            <el-option
              v-for="item in objIdOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="xbmForm">
          <div>
            <el-radio v-model="form.xbm" label="1">男</el-radio>
            <el-radio v-model="form.xbm" label="2">女</el-radio>
          </div>
        </template>
        <template slot="csrqForm">
          <el-date-picker
            v-model="form.csrq"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
        <template slot="cjgznyForm">
          <el-date-picker
            v-model="form.cjgzny"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
        <template slot="hqrqnyrForm">
          <el-date-picker
            v-model="form.hqrqnyr"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
        <template slot="zyzgzsxgxq" slot-scope="scpoe">
          <el-button type="text" @click="view(scpoe.row, 'zyzgzsxgxq')"
            >查看</el-button
          >
        </template>
        <template slot="dqzzgbj" slot-scope="scpoe">
          <el-button type="text" @click="view(scpoe.row, 'dqzzgbj')"
            >查看</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <avue-crud :option="childOption" :data="childData" v-model="child_form">
        <template slot="hqrqnyrForm">
          <el-date-picker
            v-model="child_form.hqrqnyr"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
        <template slot="rzrqnyrForm">
          <el-date-picker
            v-model="child_form.rzrqnyr"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </template>
      </avue-crud>
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
} from "@/const/crud/staff/personnel/external";

export default {
  name: "TableEngage",
  data() {
    return {
      // 表单对象
      form: {},
      child_form: {},
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
      // 选择器对象
      objIdOptions: [{ value: "1", label: "部门" }],
    };
  },
  methods: {
    view(row, type) {
      if (type === "zyzgzsxgxq") {
        this.childOption = childOption[0];
        this.childData = childData[0];
      }
      if (type === "dqzzgbj") {
        this.childOption = childOption[1];
        this.childData = childData[1];
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

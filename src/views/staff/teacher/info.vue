<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud ref="crud"
                 :option="option"
                 :data="data"
                 :page.sync="page"
                 :table-loading="showLoading"
                 @on-load="onLoad"
                 @row-del="rowDel"
                 @refresh-change="refreshChange"
                 @search-change="searchChange">
        <template slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click="add">添加</el-button>
          <!-- <el-button type="primary"
                     icon="el-icon-upload2"
                     size="small"
                     @click="getStaffId">获得staffId</el-button> -->
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button type="text"
                     icon="el-icon-edit"
                     size="small"
                     @click="editRow(scope.row)">编辑</el-button>
          <el-button type="text"
                     icon="el-icon-edit"
                     size="small"
                     @click="viewRow(scope.row)">查看</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <!-- 添加对话框 -->
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               width="60%"
               :fullscreen="dialogFull"
               @close="closeDialog">
      <template slot="title">
        <div class="avue-crud__dialog__header">
          <span class="el-dialog__title"> 添加 </span>
          <div class="avue-crud__dialog__menu"
               @click="dialogFull ? (dialogFull = false) : (dialogFull = true)">
            <i class="el-icon-full-screen"></i>
          </div>
        </div>
      </template>

      <el-tabs ref="tabs"
               v-model="activeName"
               type="card"
               @tab-click="tabChange">
        <el-tab-pane label="人员基本情况"
                     name="info">
          <info />
          <el-collapse v-model="collapseActiveName"
                       @change="collapseActive"
                       accordion>
            <el-collapse-item title="学历及学位子集"
                              name="xljxw">
              <xljxw />
            </el-collapse-item>
            <el-collapse-item title="个人履历子集（校外）"
                              name="grll">
              <grll />
            </el-collapse-item>
            <el-collapse-item title="家属子集"
                              name="family">
              <family />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="任职信息"
                     name="office">
          <office />
          <el-collapse v-model="collapseActiveName"
                       @change="collapseActive"
                       accordion>
            <el-collapse-item title="校内职务表"
                              name="leader">
              <leader />
            </el-collapse-item>
            <el-collapse-item title="专业技术职务子集"
                              name="professionduty">
              <professionduty />
            </el-collapse-item>
            <el-collapse-item title="工人技术等级及职务子集"
                              name="workerskillgrade">
              <workerskillgrade />
            </el-collapse-item>
            <el-collapse-item title="社会兼职子集"
                              name="parttimejob">
              <parttimejob />
            </el-collapse-item>
            <el-collapse-item title="服务协议子集"
                              name="servicetoenterprise">
              <servicetoenterprise />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="年度考核"
                     name="examine">
          <examine />
        </el-tab-pane>
        <el-tab-pane label="教师发展信息"
                     name="jsfzxx">
          <jsfzxx />
          <el-collapse v-model="collapseActiveName"
                       @change="collapseActive"
                       accordion>

            <el-collapse-item title="职业资格证子集"
                              name="certificate">
              <certificate />
            </el-collapse-item>
            <el-collapse-item title="教师资格证子集"
                              name="jszgz">
              <jszgz />
            </el-collapse-item>
            <el-collapse-item title="教育培训子集"
                              name="train">
              <train />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息"
                     name="punish_reward">
          <punish />
          <reward />
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息"
                     name="salary">
          <salary />
        </el-tab-pane>
        <el-tab-pane label="财务信息"
                     name="bankno">
          <bankno />
        </el-tab-pane>
        <el-tab-pane label="其他信息"
                     name="other">
          <el-collapse v-model="collapseActiveName"
                       @change="collapseActive"
                       accordion>
            <el-collapse-item title="因公/因私护照"
                              name="furtherstudyforeign">
              <furtherstudyforeign />
            </el-collapse-item>
            <el-collapse-item title="组织考察（考核）子集"
                              name="organiseinspect">
              <organiseinspect />
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { option } from "@/const/crud/staff/teacher/info";

import { fetchList, delObj } from "@/api/staff/crud";

import info from "./teacherInfo/view/info";
import office from "./teacherInfo/view/office";
import examine from "./teacherInfo/view/examine";
import jsfzxx from "./teacherInfo/view/jsfzxx";
import punish from "./teacherInfo/view/punish";
import reward from "./teacherInfo/view/reward";
import salary from "./teacherInfo/view/salary";
import bankno from "./teacherInfo/view/bankno";

import xljxw from "./teacherInfo/child/view/xljxw";
import grll from "./teacherInfo/child/view/grll";
import family from "./teacherInfo/child/view/family";
import leader from "./teacherInfo/child/view/leader";
import professionduty from "./teacherInfo/child/view/professionduty";
import workerskillgrade from "./teacherInfo/child/view/workerskillgrade";
import parttimejob from "./teacherInfo/child/view/parttimejob";
import servicetoenterprise from "./teacherInfo/child/view/servicetoenterprise";
import jszgz from "./teacherInfo/child/view/jszgz";
import certificate from "./teacherInfo/child/view/certificate";
import train from "./teacherInfo/child/view/train";
import furtherstudyforeign from "./teacherInfo/child/view/furtherstudyforeign";
import organiseinspect from "./teacherInfo/child/view/organiseinspect";

export default {
  name: "TableEngage",
  data() {
    return {
      title: undefined,
      // 标签页激活项
      activeName: "info",
      // 折叠面板激活项
      collapseActiveName: undefined,
      // 控制弹窗全屏
      dialogFull: false,
      // 表格是否转圈
      showLoading: false,
      // 控制对话框的显示与隐藏
      dialogVisible: false,

      // 数据源
      data: undefined,
      // 表格配置对象
      option: option,
      // 分页对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    ...mapGetters({ dialogType: "getDialogType", staffId: "getStaffId" }),
    ...mapMutations([
      "emptyStaffId",
      "setStaffId",
      "setDialogType",
      "emptyDialogType",
      "setActiveItem",
      "emptyActiveItem",
      "setData",
      "emptyData",
      "setObj",
      "emptyObj",
    ]),
  },
  methods: {
    // getStaffId() {
    //   this.$store.commit("setStaffId", 1);
    //   this.$message.success("获得成功!");
    // },
    // 加载表格
    onLoad(page) {
      this.get(page);
    },
    // 刷新
    refreshChange() {
      this.get(this.page);
    },
    // 获取表格数据
    async get(page, form) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "info",
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          form
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data.records;
      this.page.total = res.data.total;
      this.showLoading = false;
    },
    // 搜索
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.get(this.page, form);
      done();
    },
    // 删除教职工基本信息
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("info", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.get(this.page);
        })
        .catch(() => {});
    },

    // 关闭对话框
    closeDialog() {
      this.$store.commit("emptyStaffId");
      this.$store.commit("emptyDialogType");
      this.$store.commit("emptyActiveItem");
      this.$store.commit("emptyData");
      this.$store.commit("emptyObj");
      this.activeName = "info";
      this.collapseActiveName = undefined;
      this.get(this.page);
    },

    // 添加按钮
    add() {
      this.title = "添加";
      this.$store.commit("setDialogType", "add");
      this.dialogVisible = true;
    },
    // 编辑行信息
    editRow(row) {
      this.title = "编辑";
      this.$store.commit("setStaffId", row.id);
      this.$store.commit("setDialogType", "edit");
      this.$store.commit("setObj", row);
      this.$store.commit("setActiveItem", "info");
      this.dialogVisible = true;
    },
    // 查看行信息
    viewRow(row) {
      this.title = "查看";
      this.$store.commit("setStaffId", row.id);
      this.$store.commit("setDialogType", "view");
      this.$store.commit("setObj", row);
      this.$store.commit("setActiveItem", "info");
      this.dialogVisible = true;
    },

    // 标签切换 触发
    async tabChange(tab) {
      if (this.dialogType === "add") return;
      if (tab.name === "other") return;
      if (tab.name === "punish_reward") {
        this.$store.commit("setActiveItem", tab.name);
        return;
      }
      const { data: res } = await fetchList(tab.name, {
        current: 1,
        size: 1,
        staffId: this.staffId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$store.commit("setActiveItem", tab.name);
      this.$store.commit("setObj", res.data.records[0]);
    },

    // 折叠面板激活事件
    async collapseActive(activeName) {
      if (this.dialogType === "add") return;
      if (!activeName) return true;
      this.$store.commit("setActiveItem", activeName);
    },
  },
  components: {
    info,
    office,
    examine,
    jsfzxx,
    punish,
    reward,
    salary,
    bankno,
    xljxw,
    grll,
    family,
    leader,
    professionduty,
    workerskillgrade,
    parttimejob,
    servicetoenterprise,
    jszgz,
    certificate,
    train,
    furtherstudyforeign,
    organiseinspect,
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px;
}
table {
  width: 100%;
  line-height: 40px;
  border: #eee solid 1px;
  th {
    padding-left: 5px;
    background-color: #56bf99;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ffffff;
    .title {
      font-size: 16px;
      font-family: Medium;
    }
  }
  td {
    padding-left: 5px;
    font-size: 14px;
    font-family: Base;
    position: relative;
  }
}
/*  dialog*/
.el-dialog__header {
  padding: 15px 20px 15px;
}
.el-dialog__headerbtn {
  top: 15px;
}
::v-deep.avue-crud__dialog__header {
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
::v-deep.el-dialog__title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  word-wrap: break-word;
}
::v-deep.avue-crud__dialog__menu {
  padding-right: 20px;
  float: left;
}
::v-deep.avue-crud__dialog__menu i {
  color: #909399;
  font-size: 15px;
}
::v-deep.el-icon-full-screen {
  cursor: pointer;
  margin-bottom: 20px;
}
::v-deep.el-icon-full-screen:before {
  content: "\e719";
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload_p {
  font-size: 18px;
  font-family: large;
}
</style>

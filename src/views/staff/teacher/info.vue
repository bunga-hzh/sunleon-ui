<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud :option="option"
                 :data="data"
                 :page.sync="page"
                 :table-loading="showLoading"
                 @on-load="get"
                 @row-del="rowDel"
                 @refresh-change="get"
                 @search-change="searchChange">
        <template slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click="add">添加</el-button>
          <el-button type="primary"
                     icon="el-icon-download"
                     size="small">导出</el-button>
          <el-button type="primary"
                     icon="el-icon-upload2"
                     size="small">导入</el-button>
          <el-button type="primary"
                     icon="el-icon-upload2"
                     size="small"
                     @click="getStaffId">获得staffId</el-button>
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

      <el-tabs v-model="activeName"
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
            <el-collapse-item title="教师资格证子集"
                              name="jszgz">
              <jszgz />
            </el-collapse-item>
            <el-collapse-item title="职业资格证子集"
                              name="certificate">
              <certificate />
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

import { fetchList } from "@/api/staff/crud";
import { get, del } from "@/const/staff/crud";

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
      // 用户id
      staffId: undefined,
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
        current: 1,
        size: 10,
      },

      xljxw: [],
    };
  },
  computed: {
    ...mapGetters(["getDialogType"]),
    ...mapMutations([
      "emptyStaffId",
      "setStaffId",
      "setDialogType",
      "emptyDialogType",
    ]),
  },
  methods: {
    getStaffId() {
      this.$store.commit("setStaffId", 1);
      this.$message.success("获得成功!");
    },
    // 获取表格数据
    async get(form) {
      this.showLoading = true;
      const { data: res } = await get("info", this.page, form);
      if (res.code !== 0)
        return this.$message.error("获取数据失败！--" + res.msg);
      this.data = res.data.records;
      this.page.total = res.data.total;
      this.showLoading = false;
    },
    // 搜索
    searchChange(form, done) {
      this.page.current = 1;
      this.get(form);
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
          const { data: res } = await del("info", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.get();
        })
        .catch(() => {});
    },

    // 关闭对话框
    closeDialog() {
      this.$store.commit("emptyStaffId");
      this.$store.commit("emptyDialogType");
      this.activeName = "info";
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
      this.$store.commit("setDialogType", "edit");
      this.dialogVisible = true;
    },
    // 查看行信息
    viewRow(row) {
      this.title = "查看";
      this.$store.commit("setDialogType", "view");
      this.dialogVisible = true;
    },

    // 标签切换 触发
    tabChange(tab) {
      console.log(tab.name);
    },

    // // 折叠面板激活事件
    async collapseActive(activeName) {
      if (this.getDialogType === "add") return;
      if (!activeName) return true;
      console.log(this[`${activeName}`]);
      return;
      const { data: res } = await fetchList("info", {
        current: 1,
        size: 20,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      // this.$store.commit('setActiveName',res.data.records)
      // this.$store.commit('setData',res.data.records)
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

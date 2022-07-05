<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-button v-if="showDept"
                       type="primary"
                       icon="el-icon-data-line"
                       @click="showCount()">
              统计
            </el-button>
            <el-button v-if="showExport"
                       type="success"
                       icon="el-icon-download"
                       @click="exportData()">
              导出
            </el-button>
          </el-col>
          <el-col :span="18"
                  align="right"
                  class="search_wrap">
            <el-select v-model="yearId"
                       placeholder="选择年份"
                       class="w_150">
              <el-option v-for="item in allYears"
                         :key="item.oid"
                         :label="item.value"
                         :value="item.oid" />
            </el-select>
            <el-select v-if="showDept"
                       v-model="deptId"
                       placeholder="选择部门"
                       class="w_150 m_l_10"
                       clearable>
              <el-option v-for="item in allDepts"
                         :key="item.oid"
                         :label="item.value"
                         :value="item.oid" />
            </el-select>
            <el-input v-model="key"
                      placeholder="姓名"
                      class="w_150 m_l_10"
                      clearable />
            <el-button type="primary"
                       icon="el-icon-search"
                       class="m_l_10"
                       @click="query">
              查询
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="$store.state.loading"
                element-loading-text="加载中，请稍后"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="staffRecords"
                style="width: 100%"
                border>
        <el-table-column type="index"
                         label="序号"
                         width="50"
                         align="center"
                         fixed />
        <el-table-column prop="yearName"
                         label="考核年份"
                         align="center" />
        <el-table-column prop="deptName"
                         label="部门"
                         align="center" />
        <el-table-column prop="userName"
                         label="人员"
                         align="center" />
        <el-table-column label="类别"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.userType == 1">
              在职在编
            </div>
            <div v-if="scope.row.userType == 2">
              编外运行
            </div>
            <div v-if="scope.row.userType == 3">
              行政外聘
            </div>
          </template>
        </el-table-column>
        <el-table-column label="等级"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.score == 1">
              A级
            </div>
            <div v-if="scope.row.score == 2">
              B级
            </div>
            <div v-if="scope.row.score == 3">
              C级
            </div>
            <div v-if="scope.row.score == 4">
              D级
            </div>
          </template>
        </el-table-column>
        <el-table-column v-if="showDept"
                         label="调整后"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.adjustScore == 1">
              A级
            </div>
            <div v-if="scope.row.adjustScore == 2">
              B级
            </div>
            <div v-if="scope.row.adjustScore == 3">
              C级
            </div>
            <div v-if="scope.row.adjustScore == 4">
              D级
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否退休"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.retire == 1">
              是
            </div>
            <div v-else-if="scope.row.retire == 2">
              否
            </div>
            <div v-else />
          </template>
        </el-table-column>
        <el-table-column prop="note"
                         label="备注"
                         align="center" />
        <el-table-column v-if="showExportAdjust"
                         label="操作"
                         align="center">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="adjustScore(scope.row)">
              <i class="el-icon-edit-outline" />
              调整
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="调整等级"
               :visible.sync="dialogVisible">
      <el-form ref="score"
               :model="score">
        <el-form-item prop="adjustScore">
          <el-select v-model="score.adjustScore"
                     class="block"
                     placeholder="请选择调整后的等级"
                     clearable>
            <el-option v-for="item in grades"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="saveAdjustScore">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="数据统计"
               :visible.sync="countVisible">
      <el-table :data="staffCounts"
                style="width:100%;max-height:400px;overflow-y:auto;"
                border>
        <el-table-column prop="deptName"
                         label="部门" />
        <el-table-column prop="totalA"
                         label="A" />
        <el-table-column prop="totalB"
                         label="B" />
        <el-table-column prop="count"
                         label="小计" />
      </el-table>
    </el-dialog>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
export default {
  name: "Staff",
  data() {
    return {
      key: null,
      yearId: null,
      deptId: null,
      allYears: [],
      allDepts: [],
      staffRecords: [],
      score: {
        oid: null,
        adjustScore: null,
      },
      dialogVisible: false,
      grades: [
        {
          value: 1,
          label: "A级",
        },
        {
          value: 2,
          label: "B级",
        },
        {
          value: 3,
          label: "C级",
        },
        {
          value: 4,
          label: "D级",
        },
      ],
      staffCounts: [],
      countVisible: false,
      showExportAdjust: false,
      showDept: false,
      showExport: false,
    };
  },
  watch: {
    yearId: function () {
      this.query();
    },
    deptId: function () {
      this.query();
    },
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.loadAllYear();
    this.loadAllDept();
    const roleIds = this.$store.state.user.roleIds;
    if (roleIds.indexOf("6") >= 0) {
      this.deptId = null;
      this.showDept = true;
      this.showExportAdjust = true;
      this.showExport = true;
    } else if (roleIds.indexOf("8") >= 0) {
      this.deptId = null;
      this.showDept = true;
    } else if (roleIds.indexOf("1") >= 0) {
      this.deptId = null;
      this.showDept = true;
      this.showExportAdjust = false;
      this.showExport = false;
    } else if (roleIds.indexOf("2") >= 0) {
      this.deptId = this.$store.state.user.deptId;
      this.showDept = false;
      this.showExportAdjust = false;
      this.showExport = true;
    }
  },
  methods: {
    loadAllYear() {
      this.$http.get("/year/all").then((res) => {
        if (res.data.code == 0) {
          this.allYears = res.data.data;
        }
      });
    },
    loadAllDept() {
      this.$http.get("/dept/all").then((res) => {
        if (res.data.code == 0) {
          this.allDepts = res.data.data;
        }
      });
    },
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/count/staffData", {
          params: {
            yearId: this.yearId,
            deptId: this.deptId,
            key: this.key,
          },
        })
        .then((res) => {
          this.staffRecords = res.data.data;
          this.$store.commit("setLoading", false);
        });
    },
    adjustScore(row) {
      this.score.oid = row.oid;
      this.score.adjustScore = row.adjustScore;
      this.dialogVisible = true;
    },
    saveAdjustScore() {
      this.$http.post("/count/adjustScore", this.score).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.message);
          this.dialogVisible = false;
          this.query();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    exportData() {
      this.$http
        .post(
          "/download/exportStaff/",
          {
            yearId: this.yearId,
            deptId: this.deptId,
          },
          {
            responseType: "blob",
          }
        )
        .then((res) => {
          const fileName =
            decodeURI(
              res.headers["content-disposition"].split(";")[1].split("=")[1]
            ) || "员工绩效考核表.xls";
          const blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8",
          });
          if ("download" in document.createElement("a")) {
            let url = window.URL.createObjectURL(blob);
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            // 下载完成移除元素
            document.body.removeChild(link);
            // 释放掉blob对象
            window.URL.revokeObjectURL(url);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error("下载失败，请稍后重试");
        });
    },
    showCount() {
      this.$http
        .get("/count/staffCount", {
          params: {
            yearId: this.yearId,
          },
        })
        .then((res) => {
          this.staffCounts = res.data.data;
          this.countVisible = true;
        });
    },
  },
};
</script>
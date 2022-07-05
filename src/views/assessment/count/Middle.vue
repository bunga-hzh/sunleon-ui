<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col v-if="showExportAdjust"
                  :span="6">
            <el-button v-if="showGenBtn"
                       type="primary"
                       icon="el-icon-circle-check"
                       @click="generateData()">
              生成
            </el-button>
            <el-button type="success"
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
            <el-select v-model="deptId"
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
                :data="middleRecords"
                style="width: 100%"
                border
                stripe>
        <el-table-column prop="yearName"
                         align="center"
                         label="考核年份"
                         fixed />
        <el-table-column prop="deptName"
                         label="系处"
                         align="center"
                         width="100" />
        <el-table-column prop="userName"
                         label="姓名"
                         align="center"
                         width="90" />
        <el-table-column prop="qzcp"
                         label="群众测评"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.qzcprs > 1"
                 @click="showAssessItem(scope.row, 4)">
              {{ scope.row.qzcp }}
            </div>
            <div v-else>
              {{ scope.row.qzcp }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="调整后"
                         align="center">
          <template slot-scope="scope">
            <div>
              {{ scope.row.adjustQzcp }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="zphp"
                         label="干部自评、互评"
                         align="center"
                         width="130">
          <template slot-scope="scope">
            <div v-if="scope.row.zphprs > 1"
                 class="link"
                 @click="showAssessItem(scope.row, 3)">
              {{ scope.row.zphp }}
            </div>
            <div v-else>
              {{ scope.row.zphp }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="fgld"
                         label="分管领导评价"
                         align="center"
                         width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.fgldrs > 1"
                 class="link"
                 @click="showAssessItem(scope.row, 2)">
              {{ scope.row.fgld }}
            </div>
            <div v-else>
              {{ scope.row.fgld }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="dzld"
                         label="党政领导班子评价"
                         align="center"
                         width="150">
          <template slot-scope="scope">
            <div v-if="scope.row.dzldrs > 1"
                 class="link"
                 @click="showAssessItem(scope.row, 1)">
              {{ scope.row.dzld }}
            </div>
            <div v-else>
              {{ scope.row.dzld }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="score"
                         label="合计"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.score < 60"
                 class="red">
              {{ scope.row.score }}
            </div>
            <div v-else>
              {{ scope.row.score }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="调整后"
                         align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.adjustScore < 60"
                 class="red">
              {{ scope.row.adjustScore }}
            </div>
            <div v-else>
              {{ scope.row.adjustScore }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="60"
                         label="排名"
                         align="center">
          <template slot-scope="scope">
            {{ scope.row.rank }}
          </template>
        </el-table-column>
        <el-table-column v-if="showExportAdjust"
                         width="190"
                         label="操作"
                         align="center"
                         fixed="right">
          <template slot-scope="scope">
            <el-button v-if="scope.row.oid > 0"
                       :disabled="scope.row.qzcp > 0"
                       type="text"
                       size="small"
                       @click="adjustQzcp(scope.row)">
              <i class="el-icon-edit-outline" />
              调整群众测评
            </el-button>
            <el-button v-if="scope.row.oid > 0"
                       type="text"
                       size="small"
                       @click="adjustScore(scope.row)">
              <i class="el-icon-edit-outline" />
              调整总分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="title"
               :visible.sync="dialogVisible">
      <el-form ref="score"
               :model="score">
        <el-form-item v-if="showAdjustScore"
                      prop="adjustScore">
          <el-input v-model="score.adjustScore"
                    clearable
                    placeholder="请填写调整后的分数" />
        </el-form-item>
        <el-form-item v-if="showAdjustQzcp"
                      prop="adjustQzcp">
          <el-input v-model="score.adjustQzcp"
                    clearable
                    placeholder="请填写调整后的分数" />
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
    <el-dialog title="评分详细"
               :visible.sync="itemVisible">
      <el-table :data="assessItems"
                style="width: 100%"
                border>
        <el-table-column prop="userName"
                         label="姓名" />
        <el-table-column prop="deptName"
                         label="系处" />
        <el-table-column prop="score"
                         label="评分" />
      </el-table>
    </el-dialog>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import { OPER_TYPE } from "@/util/assessment/constants";
export default {
  name: "Middle",
  data() {
    return {
      key: null,
      yearId: null,
      deptId: null,
      allYears: [],
      allDepts: [],
      middleRecords: [],
      dialogVisible: false,
      score: {
        oid: null,
        adjustScore: null,
        adjustQzcp: null,
      },
      itemVisible: false,
      assessItems: [],
      showExportAdjust: false,
      showGenBtn: false,
      title: null,
      showAdjustScore: false,
      showAdjustQzcp: false,
      adjustUrl: "/count/adjustAssessScore",
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
    this.loadAllYear();
    this.loadAllDept();
    this.yearId = this.$store.state.user.yearId;
    this.position = this.$store.state.user.position;
    const roleIds = this.$store.state.user.roleIds;
    if (roleIds.indexOf("6") >= 0) {
      this.showExportAdjust = true;
      this.adjustWidth = 180;
      this.queryGenerateRes();
    }
  },
  methods: {
    changeShow(show) {
      this.show = show;
    },
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
    queryGenerateRes() {
      this.$http
        .get("/config/operData", {
          params: {
            yearId: this.yearId,
            operType: OPER_TYPE.RESULT,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.showGenBtn = false;
          } else {
            this.showGenBtn = true;
          }
        });
    },
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/count/middleData", {
          params: {
            yearId: this.yearId,
            deptId: this.deptId,
            key: this.key,
          },
        })
        .then((res) => {
          this.middleRecords = res.data.data;
          this.$store.commit("setLoading", false);
        });
    },
    generateData() {
      this.$confirm("确定考核已结束并生成考核结果吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/count/generate", {
            yearId: this.yearId,
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.message);
              this.query();
            } else {
              this.$message.error(res.data.message);
            }
          });
      });
    },
    exportData() {
      this.$http
        .post("/download/exportResult/" + this.yearId, null, {
          responseType: "blob",
        })
        .then((res) => {
          const fileName =
            decodeURI(
              res.headers["content-disposition"].split(";")[1].split("=")[1]
            ) || "绩效考核总表.xls";
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
    adjustScore(row) {
      this.score.oid = row.oid;
      this.score.adjustScore = row.adjustScore;
      this.score.adjustQzcp = null;
      this.showAdjustQzcp = false;
      this.showAdjustScore = true;
      this.title = "调整总分";
      this.adjustUrl = "/count/adjustAssessScore";
      this.dialogVisible = true;
    },
    adjustQzcp(row) {
      this.score.oid = row.oid;
      this.score.adjustQzcp = row.adjustQzcp;
      this.score.adjustScore = null;
      this.showAdjustScore = false;
      this.showAdjustQzcp = true;
      this.title = "调整群众测评分数";
      this.adjustUrl = "/count/adjustAssessQzcp";
      this.dialogVisible = true;
    },
    saveAdjustScore() {
      this.$http.post(this.adjustUrl, this.score).then((res) => {
        if (res.data.code == 0) {
          this.$message.success(res.data.message);
          this.dialogVisible = false;
          this.query();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    showAssessItem(row, assessType) {
      this.$http
        .get("/count/assessItems", {
          params: {
            yearId: row.yearId,
            userId: row.userId,
            assessType: assessType,
          },
        })
        .then((res) => {
          this.assessItems = res.data.data;
          this.itemVisible = true;
        });
    },
  },
};
</script>
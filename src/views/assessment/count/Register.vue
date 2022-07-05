<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col v-if="showExportAdjust"
                  :span="6">
            <el-button type="primary"
                       icon="el-icon-s-promotion"
                       :disabled="selectedRows.length === 0"
                       @click="regVia">
              通过
            </el-button>
            <el-button type="danger"
                       icon="el-icon-refresh-right"
                       :disabled="selectedRows.length === 0"
                       @click="regBack">
              退回
            </el-button>
          </el-col>
          <el-col :span="18"
                  align="right"
                  class="search_wrap">
            <el-select v-model="yearId"
                       placeholder="选择年份"
                       class="w_120">
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
            <el-select v-if="showState"
                       v-model="state"
                       placeholder="选择状态"
                       class="w_120 m_l_10"
                       clearable>
              <el-option :label="'待评鉴'"
                         :value="1" />
              <el-option :label="'待审核'"
                         :value="2" />
              <el-option :label="'已通过'"
                         :value="3" />
              <el-option :label="'已退回'"
                         :value="4" />
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
                :data="pager.records"
                style="width: 100%"
                border
                stripe
                highlight-current-row
                @selection-change="onSelectionChange">
        <el-table-column v-if="showExportAdjust"
                         type="selection"
                         width="55"
                         align="center"
                         :selectable="checkSelectable" />
        <el-table-column prop="yearName"
                         label="所属年份"
                         align="center" />
        <el-table-column prop="userName"
                         label="姓名"
                         align="center" />
        <el-table-column prop="deptName"
                         label="所在部门"
                         align="center" />
        <el-table-column prop="position"
                         label="现任职务"
                         align="center" />
        <el-table-column prop="job"
                         label="负责工作"
                         align="center" />
        <el-table-column prop="state"
                         label="状态"
                         align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state == 1"
                    :type="'primary'">
              待评鉴
            </el-tag>
            <el-tag v-if="scope.row.state == 2"
                    :type="'success'">
              待审核
            </el-tag>
            <el-tag v-if="scope.row.state == 3"
                    :type="'success'">
              已通过
            </el-tag>
            <el-tag v-if="scope.row.state == 4"
                    :type="'warning'">
              已退回
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="提交时间"
                         width="150"
                         align="center">
          <template slot-scope="scope">
            {{ scope.row.createTime | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         :width="adjustWidth"
                         align="center"
                         fixed="right">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="view(scope.row)">
              <i class="el-icon-info" />
              详细
            </el-button>
            <el-button v-if="showExportAdjust"
                       :disabled="scope.row.state !== 2"
                       type="text"
                       size="small"
                       @click="regVia(scope.row)">
              <i class="el-icon-s-promotion" />
              通过
            </el-button>
            <el-button v-if="showExportAdjust"
                       :disabled="scope.row.state !== 2"
                       type="text"
                       size="small"
                       @click="regBack(scope.row)">
              <i class="el-icon-refresh-right" />
              退回
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="pager.current"
                     :page-size="pager.size"
                     :total="pager.total"
                     class="pagination text-right"
                     :page-sizes="$store.state.paginationPageSizes"
                     :layout="$store.state.paginationLayout"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import { REG_STATE } from "@/util/assessment/constants";
export default {
  name: "Register",
  data() {
    return {
      state: null,
      key: null,
      yearId: null,
      deptId: null,
      allYears: [],
      allDepts: [],
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      adjustWidth: 100,
      showExportAdjust: false,
      showDept: true,
      showState: true,
      rangeDept: null,
    };
  },
  watch: {
    yearId: function () {
      this.query();
    },
    deptId: function () {
      this.query();
    },
    state: function () {
      this.query();
    },
  },
  mounted() {
    this.loadAllYear();
    this.loadAllDept();
    this.yearId = this.$store.state.user.yearId;
    this.rangeDept = this.$store.state.user.deptId;
    const roleIds = this.$store.state.user.roleIds;
    if (roleIds.indexOf("3") >= 0) {
      this.showDept = false;
      this.showState = false;
    }
    if (roleIds.indexOf("2") >= 0) {
      this.showDept = false;
      this.showState = false;
    }
    if (roleIds.indexOf("1") >= 0) {
      this.showDept = true;
      this.showState = false;
    }
    if (roleIds.indexOf("8") >= 0) {
      this.showDept = true;
      this.showState = false;
    }
    if (roleIds.indexOf("6") >= 0) {
      this.showDept = true;
      this.showState = true;
      this.adjustWidth = 180;
      this.showExportAdjust = true;
      this.rangeDept = null;
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
        .get("/reg/list", {
          params: {
            yearId: this.yearId,
            deptId: this.deptId,
            rangeDept: this.rangeDept,
            state: this.state,
            key: this.key,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.pager = res.data.data;
            this.$store.commit("setLoading", false);
          }
        });
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map((item) => item.oid);
    },
    handleSizeChange: function (size) {
      this.current = 1;
      this.pager.current = 1;
      this.size = size;
      this.query();
    },
    handleCurrentChange: function (current) {
      this.current = current;
      this.query();
    },
    checkSelectable(row) {
      return row.state == 2;
    },
    view(row) {
      this.$router.push({
        path: "/count/viewReg",
        query: {
          oid: row.oid,
        },
      });
    },
    regVia(row) {
      let ids = "";
      if (row.oid) {
        ids = row.oid;
      } else {
        if (this.selectedRows === 0) {
          this.$message.error("请选择后点击通过");
          return;
        } else {
          ids = this.selectedRows.join(",");
        }
      }
      this.$confirm("确定通过此考核登记信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/reg/batch", {
            ids: ids,
            state: REG_STATE.SUCCESS,
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
    regBack(row) {
      let ids = "";
      if (row.oid) {
        ids = row.oid;
      } else {
        if (this.selectedRows === 0) {
          this.$message.error("请选择后点击退回");
          return;
        } else {
          ids = this.selectedRows.join(",");
        }
      }
      this.$confirm("确定退回此考核登记信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/reg/batch", {
            ids: ids,
            state: REG_STATE.BACK,
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
  },
};
</script>

<template>
  <div>
    <div class="m_b_20">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-button type="primary"
                     icon="el-icon-plus"
                     @click="add">
            新增
          </el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     :disabled="selectedRows.length === 0"
                     @click="remove">
            删除
          </el-button>
        </el-col>
        <el-col :span="16"
                align="right">
          <el-select v-model="yearId"
                     placeholder="选择考核年份"
                     class="w_200">
            <el-option v-for="item in allYears"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
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
      <el-table-column type="selection"
                       width="55"
                       align="center"
                       fixed />
      <el-table-column prop="yearName"
                       label="考核年份" />
      <el-table-column prop="userName"
                       label="员工姓名" />
      <el-table-column label="分管中层">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="loadCanMiddleRange(scope.row.oid)">
            <i class="el-icon-s-tools" />
            设置分管中层
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="120">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="edit(scope.row)">
            <i class="el-icon-edit-outline" />
            编辑
          </el-button>
          <el-button type="text"
                     size="small"
                     @click="remove(scope.row)">
            <i class="el-icon-delete" />
            删除
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
    <el-dialog title="副职校级领导设置"
               :visible.sync="dialogVisible"
               class="dialog_mv">
      <el-form ref="range"
               :label-position="'right'"
               label-width="80px"
               :model="range"
               :rules="rules">
        <el-form-item label="选择年份"
                      prop="yearId">
          <el-select v-model="range.yearId"
                     placeholder="选择考核年份"
                     class="block">
            <el-option v-for="item in allYears"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择员工"
                      prop="userId">
          <el-select v-model="range.userId"
                     placeholder="请选择员工信息"
                     class="block"
                     filterable>
            <el-option v-for="item in canUsers"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="save">
          确 定
        </el-button>
      </div>
    </el-dialog>
    <el-dialog title="分管中层批量设置"
               width="623px"
               :visible.sync="multiVisible"
               class="dialog_mv">
      <el-form ref="multiRange"
               :model="multiRange"
               :rules="rules">
        <el-form-item>
          <el-transfer v-model="multiRange.rangeIds"
                       filterable
                       :filter-method="multiFilter"
                       filter-placeholder="根据姓名搜索"
                       :titles="['可选择', '已选择']"
                       :data="canUsers" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="multiVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="saveMulti">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import "@/styles/assessment-style.scss";
import { RANGE_TYPE } from "@/util/assessment/constants";
export default {
  name: "FgLeaderList",
  data() {
    return {
      key: null,
      yearId: null,
      allYears: [],
      canUsers: [],
      range: {
        oid: null,
        yearId: null,
        userId: null,
        userType: RANGE_TYPE.FGLD,
      },
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        yearId: [
          {
            required: true,
            message: "请选择考核年份",
            trigger: ["blur", "change"],
          },
        ],
        userId: [
          {
            required: true,
            message: "请选择员工",
            trigger: ["blur", "change"],
          },
        ],
      },
      multiVisible: false,
      multiRange: {
        leaderRangeId: null,
        rangeIds: [],
      },
      multiFilter(query, item) {
        if (item) {
          return item.label.indexOf(query) > -1;
        }
      },
    };
  },
  watch: {
    yearId: function () {
      this.query();
    },
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.range.yearId = this.yearId;
    this.loadAllYear();
  },
  methods: {
    loadAllYear() {
      this.$http.get("/year/all").then((res) => {
        if (res.data.code == 0) {
          this.allYears = res.data.data;
        }
      });
    },
    loadCanUsers(oid, userId) {
      this.canUsers = [];
      this.$http
        .get("/config/leaderRangeCanUsers", {
          params: {
            yearId: this.yearId,
            oid: oid,
          },
        })
        .then((res) => {
          this.canUsers = res.data.data;
          this.dialogVisible = true;
          if (userId) {
            this.range.userId = userId;
          }
        });
    },
    loadCanMiddleRange(oid) {
      this.multiRange.leaderRangeId = oid;
      this.$http
        .get("/config/middleRangeCanUsers", {
          params: {
            yearId: this.yearId,
            rangeId: oid,
          },
        })
        .then((res) => {
          this.canUsers = res.data.data.canRanges;
          this.multiRange.rangeIds = res.data.data.ranges;
          this.multiVisible = true;
        });
    },
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/config/range", {
          params: {
            yearId: this.yearId,
            userType: this.range.userType,
            key: this.key,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.pager = res.data.data;
          this.$store.commit("setLoading", false);
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
    add() {
      this.$refs.range && this.$refs.range.resetFields();
      this.range.oid = null;
      this.range.yearId = this.yearId;
      this.range.userId = null;
      this.loadCanUsers();
    },
    edit(row) {
      this.$refs.range && this.$refs.range.resetFields();
      this.range.oid = row.oid;
      this.range.yearId = row.yearId;
      this.loadCanUsers(row.oid, row.userId);
    },
    remove(row) {
      let ids = "";
      if (row.oid) {
        ids = row.oid;
      } else {
        if (this.selectedRows === 0) {
          this.$message.error("请选择后点击删除");
          return;
        } else {
          ids = this.selectedRows.join(",");
        }
      }
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/config/delRange", {
            ids: ids,
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
    save() {
      this.$refs["range"].validate((valid) => {
        if (valid) {
          this.$http.post("/config/saveRange", this.range).then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.message);
              this.dialogVisible = false;
              this.query();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    middleRangeSet() {
      this.canUsers = [];
      this.multiVisible = true;
    },
    saveMulti() {
      this.$http
        .post("/config/saveMiddleRange", this.multiRange)
        .then((res) => {
          if (res.data.code == 0) {
            this.$message.success(res.data.message);
            this.multiVisible = false;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
  },
};
</script>
<template>
  <div>
    <div class="m_b_20">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-button type="primary"
                     icon="el-icon-plus"
                     @click="add">
            新增
          </el-button>
          <el-button type="success"
                     icon="el-icon-circle-plus"
                     @click="multiSet">
            批量设置
          </el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     :disabled="selectedRows.length === 0"
                     @click="remove">
            删除
          </el-button>
        </el-col>
        <el-col :span="12"
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
      <el-table-column prop="deptName"
                       label="所在部门" />
      <el-table-column prop="userName"
                       label="员工姓名" />
      <el-table-column label="是否退休">
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
                       label="备注" />
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
    <el-dialog title="普通员工设置"
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
        <el-form-item label="所在部门"
                      prop="deptId">
          <el-select v-model="range.deptId"
                     placeholder="请选择所在部门"
                     class="block"
                     filterable
                     @change="changeDept">
            <el-option v-for="item in allDepts"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
        </el-form-item>
        <el-form-item label="选择员工"
                      prop="userId">
          <el-select v-model="range.userId"
                     placeholder="请选择员工"
                     class="block"
                     filterable>
            <el-option v-for="item in canUsers"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
        </el-form-item>
        <el-form-item prop="retire"
                      label="是否退休">
          <el-select v-model="range.retire"
                     class="block"
                     placeholder="请选择是否退休">
            <el-option v-for="item in retires"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="note"
                      label="备注内容">
          <el-input v-model="range.note"
                    placeholder="请填写备注内容" />
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
    <el-dialog title="普通员工批量设置"
               width="623px"
               :visible.sync="multiVisible"
               class="dialog_mv">
      <el-form ref="multiRange"
               :model="multiRange"
               :rules="rules">
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="yearId">
              <el-select v-model="multiRange.yearId"
                         placeholder="选择考核年份"
                         class="block">
                <el-option v-for="item in allYears"
                           :key="item.oid"
                           :label="item.value"
                           :value="item.oid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="2">
            <el-form-item prop="deptId">
              <el-select v-model="multiRange.deptId"
                         placeholder="请选择所在部门"
                         class="block"
                         filterable>
                <el-option v-for="item in allDepts"
                           :key="item.oid"
                           :label="item.value"
                           :value="item.oid" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-transfer v-model="multiRange.users"
                       filterable
                       :filter-method="multiFilter"
                       filter-placeholder="根据姓名搜索"
                       :titles="['可选择', '已选择']"
                       :data="canUsers" />
        </el-form-item>
        <el-form-item>
          <el-col :span="11">
            <el-form-item prop="retire">
              <el-select v-model="multiRange.retire"
                         class="block"
                         placeholder="请选择是否退休">
                <el-option v-for="item in retires"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="2">
            <el-form-item prop="note">
              <el-input v-model="multiRange.note"
                        placeholder="请填写备注内容" />
            </el-form-item>
          </el-col>
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
  name: "StaffList",
  data() {
    return {
      key: null,
      yearId: null,
      allYears: [],
      allDepts: [],
      canUsers: [],
      range: {
        oid: null,
        yearId: null,
        deptId: null,
        userId: null,
        userType: RANGE_TYPE.PTYG,
        retire: null,
        note: null,
      },
      multiRange: {
        yearId: null,
        deptId: null,
        userType: RANGE_TYPE.PTYG,
        users: [],
        retire: null,
        note: null,
      },
      dialogVisible: false,
      multiVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      retires: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 2,
          label: "否",
        },
      ],
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
            message: "请选择员工信息",
            trigger: ["blur", "change"],
          },
        ],
        deptId: [
          {
            required: true,
            message: "请选择所在部门",
            trigger: ["blur", "change"],
          },
        ],
        retire: [
          { required: true, message: "请选择是否退休", trigger: "change" },
        ],
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
    "multiRange.deptId": function (value) {
      this.changeMultiDept(value);
    },
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.loadAllYear();
    this.loadAllDept();
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
    loadCanUsers(deptId, userId) {
      this.$http
        .get("/config/rangeCanUsers", {
          params: {
            yearId: this.yearId,
            deptId: deptId,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.canUsers = res.data.data;
            if (userId) {
              this.range.userId = userId;
              this.dialogVisible = true;
            } else {
              this.range.userId = null;
            }
          } else {
            this.canUsers = [];
            this.range.userId = null;
          }
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
    changeDept(value) {
      if (value != "" && value != null) {
        this.loadCanUsers(value);
      } else {
        this.canUsers = [];
      }
    },
    changeMultiDept(value) {
      this.$http
        .get("/config/deptRangeCanUsers", {
          params: {
            yearId: this.yearId,
            deptId: value,
          },
        })
        .then((res) => {
          this.canUsers = res.data.data.canUsers;
          this.multiRange.users = res.data.data.users;
        });
    },
    multiSet() {
      this.$refs.multiRange && this.$refs.multiRange.resetFields();
      this.multiRange.yearId = this.yearId;
      this.multiRange.deptId = null;
      this.canUsers = [];
      this.multiRange.retire = null;
      this.multiRange.note = null;
      this.multiVisible = true;
    },
    add() {
      this.$refs.range && this.$refs.range.resetFields();
      this.range.oid = null;
      this.range.yearId = this.yearId;
      this.range.deptId = null;
      this.range.userId = null;
      this.range.retire = null;
      this.range.note = null;
      this.dialogVisible = true;
    },
    edit(row) {
      this.range.oid = row.oid;
      this.range.yearId = row.yearId;
      this.range.deptId = row.deptId;
      this.range.retire = row.retire;
      this.range.note = row.note;
      this.loadCanUsers(row.deptId, row.userId);
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
    saveMulti() {
      this.$refs["multiRange"].validate((valid) => {
        if (valid) {
          if (
            this.multiRange.users != null &&
            this.multiRange.users.length > 0
          ) {
            this.$http
              .post("/config/saveMultiRange", this.multiRange)
              .then((res) => {
                if (res.data.code == 0) {
                  this.$message.success(res.data.message);
                  this.multiVisible = false;
                  this.query();
                } else {
                  this.$message.error(res.data.message);
                }
              });
          } else {
            this.$message.error("请选择人员");
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
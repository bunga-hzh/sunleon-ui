<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="12">
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
            <el-button type="info"
                       icon="el-icon-refresh"
                       @click="sync">
              手动同步
            </el-button>
          </el-col>
          <el-col :span="12"
                  align="right">
            <el-input v-model="key"
                      placeholder="部门名称"
                      class="w_200"
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
                :element-loading-text="loadingText"
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
                         align="center" />
        <el-table-column prop="deptName"
                         label="部门名称" />
        <el-table-column label="创建时间"
                         width="150">
          <template slot-scope="scope">
            {{ scope.row.createTime | moment('YYYY-MM-DD HH:mm') }}
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
    </el-card>

    <el-dialog :title="title"
               :visible.sync="dialogVisible">
      <el-form ref="dept"
               :label-position="'left'"
               label-width="100px"
               :model="dept"
               :rules="rules">
        <el-form-item label="部门名称"
                      prop="deptName">
          <el-input v-model="dept.deptName"
                    placeholder="请输入部门名称" />
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
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
export default {
  name: "Dept",
  data() {
    return {
      key: null,
      dept: {
        oid: null,
        deptName: null,
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
      },
      loadingText: "加载中，请稍后",
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.loadingText = "加载中，请稍后";
      this.$store.commit("setLoading", true);
      this.$http
        .get("/dept/list", {
          params: {
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
      this.dept.oid = null;
      this.dept.deptName = null;
      this.title = "新增部门";
      this.dialogVisible = true;
    },
    edit(row) {
      this.dept.oid = row.oid;
      this.dept.deptName = row.deptName;
      this.title = "修改部门";
      this.dialogVisible = true;
    },
    save() {
      this.$refs["dept"].validate((valid) => {
        if (valid) {
          this.$http.post("/dept/save", this.dept).then((res) => {
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
          .post("/dept/del", {
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
    sync() {
      this.$confirm("此操作将同步部门和教师数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.loadingText = "同步中，请稍后";
        this.$store.commit("setLoading", true);
        this.$http.post("/sync/go").then((res) => {
          this.$store.commit("setLoading", false);
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
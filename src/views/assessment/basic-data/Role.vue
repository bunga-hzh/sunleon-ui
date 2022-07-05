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
          </el-col>
          <el-col :span="12"
                  align="right">
            <el-input v-model="key"
                      placeholder="角色名称"
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
                         :selectable="checkSelectable" />
        <el-table-column prop="roleName"
                         label="角色名称" />
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
      <el-form ref="role"
               :label-position="'right'"
               label-width="80px"
               :model="role"
               :rules="rules">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="role.roleName"
                    placeholder="请输入角色名称" />
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
  name: "Role",
  data() {
    return {
      key: null,
      role: {
        oid: null,
        roleName: null,
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/role/list", {
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
    checkSelectable(row) {
      return row.oid > 8;
    },
    add() {
      this.role.oid = null;
      this.role.roleName = null;
      this.title = "新增角色";
      this.dialogVisible = true;
    },
    edit(row) {
      this.role.oid = row.oid;
      this.role.roleName = row.roleName;
      this.title = "修改角色";
      this.dialogVisible = true;
    },
    save() {
      this.$refs["role"].validate((valid) => {
        if (valid) {
          this.$http.post("/role/save", this.role).then((res) => {
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
        if (row.oid <= 8) {
          this.$message.error("系统内置角色，禁止删除");
          return;
        }
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
          .post("/role/del", {
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
  },
};
</script>
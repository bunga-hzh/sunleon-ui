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
                      placeholder="年份名称"
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
                         align="center" />
        <el-table-column prop="yearName"
                         label="年份名称" />
        <el-table-column prop="yearStart"
                         label="开始时间">
          <template slot-scope="scope">
            {{ scope.row.yearStart | moment('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column prop="yearEnd"
                         label="结束时间">
          <template slot-scope="scope">
            {{ scope.row.yearEnd | moment('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column prop="curr"
                         label="是否当前年份">
          <template slot-scope="scope">
            <div v-if="scope.row.curr === 1">
              <el-button type="danger"
                         plain>
                当前年份
              </el-button>
            </div>
            <div v-else>
              <el-button plain
                         @click="setCurr(scope.row)">
                设为当前
              </el-button>
            </div>
          </template>
        </el-table-column>
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
      <el-form ref="year"
               :label-position="'right'"
               label-width="80px"
               :model="year"
               :rules="rules">
        <el-form-item label="年份名称"
                      prop="yearName">
          <el-input v-model="year.yearName"
                    placeholder="请输入年份名称" />
        </el-form-item>
        <el-form-item label="时间范围"
                      prop="dateRange">
          <el-date-picker v-model="year.dateRange"
                          type="datetimerange"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          placeholder="选择时间范围"
                          value-format="yyyy-MM-dd HH:mm:00"
                          style="width: 100%;" />
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
  name: "Year",
  data() {
    return {
      key: null,
      year: {
        oid: null,
        yearName: null,
        dateRange: [],
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        yearName: [
          { required: true, message: "请输入年份名称", trigger: "blur" },
        ],
        dateRange: [
          { required: true, message: "请选择时间范围", trigger: "change" },
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
        .get("/year/list", {
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
      this.year.oid = null;
      this.year.yearName = null;
      this.year.dateRange = [];
      this.title = "新增年份";
      this.dialogVisible = true;
    },
    edit(row) {
      this.year.oid = row.oid;
      this.year.yearName = row.yearName;
      this.year.dateRange = [];
      this.year.dateRange.push(row.yearStart);
      this.year.dateRange.push(row.yearEnd);
      this.title = "修改年份";
      this.dialogVisible = true;
    },
    setCurr(row) {
      this.$confirm("是否将" + row.yearName + "设置为当前考核年份?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post("/year/setCurr/" + row.oid).then((res) => {
          if (res.data.code == 0) {
            this.$message.success(res.data.message);
            this.query();
          } else {
            this.$message.error(res.data.message);
          }
        });
      });
    },
    onSelectionChange(rows) {
      this.selectedRows = rows.map((item) => item.oid);
    },
    save() {
      this.$refs["year"].validate((valid) => {
        if (valid) {
          this.year.dateRange = this.year.dateRange.join(",");
          this.$http.post("/year/save", this.year).then((res) => {
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
          .post("/year/del", {
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
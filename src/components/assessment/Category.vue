<template>
  <div>
    <basic-container class="m_b_20">
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
                    placeholder="类别名称"
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
    </basic-container>
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
      <el-table-column prop="categoryName"
                       label="类别名称" />
      <el-table-column prop="categoryScore"
                       label="类别分值" />
      <el-table-column label="考核内容">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     @click="categoryNorm(scope.row.oid)">
            <i class="el-icon-suitcase-1" />
            考核内容
          </el-button>
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
    <el-dialog :title="title"
               :visible.sync="dialogVisible">
      <el-form ref="category"
               :label-position="'left'"
               label-width="80px"
               :model="category"
               :rules="rules">
        <el-form-item label="类别名称"
                      prop="categoryName">
          <el-input v-model="category.categoryName"
                    placeholder="请输入类别名称" />
        </el-form-item>
        <el-form-item label="类别总分"
                      prop="categoryScore">
          <el-input v-model="category.categoryScore"
                    placeholder="请输入类别总分" />
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
  </div>
</template>
<script>
import "@/styles/assessment-style.scss";
import bus from "@/util/assessment/vueBus";
export default {
  name: "Category",
  data() {
    return {
      key: null,
      category: {
        oid: null,
        categoryName: null,
        categoryScore: null,
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        categoryName: [
          { required: true, message: "请输入类别名称", trigger: "blur" },
        ],
        categoryScore: [
          { required: true, message: "请输入类别总分", trigger: "blur" },
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
        .get("/config/category", {
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
      this.title = "新增考核类别";
      this.category.oid = null;
      this.category.categoryName = null;
      this.category.categoryScore = null;
      this.dialogVisible = true;
    },
    edit(row) {
      this.title = "修改考核类别";
      this.category.oid = row.oid;
      this.category.categoryName = row.categoryName;
      this.category.categoryScore = row.categoryScore;
      this.dialogVisible = true;
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
          .post("/config/delCategory", {
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
      this.$refs["category"].validate((valid) => {
        if (valid) {
          this.$http.post("/config/saveCategory", this.category).then((res) => {
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
    categoryNorm(categoryId) {
      this.$emit("parentChange", "norm");
      //DOM创建后才可触发兄弟组件中的方法
      this.$nextTick(function () {
        bus.$emit("changeCategoryId", categoryId);
      });
    },
  },
};
</script>
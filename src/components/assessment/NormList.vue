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
          <el-select v-model="categoryId"
                     placeholder="选择考核类别"
                     class="w_150"
                     clearable>
            <el-option v-for="item in allCategoryIds"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
          <el-input v-model="key"
                    placeholder="考核内容"
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
      <el-table-column type="selection"
                       width="55"
                       align="center" />
      <el-table-column prop="categoryName"
                       label="考核类别"
                       width="80" />
      <el-table-column prop="normName"
                       label="考核内容"
                       width="120"
                       show-overflow-tooltip />
      <el-table-column prop="normScore"
                       label="内容分值"
                       width="80" />
      <el-table-column prop="evaluation"
                       label="评价要点"
                       show-overflow-tooltip />
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
      <el-form ref="standardNorm"
               :label-position="'left'"
               label-width="80px"
               :model="standardNorm"
               :rules="rules">
        <el-form-item label="考核类别"
                      prop="categoryId">
          <el-select v-model="standardNorm.categoryId"
                     placeholder="请选择考核类别"
                     class="block">
            <el-option v-for="item in allCategoryIds"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid" />
          </el-select>
        </el-form-item>
        <el-form-item label="考核内容"
                      prop="normName">
          <el-input v-model="standardNorm.normName"
                    placeholder="请输入考核内容" />
        </el-form-item>
        <el-form-item label="内容分值"
                      prop="normScore">
          <el-input v-model="standardNorm.normScore"
                    placeholder="请输入内容分值" />
        </el-form-item>
        <el-form-item label="评价要点"
                      prop="evaluation">
          <el-input v-model="standardNorm.evaluation"
                    placeholder="请输入评价要点" />
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
  name: "NormList",
  data() {
    return {
      key: null,
      categoryId: null,
      allCategoryIds: [],
      standardNorm: {
        oid: null,
        categoryId: null,
        normName: null,
        normScore: null,
        evaluation: null,
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        categoryId: [
          { required: true, message: "请选择考核类别", trigger: "change" },
        ],
        normName: [
          { required: true, message: "请输入考核内容", trigger: "blur" },
        ],
        normScore: [
          { required: true, message: "请输入内容分值", trigger: "blur" },
        ],
        evaluation: [
          { required: true, message: "请输入评价要点", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    categoryId: function (value) {
      this.categoryId = value;
      this.standardNorm.categoryId = value;
      this.query();
    },
  },
  mounted() {
    bus.$off("changeCategoryId").$on("changeCategoryId", (data) => {
      this.categoryId = data;
      this.standardNorm.categoryId = data;
    });
    this.loadAllCategory();
  },
  methods: {
    loadAllCategory() {
      this.$http.get("/config/categoryAll").then((res) => {
        if (res.data.code == 0) {
          this.allCategoryIds = res.data.data;
          if (!this.categoryId) {
            this.categoryId = this.allCategoryIds[0].oid;
          }
        }
      });
    },
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/config/norm", {
          params: {
            categoryId: this.categoryId,
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
      this.standardNorm.oid = null;
      this.standardNorm.normName = null;
      this.standardNorm.normScore = null;
      this.standardNorm.evaluation = null;
      this.title = "添加考核内容";
      this.dialogVisible = true;
    },
    edit(row) {
      this.standardNorm.oid = row.oid;
      this.standardNorm.categoryId = row.categoryId;
      this.standardNorm.normName = row.normName;
      this.standardNorm.normScore = row.normScore;
      this.standardNorm.evaluation = row.evaluation;
      this.title = "修改考核内容";
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
          .post("/config/delNorm", {
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
      this.$refs["standardNorm"].validate((valid) => {
        if (valid) {
          this.$http.post("/config/saveNorm", this.standardNorm).then((res) => {
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
  },
};
</script>
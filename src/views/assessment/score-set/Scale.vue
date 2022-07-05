<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-button type="primary"
                       icon="el-icon-thumb"
                       @click="init">
              发现
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
                       placeholder="选择年份"
                       class="w_200">
              <el-option v-for="item in allYears"
                         :key="item.oid"
                         :label="item.value"
                         :value="item.oid" />
            </el-select>
            <el-input v-model="key"
                      placeholder="部门名称"
                      class="w_200 m_l_10"
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
                         fixed />
        <el-table-column prop="yearName"
                         label="考核年份"
                         width="90" />
        <el-table-column prop="deptName"
                         label="部门名称" />
        <el-table-column prop="total"
                         label="总人数"
                         width="70" />
        <el-table-column label="A级范围">
          <template slot-scope="scope">
            {{ scope.row.aMin }}% -
            {{ scope.row.aMax }}%
          </template>
        </el-table-column>
        <el-table-column label="B级范围">
          <template slot-scope="scope">
            {{ scope.row.bMin }}% -
            {{ scope.row.bMax }}%
          </template>
        </el-table-column>
        <el-table-column label="C级范围">
          <template slot-scope="scope">
            {{ scope.row.cMin }}% -
            {{ scope.row.cMax }}%
          </template>
        </el-table-column>
        <el-table-column label="D级范围">
          <template slot-scope="scope">
            {{ scope.row.dMin }}% -
            {{ scope.row.dMax }}%
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
    <el-dialog title="部门员工等级比例设置"
               :visible.sync="dialogVisible"
               class="dialog_mv">
      <el-form ref="scale"
               :label-position="'left'"
               label-width="80px"
               :model="scale"
               :rules="rules">
        <el-form-item label="部门信息">
          <el-col :span="12">
            <el-form-item>
              <el-input v-model="scale.deptName"
                        readonly
                        placeholder="部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="1">
            <el-form-item>
              <el-input v-model="scale.total"
                        readonly
                        placeholder="部门总人数">
                <template slot="append">
                  人
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="A级比例"
                      :required="true">
          <el-col :span="12">
            <el-form-item prop="aMin">
              <el-input v-model.number="scale.aMin"
                        class="text-center"
                        placeholder="输入A下限比例">
                <template slot="prepend">
                  下限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="1">
            <el-form-item prop="aMax">
              <el-input v-model.number="scale.aMax"
                        class="text-center"
                        placeholder="输入A上限比例">
                <template slot="prepend">
                  上限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="B级比例"
                      :required="true">
          <el-col :span="12">
            <el-form-item prop="bMin">
              <el-input v-model.number="scale.bMin"
                        class="text-center"
                        placeholder="输入B下限比例">
                <template slot="prepend">
                  下限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="1">
            <el-form-item prop="bMax">
              <el-input v-model.number="scale.bMax"
                        class="text-center"
                        placeholder="输入B上限比例">
                <template slot="prepend">
                  上限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="C级比例"
                      :required="true">
          <el-col :span="12">
            <el-form-item prop="cMin">
              <el-input v-model.number="scale.cMin"
                        class="text-center"
                        placeholder="输入C下限比例">
                <template slot="prepend">
                  下限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="1">
            <el-form-item prop="cMax">
              <el-input v-model.number="scale.cMax"
                        class="text-center"
                        placeholder="输入C上限比例">
                <template slot="prepend">
                  上限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="D级比例"
                      :required="true">
          <el-col :span="12">
            <el-form-item prop="dMin">
              <el-input v-model.number="scale.dMin"
                        class="text-center"
                        placeholder="输入D下限比例">
                <template slot="prepend">
                  下限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="1">
            <el-form-item prop="dMax">
              <el-input v-model.number="scale.dMax"
                        class="text-center"
                        placeholder="输入D上限比例">
                <template slot="prepend">
                  上限
                </template>
                <template slot="append">
                  %
                </template>
              </el-input>
            </el-form-item>
          </el-col>
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
  name: "Scale",
  data() {
    return {
      key: null,
      yearId: null,
      allYears: [],
      scale: {
        oid: null,
        deptId: null,
        deptName: null,
        total: null,
        aMin: null,
        aMax: null,
        bMin: null,
        bMax: null,
        cMin: null,
        cMax: null,
        dMin: null,
        dMax: null,
      },
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        aMin: [
          { required: true, message: "请输入等级A的下限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        aMax: [
          { required: true, message: "请输入等级A的上限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        bMin: [
          { required: true, message: "请输入等级B的下限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        bMax: [
          { required: true, message: "请输入等级B的上限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        cMin: [
          { required: true, message: "请输入等级C的下限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        cMax: [
          { required: true, message: "请输入等级C的上限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        dMin: [
          { required: true, message: "请输入等级D的下限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
        dMax: [
          { required: true, message: "请输入等级D的上限", trigger: "blur" },
          { type: "number", message: "比例必须为数字", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    yearId: function () {
      this.query();
    },
  },
  mounted() {
    this.loadAllYear();
    this.yearId = this.$store.state.user.yearId;
  },
  methods: {
    loadAllYear() {
      this.$http.get("/year/all").then((res) => {
        if (res.data.code == 0) {
          this.allYears = res.data.data;
        }
      });
    },
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/config/scale", {
          params: {
            yearId: this.yearId,
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
    init() {
      if (this.yearId == null) {
        this.$message.error("请先选择年份");
      } else {
        this.$confirm("此操作将获取新的部门并初始化, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$http.post("/config/initScale/" + this.yearId).then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.message);
              this.query();
            } else {
              this.$message.error(res.data.message);
            }
          });
        });
      }
    },
    edit(row) {
      this.scale.oid = row.oid;
      this.scale.deptId = row.deptId;
      this.scale.deptName = row.deptName;
      this.scale.total = row.total;
      this.scale.aMin = row.aMin;
      this.scale.aMax = row.aMax;
      this.scale.bMin = row.bMin;
      this.scale.bMax = row.bMax;
      this.scale.cMin = row.cMin;
      this.scale.cMax = row.cMax;
      this.scale.dMin = row.dMin;
      this.scale.dMax = row.dMax;
      this.dialogVisible = true;
    },
    save() {
      this.$refs["scale"].validate((valid) => {
        if (valid) {
          if (this.scale.aMin >= this.scale.aMax) {
            this.$message.error("A级比例的上限必须大于下限");
            return false;
          }
          if (this.scale.bMin >= this.scale.bMax) {
            this.$message.error("B级比例的上限必须大于下限");
            return false;
          }
          if (this.scale.cMin >= this.scale.cMax) {
            this.$message.error("C级比例的上限必须大于下限");
            return false;
          }
          if (this.scale.dMin >= this.scale.dMax) {
            this.$message.error("D级比例的上限必须大于下限");
            return false;
          }
          this.$http.post("/config/saveScale", this.scale).then((res) => {
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
          .post("/config/delScale", {
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
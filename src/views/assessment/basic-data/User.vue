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
            <el-button type="success"
                       icon="el-icon-download"
                       @click="template">
              下载模板
            </el-button>
            <el-button type="warning"
                       icon="el-icon-upload2"
                       @click="importUser">
              导入
            </el-button>
          </el-col>
          <el-col :span="12"
                  align="right">
            <el-input v-model="key"
                      placeholder="员工姓名/手机号码"
                      class="w_200"
                      clearable />
            <el-select v-model="state"
                       placeholder="员工状态"
                       class="w_120 m_l_10"
                       clearable>
              <el-option :label="'正常'"
                         :value="1" />
              <el-option :label="'禁用'"
                         :value="2" />
            </el-select>
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
        <el-table-column prop="userName"
                         label="员工姓名"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="loginName"
                         label="员工工号"
                         width="100" />
        <el-table-column prop="deptName"
                         label="所在部门"
                         width="100"
                         show-overflow-tooltip />
        <el-table-column prop="sex"
                         label="性别"
                         width="50">
          <template slot-scope="scope">
            <div v-if="scope.row.sex == 1">
              男
            </div>
            <div v-if="scope.row.sex == 2">
              女
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="mobile"
                         label="手机号码"
                         width="120" />
        <el-table-column prop="userType"
                         label="员工类别"
                         width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.userType == 1">
              在职在编
            </div>
            <div v-if="scope.row.userType == 2">
              编外运行
            </div>
            <div v-if="scope.row.userType == 3">
              行政外聘
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="roleNames"
                         label="员工角色"
                         show-overflow-tooltip />
        <el-table-column label="状态"
                         width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state == 1"
                    :type="'success'">
              正常
            </el-tag>
            <el-tag v-if="scope.row.state == 2"
                    :type="'danger'">
              禁用
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="idCard"
                         width="180"
                         label="身份证号" />
        <el-table-column label="出生年月"
                         width="80">
          <template slot-scope="scope">
            {{ scope.row.birthday | moment('YYYY-MM') }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间"
                         width="150">
          <template slot-scope="scope">
            {{ scope.row.createTime | moment('YYYY-MM-DD hh:mm') }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         fixed="right"
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
               :visible.sync="dialogVisible"
               class="dialog_mv">
      <el-form ref="user"
               :label-position="'right'"
               label-width="80px"
               :model="user"
               :rules="rules">
        <el-form-item label="手机号码"
                      required>
          <el-col :span="10">
            <el-form-item prop="mobile">
              <el-input v-model="user.mobile"
                        prefix-icon="el-icon-mobile"
                        placeholder="请输入手机号码"
                        class="input-with-select" />
            </el-form-item>
          </el-col>
          <el-col :span="1"
                  class="line">
            -
          </el-col>
          <el-col :span="13">
            <el-form-item label="员工姓名"
                          prop="userName">
              <el-input v-model="user.userName"
                        prefix-icon="el-icon-user-solid"
                        placeholder="请输入员工姓名" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="员工工号"
                      required>
          <el-col :span="10">
            <el-form-item prop="loginName">
              <el-input v-model="user.loginName"
                        placeholder="请输入员工工号" />
            </el-form-item>
          </el-col>
          <el-col :span="1"
                  class="line">
            -
          </el-col>
          <el-col :span="13">
            <el-form-item label="所在部门"
                          prop="deptId">
              <el-select v-model="user.deptId"
                         placeholder="请选择所在部门"
                         class="block">
                <el-option v-for="item in allDepts"
                           :key="item.oid"
                           :label="item.value"
                           :value="item.oid" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="选择角色"
                      prop="roles">
          <el-select v-model="user.roles"
                     placeholder="请选择员工角色"
                     multiple
                     class="block">
            <el-option v-for="item in allRoles"
                       :key="item.oid"
                       :label="item.value"
                       :value="item.oid"
                       :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="员工类别"
                      required>
          <el-col :span="10">
            <el-form-item prop="userType">
              <el-select v-model="user.userType"
                         placeholder="请选择员工类别"
                         class="block">
                <el-option v-for="item in userTypes"
                           :key="item.oid"
                           :label="item.value"
                           :value="item.oid" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1"
                  class="line">
            -
          </el-col>
          <el-col :span="13">
            <el-form-item label="学历"
                          prop="degree">
              <el-input v-model="user.degree"
                        placeholder="请输入学历" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="员工状态"
                      required>
          <el-col :span="10">
            <el-form-item prop="state">
              <el-radio-group v-model="user.state">
                <el-radio :label="1">
                  正常
                </el-radio>
                <el-radio :label="2">
                  禁用
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="1"
                  class="line">
            -
          </el-col>
          <el-col :span="13">
            <el-form-item label="员工性别"
                          prop="sex">
              <el-radio-group v-model="user.sex">
                <el-radio :label="1">
                  男
                </el-radio>
                <el-radio :label="2">
                  女
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="身份证号"
                      required>
          <el-col :span="10">
            <el-form-item prop="idCard">
              <el-input v-model="user.idCard"
                        placeholder="请输入身份证号" />
            </el-form-item>
          </el-col>
          <el-col :span="1"
                  class="line">
            -
          </el-col>
          <el-col :span="13">
            <el-form-item label="出生年月"
                          prop="birthday">
              <el-date-picker v-model="user.birthday"
                              type="month"
                              placeholder="选择出生年月"
                              class="w_100p" />
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
    <el-dialog :title="uploadTitle"
               :visible.sync="uploadVisible"
               width="400px"
               class="dialog_compact">
      <el-upload ref="upload"
                 drag
                 :action="importUserUrl"
                 name="importFile"
                 :headers="headers"
                 :multiple="false"
                 :limit="1"
                 accept=".xls,.xlsx"
                 :auto-upload="false"
                 :before-upload="beforeUpload"
                 :on-success="handleSuccess"
                 :on-error="handleError">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div slot="tip"
             class="el-upload__tip">
          只能上传xls/xlsx文件
        </div>
      </el-upload>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="uploadVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="startUpload">
          立即上传
        </el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import microvan from "@/util/assessment/microvan";
import axios from "axios";
export default {
  name: "User",
  data() {
    return {
      state: null,
      key: null,
      allRoles: [],
      allDepts: [],
      userTypes: [
        {
          oid: 1,
          value: "在职在编",
        },
        {
          oid: 2,
          value: "编外运行",
        },
        {
          oid: 3,
          value: "行政外聘",
        },
      ],
      user: {
        oid: null,
        mobile: null,
        userName: null,
        loginName: null,
        deptId: null,
        roles: null,
        degree: null,
        userType: null,
        state: 1,
        sex: 1,
        idCard: null,
        birthday: null,
      },
      title: null,
      dialogVisible: false,
      selectedRows: [],
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
        ],
        loginName: [
          { required: true, message: "请输入员工工号", trigger: "blur" },
        ],
        roles: [
          { required: true, message: "请选择员工角色", trigger: "change" },
        ],
        deptId: [
          { required: true, message: "请选择所在部门", trigger: "change" },
        ],
        degree: [{ required: true, message: "请输入学历", trigger: "change" }],
        userType: [
          { required: true, message: "请选择员工类别", trigger: "change" },
        ],
        state: [
          { required: true, message: "请选择员工状态", trigger: "change" },
        ],
        sex: [{ required: true, message: "请选择员工性别", trigger: "change" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
        ],
        birthday: [
          { required: true, message: "请选择出生年月", trigger: "blur" },
        ],
      },
      uploadTitle: null,
      uploadVisible: false,
      importUserUrl: axios.defaults.baseURL + "/user/import",
      headers: {
        Authorization: this.$store.state.token,
      },
    };
  },
  watch: {
    state: function () {
      this.query();
    },
    "user.idCard": function (value) {
      this.user.birthday = microvan.obatinBirthday(value);
    },
  },
  mounted() {
    this.query();
    this.loadAllRole();
    this.loadAllDept();
  },
  methods: {
    loadAllRole() {
      this.$http.get("/role/all").then((res) => {
        if (res.data.code == 0) {
          this.allRoles = res.data.data;
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
        .get("/user/list", {
          params: {
            key: this.key,
            state: this.state,
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
      this.$refs.user && this.$refs.user.resetFields();
      this.user.oid = null;
      this.user.mobile = null;
      this.user.userName = null;
      this.user.loginName = null;
      this.user.deptId = null;
      this.user.roles = [];
      this.user.degree = null;
      this.user.userType = null;
      this.user.state = 1;
      this.user.sex = 1;
      this.user.idCard = null;
      this.user.birthday = null;
      this.title = "新增员工";
      this.dialogVisible = true;
    },
    edit(row) {
      this.$refs.user && this.$refs.user.resetFields();
      this.user.oid = row.oid;
      this.user.mobile = row.mobile;
      this.user.userName = row.userName;
      this.user.loginName = row.loginName;
      this.user.deptId = row.deptId;
      this.user.roles = row.roles;
      this.user.degree = row.degree;
      this.user.userType = row.userType;
      this.user.state = row.state;
      this.user.sex = row.sex;
      this.user.idCard = row.idCard;
      this.user.birthday = row.birthday;
      this.title = "修改员工";
      this.dialogVisible = true;
    },
    save() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          this.$http.post("/user/save", this.user).then((res) => {
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
          .post("/user/del", {
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
    template() {
      this.$http
        .post("/download/template/user", null, {
          responseType: "blob",
        })
        .then((res) => {
          const fileName =
            decodeURI(
              res.headers["content-disposition"].split(";")[1].split("=")[1]
            ) || "员工信息导入模板.xls";
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
    importUser() {
      this.uploadTitle = "导入员工";
      this.uploadVisible = true;
    },
    startUpload() {
      this.$refs.upload.submit();
    },
    beforeUpload(file) {
      let ext = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (ext !== "xlsx" && ext !== "xls") {
        this.$message.warning("只能上传后缀是.xlsx或.xls的文件");
      }
      if (size > 10) {
        this.$message.warning("文件大小不得超过10M");
      }
    },
    handleSuccess(res) {
      if (res.code == 0) {
        this.$refs.upload.clearFiles();
        this.uploadVisible = false;
        var content = [];
        content.push("导入成功");
        content.push(res.data.okNum);
        content.push("个，");
        content.push("失败");
        content.push(res.data.failNum);
        content.push("个<br>");
        if (res.data.msg != null && res.data.msg != "") {
          content.push(res.data.msg);
        }
        let cont = content.join("");
        cont = cont.replace(/。/g, "<br>");
        this.$alert(cont, "导入结果", {
          dangerouslyUseHTMLString: true,
        }).then(() => {
          this.query();
        });
      } else {
        this.$message.error(res.message);
      }
    },
    handleError() {
      this.$message.error("文件上传失败");
    },
  },
};
</script>
<template>
  <basic-container>
    <remind-page :role-id="'zcjs'"
                 :assess-type="0"
                 @parentChange="changeSend" />
    <el-card v-if="send"
             shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          上海市医药学校年度考核登记表
        </div>
        <div class="item">
          {{ yearName }} 状态：[{{ stateStr }}]
        </div>
      </div>
      <el-form v-if="!success"
               ref="reg"
               :model="reg"
               label-width="80px"
               label-position="top"
               :rules="rules">
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="姓名"
                            prop="userName">
                <el-input v-model="reg.userName"
                          readonly />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="性别"
                            prop="sex">
                <el-radio-group v-model="reg.sex">
                  <el-radio :label="1">
                    男
                  </el-radio>
                  <el-radio :label="2">
                    女
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="出生年月"
                            prop="birthday">
                <el-date-picker v-model="reg.birthday"
                                type="month"
                                placeholder="选择出生年月"
                                class="w_100p" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="学历"
                            prop="degree">
                <el-input v-model="reg.degree"
                          readonly
                          placeholder="请填写学历" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="所在部门"
                            prop="deptId">
                <el-select v-model="reg.deptId"
                           placeholder="请选择所在部门"
                           disabled
                           class="block">
                  <el-option v-for="item in allDepts"
                             :key="item.oid"
                             :label="item.value"
                             :value="item.oid" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现任职务"
                            prop="position">
                <el-input v-model="reg.position"
                          placeholder="请填写现任职务" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责工作"
                            prop="job">
                <el-input v-model="reg.job"
                          placeholder="请填写负责工作" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="本年度思想、工作总结"
                      prop="summary">
          <el-input v-model="reg.summary"
                    placeholder="请填写本年度思想、工作总结"
                    type="textarea"
                    maxlength="10000"
                    show-word-limit
                    class="h150" />
        </el-form-item>
        <el-form-item>
          <el-button v-prevent-re-click
                     type="primary"
                     @click="save">
            <i class="el-icon-s-promotion" />
            立即提交
          </el-button>
        </el-form-item>
      </el-form>
      <table v-if="success"
             class="mv-table mv-table-bordered">
        <tr>
          <td width="60">
            <b>姓名</b>
          </td>
          <td colspan="2">
            {{ reg.userName }}
          </td>
          <td>
            <b>性别</b>
          </td>
          <td>{{ reg.sexName }}</td>
          <td colspan="2">
            <b>出生年月</b>
          </td>
          <td>{{ reg.birthday }}</td>
        </tr>
        <tr>
          <td colspan="2">
            <b>学历</b>
          </td>
          <td colspan="2">
            {{ reg.degree }}
          </td>
          <td colspan="2">
            <b>现任职务（岗位）</b>
          </td>
          <td colspan="2">
            {{ reg.position }}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>部门</b>
          </td>
          <td colspan="6">
            {{ reg.deptName }}
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <b>负责工作</b>
          </td>
          <td colspan="6">
            {{ reg.job }}
          </td>
        </tr>
        <tr>
          <td>
            <div class="td_title">
              本年度思想、工作总结
            </div>
          </td>
          <td colspan="7"
              class="text-left">
            <div class="text-wrap">
              {{ reg.summary }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="td_title">
              分管领导评鉴意见
            </div>
          </td>
          <td colspan="7"
              class="text-left">
            <div class="text-wrap">
              {{ reg.leaderOpinion }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="td_title">
              考核小组意见
            </div>
          </td>
          <td colspan="7"
              class="text-left">
            <div class="text-wrap">
              {{ reg.groupOpinion }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="td_title">
              单位意见
            </div>
          </td>
          <td colspan="7"
              class="text-left">
            <div class="text-wrap">
              {{ reg.orgOpinion }}
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="td_title">
              备注
            </div>
          </td>
          <td colspan="7"
              class="text-left">
            <div class="text-wrap">
              {{ reg.note }}
            </div>
          </td>
        </tr>
      </table>
      <el-button v-if="success"
                 class="m_t_10"
                 @click="goBack">
        <i class="el-icon-back" />
        返回
      </el-button>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import { sexDict, regState } from "@/util/assessment/dict";
import RemindPage from "./component/RemindPage";
export default {
  name: "Register",
  components: {
    RemindPage,
  },
  data() {
    return {
      yearId: null,
      yearName: null,
      allDepts: [],
      reg: {
        oid: null,
        yearId: null,
        yearName: null,
        userId: null,
        userName: null,
        sex: null,
        sexName: null,
        birthday: null,
        degree: null,
        position: null,
        deptId: null,
        deptName: null,
        job: null,
        summary: null,
        leaderOpinion: null,
        groupOpinion: null,
        orgOpinion: null,
        note: null,
        state: null,
      },
      stateStr: null,
      send: false,
      success: false,
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthday: [
          { required: true, message: "请输入出生年月", trigger: "blur" },
        ],
        position: [
          { required: true, message: "请填写现任职务", trigger: "blur" },
        ],
        deptId: [{ required: true, message: "请选择部门", trigger: "blur" }],
        job: [{ required: true, message: "请填写负责工作", trigger: "blur" }],
        summary: [
          {
            required: true,
            message: "请填写本年度思想、工作总结",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.yearId = this.$store.state.user.yearId;
    this.yearName = this.$store.state.user.yearName;
    this.reg.yearId = this.yearId;
    this.query();
    this.loadAllDept();
    this.queryUser();
  },
  methods: {
    changeSend(send) {
      this.send = send;
    },
    query() {
      this.$http.post("/reg/userData/" + this.yearId).then((res) => {
        if (res.data.code == 0) {
          this.reg.oid = res.data.data.oid;
          this.reg.userId = res.data.data.userId;
          this.reg.position = res.data.data.position;
          this.reg.job = res.data.data.job;
          this.reg.summary = res.data.data.summary;
          this.reg.leaderOpinion = res.data.data.leaderOpinion;
          this.reg.groupOpinion = res.data.data.groupOpinion;
          this.reg.orgOpinion = res.data.data.orgOpinion;
          this.reg.note = res.data.data.note;
          this.reg.state = res.data.data.state;
          if (
            res.data.data.state == 1 ||
            res.data.data.state == 2 ||
            res.data.data.state == 3
          ) {
            this.success = true;
          }
          this.stateStr = regState[res.data.data.state];
        } else {
          this.stateStr = "未提交";
        }
      });
    },
    queryUser() {
      this.$http.post("/user/data").then((res) => {
        this.reg.userName = res.data.data.userName;
        this.reg.birthday = res.data.data.birthday;
        this.reg.deptId = res.data.data.deptId;
        this.reg.deptName = res.data.data.deptName;
        this.reg.degree = res.data.data.degree;
        this.reg.sex = res.data.data.sex;
        this.reg.sexName = sexDict[res.data.data.sex];
      });
    },
    loadAllDept() {
      this.$http.get("/dept/all").then((res) => {
        if (res.data.code == 0) {
          this.allDepts = res.data.data;
        }
      });
    },
    save() {
      this.$refs["reg"].validate((valid) => {
        if (valid) {
          if (this.reg.summary.length < 500) {
            this.$message.error("年度思想、工作总结至少500字");
            return;
          }
          this.$http.post("/reg/save", this.reg).then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.message);
              this.query();
              this.queryUser();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    goBack() {
      history.go(-1);
    },
  },
};
</script>
<template>
  <basic-container>
    <el-card shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          上海市医药学校年度考核登记表
        </div>
        <div class="item">
          {{ reg.yearName }}
          <el-button v-if="reg.state === 3"
                     type="text"
                     size="small"
                     @click="print()">
            <i class="el-icon-printer" />
            打印
          </el-button>
        </div>
      </div>
      <table class="mv-table mv-table-bordered">
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
          <td>{{ reg.sex }}</td>
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
            <el-input v-if="reg.state === 1 && showSubmit"
                      v-model="reg.leaderOpinion"
                      type="textarea"
                      maxlength="10000"
                      show-word-limit
                      class="h150" />
            <div v-else>
              <div class="text-wrap">
                {{ reg.leaderOpinion }}
              </div>
              <div v-if="reg.leader != null"
                   class="text-leader">
                <b>分管领导：</b>{{ reg.leader }}
              </div>
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
      <el-button v-if="reg.state === 2 && showExportAdjust"
                 type="primary"
                 icon="el-icon-s-promotion"
                 @click="regVia">
        通过
      </el-button>
      <el-button v-if="reg.state === 2 && showExportAdjust"
                 type="danger"
                 icon="el-icon-refresh-right"
                 @click="regBack">
        退回
      </el-button>
      <el-button v-if="reg.state === 1 && showSubmit"
                 type="primary"
                 icon="el-icon-s-promotion"
                 @click="submitLeaderOpinion">
        保存
      </el-button>
      <el-button class="m_t_10"
                 @click="goBack">
        <i class="el-icon-back" />
        返回
      </el-button>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import { REG_STATE } from "@/util/assessment/constants";
import { sexDict } from "@/util/assessment/dict";
export default {
  name: "ViewReg",
  data() {
    return {
      reg: {
        oid: null,
        yearId: null,
        yearName: null,
        userName: null,
        sex: null,
        birthday: null,
        degree: null,
        position: null,
        deptName: null,
        job: null,
        summary: null,
        leaderOpinion: null,
        groupOpinion: null,
        orgOpinion: null,
        state: null,
        userType: null,
        leader: null,
      },
      showExportAdjust: false,
      showSubmit: false,
    };
  },
  mounted() {
    this.reg.oid = this.$route.query.oid;
    this.query();
  },
  methods: {
    query() {
      this.$http
        .get("/reg/data", {
          params: {
            oid: this.reg.oid,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.reg.yearName = res.data.data.yearName;
            this.reg.position = res.data.data.position;
            this.reg.job = res.data.data.job;
            this.reg.summary = res.data.data.summary;
            this.reg.leaderOpinion = res.data.data.leaderOpinion;
            this.reg.groupOpinion = res.data.data.groupOpinion;
            this.reg.orgOpinion = res.data.data.orgOpinion;
            this.reg.note = res.data.data.note;
            this.reg.state = res.data.data.state;
            this.queryUser(res.data.data.userId, res.data.data.yearId);
          }
        });
    },
    queryUser(userId, yearId) {
      this.$http
        .get("/user/userData", {
          params: {
            oid: userId,
            yearId: yearId,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.reg.userName = res.data.data.userName;
            this.reg.birthday = res.data.data.birthday;
            this.reg.deptName = res.data.data.deptName;
            this.reg.degree = res.data.data.degree;
            this.reg.sex = sexDict[res.data.data.sex];
            this.reg.userType = res.data.data.userType;
            this.reg.leader = res.data.data.leader;
            const roleIds = this.$store.state.user.roleIds;
            if (roleIds.indexOf("6") >= 0) {
              this.showExportAdjust = true;
            }
            if (roleIds.indexOf("3") >= 0 && this.reg.userType == 5) {
              this.showSubmit = true;
            }
          }
        });
    },
    regVia() {
      this.$confirm("确定通过此考核登记信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/reg/batch", {
            ids: this.reg.oid,
            state: REG_STATE.SUCCESS,
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
    regBack() {
      this.$confirm("确定退回此考核登记信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http
          .post("/reg/batch", {
            ids: this.reg.oid,
            state: REG_STATE.BACK,
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
    print() {
      this.$http.post("/download/reg/" + this.reg.oid).then((res) => {
        if (res.data.code == 0) {
          this.$alert("导出成功，点击确定打开", {
            confirmButtonText: "确定",
          }).then(() => {
            window.open(res.data.data);
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    submitLeaderOpinion() {
      if (this.reg.leaderOpinion != null && this.reg.leaderOpinion != "") {
        this.$confirm("确定提交分管领导评鉴意见吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$http
            .post("/reg/submitLeaderOpinion", {
              oid: this.reg.oid,
              leaderOpinion: this.reg.leaderOpinion,
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
      } else {
        this.$message.error("请填写分管领导评鉴意见");
      }
    },
    goBack() {
      history.go(-1);
    },
  },
};
</script>
<template>
  <div style="margin-top: 16px;">
    <avue-form ref="contractForm"
               v-model="data"
               :option="option"
               @submit="handleSubmit">
      <template slot-scope="{scope}"
                slot="zh">
        <el-row>
          <el-col :span="18">
            <el-input placeholder="请生成账号"
                      disabled
                      v-model="data.zh">
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left: 20px;"
                       @click="handleGenAccount"
                       type="primary">生成账号</el-button>
          </el-col>
        </el-row>
      </template>
    </avue-form>
  </div>
</template>

<script>
import option from "../option/basicInfoOption";
import { fetchUserInfo, postContract } from "@/api/induction/induction";
export default {
  name: "basicUserInfo",
  data() {
    return {
      data: {}, //表单信息
      option: option, //表单配置
      id: "", //用户ID
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.fetchInfo();
  },
  methods: {
    //生成账号
    handleGenAccount() {},
    //获取信息
    fetchInfo() {
      fetchUserInfo(this.id).then((res) => {
        if (res.data.data) {
          this.data = res.data.data;
        }
      });
    },
    handleSubmit(form, done) {
      let postData = {
        userName: this.data.userName,
        rzsj: JSON.stringify(this.data.rzsj),
        htqzsj: JSON.stringify(this.data.htqzsj),
        syqzsj: JSON.stringify(this.data.syqzsj),
        jxqzsj: JSON.stringify(this.data.jxqzsj),
        userId: this.data.userId,
        id: this.data.id,
      };
      postContract(postData)
        .then((res) => {
          this.$notify({
            title: "温馨提示",
            message: "保存成功!",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify({
            title: "温馨提示",
            message: err,
            type: "error",
          });
        })
        .finally(() => {
          done();
        });
    },
  },
};
</script>

<style scoped>
</style>

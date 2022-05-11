<template>
  <div class="execution">
    <basic-container>
      <el-tabs v-model="activeName" :before-leave="handleSwitchTab">
        <el-tab-pane lazy label="合同基本信息" name="0">
          <contract-view />
        </el-tab-pane>
        <el-tab-pane lazy label="人员基本信息" name="1">
          <basic-user-info />
        </el-tab-pane>
        <el-tab-pane lazy label="学历及学位" name="2">
          <education />
        </el-tab-pane>
        <el-tab-pane lazy label="校内职位" name="3">
          <school-role />
        </el-tab-pane>
        <el-tab-pane lazy label="专业技术职务" name="4">
          <profession />
        </el-tab-pane>
        <el-tab-pane lazy label="工人技术等级及职务" name="5">
          <industry />
        </el-tab-pane>
        <el-tab-pane lazy label="个人履历(校外)" name="6">
          <resume />
        </el-tab-pane>
        <el-tab-pane lazy label="政治面貌及党籍情况" name="7">
          <political />
        </el-tab-pane>
        <el-tab-pane lazy label="组织考察(考核)" name="8">
          <organize />
        </el-tab-pane>
        <el-tab-pane lazy label="服务协议" name="9">
          <service />
        </el-tab-pane>
        <el-tab-pane lazy label="处分(行政及党内)" name="10">
          <punish />
        </el-tab-pane>
        <el-tab-pane lazy label="奖励" name="11">
          <award />
        </el-tab-pane>
        <el-tab-pane lazy label="教育培训" name="12">
          <training />
        </el-tab-pane>
        <el-tab-pane lazy label="教师资格证" name="13">
          <teacher-cert />
        </el-tab-pane>
        <el-tab-pane lazy label="职业资格证子集" name="18">
          <professional-cert />
        </el-tab-pane>
        <el-tab-pane lazy label="家属" name="14">
          <family />
        </el-tab-pane>
        <el-tab-pane lazy label="社会兼职" name="15">
          <social-work />
        </el-tab-pane>
        <el-tab-pane lazy label="教师任职情况测评" name="16">
          <jobs-evaluation />
        </el-tab-pane>
        <el-tab-pane lazy label="因公/因私护照" name="17">
          <passport />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>


<script>
import store from "@/store";
import contractView from './view/contract'
import basicUserInfo from './view/basic-user'
import education from './view/education'
import schoolRole from './view/schoolRole'
import profession from './view/profession'
import industry from './view/industry'
import resume from './view/resume'
import political from './view/political'
import organize from './view/organize'
import service from './view/service'
import punish from './view/punish'
import award from './view/award'
import training from './view/training'
import teacherCert from './view/teacherCert'
import family from './view/family'
import socialWork from './view/socialWork'
import jobsEvaluation from './view/jobsEvaluation'
import passport from './view/passport'
import professionalCert from './view/professionalCert'

export default {
  name: "inductionView",
  components: {
    contractView,
    basicUserInfo,
    education,
    schoolRole,
    profession,
    industry,
    resume,
    political,
    organize,
    service,
    punish,
    award,
    training,
    teacherCert,
    family,
    socialWork,
    jobsEvaluation,
    passport,
    professionalCert
  },
  data() {
    return {
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      activeName:'3',
      fromUpdate:false,// 表单是否存在变化
    }
  },
  methods:{
    handleSwitchTab(){
      if(this.fromUpdate){
        var p = new Promise((resolve, reject) => {
          this.$confirm('本页信息存在修改，确认放弃修改吗?', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            // 你可以在这儿做些操作
            resolve()
          }).catch(err => {
            // 你可以在这儿做些操作
            reject(err)
          })
        })
        return p;
      }else{
        return true;
      }
    }
  }
}
</script>


<style>
.idCard1 div{
  width: 220px;
  padding: 20px 26px !important;
}
</style>

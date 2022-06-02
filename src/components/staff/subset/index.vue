<template>
  <div class="personal_container">
    <div class="page_header_box">
      <el-page-header @back="goBack"
                      content="子集" />
    </div>
    <div class="personal_box">
      <el-card class="personal_left">
        <el-menu default-active="xljxw"
                 @select="activeMenu">
          <el-menu-item index="xljxw">
            <i class="el-icon-menu"></i>
            <span slot="title">学历及学位</span>
          </el-menu-item>
          <el-menu-item index="grll">
            <i class="el-icon-menu"></i>
            <span slot="title">个人履历</span>
          </el-menu-item>
          <el-menu-item index="family">
            <i class="el-icon-menu"></i>
            <span slot="title">家属</span>
          </el-menu-item>
          <el-menu-item index="leader">
            <i class="el-icon-menu"></i>
            <span slot="title">校内职务</span>
          </el-menu-item>
          <el-menu-item index="professionduty">
            <i class="el-icon-menu"></i>
            <span slot="title">专业技术职务</span>
          </el-menu-item>
          <el-menu-item index="workerskillgrade">
            <i class="el-icon-menu"></i>
            <span slot="title">职业技术等级及职务</span>
          </el-menu-item>
          <el-menu-item index="parttimejob">
            <i class="el-icon-menu"></i>
            <span slot="title">社会兼职</span>
          </el-menu-item>
          <el-menu-item index="servicetoenterprise">
            <i class="el-icon-menu"></i>
            <span slot="title">服务协议</span>
          </el-menu-item>
          <el-menu-item index="certificate">
            <i class="el-icon-menu"></i>
            <span slot="title">职业资格证</span>
          </el-menu-item>
          <el-menu-item index="jszgz">
            <i class="el-icon-menu"></i>
            <span slot="title">教师资格证</span>
          </el-menu-item>
          <el-menu-item index="furtherstudyforeign">
            <i class="el-icon-menu"></i>
            <span slot="title">因公/因私护照</span>
          </el-menu-item>
          <el-menu-item index="organiseinspect">
            <i class="el-icon-menu"></i>
            <span slot="title">组织考察</span>
          </el-menu-item>
          <el-menu-item index="punish">
            <i class="el-icon-menu"></i>
            <span slot="title">处分信息</span>
          </el-menu-item>
          <el-menu-item index="reward">
            <i class="el-icon-menu"></i>
            <span slot="title">奖励信息</span>
          </el-menu-item>
        </el-menu>
      </el-card>
      <el-card class="personal_right">
        <keep-alive>
          <component :is="bindComp" />
        </keep-alive>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bindComp: "xljxw",
    };
  },
  methods: {
    activeMenu(index, indexPath) {
      this.bindComp = index;
    },
    goBack() {
      this.$router.back();
    },
  },
  components: {
    xljxw: () => import("./view/xljxw"),
    grll: () => import("./view/grll"),
    family: () => import("./view/family"),
    leader: () => import("./view/leader"),
    professionduty: () => import("./view/professionduty"),
    workerskillgrade: () => import("./view/workerskillgrade"),
    parttimejob: () => import("./view/parttimejob"),
    servicetoenterprise: () => import("./view/servicetoenterprise"),
    certificate: () => import("./view/certificate"),
    jszgz: () => import("./view/jszgz"),
    furtherstudyforeign: () => import("./view/furtherstudyforeign"),
    organiseinspect: () => import("./view/organiseinspect"),
    punish: () => import("./view/punish"),
    reward: () => import("./view/reward"),
  },
};
</script>

<style lang="scss" scoped>
.personal_container {
  .page_header_box {
    padding: 10px 20px;
  }
  .personal_box {
    display: flex;
    .personal_left {
      flex: 1;
      margin: 10px 5px 10px 20px;
    }
    .personal_right {
      flex: 4;
      margin: 10px 20px 10px 5px;
    }
  }
}
</style>
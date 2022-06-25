<template>
  <div class="personal_container">
    <el-card class="personal_left">
      <el-menu default-active="info"
               @select="activeMenu">
        <el-menu-item index="info"
                      v-if="basic_menu">
          <i class="el-icon-menu"></i>
          <span slot="title">个人基本情况</span>
        </el-menu-item>
        <el-menu-item index="parttimejob"
                      v-if="social_work_menu">
          <i class="el-icon-menu"></i>
          <span slot="title">社会兼职</span>
        </el-menu-item>
        <el-menu-item index="professionduty"
                      v-if="specialized_job_menu">
          <i class="el-icon-menu"></i>
          <span slot="title">专业技术职务</span>
        </el-menu-item>
      </el-menu>
    </el-card>
    <el-card class="personal_right">
      <keep-alive>
        <component :is="bindComp" />
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      bindComp: "info",

      basic_menu: false,
      social_work_menu: false,
      specialized_job_menu: false,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
  },
  created() {
    this.basic_menu = this.permissions["staff_myinfo_basic"]; //个人信息基本情况
    this.social_work_menu = this.permissions["staff_myinfo_social_work"]; //个人信息社会兼职
    this.specialized_job_menu =
      this.permissions["staff_myinfo_specialized_job"]; //个人信息专业技术职务
  },
  methods: {
    activeMenu(index, indexPath) {
      this.bindComp = index;
    },
  },
  components: {
    info: () => import("./view/info.vue"),
    parttimejob: () => import("./view/child/parttimejob"),
    professionduty: () => import("./view/child/professionduty"),
  },
};
</script>

<style lang="scss" scoped>
.personal_container {
  display: flex;
  .personal_left {
    flex: 1;
    margin: 10px 10px 10px 20px;
  }
  .personal_right {
    flex: 4;
    margin: 10px 20px 10px 10px;
  }
}
</style>
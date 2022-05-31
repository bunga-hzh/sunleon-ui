<template>
  <div class="personal_container">
    <el-card class="personal_left">
      <!-- <div>
        <div class="avatar_name">
          <div>
            <el-avatar :size="140"
                       src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
          <div class="name">{{userInfo.realName}}</div>
        </div>
      </div> -->
      <!-- <el-divider><i class="el-icon-s-promotion"></i></el-divider> -->
      <el-menu default-active="info"
               @select="activeMenu">
        <el-menu-item index="info">
          <i class="el-icon-menu"></i>
          <span slot="title">人员基本情况</span>
        </el-menu-item>
        <el-menu-item index="office">
          <i class="el-icon-menu"></i>
          <span slot="title">任职信息</span>
        </el-menu-item>
        <el-menu-item index="examine">
          <i class="el-icon-menu"></i>
          <span slot="title">年度考核</span>
        </el-menu-item>
        <el-menu-item index="jsfzxx">
          <i class="el-icon-menu"></i>
          <span slot="title">教师发展信息</span>
        </el-menu-item>
        <el-menu-item index="punishReward">
          <i class="el-icon-menu"></i>
          <span slot="title">奖惩信息</span>
        </el-menu-item>
        <el-menu-item index="salary">
          <i class="el-icon-menu"></i>
          <span slot="title">薪酬福利信息</span>
        </el-menu-item>
        <el-menu-item index="bankno">
          <i class="el-icon-menu"></i>
          <span slot="title">财务信息</span>
        </el-menu-item>
        <el-menu-item index="child">
          <i class="el-icon-menu"></i>
          <span slot="title">子集</span>
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
    };
  },
  methods: {
    activeMenu(index, indexPath) {
      this.bindComp = index;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  components: {
    info: () => import("./view/info.vue"),
    office: () => import("./view/office"),
    examine: () => import("./view/examine"),
    jsfzxx: () => import("./view/jsfzxx"),
    punishReward: () => import("./view/punishReward"),
    salary: () => import("./view/salary"),
    bankno: () => import("./view/bankno"),
    child: () => import("./view/child"),
  },
};
</script>

<style lang="scss" scoped>
.personal_container {
  display: flex;
  .personal_left {
    flex: 1;
    margin: 10px;
    .avatar_name {
      display: flex;
      flex-direction: column;
      align-items: center;
      .name {
        margin-top: 5px;
        font-size: 20px;
        font-family: Extra large;
        color: #56bf99;
      }
    }
    .other_info {
      ul {
        li {
          list-style: none;
          font-size: 16px;
          font-family: Medium;
          line-height: 30px;
          span {
            font-size: 13px;
            font-family: Small;
          }
        }
      }
    }
  }
  .personal_right {
    flex: 4;
    margin: 10px;
  }
}
</style>
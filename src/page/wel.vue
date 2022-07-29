<template>
  <div class="home_container">
    <el-row :gutter="20">
      <el-col :md="12" :sm="12" :xs="24">
        <Todone />
      </el-col>
      <el-col :md="12" :sm="12" :xs="24">
        <SysMsg />
      </el-col>
    </el-row>
    <el-card shadow="hover" class="fast_icon">
      <div class="icon_box">
        <a href="#" class="icon" v-for="item in iconList" :key="item.id">
          <img :src="item.icon" />
          <span>{{ item.title }}</span>
        </a>
      </div>
    </el-card>
  </div>
</template>

<script>
import Todone from "@/components/wel/to-done"
import SysMsg from "@/components/wel/sys-msg"

export default {
  name: "Wel",
  components: {
    Todone,
    SysMsg
  },
  data () {
    return {
      iconList: [
        {
          id: 1,
          title: "组织架构",
          icon: "https://s1.ax1x.com/2022/03/12/b7AS91.png",
        },
        {
          id: 2,
          title: "教职工信息管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7EgoQ.png",
        },
        {
          id: 3,
          title: "招聘竞聘管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7EoLT.png",
        },
        {
          id: 4,
          title: "绩效考核管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7VSOK.png",
        },
        {
          id: 5,
          title: "教师研修管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7VkYd.png",
        },
        {
          id: 6,
          title: "薪酬福利管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7VDh9.png",
        },
        {
          id: 7,
          title: "合同管理",
          icon: "https://s1.ax1x.com/2022/03/12/b7ZiuV.png",
        },
        {
          id: 8,
          title: "自助服务",
          icon: "https://s1.ax1x.com/2022/03/12/b7ZmC9.png",
        },
      ],
    }
  },
};
</script>

<style scoped="scoped" lang="scss">
.home_container {
  .el-row {
    padding: 20px;
  }

  .fast_icon {
    margin: 0 20px;

    .icon_box {
      width: 800px;
      margin: 0 auto;

      .icon {
        display: inline-block;
        width: 100px;
        height: 80px;
        margin: 50px;

        img {
          display: block;
          width: 50%;
          height: 50px;
          margin: 0 auto;
        }

        span {
          display: inline-block;
          width: 100%;
          height: 30px;
          text-align: center;
          font-size: 12px;
          font-family: Extra Small;
        }
      }

      .icon:hover {
        color: #409eff;
      }
    }
  }
}
</style>

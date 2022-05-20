<template>
  <div class="home_container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="title">
            待办事项&nbsp;&nbsp;(<span>{{ upcomingList.length }}</span
            >)
          </p>
          <li v-for="(item, index) in upcomingList" :key="item.id">
            <router-link to="#">{{ index + 1 }}. {{ item.title }}</router-link>
          </li>
          <li
            v-show="upcomingList.length === 6"
            @mouseenter="showMore"
            @mouseleave="hideMore"
            @click="viewMore"
          >
            {{ upcomingMore }}
          </li>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <p class="title">
            通知公告&nbsp;&nbsp;(<span>{{ notifyList.length }}</span
            >)
          </p>
          <li v-for="(item, index) in notifyList" :key="item.id">
            <router-link to="#">{{ index + 1 }}. {{ item.title }}</router-link>
          </li>
          <li
            v-show="notifyList.length === 6"
            @mouseenter="showMore"
            @mouseleave="hideMore"
            @click="viewMore"
          >
            {{ notifyMore }}
          </li>
        </el-card>
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
// import { getMsg } from "@/api/admin/notice";

export default {
  name: "Wel",
  data() {
    return {
      // 系统消息
      upcomingList: [],
      // 通知公告
      notifyList: [],
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
      upcomingMore: "......",
      notifyMore: "......",
    };
  },
  methods: {
    // 获取消息
    // async getMsg() {
    //   const { data: res } = await getMsg({
    //     current: 1,
    //     size: 6,
    //   });
    //   if (res.code !== 0) return this.$message.error(res.msg);
    //   res.data.records.forEach((item) => {
    //     if (item.msgType === "1") {
    //       this.notifyList.push(item);
    //     }
    //     if (item.msgType === "2") {
    //       this.upcomingList.push(item);
    //     }
    //   });
    // },
    // 显示 更多
    showMore() {
      this.upcomingMore = "点击查看更多  ·····";
      this.notifyMore = "点击查看更多  ······";
    },
    // 隐藏 更多
    hideMore() {
      this.upcomingMore = "......";
      this.notifyMore = "......";
    },
    // 查看更多
    viewMore() {
      this.$router.push("/admin/notice/myMassage");
    },
  },
  created() {
    // this.getMsg();
  },
};
</script>

<style scoped="scoped" lang="scss">
.home_container {
  .el-row {
    padding: 20px;

    .el-card {
      padding: 0;
      height: 350px;
      .title {
        text-align: center;
        font-size: 16px;
        font-family: Medium;
        font-weight: bold;
        span {
          color: rgb(255, 102, 102);
        }
      }
      li {
        font-size: 14px;
        font-family: Base;
        list-style: none;
        margin: 20px 0;
        color: rgba(0, 0, 0, 0.44);
        a {
          color: rgba(0, 0, 0, 0.44);
        }
        a:hover {
          color: #409eff;
        }
      }
    }
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
        // border: #409eff solid 1px;
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

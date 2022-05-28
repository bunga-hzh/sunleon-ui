<template>
  <basic-container>
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane label="待办事项"
                   name="1">
        <SysNotifyMsg />
      </el-tab-pane>
      <el-tab-pane label="通知公告"
                   name="2">
        <NotifyMsg />
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import SysNotifyMsg from "./components/SysNotityMsg.vue";
import NotifyMsg from "./components/NotifyMsg.vue";

export default {
  data() {
    return {
      activeName: "1",

      flag: false,
    };
  },
  components: {
    SysNotifyMsg,
    NotifyMsg,
  },
  methods: {
    handleClick(tab) {},
    // 加载更多
    pageChange(page, done) {
      setTimeout(() => {
        if (this.flag) {
          done();
          return this.$message.warning("没有更多数据了");
        }
        this.page.size += 7;
        if (this.activeName === "1") {
          this.getNoticeMsg(this.page);
        }
        if (this.activeName === "2") {
          this.getSysNoticeMsg(this.page);
        }
        console.log(this.data.length);
        console.log(this.page.size);
        console.log(this.data.length < this.page.size);
        // if (this.data.length < this.page.size) {
        //   this.flag = true;
        // }
        done();
      }, 1000);
    },
  },
};
</script>

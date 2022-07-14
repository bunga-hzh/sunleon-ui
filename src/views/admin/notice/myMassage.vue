<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="待办事项" name="1">
        <SysNotifyMsg />
      </el-tab-pane>
      <el-tab-pane label="通知公告" name="2">
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
  // mounted() {
  //   if (this.$route.query.type === "1") {
  //     this.activeName = "1"
  //   }
  //   if (this.$route.query.type === "2") {
  //     this.activeName = "2"
  //   }
  // }
};
</script>

<template>
  <msgCard :data="data" :type="1" :title="title" />
</template>

<script>
import msgCard from './msg-card.vue'
import { getAllSysNoticeMsg } from "@/api/admin/notice";

export default {
  components: {
    msgCard
  },
  data() {
    return {
      data: [],
      title: "待办事项"
    }
  },
  methods: {
    // 获取待办消息
    async getSysNoticeMsg(page) {
      const { data: res } = await getAllSysNoticeMsg();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data;
    },
  },
  mounted() {
    this.getSysNoticeMsg()
  }
}
</script>

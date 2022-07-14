<template>
  <msgCard :data="data" :type="2" :title="title" />
</template>

<script>
import msgCard from './msg-card.vue'
import { getAllNoticeMsg } from "@/api/admin/notice";

export default {
  components: {
    msgCard
  },
  data() {
    return {
      data: [],
      title: '通知公告'
    }
  },
  methods: {
    // 获取通知公告
    async getNoticeMsg(page) {
      const { data: res } = await getAllNoticeMsg();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data;
    },
  },
  mounted() {
    this.getNoticeMsg()
  }
}
</script>

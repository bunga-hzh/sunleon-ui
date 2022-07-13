<template>
  <msgCard :data="data" />
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
      data: []
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

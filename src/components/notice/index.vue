<template>
  <div>
    <el-page-header style="padding: 8px 10px;" @back="goBack" content="详情">
    </el-page-header>
    <basic-container>
      <avue-article :props="props" :data="data"></avue-article>
    </basic-container>
  </div>
</template>

<script>
import { getObj } from "@/api/admin/notice";

export default {
  data() {
    return {
      data: undefined,
      props: {
        title: "title",
        meta: "createUserName",
        body: "content",
      },
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
  created() {
    getObj(this.$route.params.id).then((res) => {
      if (res.data.code !== 0) return this.$message.error(res.data.msg);
      this.data = res.data.data;
    });
  },
};
</script>

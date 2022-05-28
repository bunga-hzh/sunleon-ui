<template>
  <avue-notice @click="handleClick"
               :data="data"
               :option="option"
               @page-change="pageChange"></avue-notice>
</template>

<script>
import { getSysNoticeMsg, setReadStatus } from "@/api/admin/notice";
import { validatenull } from "@/util/validate";

export default {
  data() {
    return {
      option: {
        props: {
          title: "title",
          subtitle: "createTime",
          tag: "tag",
          status: "status",
        },
      },
      data: [],
      page: {
        total: 0,
        current: 1,
        size: 7,
      },
      flag: false,
    };
  },
  methods: {
    // 获取系统消息
    async getMsg() {
      const { data: res } = await getSysNoticeMsg({
        current: this.page.current,
        size: this.page.size,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      console.log(res.data.records);
      this.page = res.data.total;
      res.data.records.forEach((item) => {
        if (validatenull(item.status)) {
          this.data.push(item);
        } else {
          this.data.push({
            ...item,
            tag: item.status === "0" ? "未读" : "已读",
          });
        }
      });
    },
    // 加载更多
    pageChange(page, done) {
      if (this.flag) {
        this.$message.warning("没有更多了！");
        done();
        return;
      }
      setTimeout(async () => {
        if (this.flag) {
          done();
          return this.$message.warning("没有更多数据了");
        }
        const { data: res } = await getSysNoticeMsg({
          current: page,
          size: 7,
        });
        if (res.code !== 0) return this.$message.error(res.msg);
        if (res.data.records.length === 0) {
          this.flag = true;
          done();
          return this.$message.warning("没有更多了！");
        }
        this.data = [...this.data, ...res.data.records];
        done();
      }, 1000);
    },
    handleClick(item) {
      if (!validatenull(item.id) && item.status === "0") {
        setReadStatus(item.id);
      }
      this.$router.push(`/notice/index/${item.mid}`);
    },
  },
  created() {
    this.getMsg();
  },
};
</script>
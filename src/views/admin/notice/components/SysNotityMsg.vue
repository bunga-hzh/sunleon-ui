<template>
  <avue-crud :data='data' :option='option' :page.sync="page" @on-load="onLoad" @refresh-change="refreshChange">
    <template slot='menu' slot-scope="scope">
      <el-button type="text" icon="el-icon-info" @click="toDetailsPage(scope.row)">详情</el-button>
      <el-button type="text" icon="el-icon-message-solid" :disabled="scope.row.status !== '0'"
        @click="markRead(scope.row)">{{ scope.row.status === '0' ? '是否标记为已处理' : "消息已处理" }}</el-button>
    </template>
    <template slot='status' slot-scope="scope">
      <el-tag type="warning" v-if="scope.row.status === '0'">未处理</el-tag>
      <el-tag type="success" v-else-if="scope.row.status === '1'">已处理</el-tag>
      <!-- <el-tag type="danger" v-else>错误，请联系管理员</el-tag> -->
    </template>
  </avue-crud>
</template>

<script>
import { option } from "./option"
import { getSysNoticeMsg, markRead } from "@/api/admin/notice";

export default {
  data() {
    return {
      option: option,
      data: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
    };
  },
  methods: {
    // 获取系统消息
    async getMsg() {
      const { data: res } = await getSysNoticeMsg({
        current: this.page.currentPage,
        size: this.page.pageSize,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.page.total = res.data.total;
      this.data = res.data.records
    },
    onLoad() {
      this.getMsg()
    },
    refreshChange() {
      this.getMsg()
    },
    async toDetailsPage(item) {
      if (item.moduleUrl !== null) {
        this.$router.push(item.moduleUrl)
      } else {
        this.$router.push(`/notice/index/${item.mid}`)
      }
    },
    markRead(item) {
      if (item.status !== "0") return this.$notify.warning('消息已读')
      this.$confirm('是否标记为已读?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 修改状态为已读
        const { data: res } = await markRead(item.mid)
        if (res.code != 0) return this.message.error("出现错误，请联系管理员！")
        item.status = "1"
        this.$notify.success('消息状态已读')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      });
    },
  },
};
</script>

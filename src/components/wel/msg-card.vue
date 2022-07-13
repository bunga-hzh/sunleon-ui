<template>
  <el-card shadow="hover">
    <div class="title-container">
      {{ title }}
      <el-button type="text" icon="el-icon-more" class="more-btn" @click="toMorePage">更多</el-button>
    </div>
    <div class="list">
      <div class="list-item" v-for="(item, index) in data" :key="index">
        <div class="list-item-index">{{ index + 1 }}.</div>
        <div class="list-item-msg-container">
          <div class="list-item-msg-container-title" @click="toDetailsPage(item)">
            {{ item.title }}
          </div>
          <div class="list-item-msg-container-time">{{ item.createTime }}</div>
          <el-tooltip class="item" effect="dark" content="标记为已读" placement="top">
            <div class="list-item-msg-container-icon"><i
                :class="item.status === '0' ? 'el-icon-message-solid no-read' : 'el-icon-message-solid read'"
                @click="markRead(item)" />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { markRead } from '@/api/admin/notice'

export default {
  props: {
    data: {
      type: Array,
    }
  },
  data() {
    return {
      title: "待办事项"
    }
  },
  methods: {
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
    async toDetailsPage(item) {
      if (item.moduleUrl !== null) {
        this.$router.push(item.moduleUrl)
      } else {
        this.$router.push(`/notice/index/${item.mid}`)
      }
    },
    toMorePage() {
      this.$router.push("/admin/notice/myMassage");
    }
  }
}
</script>

<style scoped lang="scss">
.title-container {
  position: relative;
  text-align: center;
  font-size: 16px;
  font-family: large;
  font-weight: bolder;
  padding-bottom: 5px;

  .more-btn {
    position: absolute;
    right: 0;
  }
}

.list {
  width: 100%;
  height: 300px;
  padding: 10px;
  overflow: auto;

  &-item {
    height: 40px;
    display: flex;
    padding: 5px 0;

    &-index {
      left: 0;
      width: 30px;
      height: 100%;
      text-align: center;
      font-size: 14px;
      font-family: Base;
      line-height: 25px;
      color: rgb(176, 176, 176);
    }

    &-msg-container {
      width: 100%;
      font-size: 14px;
      font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
      display: flex;
      justify-content: space-between;

      &-title {
        padding: 0 5px;
        width: 350px;
        font-size: 16px;
        font-family: Medium;
        //超出一行省略号
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &-time {
        flex: 9;
        font-size: 14px;
        font-family: Base;
        color: rgb(176, 176, 176);
        line-height: 25px;
      }

      &-icon {
        flex: 1;
      }
    }
  }

  // 设置滚动条样式

  /* 整个滚动条 */
  &::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 5px;
    /* 对应横向滚动条的宽度 */
    height: 0;
  }

  /* 滚动条上的滚动滑块 */
  &::-webkit-scrollbar-thumb {
    background-color: #56BF99;
    border-radius: 32px;
    width: 20px;
  }

  /* 滚动条轨道 */
  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 32px;
  }
}

.read {
  color: #56BF99;
}

.no-read {
  color: #F56C6C,
}

.list-item-msg-container-title:hover {
  cursor: pointer;
  color: #56BF99;
}
</style>

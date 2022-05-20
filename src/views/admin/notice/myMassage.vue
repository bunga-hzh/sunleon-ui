<template>
  <basic-container>
    <el-tabs v-model="activeName" @tab-click="handleClickTab">
      <el-tab-pane label="待办事项" name="1"></el-tab-pane>
      <el-tab-pane label="通知公告" name="2"></el-tab-pane>
    </el-tabs>
    <avue-notice
      @click="handleClick"
      :data="data"
      :option="option"
      @page-change="pageChange"
    ></avue-notice>
    <el-dialog
      center
      top="0%"
      title="消息"
      v-dialogDrag
      :visible.sync="dialogVisible"
      class="avue-dialog avue-dialog--top"
      width="60%"
    >
      <avue-article :props="articleProps" :data="articleData"></avue-article>
      <div class="avue-dialog__footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false" type="primary"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getNoticeMsg,
  getSysNoticeMsg,
  putMsgUserObj,
} from "@/api/admin/notice";

export default {
  data() {
    return {
      activeName: "1",
      option: {
        props: {
          title: "title",
          subtitle: "createTime",
          tag: "tag",
          status: "status",
        },
      },
      data: [],
      dialogVisible: false,

      // 系统消息
      upcomingList: [],
      // 通知公告
      notifyList: [],

      page: {
        current: 1,
        size: 7,
      },

      articleProps: {
        title: "title",
        body: "content",
      },
      articleData: {
        title: "永远的蝴蝶",
        content: `<p>那时候刚好下着雨，柏油路面湿冷冷的，还闪烁着青、黄、红颜色的灯火。我们就在骑楼下躲雨，看绿色的邮筒孤独地站在街的对面。我白色风衣的大口袋里有一封要寄给南部的母亲的信。樱子说她可以撑伞过去帮我寄信。我默默点头。</p>
                <p>“谁叫我们只带来一把小伞哪。”她微笑着说，一面撑起伞，准备过马路帮我寄信。从她伞骨渗下来的小雨点，溅在我的眼镜玻璃上。</p>
                <p>随着一阵拔尖的煞车声，樱子的一生轻轻地飞了起来。缓缓地，飘落在湿冷的街面上，好像一只夜晚的蝴蝶。</p>
                <p>虽然是春天，好像已是秋深了。</p>
                <p>她只是过马路去帮我寄信。这简单的行动，却要叫我终身难忘了。我缓缓睁开眼，茫然站在骑楼下，眼里裹着滚烫的泪水。世上所有的车子都停了下来，人潮涌向马路中央。没有人知道那躺在街面的，就是我的，蝴蝶。这时她只离我五公尺，竟是那么遥远。更大的雨点溅在我的眼镜上，溅到我的生命里来。</p>
                <p>为什么呢？只带一把雨伞？</p>
                <p>然而我又看到樱子穿着白色的风衣，撑着伞，静静地过马路了。她是要帮我寄信的。那，那是一封写给南部母亲的信。我茫然站在骑楼下，我又看到永远的樱子走到街心。其实雨下得并不大，却是一生一世中最大的一场雨。而那封信是这样写的，年轻的樱子知不知道呢？</p>
                <blockquote>
                  <p>妈：我打算在下个月和樱子结婚。</p>
                </blockquote>`,
      },
      flag: false,
    };
  },
  methods: {
    handleClickTab(tab) {
      this.page.size = 7;
      if (tab.name === "1") {
        this.getNoticeMsg(this.page);
      }
      if (tab.name === "2") {
        this.getSysNoticeMsg(this.page);
      }
    },
    async handleClick(item) {
      this.dialogVisible = true;
      if (item.ststus === "1") return true;
      item.status = "1";
      console.log(item);
      const { data: res } = await putMsgUserObj(item);
      if (res.code !== 0) return this.$message.error(res.msg);
      console.log(res);
      item.tag = "已读";
    },
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
    // 获取通知公告
    async getNoticeMsg(page) {
      const { data: res } = await getNoticeMsg(page);
      if (res.code !== 0) return this.$message.error(res.msg);
      const arr = [];
      res.data.records.forEach((item) => {
        if (item.status === "0") {
          item.tag = "未读";
          arr.push(item);
        }
        if (item.status === "1") {
          item.tag = "已读";
          arr.push(item);
        }
      });
      this.data = arr;
    },
    // 获取系统消息
    async getSysNoticeMsg(page) {
      const { data: res } = await getSysNoticeMsg(page);
      if (res.code !== 0) return this.$message.error(res.msg);
      const arr = [];
      res.data.records.forEach((item) => {
        if (item.status === "0") {
          item.tag = "未读";
          arr.push(item);
        }
        if (item.status === "1") {
          item.tag = "已读";
          arr.push(item);
        }
      });
      this.data = arr;
    },
  },
  mounted() {
    this.getNoticeMsg(this.page);
  },
};
</script>

<style></style>

<template>
  <basic-container>
    <el-tabs v-model="activeName">
      <el-tab-pane label="待办事项" name="1"></el-tab-pane>
      <el-tab-pane label="通知公告" name="2"></el-tab-pane>
      <el-tab-pane label="已读" name="3"></el-tab-pane>
      <el-tab-pane label="未读" name="4"></el-tab-pane>
    </el-tabs>
    <avue-notice
      @click="handleClick"
      :data="data"
      :option="option"
      @page-change="pageChange"
    ></avue-notice>
    <el-dialog
      title="提示"
      v-dialogDrag
      :visible.sync="dialogVisible"
      class="avue-dialog avue-dialog--top"
      width="60%"
    >
      <span>这是一段信息</span>
      <div class="avue-dialog__footer">
        <el-button @click="type1 = false">取 消</el-button>
        <el-button @click="type1 = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>

<script>
let list = [
  {
    img: "https://avuejs.com/images/logo-bg.jpg",
    title: "史蒂夫·乔布斯 关注了你",
    subtitle: "05-08 15:08",
    tag: "已经开始",
    status: 0,
  },
  {
    img: "https://avuejs.com/images/logo-bg.jpg",
    title: "斯蒂夫·沃兹尼亚克 关注了你",
    subtitle: "05-08 15:08",
    tag: "未开始",
    status: 1,
  },
  {
    img: "https://avuejs.com/images/logo-bg.jpg",
    title: "乔纳森·伊夫 关注了你",
    subtitle: "05-08 15:08",
    tag: "有警告",
    status: 2,
  },
  {
    img: "https://avuejs.com/images/logo-bg.jpg",
    title: "蒂姆·库克 关注了你",
    subtitle: "05-08 15:08",
    status: 3,
    tag: "有错误",
  },
  {
    img: "https://avuejs.com/images/logo-bg.jpg",
    title: "比尔·费尔南德斯 关注了你",
    subtitle: "05-08 15:08",
    status: 4,
    tag: "已完成",
  },
];
export default {
  data() {
    return {
      activeName: "1",
      option: {
        props: {
          img: "img",
          title: "title",
          subtitle: "subtitle",
          tag: "tag",
          status: "status",
        },
      },
      data: list,
      dialogVisible: false,
    };
  },
  methods: {
    handleClick(item) {
      this.$message.success(JSON.stringify(item));
      this.dialogVisible = true;
    },
    pageChange(page, done) {
      setTimeout(() => {
        this.$message.success("页码" + page);
        this.data = this.data.concat(list);
        done();
      }, 1000);
    },
  },
};
</script>

<style></style>

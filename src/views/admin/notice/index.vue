<template>
  <div class="notice_container">
    <basic-container>
      <avue-crud
        ref="crud"
        v-model="form"
        :data="data"
        :option="option"
        :page.sync="page"
        :table-loading="showLoading"
        :before-close="beforeClose"
        @on-load="get"
        @row-save="rowSave"
        @row-update="rowUpdate"
        @row-del="rowDel"
        @refresh-change="refreshChange"
        @search-change="searchChange"
      >
        <template slot="noticeObjForm">
          <el-row>
            <el-col :span="24">
              <el-radio v-model="form.noticeObj" label="1">全体用户</el-radio>
              <el-radio v-model="form.noticeObj" label="2">指定用户</el-radio>
            </el-col>
            <el-col :span="24" v-show="form.noticeObj === '2'">
              <!-- <avue-select
                all
                multiple
                v-model="form.userId"
                placeholder="请选择用户"
                type="tree"
                :dic="dicUser"
                @focus="getUser"
                :props="props"
              ></avue-select> -->
              <avue-input-table
                :props="props"
                :column="column"
                :on-load="onLoadUser"
                v-model="user_form.userId"
                placeholder="请选择用户"
              ></avue-input-table>
            </el-col>
          </el-row>
        </template>

        <template slot="menuForm" slot-scope="{ type }">
          <el-button
            v-show="type === 'add'"
            type="primary"
            icon="el-icon-s-promotion"
            @click="saveRelease"
            >保存并发布</el-button
          >
        </template>

        <template slot="menu" slot-scope="scope">
          <el-button
            :disabled="scope.row.status === '1'"
            type="text"
            icon="el-icon-s-promotion"
            @click="release(scope.row)"
            >发布</el-button
          >
          <el-button
            :disabled="scope.row.status === '2'"
            type="text"
            icon="el-icon-circle-close"
            @click="withdraw(scope.row)"
            >撤回</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchList, addObj, putObj, delObj } from "@/api/admin/notice";
import { addObj as addObjMsgUser } from "@/api/admin/msguser";
import { fetchList as fetchListUser } from "@/api/admin/user";
import { option } from "@/const/crud/admin/notice";

export default {
  name: "Notice",
  data() {
    return {
      showLoading: false,
      form: {},
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      user_form: {
        msgId: undefined,
        userId: undefined,
        // userId: [],
      },
      dicUser: [],
      props: {
        label: "realName",
        value: "userId",
      },
      column: {
        children: {
          border: true,
          searchMenuSpan: 4,
          column: [
            {
              label: "姓名",
              search: true,
              prop: "realName",
            },
            {
              label: "用户ID",
              prop: "userId",
              hide: true,
            },
            {
              label: "教职工号",
              search: true,
              prop: "username",
            },
          ],
        },
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 获取表格数据
    async get(page, params) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.showLoading = false;
      this.data = res.data.records;
    },

    // 添加
    async rowSave(form, done, loading) {
      if (form.noticeObj === "2" && !this.user_form.userId)
        return this.$message.error("请选择用户");
      form.createUserName = this.userInfo.realName;
      form.createUserId = this.userInfo.userId;
      const { data: res } = await addObj(form);
      if (res.code !== 0) return this.$message.error("添加失败！" + res.msg);
      this.user_form.msgId = res.data;
      if (form.noticeObj === "2" && this.user_form.userId) {
        const { data: res } = await addObjMsgUser(this.user_form);
        if (res.code !== 0) return this.$message.error("添加失败！" + res.msg);
      }
      this.$message.success("添加成功！");
      this.refreshChange();
      done();
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj(form);
      if (res.code !== 0) return this.$message.error("修改失败！" + res.msg);
      this.$message.success("修改成功！");
      done(form);
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj(form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.get(this.page);
        })
        .catch(() => {});
    },
    // 刷新
    refreshChange() {
      this.get(this.page);
    },
    // 搜索
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.get(this.page, params);
      done();
    },
    // 表格选择器
    async onLoadUser({ page, value, data }, callback) {
      if (page) {
        const { data: res } = await fetchListUser({
          current: page.currentPage,
          size: page.pageSize,
        });
        if (res.code !== 0) return this.$message.error(res.msg);
        callback({ total: res.data.total, data: res.data.records });
      }

      if (data) {
        const { data: res } = await fetchListUser(
          Object.assign(
            {
              current: page.currentPage,
              size: page.pageSize,
            },
            data
          )
        );
        callback({ total: res.data.total, data: res.data.records });
      }
    },
    // 关闭Dialog
    beforeClose(done, type) {
      this.user_form.msgId = undefined;
      this.user_form.userId = undefined;
      done();
    },

    //发布
    async release(row) {
      row.status = "1";
      const { data: res } = await putObj(row);
      if (res.code !== 0) return this.$message.error("发布失败！" + res.msg);
      this.$message.success("发布成功！");
    },
    //撤回
    async withdraw(row) {
      row.status = "2";
      const { data: res } = await putObj(row);
      if (res.code !== 0) return this.$message.error("撤回失败！" + res.msg);
      this.$message.success("撤回成功！");
    },
    // 保存并发布
    async saveRelease() {
      this.form.status = "1";
      this.$refs.crud.rowSave();
    },
    // 获取用户
    async getUser() {
      const { data: res } = await fetchListUser({
        current: 1,
        size: 1000,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      this.dicUser = res.data.records;
    },
  },
};
</script>

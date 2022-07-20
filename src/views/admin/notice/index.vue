<template>
  <div class="notice_container">
    <basic-container>
      <avue-crud ref="crud" v-model="form" :data="data" :option="option" :page.sync="page" :table-loading="showLoading"
        :before-open="beforeOpen" @on-load="onLoad" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel"
        @refresh-change="refreshChange" @search-change="searchChange">
        <template slot="noticeObjForm" slot-scope="{ type }">
          <el-row>
            <el-col :span="24">
              <el-radio v-model="form.noticeObj" label="1" :disabled="type === 'edit' || type === 'view'">全体用户
              </el-radio>
              <el-radio v-model="form.noticeObj" label="2" :disabled="type === 'edit' || type === 'view'">指定用户
              </el-radio>
            </el-col>
            <el-col :span="24" v-show="form.noticeObj === '2' && type === 'add'">
              <avue-select all multiple v-model="ids" placeholder="请选择用户" type="tree" :dic="dicUser" :props="props">
              </avue-select>
            </el-col>
          </el-row>
        </template>

        <template slot="menuForm" slot-scope="{ type, disabled }">
          <el-button :disabled="disabled" v-show="type === 'add'" icon="el-icon-s-promotion" @click="saveRelease"
            type="info" plain>保存并发布</el-button>
        </template>

        <template slot="menu" slot-scope="{ row, index }">
          <el-button icon="el-icon-edit" type="text" :disabled="row.status === '1'"
            @click="$refs.crud.rowEdit(row, index)">
            编辑
          </el-button>
          <el-button icon="el-icon-delete" type="text" :disabled="row.status === '1'"
            @click="$refs.crud.rowDel(row, index)">
            删除
          </el-button>
          <el-button :disabled="row.status === '1'" type="text" icon="el-icon-s-promotion" @click="release(row)">发布
          </el-button>
          <el-button :disabled="row.status === '0' || row.status === '2'" type="text" icon="el-icon-circle-close"
            @click="withdraw(row)">撤回</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fetchList, addObj, putObj, delObj } from "@/api/admin/notice";
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
      ids: [],
      dicUser: [],
      props: {
        label: "realName",
        value: "userId",
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    // 初次加载执行
    onLoad() {
      this.get(this.page);
    },
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
      this.page.total = res.data.total;
      this.data = res.data.records;
      this.showLoading = false;
    },

    // 添加
    async rowSave(form, done, loading) {
      if (form.noticeObj === "2" && !this.ids)
        return this.$message.error("请选择用户");
      const obj = {
        ...form,
        createUserName: this.userInfo.realName,
        createUserId: this.userInfo.userId,
        userIds: this.ids,
      };
      const { data: res } = await addObj(obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("发布成功");
      done();
      done();
      this.refreshChange();
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      if (form.status === '1') return this.$message.warning('请先撤回消息！')
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
        .catch(() => { });
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
    beforeOpen(done, type) {
      this.ids = [];
      this.getUser();
      done();
    },
  },
};
</script>

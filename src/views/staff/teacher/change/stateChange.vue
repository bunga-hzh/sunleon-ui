<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        v-model="form"
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
        @on-load="loadList"
        @row-save="add"
        @row-update="rowUpdate"
        @row-del="rowDel"
        @refresh-change="refreshChange"
        @search-change="searchChange"
      >
        <template slot="changeEvidenceForm">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/teacher/change/stateChange";
import {
  fetchList,
  addObj,
  putObj,
  delObj,
} from "@/api/staff/teacher/change/stateChange";

export default {
  name: "StateChange",
  data() {
    return {
      // 表格配置对象
      option: option,
      // 表格数据源集合
      data: undefined,
      // 搜索的表单对象
      search: {},
      // 分页查询对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 表单对象
      form: {},
      // 下拉对象
      objIdOption: undefined,
      ydlxOption: undefined,
    };
  },
  methods: {
    async getList(page, params) {
      const { data: res } = await fetchList(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params,
          this.search
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data.records;
      this.page.total = res.data.total;
    },

    loadList() {
      this.getList(this.page);
    },

    // 新增
    async add(form, done, loading) {
      const { data: res } = await addObj(form);
      if (res.code !== 0) {
        loading();
        return this.$message.error(res.msg);
      }
      this.$message.success("添加成功！");
      done(form);
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj(form);
      if (res.code !== 0) {
        this.$message.error(res.code);
        loading();
      }
      this.$message.success("修改成功！");
      loading();
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
          if (res.code !== 0) return this.message.error(res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.loadList();
        })
        .catch(() => {});
    },
    // 刷新
    refreshChange() {
      this.loadList();
      this.$message.success("刷新成功！");
    },
    // 搜索
    searchChange(form, done) {
      this.search = form;
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
  },
};
</script>

<style lang="scss" scoped></style>

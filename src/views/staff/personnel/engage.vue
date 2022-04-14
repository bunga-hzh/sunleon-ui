<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
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
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/personnel/engage";
import { get, add, edit, del } from "@/const/staff/crud";
import { result } from "@/const/staff/message";

export default {
  name: "TableEngage",
  data() {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: undefined,
      option: option,
      // 搜索的表单对象
      search: {},
    };
  },
  methods: {
    async getList(page, query) {
      const { data: res } = await get(
        "expert",
        {
          current: page.currentPage,
          size: page.pageSize,
        },
        query,
        this.search
      );
      if (!result(this, res, "get")) return true;
      this.data = res.data.records;
      this.page.total = res.data.total;
    },

    loadList() {
      this.getList(this.page);
    },

    // 新增
    async add(form, done, loading) {
      const { data: res } = await add("expert", form);
      if (!result(this, res, "add")) return true;
      this.$message.success("添加成功！");
      done(form);
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await edit("expert", form);
      if (!result(this, res, "edit")) {
        loading();
        return true;
      }
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
          const { data: res } = await del("expert", form.id);
          if (!result(this, res, "del")) return true;
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

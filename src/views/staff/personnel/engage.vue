<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        v-model="form"
        :option="option"
        :data="data"
        :page.sync="page"
        :before-open="beforeOpen"
        @on-load="loadList"
        @row-save="add"
        @row-update="rowUpdate"
        @row-del="rowDel"
        @refresh-change="refreshChange"
        @search-change="searchChange"
      >
        <template slot="xmForm" slot-scope="{ type }">
          <el-autocomplete
            :disabled="type === 'edit' ? true : false"
            v-model="form.xm"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            @select="handleSelect"
            clearable
          ></el-autocomplete>
        </template>
        <template slot="sarteDate" slot-scope="scope">
          {{ scope.row.sarteDate }} - {{ scope.row.endDate }}
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/personnel/engage";
import { get, add, edit, del } from "@/const/staff/crud";
import { result } from "@/const/staff/message";
import { fetchList } from "@/api/staff/crud";
import { jzg_page } from "@/const/staff/page";

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
      // 表单对象
      form: {},

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.sarteDate = [this.form.sarteDate, this.form.endDate];
      }
      done();
    },
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
      if (res.code !== 0) return this.$message.error(res.msg);
      this.data = res.data.records;
      this.page.total = res.data.total;
    },

    loadList() {
      this.getList(this.page);
    },

    // 新增
    async add(form, done, loading) {
      const addForm = {
        xm: form.xm,
        gh: form.gh,
        deptId: form.deptId,
        engageName: form.engageName,
        expertLevel: form.expertLevel,
        salary: form.salary,
        reason: form.reason,
        sarteDate: form.sarteDate[0],
        endDate: form.sarteDate[1],
        memo: form.memo,
      };
      const { data: res } = await add("expert", addForm);
      if (!result(this, res, "add")) return true;
      this.$message.success("添加成功！");
      done(addForm);
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const editForm = {
        id: form.id,
        xm: form.xm,
        gh: form.gh,
        deptId: form.deptId,
        engageName: form.engageName,
        expertLevel: form.expertLevel,
        salary: form.salary,
        reason: form.reason,
        sarteDate: form.sarteDate[0],
        endTime: form.sarteDate[1],
        memo: form.memo,
      };
      console.log(editForm);
      const { data: res } = await edit("expert", editForm);
      if (!result(this, res, "edit")) {
        loading();
        return true;
      }
      loading();
      this.refreshChange();
      done();
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

    async loadAll() {
      const { data: res } = await fetchList("info", jzg_page);
      if (res.code !== 0) return true;
      res.data.records.forEach((item) => {
        this.restaurants.push({
          value: item.xm,
          gh: item.gh,
          deptId: item.orgId,
          staffId: item.id,
        });
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.deptId = item.deptId;
      this.form.staffId = item.staffId;
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>

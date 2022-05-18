<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        v-model="form"
        :option="option"
        :data="data"
        :page.sync="page"
        :table-loading="showLoading"
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
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/teacher/change/stateChange";
import { add, edit, getList, delData, searchData } from "@/const/staff/crud";
import { fetchList } from "@/api/staff/crud";
import { jzg_page } from "@/const/staff/page";
import { result } from "@/const/staff/message";

export default {
  name: "StateChange",
  data() {
    return {
      // 表格配置对象
      option: option,
      // 表格数据源集合
      data: undefined,
      // 分页查询对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
      // 表单对象
      form: {},

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    loadList() {
      getList("change", this);
    },

    // 新增
    async add(form, done, loading) {
      const { data: res } = await add("change", form);
      if (!result(this, res, "add")) {
        done();
        loading();
      }
      done(form);
      loading();
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await edit("change", form);
      if (!result(this, res, "edit")) {
        done();
        loading();
      }
      done(form);
      loading();
    },
    // 删除
    rowDel(form, index) {
      delData("change", this, form, index, () => {
        getList("change", this);
      });
    },
    // 刷新
    refreshChange() {
      getList("change", this);
      this.$message.success("刷新成功！");
    },
    // 搜索
    searchChange(form, done) {
      searchData("change", this, form, done);
    },

    async loadAll() {
      const { data: res } = await fetchList("info", jzg_page);
      if (res.code !== 0) return true;
      res.data.records.forEach((item) => {
        this.restaurants.push({
          value: item.xm,
          gh: item.gh,
          orgId: item.orgId,
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
      }, 1000 * Math.random());
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
      this.form.orgId = item.orgId;
      this.form.staffId = item.staffId;
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>

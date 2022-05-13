<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="item.id"
          :label="item.label"
          :name="item.value"
        >
          <avue-crud
            :ref="index === 3 ? 'crud' : ''"
            :option="optionList[index]"
            :data="data"
            :page.sync="page"
            v-model="form"
            :before-close="beforeClose"
            @on-load="loadList(index, apiUrlList[index])"
            @row-save="add"
            @row-update="edit"
            @row-del="del"
            @selection-change="selectionChange"
            @refresh-change="refreshChange"
            @search-change="searchChange"
          >
            <template slot="xmForm">
              <el-autocomplete
                v-model="form.xm"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入姓名"
                @select="handleSelect"
                clearable
              ></el-autocomplete>
            </template>

            <template slot="menu" slot-scope="scope">
              <el-button
                v-show="index === 3"
                type="text"
                @click="renewRow(scope.row)"
                icon="el-icon-finished"
                >续签</el-button
              >
            </template>

            <template slot="menuLeft" v-if="item.value == 4">
              <el-button
                v-show="index === 3"
                type="primary"
                icon="el-icon-finished"
                @click="batchRenew"
                >批量续签</el-button
              >
              <!-- 批量续签对话框 -->
              <el-dialog
                title="续签至"
                :visible.sync="dialogVisible"
                width="20%"
                @close="toggleSelection()"
              >
                <!-- 日期选择器 -->
                <avue-date
                  v-model="period"
                  format="yyyy年MM月dd日"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择日期"
                ></avue-date>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="renew">批量续签</el-button>
                </span>
              </el-dialog>
            </template>
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import {
  optionList,
  tabList,
} from "@/const/crud/staff/teacher/change/workChange";

import { add, edit, getList, delData, searchData } from "@/const/staff/crud";
import { fetchList } from "@/api/staff/crud";
import { page } from "@/const/staff/page";
import { result } from "@/const/staff/message";

export default {
  name: "TableEngage",
  data() {
    return {
      tabList: tabList,
      activeName: "1",

      optionList: optionList,

      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: undefined,
      option: undefined,
      form: {},

      period: undefined,
      dataChild: undefined,
      dialogVisible: false,
      renewList: [],
      renewType: undefined,
      renewObj: {},

      apiUrlList: [
        "ywglsxqbhg",
        "ywglsyqbhg",
        "ywglzz",
        "ywglhtxq",
        "ywglzg",
        "ywglzdy",
      ],

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    get(type) {
      getList(type, this);
    },
    loadList(index, type) {
      if (this.activeName == index + 1) getList(type, this);
    },

    async add(form, done, loading) {
      const { data: res } = await add(
        this.apiUrlList[this.activeName - 1],
        form
      );
      if (!result(this, res, "add")) {
        done();
        loading();
      }
      done();
      loading();
      getList(this.apiUrlList[this.activeName - 1], this);
    },

    async edit(form, index, done, loading) {
      const { data: res } = await edit(
        this.apiUrlList[this.activeName - 1],
        form
      );
      if (!result(this, res, "edit")) {
        done();
        loading();
      }
      done();
      loading();
      getList(this.apiUrlList[this.activeName - 1], this);
    },
    async del(form, index) {
      delData(this.apiUrlList[this.activeName - 1], this, form, index, () => {
        getList(this.apiUrlList[this.activeName - 1], this);
      });
    },

    async loadAll() {
      const { data: res } = await fetchList("info", page);
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
    beforeClose(done, type) {
      if (type === "add") {
        Object.keys(this.form).forEach((key) => (this.form[key] = ""));
      }
      done();
    },

    handleClick(val) {
      this.option = this.optionList[val.index];
      if (val.index == 0) this.get("ywglsxqbhg");
      if (val.index == 1) this.get("ywglsyqbhg");
      if (val.index == 2) this.get("ywglzz");
      if (val.index == 3) this.get("ywglhtxq");
      if (val.index == 4) this.get("ywglzg");
      if (val.index == 5) this.get("ywglzdy");
    },
    // 批量续签
    batchRenew() {
      if (this.renewList.length == 0)
        return this.$message.error("请选择需要续签的用户！");
      this.renewType = "plxq";
      this.dialogVisible = true;
    },
    // 续签
    renewRow(row) {
      this.renewObj = row;
      this.renewType = "xq";
      this.dialogVisible = true;
    },
    selectionChange(list) {
      this.renewList = list;
    },
    // 提交续签
    async renew() {
      if (this.renewType === "plxq") {
        this.renewList.forEach(async (item) => {
          item.endDate = this.period;
          const { data: res } = await add("ywglhtxq", item);
          if (res.code !== 0) return this.$message.error(res.msg);
        });
      }
      if (this.renewType === "xq") {
        this.renewObj.endDate = this.period;
        const { data: res } = await add("ywglhtxq", this.renewObj);
        if (res.code !== 0) return this.$message.error(res.msg);
      }
      this.dialogVisible = false;
      this.renewObj = {};
      this.$message.success("续签成功");
      getList(this.apiUrlList[this.activeName - 1], this);
    },
    toggleSelection(val) {
      this.period = undefined;
      this.$refs.crud[0].toggleSelection(val);
    },
    refreshChange() {
      getList(this.apiUrlList[this.activeName - 1], this);
    },
    searchChange(form, done) {
      searchData(this.apiUrlList[this.activeName - 1], this, form, done);
    },
  },
  mounted() {
    this.option = this.optionList[0];
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>

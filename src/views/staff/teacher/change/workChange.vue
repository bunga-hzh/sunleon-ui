<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName"
               @tab-click="handleClick"
               type="card">
        <el-tab-pane label="实习期不合格"
                     name="1">
          <Internship />
        </el-tab-pane>
        <el-tab-pane label="试用期不合格"
                     name="2">
          <Tryout />
        </el-tab-pane>
        <el-tab-pane label="转正"
                     name="3">
          <Positive />
        </el-tab-pane>
        <el-tab-pane label="合同续签"
                     name="4">
          <Contract />
        </el-tab-pane>
        <el-tab-pane label="转岗"
                     name="5">
          <Transfer />
        </el-tab-pane>
        <el-tab-pane label="其他"
                     name="6">
          <Other />
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

import Internship from "./workChangeComponents/view/Internship";
import Tryout from "./workChangeComponents/view/Tryout";
import Positive from "./workChangeComponents/view/Positive";
import Contract from "./workChangeComponents/view/Contract";
import Transfer from "./workChangeComponents/view/Transfer";
import Other from "./workChangeComponents/view/Other";

import { add, edit, getList, delData, searchData } from "@/const/staff/crud";
import { result } from "@/const/staff/message";
import { loadAll } from "@/const/staff/getAllUser";

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
    };
  },
  components: {
    Internship,
    Tryout,
    Positive,
    Contract,
    Transfer,
    Other,
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
      this.$message.success("刷新成功！");
    },
    searchChange(form, done) {
      searchData(this.apiUrlList[this.activeName - 1], this, form, done);
    },
  },
  created() {
    loadAll();
  },
};
</script>

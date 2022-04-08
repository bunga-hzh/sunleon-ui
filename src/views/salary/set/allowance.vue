<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.label"
        :name="item.value"
      >
        <avue-crud
          :data="data"
          :option="option"
          :search.sync="search"
          :page.sync="page"
          v-model="form"
        ></avue-crud>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { option, datas } from "@/const/crud/salary/set/allowance";
import { getRygwlx } from "@/const/staff/getSelectOption";

export default {
  data() {
    return {
      data: undefined,
      datas: datas,
      option: option,
      search: {},
      form: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      tabList: undefined,
      // 当前激活标签
      activeName: undefined,
    };
  },
  methods: {
    async getRygwlx() {
      const { data: res } = await getRygwlx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.tabList = res.data;
      this.activeName = this.tabList[0].value;
    },
    // 标签点击事件
    handleClick(val) {
      this.data = this.datas[val.index];
    },
  },
  mounted() {
    this.getRygwlx();
    this.data = this.datas[0];
  },
};
</script>

<style></style>

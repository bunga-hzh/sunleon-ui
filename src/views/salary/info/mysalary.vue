<template>
  <basic-container>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="item.id"
        :label="item.label"
        :name="item.id"
      >
        <avue-crud :data="data" :option="options[index]"></avue-crud>
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>

<script>
import { tabs, options } from "@/const/crud/salary/info/mysalary";

export default {
  data() {
    return {
      activeName: "1",
      tabs: tabs,
      options: options,
      data: undefined,
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style></style>

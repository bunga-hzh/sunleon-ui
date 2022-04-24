<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    ></avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/audit/review";

export default {
  data() {
    return {
      data: [
        {
          shbm: "部门一",
          shr: "张三",
          shnr: "校内奖金",
          tjsj: "2022-03-03",
          bz: "无",
        },
      ],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
    };
  },
};
</script>

<style></style>

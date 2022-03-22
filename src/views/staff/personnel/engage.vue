<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { data, option } from "@/const/crud/staff/personnel/engage";

export default {
  name: "TableEngage",
  data() {
    return {
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: data,
      option: option,
      // 搜索的表单对象
      search: {},
    };
  },
};
</script>

<style lang="scss" scoped>
</style>

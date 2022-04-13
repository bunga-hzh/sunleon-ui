<template>
  <basic-container>
    <avue-crud
      :option="option"
      :search.sync="search"
      :data="data"
      :page.sync="page"
    >
      <template slot="menu">
        <el-button type="text" icon="el-icon-push">新增</el-button>
        <el-button type="text" icon="el-icon-circle-close">停用</el-button>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/admin/area";

export default {
  data() {
    return {
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [
        {
          areaName: "北京市",
          areaCode: "110000",
          children: [
            {
              areaName: "北京城区",
              areaCode: "110100",
            },
          ],
        },
      ],
      option: option,
      // 搜索的表单对象
      search: {},
    };
  },
};
</script>

<style></style>

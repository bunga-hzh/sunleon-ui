<template>
  <basic-container>
    <avue-crud
      :option="option"
      :data="data"
      :page.sync="page"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @refresh-change="refreshChange"
    >
    </avue-crud>
  </basic-container>
</template>

<script>
import axios from "axios";

import { option } from "@/const/crud/admin/area";

let baseUrl = "http://localhost:8080/act/sysRegion/getRegionTree";

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
        // {
        //   areaName: "北京市",
        //   areaCode: "110000",
        //   children: [
        //     {
        //       areaName: "北京城区",
        //       areaCode: "110100",
        //     },
        //   ],
        // },
      ],
      option: option,
    };
  },
  methods: {
    rowSave() {},
    rowUpdate() {},
    // treeLoad(tree, treeNode, resolve) {},
    refreshChange() {
      console.log("aaa");
      axios.get(baseUrl, { id: "-1" }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style></style>

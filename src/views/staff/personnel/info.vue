<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud :option="option"
                 :data="data"
                 :page.sync="page"> </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/personnel/info";

export default {
  name: "TableEngage",
  data() {
    return {
      // 数据源
      data: [
        {
          gh: "10086",
          xm: "张三",
          orgId: 1,
          bzlx: "事业编制",
          rylx: "在职人员",
          jslx: "外聘教师",
          rzrq: "2022-02-02",
        },
        {
          gh: "10087",
          xm: "李四",
          orgId: 33,
          bzlx: "非事业编制",
          rylx: "在职人员",
          jslx: "非外聘教师",
          rzrq: "2022-02-02",
        },
      ],
      option: option,
      page: {
        total: 2,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  methods: {},
};
</script>

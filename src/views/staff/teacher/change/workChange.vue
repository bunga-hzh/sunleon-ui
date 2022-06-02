<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName"
               type="card">
        <el-tab-pane label="试用期不合格"
                     name="1">
          <Tryout />
        </el-tab-pane>
        <el-tab-pane label="转正"
                     name="2">
          <Positive />
        </el-tab-pane>
        <el-tab-pane label="人事合同管理"
                     name="3">
          <Contract />
        </el-tab-pane>
        <el-tab-pane label="转岗"
                     name="4">
          <Transfer />
        </el-tab-pane>
        <el-tab-pane label="其他"
                     name="5">
          <Other />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import { tabList } from "@/const/crud/staff/teacher/change/workChange";

import Tryout from "./workChangeComponents/view/Tryout";
import Positive from "./workChangeComponents/view/Positive";
import Contract from "./workChangeComponents/view/Contract";
import Transfer from "./workChangeComponents/view/Transfer";
import Other from "./workChangeComponents/view/Other";

export default {
  name: "TableEngage",
  data() {
    return {
      tabList: tabList,
      activeName: "1",
    };
  },
  components: {
    Tryout,
    Positive,
    Contract,
    Transfer,
    Other,
  },
};
</script>

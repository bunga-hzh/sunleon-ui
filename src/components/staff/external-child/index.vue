<template>
  <div>
    <div class="page_header_box">
      <el-page-header style="margin: 10px 20px"
                      @back="goBack"
                      content="子集" />
    </div>
    <basic-container>
      <el-tabs v-model="activeName"
               tabPosition="left"
               type="card">
        <el-tab-pane label="职业资格证书"
                     name="1">
          <certificate />
        </el-tab-pane>
        <el-tab-pane label="拟承担的教学任务"
                     name="2">
          <teachingTasks />
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import certificate from "./view/certificate";
import teachingTasks from "./view/teachingTasks";

export default {
  data() {
    return {
      activeName: "1",
    };
  },
  components: {
    certificate,
    teachingTasks,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
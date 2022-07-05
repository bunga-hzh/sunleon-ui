<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '20px' }">
      <el-tabs v-model="activeName"
               :tab-position="'left'">
        <el-tab-pane label="考核类别"
                     name="category">
          <category v-if="activeName === 'category'"
                    @parentChange="changeTab" />
        </el-tab-pane>
        <el-tab-pane label="考核内容"
                     name="norm">
          <norm-list v-if="activeName === 'norm'"
                     @parentChange="changeTab" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </basic-container>
</template>
<script>
import Category from "@/components/assessment/Category";
import NormList from "@/components/assessment/NormList";
export default {
  name: "Norm",
  components: {
    Category,
    NormList,
  },
  data() {
    return {
      activeName: "category",
    };
  },
  methods: {
    changeTab(tab) {
      this.activeName = tab;
    },
  },
};
</script>
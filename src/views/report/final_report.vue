<template>
  <div class="post">
    <basic-container>
      <div class="block" style="margin-bottom: 16px;">
        <el-date-picker
          v-model="searchDate"
          type="year"
          format="yyyy 年"
          value-format="yyyy"
          :clearable="false"
          placeholder="请选择搜索年">
        </el-date-picker>
        <el-button style="margin-left: 14px;" type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <iframe :src="src" style="width: 100%;height: calc(100vh - 220px);"/>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "finalReport",
  data(){
    return {
      searchDate:new Date().getUTCFullYear().toString(),
      src:''
    }
  },
  created() {
    this.src = "/act/jmreport/view/675878370374877184?yearTime="+this.searchDate;
  },
  methods:{
    handleSearch(){
      this.src = "/act/jmreport/view/675878370374877184?yearTime="+this.searchDate;
    }
  }
}
</script>

<style scoped>

</style>

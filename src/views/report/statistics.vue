<template>
  <div class="post">
    <basic-container>
      <div class="block" style="margin-bottom: 16px;">
        <el-date-picker
          v-model="searchDate"
          type="daterange"
          range-separator="至"
          format="yyyy年MM月dd日"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
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
      searchDate:[],
      src:''
    }
  },
  created() {
    // this.src = "/act/jmreport/view/676423845679235072?timeStart="+this.searchDate[0]+'&timeEnd='+this.searchDate[1];
  },
  methods:{
    handleSearch(){
      if(this.searchDate.length==2){
        this.src = "/act/jmreport/view/676423845679235072?timeStart="+this.searchDate[0]+'&timeEnd='+this.searchDate[1];
      }else{
        this.$message({
          type:'warning',
          message:'请选择对应时间!'
        })
      }

    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="margin-top: 16px;">
      <avue-form ref="industryForm" v-model="data" :option="option" @submit="handleSubmit">
      </avue-form>
  </div>
</template>

<script>
import option from '../option/industryOption'
// import {} from "@/api/induction/induction";
export default {
  name: "industry",
  data(){
    return{
      data:{}, //表单信息
      option:{}, //表单配置
      id:'',//用户ID
      delFlg:[], //删除的节点
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getContractInfo();

    let optionConfig = option;
    optionConfig.column[0].children['rowDel']=(row,done)=>{
      if(row.hasOwnProperty('id')){
        this.delFlg = this.delFlg.concat(row.id);
      }
      done();
    };
    this.option = optionConfig;
  },
  methods:{
    //获取合同基本信息
    getContractInfo() {
      // fetchEduInfo(this.id).then(res=>{
      //   // console.log();
      //   if(res.data.data){
      //     this.data['dynamic'] = res.data.data;
      //   }
      // })
    },
    handleSubmit(form,done){
      let postData = {
        jzgXls:form.dynamic,
        delIds:this.delFlg
      };

      // saveEduInfo(postData,this.id).then(res=>{
      //   this.$notify({
      //     title: '温馨提示',
      //     message: '保存成功!',
      //     type: 'success'
      //   });
      // }).catch(err=>{
      //   this.$notify({
      //     title: '温馨提示',
      //     message: err,
      //     type: 'error'
      //   });
      // }).finally(()=>{
      //   done();
      // })
    }
  }
}
</script>

<style scoped>

</style>

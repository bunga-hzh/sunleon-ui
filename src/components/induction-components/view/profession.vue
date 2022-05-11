<template>
  <div style="margin-top: 16px;">
      <avue-form ref="professionForm" v-model="data" :option="option" @submit="handleSubmit">
      </avue-form>
  </div>
</template>

<script>
import option from '../option/professionOption'
import {fetchListByType, saveListInfo} from "@/api/induction/induction";
export default {
  name: "profession",
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
      fetchListByType(this.id,4).then(res=>{
        // console.log();
        if(res.data.data){
          this.data['dynamic'] = res.data.data;
        }
      })
    },
    handleSubmit(form,done){
      let postData = {
        jzgZyjszws:form.dynamic,
        delIds:this.delFlg
      };

      saveListInfo(postData,this.id).then(res=>{
        this.$notify({
          title: '温馨提示',
          message: '保存成功!',
          type: 'success'
        });
      }).catch(err=>{
        this.$notify({
          title: '温馨提示',
          message: err,
          type: 'error'
        });
      }).finally(()=>{
        done();
      })
    }
  }
}
</script>

<style scoped>

</style>

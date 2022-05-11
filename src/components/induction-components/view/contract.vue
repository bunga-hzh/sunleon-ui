<template>
  <div style="margin-top: 16px;">
      <avue-form ref="contractForm" v-model="data" :option="option" @submit="handleSubmit">
      </avue-form>
  </div>
</template>

<script>
import option from '../option/contractOption'
import {fetchContract, postContract} from "@/api/induction/induction";
export default {
  name: "contract",
  data(){
    return{
      data:{}, //表单信息
      option:option, //表单配置
      id:'',//用户ID
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.getContractInfo();
  },
  methods:{
    //获取合同基本信息
    getContractInfo() {
      fetchContract(this.id).then(res => {
        let viewData = {
          userName:res.data.data.userName,
          rzsj:JSON.parse(res.data.data.rzsj),
          htqzsj:JSON.parse(res.data.data.htqzsj),
          syqzsj:JSON.parse(res.data.data.syqzsj),
          jxqzsj:JSON.parse(res.data.data.jxqzsj),
          userId:res.data.data.userId,
          id:res.data.data.id
        };
        this.data = viewData;
      })
    },
    handleSubmit(form,done){
      let postData = {
        userName:this.data.userName,
        rzsj:JSON.stringify(this.data.rzsj),
        htqzsj:JSON.stringify(this.data.htqzsj),
        syqzsj:JSON.stringify(this.data.syqzsj),
        jxqzsj:JSON.stringify(this.data.jxqzsj),
        userId:this.data.userId,
        id:this.data.id
      };
      postContract(postData).then(res=>{
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

<template>
  <div>
    <!-- 导入对话框 -->
    <el-dialog
      title="佐证材料审核"
      :visible.sync="open"
      width="50%"
      append-to-body
    >
    <avue-form :option="formOption" v-model="formData" @submit="handleApprovedSubmit">
      <template slot-scope="scope" slot="menuForm">
        <el-button type="danger" @click="handleRejectionSubmit" v-if="formOption.submitBtn ? true:false" icon="el-icon-close">审核拒绝</el-button>
        <el-button type="warning" @click="handleDownload" icon="el-icon-download">下载审核材料</el-button>
      </template>
    </avue-form>
    </el-dialog>
  </div>
</template>


<script>
import {MaterialFormOption} from './formOption'
import {
  fetchMaterialsInfo,
} from "@/api/recuit/endFace/viaMemberList/viaMemberList";
import {postReviewComments} from "@/api/recuit/common/commonApi";

export default {
  name: "AduitWindow",
  components: {},
  data(){
    return{
      open:false,
      formOption:MaterialFormOption,
      formData:{}, //保存表单
      fetchRes:{}, //查询审核数据
    }
  },
  methods:{
    //展示审核窗口
    show(row){
      this.open = true;
      // formData
      fetchMaterialsInfo(row.deliveryId).then((fetchRes)=>{
        let newOption = this.formOption;
        newOption["submitBtn"] = true;
        this.formOption = JSON.parse(JSON.stringify(newOption));
        this.fetchRes = fetchRes.data.data;
        this.formData = {
          name:row.candidateName,
          resourcesList:fetchRes.data.data.zzzclLbs,
          cjsj:fetchRes.data.data.zzcl.cjsj,
          fzjl:fetchRes.data.data.zzcl.sffz
        };
      }).catch(er=>{
        let newOption = this.formOption;
        newOption["submitBtn"] = false;
        this.formOption = JSON.parse(JSON.stringify(newOption));
      })
    },
    //下载佐证材料
    handleDownload(){
      if(this.fetchRes.zzzclLbs){
        this.fetchRes.zzzclLbs.map(item=>{
          this.downFile(item.value,item.fileName);
        })
      }else{
        this.$message.warning("无佐证材料附件，无法下载!")
      }
    },
    //审核通过
    handleApprovedSubmit(){
      const postData = {
        taskId:this.fetchRes.taskId,
        comment:this.formData.remark,
        gwTdId:this.fetchRes.zzcl.gwtdId,
        submitFlag:true
      };
      postReviewComments(postData).then((res)=>{
        this.$message.success("审核完成!")
        this.open = false;
        this.$emit("getlist");
      })
    },
    //审核拒绝
    handleRejectionSubmit(){
      if(this.formData.remark){
        const postData = {
          taskId:this.fetchRes.taskId,
          comment:this.formData.remark,
          gwTdId:this.fetchRes.zzcl.gwtdId,
          submitFlag:false
        };
        postReviewComments(postData).then((res)=>{
          this.$message.success("审核完成!")
          this.open = false;
          this.$emit("getlist");
        })
      }else{
        this.$message.warning("请填写审核意见!")
      }

    }
  }
}
</script>

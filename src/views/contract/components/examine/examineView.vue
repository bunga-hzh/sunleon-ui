<template>
  <el-drawer
    title="合同审核"
    :visible.sync="open"
    size="70%"
    :direction="'rtl'">
    <el-row type="flex" style="height: 100%;margin: 0px 0px;" :gutter="0">
      <el-col :span="14">
        <el-tabs v-model="activeName" style="height: 100%;" class="tabs_views" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="basic" style="height: 100%;">
            <iframe :src="basicUrl" width="100%" height="100%" style="border-width: 0px;"></iframe>
          </el-tab-pane>

          <el-tab-pane :label="item.label" :name="'first_'+index" style="height: 100%;" v-for="(item,index) in htfjId" :key="index+'_temp'">
            <iframe :src="item.value" width="100%" height="100%" style="border-width: 0px;"></iframe>
          </el-tab-pane>
          <el-tab-pane label="附件" name="second">
            <file-view-com ref="fileV" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="8">
        <el-form ref="form" :model="form" label-width="80px" style="margin-left: 30px;">
          <el-form-item label="审核意见:">
            <el-input type="textarea" show-word-limit maxlength="200" minlength="10" rows="6" v-model="form.yj"></el-input>
          </el-form-item>
          <el-form-item label="资金来源:">
            <el-select v-model="form.zjly" style="width: 100%;" placeholder="请选择资金来源">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.zjfzrName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" size="medium" @click="onSubmit">审核通过</el-button>
            <el-button type="danger" size="medium">审核驳回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-drawer>
</template>


<script>
import {getMyZJLY, getPreViewUrl, getPreViewUrlAll} from "@/api/contract/admin/admin";
import FileViewCom from "@/views/contract/components/archive/fileViewCom";
// let Base64 = require('js-base64').Base64;
import {Base64} from 'js-base64';

export default {
  name:'examineView',
  components: {FileViewCom},
  data(){
    return{
      propData:{},
      activeName:"basic",
      options:[], //资金来源信息
      form:{
        yj:'',
        zjly:'',//资金来源
      },
      open:false,
      preViewUrl:'',
      basicUrl:'',
      htfjId:[],
      contractArray:[],
    }
  },
  created() {
    this.Base64 = Base64;
  },
  methods:{
    onSubmit(){

    },
    handleClick(tab, event){
      if(tab.label == '附件'){
        this.$refs.fileV.show(this.propData);
      }
    },
    show(row,index){
      this.propData = row;

      const p = JSON.parse(row.htfjId);
      p.map(item=>{
        let fileName = item.value.substring(item.value.lastIndexOf("/")+1,item.value.length);
        getPreViewUrlAll(fileName).then(res=>{
          this.htfjId.push({
            label:item.label,
            value: 'http://192.168.187.90:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(res.data.data))
          })
        });
      })
      this.basicUrl =  process.env.NODE_ENV === "development" ? '/#/contract/edit/'+row.id+"?view=1": '/#/contract/edit/'+row.id+"?view=1";

      getMyZJLY(this.$store.getters.userInfo.userId).then(res=>{
        this.options = res.data.data;
      })
      this.open = true;
    }
  }
}
</script>


<style>
.tabs_views .el-tabs__content{
  height: 96%;
}
</style>

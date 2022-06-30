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
          <el-form-item label="资金来源:" v-if="iszjfzrBtn">
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
            <el-button type="primary" size="medium" @click="onSubmit(1)">审核通过</el-button>
            <el-button type="danger" size="medium" @click="onSubmit(0)">审核驳回</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-drawer>
</template>


<script>
import {getMyZJLY, getPreViewUrl, getPreViewUrlAll} from "@/api/contract/admin/admin";
import FileViewCom from "@/views/contract/components/archive/fileViewCom";
import {Base64} from 'js-base64';
import {checkExam, examLcs} from "@/api/contract/examine/examine";
import store from '@/store';

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
      iszjfzrBtn:false,
    }
  },
  created() {
    this.Base64 = Base64;
  },
  methods:{
    onSubmit(talg){
      const loading = this.$loading({
        lock: true,
        text: '处理中。。。',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      const postData = {
        taskId:this.propData.taskId,
        comment:this.form.yj,
        submitFlag:talg,
        htId:this.propData.id,
        zjly:this.form.zjly
      };
      examLcs(postData).then(res=>{
        this.$message({
          type:'success',
          message:"操作成功！"
        })
        this.open = false;
        this.$emit("eventresh");
      }).finally(()=>{
        loading.close();
      })
    },
    handleClick(tab, event){
      if(tab.label == '附件'){
        this.$refs.fileV.show(this.propData);
      }
    },
    show(row,index){
      this.htfjId = [];
      this.propData = row;

      this.form.zjly = row.zjly;

      if(row.htfjId){
        const p = JSON.parse(row.htfjId);
        const protocol = window.location.protocol;
        const host = window.location.host;

        p.map(item=>{
          console.log(`${protocol}//${host}${item.value}?TENANT-ID=${store.getters.userInfo.tenantId}&access_token=${store.getters.access_token}`)
          // let fileName = item.value.substring(item.value.lastIndexOf("/")+1,item.value.length);
          // getPreViewUrlAll(fileName).then(res=>{
            this.htfjId.push({
              label:item.label,
              value: '/preview/onlinePreview?url='+encodeURIComponent(Base64.encode(`http://192.168.187.90:9999${item.value}?TENANT-ID=${store.getters.userInfo.tenantId}&access_token=${store.getters.access_token}`))
            })
          // });
        })
      }


      checkExam(row.taskId).then(res=>{
        this.iszjfzrBtn = res.data.data;
      })

      const queryParams = {
        view: 0,
        lxId: row.htlx,
        id: row.id
      };

      this.basicUrl =  process.env.NODE_ENV === "development" ? '/#/contract/edit/'+row.id+"?params="+encodeURIComponent(JSON.stringify(queryParams)): '/#/contract/edit/'+row.id+"?params="+encodeURIComponent(JSON.stringify(queryParams));

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

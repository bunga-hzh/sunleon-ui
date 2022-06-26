<template>
  <el-drawer
    title="合同预览"
    :visible.sync="open"
    size="60%"
    :direction="'rtl'">
    <el-tabs v-model="activeName" style="height: 100%;" class="tabs_views" type="border-card">
      <el-tab-pane :label="item.label" :name="'htpre_'+index" style="height: 100%;" v-for="(item,index) in htfjId" :key="index+'_temp'">
        <iframe :src="item.value" width="100%" height="100%" style="border-width: 0px;"></iframe>
      </el-tab-pane>
    </el-tabs>

<!--    <iframe :src="preViewUrl" width="100%" height="100%" style="border-width: 0px;"></iframe>-->
    <div class="avue-dialog__footer">
      <el-button @click="open=false" type="danger">修改合同</el-button>
      <el-button @click="open=false" type="primary">提交审批</el-button>
    </div>
  </el-drawer>
</template>


<script>
import {getPreViewUrl, getPreViewUrlAll} from "@/api/contract/admin/admin";
import store from "@/store";
let Base64 = require('js-base64').Base64;
export default {
  name:'preView',
  data(){
    return{
      open:false,
      preViewUrl:'',
      htfjId:[],
      activeName:'htpre_0'
    }
  },
  methods:{
    show(row,index){
      const p = JSON.parse(row.htfjId);
      if(p){
        const p = JSON.parse(row.htfjId);
        const protocol = window.location.protocol;
        const host = window.location.host;

        p.map(item=>{
          // let fileName = item.value.substring(item.value.lastIndexOf("/")+1,item.value.length);
          // getPreViewUrlAll(fileName).then(res=>{
            this.htfjId.push({
              label:item.label,
              value: '/onlinePreview?url='+encodeURIComponent(Base64.encode(`${protocol}//${host}${item.value}?TENANT-ID=${store.getters.userInfo.tenantId}&access_token=${store.getters.access_token}`))
            })
          // });
        })
      }

      // getPreViewUrl(row.id).then(res=>{
      //
      //   this.preViewUrl = 'http://192.168.187.121:8012/onlinePreview?url='+encodeURIComponent(Base64.encode(res.data.data));
      //   // res.data.data;
      // })
      this.open = true;
    }
  }
}
</script>

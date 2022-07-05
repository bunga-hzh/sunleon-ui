<template>
  <div class="post">
    <basic-container>
      <el-page-header @back="goBack" content="简历沟通">
      </el-page-header>
      <div style="margin: 20px 0px;">
        <span>领导，您好，您有一份新的简历查阅，请查收！</span>
      </div>
      <el-link type="primary" @click="handleDownload">下载简历</el-link>
      <div style="margin: 20px 50px;">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          maxlength="200"
          show-word-limit
          placeholder="请输入评论内容"
          v-model="content">
        </el-input>
        <el-button type="primary" round style="width: 100px;margin-top: 20px;" @click="doSend">发表</el-button>

        <div style="margin-top: 20px;">
          <el-row v-for="(item,index) in commentList" :key="index" style="margin: 10px 0px;">
            <el-col :span="1">
              <div class="block"><el-avatar :size="50" :src="item.userHeaderUrl ? item.userHeaderUrl:'/img/2.png'"></el-avatar></div>
            </el-col>
            <el-col :span="16">
              <div style="font-size: 14px;color: #303133;">
                {{item.userRealName}}&nbsp;<span style="margin-left: 10px;font-size: 12px;color: #929399;">{{item.createTime}}</span>
              </div>
              <div style="margin-top: 8px;color: #606266;font-size: 14px;">
                {{item.replyContent}}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </basic-container>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import comment from 'bright-comment'
import {downloadCommunicateResume, getCommunicateList, sendCommunicate} from "@/api/recuit/common/commonApi";

export default {
  name:'Communicate',
  computed: {
    ...mapGetters(['tagList'])
  },
  components:{
    comment
  },
  data(){
    return{
      content:'',//评论内容
      msgId:'', //消息列表ID
      downloadId:'', //下载链接ID
      commentList:[],
    }
  },
  created() {
    const tempId = this.$route.params.id;
    this.msgId = tempId.split('_')[1];
    this.downloadId = tempId.split('_')[0];
    this.getList();
  },
  methods:{
    getList(){
      getCommunicateList({noticeId:this.msgId,current:1,size:30000000}).then(res=>{
        this.commentList = res.data.data.records;
      })
    },
    doSend(){
      sendCommunicate({replyContent:this.content,noticeId:this.msgId}).then(res=>{
        this.$message.success("发表成功！");
        this.getList();
        this.content = '';
      })
    },
    handleDownload(){
      downloadCommunicateResume(this.downloadId).then(response=>{
        // 前提是服务端要在header设置Access-Control-Expose-Headers: Content-Disposition
        // 前端才能正常获取到Content-Disposition内容
        const disposition = response.headers['content-disposition'];
        let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
        // iso8859-1的字符转换成中文
        fileName = decodeURI(escape(fileName));
        // 去掉双引号
        fileName = fileName.replace(/\"/g, "");
        const content = response.data;
        // console.info("rep:", disposition);
        // console.info("fileName:", fileName);
        // 创建a标签并点击， 即触发下载
        let url = window.URL.createObjectURL(new Blob([content]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", "简历附件.zip");
        //link.download = "测试下载文件.xls"
        // 模拟
        document.body.appendChild(link);
        link.click();
        // 释放URL 对象
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })
    },
    goBack(){
      this.$router.back();
      // let { tag, key } = this.findTag("im/detail")
      // this.$store.commit('DEL_TAG', tag)
      // if (tag.value === this.tag.value) {
      //   tag = this.tagList[key === 0 ? key : key - 1] // 如果关闭本标签让前推一个
      //   this.openTag(tag)
      // }
    },
    findTag(value) {
      let tag, key
      this.tagList.map((item, index) => {
        if (item.value === value) {
          tag = item
          key = index
        }
      })
      return { tag: tag, key: key }
    },
  }
}
</script>

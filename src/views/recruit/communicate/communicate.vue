<template>
  <div class="post">
    <basic-container>
      <el-page-header @back="goBack" content="简历沟通">
      </el-page-header>
      <div style="margin: 20px 0px;">
        <span>领导，您好，您有一份新的简历查阅，请查收！</span>
      </div>
      <el-link type="primary" @click="handleDownload">下载简历</el-link>
      <comment :commentNum="0" :label="''" :authorId="999999" :commentList="commentList"></comment>
    </basic-container>
  </div>
</template>


<script>
import {mapGetters} from "vuex";
import comment from 'bright-comment'

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
      commentList:[
        {
          id: 1,
          commentUser: {
            id: 1,
            nickName: "花非花",
            avatar:
              "http://qzapp.qlogo.cn/qzapp/101483738/6637A2B6611592A44A7699D14E13F7F7/50",
          },
          content:
            "<a style='text-decoration:none;color: #409eff ' href='https://blog.csdn.net/qq_40942490?spm=1000.2115.3001.5113'>我的CSDN博客地址</a>[害羞][害羞][害羞]<br/>",
          createDate: "2019-9-23 17:36:02"
        },
      ],
    }
  },
  methods:{
    handleDownload(){

    },
    goBack(){
      let { tag, key } = this.findTag("im/detail")
      this.$store.commit('DEL_TAG', tag)
      if (tag.value === this.tag.value) {
        tag = this.tagList[key === 0 ? key : key - 1] // 如果关闭本标签让前推一个
        this.openTag(tag)
      }
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

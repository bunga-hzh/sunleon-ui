<template>
  <div class="post">
    <basic-container>
      <el-page-header @back="goBack" content="简历沟通">
      </el-page-header>
      <div style="margin: 20px 0px;">
        <span>领导，您好，您有一份新的简历查阅，请查收！</span>
      </div>
      <el-link type="primary" @click="handleDownload">下载简历</el-link>
      <comment></comment>
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

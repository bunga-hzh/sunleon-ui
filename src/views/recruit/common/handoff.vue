<template>
  <div class="post">
    <basic-container>
      <el-page-header @back="goBack" content="工作交接材料提交">
      </el-page-header>
      <div style="margin-top: 30px;">
        <avue-form :option="option" v-model="form" @submit="submit"></avue-form>
      </div>
    </basic-container>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import {handOff} from "@/views/recruit/common/option";
import {postHandOff} from "@/api/recuit/common/commonApi";

export default {
  name: 'HandOff',
  computed: {
    ...mapGetters(['tagList']),
  },
  data() {
    return{
      option:handOff,
      form:{}
    }
  },
  methods:{
    submit(form,done){
      const list = this.form.uploads;
      let array = [];

      list.map(item=>{
        array.push(item.label);
      })

      postHandOff(array,this.$route.params.id).then(res=>{
        this.$notify({
          title:'温馨提示',
          type:'success',
          message:'提交成功，请等待审核完成!'
        })
        done();
      })
    },
    goBack(){
      let { tag, key } = this.findTag("mail/handoff")
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

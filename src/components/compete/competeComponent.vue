<template>
  <!-- 竞聘信息录入 -->
  <el-dialog
    :visible.sync="open"
    width="100%"
    class="dialog-resume"
    top="0vh"
    append-to-body
    :show-close="false"
  >
  </el-dialog>
</template>

<script>
export default {
  name: "competeComponent",
  components: {},
  data(){
    return{
      open:false, //是否开启
    }
  },
  methods:{
    show(row){

    }
  }

}

</script>

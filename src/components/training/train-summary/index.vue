<template>
  <basic-container>
    <el-page-header @back="goBack" content="培训小结" />
    <avue-form v-model="obj" :option="option" style="margin-top: 20px"></avue-form>
  </basic-container>
</template>

<script>
import { option } from "./option"

export default {
  data() {
    return {
      obj: null,
      option: option,
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<template>
  <basic-container>
    <avue-crud :data="date" :option="option">
      <template slot="headder">aaaaaaaaaaa</template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from './option'

export default {
  data() {
    return {
      date: [{}],
      option: option,
    }
  }
}
</script>

<style>
</style>

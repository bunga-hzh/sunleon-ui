<template>
  <basic-container>
    <avue-crud :option="option" :data="data"></avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/study/journal";

export default {
  data() {
    return {
      data: undefined,
      option: option,
    };
  },
};
</script>

<style></style>

<template>
  <basic-container>
    <avue-crud :data="data" :option="option"> </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/info/debit";

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

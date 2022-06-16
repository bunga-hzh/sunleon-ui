<template>
  <avue-crud :option="option"
             :data="data"></avue-crud>
</template>

<script>
import { certificateOption } from "@/const/crud/staff/personnel/external";

export default {
  data() {
    return {
      data: [],
      option: certificateOption,
    };
  },
};
</script>
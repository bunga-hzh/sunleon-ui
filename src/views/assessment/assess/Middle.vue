<template>
  <basic-container>
    <el-card shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          {{ yearName }}员工绩效考评中层测评
        </div>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="党政领导班子评分"
                     name="party">
          <party-leader v-if="activeName === 'party'" />
        </el-tab-pane>
        <el-tab-pane label="分管领导评分"
                     name="charge">
          <charge-leader v-if="activeName === 'charge'" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import PartyLeader from "./component/PartyLeader";
import ChargeLeader from "./component/ChargeLeader";
export default {
  name: "Middle",
  components: {
    PartyLeader,
    ChargeLeader,
  },
  data() {
    return {
      activeName: "party",
      yearName: null,
    };
  },
  mounted() {
    this.yearName = this.$store.state.user.yearName;
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
  },
};
</script>
<template>
  <basic-container>
    <remind-page :role-id="'3'"
                 :assess-type="assessType"
                 :random="random"
                 @parentChange="changeSend" />
    <el-card v-if="send"
             shadow="never"
             class="onepage">
      <div slot="header">
        <div class="title">
          {{ yearName }}员工绩效考评员工测评
        </div>
      </div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="在职在编"
                     name="zzzb">
          <staff-item v-if="activeName === 'zzzb'"
                      :user-type="1"
                      @changeRandom="changeRandom"
                      @parentChange="changeSend" />
        </el-tab-pane>
        <el-tab-pane label="编外运行"
                     name="bwyx">
          <staff-item v-if="activeName === 'bwyx'"
                      :user-type="2"
                      @changeRandom="changeRandom"
                      @parentChange="changeSend" />
        </el-tab-pane>
        <el-tab-pane label="行政外聘"
                     name="xzwp">
          <staff-item v-if="activeName === 'xzwp'"
                      :user-type="3"
                      @changeRandom="changeRandom"
                      @parentChange="changeSend" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
import RemindPage from "./component/RemindPage";
import StaffItem from "./component/StaffItem";
import { ASSESS_TYPE } from "@/util/assessment/constants";
export default {
  name: "Staff",
  components: {
    RemindPage,
    StaffItem,
  },
  data() {
    return {
      yearName: null,
      activeName: "zzzb",
      assessType: ASSESS_TYPE.ZCPYG,
      send: false,
      random: null,
    };
  },
  mounted() {
    this.yearName = this.$store.state.user.yearName;
  },
  methods: {
    changeSend(send) {
      this.send = send;
    },
    changeRandom(random) {
      this.random = random;
    },
    handleClick(tab) {
      this.activeName = tab.name;
    },
  },
};
</script>
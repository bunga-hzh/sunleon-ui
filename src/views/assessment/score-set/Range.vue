<template>
  <basic-container>
    <el-tabs v-model="activeName"
             type="border-card"
             @tab-click="handleClick">
      <el-tab-pane label="正职校级领导"
                   name="dzLeader">
        <dz-leader-list v-if="activeName === 'dzLeader'" />
      </el-tab-pane>
      <el-tab-pane label="副职校级领导"
                   name="fgLeader">
        <fg-leader-list v-if="activeName === 'fgLeader'" />
      </el-tab-pane>
      <el-tab-pane label="部门负责人"
                   name="bmfzr">
        <bmfzr-list v-if="activeName === 'bmfzr'" />
      </el-tab-pane>
      <el-tab-pane label="其他中层"
                   name="otherMiddle">
        <other-middle-list v-if="activeName === 'otherMiddle'" />
      </el-tab-pane>
      <el-tab-pane label="普通员工"
                   name="staff">
        <staff-list v-if="activeName === 'staff'" />
      </el-tab-pane>
    </el-tabs>
  </basic-container>
</template>
<script>
import DzLeaderList from "./component/DzLeaderList";
import FgLeaderList from "./component/FgLeaderList";
import BmfzrList from "./component/BmfzrList";
import OtherMiddleList from "./component/OtherMiddleList";
import StaffList from "./component/StaffList";
export default {
  name: "Range",
  components: {
    DzLeaderList,
    FgLeaderList,
    BmfzrList,
    OtherMiddleList,
    StaffList,
  },
  data() {
    return {
      activeName: "dzLeader",
    };
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
  },
};
</script>

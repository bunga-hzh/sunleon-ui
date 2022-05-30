<template>
  <el-collapse v-model="activeName"
               @change="collapseActive"
               accordion>
    <el-collapse-item title="学历级学位"
                      name="xljxw">
      <XLJXW />
    </el-collapse-item>
    <el-collapse-item title="个人履历"
                      name="grll">
      <GRLL />
    </el-collapse-item>
    <el-collapse-item title="家属"
                      name="family">
      <FAMILY />
    </el-collapse-item>
    <el-collapse-item title="校内职务表"
                      name="leader">
      <LEADER />
    </el-collapse-item>
    <el-collapse-item title="专业技术职务"
                      name="professionduty">
      <PROFESSIONDUTY />
    </el-collapse-item>
    <el-collapse-item title="工人技术等级及职务"
                      name="workerskillgrade">
      <WORKERSKILLGRADE />
    </el-collapse-item>
    <el-collapse-item title="社会兼职"
                      name="parttimejob">
      <PARTTIMEJOB />
    </el-collapse-item>
    <el-collapse-item title="服务协议"
                      name="servicetoenterprise">
      <SERVICETOENTERPRISE />
    </el-collapse-item>
    <el-collapse-item title="教师资格证"
                      name="jszgz">
      <JSZGZ />
    </el-collapse-item>
    <el-collapse-item title="职业资格证"
                      name="certificate">
      <CERTIFICATE />
    </el-collapse-item>
    <el-collapse-item title="教育培训"
                      name="train">
      <TRAIN />
    </el-collapse-item>
    <el-collapse-item title="因公/因私护照"
                      name="furtherstudyforeign">
      <FURTHERSTUDYFOREIGN />
    </el-collapse-item>
    <el-collapse-item title="组织考察（考核）"
                      name="organiseinspect">
      <ORGANISEINSPECT />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      activeName: undefined,
    };
  },
  methods: {
    // 折叠面板激活事件
    async collapseActive(activeName) {
      if (!activeName) return true;
      this.$store.commit("setActiveItem", activeName);
    },
  },
  computed: {
    ...mapMutations(["setActiveItem"]),
  },
  components: {
    XLJXW: () => import("@/views/staff/teacher/personalInfo/view/child/xljxw"),
    GRLL: () => import("@/views/staff/teacher/personalInfo/view/child/grll"),
    FAMILY: () =>
      import("@/views/staff/teacher/personalInfo/view/child/family"),
    LEADER: () =>
      import("@/views/staff/teacher/personalInfo/view/child/leader"),
    PROFESSIONDUTY: () =>
      import("@/views/staff/teacher/personalInfo/view/child/professionduty"),
    WORKERSKILLGRADE: () =>
      import("@/views/staff/teacher/personalInfo/view/child/workerskillgrade"),
    PARTTIMEJOB: () =>
      import("@/views/staff/teacher/personalInfo/view/child/parttimejob"),
    SERVICETOENTERPRISE: () =>
      import(
        "@/views/staff/teacher/personalInfo/view/child/servicetoenterprise"
      ),
    JSZGZ: () => import("@/views/staff/teacher/personalInfo/view/child/jszgz"),
    CERTIFICATE: () =>
      import("@/views/staff/teacher/personalInfo/view/child/certificate"),
    TRAIN: () => import("@/views/staff/teacher/personalInfo/view/child/train"),
    FURTHERSTUDYFOREIGN: () =>
      import(
        "@/views/staff/teacher/personalInfo/view/child/furtherstudyforeign"
      ),
    ORGANISEINSPECT: () =>
      import("@/views/staff/teacher/personalInfo/view/child/organiseinspect"),
  },
};
</script>

<style>
</style>
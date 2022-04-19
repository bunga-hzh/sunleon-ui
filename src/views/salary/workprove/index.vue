<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="zzzmwjForm">
        <el-button type="primary" icon="el-icon-s-order" @click="generateProof"
          >生成在职证明</el-button
        >
        <!-- <br /> -->
        <!-- <el-button type="primary" icon="el-icon-s-order"
          >上传在职证明</el-button
        > -->
      </template>
    </avue-crud>
    <div id="employment_certificate">
      <h2
        style="
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          margin: 20px 0;
        "
      >
        教师在职证明
      </h2>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;兹证明XXX同志（身份证号、护照号：</p>
      <p>）系我校XXXXXXXX（单位）在职教师/职工/社会用工，</p>
      <p>工资号为XXXXXXXXXXXX</p>
      <br />
      <p>&nbsp;&nbsp;&nbsp;&nbsp;特此证明</p>
      <br />
      <br />
      <br />
      <br />
      <br />
      <p style="text-align: end">XX学校人事处</p>
      <p style="text-align: end">XXXX年XX月XX日</p>
    </div>
    <!-- <el-dialog
      title="生成在职证明"
      :visible.sync="dialogVisible"
      width="50%"
      class="avue-dialog"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >生 成</el-button
        >
      </span>
    </el-dialog> -->
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/workprove";

export default {
  data() {
    return {
      data: undefined,
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
    };
  },
  methods: {
    generateProof() {
      this.$Print(document.querySelector("#employment_certificate"));
    },
  },
};
</script>

<style lang="scss" scoped>
#employment_certificate {
  display: none;
}
</style>

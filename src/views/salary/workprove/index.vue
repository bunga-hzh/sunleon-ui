<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
      v-model="form"
    >
      <template slot="zmwjForm">
        <el-button type="primary" icon="el-icon-s-order" @click="generateProof"
          >生成在职证明</el-button
        >
      </template>
    </avue-crud>
    <el-dialog title="生成在职证明" :visible.sync="dialogVisible" width="20%">
      <el-row>
        <avue-select
          v-model="proveType"
          placeholder="请选择内容"
          type="tree"
          :dic="[
            { label: '在职证明', value: '1' },
            { label: '收入证明', value: '2' },
          ]"
        ></avue-select>
      </el-row>
      <el-row>
        <el-button type="primary" icon="el-icon-s-order" @click="generateProof"
          >生成证明</el-button
        >
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      form: {},
      proveType: undefined,
    };
  },
  methods: {
    generateProof() {
      this.dialogVisible = true;
    },
    handleChange(file, fileLis) {
      this.$Export.xlsx(file.raw).then((data) => {
        this.list = data.results;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#employment_certificate {
  display: none;
}
.el-row {
  margin: 20px;
}
</style>

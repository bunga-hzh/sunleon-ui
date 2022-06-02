<template>
  <basic-container>
    <avue-crud :data="data"
               :option="option"
               :search.sync="search"
               :page.sync="page"
               v-model="form">
      <template slot="menu"
                slot-scope="scope">
        <el-button icon="el-icon-circle-check"
                   type="text"
                   @click="enable(scope.row)">启用</el-button>
        <el-button icon="el-icon-circle-close"
                   type="text"
                   @click="disable(scope.row)">停用</el-button>
      </template>
      <template slot="zjxSearch">
        <el-select v-model="search.zjx"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in zjxOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template slot="zjxForm">
        <el-select v-model="form.zjx"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in zjxOptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <template slot="xmflSearch">
        <el-select v-model="search.xmfl"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in xmflOptions"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template slot="xmflForm">
        <el-select v-model="form.xmfl"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in xmflOptions"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template slot="syztSearch">
        <el-select v-model="search.syzt"
                   placeholder="请选择"
                   clearable>
          <el-option v-for="item in syztOptions"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id">
          </el-option>
        </el-select>
      </template>
      <template slot="syztForm">
        <avue-radio v-model="form.syzt"
                    :dic="syztOptions"></avue-radio>
      </template>
      <template slot="msForm">
        <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="请输入内容"
                  v-model="form.ms">
        </el-input>
      </template>
      <template slot="syzt"
                slot-scope="scope">
        <el-tag v-if="scope.row.syzt === '1'"
                type="success">启用</el-tag>
        <el-tag v-else-if="scope.row.syzt === '2'"
                type="danger">停用</el-tag>
        <el-tag v-else
                type="danger">未知错误，请联系管理员</el-tag>
      </template>
      <template slot="zjx"
                slot-scope="scope">
        <el-tag v-if="scope.row.zjx === '1'">增项</el-tag>
        <el-tag v-else-if="scope.row.zjx === '2'"
                type="warning">减项</el-tag>
        <el-tag v-else
                type="danger">未知错误，请联系管理员</el-tag>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/set/item";
import { data } from "@/const/crud/salary/itemdatas";

export default {
  data() {
    return {
      data: data,
      option: option,
      search: {},
      form: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      // 下拉
      zjxOptions: undefined,
      xmflOptions: undefined,
      syztOptions: undefined,
    };
  },
  methods: {
    async getZjx() {
      const { data: res } = await getZjx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.zjxOptions = res.data;
    },
    async getXmfl() {
      const { data: res } = await getXmfl();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.xmflOptions = res.data;
    },
    async getSyzt() {
      const { data: res } = await getSyzt();
      if (res.code !== 0) return this.$message.error(res.msg);
      console.log(res.data);
      this.syztOptions = res.data;
    },
    // 启用
    enable() {},
    // 停用
    disable() {},
  },
  mounted() {
    this.getZjx();
    this.getXmfl();
    this.getSyzt();
  },
};
</script>

<style></style>

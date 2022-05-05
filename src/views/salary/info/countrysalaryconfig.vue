<template>
  <basic-container
    ><avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menu">
        <el-button
          type="text"
          icon="el-icon-setting
"
          @click="config"
          >权限分配</el-button
        >
      </template>
    </avue-crud>
    <el-dialog
      title="权限分配"
      :visible.sync="dialogVisible"
      width="40%"
      class="avue-dialog"
    >
      <el-transfer
        filterable
        :filter-method="filterMethod"
        filter-placeholder="请输入城市拼音"
        v-model="value"
        :data="dataConfig"
      >
      </el-transfer>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option } from "@/const/crud/salary/info/countrysalaryconfig";

export default {
  data() {
    const generateData = (_) => {
      const data = [];
      const cities = [
        "字段一",
        "字段二",
        "字段三",
        "字段四",
        "字段五",
        "字段六",
        "字段七",
      ];
      const pinyin = [
        "shanghai",
        "beijing",
        "guangzhou",
        "shenzhen",
        "nanjing",
        "xian",
        "chengdu",
      ];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index],
        });
      });
      return data;
    };
    return {
      data: [{}],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
      value: [],
      dataConfig: generateData(),
      filterMethod(query, item) {
        return item.pinyin.indexOf(query) > -1;
      },
    };
  },
  methods: {
    config() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style></style>

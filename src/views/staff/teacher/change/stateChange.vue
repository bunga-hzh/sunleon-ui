<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :label="item.label"
          :name="item.id"
        >
          <avue-crud
            :option="option"
            :search.sync="search"
            :data="data"
            :page.sync="page"
          >
            <template slot="depSearch">
              <el-select v-model="depValue" placeholder="请选择">
                <el-option
                  v-for="item in depList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
            <template slot="statusSearch">
              <el-select v-model="statusValue" placeholder="请选择">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
            <template slot="statusChangeSearch">
              <el-select v-model="statusChangeValue" placeholder="请选择">
                <el-option
                  v-for="item in statusChangeList"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import {
  tabList,
  optionList,
  dataList,
  depList,
  statusChangeList,
  statusList
} from "@/const/crud/staff/teacher/change/stateChange";

export default {
  name: "TableEngage",
  data() {
    return {
      // 激活的标签页
      activeName: "1",
      // 标签页集合
      tabList: tabList,
      // 表格配置对象集合
      optionList: optionList,
      // 表格数据源集合
      dataList: dataList,
      // 表格配置对象
      option: {},
      // 表格数据源
      data: [],
      // 分页查询对象
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 搜索的表单对象
      search: {},
      depList: depList,
      statusList: statusList,
      statusChangeList: statusChangeList,
      depValue: "",
      statusValue: "",
      statusChangeValue: ''
    };
  },
  methods: {
    handleClick(val) {
      this.option = this.optionList[val.index];
      this.data = this.dataList[val.index];
    },
  },
  created() {
    this.option = this.optionList[0];
    this.data = this.dataList[0];
  },
};
</script>

<style lang="scss" scoped>
</style>

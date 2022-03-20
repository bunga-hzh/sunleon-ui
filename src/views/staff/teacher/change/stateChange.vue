<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="退休" name="1">
          <avue-crud
            :option="option1"
            :search.sync="search"
            :data="data1"
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
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane label="离职" name="2">
          <avue-crud
            :option="option2"
            :search.sync="search"
            :data="data2"
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
          </avue-crud>
        </el-tab-pane>
        <el-tab-pane label="借调" name="3">
          <avue-crud
            :option="option3"
            :search.sync="search"
            :data="data3"
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
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "TableEngage",
  data() {
    return {
      activeName: "1",
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data1: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          time: "2022/02/02",
          remark: "无",
          annex: "无",
        },
      ],
      data2: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          time: "2022/02/02",
          reason: "无",
          prove: "无",
        },
      ],
      data3: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          start_time: "2022/02/02",
          end_time: "2022/02/02",
          reason: "无",
          annex: "无",
        },
      ],
      option1: {
        border: true,
        searchMenuSpan: 4,
        menu: false,
        column: [
          {
            label: "姓名",
            prop: "name",
            search: true,
            searchSpan: 6,
          },
          {
            label: "部门",
            prop: "dep",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "在职状态",
            prop: "status",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "退休时间",
            prop: "time",
          },
          {
            label: "备注",
            prop: "remark",
          },
          {
            label: "证明附件",
            prop: "annex",
          },
        ],
      },
      option2: {
        border: true,
        searchMenuSpan: 4,
        menu: false,
        column: [
          {
            label: "姓名",
            prop: "name",
            search: true,
            searchSpan: 6,
          },
          {
            label: "部门",
            prop: "dep",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "状态",
            prop: "status",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "离职时间",
            prop: "time",
          },
          {
            label: "离职原因",
            prop: "reason",
          },
          {
            label: "证明附件",
            prop: "prove",
          },
        ],
      },
      option3: {
        border: true,
        searchMenuSpan: 4,
        menu: false,
        column: [
          {
            label: "姓名",
            prop: "name",
            search: true,
            searchSpan: 6,
          },
          {
            label: "部门",
            prop: "dep",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "状态",
            prop: "status",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "开始时间",
            prop: "start_time",
          },
          {
            label: "退休时间",
            prop: "end_time",
          },
          {
            label: "原因",
            prop: "reason",
          },
          {
            label: "附件",
            prop: "annex",
          },
        ],
      },
      // 搜索的表单对象
      search: {},
      depList: [
        { id: 1, name: "部门1" },
        { id: 2, name: "部门2" },
        { id: 3, name: "部门3" },
        { id: 4, name: "部门4" },
        { id: 5, name: "部门5" },
        { id: 6, name: "部门6" },
        { id: 7, name: "部门7" },
      ],
      depValue: "",
      statusList: [
        { id: 1, name: "事业编制" },
        { id: 2, name: "非事业编制" },
      ],
      statusValue: "",
    };
  },
  methods: {
    handleClick() {},
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试用期不合格" name="1">
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
        <el-tab-pane label="实习期不合格" name="2">
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
        <el-tab-pane label="转正" name="3">
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
        <el-tab-pane label="合同续签" name="4">
          <avue-crud
            :option="option4"
            :search.sync="search"
            :data="data4"
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
        <el-tab-pane label="转岗" name="5">
          <avue-crud
            :option="option5"
            :search.sync="search"
            :data="data5"
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
        <el-tab-pane label="自定义" name="6">
          <avue-crud
            :option="option6"
            :search.sync="search"
            :data="data6"
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
          reason: "无",
        },
      ],
      data2: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          time: "2022/02/02",
          reason: "无",
        },
      ],
      data3: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          time: '2022/02/02',
          illu: '无'
        },
      ],
      data4: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          period: "2021/02/02-2022/02/02",
          salary: "10000",
          job: "教师",
        },
      ],
      data5: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          period: "2021/02/02-2022/02/02",
          salary: "10000",
          old_job: "岗位1",
          new_job: "岗位2",
        },
      ],
      data6: [
        {
          name: "张三",
          dep: "未知",
          status: "在职人员",
          time: '2022/02/02',
          illu: '无'
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
            label: "状态",
            prop: "status",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "时间",
            prop: "time",
          },
          {
            label: "原因",
            prop: "reason",
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
            label: "时间",
            prop: "time",
          },
          {
            label: "原因",
            prop: "reason",
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
            label: "日期",
            prop: "time",
          },
          {
            label: "说明",
            prop: "illu",
          },
        ],
      },
      option4: {
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
            label: "续签时间段",
            prop: "period",
          },
          {
            label: "薪资",
            prop: "salary",
          },
          {
            label: "岗位",
            prop: "job",
          },
        ],
      },
      option5: {
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
            label: "转岗时间段",
            prop: "period",
          },
          {
            label: "薪资",
            prop: "salary",
          },
          {
            label: "原岗位",
            prop: "old_job",
          },
          {
            label: "新岗位",
            prop: "new_job",
          },
        ],
      },
      option6: {
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
            label: "时间",
            prop: "time",
          },
          {
            label: "说明",
            prop: "illu",
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

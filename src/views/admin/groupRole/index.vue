<template>
  <div class="org_container">
    <el-tabs type="border-card" @tab-click="handleClick" v-model="activeName">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.tab_name"
        :name="item.id"
      >
        <avue-crud
          :data="data"
          :option="option"
          :page.sync="page"
          :search.sync="search"
        >
          <template slot="menuLeft">
            <el-button type="danger" @click="delSelect" size="small"
            >删除</el-button
            >
          </template>
          <template slot="menuLeft">
            <el-row>
              <el-col :span="24">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in timeList"
                    :key="item.id"
                    :label="item.time"
                    :value="item.id"
                  >
                  </el-option
                  ></el-select>
              </el-col>
            </el-row>
          </template>
          <template slot="manage" slot-scope="scope">
            <el-button type="text" @click="setting(scope.row)"
            ><i class="el-icon-setting"></i>设置分管中层</el-button
            >
          </template>
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Org",
  data() {
    return {
      activeName: "",
      tabList: [
        { id: "1", tab_name: "校长" },
        { id: "2", tab_name: "副校长" },
        { id: "3", tab_name: "党委书记" },
        { id: "4", tab_name: "各部门领导" },
        { id: "5", tab_name: "其他中层" },
        { id: "6", tab_name: "教职工" },
      ],
      search: {},
      data: [],
      dataList: [
        [
          {
            time: "2022",
            name: "张三",
          },
          {
            time: "2021",
            name: "李四",
          },
          {
            time: "2022",
            name: "王五",
          },
          {
            time: "2022",
            name: "赵六",
          },
        ],
        [
          {
            time: "2022",
            name: "小明",
          },
          {
            time: "2021",
            name: "小李",
          },
          {
            time: "2022",
            name: "小强",
          },
          {
            time: "2022",
            name: "小张",
          },
        ],
        [
          {
            time: "2022",
            name: "啊飞",
          },
          {
            time: "2021",
            name: "阿福",
          },
          {
            time: "2022",
            name: "阿强",
          },
          {
            time: "2022",
            name: "阿狸",
          },
        ],
        [
          {
            time: "2022",
            name: "刘备",
            fordep: "资产财务处",
          },
          {
            time: "2021",
            name: "张飞",
            fordep: "人力资源处",
          },
          {
            time: "2022",
            name: "关羽",
            fordep: "综合管理处",
          },
          {
            time: "2022",
            name: "赵云",
            fordep: "教育运行处",
          },
        ],
        [
          {
            time: "2022",
            name: "曹操",
            dep: "教育运行处",
          },
          {
            time: "2021",
            name: "董卓",
            dep: "德体艺系",
          },
          {
            time: "2022",
            name: "貂蝉",
            dep: "药剂系",
          },
          {
            time: "2022",
            name: "西施",
            dep: "药剂系",
          },
        ],
        [
          {
            time: "2022",
            name: "唐僧",
            dep: "教育运行处",
            isRetire: "是",
            remark: "",
          },
          {
            time: "2021",
            name: "孙悟空",
            dep: "德体艺系",
            isRetire: "否",
            remark: "",
          },
          {
            time: "2022",
            name: "猪八戒",
            dep: "药剂系",
            isRetire: "否",
            remark: "",
          },
          {
            time: "2022",
            name: "沙和尚",
            dep: "药剂系",
            isRetire: "是",
            remark: "",
          },
        ],
      ],
      optionList: [
        {
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "分管中层",
              prop: "manage",
              slot: true,
            },
          ],
        },
        {
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "分管中层",
              prop: "manage",
              slot: true,
            },
          ],
        },
        {
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "分管中层",
              prop: "manage",
              slot: true,
            },
          ],
        },
        {
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "负责部门",
              prop: "fordep",
            },
          ],
        },
        {
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "所在部门",
              prop: "dep",
            },
          ],
        },
        {
          title: "表格的标题",
          page: false,
          align: "center",
          menuAlign: "center",
          border: true,
          selection: true,
          page: true,
          column: [
            {
              label: "考核年份",
              prop: "time",
            },
            {
              label: "员工姓名",
              prop: "name",
            },
            {
              label: "所在部门",
              prop: "dep",
            },
            {
              label: "是否退休",
              prop: "isRetire",
            },
            {
              label: "备注",
              prop: "remark",
            },
          ],
        },
      ],
      option: {},
      page: {
        pagerCount: 11,
        total: 1000,
      },
      timeList: [
        { id: 1, time: "2021年" },
        { id: 2, time: "2022年" },
      ],
      value: "",
    };
  },
  methods: {
    // 删除所选项
    delSelect() {
      console.log("删除");
    },
    // 设置权限
    setting(row) {},
    handleClick(val) {
      console.log(val.name);
      this.tabList.forEach((item) => {
        if (val.name == item.id) {
          this.option = this.optionList[val.index];
          this.data = this.dataList[val.index];
        }
      });
    },
  },
  created() {
    this.activeName = this.tabList[0].id;
    this.option = this.optionList[0];
    this.data = this.dataList[0];
  },
};
</script>

<style lang="scss" scoped>
.el-tabs {
  margin: 0 10px;
}
</style>

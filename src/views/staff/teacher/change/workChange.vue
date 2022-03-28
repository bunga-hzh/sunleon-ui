<template>
  <div class="engage_container">
    <basic-container>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane v-for="item in tabList"
                     :key="item.id"
                     :label="item.label"
                     :name="item.id">
          <avue-crud :option="option"
                     :search.sync="search"
                     :data="data"
                     :page.sync="page">
            <template slot-scope="scope"
                      slot="salary">
              <span v-show="showInput">{{ scope.row.salary }}</span>
              <el-input @blur="showInput = true"
                        v-show="!showInput"
                        v-model="scope.row.salary"></el-input>
              <i v-show="showInput"
                 style="color: #409eff"
                 class="el-icon-edit"
                 @click="showInput = false"></i>
            </template>

            <template slot="job"
                      slot-scope="scope">
              <span v-show="showSelect">{{ scope.row.job }}</span>
              <el-select v-model="scope.row.job"
                         @change="showSelect = true"
                         v-show="!showSelect">
                <el-option v-for="item in jobOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
              <i v-show="showSelect"
                 style="color: #409eff"
                 class="el-icon-edit"
                 @click="showSelect = false"></i>
            </template>

            <template slot="nameFrom">
              <el-input placeholder="请输入内容"
                        v-model="input"
                        clearable>
              </el-input>
            </template>

            <template slot="depSearch">
              <el-select v-model="depValue"
                         placeholder="请选择">
                <el-option v-for="item in depList"
                           :key="item.value"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </template>
            <template slot="statusSearch">
              <el-select v-model="statusValue"
                         placeholder="请选择">
                <el-option v-for="item in statusList"
                           :key="item.value"
                           :label="item.name"
                           :value="item.id">
                </el-option>
              </el-select>
            </template>
            <template slot="menuLeft"
                      v-if="item.id == 4">
              <el-button type="primary"
                         icon="el-icon-finished"
                         @click="batchRenew">批量续签</el-button>
              <!-- 批量续签对话框 -->
              <el-dialog title="批量续签"
                         :visible.sync="dialogVisible"
                         width="50%">
                <!-- 内层对话框 -->
                <el-dialog width="20%"
                           title="选择续签时间段"
                           :visible.sync="selectVisible"
                           append-to-body>
                  <!-- 日期选择器 -->
                  <el-date-picker style="width: 100%"
                                  v-model="renewal_time"
                                  align="right"
                                  type="date"
                                  placeholder="选择日期"
                                  :picker-options="selectRenewalPickerOptions">
                  </el-date-picker>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary"
                               @click="renew">续签</el-button>
                  </span>
                </el-dialog>
                <!-- 日期选择器 -->
                <el-date-picker v-model="period"
                                type="daterange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions">
                </el-date-picker>
                <!-- 表格 -->
                <el-table v-if="period"
                          :data="periodTableData"
                          border
                          style="width: 100%; margin-top: 20px">
                  <el-table-column type="selection"
                                   width="55">
                  </el-table-column>
                  <el-table-column prop="name"
                                   label="姓名"> </el-table-column>
                  <el-table-column prop="dep"
                                   label="部门"> </el-table-column>
                  <el-table-column prop="status"
                                   label="状态">
                  </el-table-column>
                  <el-table-column prop="period"
                                   label="续签时间段">
                  </el-table-column>
                  <el-table-column prop="salary"
                                   label="薪资">
                  </el-table-column>
                  <el-table-column prop="job"
                                   label="岗位"> </el-table-column>
                </el-table>
                <span slot="footer"
                      class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary"
                             @click="selectPeriod">批量续签</el-button>
                </span>
              </el-dialog>
            </template>
          </avue-crud>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
import {
  dataList,
  optionList,
  depList,
  statusList,
  tabList,
  pickerOptions,
  periodTableData,
  selectRenewalPickerOptions,
  jobOptions
} from "@/const/crud/staff/teacher/change/workChange";

export default {
  name: "TableEngage",
  data () {
    return {
      // 表格数据
      data: [],
      // 表格配置对象
      option: {},
      // 标签页集合
      tabList: tabList,
      // 数据源集合
      dataList: dataList,
      // 表格配置对象集合
      optionList: optionList,
      pickerOptions: pickerOptions,
      selectRenewalPickerOptions: selectRenewalPickerOptions,
      activeName: "1",
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 搜索的表单对象
      search: {},
      // 部门下拉框数据集合
      depList: depList,
      depValue: "",
      // 状态下拉集合
      statusList: statusList,
      statusValue: "",
      // 控制对话框的显示与隐藏
      dialogVisible: false,
      // 时间段
      period: "",
      // 按时间段筛选的表格数据
      periodTableData: periodTableData,
      // 控制内层对话框的显示与隐藏
      selectVisible: false,
      // 续签时间
      renewal_time: "",
      jobOptions: jobOptions,
      showInput: true,
      showSelect: true,
    };
  },
  methods: {
    handleClick (val) {
      this.option = this.optionList[val.index];
      this.data = this.dataList[val.index];
    },
    // 批量续签
    batchRenew () {
      this.dialogVisible = true;
    },
    // 选择续签时间段
    selectPeriod () {
      this.selectVisible = true;
    },
    // 提交续签
    renew () {
      this.selectVisible = false;
      this.dialogVisible = false;
      this.$message.success("续签成功");
    },
  },
  created () {
    this.option = this.optionList[0];
    this.data = this.dataList[0];
  },
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :data="data"
        :page.sync="page"
        :table-loading="showLoading"
        @on-load="get"
        @row-del="rowDel"
        @refresh-change="get"
        @search-change="searchChange"
      >
        <template slot="menuLeft">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="small"
            @click="add"
            >添加</el-button
          >
          <el-button type="primary" icon="el-icon-download" size="small"
            >导出</el-button
          >
          <el-button type="primary" icon="el-icon-upload2" size="small"
            >导入</el-button
          >
        </template>
        <template slot="menu" slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            @click="editRow(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            @click="viewRow(scope.row)"
            >查看</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
    <!-- 添加对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="60%"
      :fullscreen="dialogFull"
      @close="closeDialog"
    >
      <template slot="title">
        <div class="avue-crud__dialog__header">
          <span class="el-dialog__title"> 添加 </span>
          <div
            class="avue-crud__dialog__menu"
            @click="dialogFull ? (dialogFull = false) : (dialogFull = true)"
          >
            <i class="el-icon-full-screen"></i>
          </div>
        </div>
      </template>

      <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
        <el-tab-pane label="人员基本情况" name="info">
          <table>
            <tr>
              <th>
                <span class="title">基本信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="infoFormRef"
                    v-model="info_obj"
                    :option="infoOption"
                    @submit="infoSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
            <tr>
              <th>
                <span class="title">教育经历</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="educateFormRef"
                    v-model="info_obj"
                    :option="educateOption"
                    @submit="educateSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
            <tr>
              <th>
                <span class="title">其他信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="otherFormRef"
                    v-model="info_obj"
                    :option="otherOption"
                    @submit="otherSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse
            v-model="collapseActiveName"
            @change="collapseActive"
            accordion
          >
            <el-collapse-item title="学历及学位子集" name="xljxw">
              <avue-crud
                :data="xljxw_tableData"
                :option="xljxwOption"
                @refresh-change="xljxwRefresh"
                @row-save="xljxwRowSave"
                @row-update="xljxwRowUpdate"
                @row-del="xljxwRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="个人履历子集（校外）" name="grll">
              <avue-crud
                :data="grll_tableData"
                :option="grllOption"
                @refresh-change="grllRefresh"
                @row-save="grllRowSave"
                @row-update="grllRowUpdate"
                @row-del="grllRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="家属子集" name="family">
              <avue-crud
                :data="family_tableData"
                :option="familyOption"
                @refresh-change="familyRefresh"
                @row-save="familyRowSave"
                @row-update="familyRowUpdate"
                @row-del="familyRowDel"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="office">
          <table>
            <tr>
              <th>
                <span>任职信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="officeFormRef"
                    v-model="office_obj"
                    :option="officeOption"
                    @submit="officeSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse
            v-model="collapseActiveName"
            @change="collapseActive"
            accordion
          >
            <el-collapse-item title="校内职务表" name="leader">
              <avue-crud
                :data="leader_tableData"
                :option="leaderOption"
                @refresh-change="leaderRefresh"
                @row-save="leaderRowSave"
                @row-update="leaderRowUpdate"
                @row-del="leaderRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="专业技术职务子集" name="professionduty">
              <avue-crud
                :data="professionduty_tableData"
                :option="professiondutyOption"
                @refresh-change="professiondutyRefresh"
                @row-save="professiondutyRowSave"
                @row-update="professiondutyRowUpdate"
                @row-del="professiondutyRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item
              title="工人技术等级及职务子集"
              name="workerskillgrade"
            >
              <avue-crud
                :data="workerskillgrade_tableData"
                :option="workerskillgradeOption"
                @refresh-change="workerskillgradeRefresh"
                @row-save="workerskillgradeRowSave"
                @row-update="workerskillgradeRowUpdate"
                @row-del="workerskillgradeRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="社会兼职子集" name="parttimejob">
              <avue-crud
                :data="parttimejob_tableData"
                :option="parttimejobOption"
                @refresh-change="parttimejobRefresh"
                @row-save="parttimejobRowSave"
                @row-update="parttimejobRowUpdate"
                @row-del="parttimejobRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="服务协议子集" name="servicetoenterprise">
              <avue-crud
                :data="servicetoenterprise_tableData"
                :option="servicetoenterpriseOption"
                @refresh-change="servicetoenterpriseRefresh"
                @row-save="servicetoenterpriseRowSave"
                @row-update="servicetoenterpriseRowUpdate"
                @row-del="servicetoenterpriseRowDel"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="年度考核" name="examine">
          <table>
            <tr>
              <th>
                <span>年度考核</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="examineFormRef"
                    v-model="examine_obj"
                    :option="examineOption"
                    @submit="examineSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="教师发展信息" name="jsfzxx">
          <table>
            <tr>
              <th>
                <span>教师发展信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="jsfzxxFormRef"
                    v-model="jsfzxx_obj"
                    :option="jsfzxxOption"
                    @submit="jsfzxxSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse
            v-model="collapseActiveName"
            @change="collapseActive"
            accordion
          >
            <el-collapse-item title="教师资格证子集" name="jszgz">
              <avue-crud
                :data="jszgz_tableData"
                :option="jszgzOption"
                @refresh-change="jszgzRefresh"
                @row-save="jszgzRowSave"
                @row-update="jszgzRowUpdate"
                @row-del="jszgzRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="职业资格证子集" name="certificate">
              <avue-crud
                :data="certificate_tableData"
                :option="certificateOption"
                @refresh-change="jszgzRefresh"
                @row-save="certificateRowSave"
                @row-update="certificateRowUpdate"
                @row-del="certificateRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="教育培训子集" name="train">
              <avue-crud
                :data="train_tableData"
                :option="trainOption"
                @refresh-change="trainRefresh"
                @row-save="trainRowSave"
                @row-update="trainRowUpdate"
                @row-del="trainRowDel"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="punish_reward">
          <table>
            <tr>
              <th>
                <span>处分（行政及党内）</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="punishFormRef"
                    v-model="punish_obj"
                    :option="punishOption"
                    @submit="punishSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
            <tr>
              <th>
                <span>奖励和荣誉</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="rewardFormRef"
                    v-model="reward_obj"
                    :option="rewardOption"
                    @submit="rewardSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息" name="salary">
          <table>
            <tr>
              <th>
                <span>薪酬福利信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="salaryFormRef"
                    v-model="salary_obj"
                    :option="salaryOption"
                    @submit="salarySubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="财务信息" name="bankno">
          <table>
            <tr>
              <th>
                <span>财务信息</span>
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <avue-form
                    ref="banknoFormRef"
                    v-model="bankno_obj"
                    :option="banknoOption"
                    @submit="banknoSubmit"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="other">
          <el-collapse
            v-model="collapseActiveName"
            @change="collapseActive"
            accordion
          >
            <el-collapse-item title="因公/因私护照" name="furtherstudyforeign">
              <avue-crud
                :data="furtherstudyforeign_tableData"
                :option="furtherstudyforeignOption"
                @refresh-change="furtherstudyforeignRefresh"
                @row-save="furtherstudyforeignRowSave"
                @row-update="furtherstudyforeignRowUpdate"
                @row-del="furtherstudyforeignRowDel"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item
              title="组织考察（考核）子集"
              name="organiseinspect"
            >
              <avue-crud
                :data="organiseinspect_tableData"
                :option="organiseinspectOption"
                @refresh-change="organiseinspectRefresh"
                @row-save="organiseinspectRowSave"
                @row-update="organiseinspectRowUpdate"
                @row-del="organiseinspectRowDel"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/teacher/info";

import { get, add, edit, del } from "@/const/staff/crud";
import { result } from "@/const/staff/message";

import { infoOption } from "@/const/crud/staff/info/info";
import { educateOption } from "@/const/crud/staff/info/educate";
import { otherOption } from "@/const/crud/staff/info/other";
import { officeOption } from "@/const/crud/staff/info/office";
import { examineOption } from "@/const/crud/staff/info/examine";
import { jsfzxxOption } from "@/const/crud/staff/info/jsfzxx";
import { punishOption } from "@/const/crud/staff/info/punish";
import { rewardOption } from "@/const/crud/staff/info/reward";
import { salaryOption } from "@/const/crud/staff/info/salary";
import { banknoOption } from "@/const/crud/staff/info/bankno";

import { xljxwOption } from "@/const/crud/staff/info/child/xljxw";
import { grllOption } from "@/const/crud/staff/info/child/grll";
import { familyOption } from "@/const/crud/staff/info/child/family";
import { leaderOption } from "@/const/crud/staff/info/child/leader";
import { professiondutyOption } from "@/const/crud/staff/info/child/professionduty";
import { workerskillgradeOption } from "@/const/crud/staff/info/child/workerskillgrade";
import { parttimejobOption } from "@/const/crud/staff/info/child/parttimejob";
import { servicetoenterpriseOption } from "@/const/crud/staff/info/child/servicetoenterprise";
import { jszgzOption } from "@/const/crud/staff/info/child/jszgz";
import { certificateOption } from "@/const/crud/staff/info/child/certificate";
import { trainOption } from "@/const/crud/staff/info/child/train";
import { furtherstudyforeignOption } from "@/const/crud/staff/info/child/furtherstudyforeign";
import { organiseinspectOption } from "@/const/crud/staff/info/child/organiseinspect";

export default {
  name: "TableEngage",
  data() {
    return {
      title: undefined,
      // 用户id
      staffId: undefined,
      // 标签页激活项
      activeName: "info",
      // 折叠面板激活项
      collapseActiveName: undefined,
      // 控制弹窗全屏
      dialogFull: false,

      showLoading: false,

      // 控制对话框的显示与隐藏
      dialogVisible: false,

      // 数据源
      data: undefined,
      option: option,
      // 搜索的表单对象
      search: {},
      defaultProps: {
        label: "name",
        value: "id",
      },
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },

      info_obj: {},
      office_obj: {},
      examine_obj: {},
      jsfzxx_obj: {},
      punish_obj: {},
      salary_obj: {},
      bankno_obj: {},
      reward_obj: {},
      obj: {},

      //主表 option
      infoOption: infoOption,
      educateOption: educateOption,
      otherOption: otherOption,
      officeOption: officeOption,
      examineOption: examineOption,
      jsfzxxOption: jsfzxxOption,
      punishOption: punishOption,
      rewardOption: rewardOption,
      salaryOption: salaryOption,
      banknoOption: banknoOption,
      primaryOptionList: [
        "infoOption",
        "educateOption",
        "otherOption",
        "officeOption",
        "examineOption",
        "jsfzxxOption",
        "punishOption",
        "rewardOption",
        "salaryOption",
        "banknoOption",
      ],
      // 子表 option
      xljxwOption: xljxwOption,
      grllOption: grllOption,
      familyOption: familyOption,
      leaderOption: leaderOption,
      professiondutyOption: professiondutyOption,
      workerskillgradeOption: workerskillgradeOption,
      parttimejobOption: parttimejobOption,
      servicetoenterpriseOption: servicetoenterpriseOption,
      jszgzOption: jszgzOption,
      certificateOption: certificateOption,
      trainOption: trainOption,
      furtherstudyforeignOption: furtherstudyforeignOption,
      organiseinspectOption: organiseinspectOption,
      childOptionList: [
        "xljxwOption",
        "grllOption",
        "familyOption",
        "leaderOption",
        "professiondutyOption",
        "workerskillgradeOption",
        "parttimejobOption",
        "servicetoenterpriseOption",
        "jszgzOption",
        "certificateOption",
        "trainOption",
        "furtherstudyforeignOption",
        "organiseinspectOption",
      ],
      // 子表 data
      xljxw_tableData: undefined,
      grll_tableData: undefined,
      family_tableData: undefined,
      leader_tableData: undefined,
      professionduty_tableData: undefined,
      workerskillgrade_tableData: undefined,
      parttimejob_tableData: undefined,
      servicetoenterprise_tableData: undefined,
      jszgz_tableData: undefined,
      certificate_tableData: undefined,
      train_tableData: undefined,
      furtherstudyforeign_tableData: undefined,
      organiseinspect_tableData: undefined,
    };
  },
  methods: {
    // 获取表格数据
    async get(form) {
      this.showLoading = true;
      const { data: res } = await get("info", this.page, form);
      if (res.code !== 0)
        return this.$message.error("获取数据失败！--" + res.message);
      this.showLoading = false;
      this.data = res.data.records;
      this.page.total = res.data.total;
    },
    // 表格刷新
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.get(form);
      done();
    },
    // 删除教职工基本信息
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await del("info", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.get();
        })
        .catch(() => {});
    },
    // 添加基本信息
    infoSubmit(form, loading) {
      if (this.infoOption.submitText === "添加") {
        setTimeout(async () => {
          const { data: res } = await add("info", form);
          if (
            !result(this, res, "save", () => {
              loading();
            })
          )
            return true;
          loading();
          this.infoOption.submitText = "修改";
          this.staffId = res.data;
        }, 1000);
      }
      if (this.infoOption.submitText === "修改") {
        setTimeout(async () => {
          form.id = this.staffId;
          const { data: res } = await edit("info", form);
          if (
            !result(this, res, "save", () => {
              loading();
            })
          )
            return true;
          loading();
        }, 1000);
      }
    },

    // 判断 staffId 是否存在
    existId(loading, cb) {
      setTimeout(async () => {
        if (this.staffId === undefined) {
          this.$message.error("请先添加基本信息");
          loading();
        } else {
          cb();
        }
      }, 1000);
    },
    // 修改 基本信息
    editInfo(type, form, loading) {
      setTimeout(async () => {
        form.id = this.staffId;
        const { data: res } = await edit(type, form);
        if (
          !result(this, res, "save", () => {
            loading();
          })
        )
          return true;
        loading();
      }, 1000);
    },
    // 添加 基本信息
    addInfo(type, form, loading) {
      setTimeout(async () => {
        form.staffId = this.staffId;
        const { data: res } = await add(type, form);
        if (
          !result(this, res, "add", () => {
            loading();
          })
        )
          return true;
        loading();
        this[`${type}Option`].submitText = "修改";
      }, 1000);
    },
    // 保存信息
    saveInfo(type, form, loading) {
      if (this[`${type}Option`].submitText === "添加") {
        this.existId(loading, () => {
          this.addInfo(type, form, loading);
        });
      }
      if (this[`${type}Option`].submitText === "修改") {
        this.existId(loading, () => {
          this.editInfo(type, form, loading);
        });
      }
    },

    // 添加 教育信息
    educateSubmit(form, loading) {
      this.existId(loading, () => {
        this.editInfo("info", form, loading);
      });
    },
    // 添加 其他信息
    otherSubmit(form, loading) {
      this.existId(loading, () => {
        this.editInfo("info", form, loading);
      });
    },
    // 添加 任职信息
    officeSubmit(form, loading) {
      this.saveInfo("office", form, loading);
    },
    // 添加 年度信息
    examineSubmit(form, loading) {
      this.saveInfo("examine", form, loading);
    },
    // 添加 教师发展 信息
    jsfzxxSubmit(form, loading) {
      this.saveInfo("jsfzxx", form, loading);
    },
    // 添加 处分（行政及党内）信息
    punishSubmit(form, loading) {
      this.saveInfo("punish", form, loading);
    },
    // 添加 奖励和荣誉 信息
    rewardSubmit(form, loading) {
      this.saveInfo("reward", form, loading);
    },
    // 添加 薪酬福利 信息
    salarySubmit(form, loading) {
      this.saveInfo("salary", form, loading);
    },
    // 添加 财务 信息
    banknoSubmit(form, loading) {
      this.saveInfo("bankno", form, loading);
    },

    addChild(type, form, done, loading) {
      setTimeout(() => {
        this.existId(loading, async () => {
          form.staffId = this.staffId;
          const { data: res } = await add(type, form);
          if (
            !result(this, res, "add", () => {
              loading();
            })
          )
            return true;
          loading();
          form.id = res.data;
          done(form);
        });
      }, 1000);
    },
    editChild(type, form, done, loading) {
      setTimeout(async () => {
        const { data: res } = await edit(type, form);
        if (
          !result(this, res, "edit", () => {
            loading();
          })
        )
          return true;
        loading();
        done(form);
      }, 1000);
    },
    delChild(type, form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await del(type, form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getChild(type);
        })
        .catch(() => {});
    },
    async getChild(type) {
      const { data: res } = await get(
        type,
        {
          currentPage: 1,
          pageSize: 20,
        },
        { staffId: this.staffId }
      );
      if (res.code !== 0) return this.$message.error("获取失败！" + res.msg);
      this[`${type}_tableData`] = res.data.records;
    },

    // 子表 添加
    xljxwRowSave(form, done, loading) {
      this.addChild("xljxw", form, done, loading);
    },
    grllRowSave(form, done, loading) {
      this.addChild("grll", form, done, loading);
    },
    familyRowSave(form, done, loading) {
      this.addChild("family", form, done, loading);
    },
    leaderRowSave(form, done, loading) {
      this.addChild("leader", form, done, loading);
    },
    professiondutyRowSave(form, done, loading) {
      this.addChild("professionduty", form, done, loading);
    },
    workerskillgradeRowSave(form, done, loading) {
      this.addChild("workerskillgrade", form, done, loading);
    },
    parttimejobRowSave(form, done, loading) {
      this.addChild("parttimejob", form, done, loading);
    },
    jszgzRowSave(form, done, loading) {
      this.addChild("jszgz", form, done, loading);
    },
    certificateRowSave(form, done, loading) {
      this.addChild("certificate", form, done, loading);
    },
    trainRowSave(form, done, loading) {
      this.addChild("train", form, done, loading);
    },
    furtherstudyforeignRowSave(form, done, loading) {
      this.addChild("furtherstudyforeign", form, done, loading);
    },
    organiseinspectRowSave(form, done, loading) {
      this.addChild("organiseinspect", form, done, loading);
    },
    servicetoenterpriseRowSave(form, done, loading) {
      this.addChild("servicetoenterprise", form, done, loading);
    },
    // 子表 修改
    xljxwRowUpdate(form, index, done, loading) {
      this.editChild("xljxw", form, done, loading);
    },
    grllRowUpdate(form, index, done, loading) {
      this.editChild("grll", form, done, loading);
    },
    familyRowUpdate(form, index, done, loading) {
      this.editChild("family", form, done, loading);
    },
    leaderRowUpdate(form, index, done, loading) {
      this.editChild("leader", form, done, loading);
    },
    professiondutyRowUpdate(form, index, done, loading) {
      this.editChild("professionduty", form, done, loading);
    },
    workerskillgradeRowUpdate(form, index, done, loading) {
      this.editChild("workerskillgrade", form, done, loading);
    },
    parttimejobRowUpdate(form, index, done, loading) {
      this.editChild("parttimejob", form, done, loading);
    },
    jszgzRowUpdate(form, index, done, loading) {
      this.editChild("jszgz", form, done, loading);
    },
    certificateRowUpdate(form, index, done, loading) {
      this.editChild("certificate", form, done, loading);
    },
    trainRowUpdate(form, index, done, loading) {
      this.editChild("train", form, done, loading);
    },
    furtherstudyforeignRowUpdate(form, index, done, loading) {
      this.editChild("furtherstudyforeign", form, done, loading);
    },
    organiseinspectRowUpdate(form, index, done, loading) {
      this.editChild("organiseinspect", form, done, loading);
    },
    servicetoenterpriseRowUpdate(form, index, done, loading) {
      this.editChild("servicetoenterprise", form, done, loading);
    },
    // 子表 删除
    xljxwRowDel(form, index, done, loading) {
      this.delChild("xljxw", form, done, loading);
    },
    grllRowDel(form, index, done, loading) {
      this.delChild("grll", form, done, loading);
    },
    familyRowDel(form, index, done, loading) {
      this.delChild("family", form, done, loading);
    },
    leaderRowDel(form, index, done, loading) {
      this.delChild("leader", form, done, loading);
    },
    professiondutyRowDel(form, index, done, loading) {
      this.delChild("professionduty", form, done, loading);
    },
    workerskillgradeRowDel(form, index, done, loading) {
      this.delChild("workerskillgrade", form, done, loading);
    },
    parttimejobRowDel(form, index, done, loading) {
      this.delChild("parttimejob", form, done, loading);
    },
    jszgzRowDel(form, index, done, loading) {
      this.delChild("jszgz", form, done, loading);
    },
    certificateRowDel(form, index, done, loading) {
      this.delChild("certificate", form, done, loading);
    },
    trainRowDel(form, index, done, loading) {
      this.delChild("train", form, done, loading);
    },
    furtherstudyforeignRowDel(form, index, done, loading) {
      this.delChild("furtherstudyforeign", form, done, loading);
    },
    organiseinspectRowDel(form, index, done, loading) {
      this.delChild("organiseinspect", form, done, loading);
    },
    servicetoenterpriseRowDel(form, index, done, loading) {
      this.delChild("servicetoenterprise", form, done, loading);
    },
    // 子表 刷新
    xljxwRefresh() {
      this.getChild("xljxw");
    },
    grllRefresh() {
      this.getChild("grll");
    },
    familyRefresh() {
      this.getChild("family");
    },
    leaderRefresh() {
      this.getChild("leader");
    },
    professiondutyRefresh() {
      this.getChild("professionduty");
    },
    workerskillgradeRefresh() {
      this.getChild("workerskillgrade");
    },
    parttimejobRefresh() {
      this.getChild("parttimejob");
    },
    jszgzRefresh() {
      this.getChild("jszgz");
    },
    certificateRefresh() {
      this.getChild("certificate");
    },
    trainRefresh() {
      this.getChild("train");
    },
    furtherstudyforeignRefresh() {
      this.getChild("furtherstudyforeign");
    },
    organiseinspectRefresh() {
      this.getChild("organiseinspect");
    },
    servicetoenterpriseRefresh() {
      this.getChild("servicetoenterprise");
    },

    // 关闭对话框
    closeDialog() {
      this.get();
      this.staffId = undefined;
      this.activeName = "info";
      this.collapseActiveName = undefined;
      this.$refs.infoFormRef.resetForm();
      this.$refs.educateFormRef.resetForm();
      this.$refs.otherFormRef.resetForm();
      this.primaryOptionList.forEach((item) => {
        this[item].submitText = "添加";
      });
      this.primaryOptionList.forEach((item) => {
        this[item].detail = false;
      });
      this.childOptionList.forEach((item) => {
        this[item].addBtn = true;
        this[item].menu = true;
      });
    },

    // 添加按钮
    add() {
      this.title = "添加";
      this.dialogVisible = true;
    },
    // 编辑行信息
    editRow(row) {
      this.title = "编辑";
      this.primaryOptionList.forEach((item) => {
        this[item].submitText = "修改";
      });
      this.dialogVisible = true;
      this.info_obj = row;
      this.staffId = row.id;
    },
    // 查看行信息
    viewRow(row) {
      this.title = "查看";
      this.primaryOptionList.forEach((item) => {
        this[item].detail = true;
      });
      this.childOptionList.forEach((item) => {
        this[item].addBtn = false;
        this[item].menu = false;
      });
      this.dialogVisible = true;
      this.info_obj = row;
      this.staffId = row.id;
    },

    async getPrimary(type) {
      const { data: res } = await get(
        type,
        {
          currentPage: 1,
          pageSize: 1,
        },
        { staffId: this.staffId }
      );
      if (res.code !== 0) return this.$message.error("获取失败！" + res.msg);
      this[`${type}_obj`] = res.data.records[0];
    },

    // 标签切换 触发
    tabChange() {
      if (this.title === "编辑" || this.title === "查看") {
        if (this.activeName === "office")
          return this.getPrimary(this.activeName);
        if (this.activeName === "examine")
          return this.getPrimary(this.activeName);
        if (this.activeName === "jsfzxx")
          return this.getPrimary(this.activeName);
        if (this.activeName === "punish_reward") {
          this.getPrimary("punish");
          this.getPrimary("reward");
          return;
        }
        if (this.activeName === "salary")
          return this.getPrimary(this.activeName);
        if (this.activeName === "bankno")
          return this.getPrimary(this.activeName);
      }
    },

    // 折叠面板激活事件
    collapseActive(activeName) {
      if (this.title === "编辑" || this.title === "查看") {
        if (activeName === "xljxw") return this.getChild(activeName);
        if (activeName === "grll") return this.getChild(activeName);
        if (activeName === "family") return this.getChild(activeName);
        if (activeName === "leader") return this.getChild(activeName);
        if (activeName === "professionduty") return this.getChild(activeName);
        if (activeName === "workerskillgrade") return this.getChild(activeName);
        if (activeName === "parttimejob") return this.getChild(activeName);
        if (activeName === "servicetoenterprise")
          return this.getChild(activeName);
        if (activeName === "jszgz") return this.getChild(activeName);
        if (activeName === "certificate") return this.getChild(activeName);
        if (activeName === "train") return this.getChild(activeName);
        if (activeName === "furtherstudyforeign")
          return this.getChild(activeName);
        if (activeName === "organiseinspect") return this.getChild(activeName);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 10px;
}
table {
  width: 100%;
  line-height: 40px;
  border: #eee solid 1px;
  th {
    padding-left: 5px;
    background-color: #56bf99;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ffffff;
    .title {
      font-size: 16px;
      font-family: Medium;
    }
  }
  td {
    padding-left: 5px;
    font-size: 14px;
    font-family: Base;
    position: relative;
  }
}
/*  dialog*/
.el-dialog__header {
  padding: 15px 20px 15px;
}
.el-dialog__headerbtn {
  top: 15px;
}
/deep/.avue-crud__dialog__header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
/deep/.el-dialog__title {
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  word-wrap: break-word;
}
/deep/.avue-crud__dialog__menu {
  padding-right: 20px;
  float: left;
}
/deep/.avue-crud__dialog__menu i {
  color: #909399;
  font-size: 15px;
}
/deep/.el-icon-full-screen {
  cursor: pointer;
  margin-bottom: 20px;
}
/deep/.el-icon-full-screen:before {
  content: "\e719";
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload_p {
  font-size: 18px;
  font-family: large;
}
</style>

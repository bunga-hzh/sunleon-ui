<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :data="data"
        :page.sync="page"
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
      title="添加"
      :visible.sync="dialogVisible_add"
      width="60%"
      :fullscreen="dialogFull"
      @close="clearForm('info')"
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
        <el-tab-pane label="人员基本情况" name="1">
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
                    v-model="obj"
                    :option="infoOption"
                    @submit="submit_info"
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
                    v-model="obj"
                    :option="educateOption"
                    @submit="submit_educate"
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
                    v-model="obj"
                    :option="otherOption"
                    @submit="submit_other"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse accordion>
            <el-collapse-item title="学历及学位子集">
              <avue-crud
                :data="xljxw_tableData"
                :option="xljxwOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="个人履历子集（校外）">
              <avue-crud
                :data="grll_tableData"
                :option="grllOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="家属子集">
              <avue-crud
                :data="family_tableData"
                :option="familyOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="2">
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
                    v-model="obj"
                    :option="officeOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse accordion>
            <el-collapse-item title="校内职务表">
              <avue-crud
                :data="leader_tableData"
                :option="leaderOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="专业技术职务子集">
              <avue-crud
                :data="professionduty_tableData"
                :option="professiondutyOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="工人技术等级及职务子集">
              <avue-crud
                :data="workerskillgrade_tableData"
                :option="workerskillgradeOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="社会兼职子集">
              <avue-crud
                :data="parttimejob_tableData"
                :option="parttimejobOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="服务协议子集">
              <avue-crud
                :data="servicetoenterprise_tableData"
                :option="servicetoenterpriseOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="年度考核" name="3">
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
                    v-model="obj"
                    :option="examineOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="教师发展信息" name="4">
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
                    v-model="obj"
                    :option="jsfzxxOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
          <el-collapse accordion>
            <el-collapse-item title="教师资格证子集">
              <avue-crud
                :data="jszgz_tableData"
                :option="jszgzOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="职业资格证子集">
              <avue-crud
                :data="certificate_tableData"
                :option="certificateOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="教育培训子集">
              <avue-crud
                :data="train_tableData"
                :option="trainOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="5">
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
                    v-model="obj"
                    :option="punishOption"
                    @submit="submit_office"
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
                    v-model="obj"
                    :option="rewardOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息" name="6">
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
                    v-model="obj"
                    :option="salaryOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="财务信息" name="7">
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
                    v-model="obj"
                    :option="banknoOption"
                    @submit="submit_office"
                  >
                  </avue-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="8">
          <el-collapse accordion>
            <el-collapse-item title="因公/因私护照">
              <avue-crud
                :data="furtherstudyforeign_tableData"
                :option="furtherstudyforeignOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
            <el-collapse-item title="组织考察（考核）子集">
              <avue-crud
                :data="organiseinspect_tableData"
                :option="organiseinspectOption"
                @row-save="childRowSave"
              ></avue-crud>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="个人信息" :visible.sync="dialogVisible_view" width="60%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="人员基本情况" name="1">
          <el-row class="margin20">
            <el-descriptions title="基本信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">教职工编号</template>
                {{ info_obj.gh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">姓名</template>
                {{ info_obj.xm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">曾用名</template>
                {{ info_obj.cym }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">出生日期</template>
                {{ info_obj.csrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">年龄</template>
                {{ info_obj.jsnl }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">籍贯</template>
                {{ info_obj.jg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证号</template>
                {{ info_obj.sfzjh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">出生地</template>
                {{ info_obj.csd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">民族</template>
                {{ info_obj.mzm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">政治面貌</template>
                {{ info_obj.zzmmm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">家庭住址</template>
                {{ info_obj.jtzz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">联系电话</template>
                {{ info_obj.lxdh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">电子邮箱</template>
                {{ info_obj.dzyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">紧急联系人姓名</template>
                {{ info_obj.jjlxrxm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">紧急联系人电话</template>
                {{ info_obj.jjlxrdh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">所属教研组</template>
                {{ info_obj.ssjyz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">组织机构</template>
                {{ info_obj.orgId }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证正面上传</template>
                {{ info_obj.sfzFrontImg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证反面上传</template>
                {{ info_obj.sfzBackImg }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-descriptions title="教育经历" :column="3" border>
              <el-descriptions-item>
                <template slot="label">毕业院校</template>
                {{ info_obj.byyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学历</template>
                {{ info_obj.zgxl }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学历专业</template>
                {{ info_obj.zgxlzy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学位</template>
                {{ info_obj.zgxwm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学位专业</template>
                {{ info_obj.zgxwzy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学历毕业院校</template>
                {{ info_obj.zgxlbyyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">全日制学历</template>
                {{ info_obj.qrzxl }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">全日制学位</template>
                {{ info_obj.qrzxw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">全日制毕业院校</template>
                {{ info_obj.qrzbyyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">最高学历证上传</template>
                {{ info_obj.zgxlzsc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">全日制学历证上传</template>
                {{ info_obj.qrzxlzsc }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-descriptions title="其他信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">户口所在地</template>
                {{ info_obj.hkszdm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">户籍类别</template>
                {{ info_obj.hjlb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">当前状态</template>
                {{ info_obj.dqztm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">户口详细地址</template>
                {{ info_obj.hkxxdz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">居住详细地址</template>
                {{ info_obj.rdrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">入党日期</template>
                {{ info_obj.hkxxdz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">健康状况</template>
                {{ info_obj.jkzkm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">婚姻状况</template>
                {{ info_obj.hyzkm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">合同类型</template>
                {{ info_obj.htlx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">专技人员专业类别</template>
                {{ info_obj.zyjsrylb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">居住证起始时间</template>
                {{ info_obj.jjzqssj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">居住证截止时间</template>
                {{ info_obj.jjzjzsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否落户</template>
                {{ info_obj.sflh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否具有职业资格</template>
                {{ info_obj.sfjyzyzg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">备注</template>
                {{ info_obj.bz }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-descriptions title="职称信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">教师职称</template>
                {{ info_obj.jszc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">所属教研组</template>
                {{ info_obj.ssjyz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">当前状态</template>
                {{ info_obj.dqztm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">合同类型</template>
                {{ info_obj.htlx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">银行卡号</template>
                {{ info_obj.yhkh }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-descriptions title="其他个人信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">居住证起始时间</template>
                {{ info_obj.jjzqssj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否落户</template>
                {{ info_obj.sflh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">居住证有效期</template>
                待定
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">护照号/通行证号</template>
                没有
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">发证单位</template>
                没有
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">护照号/通行证号有效期</template>
                没有
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">入党日期</template>
                {{ info_obj.rdrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">备注</template>
                {{ info_obj.bz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">因公/因私护照上传附件</template>
                没有
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-collapse accordion>
              <el-collapse-item title="学历及学位子集">
                <div>
                  <!-- 学历及学位子集 -->
                  <el-table
                    :data="xljxw_tableData"
                    style="width: 100%"
                    align="center"
                    border
                    :header-cell-style="{ textAlign: 'center' }"
                  >
                    <el-table-column label="学历" prop="xlm"> </el-table-column>
                    <el-table-column label="入学时间" prop="rxsj">
                    </el-table-column>
                    <el-table-column label="学习形式" prop="xxxsm">
                    </el-table-column>
                    <el-table-column label="学校" prop="xx"> </el-table-column>
                    <el-table-column label="专业/系" prop="sxzym">
                    </el-table-column>
                    <el-table-column label="所获学位" prop="hdxwm">
                    </el-table-column>
                    <el-table-column label="证明人" prop="zmr">
                    </el-table-column>
                    <el-table-column label="毕业时间" prop="bysj">
                    </el-table-column>
                    <el-table-column label="备注" prop="bz"> </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
              <el-collapse-item title="个人履历子集（校外）">
                <el-table
                  :data="grll_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="超始时间" prop="qssj">
                  </el-table-column>
                  <el-table-column label="终止时间" prop="zzsj">
                  </el-table-column>
                  <el-table-column label="所在单位" prop="szdw">
                  </el-table-column>
                  <el-table-column label="职务" prop="zw"> </el-table-column>
                  <el-table-column label="单位所在省份" prop="dwszsf">
                  </el-table-column>
                  <el-table-column label="证明人" prop="zmr"> </el-table-column>
                  <el-table-column label="上传电子证明" prop="scdzzm">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="家属子集">
                <el-table
                  :data="family_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="称谓" prop="cw"> </el-table-column>
                  <el-table-column label="姓名" prop="xm"> </el-table-column>
                  <el-table-column label="出生年月" prop="csrq">
                  </el-table-column>
                  <el-table-column label="政治面貌" prop="zzmmm">
                  </el-table-column>
                  <el-table-column label="单位名称" prop="dwmc">
                  </el-table-column>
                  <el-table-column label="家庭成员职业" prop="jtcyzym">
                  </el-table-column>
                  <el-table-column label="联系方式" prop="lxfs">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="2">
          <el-row class="margin20">
            <el-descriptions title="任职信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">部门（处室）</template>
                {{ office_obj.bm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">人员类别</template>
                {{ office_obj.rylb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位类别</template>
                {{ office_obj.gwlbm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位聘任年月</template>
                {{ office_obj.gwprny }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位聘任年限</template>
                {{ office_obj.gwprnx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">实际工作年限</template>
                {{ office_obj.cjgzny }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">进入本单位工作时间</template>
                {{ office_obj.jrbdwgzsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位等级</template>
                {{ office_obj.gwdjm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">校内职务</template>
                {{ office_obj.xnzw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">参加工作时间</template>
                {{ office_obj.cjgzsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">任现职务时间</template>
                {{ office_obj.rxzwsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">用工形式（编制内录用）</template>
                {{ office_obj.ygxs }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">所属教研组</template>
                {{ office_obj.ssjyz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教龄</template>
                {{ office_obj.jl }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">减员时间</template>
                {{ office_obj.jysj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">人员录聘来源</template>
                {{ office_obj.rylply }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">专业技术职务</template>
                {{ office_obj.xrzyjszw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">专业技术等级</template>
                {{ office_obj.zyjsdj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否为内设机构领导</template>
                {{ office_obj.sfwnsjgld }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否残疾人</template>
                {{ office_obj.sfcjr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否留学回国</template>
                {{ office_obj.sflxhg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否为应届毕业生</template>
                {{ office_obj.sfyjbys }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否留学回国</template>
                {{ office_obj.sflxhg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">减员材料上传</template>
                {{ office_obj.jyclsc }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-collapse accordion>
              <el-collapse-item title="校内职务表">
                <el-table
                  :data="leader_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="部门" prop="bm"> </el-table-column>
                  <el-table-column label="职务名称" prop="zwmc">
                  </el-table-column>
                  <el-table-column label="任职方式" prop="rzfsm">
                  </el-table-column>
                  <el-table-column label="任免职文号" prop="rmzwh">
                  </el-table-column>
                  <el-table-column label="职务级别" prop="zwjbm">
                  </el-table-column>
                  <el-table-column label="任本职级时间" prop="rbzjsj">
                  </el-table-column>
                  <el-table-column label="上传领导任职文件" prop="ldrzwj">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="专业技术职务子集">
                <el-table
                  :data="professionduty_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="专业技术资格名称" prop="zyjszgmc">
                  </el-table-column>
                  <el-table-column label="取得资格途径" prop="qdzgtjm">
                  </el-table-column>
                  <el-table-column label="取得资格时间" prop="hdzgsj">
                  </el-table-column>
                  <el-table-column label="聘任专业技术职务名称" prop="rzzgmcm">
                  </el-table-column>
                  <el-table-column label="首次聘任时间" prop="scprsj">
                  </el-table-column>
                  <el-table-column label="聘任起始时间" prop="prqsrq">
                  </el-table-column>
                  <el-table-column label="聘任终止时间" prop="przzrq">
                  </el-table-column>
                  <el-table-column label="聘任情况" prop="prqkm">
                  </el-table-column>
                  <el-table-column label="上传电子证件" prop="scdzzj">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="工人技术等级及职务子集">
                <el-table
                  :data="workerskillgrade_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="工人技术等级名称" prop="grjsdjmc">
                  </el-table-column>
                  <el-table-column label="工人技术职务名称" prop="grjszwmc">
                  </el-table-column>
                  <el-table-column label="取得技术职务时间" prop="qdjszwsj">
                  </el-table-column>
                  <el-table-column
                    label="批准技术职务单位名称"
                    prop="pzjszwdwmc"
                  >
                  </el-table-column>
                  <el-table-column label="证书编号" prop="zsbh">
                  </el-table-column>
                  <el-table-column label="职业工种" prop="grgzm">
                  </el-table-column>
                  <el-table-column label="上传电子证件" prop="szdczj">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="社会兼职子集">
                <el-table
                  :data="parttimejob_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="起始时间" prop="shjzqsrq">
                  </el-table-column>
                  <el-table-column label="终止时间" prop="shjzzzrq">
                  </el-table-column>
                  <el-table-column label="任职组织" prop="rzzz">
                  </el-table-column>
                  <el-table-column label="组织类型" prop="zzlx">
                  </el-table-column>
                  <el-table-column label="兼职职务" prop="jzzw">
                  </el-table-column>
                  <el-table-column label="是否取酬" prop="sfqc">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="服务协议子集">
                <el-table
                  :data="servicetoenterprise_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="起始时间" prop="qssj">
                  </el-table-column>
                  <el-table-column label="终止时间" prop="zzsj">
                  </el-table-column>
                  <el-table-column label="事由" prop="sy"> </el-table-column>
                  <el-table-column label="总金额" prop="zje"> </el-table-column>
                  <el-table-column label="备注" prop="bz"> </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="年度考核" name="3">
          <el-row class="margin20">
            <el-descriptions title="年度考核" :column="3" border>
              <el-descriptions-item>
                <template slot="label">姓名</template>
                {{ examine_obj.xm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证号</template>
                {{ examine_obj.sfzjh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">考核年度</template>
                {{ examine_obj.khnd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">考核结果</template>
                {{ examine_obj.khjgm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">备注</template>
                {{ examine_obj.bz }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="教师发展信息" name="4">
          <el-row class="margin20">
            <el-descriptions title="教师发展信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">师训帐号</template>
                {{ jsfzxx_obj.sxzh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">双师型教师认定</template>
                {{ jsfzxx_obj.ssxjsrd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否教研组长</template>
                {{ jsfzxx_obj.sfjyzz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教研组长备注</template>
                {{ jsfzxx_obj.jyzzbz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否名师工作室主持人</template>
                {{ jsfzxx_obj.sfmsgzszcr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">名师工作室主持人级别</template>
                {{ jsfzxx_obj.msgzszcrjb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">名师工作室主持人备注</template>
                {{ jsfzxx_obj.msgzszcrbz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否学科带头人</template>
                {{ jsfzxx_obj.sfxkdtr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">学科带头人备注</template>
                {{ jsfzxx_obj.xkdtrbz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否骨干教师</template>
                {{ jsfzxx_obj.sfggjs }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">骨干教师备注</template>
                {{ jsfzxx_obj.ggjsbz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否学术委员会成员</template>
                {{ jsfzxx_obj.sfxswyhcy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">学术委员会成员备注</template>
                {{ jsfzxx_obj.ggjsbz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否督导组成员</template>
                {{ jsfzxx_obj.sfddzcy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">督导组成员备注</template>
                {{ jsfzxx_obj.ddzcybz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教师资格证上传</template>
                {{ jsfzxx_obj.jszgzsc }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row class="margin20">
            <el-collapse accordion>
              <el-collapse-item title="教师资格证子集">
                <el-table
                  :data="jszgz_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="资格种类" prop="zgzzl">
                  </el-table-column>
                  <el-table-column label="资格证号码" prop="zgzhm">
                  </el-table-column>
                  <el-table-column label="任教学科" prop="rjxk">
                  </el-table-column>
                  <el-table-column label="发证机关" prop="fzjg">
                  </el-table-column>
                  <el-table-column label="证书颁发日期" prop="zsbfrq">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="职业资格证子集">
                <el-table
                  :data="certificate_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="职业工种" prop="zygz">
                  </el-table-column>
                  <el-table-column label="职业等级" prop="zydj">
                  </el-table-column>
                  <el-table-column label="颁证机构" prop="bzjg">
                  </el-table-column>
                  <el-table-column label="证书编号" prop="zyzgzsbh">
                  </el-table-column>
                  <el-table-column label="取得时间" prop="zsbfrq">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="教育培训子集">
                <el-table
                  :data="train_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="学习起始时间" prop="xxqssj">
                  </el-table-column>
                  <el-table-column label="学习终止时间" prop="xxzzsj">
                  </el-table-column>
                  <el-table-column label="培训班名称" prop="pxbmc">
                  </el-table-column>
                  <el-table-column label="培训学时" prop="pxxs">
                  </el-table-column>
                  <el-table-column label="培训类别" prop="pxlb">
                  </el-table-column>
                  <el-table-column label="主办单位" prop="zbdw">
                  </el-table-column>
                  <el-table-column label="参加出国出境" prop="cjcgcj">
                  </el-table-column>
                  <el-table-column label="是否学历学位晋升" prop="sfxlxwjs">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="5">
          <el-row class="margin20">
            <el-descriptions title="处分（行政及党内）" :column="3" border>
              <el-descriptions-item>
                <template slot="label">处分类别</template>
                {{ jsfzxx_obj.cflb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分原因</template>
                {{ jsfzxx_obj.cfyy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分记录描述</template>
                {{ jsfzxx_obj.cfjlms }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分单位名称</template>
                {{ jsfzxx_obj.cfdwmc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分日期</template>
                {{ jsfzxx_obj.cfrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分撤销日期</template>
                {{ jsfzxx_obj.cfcxrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">处分撤销原因</template>
                {{ jsfzxx_obj.cfcxyy }}
              </el-descriptions-item>
            </el-descriptions>
            <el-descriptions title="奖励和荣誉" :column="3" border>
              <el-descriptions-item>
                <template slot="label">荣誉奖励级别</template>
                {{ jsfzxx_obj.jljbm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">奖励类别</template>
                {{ jsfzxx_obj.jllbm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">奖励名称</template>
                {{ jsfzxx_obj.jlmc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">荣誉和奖励原因</template>
                {{ jsfzxx_obj.jlyy }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">奖励时间</template>
                {{ jsfzxx_obj.jlsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">奖励单位</template>
                {{ jsfzxx_obj.jldw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">备注</template>
                {{ jsfzxx_obj.bz }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息" name="6">
          <el-row class="margin20">
            <el-descriptions title="薪酬福利信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">岗位绩点</template>
                {{ salary_obj.gwjd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位等级</template>
                {{ salary_obj.gwdjm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位工资</template>
                {{ salary_obj.gwgz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">薪级等级</template>
                {{ salary_obj.xjdj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">薪级工资</template>
                {{ salary_obj.xjgz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">上下班交通费</template>
                {{ salary_obj.sxbjtf }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">粮油补贴</template>
                {{ salary_obj.lybt }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教贴</template>
                {{ salary_obj.jt }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位津贴</template>
                {{ salary_obj.gwjt }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">技术津贴</template>
                {{ salary_obj.jsjt }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">工会费</template>
                {{ salary_obj.ghf }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">饭贴</template>
                {{ salary_obj.ft }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">工作年限</template>
                {{ salary_obj.gznx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">聘任岗位</template>
                {{ salary_obj.prgw }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">任现职时间</template>
                {{ salary_obj.xrzsj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">薪级等级附件</template>
                {{ salary_obj.xjdjfj }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="财务信息" name="7">
          <el-row class="margin20">
            <el-descriptions title="财务信息" :column="1" border>
              <el-descriptions-item>
                <template slot="label">中国建设银行卡号</template>
                {{ salary_obj.zgjsyhkh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">中国工商银行卡号</template>
                {{ salary_obj.zggsyhkh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">中国银行卡号</template>
                {{ salary_obj.zgyhkh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">公积金账号</template>
                {{ salary_obj.gjjzh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">补充公积金账号</template>
                {{ salary_obj.bcgjjzh }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="8">
          <el-row class="margin20">
            <el-collapse accordion>
              <el-collapse-item title="因公/因私护照">
                <el-table
                  :data="furtherstudyforeign_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="类别" prop="hzzjzldm">
                  </el-table-column>
                  <el-table-column label="护照号" prop="hzhtxzh">
                  </el-table-column>
                  <el-table-column label="签发地点" prop="qfdd">
                  </el-table-column>
                  <el-table-column label="签发日期" prop="qfrq">
                  </el-table-column>
                  <el-table-column label="签发机关" prop="qfjg">
                  </el-table-column>
                  <el-table-column label="终止日期" prop="zzrq">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="组织考察（考核）子集">
                <el-table
                  :data="organiseinspect_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="考察（考核）事由" prop="kcsy">
                  </el-table-column>
                  <el-table-column label="考察（考核）时间" prop="khrq">
                  </el-table-column>
                  <el-table-column label="备注" prop="bz"> </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_view = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_view = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { option, info_form } from "@/const/crud/staff/teacher/info";

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
      // 用户id
      staff_id: undefined,
      // 标签页激活项
      activeName: "1",
      // 控制弹窗全屏
      dialogFull: false,

      // 控制 添加 对话框的显示与隐藏
      dialogVisible_add: false,
      // 控制 查看 对话框的显示与隐藏
      dialogVisible_view: false,

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
      reward_obj: {},
      salary_obj: {},
      bankno_obj: {},

      obj: {},
      //主表 option
      infoOption: infoOption,
      educateOption: educateOption,
      otherOption: otherOption,
      examineOption: examineOption,
      jsfzxxOption: jsfzxxOption,
      punishOption: punishOption,
      rewardOption: rewardOption,
      salaryOption: salaryOption,
      banknoOption: banknoOption,
      // 子表 option
      xljxwOption: xljxwOption,
      grllOption: grllOption,
      familyOption: familyOption,
      officeOption: officeOption,
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
    // 添加基本信息
    submit_info(form, loading) {
      if (this.infoOption.submitText === "添加") {
        setTimeout(async () => {
          const { data: res } = await add("info", form);
          if (!result(this, res, "add")) return true;
          loading();
          this.infoOption.readonly = true;
          this.staff_id = res.data;
        }, 1000);
      }
      if (this.infoOption.submitText === "修改") {
        setTimeout(async () => {
          const { data: res } = await esit("info", form);
          if (!result(this, res, "add")) return true;
          loading();
        }, 1000);
      }
    },
    submit() {},
    // 添加教育信息
    async submit_educate(form, loading) {
      if (this.staff_id === undefined) {
        loading();
        return this.$message.error("请先添加基本信息");
      }
      form.id = this.staff_id;
      console.log(form);
      const { data: res } = await edit("info", form);
      if (!result(this, res, "save")) return true;
      console.log(res.data);
      loading();
    },
    // 添加其他信息
    async submit_other(form, loading) {
      if (this.staff_id === undefined) {
        loading();
        return this.$message.error("请先添加基本信息");
      }
      form.id = this.staff_id;
      console.log(form);
      const { data: res } = await edit("info", form);
      if (!result(this, res, "save")) return true;
      console.log(res.data);
      loading();
    },
    submit_office() {},

    // 编辑行信息
    editRow(row) {
      this.dialogVisible_add = true;
      this.obj = row;
      console.log(row);
      this.isAdd = false;
      this.info_form = row;
      this.staff_id = row.id;
      this.infoOption.submitText = "修改";
    },

    // 查看行信息
    viewRow(row) {
      this.dialogVisible_view = true;
      this.activeName = "1";
      this.info_obj = row;
    },

    async childRowSave(form, done, loading) {
      if (this.staff_id === undefined) {
        loading();
        return this.$message.error("请先添加基本信息");
      }
      form.staffId = this.staff_id;
      const { data: res } = await add(type, obj);
      if (!result(this, res, "add")) return true;
      this.$message.success("添加成功！");
      done(form);
    },

    // 打开子表对话框
    openChild(type) {
      this[`dialogVisible_${type}`] = true;
      this.child_flag = "add";
    },

    // 清空表单
    clearForm(type) {
      this.get();
      if (type === "info") {
        this.staff_id = undefined;
        this.$refs.infoFormRef.resetForm();
        this.$refs.educateFormRef.resetForm();
        this.$refs.otherFormRef.resetForm();
        this.infoOption.readonly = false;
      }
    },

    // 获取表格数据
    async get(form) {
      const { data: res } = await get("info", this.page, form, this.search);
      if (res.code !== 0)
        return this.$message.error("获取数据失败！--" + res.message);
      this.data = res.data.records;
      this.page.total = res.data.total;
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

    // 子表提交
    async submitChild(type, obj) {
      if (this.staff_id === undefined)
        return this.$message.error("请先添加基本信息！");
      obj.staffId = this.staff_id;
      // 添加
      if (this.child_flag === "add") {
        const { data: res } = await add(type, obj);
        if (!result(this, res, "add")) return true;
        this.$message.success("添加成功！");
      }
      // 修改
      if (this.child_flag === "edit") {
        const { data: res } = await edit(type, obj);
        if (!result(this, res, "edit")) return true;
        this.$message.success("修改成功！");
      }
      const { data: res } = await get(type, {
        currentPage: undefined,
        pageSize: undefined,
      });
      if (res.code !== 0) return true;
      this[`${type}_tableData`] = res.data.records;
      this[`dialogVisible_${type}`] = false;
    },

    // 子表修改
    editChildRow(type, row) {
      this[`dialogVisible_${type}`] = true;
      this[`${type}_form`] = row;
      this.child_flag = "edit";
    },

    // 子表删除
    async delChildRow(type, row) {
      const { data: res } = await del(type, row.id);
      if (!result(this, res, "del")) return true;
      this.$message.success("删除成功！");
      this[`${type}_tableData`].some((item, index) => {
        if (item.staffId === row.staffId) {
          this[`${type}_tableData`].splice(index, 1);
          return true;
        }
      });
    },
    // 标签页切换
    tabChange(val) {
      if (val.name !== "3") return true;
      if (this.staff_id === undefined) return true;
      examine_form.xm = info_form.xm;
      examine_form.sfzjh = info_form.sfzjh;
    },

    searchChange(form, done) {
      this.search = form;
      this.page.currentPage = 1;
      this.get(form);
      done();
    },

    // 添加按钮
    add() {
      this.dialogVisible_add = true;
      this.activeName = "1";
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

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
                  <el-table-column label="证明人" prop="zmr"> </el-table-column>
                  <el-table-column label="毕业时间" prop="bysj">
                  </el-table-column>
                  <el-table-column label="备注" prop="bz"> </el-table-column>
                  <el-table-column align="center">
                    <template slot="header">
                      <el-button type="text" @click="openChild('xljxw')"
                        ><i class="el-icon-plus"></i>添加</el-button
                      >
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        @click="editChildRow('xljxw', scope.row)"
                        >修改</el-button
                      >
                      <el-button
                        type="text"
                        @click="delChildRow('xljxw', scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog
                  append-to-body
                  title="提示"
                  :visible.sync="dialogVisible_xljxw"
                  width="30%"
                  @open="clearForm('xljxw')"
                >
                  <el-form
                    ref="xljxwFormRef"
                    :model="xljxw_form"
                    :rules="xljxw_rules"
                    label-width="100px"
                  >
                    <el-form-item label="学历" prop="xlm">
                      <el-input v-model="xljxw_form.xlm"></el-input>
                    </el-form-item>
                    <el-form-item label="入学时间" prop="rxsj">
                      <el-date-picker
                        v-model="xljxw_form.rxsj"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="学习形式" prop="xxxsm">
                      <el-input v-model="xljxw_form.xxxsm"></el-input>
                    </el-form-item>
                    <el-form-item label="学校" prop="xx">
                      <el-input v-model="xljxw_form.xx"></el-input>
                    </el-form-item>
                    <el-form-item label="专业/系" prop="sxzym">
                      <el-input v-model="xljxw_form.sxzym"></el-input>
                    </el-form-item>
                    <el-form-item label="所获学位" prop="hdxwm">
                      <el-input v-model="xljxw_form.hdxwm"></el-input>
                    </el-form-item>
                    <el-form-item label="证明人" prop="zmr">
                      <el-input v-model="xljxw_form.zmr"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间" prop="bysj">
                      <el-date-picker
                        v-model="xljxw_form.bysj"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      >
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="备注" prop="bz">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4 }"
                        placeholder="请输入内容"
                        v-model="xljxw_form.bz"
                        maxlength="100"
                      >
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_xljxw = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="submitChild('xljxw', xljxw_form)"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('grll')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('grll', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('grll', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_grll"
                width="30%"
                @open="clearForm('grll')"
              >
                <el-form
                  ref="grllFormRef"
                  :model="grll_form"
                  :rules="grll_rules"
                  label-width="110px"
                >
                  <el-form-item label="超始时间" prop="qssj">
                    <el-date-picker
                      v-model="grll_form.qssj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="zzsj">
                    <el-date-picker
                      v-model="grll_form.zzsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="所在单位" prop="szdw">
                    <el-input v-model="grll_form.szdw"></el-input>
                  </el-form-item>
                  <el-form-item label="职务" prop="zw">
                    <el-input v-model="grll_form.zw"></el-input>
                  </el-form-item>
                  <el-form-item label="单位所在省份" prop="dwszsf">
                    <el-input v-model="grll_form.dwszsf"></el-input>
                  </el-form-item>
                  <el-form-item label="证明人" prop="zmr">
                    <el-input v-model="grll_form.zmr"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证明" prop="scdzzm">
                    <el-input v-model="grll_form.scdzzm"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_grll = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('grll', grll_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('family')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('family', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('family', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_family"
                width="30%"
                @open="clearForm('family')"
              >
                <el-form
                  ref="familyFormRef"
                  :model="family_form"
                  :rules="js_rules"
                  label-width="100px"
                >
                  <el-form-item label="称谓" prop="cw">
                    <el-input v-model="family_form.cw"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="xm">
                    <el-input v-model="family_form.xm"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月" prop="csrq">
                    <el-date-picker
                      v-model="family_form.csrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="政治面貌" prop="zzmmm">
                    <el-input v-model="family_form.zzmmm"></el-input>
                  </el-form-item>
                  <el-form-item label="单位名称" prop="dwmc">
                    <el-input v-model="family_form.dwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="家庭成员职业" prop="jtcyzym">
                    <el-input v-model="family_form.jtcyzym"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="lxfs">
                    <el-input v-model="family_form.lxfs"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_family = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('family', family_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="2">
          <table>
            <tr>
              <th>
                <span>任职信息</span>
                <span>
                  <el-button
                    type="primary"
                    v-show="office_isAdd"
                    @click="addOther('office', office_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!office_isAdd"
                    @click="saveOther('office', office_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="officeFormRef"
                    :model="office_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item
                        label="部门（处室）"
                        prop="bm"
                        label-width="110px"
                      >
                        <el-input v-model="office_form.bm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="人员类别" prop="rylb">
                        <el-select
                          v-model="office_form.rylb"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in rylbOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="岗位类别" prop="gwlbm">
                        <el-select
                          v-model="office_form.gwlbm"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in postOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item
                        label="岗位聘任年月"
                        prop="gwprny"
                        label-width="110px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="office_form.gwprny"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="岗位聘任年限"
                        prop="gwprnx"
                        label-width="110px"
                      >
                        <avue-input-number
                          v-model="office_form.gwprnx"
                          :min-rows="0"
                          :max-rows="100"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="实际工作年限"
                        prop="cjgzny"
                        label-width="110px"
                      >
                        <avue-input-number
                          v-model="office_form.cjgzny"
                          :min-rows="0"
                          :max-rows="100"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item
                        label="进入本单位工作时间"
                        prop="jrbdwgzsj"
                        label-width="150px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="office_form.jrbdwgzsj"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="岗位等级" prop="gwdjm">
                        <el-input v-model="office_form.gwdjm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="校内职务"
                        prop="xnzw"
                        label-width="100px"
                      >
                        <el-input v-model="office_form.xnzw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="参加工作时间"
                        prop="cjgzsj"
                        label-width="110px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="office_form.cjgzsj"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item
                        label="任现职务时间"
                        prop="rxzwsj"
                        label-width="110px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="office_form.rxzwsj"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="用工形式（编制内录用）"
                        prop="ygxs"
                        label-width="180px"
                      >
                        <el-input v-model="office_form.ygxs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="所属教研组"
                        prop="ssjyz"
                        label-width="100px"
                      >
                        <el-input v-model="office_form.ssjyz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="教龄" prop="jl">
                        <avue-input-number
                          v-model="office_form.jl"
                          :min-rows="1"
                          :max-rows="60"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="减员时间"
                        prop="jysj"
                        label-width="100px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="office_form.jysj"
                          type="date"
                          placeholder="选择日期"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="人员录聘来源"
                        prop="rylply"
                        label-width="110px"
                      >
                        <el-input v-model="office_form.rylply"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="试用期限" prop="syqx">
                        <el-input v-model="office_form.syqx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="专业技术职务"
                        prop="xrzyjszw"
                        label-width="110px"
                      >
                        <el-input v-model="office_form.xrzyjszw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="专业技术等级"
                        prop="zyjsdj"
                        label-width="110px"
                      >
                        <el-input v-model="office_form.zyjsdj"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item
                        label="是否为内设机构领导"
                        prop="sfwnsjgld"
                        label-width="150px"
                      >
                        <avue-radio
                          v-model="office_form.sfwnsjgld"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="是否残疾人" prop="sfcjr">
                        <avue-radio
                          v-model="office_form.sfcjr"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="是否留学回国"
                        prop="sflxhg"
                        label-width="110px"
                      >
                        <avue-radio
                          v-model="office_form.sflxhg"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="是否为应届毕业生"
                        prop="sfyjbys"
                        label-width="140px"
                      >
                        <avue-radio
                          v-model="office_form.sfyjbys"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item
                        label="减员材料上传"
                        prop="jyclsc"
                        label-width="110px"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="action"
                          :file-list="fileList"
                          list-type="picture"
                        >
                          <el-button size="small" type="primary"
                            >点击上传</el-button
                          >
                          <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                          </div>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </td>
            </tr>
          </table>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('leader')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('leader', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('leader', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_leader"
                width="30%"
                @open="clearForm('leader')"
              >
                <el-form
                  ref="leaderFormRef"
                  :model="leader_form"
                  :rules="xnzwb_rules"
                  label-width="140px"
                >
                  <el-form-item label="部门" prop="bm">
                    <el-input v-model="leader_form.bm"></el-input>
                  </el-form-item>
                  <el-form-item label="职务名称" prop="zwmc">
                    <el-input v-model="leader_form.zwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="任职方式" prop="rzfsm">
                    <el-select v-model="leader_form.rzfsm" placeholder="请选择">
                      <el-option
                        v-for="item in rzfsOptions"
                        :key="item.id"
                        :label="item.type"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="任免职文号" prop="rmzwh">
                    <el-input v-model="leader_form.rmzwh"></el-input>
                  </el-form-item>
                  <el-form-item label="职务级别" prop="zwjbm">
                    <el-input v-model="leader_form.zwjbm"></el-input>
                  </el-form-item>
                  <el-form-item label="任本职级时间" prop="rbzjsj">
                    <el-date-picker
                      v-model="leader_form.rbzjsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="上传领导任职文件" prop="ldrzwj">
                    <el-upload
                      class="upload-demo"
                      :action="action"
                      :file-list="fileList"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                      <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_leader = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('leader', leader_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('professionduty')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('professionDuty', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('professionDuty', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_professionduty"
                width="30%"
                @open="clearForm('professionduty')"
              >
                <el-form
                  ref="professiondutyFormRef"
                  :model="professionduty_form"
                  :rules="zyjszw_rules"
                  label-width="165px"
                >
                  <el-form-item label="专业技术资格名称" prop="zyjszgmc">
                    <el-input v-model="professionduty_form.zyjszgmc"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格途径" prop="qdzgtjm">
                    <el-input v-model="professionduty_form.qdzgtjm"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格时间" prop="hdzgsj">
                    <el-date-picker
                      v-model="professionduty_form.hdzgsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="聘任专业技术职务名称" prop="rzzgmcm">
                    <el-input v-model="professionduty_form.rzzgmcm"></el-input>
                  </el-form-item>
                  <el-form-item label="首次聘任时间" prop="scprsj">
                    <el-date-picker
                      v-model="professionduty_form.scprsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="聘任起始时间" prop="prqsrq">
                    <el-date-picker
                      v-model="professionduty_form.prqsrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="聘任终止时间" prop="przzrq">
                    <el-date-picker
                      v-model="professionduty_form.przzrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="聘任情况" prop="prqkm">
                    <el-input v-model="professionduty_form.prqkm"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证件" prop="scdzzj">
                    <el-upload
                      class="upload-demo"
                      :action="action"
                      :file-list="fileList"
                      list-type="picture"
                    >
                      <el-button size="small" type="primary"
                        >点击上传</el-button
                      >
                      <div slot="tip" class="el-upload__tip">
                        只能上传jpg/png文件，且不超过500kb
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_professionduty = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('professionduty', professionduty_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column label="批准技术职务单位名称" prop="pzjszwdwmc">
                </el-table-column>
                <el-table-column label="证书编号" prop="zsbh">
                </el-table-column>
                <el-table-column label="职业工种" prop="grgzm">
                </el-table-column>
                <el-table-column label="上传电子证件" prop="szdczj">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <el-button
                      type="text"
                      @click="openChild('workerskillgrade')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('workerskillgrade', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('workerskillgrade', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_workerskillgrade"
                width="30%"
                @open="clearForm('workerskillgrade')"
              >
                <el-form
                  ref="workerskillgradeFormRef"
                  :model="workerskillgrade_form"
                  :rules="grjsdjjzw_rules"
                  label-width="165px"
                >
                  <el-form-item label="工人技术等级名称" prop="grjsdjmc">
                    <el-select
                      v-model="workerskillgrade_form.grjsdjmc"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in grjsdjOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="工人技术职务名称" prop="grjszwmc">
                    <el-select
                      v-model="workerskillgrade_form.grjszwmc"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in grjsdjOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="取得技术职务时间" prop="qdjszwsj">
                    <el-date-picker
                      v-model="workerskillgrade_form.qdjszwsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="批准技术职务单位名称" prop="pzjszwdwmc">
                    <el-input
                      v-model="workerskillgrade_form.pzjszwdwmc"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号" prop="zsbh">
                    <el-input v-model="workerskillgrade_form.zsbh"></el-input>
                  </el-form-item>
                  <el-form-item label="职业工种" prop="grgzm">
                    <el-input v-model="workerskillgrade_form.grgzm"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证件" prop="szdczj">
                    <el-input v-model="workerskillgrade_form.szdczj"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_workerskillgrade = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="
                      submitChild('workerskillgrade', workerskillgrade_form)
                    "
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('parttimejob')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('parttimejob', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('parttimejob', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_parttimejob"
                width="30%"
                @open="clearForm('parttimejob')"
              >
                <el-form
                  ref="parttimejobFormRef"
                  :model="parttimejob_form"
                  :rules="shjz_rules"
                  label-width="100px"
                >
                  <el-form-item label="起始时间" prop="shjzqsrq">
                    <el-date-picker
                      v-model="parttimejob_form.shjzqsrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="shjzzzrq">
                    <el-date-picker
                      v-model="parttimejob_form.shjzzzrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="任职组织" prop="rzzz">
                    <el-input v-model="parttimejob_form.rzzz"></el-input>
                  </el-form-item>
                  <el-form-item label="组织类型" prop="zzlx">
                    <el-select
                      v-model="parttimejob_form.zzlx"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in zzlxOptions"
                        :key="item.id"
                        :label="item.type"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="兼职职务" prop="jzzw">
                    <el-input v-model="parttimejob_form.jzzw"></el-input>
                  </el-form-item>
                  <el-form-item label="是否取酬" prop="sfqc">
                    <el-input v-model="parttimejob_form.sfqc"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_parttimejob = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('parttimejob', parttimejob_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button
                      type="text"
                      @click="openChild('servicetoenterprise')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('servicetoenterprise', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('servicetoenterprise', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_servicetoenterprise"
                width="30%"
                @open="clearForm('servicetoenterprise')"
              >
                <el-form
                  ref="servicetoenterpriseFormRef"
                  :model="servicetoenterprise_form"
                  :rules="fwxy_rules"
                  label-width="100px"
                >
                  <el-form-item label="起始时间" prop="qssj">
                    <el-date-picker
                      v-model="servicetoenterprise_form.qssj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="zzsj">
                    <el-date-picker
                      v-model="servicetoenterprise_form.zzsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="事由" prop="sy">
                    <el-input v-model="servicetoenterprise_form.sy"></el-input>
                  </el-form-item>
                  <el-form-item label="总金额" prop="zje">
                    <el-input-number
                      v-model="servicetoenterprise_form.zje"
                      :precision="4"
                      :step="1"
                      :max="100000000"
                      controls-position="right"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input
                      type="textarea"
                      maxlength="200"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="servicetoenterprise_form.bz"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_servicetoenterprise = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="
                      submitChild(
                        'servicetoenterprise',
                        servicetoenterprise_form
                      )
                    "
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="年度考核" name="3">
          <table>
            <tr>
              <th>
                <span>年度考核</span>
                <span
                  ><el-button
                    type="primary"
                    v-show="examine_isAdd"
                    @click="addOther('examine', examine_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!examine_isAdd"
                    @click="saveOther('examine', examine_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="examineFormRef"
                    :model="examine_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item label="姓名" prop="xm">
                        <el-input v-model="examine_form.xm" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="身份证号" prop="sfzjh">
                        <el-input
                          v-model="examine_form.sfzjh"
                          disabled
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="考核年度" prop="khnd">
                        <avue-input-number
                          style="width: 100%"
                          v-model="examine_form.khnd"
                          :min-rows="1"
                          :max-rows="100"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="考核结果" prop="khjgm">
                        <el-input v-model="examine_form.khjgm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="备注" prop="bz">
                        <el-input
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="examine_form.bz"
                          maxlength="200"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          show-word-limit
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
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
                <span
                  ><el-button
                    type="primary"
                    v-show="jsfzxx_isAdd"
                    @click="addOther('jsfzxx', jsfzxx_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!jsfzxx_isAdd"
                    @click="saveOther('jsfzxx', jsfzxx_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="jsfzxxFormRef"
                    :model="jsfzxx_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item label="师训帐号" prop="sxzh">
                        <el-input v-model="jsfzxx_form.sxzh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="双师型教师认定"
                        prop="ssxjsrd"
                        label-width="120px"
                      >
                        <el-input v-model="jsfzxx_form.ssxjsrd"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否教研组长"
                        prop="sfjyzz"
                        label-width="110px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfjyzz"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="教研组长备注"
                        prop="jyzzbz"
                        label-width="110px"
                      >
                        <el-input v-model="jsfzxx_form.jyzzbz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        label="是否名师工作室主持人"
                        prop="sfmsgzszcr"
                        label-width="160px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfmsgzszcr"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="名师工作室主持人级别"
                        prop="msgzszcrjb"
                        label-width="160px"
                      >
                        <avue-select
                          v-model="jsfzxx_form.msgzszcrjb"
                          placeholder="请选择内容"
                          type="tree"
                          :dic="undefined"
                        ></avue-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="名师工作室主持人备注"
                        prop="msgzszcrbz"
                        label-width="160px"
                      >
                        <el-input v-model="jsfzxx_form.msgzszcrbz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否学科带头人"
                        prop="sfxkdtr"
                        label-width="120px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfxkdtr"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学科带头人备注"
                        prop="xkdtrbz"
                        label-width="120px"
                      >
                        <el-input v-model="jsfzxx_form.xkdtrbz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否骨干教师"
                        prop="sfggjs"
                        label-width="110px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfggjs"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="骨干教师备注"
                        prop="ggjsbz"
                        label-width="110px"
                      >
                        <el-input v-model="jsfzxx_form.ggjsbz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否学术委员会成员"
                        prop="sfxswyhcy"
                        label-width="150px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfxswyhcy"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="学术委员会成员备注"
                        prop="ggjsbz"
                        label-width="150px"
                      >
                        <el-input v-model="jsfzxx_form.xswyhcybz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否督导组成员"
                        prop="sfddzcy"
                        label-width="120px"
                      >
                        <avue-radio
                          v-model="jsfzxx_form.sfddzcy"
                          :dic="sfDic"
                        ></avue-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="督导组成员备注"
                        prop="ddzcybz"
                        label-width="120px"
                      >
                        <el-input v-model="jsfzxx_form.ddzcybz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        label="教师资格证上传"
                        label-width="125px"
                        prop="jszgzsc"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="action"
                          :file-list="fileList"
                          list-type="picture"
                        >
                          <el-button size="small" type="primary"
                            >点击上传</el-button
                          >
                          <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                          </div>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </td>
            </tr>
          </table>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('jszgz')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('jszgz', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('jszgz', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jszgz"
                width="30%"
                @open="clearForm('jszgz')"
              >
                <el-form
                  ref="jszgzFormRef"
                  :model="jszgz_form"
                  :rules="jszgz_rules"
                  label-width="120px"
                >
                  <el-form-item label="资格证种类" prop="zgzzl">
                    <el-input v-model="jszgz_form.zgzzl"></el-input>
                  </el-form-item>
                  <el-form-item label="资格证号码" prop="zgzhm">
                    <el-input v-model="jszgz_form.zgzhm"></el-input>
                  </el-form-item>
                  <el-form-item label="任教学科" prop="rjxk">
                    <el-input v-model="jszgz_form.rjxk"></el-input>
                  </el-form-item>
                  <el-form-item label="发证机关" prop="fzjg">
                    <el-input v-model="jszgz_form.fzjg"></el-input>
                  </el-form-item>
                  <el-form-item label="证书颁发日期" prop="zsbfrq">
                    <avue-date
                      v-model="jszgz_form.zsbfrq"
                      format="yyyy年MM月dd日"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择日期"
                    ></avue-date>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_jszgz = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('jszgz', jszgz_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('certificate')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('certificate', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('certificate', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_certificate"
                width="30%"
                @open="clearForm('certificate')"
              >
                <el-form
                  ref="certificateFormRef"
                  :model="certificate_form"
                  :rules="zyzgz_rules"
                  label-width="100px"
                >
                  <el-form-item label="职业工种" prop="zygz">
                    <el-input v-model="certificate_form.zygz"></el-input>
                  </el-form-item>
                  <el-form-item label="职业等级" prop="zydj">
                    <el-input v-model="certificate_form.zydj"></el-input>
                  </el-form-item>
                  <el-form-item label="颁证机构" prop="bzjg">
                    <el-input v-model="certificate_form.bzjg"></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号" prop="zyzgzsbh">
                    <el-input v-model="certificate_form.zyzgzsbh"></el-input>
                  </el-form-item>
                  <el-form-item label="取得时间" prop="zsbfrq">
                    <el-date-picker
                      v-model="certificate_form.zsbfrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_certificate = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('certificate', certificate_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('train')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('train', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('train', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_train"
                width="30%"
                @open="clearForm('train')"
              >
                <el-form
                  ref="trainFormRef"
                  :model="train_form"
                  :rules="jypx_rules"
                  label-width="140px"
                >
                  <el-form-item label="学习起始时间" prop="xxqssj">
                    <el-date-picker
                      v-model="train_form.xxqssj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="学习终止时间" prop="xxzzsj">
                    <el-date-picker
                      v-model="train_form.xxzzsj"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="培训班名称" prop="pxbmc">
                    <el-input v-model="train_form.pxbmc"></el-input>
                  </el-form-item>
                  <el-form-item label="培训学时" prop="pxxs">
                    <el-input v-model="train_form.pxxs"></el-input>
                  </el-form-item>
                  <el-form-item label="培训类别" prop="pxlb">
                    <el-input v-model="train_form.pxlb"></el-input>
                  </el-form-item>
                  <el-form-item label="主办单位" prop="zbdw">
                    <el-input v-model="train_form.zbdw"></el-input>
                  </el-form-item>
                  <el-form-item label="参加出国出境" prop="cjcgcj">
                    <el-input v-model="train_form.cjcgcj"></el-input>
                  </el-form-item>
                  <el-form-item label="是否学历学位晋升" prop="sfxlxwjs">
                    <el-input v-model="train_form.sfxlxwjs"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_train = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('train', train_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="奖惩信息" name="5">
          <table>
            <tr>
              <th>
                <span>处分（行政及党内）</span>
                <span
                  ><el-button
                    type="primary"
                    v-show="punish_isAdd"
                    @click="addOther('punish', punish_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!punish_isAdd"
                    @click="saveOther('punish', punish_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="punishFormRef"
                    :model="punish_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item label="处分类别" prop="cflb">
                        <el-input v-model="punish_form.cflb"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处分原因" prop="cfyy">
                        <el-input v-model="punish_form.cfyy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="处分记录描述"
                        prop="cfjlms"
                        label-width="110px"
                      >
                        <el-input v-model="punish_form.cfjlms"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="处分单位名称"
                        prop="cfdwmc"
                        label-width="110px"
                      >
                        <el-input v-model="punish_form.cfdwmc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="处分日期" prop="cfrq">
                        <el-date-picker
                          style="width: 100%"
                          v-model="punish_form.cfrq"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="处分撤销日期"
                        prop="cfcxrq"
                        label-width="110px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="punish_form.cfcxrq"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="处分撤销原因"
                        prop="cfcxyy"
                        label-width="110px"
                      >
                        <el-input v-model="punish_form.cfcxyy"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </td>
            </tr>
            <tr>
              <th>
                <span>奖励和荣誉</span>
                <span
                  ><el-button
                    type="primary"
                    v-show="reward_isAdd"
                    @click="addOther('reward', reward_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!reward_isAdd"
                    @click="saveOther('reward', reward_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="rewardFormRef"
                    :model="reward_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item
                        label="荣誉奖励级别"
                        prop="jljbm"
                        label-width="110px"
                      >
                        <el-input v-model="reward_form.jljbm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖励类别" prop="jllbm">
                        <el-input v-model="reward_form.jllbm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖励名称" prop="jlmc">
                        <el-input v-model="reward_form.jlmc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="荣誉和奖励原因"
                        prop="jlyy"
                        label-width="120px"
                      >
                        <el-input v-model="reward_form.jlyy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖励时间" prop="jlsj">
                        <avue-date
                          v-model="reward_form.jlsj"
                          format="yyyy年MM月dd日"
                          value-format="yyyy-MM-dd"
                          placeholder="请选择日期"
                        ></avue-date>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖励单位" prop="jldw">
                        <el-input v-model="reward_form.jldw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="备注" prop="bz">
                        <el-input
                          type="textarea"
                          placeholder="请输入内容"
                          v-model="reward_form.bz"
                          maxlength="200"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          show-word-limit
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
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
                <span
                  ><el-button
                    type="primary"
                    v-show="salary_isAdd"
                    @click="addOther('salary', salary_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!salary_isAdd"
                    @click="saveOther('salary', salary_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="salaryFormRef"
                    :model="salary_form"
                    label-width="90px"
                  >
                    <el-col :span="12">
                      <el-form-item label="岗位绩点" prop="gwjd">
                        <el-input v-model="salary_form.gwjd"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="薪酬类别" prop="xclb">
                        <avue-select
                          v-model="salary_form.xclb"
                          placeholder="请选择内容"
                          type="tree"
                          :dic="undefined"
                        ></avue-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="岗位等级" prop="gwdjm">
                        <el-input v-model="salary_form.gwdjm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="岗位工资" prop="gwgz">
                        <avue-input-number
                          v-model="salary_form.gwgz"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="薪级等级" prop="xjdj">
                        <el-input v-model="salary_form.xjdj"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="薪级工资" prop="xjgz">
                        <avue-input-number
                          v-model="salary_form.xjgz"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="上下班交通费"
                        prop="sxbjtf"
                        label-width="115px"
                      >
                        <avue-input-number
                          v-model="salary_form.sxbjtf"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="粮油补贴" prop="lybt">
                        <avue-input-number
                          v-model="salary_form.lybt"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="教贴" prop="jt">
                        <avue-input-number
                          v-model="salary_form.jt"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="岗位津贴" prop="gwjt">
                        <avue-input-number
                          v-model="salary_form.gwjt"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="技术津贴" prop="jsjt">
                        <avue-input-number
                          v-model="salary_form.jsjt"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="工会费" prop="ghf">
                        <avue-input-number
                          v-model="salary_form.ghf"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="饭贴" prop="ft">
                        <avue-input-number
                          v-model="salary_form.ft"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="工作年限" prop="gznx">
                        <avue-input-number
                          v-model="salary_form.gznx"
                          :min-rows="0"
                        ></avue-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="聘任岗位" prop="prgw">
                        <el-input v-model="salary_form.prgw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="任现职时间"
                        prop="xrzsj"
                        label-width="115px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="salary_form.xrzsj"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="薪级等级附件"
                        prop="xjdjfj"
                        label-width="115px"
                      >
                        <el-upload
                          :action="action"
                          :file-list="fileList"
                          list-type="picture"
                        >
                          <el-button size="small" type="primary"
                            >点击上传</el-button
                          >
                          <div slot="tip" class="el-upload__tip">
                            只能上传jpg/png文件，且不超过500kb
                          </div>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-form>
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
                <span
                  ><el-button
                    type="primary"
                    v-show="bankno_isAdd"
                    @click="addOther('bankno', bankno_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!bankno_isAdd"
                    @click="saveOther('bankno', bankno_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-row>
                  <el-form
                    ref="banknoFormRef"
                    :model="bankno_form"
                    label-width="160px"
                  >
                    <el-col :span="24">
                      <el-form-item label="中国建设银行卡号" prop="zgjsyhkh">
                        <el-input v-model="bankno_form.zgjsyhkh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="中国工商银行卡号" prop="zggsyhkh">
                        <el-input v-model="bankno_form.zggsyhkh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="中国银行卡号" prop="zgyhkh">
                        <el-input v-model="bankno_form.zgyhkh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="公积金账号" prop="gjjzh">
                        <el-input v-model="bankno_form.gjjzh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="补充公积金账号" prop="bcgjjzh">
                        <el-input v-model="bankno_form.bcgjjzh"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="8">
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button
                      type="text"
                      @click="openChild('furtherstudyforeign')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('furtherstudyforeign', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('furtherstudyforeign', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_furtherstudyforeign"
                width="30%"
                @open="clearForm('furtherstudyforeign')"
              >
                <el-form
                  ref="furtherstudyforeignFormRef"
                  :model="furtherstudyforeign_form"
                  :rules="ygyshz_rules"
                  label-width="80px"
                >
                  <el-form-item label="类别" prop="hzzjzldm">
                    <el-input
                      v-model="furtherstudyforeign_form.hzzjzldm"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="护照号" prop="hzhtxzh">
                    <el-input
                      v-model="furtherstudyforeign_form.hzhtxzh"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="签发地点" prop="qfdd">
                    <el-input
                      v-model="furtherstudyforeign_form.qfdd"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="签发日期" prop="qfrq">
                    <el-date-picker
                      v-model="furtherstudyforeign_form.qfrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="签发机关" prop="qfjg">
                    <el-input
                      v-model="furtherstudyforeign_form.qfjg"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="终止日期" prop="zzrq">
                    <el-date-picker
                      v-model="furtherstudyforeign_form.zzrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_furtherstudyforeign = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="
                      submitChild(
                        'furtherstudyforeign',
                        furtherstudyforeign_form
                      )
                    "
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('organiseinspect')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('organiseinspect', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('organiseinspect', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_organiseinspect"
                width="30%"
                @open="clearForm('organiseinspect')"
              >
                <el-form
                  ref="organiseinspectFormRef"
                  :model="organiseinspect_form"
                  :rules="zzkc_rules"
                  label-width="140px"
                >
                  <el-form-item label="考察（考核）事由" prop="kcsy">
                    <el-input v-model="organiseinspect_form.kcsy"></el-input>
                  </el-form-item>
                  <el-form-item label="考察（考核）时间" prop="khrq">
                    <el-date-picker
                      v-model="organiseinspect_form.khrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input
                      type="textarea"
                      maxlength="200"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="organiseinspect_form.bz"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_organiseinspect = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="
                      submitChild('organiseinspect', organiseinspect_form)
                    "
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
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
import {
  option,
  info_form,
  office_form,
  examine_form,
  jsfzxx_form,
  jcxx_form,
  salary_form,
  bankno_form,
  xljxw_form,
  grll_form,
  zzmmjdjqk_form,
  family_form,
  certificate_form,
  leader_form,
  professionduty_form,
  workerskillgrade_form,
  parttimejob_form,
  servicetoenterprise_form,
  train_form,
  jszgz_form,
  punish_form,
  reward_form,
  organiseinspect_form,
  jsrzqkcp_form,
  furtherstudyforeign_form,
  jbxx_rules,
  jyjl_rules,
  lxfs_rules,
  zcxx_rules,
  qtgrxx_rules,
  xljxw_rules,
  grll_rules,
  zzmmjdjqk_rules,
  js_rules,
  rzxx_rules,
  zyzgz_rules,
  xnzwb_rules,
  zyjszw_rules,
  grjsdjjzw_rules,
  shjz_rules,
  fwxy_rules,
  jsfzxx_rules,
  jypx_rules,
  jszgz_rules,
  cf_rules,
  jl_rules,
  zzkc_rules,
  jsrzqkpc_rules,
  xcflxx_rules,
  ygyshz_rules,
} from "@/const/crud/staff/teacher/info";
import { dictItems } from "@/const/staff/dictItems";
import {
  getDqztk,
  getJkzk,
  getHyzk,
  getHjlb,
  getHtlx,
  getXb,
  getSf,
  getZyjsrylb,
  getRylb,
  getPost,
} from "@/const/staff/getSelectOption";

import { get, add, edit, del } from "@/const/staff/crud";
import { result } from "@/const/staff/message";

import { infoOption } from "@/const/crud/staff/info/info";
import { educateOption } from "@/const/crud/staff/info/educate";
import { otherOption } from "@/const/crud/staff/info/other";

export default {
  name: "TableEngage",
  data() {
    return {
      // 用户id
      staff_id: undefined,

      isAdd: true,
      office_isAdd: true,
      examine_isAdd: true,
      jsfzxx_isAdd: true,
      punish_isAdd: true,
      reward_isAdd: true,
      salary_isAdd: true,
      bankno_isAdd: true,

      child_flag: undefined,
      // 标签页激活项
      activeName: "1",
      fileList: [],
      dictItems: dictItems,
      // 控制弹窗全屏
      dialogFull: false,

      // 控制 添加 对话框的显示与隐藏
      dialogVisible_add: false,
      // 控制 查看 对话框的显示与隐藏
      dialogVisible_view: false,
      // 控制 添加 学历及学位子集 对话框的显示与隐藏
      dialogVisible_xljxw: false,
      // 控制 添加 个人履历子集 对话框的显示与隐藏
      dialogVisible_grll: false,
      // 控制 添加 政治面貌及党籍情况子集 对话框的显示与隐藏
      dialogVisible_zzmmjdjqk: false,
      // 控制 添加 家属子集 对话框的显示与隐藏
      dialogVisible_family: false,
      // 控制 添加 职业资格证子集 对话框的显示与隐藏
      dialogVisible_certificate: false,
      // 控制 添加 校内职务表 对话框的显示与隐藏
      dialogVisible_leader: false,
      // 控制 添加 专业技术职务子集 对话框的显示与隐藏
      dialogVisible_professionduty: false,
      // 控制 添加 工人技术等级及职务子集 对话框的显示与隐藏
      dialogVisible_workerskillgrade: false,
      // 控制 添加 社会兼职子集 对话框的显示与隐藏
      dialogVisible_parttimejob: false,
      // 控制 添加 服务协议子集 对话框的显示与隐藏
      dialogVisible_servicetoenterprise: false,
      // 控制 添加 奖励子集 对话框的显示与隐藏
      dialogVisible_reward: false,
      // 控制 添加 组织考察（考核）子集 对话框的显示与隐藏
      dialogVisible_organiseinspect: false,
      // 控制 添加 教师任职情况测评子集 对话框的显示与隐藏
      dialogVisible_jsrzqkcp: false,
      // 控制 添加 因公/因私护照 对话框的显示与隐藏
      dialogVisible_furtherstudyforeign: false,
      // 控制 添加 处分（行政及党内）子集 对话框的显示与隐藏
      dialogVisible_punish: false,
      // 控制 添加 教育培训子集 对话框的显示与隐藏
      dialogVisible_train: false,
      // 控制 添加 教师资格证子集 对话框的显示与隐藏
      dialogVisible_jszgz: false,

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

      info_form: info_form,
      office_form: office_form,
      examine_form: examine_form,
      jsfzxx_form: jsfzxx_form,
      jcxx_form: jcxx_form,
      salary_form: salary_form,
      bankno_form: bankno_form,

      // 选择器配置对象
      hjlbOptions: undefined,
      jkzkOptions: undefined,
      hyzkOptions: undefined,
      dqztOptions: undefined,
      htlxOptions: undefined,
      pickerOptions: undefined,
      grjsdjOptions: undefined,
      zzlxOptions: undefined,
      rzfsOptions: undefined,
      przzsjOptions: undefined,
      treeDeptData: undefined,
      zzztOptions: undefined,
      zyjsrylbOptions: undefined,
      rylbOptions: undefined,
      postOptions: undefined,

      xbmDic: undefined,
      sfDic: undefined,

      jg: undefined,
      jgSelect: undefined,
      csd: undefined,
      csdSelect: undefined,
      hkszdm: undefined,
      hkszdmSelect: undefined,
      hkxxdz: undefined,
      hkxxdzSelect: undefined,
      jzxxdz: undefined,
      jzxxdzSelect: undefined,

      // 上传地址
      action: "",

      sfzFrontImgUrl: "",
      sfzBackImgUrl: "",

      info_obj: {},
      office_obj: {},
      examine_obj: {},
      jsfzxx_obj: {},
      punish_obj: {},
      reward_obj: {},
      salary_obj: {},
      bankno_obj: {},
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

      // 子表表单
      xljxw_form: xljxw_form,
      grll_form: grll_form,
      zzmmjdjqk_form: zzmmjdjqk_form,
      family_form: family_form,
      certificate_form: certificate_form,
      leader_form: leader_form,
      professionduty_form: professionduty_form,
      workerskillgrade_form: workerskillgrade_form,
      parttimejob_form: parttimejob_form,
      servicetoenterprise_form: servicetoenterprise_form,
      train_form: train_form,
      jszgz_form: jszgz_form,
      punish_form: punish_form,
      reward_form: reward_form,
      organiseinspect_form: organiseinspect_form,
      jsrzqkcp_form: jsrzqkcp_form,
      furtherstudyforeign_form: furtherstudyforeign_form,

      // 表单验证规则
      jbxx_rules: jbxx_rules,
      jyjl_rules: jyjl_rules,
      lxfs_rules: lxfs_rules,
      zcxx_rules: zcxx_rules,
      qtgrxx_rules: qtgrxx_rules,
      xljxw_rules: xljxw_rules,
      grll_rules: grll_rules,
      zzmmjdjqk_rules: zzmmjdjqk_rules,
      js_rules: js_rules,
      rzxx_rules: rzxx_rules,
      zyzgz_rules: zyzgz_rules,
      xnzwb_rules: xnzwb_rules,
      zyjszw_rules: zyjszw_rules,
      grjsdjjzw_rules: grjsdjjzw_rules,
      shjz_rules: shjz_rules,
      fwxy_rules: fwxy_rules,
      jsfzxx_rules: jsfzxx_rules,
      jypx_rules: jypx_rules,
      jszgz_rules: jszgz_rules,
      cf_rules: cf_rules,
      jl_rules: jl_rules,
      zzkc_rules: zzkc_rules,
      jsrzqkpc_rules: jsrzqkpc_rules,
      xcflxx_rules: xcflxx_rules,
      ygyshz_rules: ygyshz_rules,

      obj: {},
      infoOption: infoOption,
      educateOption: educateOption,
      otherOption: otherOption,
    };
  },
  methods: {
    // 添加基本信息
    submit_info(form, loading) {
      // console.log(this.obj);
      setTimeout(async () => {
        const { data: res } = await add("info", form);
        if (!result(this, res, "add")) return true;
        this.staff_id = res.data;
      }, 1000);
    },
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

    // 编辑行信息
    editRow(row) {
      this.dialogVisible_add = true;
      this.obj = row;
      console.log(row);
      this.isAdd = false;
      this.info_form = row;
      this.staff_id = row.id;
    },

    // 查看行信息
    viewRow(row) {
      this.dialogVisible_view = true;
      this.activeName = "1";
      this.info_obj = row;
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
    // 添加人员基本信息
    async addInfo() {
      const { data: res } = await add("info", info_form);
      if (!result(this, res, "add")) return true;
      this.isAdd = false;
      this.staff_id = res.data;
    },
    // 保存人员基本信息
    async saveInfo() {
      info_form.id = this.staff_id;
      const { data: res } = await edit("info", info_form);
      if (!result(this, res, "save")) return true;
    },
    // 添加其他信息
    async addOther(type, from) {
      if (this.staff_id === undefined)
        return this.$message.error("请先添加基本信息！");
      from.staffId = this.staff_id;
      const { data: res } = await add(type, from);
      if (!result(this, res, "add")) return true;
      this[`${type}_isAdd`] = false;
      this[`${type}_id`] = res.data;
    },
    // 保存其他信息
    async saveOther(type, from) {
      if (this.staff_id === undefined)
        return this.$message.error("请先添加基本信息！");
      from.id = this[`${type}_id`];
      const { data: res } = await edit(type, from);
      if (!result(this, res, "save")) return true;
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

    async loadZzzt() {
      const { data: res } = await getDqztk();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.zzztOptions = res.data;
    },
    async getJkzk() {
      const { data: res } = await getJkzk();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.jkzkOptions = res.data;
    },
    async getHyzk() {
      const { data: res } = await getHyzk();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.hyzkOptions = res.data;
    },
    async getHjlb() {
      const { data: res } = await getHjlb();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.hjlbOptions = res.data;
    },
    async getHtlx() {
      const { data: res } = await getHtlx();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.htlxOptions = res.data;
    },
    async getXb() {
      const { data: res } = await getXb();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.xbmDic = res.data;
    },
    async getSf() {
      const { data: res } = await getSf();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.sfDic = res.data;
    },
    async getZyjsrylb() {
      const { data: res } = await getZyjsrylb();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.zyjsrylbOptions = res.data;
    },
    async getRylb() {
      const { data: res } = await getRylb();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.rylbOptions = res.data;
    },
    async getPost() {
      const { data: res } = await getPost();
      if (res.code !== 0) return this.$message.error("获取数据失败!");
      this.postOptions = res.data;
    },
  },
  watch: {
    jg: function (val) {
      this.info_form.jg = this.jgSelect + val;
    },
    csd: function (val) {
      this.info_form.csd = this.csdSelect + val;
    },
    hkszdm: function (val) {
      this.info_form.hkszdm = this.hkszdmSelect + val;
    },
    hkxxdz: function (val) {
      this.info_form.hkxxdz = this.hkxxdzSelect + val;
    },
    jzxxdz: function (val) {
      this.info_form.jzxxdz = this.jzxxdzSelect + val;
    },
  },
  mounted() {
    this.loadZzzt();
    this.getJkzk();
    this.getHyzk();
    this.getHjlb();
    this.getHtlx();
    this.getXb();
    this.getSf();
    this.getZyjsrylb();
    this.getRylb();
    this.getPost();
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

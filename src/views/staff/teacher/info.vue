<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
        @on-load="loadList"
        @search-change="searchChange"
      >
        <template slot="orgIdSearch">
          <avue-input-tree
            v-model="search.orgId"
            :dic="treeDeptData"
            :props="defaultProps"
            placeholder="请选择所属部门"
          />
        </template>

        <template slot="dqztmSearch">
          <el-select v-model="search.dqztm" placeholder="请选择" clearable>
            <el-option
              v-for="item in zzztOptions"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>

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
            @click="viewRow(scope.row)"
            >查看</el-button
          >
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            @click="editRow(scope.row)"
            >编辑</el-button
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
      @open="clearForm('jbxx')"
      @close="getInfoList(page)"
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
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="人员基本情况" name="1">
          <table>
            <tr>
              <th colspan="4">
                <span class="title">基本信息</span>
                <span>
                  <el-button
                    type="primary"
                    v-show="isAdd"
                    @click="addInfo(jbxx_form)"
                    >添加</el-button
                  >
                  <el-button
                    type="primary"
                    v-show="!isAdd"
                    @click="edit(jbxx_form)"
                    >保存</el-button
                  >
                </span>
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <el-form
                  ref="jbxxFormRef"
                  :model="jbxx_form"
                  label-width="80px"
                  :rules="jbxx_rules"
                >
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="工号" prop="gh">
                        <el-input v-model="jbxx_form.gh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="姓名" prop="xm">
                        <el-input v-model="jbxx_form.xm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="英文姓名"
                        prop="ywxm"
                        label-width="80px"
                      >
                        <el-input v-model="jbxx_form.ywxm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="姓名拼音"
                        prop="xmpy"
                        label-width="80px"
                      >
                        <el-input v-model="jbxx_form.xmpy"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="出生日期" prop="csrq">
                        <el-date-picker
                          style="width: 100%"
                          v-model="jbxx_form.csrq"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="曾用名"
                        prop="cym"
                        label-width="80px"
                      >
                        <el-input v-model="jbxx_form.cym"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="性别" prop="xbm">
                        <el-radio v-model="jbxx_form.xbm" label="1"
                          >男</el-radio
                        >
                        <el-radio v-model="jbxx_form.xbm" label="2"
                          >女</el-radio
                        >
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="身份证号" prop="sfzjh">
                        <el-input v-model="jbxx_form.sfzjh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="身份证件类型"
                        prop="sfzjlxm"
                        label-width="110px"
                      >
                        <el-input v-model="jbxx_form.sfzjlxm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="国籍/地区"
                        prop="gjdqm"
                        label-width="90px"
                      >
                        <el-input v-model="jbxx_form.gjdqm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="出生地" prop="csd">
                        <el-input v-model="jbxx_form.csd"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="籍贯" prop="jg">
                        <el-input v-model="jbxx_form.jg"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="民族" prop="mzm">
                        <el-input v-model="jbxx_form.mzm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="政治面貌" prop="zzmmm">
                        <el-input v-model="jbxx_form.zzmmm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="健康状况" prop="jkzkm">
                        <el-select
                          v-model="jbxx_form.jkzkm"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in jkzkOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="婚姻状况" prop="hyzkm">
                        <el-select
                          v-model="jbxx_form.hyzkm"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in hyzkOptions"
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
                        label="身份证上传"
                        prop="sfzsc"
                        label-width="95px"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="sfzAction"
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
                  </el-row>
                </el-form>
              </td>
            </tr>
            <tr>
              <th colspan="4">
                <span class="title">教育经历</span>
                <span
                  ><el-button type="primary" @click="edit(jyjl_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <el-form
                  ref="jyjlFormRef"
                  :model="jyjl_form"
                  label-width="80px"
                  :rules="jyjl_rules"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="毕业院校" prop="byyx">
                        <el-input v-model="jyjl_form.byyx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="学位" prop="shxwm">
                        <el-input v-model="jyjl_form.shxwm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="专业" prop="sxzymc">
                        <el-input v-model="jyjl_form.sxzymc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="学历上传" prop="xlsc">
                        <el-upload
                          class="upload-demo"
                          :action="xlAction"
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
                  </el-row>
                </el-form>
              </td>
            </tr>
            <tr>
              <th colspan="4">
                <span class="title">联系方式</span>
                <span
                  ><el-button type="primary" @click="edit(lxfs_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <el-form
                  ref="lxfsFormRef"
                  :model="lxfs_form"
                  label-width="80px"
                  :rules="lxfs_rules"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="联系电话" prop="lxdh">
                        <el-input v-model="lxfs_form.lxdh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="电子邮箱" prop="dzyx">
                        <el-input v-model="lxfs_form.dzyx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="家庭联系人"
                        prop="jtlxr"
                        label-width="95px"
                      >
                        <el-input v-model="lxfs_form.jtlxr"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="家庭住址" prop="jtzz">
                        <el-input v-model="lxfs_form.jtzz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="户口详细地址"
                        prop="hkxxdz"
                        label-width="110px"
                      >
                        <el-input v-model="lxfs_form.hkxxdz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="户籍类别" prop="hjlb">
                        <el-select
                          style="width: 100%"
                          v-model="lxfs_form.hjlb"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in hjlbOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="港澳台侨外码"
                        prop="gatqwm"
                        label-width="110px"
                      >
                        <el-input v-model="lxfs_form.gatqwm"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </td>
            </tr>
            <tr>
              <th colspan="4">
                <span class="title">职称信息</span>
                <span
                  ><el-button type="primary" @click="edit(zcxx_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <el-form
                  ref="zcxxFormRef"
                  :model="zcxx_form"
                  label-width="80px"
                  :rules="zcxx_rules"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="教师职称" prop="jszc">
                        <el-input v-model="zcxx_form.jszc"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="所属教研组"
                        prop="ssjyz"
                        label-width="95px"
                      >
                        <el-input v-model="zcxx_form.ssjyz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否兼职教师"
                        prop="sfjzjs"
                        label-width="110px"
                      >
                        <el-input v-model="zcxx_form.sfjzjs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="是否双师型教师"
                        prop="sfssxjs"
                        label-width="120px"
                      >
                        <el-input v-model="zcxx_form.sfssxjs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="银行卡号" prop="yhkh">
                        <el-input v-model="zcxx_form.yhkh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="当前状态" prop="dqztm">
                        <el-select
                          v-model="zcxx_form.dqztm"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in zzztOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="合同类型" prop="htlx">
                        <el-select
                          v-model="zcxx_form.htlx"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in htlxOptions"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </td>
            </tr>
            <tr>
              <th colspan="4">
                <span class="title">其他个人信息</span>
                <span
                  ><el-button type="primary" @click="edit(qt_form)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-form
                  ref="qtFormRef"
                  :model="qt_form"
                  :rules="qtgrxx_rules"
                  label-width="80px"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-form-item
                        label="居住证有效期"
                        prop="jjzyxq"
                        label-width="110px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.jjzyxq"
                          type="daterange"
                          align="center"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="护照号/通行证号"
                        prop="hzhtxzh"
                        label-width="130px"
                      >
                        <el-input v-model="qt_form.hzhtxzh"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="发证单位" prop="fzdw">
                        <el-input v-model="qt_form.fzdw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        label="护照号/通行证号有效期"
                        prop="hzhtxzhyxq"
                        label-width="170px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.hzhtxzhyxq"
                          type="daterange"
                          align="center"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="入党日期" prop="rdrq">
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.rdrq"
                          type="date"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="备注" prop="bz">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          placeholder="请输入内容"
                          v-model="qt_form.bz"
                        >
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="因公/因私护照上传"
                        prop="ygyshzsc"
                        label-width="145px"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="hzAction"
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
                  </el-row>
                </el-form>
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
                  <el-table-column label="学制" prop="xz"> </el-table-column>
                  <el-table-column label="毕业时间" prop="bysj">
                  </el-table-column>
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
                    <el-form-item label="学制" prop="xz">
                      <el-input-number
                        v-model="xljxw_form.xz"
                        controls-position="right"
                        :min="1"
                        :max="5"
                        :precision="1"
                        :step="0.1"
                      ></el-input-number>
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
                  ref="llFormRef"
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
            <el-collapse-item title="政治面貌及党籍情况子集">
              <el-table
                :data="zzmmjdjqk_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="政治面貌" prop="zzmmm">
                </el-table-column>
                <el-table-column label="参加党派时间" prop="cjrq">
                </el-table-column>
                <el-table-column label="介绍人" prop="jsr"> </el-table-column>
                <el-table-column label="转正时间" prop="zzrq">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('zzmmjdjqk')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('zzmmjdjqk', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('zzmmjdjqk', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_zzmmjdjqk"
                width="30%"
                @open="clearForm('zz')"
              >
                <el-form
                  ref="zzFormRef"
                  :model="zzmmjdjqk_form"
                  :rules="zzmmjdjqk_rules"
                  label-width="110px"
                >
                  <el-form-item label="政治面貌" prop="zzmmm">
                    <el-input v-model="zzmmjdjqk_form.zzmmm"></el-input>
                  </el-form-item>
                  <el-form-item label="参加党派时间" prop="cjrq">
                    <el-date-picker
                      v-model="zzmmjdjqk_form.cjrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="介绍人" prop="jsr">
                    <el-input v-model="zzmmjdjqk_form.jsr"></el-input>
                  </el-form-item>
                  <el-form-item label="转正时间" prop="zzrq">
                    <el-date-picker
                      v-model="zzmmjdjqk_form.zzrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_zzmmjdjqk = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('zzmmjdjqk', zzmmjdjqk_form)"
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
                <el-table-column label="出生年月" prop="csny">
                </el-table-column>
                <el-table-column label="政治面貌" prop="zzmmm">
                </el-table-column>
                <el-table-column label="工作单位及职务" prop="dwmc">
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
                @open="clearForm('js')"
              >
                <el-form
                  ref="jsFormRef"
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
                  <el-form-item label="出生年月" prop="csny">
                    <el-date-picker
                      v-model="family_form.csny"
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
              <th colspan="4">
                <span class="title">任职信息</span>
                <span
                  ><el-button type="primary" @click="save(1)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-form
                  ref="rzxxFormRef"
                  :model="rzxx_form"
                  :rules="rzxx_rules"
                  label-width="80px"
                >
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="校内职务" prop="xnzw">
                        <el-input v-model="rzxx_form.xnzw"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="参加工作时间"
                        prop="cjgzsj"
                        label-width="110px"
                      >
                        <el-input v-model="rzxx_form.cjgzsj"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="进入本单位工作时间"
                        prop="jrbdwgzsj"
                        label-width="150px"
                      >
                        <el-input v-model="rzxx_form.jrbdwgzsj"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="任职年限" prop="rznx">
                        <el-input v-model="rzxx_form.rznx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="教研组" prop="jyz">
                        <el-input v-model="rzxx_form.jyz"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="工龄" prop="gl">
                        <el-input v-model="rzxx_form.gl"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="实际工作年限"
                        prop="sjgznx"
                        label-width="110px"
                      >
                        <el-input v-model="rzxx_form.sjgznx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="教龄" prop="jl">
                        <el-input v-model="rzxx_form.jl"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="岗位类别" prop="jrgwlbm">
                        <el-input v-model="rzxx_form.jrgwlbm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="用工形式（编制内录用）"
                        prop="ygxs"
                        label-width="180px"
                      >
                        <el-input v-model="rzxx_form.ygxs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="人员类别" prop="rylb">
                        <el-input v-model="rzxx_form.rylb"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                        label="人员录聘来源"
                        prop="rylply"
                        label-width="110px"
                      >
                        <el-input v-model="rzxx_form.rylply"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="实习期限" prop="sxqx">
                        <el-input v-model="rzxx_form.sxqx"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="部门（处室）"
                        prop="xxzgbmm"
                        label-width="110px"
                      >
                        <el-input v-model="rzxx_form.xxzgbmm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="减员时间" prop="jysj">
                        <el-input v-model="rzxx_form.jysj"></el-input>
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
                          :action="jyclAction"
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
                  </el-row>
                </el-form>
              </td>
            </tr>
          </table>
          <el-collapse accordion>
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
                @open="clearForm('zy')"
              >
                <el-form
                  ref="zyFormRef"
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
            <el-collapse-item title="校内职务表">
              <el-table
                :data="leader_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="部门" prop="xxzgbmm"> </el-table-column>
                <el-table-column label="职务名称" prop="zwmc">
                </el-table-column>
                <el-table-column label="任职方式" prop="rzfsm">
                </el-table-column>
                <el-table-column label="任免职文号" prop="rmzwh">
                </el-table-column>
                <el-table-column label="职务级别" prop="zwjbm">
                </el-table-column>
                <el-table-column label="任本职级时间" prop="rzrq">
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
                @open="clearForm('xnzw')"
              >
                <el-form
                  ref="xnzwFormRef"
                  :model="leader_form"
                  :rules="xnzwb_rules"
                  label-width="110px"
                >
                  <el-form-item label="部门" prop="xxzgbmm">
                    <el-input v-model="leader_form.xxzgbmm"></el-input>
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
                  <el-form-item label="任本职级时间" prop="rzrq">
                    <el-date-picker
                      v-model="leader_form.rzrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
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
                @open="clearForm('zyjszw')"
              >
                <el-form
                  ref="zyjszwFormRef"
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
                      :action="zyjszgzsAction"
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
                @open="clearForm('grjsdj')"
              >
                <el-form
                  ref="grjsdjFormRef"
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
                @open="clearForm('shjz')"
              >
                <el-form
                  ref="shjzFormRef"
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
                @open="clearForm('fwxy')"
              >
                <el-form
                  ref="fwxyFormRef"
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
        <el-tab-pane label="教师发展信息" name="3">
          <table>
            <tr>
              <th colspan="4">
                <span class="title">教师发展信息</span>
                <span
                  ><el-button type="primary" @click="save(1)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-form
                  ref="jsfzxxFormRef"
                  :model="jsfzxx_form"
                  :rules="jsfzxx_rules"
                  label-width="80px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="师训帐号" prop="sxzh">
                        <el-input v-model="jsfzxx_form.sxzh"></el-input>
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
                          :action="jszgzAction"
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
                  </el-row>
                </el-form>
              </td>
            </tr>
          </table>
          <el-collapse accordion>
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
                @open="clearForm('jypx')"
              >
                <el-form
                  ref="jypxFormRef"
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
            <el-collapse-item title="教师资格证子集">
              <el-table
                :data="jszgz_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="教师资格证种类" prop="jszgzzlm">
                </el-table-column>
                <el-table-column label="教师资格证号码" prop="jszgzhm">
                </el-table-column>
                <el-table-column label="任教学科" prop="xjxkm">
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
                  <el-form-item label="教师资格证种类" prop="jszgzzlm">
                    <el-input v-model="jszgz_form.jszgzzlm"></el-input>
                  </el-form-item>
                  <el-form-item label="教师资格证号码" prop="jszgzhm">
                    <el-input v-model="jszgz_form.jszgzhm"></el-input>
                  </el-form-item>
                  <el-form-item label="任教学科" prop="xjxkm">
                    <el-input v-model="jszgz_form.xjxkm"></el-input>
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
            <el-collapse-item title="处分（行政及党内）子集">
              <el-table
                :data="punish_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="处分类别" prop="cflb">
                </el-table-column>
                <el-table-column label="处分名称" prop="ccmc">
                </el-table-column>
                <el-table-column label="受处分时间" prop="ccrq">
                </el-table-column>
                <el-table-column label="处分原因" prop="ccyy">
                </el-table-column>
                <el-table-column label="撤销处分时间" prop="cccxrq">
                </el-table-column>
                <el-table-column label="监察机关直接给予的" prop="jcjgzjjy">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('punish')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('punish', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('punish', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_punish"
                width="30%"
                @open="clearForm('cf')"
              >
                <el-form
                  ref="cfFormRef"
                  :model="punish_form"
                  :rules="cf_rules"
                  label-width="150px"
                >
                  <el-form-item label="处分类别" prop="cflb">
                    <el-input v-model="punish_form.cflb"></el-input>
                  </el-form-item>
                  <el-form-item label="处分名称" prop="ccmc">
                    <el-input v-model="punish_form.ccmc"></el-input>
                  </el-form-item>
                  <el-form-item label="受处分时间" prop="ccrq">
                    <el-date-picker
                      v-model="punish_form.ccrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="处分原因" prop="ccyy">
                    <el-input v-model="punish_form.ccyy"></el-input>
                  </el-form-item>
                  <el-form-item label="撤销处分时间" prop="cccxrq">
                    <el-date-picker
                      v-model="punish_form.cccxrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="监察机关直接给予的" prop="jcjgzjjy">
                    <el-input v-model="punish_form.jcjgzjjy"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_punish = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('punish', punish_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="奖励子集">
              <el-table
                :data="reward_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="奖励类别" prop="hjlbm">
                </el-table-column>
                <el-table-column label="奖励名称" prop="jlmc">
                </el-table-column>
                <el-table-column label="奖励时间" prop="hjrq">
                </el-table-column>
                <el-table-column label="奖励单位" prop="bjdw">
                </el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('reward')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('reward', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('reward', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_reward"
                width="30%"
                @open="clearForm('jl')"
              >
                <el-form
                  ref="jlFormRef"
                  :model="reward_form"
                  :rules="jl_rules"
                  label-width="80px"
                >
                  <el-form-item label="奖励类别" prop="hjlbm">
                    <el-input v-model="reward_form.hjlbm"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励名称" prop="jlmc">
                    <el-input v-model="reward_form.jlmc"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励时间" prop="hjrq">
                    <el-date-picker
                      v-model="reward_form.hjrq"
                      type="date"
                      placeholder="选择日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="奖励单位" prop="bjdw">
                    <el-input v-model="reward_form.bjdw"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_reward = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('reward', reward_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="绩效考核信息" name="4">
          <el-collapse accordion>
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
                @open="clearForm('zzkc')"
              >
                <el-form
                  ref="zzkcFormRef"
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
            <el-collapse-item title="教师任职情况测评子集">
              <el-table
                :data="jsrzqkcp_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="年度" prop="nd"> </el-table-column>
                <el-table-column label="考核分数" prop="khfs"></el-table-column>
                <el-table-column label="考核等级" prop="khdj"></el-table-column>
                <el-table-column label="同级人员人数" prop="tjryrs">
                </el-table-column>
                <el-table-column label="同级人员中名次" prop="tjryzmc">
                </el-table-column>
                <el-table-column label="全校专业技术人员数" prop="qxzyjsrys">
                </el-table-column>
                <el-table-column label="全校专业技术人员名次" prop="qxzyjsrymc">
                </el-table-column>
                <el-table-column label="备注" prop="bz"></el-table-column>
                <el-table-column align="center">
                  <template slot="header">
                    <el-button type="text" @click="openChild('jsrzqkcp')"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @click="editChildRow('jsrzqkcp', scope.row)"
                      >修改</el-button
                    >
                    <el-button
                      type="text"
                      @click="delChildRow('jsrzqkcp', scope.row)"
                      >删除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jsrzqkcp"
                width="30%"
                @open="clearForm('jsrzqk')"
              >
                <el-form
                  ref="jsrzqkFormRef"
                  :model="jsrzqkcp_form"
                  :rules="jsrzqkpc_rules"
                  label-width="170px"
                >
                  <el-form-item label="年度" prop="nd">
                    <el-input-number
                      v-model="jsrzqkcp_form.nd"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="考核分数" prop="khfs">
                    <el-input-number
                      v-model="jsrzqkcp_form.khfs"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="考核等级" prop="khdj">
                    <el-input v-model="jsrzqkcp_form.khdj"></el-input>
                  </el-form-item>
                  <el-form-item label="同级人员人数" prop="tjryrs">
                    <el-input-number
                      v-model="jsrzqkcp_form.tjryrs"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="同级人员中名次" prop="tjryzmc">
                    <el-input-number
                      v-model="jsrzqkcp_form.tjryzmc"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员数" prop="qxzyjsrys">
                    <el-input-number
                      v-model="jsrzqkcp_form.qxzyjsrys"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员名次" prop="qxzyjsrymc">
                    <el-input-number
                      v-model="jsrzqkcp_form.qxzyjsrymc"
                      controls-position="right"
                      :min="1"
                      :max="10"
                    >
                    </el-input-number>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="jsrzqkcp_form.bz"
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_jsrzqkcp = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="submitChild('jsrzqkcp', jsrzqkcp_form)"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息" name="5">
          <table>
            <tr>
              <th colspan="4">
                <span class="title">薪酬福利信息</span>
                <span
                  ><el-button type="primary" @click="save(1)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-form
                  ref="xcflxxFormRef"
                  :model="xcflxx_form"
                  :rules="xcflxx_rules"
                  label-width="80px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="套用工资标示"
                        prop="tygzbs"
                        label-width="110px"
                      >
                        <el-input v-model="xcflxx_form.tygzbs"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="岗位绩点"
                        prop="gwjd"
                        label-width="100px"
                      >
                        <el-input v-model="xcflxx_form.gwjd"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="薪级等级"
                        prop="xj"
                        label-width="100px"
                      >
                        <el-input v-model="xcflxx_form.xj"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="岗位等级"
                        prop="gwdjm"
                        label-width="100px"
                      >
                        <el-input v-model="xcflxx_form.gwdjm"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item
                        label="薪级等级附件"
                        prop="xjdjfj"
                        label-width="110px"
                      >
                        <el-upload
                          class="upload-demo"
                          :action="xjdjfjAction"
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
                  </el-row>
                </el-form>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="6">
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
                @open="clearForm('hz')"
              >
                <el-form
                  ref="hzFormRef"
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
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="dialogVisible_view" width="60%">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="人员基本情况" name="1">
          <el-row>
            <el-descriptions title="基本信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">工号</template>
                {{ view_obj.gh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">姓名</template>
                {{ view_obj.xm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">曾用名</template>
                {{ view_obj.cym }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">性别</template>
                <span v-if="view_obj.xbm === '1'">男</span>
                <span v-else-if="view_obj.xbm === '2'">女</span>
                <span v-else>未知</span>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">出生日期</template>
                {{ view_obj.csrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">出生地</template>
                {{ view_obj.csd }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证号</template>
                {{ view_obj.sfzjh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">籍贯</template>
                {{ view_obj.jg }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">民族</template>
                {{ view_obj.mzm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">政治面貌</template>
                {{ view_obj.zzmmm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">健康状况</template>
                {{ view_obj.jkzkm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">婚姻状况</template>
                {{ view_obj.hyzkm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">身份证件照</template>
                待定
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-descriptions title="教育经历" :column="3" border>
              <el-descriptions-item>
                <template slot="label">毕业院校</template>
                {{ view_obj.byyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">学位</template>
                {{ view_obj.shxwm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">专业</template>
                {{ view_obj.sxzymc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">学历上传附件</template>
                待定
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-descriptions title="联系方式" :column="3" border>
              <el-descriptions-item>
                <template slot="label">联系电话</template>
                {{ view_obj.lxdh }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">电子邮箱</template>
                {{ view_obj.dzyx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">家庭联系人</template>
                {{ view_obj.jtlxr }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">家庭住址</template>
                {{ view_obj.jtzz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">户籍类别</template>
                {{ view_obj.hjlb }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">户口详细地址</template>
                {{ view_obj.hkxxdz }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-descriptions title="职称信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">教师职称</template>
                {{ view_obj.jszc }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">所属教研组</template>
                {{ view_obj.ssjyz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">当前状态</template>
                {{ view_obj.dqztm }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">合同类型</template>
                {{ view_obj.htlx }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">银行卡号</template>
                {{ view_obj.yhkh }}
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-descriptions title="其他个人信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">居住证起始时间</template>
                {{ view_obj.jjzqssj }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">是否落户</template>
                {{ view_obj.sflh }}
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
                {{ view_obj.rdrq }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">备注</template>
                {{ view_obj.bz }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">因公/因私护照上传附件</template>
                没有
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
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
                    <el-table-column label="学制" prop="xz"> </el-table-column>
                    <el-table-column label="毕业时间" prop="bysj">
                    </el-table-column>
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
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="政治面貌及党籍情况子集">
                <el-table
                  :data="zzmmjdjqk_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="政治面貌" prop="zzmmm">
                  </el-table-column>
                  <el-table-column label="参加党派时间" prop="cjrq">
                  </el-table-column>
                  <el-table-column label="介绍人" prop="jsr"> </el-table-column>
                  <el-table-column label="转正时间" prop="zzrq">
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
                  <el-table-column label="出生年月" prop="csny">
                  </el-table-column>
                  <el-table-column label="政治面貌" prop="zzmmm">
                  </el-table-column>
                  <el-table-column label="工作单位及职务" prop="dwmc">
                  </el-table-column>
                  <el-table-column label="联系方式" prop="lxfs">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="2">
          <el-row>
            <el-descriptions title="任职信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">校内职务</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">参加工作时间</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">进入本单位工作时间</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">任职年限</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教研组</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">工龄</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">实际工作年限</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教龄</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位类别</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">用工形式（编制内录用）</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">人员类别</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">人员录聘来源</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">实习期限</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">部门（处室）</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">减员时间</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">减员材料上传附件</template>
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-collapse accordion>
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
              <el-collapse-item title="校内职务表">
                <el-table
                  :data="leader_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="部门" prop="xxzgbmm">
                  </el-table-column>
                  <el-table-column label="职务名称" prop="zwmc">
                  </el-table-column>
                  <el-table-column label="任职方式" prop="rzfsm">
                  </el-table-column>
                  <el-table-column label="任免职文号" prop="rmzwh">
                  </el-table-column>
                  <el-table-column label="职务级别" prop="zwjbm">
                  </el-table-column>
                  <el-table-column label="任本职级时间" prop="rzrq">
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
        <el-tab-pane label="教师发展信息" name="3">
          <el-row>
            <el-descriptions title="教师发展信息" :column="1" border>
              <el-descriptions-item>
                <template slot="label">师训帐号</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">教师资格证上传附件</template>
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
          <el-row>
            <el-collapse accordion>
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
              <el-collapse-item title="教师资格证子集">
                <el-table
                  :data="jszgz_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="资格种类" prop="jszgzzlm">
                  </el-table-column>
                  <el-table-column label="资格证号码" prop="jszgzhm">
                  </el-table-column>
                  <el-table-column label="任教学科" prop="xjxkm">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="处分（行政及党内）子集">
                <el-table
                  :data="punish_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="处分类别" prop="cflb">
                  </el-table-column>
                  <el-table-column label="处分名称" prop="ccmc">
                  </el-table-column>
                  <el-table-column label="受处分时间" prop="ccrq">
                  </el-table-column>
                  <el-table-column label="处分原因" prop="ccyy">
                  </el-table-column>
                  <el-table-column label="撤销处分时间" prop="cccxrq">
                  </el-table-column>
                  <el-table-column label="监察机关直接给予的" prop="jcjgzjjy">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
              <el-collapse-item title="奖励子集">
                <el-table
                  :data="reward_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="奖励类别" prop="hjlbm">
                  </el-table-column>
                  <el-table-column label="奖励名称" prop="jlmc">
                  </el-table-column>
                  <el-table-column label="奖励时间" prop="hjrq">
                  </el-table-column>
                  <el-table-column label="奖励单位" prop="bjdw">
                  </el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="绩效考核信息" name="4">
          <el-row>
            <el-collapse accordion>
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
              <el-collapse-item title="教师任职情况测评子集">
                <el-table
                  :data="jsrzqkcp_tableData"
                  style="width: 100%"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                >
                  <el-table-column label="年度" prop="nd"> </el-table-column>
                  <el-table-column
                    label="考核分数"
                    prop="khfs"
                  ></el-table-column>
                  <el-table-column
                    label="考核等级"
                    prop="khdj"
                  ></el-table-column>
                  <el-table-column label="同级人员人数" prop="tjryrs">
                  </el-table-column>
                  <el-table-column label="同级人员中名次" prop="tjryzmc">
                  </el-table-column>
                  <el-table-column label="全校专业技术人员数" prop="qxzyjsrys">
                  </el-table-column>
                  <el-table-column
                    label="全校专业技术人员名次"
                    prop="qxzyjsrymc"
                  >
                  </el-table-column>
                  <el-table-column label="备注" prop="bz"></el-table-column>
                </el-table>
              </el-collapse-item>
            </el-collapse>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="薪酬福利信息" name="5">
          <el-row>
            <el-descriptions title="任职信息" :column="3" border>
              <el-descriptions-item>
                <template slot="label">套用工资标示</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位绩点</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">薪级等级</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">岗位等级</template>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">薪级等级附件</template>
              </el-descriptions-item>
            </el-descriptions>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="其他信息" name="6">
          <el-row>
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
  jbxx_form,
  jyjl_form,
  lxfs_form,
  zcxx_form,
  qt_form,
  rzxx_form,
  jsfzxx_form,
  xcflxx_form,
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
import {
  getInfo,
  addInfo,
  editInfo,
  getChild,
  submitChild,
  editChild,
  delChild,
} from "@/api/staff/teacher/info";
import { dictItems } from "@/const/staff/dictItems";
import {
  getDept,
  getDqztk,
  getJkzk,
  getHyzk,
  getHjlb,
  getHtlx,
} from "@/const/staff/getSelectOption";

export default {
  name: "TableEngage",
  data() {
    return {
      // 用户id
      user_id: undefined,
      isAdd: true,
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

      page: {
        total: 0,
        current: 1,
        size: 10,
      },
      // 数据源
      data: undefined,
      option: option,
      defaultProps: {
        label: "name",
        value: "id",
      },
      // 搜索的表单对象
      search: {},

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

      // 上传地址
      sfzAction: "",
      xlAction: "",
      hzAction: "",
      jyclAction: "",
      jszgzAction: "",
      xjdjfjAction: "",
      zyjszgzsAction: "",

      // 基本信息表单
      jbxx_form: jbxx_form,
      // 教育经历表单
      jyjl_form: jyjl_form,
      // 联系方式表单
      lxfs_form: lxfs_form,
      // 职称信息表单
      zcxx_form: zcxx_form,
      // 其他个人信息表单
      qt_form: qt_form,
      // 任职信息表单
      rzxx_form: rzxx_form,
      // 教师发展信息表单
      jsfzxx_form: jsfzxx_form,
      // 薪酬福利信息表单
      xcflxx_form: xcflxx_form,

      // 查看行对象
      view_obj: {},

      // 子表数据源
      xljxw_tableData: [],
      grll_tableData: [],
      zzmmjdjqk_tableData: [],
      family_tableData: [],
      certificate_tableData: [],
      leader_tableData: [],
      professionduty_tableData: [],
      workerskillgrade_tableData: [],
      parttimejob_tableData: [],
      servicetoenterprise_tableData: [],
      train_tableData: [],
      jszgz_tableData: [],
      punish_tableData: [],
      reward_tableData: [],
      organiseinspect_tableData: [],
      jsrzqkcp_tableData: [],
      furtherstudyforeign_tableData: [],

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
    };
  },
  methods: {
    // 打开子表对话框
    openChild(type) {
      this[`dialogVisible_${type}`] = true;
      this.child_flag = "add";
    },

    // 清空表单
    clearForm(type) {
      // this.$nextTick(() => {
      //   this.$refs[`${type}FormRef`].resetFields();
      // });
      if (type === "jbxx") {
        this.isAdd = true;
        this.user_id = undefined;
      }
    },

    // 获取表格数据
    async getInfoList(page, params) {
      const { data: res } = await getInfo(
        Object.assign(
          {
            current: page.currentPage,
            size: page.pageSize,
          },
          params,
          this.search
        )
      );
      if (res.code !== 0) return this.$message.error("获取表格数据失败！");
      this.data = res.data.records;
      this.page.total = res.data.total;
    },

    // 加载列表
    loadList(page) {
      this.getInfoList({
        current: page.currentPage,
        size: page.pageSize,
      });
    },

    searchChange(form, done) {
      this.search = form;
      this.page.currentPage = 1;
      this.getInfoList(this.page, form);
      done();
    },

    // 添加按钮
    add() {
      this.dialogVisible_add = true;
      this.activeName = "1";
    },
    // 查看行信息
    viewRow(row) {
      this.dialogVisible_view = true;
      this.activeName = "1";
      this.view_obj = row;
    },
    // 编辑行行信息
    editRow(row) {
      this.dialogVisible_add = true;
    },

    async loadDept() {
      const { data: res } = await getDept();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.treeDeptData = res.data;
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

    // 添加
    async addInfo(obj) {
      const { data: res } = await addInfo(obj);
      if (res.code !== 0) return this.$message.error("保存失败！" + res.msg);
      this.$message.success("添加成功！");
      this.isAdd = false;
      this.user_id = res.data;
    },
    // 修改
    async edit(obj) {
      if (this.user_id === undefined)
        return this.$message.error("请先添加基本信息！");
      obj.id = this.user_id;
      const { data: res } = await editInfo(obj);
      if (res.code !== 0) return this.$message.error("保存失败！" + res.msg);
      this.$message.success("保存成功！");
    },
    // 子表提交
    async submitChild(type, obj) {
      if (this.user_id === undefined)
        return this.$message.error("请先添加基本信息！");
      obj.staffId = this.user_id;
      // 添加
      if (this.child_flag === "add") {
        const { data: res } = await submitChild(type, obj);
        if (res.code !== 0) return this.$message.error("添加失败！" + res.msg);
        this.$message.success("添加成功！");
      }
      // 修改
      if (this.child_flag === "edit") {
        const { data: res } = await editChild(type, obj);
        if (res.code !== 0) return this.$message.error("修改失败！" + res.msg);
        this.$message.success("修改成功！");
      }
      const { data: res } = await getChild(type);
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
      const { data: res } = await delChild(type, row.id);
      if (res.code !== 0) return this.$message.error("删除失败！" + res.msg);
      this.$message.success("删除成功！");
      this[`${type}_tableData`].some((item, index) => {
        if (item.staffId === row.staffId) {
          this[`${type}_tableData`].splice(index, 1);
          return true;
        }
      });
    },
  },
  mounted() {
    this.loadDept();
    this.loadZzzt();
    this.getJkzk();
    this.getHyzk();
    this.getHjlb();
    this.getHtlx();
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 20px;
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

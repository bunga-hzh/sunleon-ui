<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
        :before-open="beforeOpen"
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
      </avue-crud>
    </basic-container>
    <!-- 添加对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible_add"
      width="60%"
      :fullscreen="dialogFull"
      @open="openDialog"
      @close="clearForm('primary')"
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
                <span
                  ><el-button type="primary" @click="save(1)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td colspan="4">
                <el-form
                  ref="jbxxFormRef"
                  :model="jbxx_form"
                  label-width="80px"
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
                      <el-form-item label="出生日期" prop="csrq">
                        <el-date-picker
                          style="width: 100%"
                          v-model="jbxx_form.csrq"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="出生地" prop="csd">
                        <el-input v-model="jbxx_form.csd"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="身份证号" prop="sfzjh">
                        <el-input v-model="jbxx_form.sfzjh"></el-input>
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
                            :label="item.status"
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
                            v-for="item in jkzkOptions"
                            :key="item.id"
                            :label="item.status"
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
                        label-width="90px"
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
                  ><el-button type="primary" @click="save(1)"
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
                  ><el-button type="primary" @click="save(3)"
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
                      <el-form-item label="户籍类别" prop="hjlb">
                        <el-select
                          style="width: 100%"
                          v-model="lxfs_form.hjlb"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in hjlbOptions"
                            :key="item.id"
                            :label="item.type"
                            :value="item.id"
                          >
                          </el-option>
                        </el-select>
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
                  </el-row>
                </el-form>
              </td>
            </tr>
            <tr>
              <th colspan="4">
                <span class="title">职称信息</span>
                <span
                  ><el-button type="primary" @click="save(4)"
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
                            v-for="item in dqztOptions"
                            :key="item.id"
                            :label="item.status"
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
                            :label="item.type"
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
                  ><el-button type="primary" @click="save(4)"
                    >保存</el-button
                  ></span
                >
              </th>
            </tr>
            <tr>
              <td>
                <el-form ref="qtFormRef" :model="qt_form" label-width="80px">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="居住证起始时间"
                        prop="jjzqssj"
                        label-width="115px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.jjzqssj"
                          type="date"
                          placeholder="选择日期"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否落户" prop="sflu">
                        <el-radio v-model="qt_form.sflu" label="1">是</el-radio>
                        <el-radio v-model="qt_form.sflu" label="2">否</el-radio>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item
                        label="居住证有效期"
                        prop="jjzyxq"
                        label-width="100px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.jjzyxq"
                          type="daterange"
                          align="right"
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
                        label-width="120px"
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
                        label-width="160px"
                      >
                        <el-date-picker
                          style="width: 100%"
                          v-model="qt_form.hzhtxzhyxq"
                          type="daterange"
                          align="right"
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
                        label-width="130px"
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
                  :data="xl_tableData"
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
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text" @click="add_xl"
                        ><i class="el-icon-plus"></i>添加</el-button
                      >
                    </template>
                    <template>
                      <el-button size="mini" type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog
                  append-to-body
                  title="提示"
                  :visible.sync="dialogVisible_xl"
                  width="30%"
                  @close="clearForm('xl')"
                >
                  <el-form ref="xlFormRef" :model="xl_form" label-width="100px">
                    <el-form-item label="学历" prop="xlm">
                      <el-input v-model="xl_form.xlm"></el-input>
                    </el-form-item>
                    <el-form-item label="入学时间" prop="rxsj">
                      <el-input v-model="xl_form.rxsj"></el-input>
                    </el-form-item>
                    <el-form-item label="学习形式" prop="xxxsm">
                      <el-input v-model="xl_form.xxxsm"></el-input>
                    </el-form-item>
                    <el-form-item label="学制" prop="xz">
                      <el-input v-model="xl_form.xz"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间" prop="bysj">
                      <el-input v-model="xl_form.bysj"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible_xl = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="dialogVisible_xl = false"
                      >确 定</el-button
                    >
                  </span>
                </el-dialog>
              </div>
            </el-collapse-item>
            <el-collapse-item title="个人履历子集（校外）">
              <el-table
                :data="ll_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_ll"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_ll"
                width="30%"
                @close="clearForm('grll')"
              >
                <el-form ref="llFormRef" :model="ll_form" label-width="100px">
                  <el-form-item label="超始时间" prop="qssj">
                    <el-input v-model="ll_form.qssj"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="zzsj">
                    <el-input v-model="ll_form.zzsj"></el-input>
                  </el-form-item>
                  <el-form-item label="所在单位" prop="szdw">
                    <el-input v-model="ll_form.szdw"></el-input>
                  </el-form-item>
                  <el-form-item label="职务" prop="zw">
                    <el-input v-model="ll_form.zw"></el-input>
                  </el-form-item>
                  <el-form-item label="单位所在省份" prop="dwszsf">
                    <el-input v-model="ll_form.dwszsf"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_ll = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_ll = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="政治面貌及党籍情况子集">
              <el-table
                :data="zz_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_zz"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_zz"
                width="30%"
                @close="clearForm('zz')"
              >
                <el-form ref="zzFormRef" :model="zz_form" label-width="100px">
                  <el-form-item label="政治面貌" prop="zzmmm">
                    <el-input v-model="zz_form.zzmmm"></el-input>
                  </el-form-item>
                  <el-form-item label="参加党派时间" prop="cjrq">
                    <el-input v-model="zz_form.cjrq"></el-input>
                  </el-form-item>
                  <el-form-item label="介绍人" prop="jsr">
                    <el-input v-model="zz_form.jsr"></el-input>
                  </el-form-item>
                  <el-form-item label="转正时间" prop="zzrq">
                    <el-input v-model="zz_form.zzrq"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_zz = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_zz = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="家属子集">
              <el-table
                :data="js_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_js"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_js"
                width="30%"
                @close="clearForm('js')"
              >
                <el-form ref="jsFormRef" :model="js_form" label-width="100px">
                  <el-form-item label="称谓" prop="cw">
                    <el-input v-model="js_form.cw"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="xm">
                    <el-input v-model="js_form.xm"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月" prop="csny">
                    <el-input v-model="js_form.csny"></el-input>
                  </el-form-item>
                  <el-form-item label="政治面貌" prop="zzmmm">
                    <el-input v-model="js_form.zzmmm"></el-input>
                  </el-form-item>
                  <el-form-item label="单位名称" prop="dwmc">
                    <el-input v-model="js_form.dwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式" prop="lxfs">
                    <el-input v-model="js_form.lxfs"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_js = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_js = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="任职信息" name="2">
          <el-collapse accordion>
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
                          label-width="100px"
                        >
                          <el-input v-model="rzxx_form.cjgzsj"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item
                          label="进入本单位工作时间"
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
                          prop="xnzw"
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
                          label-width="100px"
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
                          label-width="100px"
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
            <el-collapse-item title="职业资格证子集">
              <el-table
                :data="zy_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_zy"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_zy"
                width="30%"
                @close="clearForm('zy')"
              >
                <el-form ref="zyFormRef" :model="zy_form" label-width="100px">
                  <el-form-item label="职业工种" prop="zygz">
                    <el-input v-model="zy_form.zygz"></el-input>
                  </el-form-item>
                  <el-form-item label="职业等级" prop="zydj">
                    <el-input v-model="zy_form.zydj"></el-input>
                  </el-form-item>
                  <el-form-item label="颁证机构" prop="bzjg">
                    <el-input v-model="zy_form.bzjg"></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号" prop="zyzgzsbh">
                    <el-input v-model="zy_form.zyzgzsbh"></el-input>
                  </el-form-item>
                  <el-form-item label="取得时间" prop="zsbfrq">
                    <el-input v-model="zy_form.zsbfrq"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_zy = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_zy = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="校内职务表">
              <el-table
                :data="xnzw_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_xnzw"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_xnzw"
                width="30%"
                @close="clearForm('xnzw')"
              >
                <el-form
                  ref="xnzwFormRef"
                  :model="xnzw_form"
                  label-width="100px"
                >
                  <el-form-item label="部门" prop="xxzgbmm">
                    <el-input v-model="xnzw_form.xxzgbmm"></el-input>
                  </el-form-item>
                  <el-form-item label="职务名称" prop="zwmc">
                    <el-input v-model="xnzw_form.zwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="任职方式" prop="rzfsm">
                    <el-input v-model="xnzw_form.rzfsm"></el-input>
                  </el-form-item>
                  <el-form-item label="任免职文号" prop="rmzwh">
                    <el-input v-model="xnzw_form.rmzwh"></el-input>
                  </el-form-item>
                  <el-form-item label="职务级别" prop="zwjbm">
                    <el-input v-model="xnzw_form.zwjbm"></el-input>
                  </el-form-item>
                  <el-form-item label="任本职级时间" prop="rzrq">
                    <el-input v-model="xnzw_form.rzrq"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_xnzw = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogVisible_xnzw = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="专业技术职务子集">
              <el-table
                :data="zyjszw_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_zyjszw"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_zyjszw"
                width="30%"
                @close="clearForm('zyjszw')"
              >
                <el-form
                  ref="zyjszwFormRef"
                  :model="zyjszw_form"
                  label-width="165px"
                >
                  <el-form-item label="专业技术资格名称" prop="zyjszgmc">
                    <el-input v-model="zyjszw_form.zyjszgmc"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格途径" prop="qdzgtjm">
                    <el-input v-model="zyjszw_form.qdzgtjm"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格时间" prop="hdzgsj">
                    <el-input v-model="zyjszw_form.hdzgsj"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任专业技术职务名称" prop="rzzgmcm">
                    <el-input v-model="zyjszw_form.rzzgmcm"></el-input>
                  </el-form-item>
                  <el-form-item label="首次聘任时间" prop="scprsj">
                    <el-input v-model="zyjszw_form.scprsj"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任起始时间" prop="prqsrq">
                    <el-input v-model="zyjszw_form.prqsrq"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任终止时间" prop="przzrq">
                    <el-input v-model="zyjszw_form.przzrq"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任情况" prop="prqkm">
                    <el-input v-model="zyjszw_form.prqkm"></el-input>
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
                  <el-button @click="dialogVisible_zyjszw = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="dialogVisible_zyjszw = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="工人技术等级及职务子集">
              <el-table
                :data="grjsdj_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_grjsdj"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_grjsdj"
                width="30%"
                @close="clearForm('grjsdj')"
              >
                <el-form
                  ref="grjsdjFormRef"
                  :model="grjsdj_form"
                  label-width="155px"
                >
                  <el-form-item label="工人技术等级名称" prop="grjsdjmc">
                    <el-input v-model="grjsdj_form.grjsdjmc"></el-input>
                  </el-form-item>
                  <el-form-item label="工人技术职务名称" prop="grjszwmc">
                    <el-input v-model="grjsdj_form.grjszwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="取得技术职务时间" prop="qdjszwsj">
                    <el-input v-model="grjsdj_form.qdjszwsj"></el-input>
                  </el-form-item>
                  <el-form-item label="批准技术职务单位名称" prop="pzjszwdwmc">
                    <el-input v-model="grjsdj_form.pzjszwdwmc"></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号" prop="zsbh">
                    <el-input v-model="grjsdj_form.zsbh"></el-input>
                  </el-form-item>
                  <el-form-item label="职业工种" prop="grgzm">
                    <el-input v-model="grjsdj_form.grgzm"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证件" prop="szdczj">
                    <el-input v-model="grjsdj_form.szdczj"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_grjsdj = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="dialogVisible_grjsdj = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="社会兼职子集">
              <el-table
                :data="shjz_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_shjz"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_shjz"
                width="30%"
                @close="clearForm('shjz')"
              >
                <el-form
                  ref="shjzFormRef"
                  :model="shjz_form"
                  label-width="100px"
                >
                  <el-form-item label="起始时间" prop="shjzqsrq">
                    <el-input v-model="shjz_form.shjzqsrq"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="shjzzzrq">
                    <el-input v-model="shjz_form.shjzzzrq"></el-input>
                  </el-form-item>
                  <el-form-item label="任职组织" prop="rzzz">
                    <el-input v-model="shjz_form.rzzz"></el-input>
                  </el-form-item>
                  <el-form-item label="组织类型" prop="zzlx">
                    <el-input v-model="shjz_form.zzlx"></el-input>
                  </el-form-item>
                  <el-form-item label="兼职职务" prop="jzzw">
                    <el-input v-model="shjz_form.jzzw"></el-input>
                  </el-form-item>
                  <el-form-item label="是否取酬" prop="sfqc">
                    <el-input v-model="shjz_form.sfqc"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_shjz = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogVisible_shjz = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="服务协议子集">
              <el-table
                :data="fwxy_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_fwxy"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_fwxy"
                width="30%"
                @close="clearForm('fwxy')"
              >
                <el-form
                  ref="fwxyFormRef"
                  :model="fwxy_form"
                  label-width="100px"
                >
                  <el-form-item label="起始时间" prop="qssj">
                    <el-input v-model="fwxy_form.qssj"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间" prop="zzsj">
                    <el-input v-model="fwxy_form.zzsj"></el-input>
                  </el-form-item>
                  <el-form-item label="事由" prop="sy">
                    <el-input v-model="fwxy_form.sy"></el-input>
                  </el-form-item>
                  <el-form-item label="总金额" prop="zje">
                    <el-input v-model="fwxy_form.zje"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input v-model="fwxy_form.bz"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_fwxy = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogVisible_fwxy = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="教师发展信息" name="3">
          <el-collapse accordion>
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
                          label-width="110px"
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
            <el-collapse-item title="教育培训子集">
              <el-table
                :data="jypx_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_jypx"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jypx"
                width="30%"
                @close="clearForm('jypx')"
              >
                <el-form
                  ref="jypxFormRef"
                  :model="jypx_form"
                  label-width="130px"
                >
                  <el-form-item label="学习起始时间" prop="xxqssj">
                    <el-input v-model="jypx_form.xxqssj"></el-input>
                  </el-form-item>
                  <el-form-item label="学习终止时间" prop="xxzzsj">
                    <el-input v-model="jypx_form.xxzzsj"></el-input>
                  </el-form-item>
                  <el-form-item label="培训班名称" prop="pxbmc">
                    <el-input v-model="jypx_form.pxbmc"></el-input>
                  </el-form-item>
                  <el-form-item label="培训学时" prop="pxxs">
                    <el-input v-model="jypx_form.pxxs"></el-input>
                  </el-form-item>
                  <el-form-item label="培训类别" prop="pxlb">
                    <el-input v-model="jypx_form.pxlb"></el-input>
                  </el-form-item>
                  <el-form-item label="主办单位" prop="zbdw">
                    <el-input v-model="jypx_form.zbdw"></el-input>
                  </el-form-item>
                  <el-form-item label="参加出国出境" prop="cjcgcj">
                    <el-input v-model="jypx_form.cjcgcj"></el-input>
                  </el-form-item>
                  <el-form-item label="是否学历学位晋升" prop="sfxlxwjs">
                    <el-input v-model="jypx_form.sfxlxwjs"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_jypx = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogVisible_jypx = false"
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
                <el-table-column label="资格种类" prop="jszgzzlm">
                </el-table-column>
                <el-table-column label="资格证号码" prop="jszgzhm">
                </el-table-column>
                <el-table-column label="任教学科" prop="xjxkm">
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_jszgz"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jszgz"
                width="30%"
                @close="clearForm('jszgz')"
              >
                <el-form
                  ref="jszgzFormRef"
                  :model="jszgz_form"
                  label-width="90px"
                >
                  <el-form-item label="资格种类" prop="jszgzzlm">
                    <el-input v-model="jszgz_form.jszgzzlm"></el-input>
                  </el-form-item>
                  <el-form-item label="资格证号码" prop="jszgzhm">
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
                  <el-button type="primary" @click="dialogVisible_jszgz = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="处分（行政及党内）子集">
              <el-table
                :data="cf_tableData"
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
                <el-table-column label="监察机关直接给予的" prop="jcjgzjjyd">
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_cf"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_cf"
                width="30%"
                @close="clearForm('cf')"
              >
                <el-form ref="cfFormRef" :model="cf_form" label-width="140px">
                  <el-form-item label="处分类别" prop="cflb">
                    <el-input v-model="cf_form.cflb"></el-input>
                  </el-form-item>
                  <el-form-item label="处分名称" prop="ccmc">
                    <el-input v-model="cf_form.ccmc"></el-input>
                  </el-form-item>
                  <el-form-item label="受处分时间" prop="ccrq">
                    <el-input v-model="cf_form.ccrq"></el-input>
                  </el-form-item>
                  <el-form-item label="处分原因" prop="ccyy">
                    <el-input v-model="cf_form.ccyy"></el-input>
                  </el-form-item>
                  <el-form-item label="撤销处分时间" prop="cccxrq">
                    <el-input v-model="cf_form.cccxrq"></el-input>
                  </el-form-item>
                  <el-form-item label="监察机关直接给予的" prop="jcjgzjjyd">
                    <el-input v-model="cf_form.jcjgzjjyd"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_cf = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_cf = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="奖励子集">
              <el-table
                :data="jl_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_jl"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jl"
                width="30%"
                @close="clearForm('jl')"
              >
                <el-form ref="jlFormRef" :model="jl_form" label-width="80px">
                  <el-form-item label="奖励类别" prop="hjlbm">
                    <el-input v-model="jl_form.hjlbm"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励名称" prop="jlmc">
                    <el-input v-model="jl_form.jlmc"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励时间" prop="hjrq">
                    <el-input v-model="jl_form.hjrq"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励单位" prop="bjdw">
                    <el-input v-model="jl_form.bjdw"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_jl = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_jl = false"
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
                :data="zzkc_tableData"
                style="width: 100%"
                border
                :header-cell-style="{ textAlign: 'center' }"
              >
                <el-table-column label="考察（考核）事由" prop="kcsy">
                </el-table-column>
                <el-table-column label="考察（考核）时间" prop="khrq">
                </el-table-column>
                <el-table-column label="备注" prop="bz"> </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_zzkc"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_zzkc"
                width="30%"
                @close="clearForm('zzkc')"
              >
                <el-form
                  ref="zzkcFormRef"
                  :model="zzkc_form"
                  label-width="140px"
                >
                  <el-form-item label="考察（考核）事由" prop="kcsy">
                    <el-input v-model="zzkc_form.kcsy"></el-input>
                  </el-form-item>
                  <el-form-item label="考察（考核）时间" prop="khrq">
                    <el-input v-model="zzkc_form.khrq"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input v-model="zzkc_form.bz"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_zzkc = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogVisible_zzkc = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
            <el-collapse-item title="教师任职情况测评子集">
              <el-table
                :data="jsrzqk_tableData"
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
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_jsrzqk"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_jsrzqk"
                width="30%"
                @close="clearForm('jsrzqk')"
              >
                <el-form
                  ref="jsrzqkFormRef"
                  :model="jsrzqk_form"
                  label-width="160px"
                >
                  <el-form-item label="年度" prop="nd">
                    <el-input v-model="jsrzqk_form.nd"></el-input>
                  </el-form-item>
                  <el-form-item label="考核分数" prop="khfs">
                    <el-input v-model="jsrzqk_form.khfs"></el-input>
                  </el-form-item>
                  <el-form-item label="考核等级" prop="khdj">
                    <el-input v-model="jsrzqk_form.khdj"></el-input>
                  </el-form-item>
                  <el-form-item label="同级人员人数" prop="tjryrs">
                    <el-input v-model="jsrzqk_form.tjryrs"></el-input>
                  </el-form-item>
                  <el-form-item label="同级人员中名次" prop="tjryzmc">
                    <el-input v-model="jsrzqk_form.tjryzmc"></el-input>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员数" prop="qxzyjsrys">
                    <el-input v-model="jsrzqk_form.qxzyjsrys"></el-input>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员名次" prop="qxzyjsrymc">
                    <el-input v-model="jsrzqk_form.qxzyjsrymc"></el-input>
                  </el-form-item>
                  <el-form-item label="备注" prop="bz">
                    <el-input v-model="jsrzqk_form.bz"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_jsrzqk = false"
                    >取 消</el-button
                  >
                  <el-button
                    type="primary"
                    @click="dialogVisible_jsrzqk = false"
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
                  label-width="80px"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item
                        label="套用工资标示"
                        prop="tygzbs"
                        label-width="100px"
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
                        label-width="100px"
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
                :data="hz_tableData"
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
                <el-table-column label="有效期至" prop="zjyxq">
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-button type="text" @click="add_hz"
                      ><i class="el-icon-plus"></i>添加</el-button
                    >
                  </template>
                  <template>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-dialog
                append-to-body
                title="提示"
                :visible.sync="dialogVisible_hz"
                width="30%"
                @close="clearForm('hz')"
              >
                <el-form ref="hzFormRef" :model="hz_form" label-width="80px">
                  <el-form-item label="类别" prop="hzzjzldm">
                    <el-input v-model="hz_form.hzzjzldm"></el-input>
                  </el-form-item>
                  <el-form-item label="护照号" prop="hzhtxzh">
                    <el-input v-model="hz_form.hzhtxzh"></el-input>
                  </el-form-item>
                  <el-form-item label="签发地点" prop="qfdd">
                    <el-input v-model="hz_form.qfdd"></el-input>
                  </el-form-item>
                  <el-form-item label="签发日期" prop="qfrq">
                    <el-input v-model="hz_form.qfrq"></el-input>
                  </el-form-item>
                  <el-form-item label="签发机关" prop="qfjg">
                    <el-input v-model="hz_form.qfjg"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期至" prop="zjyxq">
                    <el-input v-model="hz_form.zjyxq"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_hz = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible_hz = false"
                    >确 定</el-button
                  >
                </span>
              </el-dialog>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import {
  data,
  option,
  hjlbOptions,
  jkzkOptions,
  hyzkOptions,
  dqztOptions,
  htlxOptions,
  pickerOptions,
  jbxx_form,
  jyjl_form,
  lxfs_form,
  zcxx_form,
  qt_form,
  rzxx_form,
  jsfzxx_form,
  xcflxx_form,
  xl_form,
  ll_form,
  zz_form,
  js_form,
  zy_form,
  xnzw_form,
  zyjszw_form,
  grjsdj_form,
  shjz_form,
  fwxy_form,
  jypx_form,
  jszgz_form,
  cf_form,
  jl_form,
  zzkc_form,
  jsrzqk_form,
  hz_form,
} from "@/const/crud/staff/teacher/info";
import {
  getInfo,
  addInfo,
  queryInfoById,
  putInfo,
} from "@/api/staff/teacher/info";

export default {
  name: "TableEngage",
  data() {
    return {
      // 标签页激活项
      activeName: "1",
      fileList: [],
      // 控制弹窗全屏
      dialogFull: false,
      // 控制 添加 对话框的显示与隐藏
      dialogVisible_add: false,
      // 控制 查看 对话框的显示与隐藏
      dialogVisible_view: false,
      // 控制 添加 学历及学位子集 对话框的显示与隐藏
      dialogVisible_xl: false,
      // 控制 添加 个人履历子集 对话框的显示与隐藏
      dialogVisible_ll: false,
      // 控制 添加 政治面貌及党籍情况子集 对话框的显示与隐藏
      dialogVisible_zz: false,
      // 控制 添加 家属子集 对话框的显示与隐藏
      dialogVisible_js: false,
      // 控制 添加 职业资格证子集 对话框的显示与隐藏
      dialogVisible_zy: false,
      // 控制 添加 校内职务表 对话框的显示与隐藏
      dialogVisible_xnzw: false,
      // 控制 添加 专业技术职务子集 对话框的显示与隐藏
      dialogVisible_zyjszw: false,
      // 控制 添加 工人技术等级及职务子集 对话框的显示与隐藏
      dialogVisible_grjsdj: false,
      // 控制 添加 社会兼职子集 对话框的显示与隐藏
      dialogVisible_shjz: false,
      // 控制 添加 服务协议子集 对话框的显示与隐藏
      dialogVisible_fwxy: false,
      // 控制 添加 奖励子集 对话框的显示与隐藏
      dialogVisible_jl: false,
      // 控制 添加 组织考察（考核）子集 对话框的显示与隐藏
      dialogVisible_zzkc: false,
      // 控制 添加 教师任职情况测评子集 对话框的显示与隐藏
      dialogVisible_jsrzqk: false,
      // 控制 添加 因公/因私护照 对话框的显示与隐藏
      dialogVisible_hz: false,
      // 控制 添加 处分（行政及党内）子集 对话框的显示与隐藏
      dialogVisible_cf: false,
      // 控制 添加 教育培训子集 对话框的显示与隐藏
      dialogVisible_jypx: false,
      // 控制 添加 教师资格证子集 对话框的显示与隐藏
      dialogVisible_jszgz: false,
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: data,
      option: option,
      // 搜索的表单对象
      search: {},
      // 选择器配置对象
      hjlbOptions: hjlbOptions,
      jkzkOptions: jkzkOptions,
      hyzkOptions: hyzkOptions,
      dqztOptions: dqztOptions,
      htlxOptions: htlxOptions,
      pickerOptions: pickerOptions,
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

      // 子表数据源
      xl_tableData: [],
      ll_tableData: [],
      zz_tableData: [],
      js_tableData: [],
      zy_tableData: [],
      xnzw_tableData: [],
      zyjszw_tableData: [],
      grjsdj_tableData: [],
      shjz_tableData: [],
      fwxy_tableData: [],
      jypx_tableData: [],
      jszgz_tableData: [],
      cf_tableData: [],
      jl_tableData: [],
      zzkc_tableData: [],
      jsrzqk_tableData: [],
      hz_tableData: [],

      // 子表表单
      xl_form: xl_form,
      ll_form: ll_form,
      zz_form: zz_form,
      js_form: js_form,
      zy_form: zy_form,
      xnzw_form: xnzw_form,
      zyjszw_form: zyjszw_form,
      grjsdj_form: grjsdj_form,
      shjz_form: shjz_form,
      fwxy_form: fwxy_form,
      jypx_form: jypx_form,
      jszgz_form: jszgz_form,
      cf_form: cf_form,
      jl_form: jl_form,
      zzkc_form: zzkc_form,
      jsrzqk_form: jsrzqk_form,
      hz_form: hz_form,
    };
  },
  mounted() {
    this.getInfoList();
  },
  methods: {
    // 更新当前行的信息
    rowUpdata(row, index, done, loading) {
      console.log("aaaa");
      console.log(row);
      console.log(index);
    },
    // 获取表格数据
    async getInfoList() {
      const { data: res } = await getInfo();
      if (res.code !== 0) return this.$notify.error("获取表格数据失败！");
      this.data = res.data;
    },
    // 查看
    // 添加
    add() {
      this.dialogVisible_add = true;
    },
    // 添加（学历及学位子集）
    add_xl() {
      this.dialogVisible_xl = true;
    },
    // 添加（个人履历子集（校外））
    add_ll() {
      this.dialogVisible_ll = true;
    },
    // 添加（个人履历子集（校外））
    add_zz() {
      this.dialogVisible_zz = true;
    },
    // 添加（家属子集）
    add_js() {
      this.dialogVisible_js = true;
    },
    // 添加（家属子集）
    add_zy() {
      this.dialogVisible_zy = true;
    },
    // 添加 (校内职务表)
    add_xnzw() {
      this.dialogVisible_xnzw = true;
    },
    // 添加 (专业技术职务子集)
    add_zyjszw() {
      this.dialogVisible_zyjszw = true;
    },
    // 添加 (工人技术等级及职务子集)
    add_grjsdj() {
      this.dialogVisible_grjsdj = true;
    },
    // 添加 (社会兼职子集)
    add_shjz() {
      this.dialogVisible_shjz = true;
    },
    // 添加 (服务协议子集)
    add_fwxy() {
      this.dialogVisible_fwxy = true;
    },
    // 添加 (奖励子集)
    add_jl() {
      this.dialogVisible_jl = true;
    },
    // 添加 (组织考察（考核）子集)
    add_zzkc() {
      this.dialogVisible_zzkc = true;
    },
    // 添加 (教师任职情况测评子集)
    add_jsrzqk() {
      this.dialogVisible_jsrzqk = true;
    },
    // 添加 (处分（行政及党内）子集)
    add_cf() {
      this.dialogVisible_cf = true;
    },
    // 添加 (因公/因私护照)
    add_hz() {
      this.dialogVisible_hz = true;
    },
    add_jypx() {
      this.dialogVisible_jypx = true;
    },
    add_jszgz() {
      this.dialogVisible_jszgz = true;
    },
    beforeOpen(done, type) {
      if (["view"].includes(type)) {
        // 查看逻辑
        this.dialogVisible_view = true;
        return;
      }
      done();
    },
    // 打开添加对话框
    openDialog() {
      this.activeName = "1";
    },
    // 清空表单
    clearForm(info) {
      if (info === "primary") {
        this.$refs.jbxxFormRef.resetFields();
        this.$refs.jyjlFormRef.resetFields();
        this.$refs.lxfsFormRef.resetFields();
        this.$refs.zcxxFormRef.resetFields();
        this.$refs.qtFormRef.resetFields();
        this.$refs.jsfzxxFormRef.resetFields();
        this.$refs.xcflxxFormRef.resetFields();
        this.$refs.rzxxFormRef.resetFields();
      }
      if (info === "xl") {
        this.$refs.xlFormRef.resetFields();
      }
      if (info === "grll") {
        this.$refs.llFormRef.resetFields();
      }
      if (info === "zz") {
        this.$refs.zzFormRef.resetFields();
      }
      if (info === "js") {
        this.$refs.jsFormRef.resetFields();
      }
      if (info === "zy") {
        this.$refs.zyFormRef.resetFields();
      }
      if (info === "xnzw") {
        this.$refs.xnzwFormRef.resetFields();
      }
      if (info === "zyjszw") {
        this.$refs.zyjszwFormRef.resetFields();
      }
      if (info === "grjsdj") {
        this.$refs.grjsdjFormRef.resetFields();
      }
      if (info === "shjz") {
        this.$refs.shjzFormRef.resetFields();
      }
      if (info === "fwxy") {
        this.$refs.fwxyFormRef.resetFields();
      }
      if (info === "jypx") {
        this.$refs.jypxFormRef.resetFields();
      }
      if (info === "jszgz") {
        this.$refs.jszgzFormRef.resetFields();
      }
      if (info === "cf") {
        this.$refs.cfFormRef.resetFields();
      }
      if (info === "jl") {
        this.$refs.jlFormRef.resetFields();
      }
      if (info === "zzkc") {
        this.$refs.zzkcFormRef.resetFields();
      }
      if (info === "jsrzqk") {
        this.$refs.jsrzqkFormRef.resetFields();
      }
      if (info === "hz") {
        this.$refs.hzFormRef.resetFields();
      }
    },
    // 保存
    save() {},
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

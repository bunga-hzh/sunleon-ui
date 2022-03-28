<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud :option="option"
                 :search.sync="search"
                 :data="data"
                 :page.sync="page"
                 :before-open="beforeOpen">
        <template slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click="add">添加</el-button>
          <el-button type="primary"
                     icon="el-icon-download"
                     size="small">导出</el-button>
          <el-button type="primary"
                     icon="el-icon-upload2"
                     size="small">导入</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <!-- 添加对话框 -->
    <el-dialog title="添加"
               :visible.sync="dialogVisible_add"
               width="60%"
               :fullscreen="dialogFull">
      <template slot="title">
        <div class="avue-crud__dialog__header">
          <span class="el-dialog__title"> 添加 </span>
          <div class="avue-crud__dialog__menu"
               @click="dialogFull ? (dialogFull = false) : (dialogFull = true)">
            <i class="el-icon-full-screen"></i>
          </div>
        </div>
      </template>
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-tabs v-model="activeName"
                 type="card">
          <el-tab-pane label="人员基本情况"
                       name="1">
            <el-collapse accordion>
              <!-- 基本信息 -->
              <el-row>
                <el-col :span="6">
                  <el-form-item label="教职工编号"
                                label-width="90px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="姓名">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年龄">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="性别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="出生日期">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="籍贯">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="民族">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="曾用名">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出生地">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="联系电话">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="邮箱">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="家庭住址">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="当前状态">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="户籍类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="户口所在地"
                                label-width="90px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="学位">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="专业">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="毕业院校">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="入党日期">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="合同类型">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="健康状况">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="婚姻状况">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="合同类型">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="有效期">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="居住证起始时间"
                                label-width="120px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="是否落户">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="紧急联系人"
                                label-width="90px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="因公/因私护照号"
                                label-width="120px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="发证单位（子集）"
                                label-width="130px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="教师职称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="所属教研组"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="银行卡号"
                                label-width="90px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <p class="upload_p">身份证上传</p>
                  <el-upload class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             list-type="picture">
                    <el-button size="small"
                               type="primary">点击上传</el-button>
                    <div slot="tip"
                         class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-col>
                <el-col :span="12">
                  <p class="upload_p">因公/因私护照上传</p>
                  <el-upload class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             list-type="picture">
                    <el-button size="small"
                               type="primary">点击上传</el-button>
                    <div slot="tip"
                         class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
              <el-collapse-item title="学历及学位子集">
                <div>
                  <!-- 学历及学位子集 -->
                  <el-table :data="tableData"
                            style="width: 100%"
                            border>
                    <el-table-column label="学历"
                                     prop="education">
                    </el-table-column>
                    <el-table-column label="入学时间"
                                     prop="rx_time">
                    </el-table-column>
                    <el-table-column label="学习形式"
                                     prop="xxxs">
                    </el-table-column>
                    <el-table-column label="学制"
                                     prop="xz"> </el-table-column>
                    <el-table-column label="毕业时间"
                                     prop="graduate_time">
                    </el-table-column>
                    <el-table-column align="right">
                      <template slot="header">
                        <el-button type="text"
                                   @click="add_xl"><i class="el-icon-plus"></i>添加</el-button>
                      </template>
                      <template>
                        <el-button size="mini"
                                   type="danger">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-dialog append-to-body
                             title="提示"
                             :visible.sync="dialogVisible_xl"
                             width="30%">
                    <el-form-item label="学历">
                      <el-input v-model="form.education"></el-input>
                    </el-form-item>
                    <el-form-item label="入学时间">
                      <el-input v-model="form.admission_time"></el-input>
                    </el-form-item>
                    <el-form-item label="学习形式">
                      <el-input v-model="form.ways_of_learning"></el-input>
                    </el-form-item>
                    <el-form-item label="学制">
                      <el-input v-model="form.academic_system"></el-input>
                    </el-form-item>
                    <el-form-item label="毕业时间">
                      <el-input v-model="form.graduation_time"></el-input>
                    </el-form-item>
                    <span slot="footer"
                          class="dialog-footer">
                      <el-button @click="dialogVisible_xl = false">取 消</el-button>
                      <el-button type="primary"
                                 @click="dialogVisible_xl = false">确 定</el-button>
                    </span>
                  </el-dialog>
                </div>
              </el-collapse-item>
              <el-collapse-item title="个人履历子集（校外）">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="超始时间"
                                   prop="start_time">
                  </el-table-column>
                  <el-table-column label="终止时间"
                                   prop="end_time">
                  </el-table-column>
                  <el-table-column label="所在单位"
                                   prop="at_dep">
                  </el-table-column>
                  <el-table-column label="职务"
                                   prop="job"> </el-table-column>
                  <el-table-column label="单位所在省份"
                                   prop="at_province">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_ll"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_ll"
                           width="30%">
                  <el-form-item label="超始时间">
                    <el-input v-model="form.education"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.admission_time"></el-input>
                  </el-form-item>
                  <el-form-item label="所在单位">
                    <el-input v-model="form.ways_of_learning"></el-input>
                  </el-form-item>
                  <el-form-item label="职务">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                  <el-form-item label="单位所在省份">
                    <el-input v-model="form.graduation_time"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_ll = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_ll = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="政治面貌及党籍情况子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="政治面貌"
                                   prop="zz_face">
                  </el-table-column>
                  <el-table-column label="参加党派时间"
                                   prop="join_time">
                  </el-table-column>
                  <el-table-column label="介绍人"
                                   prop="introducer">
                  </el-table-column>
                  <el-table-column label="转正时间"
                                   prop="positive_time">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_zz"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_zz"
                           width="30%">
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.education"></el-input>
                  </el-form-item>
                  <el-form-item label="参加党派时间">
                    <el-input v-model="form.admission_time"></el-input>
                  </el-form-item>
                  <el-form-item label="介绍人">
                    <el-input v-model="form.ways_of_learning"></el-input>
                  </el-form-item>
                  <el-form-item label="转正时间">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_zz = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_zz = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="家属子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="称谓"
                                   prop="appellation">
                  </el-table-column>
                  <el-table-column label="姓名"
                                   prop="join_time">
                  </el-table-column>
                  <el-table-column label="出生年月"
                                   prop="introducer">
                  </el-table-column>
                  <el-table-column label="政治面貌"
                                   prop="positive_time">
                  </el-table-column>
                  <el-table-column label="工作单位及职务"
                                   prop="positive_time">
                  </el-table-column>
                  <el-table-column label="联系方式"
                                   prop="positive_time">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_js"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_js"
                           width="30%">
                  <el-form-item label="称谓">
                    <el-input v-model="form.education"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名">
                    <el-input v-model="form.admission_time"></el-input>
                  </el-form-item>
                  <el-form-item label="出生年月">
                    <el-input v-model="form.ways_of_learning"></el-input>
                  </el-form-item>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                  <el-form-item label="工作单位及职务">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_js = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_js = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="任职信息"
                       name="2">
            <el-collapse accordion>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="校内职务">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="参加工作时间"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="进入本单位工作时间"
                                label-width="150px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="任职年限">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="教研组">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="工龄">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="实际工作年限"
                                label-width="110px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="教龄">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="岗位类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="用工形式（编制内录用）"
                                label-width="180px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="人员类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="人员录聘来源"
                                label-width="110px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="实习期限">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="部门（处室）"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="减员时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <p class="upload_p">减员材料上传</p>
                  <el-upload class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             list-type="picture">
                    <el-button size="small"
                               type="primary">点击上传</el-button>
                    <div slot="tip"
                         class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
              <el-collapse-item title="职业资格证子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="职业工种"
                                   prop=""> </el-table-column>
                  <el-table-column label="职业等级"
                                   prop=""> </el-table-column>
                  <el-table-column label="颁证机构"
                                   prop=""> </el-table-column>
                  <el-table-column label="证书编号"
                                   prop=""> </el-table-column>
                  <el-table-column label="取得时间"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_zy"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_zy"
                           width="30%">
                  <el-form-item label="职业工种">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="职业等级">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="颁证机构">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="取得时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_zy = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_zy = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="校内职务表">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="部门"
                                   prop=""> </el-table-column>
                  <el-table-column label="职务名称"
                                   prop=""> </el-table-column>
                  <el-table-column label="任职方式"
                                   prop=""> </el-table-column>
                  <el-table-column label="任免职文号"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="职务级别"
                                   prop=""> </el-table-column>
                  <el-table-column label="任本职级时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_xnzw"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_xnzw"
                           width="30%">
                  <el-form-item label="部门">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="职务名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="任职方式">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="任免职文号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="职务级别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="任本职级时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_xnzw = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_xnzw = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="专业技术职务子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="专业技术资格名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="取得资格途径"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="取得资格时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="聘任专业技术职务名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="首次聘任时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="聘任起始时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="聘任终止时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="聘任情况"
                                   prop=""> </el-table-column>
                  <el-table-column label="上传电子证件"
                                   prop="">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_zyjszw"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_zyjszw"
                           width="30%">
                  <el-form-item label="专业技术资格名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格途径">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="取得资格时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任专业技术职务名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="首次聘任时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任起始时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任终止时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="聘任情况">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证件">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_zyjszw = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_zyjszw = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="工人技术等级及职务子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="工人技术等级名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="工人技术职务名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="取得技术职务时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="批准技术职务单位名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="证书编号"
                                   prop=""> </el-table-column>
                  <el-table-column label="职业工种"
                                   prop=""> </el-table-column>
                  <el-table-column label="上传电子证件"
                                   prop="">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_grjsdj"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_grjsdj"
                           width="30%">
                  <el-form-item label="工人技术等级名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="工人技术职务名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="取得技术职务时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="批准技术职务单位名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="证书编号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="上传电子证件">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_grjsdj = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_grjsdj = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="社会兼职子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="起始时间"
                                   prop=""> </el-table-column>
                  <el-table-column label="终止时间"
                                   prop=""> </el-table-column>
                  <el-table-column label="任职组织"
                                   prop=""> </el-table-column>
                  <el-table-column label="组织类型"
                                   prop=""> </el-table-column>
                  <el-table-column label="兼职职务"
                                   prop=""> </el-table-column>
                  <el-table-column label="是否取酬"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_shjz"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_shjz"
                           width="30%">
                  <el-form-item label="起始时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="任职组织">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="组织类型">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="兼职职务">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="是否取酬">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_shjz = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_shjz = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="服务协议子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="起始时间"
                                   prop=""> </el-table-column>
                  <el-table-column label="终止时间"
                                   prop=""> </el-table-column>
                  <el-table-column label="事由"
                                   prop=""> </el-table-column>
                  <el-table-column label="总金额"
                                   prop=""> </el-table-column>
                  <el-table-column label="备注"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_fwxy"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_fwxy"
                           width="30%">
                  <el-form-item label="起始时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="终止时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="事由">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="总金额">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_fwxy = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_fwxy = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="教师发展信息"
                       name="3">
            <el-collapse accordion>
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="师训帐号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <p class="upload_p">教师资格证上传</p>
                  <el-upload class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             list-type="picture">
                    <el-button size="small"
                               type="primary">点击上传</el-button>
                    <div slot="tip"
                         class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
              <el-collapse-item title="教育培训子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="学习起始时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="学习终止时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="培训班名称"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="培训学时"
                                   prop=""> </el-table-column>
                  <el-table-column label="培训类别"
                                   prop=""> </el-table-column>
                  <el-table-column label="主办单位"
                                   prop=""> </el-table-column>
                  <el-table-column label="参加出国出境"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="是否学历学位晋升"
                                   prop="">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_jypx"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_jypx"
                           width="30%">
                  <el-form-item label="学习起始时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="学习终止时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="培训班名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="培训学时">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="培训类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="主办单位">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="参加出国出境">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="是否学历学位晋升">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_jypx = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_jypx = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="教师资格证子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="资格种类"
                                   prop=""> </el-table-column>
                  <el-table-column label="资格证号码"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="任教学科"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_jszgz"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_jszgz"
                           width="30%">
                  <el-form-item label="资格种类">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="资格证号码">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="任教学科">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_jszgz = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_jszgz = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="处分（行政及党内）子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="处分类别"
                                   prop=""> </el-table-column>
                  <el-table-column label="处分名称"
                                   prop=""> </el-table-column>
                  <el-table-column label="受处分时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="处分原因"
                                   prop=""> </el-table-column>
                  <el-table-column label="撤销处分时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="监察机关直接给予的"
                                   prop="">
                  </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_cf"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_cf"
                           width="30%">
                  <el-form-item label="处分类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="处分名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="受处分时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="处分原因">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="撤销处分时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="监察机关直接给予的">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_cf = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_cf = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="奖励子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="奖励类别"
                                   prop=""> </el-table-column>
                  <el-table-column label="奖励名称"
                                   prop=""> </el-table-column>
                  <el-table-column label="奖励时间"
                                   prop=""> </el-table-column>
                  <el-table-column label="奖励单位"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_jl"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_jl"
                           width="30%">
                  <el-form-item label="奖励类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励名称">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="奖励单位">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_jl = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_jl = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="绩效考核信息"
                       name="4">
            <el-collapse accordion>
              <el-collapse-item title="组织考察（考核）子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="考察（考核）事由"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="考察（考核）时间"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="备注"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_zzkc"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_zzkc"
                           width="30%">
                  <el-form-item label="考察（考核）事由">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="考察（考核）时间">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_zzkc = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_zzkc = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
              <el-collapse-item title="教师任职情况测评子集">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="年度"
                                   prop=""> </el-table-column>
                  <el-table-column label="考核分数"
                                   prop=""> </el-table-column>
                  <el-table-column label="考核等级"
                                   prop=""> </el-table-column>
                  <el-table-column label="同级人员人数"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="同级人员中名次"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="全校专业技术人员数"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="全校专业技术人员名次"
                                   prop="">
                  </el-table-column>
                  <el-table-column label="备注"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_jsrzqk"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_jsrzqk"
                           width="30%">
                  <el-form-item label="年度">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="考核分数">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="考核等级">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="同级人员人数">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="同级人员中名次">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员数">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="全校专业技术人员名次">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="备注">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_jsrzqk = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_jsrzqk = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="薪酬福利信息"
                       name="5">
            <el-collapse accordion>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="套用工资标示"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位绩点"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="薪级等级"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="岗位等级"
                                label-width="100px">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <p class="upload_p">薪级等级附件</p>
                  <el-upload class="upload-demo"
                             action="https://jsonplaceholder.typicode.com/posts/"
                             :on-preview="handlePreview"
                             :on-remove="handleRemove"
                             :file-list="fileList"
                             list-type="picture">
                    <el-button size="small"
                               type="primary">点击上传</el-button>
                    <div slot="tip"
                         class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb
                    </div>
                  </el-upload>
                </el-col>
              </el-row>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane label="其他信息"
                       name="6">
            <el-collapse accordion>
              <el-collapse-item title="因公/因私护照">
                <el-table :data="tableData"
                          style="width: 100%"
                          border>
                  <el-table-column label="类别"
                                   prop=""> </el-table-column>
                  <el-table-column label="护照号"
                                   prop=""> </el-table-column>
                  <el-table-column label="签发地点"
                                   prop=""> </el-table-column>
                  <el-table-column label="签发日期"
                                   prop=""> </el-table-column>
                  <el-table-column label="签发机关"
                                   prop=""> </el-table-column>
                  <el-table-column label="有效期至"
                                   prop=""> </el-table-column>
                  <el-table-column align="right">
                    <template slot="header">
                      <el-button type="text"
                                 @click="add_hz"><i class="el-icon-plus"></i>添加</el-button>
                    </template>
                    <template>
                      <el-button size="mini"
                                 type="danger">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-dialog append-to-body
                           title="提示"
                           :visible.sync="dialogVisible_hz"
                           width="30%">
                  <el-form-item label="类别">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="护照号">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="签发地点">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="签发日期">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="签发机关">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <el-form-item label="有效期至">
                    <el-input v-model="form"></el-input>
                  </el-form-item>
                  <span slot="footer"
                        class="dialog-footer">
                    <el-button @click="dialogVisible_hz = false">取 消</el-button>
                    <el-button type="primary"
                               @click="dialogVisible_hz = false">确 定</el-button>
                  </span>
                </el-dialog>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>
    <!-- 查看详情对话框 -->
  </div>
</template>

<script>
import { data, option } from '@/const/crud/staff/teacher/info'
import { getInfo, addInfo, queryInfoById, putInfo } from '@/api/staff/teacher/info'

export default {
  name: "TableEngage",
  data () {
    return {
      // 表单对象
      form: "",
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
      // 标签页激活项
      activeName: "1",
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
      tableData: [],
    };
  },
  mounted () {
    this.getInfoList()
  },
  methods: {
    // 更新当前行的信息
    rowUpdata (row, index, done, loading) {
      console.log('aaaa');
      console.log(row);
      console.log(index);
    },
    // 获取表格数据
    async getInfoList () {
      const { data: res } = await getInfo()
      if (res.code !== 0) return this.$notify.error('获取表格数据失败！')
      this.data = res.data
    },
    handlePreview () { },
    handleRemove () { },
    fileList () { },
    // 查看
    // 添加
    add () {
      this.dialogVisible_add = true;
    },
    // 添加（学历及学位子集）
    add_xl () {
      this.dialogVisible_xl = true;
    },
    // 添加（个人履历子集（校外））
    add_ll () {
      this.dialogVisible_ll = true;
    },
    // 添加（个人履历子集（校外））
    add_zz () {
      this.dialogVisible_zz = true;
    },
    // 添加（家属子集）
    add_js () {
      this.dialogVisible_js = true;
    },
    // 添加（家属子集）
    add_zy () {
      this.dialogVisible_zy = true;
    },
    // 添加 (校内职务表)
    add_xnzw () {
      this.dialogVisible_xnzw = true;
    },
    // 添加 (专业技术职务子集)
    add_zyjszw () {
      this.dialogVisible_zyjszw = true;
    },
    // 添加 (工人技术等级及职务子集)
    add_grjsdj () {
      this.dialogVisible_grjsdj = true;
    },
    // 添加 (社会兼职子集)
    add_shjz () {
      this.dialogVisible_shjz = true;
    },
    // 添加 (服务协议子集)
    add_fwxy () {
      this.dialogVisible_fwxy = true;
    },
    // 添加 (奖励子集)
    add_jl () {
      this.dialogVisible_jl = true;
    },
    // 添加 (组织考察（考核）子集)
    add_zzkc () {
      this.dialogVisible_zzkc = true;
    },
    // 添加 (教师任职情况测评子集)
    add_jsrzqk () {
      this.dialogVisible_jsrzqk = true;
    },
    // 添加 (处分（行政及党内）子集)
    add_cf () {
      this.dialogVisible_cf = true;
    },
    // 添加 (因公/因私护照)
    add_hz () {
      this.dialogVisible_hz = true;
    },
    add_jypx () {
      this.dialogVisible_jypx = true;
    },
    add_jszgz () {
      this.dialogVisible_jszgz = true;
    },
    beforeOpen (done, type) {
      if (["view"].includes(type)) {
        // 查看逻辑
        this.dialogVisible_view = true;
        return;
      }
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 20px;
}
table {
  width: 100%;
  // border: #eee solid 1px;
  line-height: 40px;
  th {
    font-size: 16px;
    font-family: Medium;
    padding-left: 5px;
    background-color: rgba(242, 242, 242, 1);
  }
  td {
    padding-left: 5px;
    font-size: 14px;
    font-family: Base;
    position: relative;
    p {
      text-align: center;
    }
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
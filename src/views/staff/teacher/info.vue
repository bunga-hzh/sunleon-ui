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
      width="50%"
      :fullscreen="dialogFull"
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
      <el-form ref="form" :model="form" label-width="120px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="人员基本情况" name="1">
            <table>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">基本信息</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="教职工编号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二行 -->
              <tr>
                <td>
                  <el-form-item label="年龄">
                    <el-input v-model="form.age"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第三行 -->
              <tr>
                <td>
                  <el-form-item label="出生日期">
                    <el-input v-model="form.date_of_birth"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第四行 -->
              <tr>
                <td>
                  <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="家庭住址">
                    <el-input v-model="form.home_address"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第五行 -->
              <tr>
                <td>
                  <el-form-item label="紧急联系人">
                    <el-input v-model="form.emergency_contact"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="户口所在地">
                    <el-input v-model="form.account_location"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第六行 -->
              <tr>
                <td>
                  <el-form-item label="身份证号">
                    <el-input v-model="form.card_id"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>身份证上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <!-- 第七行 -->
              <tr>
                <td>
                  <el-form-item label="曾用名">
                    <el-input v-model="form.former_name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第八行 -->
              <tr>
                <td>
                  <el-form-item label="因公/因私护照号">
                    <el-input v-model="form.passport_number"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第九行 -->
              <tr>
                <td>
                  <el-form-item label="有效期">
                    <el-input v-model="form.validity_period"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="发证单位">
                    <el-input v-model="form.unit"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十一行 -->
              <tr>
                <td>
                  <el-form-item label="学位">
                    <el-input v-model="form.degree"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="专业">
                    <el-input v-model="form.profession"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十二行 -->
              <tr>
                <td>
                  <el-form-item label="毕业院校">
                    <el-input v-model="form.graduated_school"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>学历上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <!-- 第十三行 -->
              <tr>
                <td>
                  <el-form-item label="户籍类别">
                    <el-input
                      v-model="form.household_registration_category"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十四行 -->
              <tr>
                <td>
                  <el-form-item label="籍贯">
                    <el-input v-model="form.hometown"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十五行 -->
              <tr>
                <td>
                  <el-form-item label="民族">
                    <el-input v-model="form.nation"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十六行 -->
              <tr>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="入党日期">
                    <el-input
                      v-model="form.date_of_joining_the_party"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十七行 -->
              <tr>
                <td>
                  <el-form-item label="健康状况">
                    <el-input v-model="form.state_of_health"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="婚姻状况">
                    <el-input v-model="form.marital_status"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十八行 -->
              <tr>
                <td>
                  <el-form-item label="当前状态">
                    <el-input v-model="form.current_state"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="合同类型">
                    <el-input v-model="form.type_of_contract"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十九行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="居住证起始时间">
                    <el-input
                      v-model="form.residence_permit_start_time"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二十行 -->
              <tr>
                <td>
                  <el-form-item label="有效期">
                    <el-input v-model="form.validity_period_live"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否落户">
                    <el-input v-model="form.is_settle_down"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二十一行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头二 -->
              <tr align="left">
                <th colspan="2">学历及学位</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学历">
                    <el-input v-model="form.education"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="入学时间">
                    <el-input v-model="form.admission_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学习形式">
                    <el-input v-model="form.ways_of_learning"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="学制">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="毕业时间">
                    <el-input v-model="form.graduation_time"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <!-- 表头三 -->
              <tr align="left">
                <th colspan="2">个人履历</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="超始时间">
                    <el-input v-model="form.start_time"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>学历上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.end_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="所在单位">
                    <el-input v-model="form.current_unit"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职务">
                    <el-input v-model="form.job_title"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="单位所在省份">
                    <el-input v-model="form.province"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <!-- 表头四 -->
              <tr align="left">
                <th colspan="2">政治面貌及党籍情况</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="参加党派时间">
                    <el-input v-model="form.join_party_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="介绍人">
                    <el-input v-model="form.introducer"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="转正时间">
                    <el-input v-model="form.positive_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头五 -->
              <tr align="left">
                <th colspan="2">家属情况</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="称谓">
                    <el-input v-model="form.appellation"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="姓名">
                    <el-input v-model="form.family_name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="出生年月">
                    <el-input v-model="form.family_date_of_birth"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="工作单位及职务">
                    <el-input v-model="form.dep_and_job"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系方式">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="任职信息" name="2">
            <table>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">基本信息</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="校内职务">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="参加工作时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="进入本单位工作时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任职时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职年限">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="教研组">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="工龄">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="用工形式">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="岗位类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="人员类别">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="人员录聘来源">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>减员材料上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="实习期限">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="部门（处室）">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="减员时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">校内职务表</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="部门">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职方式">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任免职文号">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职务级别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任本职级时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">专业技术职务子集</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="专业技术资格名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="取得资格途径">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="取得资格时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="聘任专业技术职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="首次聘任时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>专业技术职务</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任终止时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任情况">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">工人技术等级及职务</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="工人技术等级名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="工人技术职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="取得技术职务时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>专业技术职务</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="批准技术职务单位名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="证书编号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职业工种">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">社会兼职</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职组织">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="组织类型">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="兼职职务">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否取酬">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">服务协议</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="事由">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="总金额">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="教师发展信息" name="3">
            <table>
              <tr align="left">
                <th colspan="2">服务协议</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="师训帐号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <p>教师资格证上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">教育培训</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学习起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="学习终止时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="培训班名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="培训学时">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="培训类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="主办单位">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="参加出国出境">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否学历学位晋升">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">教师资格证</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="资格种类">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="资格证号码">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任教学科">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">处分（行政及党内）</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="处分类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="处分名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="受处分时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="处分原因">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="撤销处分时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="监察机关直接给予的">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">奖励</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="奖励类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="奖励名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="奖励时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="奖励单位">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="绩效考核信息" name="4">
            <table>
              <tr align="left">
                <th colspan="2">组织考察（考核）</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="考察（考核）事由">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="考察（考核）时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">教师任职情况测评</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="年度">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="考核分数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="考核等级">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="同级人员人数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="同级人员中名次">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="全校专业技术人员数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="全校专业技术人员名次">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="薪酬福利信息" name="5">
            <table>
              <tr align="left">
                <th colspan="2">教师任职情况测评</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="套用工资标示">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>薪级等级附件</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="岗位绩点">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="薪级等级">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="薪级等级附件">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>
    <!-- 查看详情对话框 -->
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible_view"
      width="50%"
      :fullscreen="dialogFull"
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
      <el-form ref="form" :model="form" label-width="120px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="人员基本情况" name="1">
            <table>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">基本信息</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="教职工编号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二行 -->
              <tr>
                <td>
                  <el-form-item label="年龄">
                    <el-input v-model="form.age"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="性别">
                    <el-input v-model="form.sex"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第三行 -->
              <tr>
                <td>
                  <el-form-item label="出生日期">
                    <el-input v-model="form.date_of_birth"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系电话">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第四行 -->
              <tr>
                <td>
                  <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="家庭住址">
                    <el-input v-model="form.home_address"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第五行 -->
              <tr>
                <td>
                  <el-form-item label="紧急联系人">
                    <el-input v-model="form.emergency_contact"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="户口所在地">
                    <el-input v-model="form.account_location"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第六行 -->
              <tr>
                <td>
                  <el-form-item label="身份证号">
                    <el-input v-model="form.card_id"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>身份证上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <!-- 第七行 -->
              <tr>
                <td>
                  <el-form-item label="曾用名">
                    <el-input v-model="form.former_name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第八行 -->
              <tr>
                <td>
                  <el-form-item label="因公/因私护照号">
                    <el-input v-model="form.passport_number"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第九行 -->
              <tr>
                <td>
                  <el-form-item label="有效期">
                    <el-input v-model="form.validity_period"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="发证单位">
                    <el-input v-model="form.unit"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十一行 -->
              <tr>
                <td>
                  <el-form-item label="学位">
                    <el-input v-model="form.degree"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="专业">
                    <el-input v-model="form.profession"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十二行 -->
              <tr>
                <td>
                  <el-form-item label="毕业院校">
                    <el-input v-model="form.graduated_school"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>学历上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <!-- 第十三行 -->
              <tr>
                <td>
                  <el-form-item label="户籍类别">
                    <el-input
                      v-model="form.household_registration_category"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十四行 -->
              <tr>
                <td>
                  <el-form-item label="籍贯">
                    <el-input v-model="form.hometown"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十五行 -->
              <tr>
                <td>
                  <el-form-item label="民族">
                    <el-input v-model="form.nation"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十六行 -->
              <tr>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="入党日期">
                    <el-input
                      v-model="form.date_of_joining_the_party"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十七行 -->
              <tr>
                <td>
                  <el-form-item label="健康状况">
                    <el-input v-model="form.state_of_health"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="婚姻状况">
                    <el-input v-model="form.marital_status"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十八行 -->
              <tr>
                <td>
                  <el-form-item label="当前状态">
                    <el-input v-model="form.current_state"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="合同类型">
                    <el-input v-model="form.type_of_contract"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第十九行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="居住证起始时间">
                    <el-input
                      v-model="form.residence_permit_start_time"
                    ></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二十行 -->
              <tr>
                <td>
                  <el-form-item label="有效期">
                    <el-input v-model="form.validity_period_live"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否落户">
                    <el-input v-model="form.is_settle_down"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 第二十一行 -->
              <tr>
                <td colspan="2">
                  <el-form-item label="备注">
                    <el-input v-model="form.remark"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头二 -->
              <tr align="left">
                <th colspan="2">学历及学位</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学历">
                    <el-input v-model="form.education"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="入学时间">
                    <el-input v-model="form.admission_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学习形式">
                    <el-input v-model="form.ways_of_learning"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="学制">
                    <el-input v-model="form.academic_system"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="毕业时间">
                    <el-input v-model="form.graduation_time"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <!-- 表头三 -->
              <tr align="left">
                <th colspan="2">个人履历</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="超始时间">
                    <el-input v-model="form.start_time"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>学历上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.end_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="所在单位">
                    <el-input v-model="form.current_unit"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职务">
                    <el-input v-model="form.job_title"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="单位所在省份">
                    <el-input v-model="form.province"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <!-- 表头四 -->
              <tr align="left">
                <th colspan="2">政治面貌及党籍情况</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="参加党派时间">
                    <el-input v-model="form.join_party_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="介绍人">
                    <el-input v-model="form.introducer"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="转正时间">
                    <el-input v-model="form.positive_time"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头五 -->
              <tr align="left">
                <th colspan="2">家属情况</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="称谓">
                    <el-input v-model="form.appellation"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="姓名">
                    <el-input v-model="form.family_name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="出生年月">
                    <el-input v-model="form.family_date_of_birth"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="政治面貌">
                    <el-input v-model="form.political_face"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="工作单位及职务">
                    <el-input v-model="form.dep_and_job"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="联系方式">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="任职信息" name="2">
            <table>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">基本信息</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="校内职务">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="参加工作时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="进入本单位工作时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任职时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职年限">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="教研组">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="工龄">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="用工形式">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="岗位类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="人员类别">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="人员录聘来源">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>减员材料上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="实习期限">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="部门（处室）">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="减员时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">校内职务表</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="部门">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职方式">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任免职文号">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职务级别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="任本职级时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">专业技术职务子集</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="专业技术资格名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="取得资格途径">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="取得资格时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="聘任专业技术职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="首次聘任时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>专业技术职务</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任终止时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="聘任情况">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <!-- 表头一 -->
              <tr align="left">
                <th colspan="2">工人技术等级及职务</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="工人技术等级名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="工人技术职务名称">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="取得技术职务时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>专业技术职务</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="批准技术职务单位名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="证书编号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="职业工种">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">社会兼职</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任职组织">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="组织类型">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="兼职职务">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否取酬">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">服务协议</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="终止时间">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="事由">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="总金额">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="教师发展信息" name="3">
            <table>
              <tr align="left">
                <th colspan="2">服务协议</th>
              </tr>
              <!-- 第一行 -->
              <tr>
                <td>
                  <el-form-item label="师训帐号">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <p>教师资格证上传</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">教育培训</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="学习起始时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="学习终止时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="培训班名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="培训学时">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="培训类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="主办单位">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="参加出国出境">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="是否学历学位晋升">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">教师资格证</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="资格种类">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="资格证号码">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="任教学科">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">处分（行政及党内）</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="处分类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="处分名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="受处分时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="处分原因">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="撤销处分时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="监察机关直接给予的">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr align="left">
                <th colspan="2">奖励</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="奖励类别">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="奖励名称">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="奖励时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="奖励单位">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="绩效考核信息" name="4">
            <table>
              <tr align="left">
                <th colspan="2">组织考察（考核）</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="考察（考核）事由">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="考察（考核）时间">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td></td>
              </tr>
              <tr align="left">
                <th colspan="2">教师任职情况测评</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="年度">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="考核分数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="考核等级">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="同级人员人数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="同级人员中名次">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="全校专业技术人员数">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="全校专业技术人员名次">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td>
                  <el-form-item label="备注">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
          <el-tab-pane label="薪酬福利信息" name="5">
            <table>
              <tr align="left">
                <th colspan="2">教师任职情况测评</th>
              </tr>
              <tr>
                <td>
                  <el-form-item label="套用工资标示">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
                <td rowspan="4">
                  <p>薪级等级附件</p>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="岗位绩点">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="薪级等级">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
              <tr>
                <td>
                  <el-form-item label="薪级等级附件">
                    <el-input v-model="form.username"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </table>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TableEngage",
  data() {
    return {
      form: {
        username: "",
        name: "",
        age: "",
        sex: "",
        date_of_birth: "",
        phone: "",
        email: "",
        home_address: "",
        emergency_contact: "",
        account_location: "",
        card_id: "",
        card_id_upload: "",
        former_name: "",
        passport_number: "",
        validity_period: "",
        unit: "",
        degree: "",
        profession: "",
        graduated_school: "",
        household_registration_category: "",
        hometown: "",
        nation: "",
        political_face: "",
        date_of_joining_the_party: "",
      },
      // 控制弹窗全屏
      dialogFull: false,
      // 控制添加对话框的显示与隐藏
      dialogVisible_add: false,
      // 控制查看对话框的显示与隐藏
      dialogVisible_view: false,
      // 标签页激活项
      activeName: "1",
      // 上传地址
      action: "",
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [
        {
          user: "zhangsan",
          name: "张三",
          sex: "男",
          dep: "党委组织部",
          identity: "教工",
          cardId: "111111111111111111",
          phone: "13888888888",
          status: "在职员工",
          a: "在职员工",
          b: "在职员工",
          c: "在职员工",
        },
      ],
      option: {
        addBtn: false,
        border: true,
        searchMenuSpan: 4,
        viewBtn: true,
        delBtn: false,
        column: [
          {
            label: "账号",
            prop: "user",
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
          },
          {
            label: "性别",
            prop: "sex",
          },
          {
            label: "组织机构",
            prop: "dep",
            search: true,
          },
          {
            label: "身份类型",
            prop: "identity",
          },
          {
            label: "身份证号",
            prop: "cardId",
            width: 180,
          },
          {
            label: "手机号",
            prop: "phone",
          },
          {
            label: "状态",
            prop: "status",
            search: true,
          },
        ],
      },
      // 搜索的表单对象
      search: {},
    };
  },
  methods: {
    // 添加
    add() {
      this.dialogVisible_add = true;
    },
    beforeOpen(done, type) {
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
</style>

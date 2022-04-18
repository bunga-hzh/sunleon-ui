<template>
  <div class="wel_container">
    <div class="left_container">
      <basic-container class="personal_info_panel">
        <el-row>
          <div class="personal_info">
            <div class="avatar_name">
              <div>
                <el-avatar
                  :size="100"
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
              </div>
              <div class="name">张三</div>
            </div>
            <div class="other_info">
              <ul>
                <li><i class="el-icon-user" /> 工号：<span>123456</span></li>
                <li>
                  <i class="el-icon-office-building" /> 部门：<span
                    >组织部</span
                  >
                </li>
                <li><i class="el-icon-suitcase" /> 职务：<span>教师</span></li>
                <li>
                  <el-button type="text" size="medium" @click="viewInfo"
                    >个人信息</el-button
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="matter_data">
            <div>
              <avue-data-icons :option="dataOption"></avue-data-icons>
            </div>
          </div>
        </el-row>
      </basic-container>
      <basic-container class="review_center_panel">
        <p class="title">审核中心</p>
        <avue-crud :data="data" :option="option" :page.sync="page">
          <template slot="menu">
            <el-button type="text" size="small">
              <i class="el-icon-view"></i>
              查看详情
            </el-button>
            <el-button type="text" size="small">
              <i class="el-icon-edit"></i>
              通过
            </el-button>
            <el-button type="text" size="small">
              <i class="el-icon-delete"></i>
              拒绝
            </el-button>
          </template>
        </avue-crud>
      </basic-container>
      <basic-container class="portrait_container">
        <div class="portrait">
          <p class="title">教师画像</p>
          <div class="portrait_box">
            <div id="chart_box"></div>
            <div class="data_box">
              <div v-for="item in listData" :key="item.id">
                <span>{{ item.title }}</span>
                <a>{{ item.score }}</a>
              </div>
            </div>
          </div>
        </div>
      </basic-container>
    </div>
    <div class="right_container">
      <basic-container class="upcoming_panel">
        <p class="title">
          待办事项&nbsp;&nbsp;(<span>{{ dbnum }}</span
          >)
        </p>
        <li v-for="(item, index) in upcomingList" :key="item.id">
          <router-link to="#">
            <avue-text-ellipsis
              :text="`${index + 1}.  ${item.title}`"
              :height="20"
              :width="200"
            >
              <small slot="more">...</small>
            </avue-text-ellipsis>
          </router-link>
        </li>
        <li v-show="upcomingList.length > 7">......</li>
      </basic-container>
      <basic-container class="notice_panel">
        <p class="title">
          通知公告&nbsp;&nbsp;(<span>{{ tznum }}</span
          >)
        </p>
        <li v-for="(item, index) in notifyList" :key="item.id">
          <router-link to="#">
            <avue-text-ellipsis
              :text="`${index + 1}.  ${item.title}`"
              :height="20"
              :width="280"
            >
              <small slot="more">......</small>
            </avue-text-ellipsis>
          </router-link>
        </li>
        <li v-show="notifyList.length > 7">......</li>
      </basic-container>
      <basic-container class="shortcut_panel">
        <p class="title">快捷方式</p>
        <div class="icon_box">
          <div class="icon" v-for="item in iconList" :key="item.id">
            <router-link :to="item.path">
              <div class="img"><img :src="item.icon" /></div>
              <span>{{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </basic-container>
    </div>
    <el-dialog title="个人信息" :visible.sync="dialogVisible" width="60%">
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import DataSet from "@antv/data-set";
import { Chart } from "@antv/g2";
import {
  dataOption,
  option,
  chartData,
  listData,
  iconList,
  upcomingList,
  notifyList,
} from "@/const/crud/page/wel";

export default {
  name: "Wel",
  data() {
    return {
      tznum: 5,
      dbnum: 11,
      activeName: "1",
      dialogVisible: false,
      chartData: chartData,
      listData: listData,
      dataOption: dataOption,
      upcomingList: upcomingList,
      notifyList: notifyList,
      iconList: iconList,
      data: [{}, {}, {}, {}, {}],
      option: option,
      page: {
        total: 5,
        layout: "prev, pager, next",
      },

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
    };
  },
  methods: {
    viewInfo() {
      this.dialogVisible = true;
    },
    handleClick(val) {},
    createChart(id, data) {
      const { DataView } = DataSet;
      const dv = new DataView().source(data);
      dv.transform({
        type: "fold",
        fields: ["我的数据", "单位平均值"], // 展开字段集
        key: "user", // key字段
        value: "score", // value字段
      });

      const chart = new Chart({
        container: id,
        autoFit: true,
        height: 300,
      });
      chart.data(dv.rows);
      chart.scale("score", {
        min: 0,
        max: 80,
      });
      chart.coordinate("polar", {
        radius: 0.8,
      });
      chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4],
              stroke: "#333",
            },
          },
        },
      });
      chart.axis("item", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null,
            },
          },
        },
      });
      chart.axis("score", {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: "line",
            style: {
              lineDash: null,
            },
          },
        },
      });

      chart.line().position("item*score").color("user").size(2);
      chart
        .point()
        .position("item*score")
        .color("user")
        .shape("circle")
        .size(4)
        .style({
          stroke: "#fff",
          lineWidth: 1,
          fillOpacity: 1,
        });
      chart.area().position("item*score").color("user");
      chart.render();
    },
  },
  mounted() {
    this.createChart("chart_box", this.chartData);
  },
};
</script>

<style scoped="scoped" lang="scss">
.wel_container {
  display: flex;
  .left_container {
    flex: 3;
    .personal_info_panel {
      .el-row {
        display: flex;
        .personal_info {
          width: 40%;
          display: flex;
          .avatar_name {
            flex: 1;
            // background-color: antiquewhite;
            display: flex;
            flex-direction: column;
            align-items: center;
            .name {
              margin-top: 5px;
              font-size: 20px;
              font-family: Extra large;
              color: #56bf99;
            }
          }
          .other_info {
            flex: 3;
            ul {
              li {
                list-style: none;
                font-size: 16px;
                font-family: Medium;
                line-height: 30px;
                span {
                  font-size: 13px;
                  font-family: Small;
                }
              }
            }
          }
        }
        .matter_data {
          width: 60%;
          display: flex;
          justify-content: end;
          > div {
            width: 50%;
            display: flex;
            > div {
              flex: 1;
            }
          }
        }
      }
    }
    .portrait_container {
      .portrait {
        .portrait_box {
          display: flex;
          #chart_box {
            flex: 2;
            height: 300px;
          }
          .data_box {
            flex: 1;
            background-color: #cafffd;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            div {
              flex: 1;
              border: rgb(255, 255, 255) solid 1px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 30px;
              span {
                font-size: 16px;
                color: rgb(150, 150, 150);
              }
              a {
                display: inline-block;
                width: 50px;
                height: 50px;
                border: 1px solid #eee;
                background-color: #49f4ff;
                font-size: 24px;
                color: #ffffff;
                text-align: center;
                line-height: 50px;
              }
            }
          }
        }
      }
    }
  }
  .right_container {
    flex: 1;
    li {
      font-size: 14px;
      font-family: Base;
      list-style: none;
      margin: 20px 0;
      color: rgba(0, 0, 0, 0.44);
      a {
        color: rgba(0, 0, 0, 0.44);
      }
      a:hover {
        color: #409eff;
      }
    }
    .shortcut_panel {
      .icon_box {
        margin: 0 auto;
        width: 300px;
        display: flex;
        flex-wrap: wrap;
        .icon {
          width: 80px;
          height: 100px;
          margin: 10px;
          .img {
            width: 80px;
            height: 80px;
            img {
              margin: 20px;
              width: 40px;
              height: 40px;
            }
          }
          span {
            display: inline-block;
            width: 80px;
            height: 20px;
            text-align: center;
            font-size: 12px;
            font-family: Extra Small;
          }
        }
      }
    }
  }
  .title {
    text-align: center;
    font-size: 16px;
    font-family: Medium;
    font-weight: bold;
    span {
      color: rgb(255, 102, 102);
    }
  }
  .margin20 {
    margin: 20px;
  }
}
</style>

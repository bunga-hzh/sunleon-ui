<template>
  <basic-container>
    <el-card :body-style="{padding: '30px 50px' }">
      <div>
        <div align="center">
          <i class="el-icon-star-off" />
        </div>
        <el-row v-if="showData">
          <el-col :span="10"
                  :offset="7">
            <el-divider>基本数据维护</el-divider>
          </el-col>
        </el-row>
        <div v-if="showData"
             align="center"
             class="sub-icon">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-row v-if="showData"
                :gutter="20">
          <el-col :span="4"
                  :offset="2">
            <el-tooltip content="部门信息的维护">
              <el-button plain
                         @click="go('/system/dept')">
                <i class="el-icon-office-building" />
                部门信息
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip content="员工信息的维护">
              <el-button plain
                         @click="go('/system/user')">
                <i class="el-icon-user" />
                员工信息
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip content="角色信息的维护">
              <el-button plain
                         @click="go('/system/role')">
                <i class="el-icon-s-custom" />
                角色信息
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip content="维护不同角色可看到哪些菜单">
              <el-button plain
                         @click="go('/system/roleAuth')">
                <i class="el-icon-s-opportunity" />
                角色权限
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip content="考核表单内容">
              <el-button plain
                         @click="go('/system/norm')">
                <i class="el-icon-s-order" />
                考核内容
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="showParam">
          <el-col :span="20"
                  :offset="2">
            <el-divider>评分参数配置</el-divider>
          </el-col>
        </el-row>
        <div v-if="showParam"
             align="center"
             class="sub-icon">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-row v-if="showParam"
                :gutter="20">
          <el-col :span="4"
                  :offset="3">
            <el-tooltip content="维护考核年份及对应的起止时间，并可设置当前考核的年份">
              <el-button plain
                         type="primary"
                         @click="go('/config/year')">
                <i class="el-icon-date" />
                考核年份
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="5">
            <el-tooltip content="维护各考核年份各类参与考核的人员">
              <el-button plain
                         type="primary"
                         @click="go('/config/range')">
                <i class="el-icon-data-line" />
                范围设置
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="4">
            <el-tooltip content="维护各考核年份各部门可被评为ABCD级的比例">
              <el-button plain
                         type="primary"
                         @click="go('/config/scale')">
                <i class="el-icon-s-operation" />
                比例设置
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="5">
            <el-tooltip content="测评表预览及下发，下发后参与考核的人员才能看到">
              <el-button plain
                         type="primary"
                         @click="go('/config/norm')">
                <i class="el-icon-s-promotion" />
                测评表下发
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="showAssess">
          <el-col :span="20"
                  :offset="2">
            <el-divider>开始进行评分</el-divider>
          </el-col>
        </el-row>
        <div v-if="showAssess"
             align="center"
             class="sub-icon">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-row v-if="showAssess"
                :gutter="20">
          <el-col v-if="showLDXG"
                  :span="4"
                  :offset="2">
            <el-tooltip content="党政领导及分管领导对中层人员进行评分">
              <el-button plain
                         type="success"
                         @click="go('/assess/middle')">
                <i class="el-icon-notebook-1" />
                中层测评
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showFZRXG"
                  :span="4">
            <el-tooltip content="中层人员对所在部门下的普通员工进行评分">
              <el-button plain
                         type="success"
                         @click="go('/assess/staff')">
                <i class="el-icon-notebook-2" />
                员工测评
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showZCXG"
                  :span="4">
            <el-tooltip content="所有中层人员之间进行评分">
              <el-button plain
                         type="success"
                         @click="go('/assess/each')">
                <i class="el-icon-edit-outline" />
                自评互评
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showJSXG"
                  :span="4">
            <el-tooltip content="普通员工对所在部门下中层人员进行评分">
              <el-button plain
                         type="success"
                         @click="go('/assess/masses')">
                <i class="el-icon-edit" />
                群众测评
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showZCJSXG"
                  :span="4">
            <el-tooltip content="普通员工需要进行的考核登记">
              <el-button plain
                         type="success"
                         @click="go('/assess/register')">
                <i class="el-icon-document" />
                考核登记
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="showCount">
          <el-col :span="20"
                  :offset="2">
            <el-divider>评分进度及统计</el-divider>
          </el-col>
        </el-row>
        <div v-if="showCount"
             align="center"
             class="sub-icon">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-row v-if="showCount"
                :gutter="20">
          <el-col :span="5"
                  :offset="1">
            <el-tooltip content="查看全校及各部门的考核进度">
              <el-button plain
                         type="warning"
                         @click="go('/count/schedule')">
                <i class="el-icon-odometer" />
                考核进度
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showZCTJ"
                  :span="6">
            <el-tooltip content="评分结束后可查看绩效考核汇总表及导出">
              <el-button plain
                         type="warning"
                         @click="go('/count/middle')">
                <i class="el-icon-collection" />
                中层干部绩效考核表
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col v-if="showZCTJ"
                  :span="6">
            <el-tooltip content="评分结束后可查看员工绩效考核表及导出">
              <el-button plain
                         type="warning"
                         @click="go('/count/staff')">
                <i class="el-icon-notebook-1" />
                员工绩效考核表
              </el-button>
            </el-tooltip>
          </el-col>
          <el-col :span="5">
            <el-tooltip content="对考核登记的信息进行审核及打印">
              <el-button plain
                         type="warning"
                         @click="go('/count/register')">
                <i class="el-icon-document" />
                考核登记表汇总
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="showCount">
          <el-col :span="10"
                  :offset="7">
            <el-divider>
              <i class="el-icon-s-flag" />
            </el-divider>
          </el-col>
        </el-row>
        <div v-if="showCount"
             align="center">
          考核结束
        </div>
      </div>
    </el-card>
  </basic-container>
</template>
<style scoped lang="scss">
.sub-icon {
  margin-bottom: 15px;
}
</style>
<script>
export default {
  name: "Dashboard",
  data() {
    return {
      showData: false,
      showParam: false,
      showAssess: false,
      showCount: false,
      showLDXG: false,
      showFZRXG: false,
      showZCXG: false,
      showJSXG: false,
      showZCTJ: true,
      showZCJSXG: false,
    };
  },
  mounted() {
    const roleIds = this.$store.state.user.roleIds;
    if (roleIds.indexOf("1") >= 0) {
      this.showCount = true;
      this.showZCTJ = true;
      this.showAssess = true;
      this.showLDXG = true;
    }
    if (roleIds.indexOf("2") >= 0) {
      this.showCount = true;
      this.showZCTJ = false;
      this.showAssess = true;
      this.showLDXG = true;
    }
    if (roleIds.indexOf("3") >= 0) {
      this.showCount = true;
      this.showZCTJ = false;
      this.showAssess = true;
      this.showZCXG = true;
      this.showFZRXG = true;
      this.showZCJSXG = true;
    }
    if (roleIds.indexOf("4") >= 0) {
      this.showAssess = true;
      this.showZCXG = true;
      this.showZCJSXG = true;
    }
    if (roleIds.indexOf("5") >= 0) {
      this.showAssess = true;
      this.showJSXG = true;
      this.showZCJSXG = true;
    }
    if (roleIds.indexOf("6") >= 0) {
      this.showParam = true;
      this.showCount = true;
      this.showZCTJ = true;
    }
    if (roleIds.indexOf("7") >= 0) {
      this.showData = true;
    }
    if (roleIds.indexOf("8") >= 0) {
      this.showCount = true;
      this.showZCTJ = true;
    }
  },
  methods: {
    go(path) {
      this.$router.push({ path: path });
    },
  },
};
</script>

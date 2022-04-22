<template>
  <basic-container>
    <avue-crud :option="option" :data="data">
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="viewRow(scope.row)"
          >查看详情</el-button
        >
        <el-button type="text" icon="el-icon-edit" @click="editRow(scope.row)"
          >设置</el-button
        >
      </template>
    </avue-crud>
    <el-dialog
      title="校内奖金发放"
      :visible.sync="dialogVisible_xnjjff"
      width="60%"
      @close="clearForm('xnjjff')"
    >
      <el-row>
        <el-form ref="xnjjffFormRef" :model="xnjjffForm" label-width="80px">
          <el-form-item label="审核人1" prop="name1">
            <el-autocomplete
              v-model="xnjjffForm.name1"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入姓名"
              clearable
              :disabled="isDisabled"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="审核人2" prop="name2">
            <el-autocomplete
              v-model="xnjjffForm.name2"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入姓名"
              clearable
              :disabled="isDisabled"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
      </el-row>
      <div class="container">
        <avue-flow
          height="100%"
          width="500px"
          :option="optionFlowxnjjff"
          disabled
        >
          <template slot="header" slot-scope="{ node }">
            <span>{{ (node || {}).header }}</span>
          </template>
          <div slot-scope="{ node }">
            <span>{{ node.name }}</span>
            <br />
            <span style="color: red" v-show="node.isApproval"
              >({{ node.model }})</span
            >
          </div>
        </avue-flow>
      </div>
      <span slot="footer" v-show="!isDisabled">
        <el-button @click="dialogVisible_xnjjff = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_xnjjff = false"
          >更 改</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="绩效内零星收入"
      :visible.sync="dialogVisible_jxnlxsr"
      width="60%"
      @close="clearForm('jxnlxsr')"
    >
      <el-form ref="jxnlxsrFormRef" :model="jxnlxsrForm" label-width="80px">
        <el-form-item label="审核人1" prop="name1">
          <el-autocomplete
            v-model="jxnlxsrForm.name1"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人2" prop="name2">
          <el-autocomplete
            v-model="jxnlxsrForm.name2"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人3" prop="name3">
          <el-autocomplete
            v-model="jxnlxsrForm.name3"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人4" prop="name4">
          <el-autocomplete
            v-model="jxnlxsrForm.name4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="container">
        <avue-flow height="100%" width="500px" :option="optionFlowjxnlxsr">
          <template slot="header" slot-scope="{ node }">
            <span>{{ node.header }}</span>
          </template>
          <div slot-scope="{ node }">
            <span>{{ node.name }}</span>
            <br />
            <span style="color: red" v-show="node.isApproval"
              >({{ node.model }})</span
            >
          </div>
        </avue-flow>
      </div>
      <span slot="footer" v-show="!isDisabled">
        <el-button @click="dialogVisible_jxnlxsr = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_jxnlxsr = false"
          >更 改</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="绩效外零星收入"
      :visible.sync="dialogVisible_jxwlxsr"
      width="60%"
      @close="clearForm('jxwlxsr')"
    >
      <el-form ref="jxwlxsrFormRef" :model="jxwlxsrForm" label-width="80px">
        <el-form-item label="审核人1" prop="name1">
          <el-autocomplete
            v-model="jxwlxsrForm.name1"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人2" prop="name2">
          <el-autocomplete
            v-model="jxwlxsrForm.name2"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人3" prop="name3">
          <el-autocomplete
            v-model="jxwlxsrForm.name3"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人4" prop="name4">
          <el-autocomplete
            v-model="jxwlxsrForm.name4"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="container">
        <avue-flow height="100%" width="500px" :option="optionFlowjxwlxsr">
          <template slot="header" slot-scope="{ node }">
            <span>{{ node.header }}</span>
          </template>
          <div slot-scope="{ node }">
            <span>{{ node.name }}</span>
            <br />
            <span style="color: red" v-show="node.isApproval"
              >({{ node.model }})</span
            >
          </div>
        </avue-flow>
      </div>
      <span slot="footer" v-show="!isDisabled">
        <el-button @click="dialogVisible_jxwlxsr = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_jxwlxsr = false"
          >更 改</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="其它不定时发放"
      :visible.sync="dialogVisible_qtbdsff"
      width="60%"
      @close="clearForm('qtbdsff')"
    >
      <el-form ref="qtbdsffFormRef" :model="qtbdsffForm" label-width="80px">
        <el-form-item label="审核人1" prop="name1">
          <el-autocomplete
            v-model="qtbdsffForm.name1"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="审核人2" prop="name2">
          <el-autocomplete
            v-model="qtbdsffForm.name2"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入姓名"
            clearable
            :disabled="isDisabled"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <div class="container">
        <avue-flow height="100%" width="500px" :option="optionFlowqtbdsff">
          <template slot="header" slot-scope="{ node }">
            <span>{{ node.header }}</span>
          </template>
          <div slot-scope="{ node }">
            <span>{{ node.name }}</span>
            <br />
            <span style="color: red" v-show="node.isApproval"
              >({{ node.model }})</span
            >
          </div>
        </avue-flow>
      </div>
      <span slot="footer" v-show="!isDisabled">
        <el-button @click="dialogVisible_qtbdsff = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible_qtbdsff = false"
          >更 改</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option, data } from "@/const/crud/salary/set/process";
import { fetchList } from "@/api/staff/crud";

export default {
  data() {
    return {
      data: data,
      option: option,
      isDisabled: true,

      dialogVisible_xnjjff: false,
      dialogVisible_jxnlxsr: false,
      dialogVisible_jxwlxsr: false,
      dialogVisible_qtbdsff: false,

      count: 0,
      optionFlowxnjjff: {
        nodeList: [
          {
            id: "nodeA",
            name: "各系部统计工作量提交",
            left: 20,
            top: 100,
            isApproval: false,
          },
          {
            id: "nodeB",
            name: "部门领导审核",
            left: 320,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人1",
          },
          {
            id: "nodeC",
            name: "薪酬管理员统计维护总表提交",
            left: 620,
            top: 100,
            isApproval: false,
            header: undefined,
          },
          {
            id: "nodeD",
            name: "领导审核",
            left: 620,
            top: 300,
            isApproval: true,
            header: undefined,
            model: "审核人2",
          },
          {
            id: "nodeE",
            name: "打印",
            left: 320,
            top: 300,
            isApproval: false,
            header: undefined,
          },
        ],
        lineList: [
          {
            from: "nodeA",
            to: "nodeB",
          },
          {
            from: "nodeB",
            to: "nodeC",
          },
          {
            from: "nodeC",
            to: "nodeD",
          },
          {
            from: "nodeD",
            to: "nodeE",
          },
        ],
      },
      optionFlowjxnlxsr: {
        nodeList: [
          {
            id: "nodeF",
            name: "各部门负责人统计提交审核",
            left: 10,
            top: 100,
            isApproval: false,
            header: undefined,
          },
          {
            id: "nodeG",
            name: "部门领导审核",
            left: 240,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人1",
          },
          {
            id: "nodeH",
            name: "分管校级领导审核",
            left: 480,
            top: 100,
            isApproval: true,
            header: "超过一万元",
            model: "审核人2",
          },
          {
            id: "nodeI",
            name: "校长审核",
            left: 720,
            top: 100,
            isApproval: true,
            header: "五万及以上",
            model: "审核人3",
          },
          {
            id: "nodeJ",
            name: "薪酬管理员初审",
            left: 480,
            top: 200,
            isApproval: false,
            header: undefined,
          },
          {
            id: "nodeK",
            name: "领导复审",
            left: 480,
            top: 300,
            isApproval: true,
            header: undefined,
            model: "审核人4",
          },
          {
            id: "nodeL",
            name: "生成汇总表",
            left: 480,
            top: 400,
            isApproval: false,
            header: undefined,
          },
        ],
        lineList: [
          {
            from: "nodeF",
            to: "nodeG",
          },
          {
            from: "nodeG",
            to: "nodeH",
          },
          {
            from: "nodeH",
            to: "nodeI",
          },
          {
            from: "nodeI",
            to: "nodeJ",
          },
          {
            from: "nodeG",
            to: "nodeJ",
          },
          {
            from: "nodeH",
            to: "nodeJ",
          },
          {
            from: "nodeJ",
            to: "nodeK",
          },
          {
            from: "nodeK",
            to: "nodeL",
          },
        ],
      },
      optionFlowjxwlxsr: {
        nodeList: [
          {
            id: "nodeM",
            name: "各部门负责人统计提交审核",
            left: 10,
            top: 100,
            isApproval: false,
            header: "上传附件（审核信息、校长签字的表）",
          },
          {
            id: "nodeN",
            name: "部门领导审核",
            left: 240,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人1",
          },
          {
            id: "nodeO",
            name: "分管校级领导审核",
            left: 480,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人2",
          },
          {
            id: "nodeP",
            name: "行政人员初审",
            left: 720,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人3",
          },
          {
            id: "nodeQ",
            name: "复审",
            left: 720,
            top: 300,
            isApproval: true,
            header: undefined,
            model: "审核人4",
          },
          {
            id: "nodeR",
            name: "生成汇总表",
            left: 480,
            top: 300,
            isApproval: false,
            header: undefined,
          },
        ],
        lineList: [
          {
            from: "nodeM",
            to: "nodeN",
          },
          {
            from: "nodeN",
            to: "nodeO",
          },
          {
            from: "nodeO",
            to: "nodeP",
          },
          {
            from: "nodeP",
            to: "nodeQ",
          },
          {
            from: "nodeQ",
            to: "nodeR",
          },
        ],
      },
      optionFlowqtbdsff: {
        nodeList: [
          {
            id: "nodeS",
            name: "薪酬负责人提交",
            left: 10,
            top: 100,
            isApproval: false,
            header: undefined,
          },
          {
            id: "nodeT",
            name: "部门领导审核",
            left: 240,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人1",
          },
          {
            id: "nodeU",
            name: "校长审核",
            left: 480,
            top: 100,
            isApproval: true,
            header: undefined,
            model: "审核人2",
          },
          {
            id: "nodeV",
            name: "生成汇总表",
            left: 720,
            top: 100,
            isApproval: false,
            header: undefined,
          },
        ],
        lineList: [
          {
            from: "nodeS",
            to: "nodeT",
          },
          {
            from: "nodeT",
            to: "nodeU",
          },
          {
            from: "nodeU",
            to: "nodeV",
          },
        ],
      },

      name: undefined,
      xnjjffForm: {
        name1: undefined,
        name2: undefined,
      },
      jxnlxsrForm: {
        name1: undefined,
        name2: undefined,
        name3: undefined,
        name4: undefined,
      },
      jxwlxsrForm: {
        name1: undefined,
        name2: undefined,
        name3: undefined,
        name4: undefined,
      },
      qtbdsffForm: {
        name1: undefined,
        name2: undefined,
      },

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    clearForm(type) {
      this.$refs[`${type}FormRef`].resetFields();
    },
    // 查看
    viewRow(row) {
      (this.isDisabled = true), (this[`dialogVisible_${row.value}`] = true);
    },
    // 修改
    editRow(row) {
      (this.isDisabled = false), (this[`dialogVisible_${row.value}`] = true);
    },
    async loadAll() {
      const { data: res } = await fetchList("info", {
        current: 1,
        size: 1000,
      });
      if (res.code !== 0) return true;
      res.data.records.forEach((item) => {
        this.restaurants.push({
          value: item.xm,
          gh: item.gh,
          orgId: item.orgId,
          staffId: item.id,
        });
      });
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  padding: 20px;
}
.container {
  width: 100%;
  height: 500px;
  border: 1px solid #eee;
  pointer-events: none;
}
</style>

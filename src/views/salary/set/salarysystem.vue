<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" @click="add"
          >添加</el-button
        >
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="view(scope.row)"
          >查看详情</el-button
        >
      </template>
      <template slot="sygw" slot-scope="scope">
        <span v-if="scope.row.sygw === '1'">专业技术人员</span>
        <span v-else-if="scope.row.sygw === '2'">管理人员</span>
        <span v-else-if="scope.row.sygw === '3'">普教教师</span>
        <span v-else-if="scope.row.sygw === '4'">工人</span>
        <el-tag v-else type="danger">错误，请联系管理员</el-tag>
      </template>
      <template slot="syzt" slot-scope="scope">
        <el-tag v-if="scope.row.syzt === '1'" type="success">启用</el-tag>
        <el-tag v-else-if="scope.row.syzt === '2'" type="warning">停用</el-tag>
        <el-tag v-else type="danger">错误，请联系管理员</el-tag>
      </template>
    </avue-crud>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible_add"
      width="80%"
      class="avue-dialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="form.bm"></el-input>
        </el-form-item>
        <el-form-item label="适用岗位">
          <el-input v-model="form.sygw"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.ms"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <table>
        <tr>
          <th>
            <span class="title">设置工资体系</span>
            <span></span>
          </th>
        </tr>
        <tr>
          <td>
            <avue-crud :data="dataChild" :option="optionChild"></avue-crud>
          </td>
        </tr>
      </table>
      <span slot="footer">
        <el-button @click="dialogVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  option,
  optionChild,
  dataChilds,
} from "@/const/crud/salary/set/salarysystem";

export default {
  data() {
    return {
      data: [
        {
          bm: "一",
          sygw: "1",
          syzt: "1",
          ms: "",
        },
        {
          bm: "二",
          sygw: "2",
          syzt: "1",
          ms: "",
        },
        {
          bm: "三",
          sygw: "3",
          syzt: "1",
          ms: "",
        },
        {
          bm: "四",
          sygw: "4",
          syzt: "1",
          ms: "",
        },
      ],
      option: option,
      search: {},
      form: {
        bm: undefined,
        sygw: undefined,
        syzt: undefined,
        ms: undefined,
      },
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      dataChild: undefined,
      dataChilds: dataChilds,
      optionChild: optionChild,
      childPage: {
        total: 100,
        current: 1,
        size: 10,
      },

      snapData: [],
      currentType: undefined,

      gjgzList: [],
      xngzList: [],
      lxffList: [],
      bdsffList: [],

      sygwOptions: undefined,
      syztOptions: undefined,

      dialogVisible_add: false,
      dialogVisible_child: false,
    };
  },
  methods: {
    // 添加
    add() {
      this.dialogVisible_add = true;
    },
    view(row) {
      this.dialogVisible_add = true;
      this.dataChild = this.dataChilds[row.$index];
      this.form = row;
    },
    // 提交
    submit() {},
    openChildDialog(type) {
      this.dialogVisible_child = true;
      this.snapData = [];
      this.currentType = type;
    },
    selectionChange(list) {
      this.snapData = list;
    },
    submitChild() {
      this.dialogVisible_child = false;
      this[`${this.currentType}List`] = this.snapData;
      this.$refs.crudChildRef.toggleSelection();
    },
    removeItem(type, tag) {
      this[`${type}List`].some((item, index) => {
        if (item.zdbh === tag.zdbh) {
          this[`${type}List`].splice(index, 1);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 20px;
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
.el-tag {
  margin: 0 10px;
}
</style>

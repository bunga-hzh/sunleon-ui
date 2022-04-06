<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
        <template slot="orgIdSearch">
          <avue-input-tree
            v-model="search.orgId"
            :dic="treeDeptData"
            :props="defaultProps"
            placeholder="请选择所属部门"
          />
        </template>
        <template slot="bzlxSearch">
          <el-select v-model="bzValue" placeholder="请选择">
            <el-option
              v-for="item in bzlxList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="rylxSearch">
          <el-select v-model="ryValue" placeholder="请选择">
            <el-option
              v-for="item in ryList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="jslxSearch">
          <el-select v-model="jsValue" placeholder="请选择">
            <el-option
              v-for="item in jslxList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { getDept, getJslx, getBzlx } from "@/const/staff/getSelectOption";

export default {
  name: "TableEngage",
  data() {
    return {
      treeDeptData: undefined,
      defaultProps: {
        label: "name",
        value: "id",
      },
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [
        {
          gh: "10086",
          xm: "张三",
          objId: "未知",
          bzlx: "事业编制",
          rylx: "在职人员",
          jslx: "外聘教师",
          rzrq: "2022/02/02",
        },
      ],
      option: {
        editBtn: false,
        addBtn: false,
        border: true,
        searchMenuSpan: 4,
        column: [
          {
            label: "工号",
            prop: "gh",
            search: true,
            searchSpan: 7,
          },
          {
            label: "姓名",
            prop: "xm",
            search: true,
            searchSpan: 7,
          },
          {
            label: "所属部门",
            prop: "orgId",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "编制类型",
            prop: "bzlx",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "人员类型",
            prop: "rylx",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "教师类型",
            prop: "jslx",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "入职日期",
            prop: "rzrq",
          },
        ],
      },
      // 搜索的表单对象
      search: {},
      depList: [
        { id: 1, name: "部门1" },
        { id: 2, name: "部门2" },
        { id: 3, name: "部门3" },
        { id: 4, name: "部门4" },
        { id: 5, name: "部门5" },
        { id: 6, name: "部门6" },
        { id: 7, name: "部门7" },
      ],
      depValue: "",
      bzlxList: undefined,
      bzValue: "",
      ryList: [
        { id: 1, name: "在职人员" },
        { id: 2, name: "离校人员" },
        { id: 3, name: "退休人员" },
      ],
      ryValue: "",
      jslxList: undefined,
      jsValue: "",
    };
  },
  methods: {
    async getDept() {
      const { data: res } = await getDept();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.treeDeptData = res.data;
    },
    async getJslx() {
      const { data: res } = await getJslx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.jslxList = res.data;
    },
    async getBzlx() {
      const { data: res } = await getBzlx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.bzlxList = res.data;
    },
  },
  mounted() {
    this.getDept();
    this.getJslx();
    this.getBzlx();
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border: #eee solid 1px;
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
</style>

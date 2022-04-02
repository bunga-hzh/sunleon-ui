<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud
        :option="option"
        :search.sync="search"
        :data="data"
        :page.sync="page"
      >
        <template slot="depSearch">
          <el-select v-model="depValue" placeholder="请选择">
            <el-option
              v-for="item in depList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="bz_typeSearch">
          <el-select v-model="bzValue" placeholder="请选择">
            <el-option
              v-for="item in bzList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </template>
        <template slot="ry_typeSearch">
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
        <template slot="js_typeSearch">
          <el-select v-model="jsValue" placeholder="请选择">
            <el-option
              v-for="item in jsList"
              :key="item.value"
              :label="item.name"
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
export default {
  name: "TableEngage",
  data() {
    return {
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [
        {
          jobId: 1,
          name: "张三",
          dep: "未知",
          bz_type: "事业编制",
          ry_type: "在职人员",
          js_type: "外聘教师",
          time: "2022/02/02",
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
            prop: "jobId",
            search: true,
            searchSpan: 7,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
            searchSpan: 7,
          },
          {
            label: "所属部门",
            prop: "dep",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "编制",
            prop: "bz_type",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "人员类型",
            prop: "ry_type",
            search: true,
            searchSpan: 7,
            searchslot: true,
          },
          {
            label: "教师类型",
            prop: "js_type",
            search: true,
            searchSpan: 6,
            searchslot: true,
          },
          {
            label: "入职日期",
            prop: "time",
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
      bzList: [
        { id: 1, name: "事业编制" },
        { id: 2, name: "非事业编制" },
      ],
      bzValue: "",
      ryList: [
        { id: 1, name: "在职人员" },
        { id: 2, name: "离校人员" },
        { id: 3, name: "退休人员" },
      ],
      ryValue: "",
      jsList: [
        { id: 1, name: "外聘教师" },
        { id: 2, name: "非外聘教师" },
      ],
      jsValue: "",
    };
  },
  methods: {},
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

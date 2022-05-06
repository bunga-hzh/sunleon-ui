<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        v-model="form"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
      >
        <template slot="menuLeft" slot-scope="{ size }">
          <el-button type="primary" :size="size" @click="handleApply()"
            >申请竞聘</el-button
          >
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  applyFormOption,
  applyOption,
} from "@/views/compete/apply/applyOption";
import {
  applyForm,
  checkApplyHistory,
  fetchReleaseList,
} from "@/api/compete/apply";
import { Loading } from "element-ui";

export default {
  name: "apply",
  data() {
    return {
      searchForm: {
        yearTime: new Date().getFullYear(),
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false, // 是否倒序
      },
      list: [],
      tableOption: applyOption,
      listLoading: true,
      treeDeptData: [], //部门数据
    };
  },
  computed: {
    ...mapGetters(["permissions", "userInfo"]),
  },
  methods: {
    //申请竞聘
    handleApply() {
      let loadingInstance = Loading.service({
        body: true,
        fullscreen: true,
      });
      checkApplyHistory().then((check) => {
        setTimeout(() => {
          loadingInstance.close();
        }, 500);
        if (check.data.data) {
          let tempOption = applyFormOption;
          this.$DialogForm.show({
            title: "竞聘岗位申请意向表",
            width: "50%",
            data: {
              name: this.userInfo.username,
              ysgw: this.userInfo.deptId,
            },
            option: tempOption,
            callback: (res) => {
              applyForm(res.data).then((resx) => {
                this.$message.success("提交成功，请等待审核!");
                res.close();
              });
            },
          });
        } else {
          this.$message.warning("本年度您已提交竞聘申请，无法再次申请!");
        }
      });
    },
    getList(page, params) {
      this.listLoading = true;
      fetchReleaseList(Object.assign({}, params, this.searchForm), {
        current: page.currentPage,
        size: page.pageSize,
      }).then((response) => {
        this.list = response.data.data.records;
        this.page.total = response.data.data.total;
        this.listLoading = false;
      });
    },
    searchChange(form, done) {
      this.searchForm = {
        postNameId: form.postNameId,
        yearTime: form.yearTime,
      };
      this.page.currentPage = 1;
      this.getList(this.page, form);
      done();
    },
    refreshChange() {
      this.getList(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    currentChange(current) {
      this.page.currentPage = current;
    },
  },
};
</script>

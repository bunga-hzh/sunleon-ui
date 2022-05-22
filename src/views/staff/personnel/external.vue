<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud v-model="form"
                 :option="option"
                 :data="data"
                 :page.sync="page"
                 :table-loading="showLoading"
                 @on-load="onLoad"
                 @row-save="add"
                 @row-update="rowUpdate"
                 @row-del="rowDel"
                 @refresh-change="refreshChange"
                 @search-change="searchChange">
        <template slot="xmForm"
                  slot-scope="{ type }">
          <el-autocomplete :disabled="type === 'edit' ? true : false"
                           v-model="form.xm"
                           :fetch-suggestions="querySearchAsync"
                           placeholder="请输入姓名"
                           @select="handleSelect"
                           clearable></el-autocomplete>
        </template>
        <template slot="zyzgzsxgxq"
                  slot-scope="scope">
          <el-button type="text"
                     @click="view('wpjsworks', scope.row)">查看</el-button>
        </template>
        <template slot="dqzzgbj"
                  slot-scope="scope">
          <el-button type="text"
                     @click="view('wpjscertificate', scope.row)">查看</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog title="提示"
               :visible.sync="dialogVisible"
               width="60%">
      <avue-crud :option="childOption"
                 :data="childData"
                 @row-save="addChild"
                 @row-update="editChild"
                 @row-del="delChild"
                 @refresh-change="refreshChangeChild">
      </avue-crud>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { option, childOption } from "@/const/crud/staff/personnel/external";

import {
  add,
  edit,
  del,
  getList,
  addData,
  editData,
  delData,
  searchData,
} from "@/const/staff/crud";

import { fetchList } from "@/api/staff/crud";
import { jzg_page } from "@/const/staff/page";
import { result } from "@/const/staff/message";

export default {
  name: "TableEngage",
  data() {
    return {
      // 表单对象
      form: {},
      child_form: {},
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      // 数据源
      data: [],
      // crud配置对象
      option: option,
      showLoading: false,

      childOption: undefined,
      childData: undefined,

      // 控制对话框的显示与隐藏
      dialogVisible: false,
      requestUrl: undefined,
      wpjsId: undefined,

      restaurants: [],
      timeout: null,
    };
  },
  methods: {
    onLoad() {
      this.get();
    },
    get() {
      getList("wpjs", this);
    },
    add(form, done, loading) {
      addData("wpjs", this, form, done, loading);
    },
    rowUpdate(form, index, done, loading) {
      editData("wpjs", this, form, index, done, loading);
    },
    rowDel(form, index) {
      delData("wpjs", this, form, index, () => {
        this.get();
      });
    },
    refreshChange() {
      this.get();
    },
    searchChange(form, done) {
      searchData("wpjs", this, form, done);
    },

    async getListChild() {
      const { data: res } = await fetchList(this.requestUrl, {
        wpjsId: this.wpjsId,
      });
      console.log(res);
      if (!result(this, res, "get")) return true;
      this.childData = res.data.records;
    },
    async addChild(form, done, loading) {
      form.wpjsId = this.wpjsId;
      const { data: res } = await add(this.requestUrl, form);
      if (!result(this, res, "add")) return true;
      form.id = res.data;
      done(form);
    },
    async editChild(form, index, done, loading) {
      const { data: res } = await edit(this.requestUrl, form);
      if (!result(this, res, "edit")) return true;
      done(form);
    },
    async delChild(form, index) {
      console.log(form);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await del(this.requestUrl, form.id);
          if (!result(this, res, "del")) return true;
          this.getListChild(this.requestUrl);
        })
        .catch(() => {});
    },
    refreshChangeChild() {
      this.getListChild();
      this.$message.success("刷新成功！");
    },

    changeRequestUrl(type) {
      this.requestUrl = type;
    },

    view(type, row) {
      this.wpjsId = row.id;
      if (type === "wpjsworks") {
        this.childOption = childOption[0];
        this.requestUrl = type;
        this.getListChild(this.requestUrl);
      }
      if (type === "wpjscertificate") {
        this.childOption = childOption[1];
        this.requestUrl = type;
        this.getListChild(this.requestUrl);
      }
      this.dialogVisible = true;
    },
    async loadAll() {
      const { data: res } = await fetchList("info", jzg_page);
      if (res.code !== 0) return true;
      res.data.records.forEach((item) => {
        this.restaurants.push({
          value: item.xm,
          gh: item.gh,
          orgId: item.orgId,
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
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.orgId = item.orgId;
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>

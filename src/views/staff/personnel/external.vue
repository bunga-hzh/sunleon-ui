<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud v-model="form"
                 :option="option"
                 :data="data"
                 :page.sync="page"
                 :table-loading="showLoading"
                 @on-load="onLoad"
                 @row-save="rowSave"
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
      <!-- <avue-crud :option="childOption"
                 :data="childData"
                 @row-save="addChild"
                 @row-update="editChild"
                 @row-del="delChild"
                 @refresh-change="refreshChangeChild">
      </avue-crud> -->
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
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import { querySearch, loadAll } from "@/const/staff/getAllUser";

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
    // 获取列表
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "wpjs",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          query
        )
      );
      if (res.code !== 0) return this.$message.error(res.msg);
      this.page.total = res.data.total;
      this.data = res.data.records;
      this.showLoading = false;
    },
    // 初次加载
    onLoad() {
      this.fetchList();
    },
    // 新增
    async rowSave(form, done, loading) {
      const { data: res } = await addObj("wpjs", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...form, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const { data: res } = await putObj("wpjs", form);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(form);
      this.$message.success("修改成功！");
    },
    // 删除
    rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("wpjs", form.id);
          if (res.code !== 0)
            return this.$message.error("删除失败！" + res.msg);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.refreshChange();
        })
        .catch(() => {});
    },
    // 刷新
    refreshChange() {
      this.fetchList();
    },
    // 搜索
    searchChange(form, done) {
      this.page.currentPage = 1;
      this.fetchList(form);
      done();
    },

    // async getListChild() {
    //   const { data: res } = await fetchList(this.requestUrl, {
    //     wpjsId: this.wpjsId,
    //   });
    //   console.log(res);
    //   if (!result(this, res, "get")) return true;
    //   this.childData = res.data.records;
    // },
    // async addChild(form, done, loading) {
    //   form.wpjsId = this.wpjsId;
    //   const { data: res } = await add(this.requestUrl, form);
    //   if (!result(this, res, "add")) return true;
    //   form.id = res.data;
    //   done(form);
    // },
    // async editChild(form, index, done, loading) {
    //   const { data: res } = await edit(this.requestUrl, form);
    //   if (!result(this, res, "edit")) return true;
    //   done(form);
    // },
    // async delChild(form, index) {
    //   console.log(form);
    //   this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   })
    //     .then(async () => {
    //       const { data: res } = await del(this.requestUrl, form.id);
    //       if (!result(this, res, "del")) return true;
    //       this.getListChild(this.requestUrl);
    //     })
    //     .catch(() => {});
    // },
    // refreshChangeChild() {
    //   this.getListChild();
    //   this.$message.success("刷新成功！");
    // },

    // changeRequestUrl(type) {
    //   this.requestUrl = type;
    // },

    // view(type, row) {
    //   this.wpjsId = row.id;
    //   if (type === "wpjsworks") {
    //     this.childOption = childOption[0];
    //     this.requestUrl = type;
    //     this.getListChild(this.requestUrl);
    //   }
    //   if (type === "wpjscertificate") {
    //     this.childOption = childOption[1];
    //     this.requestUrl = type;
    //     this.getListChild(this.requestUrl);
    //   }
    //   this.dialogVisible = true;
    // },

    // 搜索姓名
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(querySearch(queryString));
      }, 1000 * Math.random());
    },
    // 选择用户
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.orgId = item.orgId;
      this.form.staffId = item.staffId;
    },
  },
  created() {
    loadAll();
  },
};
</script>

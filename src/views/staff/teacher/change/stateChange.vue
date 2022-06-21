<template>
  <div class="engage_container">
    <basic-container>
      <avue-crud v-model="form"
                 :option="option"
                 :data="data"
                 :page.sync="page"
                 :before-open="beforeOpen"
                 :table-loading="showLoading"
                 :upload-after="uploadAfter"
                 :upload-preview="uploadPreview"
                 :upload-error="uploadError"
                 :permission="permissionList"
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
        <template slot="changeStartDate"
                  slot-scope="scope">
          {{ scope.row.changeStartDate }} - {{ scope.row.changeEndDate }}
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>
import { option } from "@/const/crud/staff/teacher/change/stateChange";
import { fetchList, addObj, putObj, delObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import { querySearch, loadAll } from "@/const/staff/getAllUser";
import { mapGetters } from "vuex";

export default {
  name: "StateChange",
  data() {
    return {
      form: {},
      data: undefined,
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,

      restaurants: [],
      timeout: null,
    };
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.staff_zzjgchange_view, false),
        addBtn: this.vaildData(this.permissions.staff_zzjgchange_add, false),
        delBtn: this.vaildData(this.permissions.staff_zzjginfo_del, false),
        editBtn: this.vaildData(this.permissions.staff_zzjgchange_del, false),
      };
    },
  },
  methods: {
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.changeStartDate = [
          this.form.changeStartDate,
          this.form.changeEndDate,
        ];
      }
      done();
    },

    // 获取列表
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "change",
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
      const obj = {
        ...form,
        changeStartDate: validatenull(form.changeStartDate)
          ? undefined
          : form.changeStartDate[0],
        changeEndDate: validatenull(form.changeStartDate)
          ? undefined
          : form.changeStartDate[1],
      };
      const { data: res } = await addObj("change", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const obj = {
        ...form,
        changeStartDate: validatenull(form.changeStartDate)
          ? undefined
          : form.changeStartDate[0],
        changeEndDate: validatenull(form.changeStartDate)
          ? undefined
          : form.changeStartDate[1],
      };
      const { data: res } = await putObj("change", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(obj);
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
          const { data: res } = await delObj("change", form.id);
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
      this.form.deptId = item.deptId;
      this.form.staffId = item.staffId;
    },

    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    async uploadPreview(file, column, done) {
      // 图片
      if (column.accept === "image/png, image/jpg") {
        this.$ImagePreview(
          [
            {
              thumbUrl: `http://sunleon-gateway:9999${file.url}`,
              url: `http://sunleon-gateway:9999${file.url}`,
            },
          ],
          0,
          {
            closeOnClickModal: true,
          }
        );
      } else {
        this.downFile(
          `http://sunleon-gateway:9999${file.url}`,
          splitUploadData(file.name)
        );
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.error("上传失败" + error);
    },
  },
  created() {
    loadAll();
  },
};
</script>

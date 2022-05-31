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
                 @on-load="loadList"
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
import { getList, delData, searchData } from "@/const/staff/crud";
import { fetchList, addObj, putObj } from "@/api/staff/crud";
import { jzg_page } from "@/const/staff/page";
import { validatenull } from "@/util/validate";

export default {
  name: "StateChange",
  data() {
    return {
      // 表格配置对象
      option: option,
      // 表格数据源集合
      data: undefined,
      // 分页查询对象
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
      // 表单对象
      form: {},

      restaurants: [],
      timeout: null,
    };
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

    loadList() {
      getList("change", this);
    },

    // 新增
    async add(form, done, loading) {
      const obj = {
        staffId: form.staffId,
        changeType: form.changeType,
        changeDate: form.changeDate,
        changeStartDate: form.changeStartDate[0],
        changeEndDate: form.changeStartDate[1],
        changeReason: form.changeReason,
        memo: form.memo,
        changeEvidence: form.changeEvidence,
      };
      const { data: res } = await addObj("change", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("添加成功！");
      done({
        ...obj,
        id: res.data,
        xm: form.xm,
        gh: form.gh,
        orgId: form.orgId,
      });
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const obj = {
        id: form.id,
        staffId: form.staffId,
        changeType: form.changeType,
        changeDate: form.changeDate,
        changeStartDate: form.changeStartDate[0],
        changeEndDate: form.changeStartDate[1],
        changeReason: form.changeReason,
        memo: form.memo,
        changeEvidence: form.changeEvidence,
      };
      const { data: res } = await putObj("change", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      this.$message.success("修改成功！");
      this.refreshChange();
      done();
    },
    // 删除
    rowDel(form, index) {
      delData("change", this, form, index, () => {
        getList("change", this);
      });
    },
    // 刷新
    refreshChange() {
      getList("change", this);
    },
    // 搜索
    searchChange(form, done) {
      searchData("change", this, form, done);
    },

    async loadAll() {
      const { data: res } = await fetchList("info", jzg_page);
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
    handleSelect(item) {
      this.form.gh = item.gh;
      this.form.orgId = item.orgId;
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
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss" scoped></style>

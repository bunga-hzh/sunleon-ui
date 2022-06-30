<template>
  <basic-container>
    <avue-crud ref="crud"
               v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search.sync="search"
               :table-loading="showLoading"
               :upload-after="uploadAfter"
               :upload-preview="uploadPreview"
               :upload-error="uploadError"
               :permission="permissionList"
               @on-load="onLoad"
               @row-save="rowSave"
               @rowEdit="rowEdit"
               @row-update="rowUpdate"
               @row-del="rowDel"
               @refresh-change="refreshChange"
               @search-change="searchChange">
      <template slot="menuLeft">
        <el-button v-if="import_btn"
                   class="filter-item"
                   type="primary"
                   icon="el-icon-upload"
                   @click="$refs.excelUpload.show()">导入</el-button>
        <el-button v-if="export_btn"
                   type="primary"
                   icon="el-icon-download"
                   @click="exportExcel">导出</el-button>
      </template>
      <template slot="menu"
                slot-scope="scope">
        <el-button v-if="edit_btn"
                   type="text"
                   icon="el-icon-edit"
                   @click.stop="rowEdit(scope.row,scope.index)">编辑</el-button>
      </template>
      <template slot="gwmc"
                slot-scope="scope">
        {{scope.row.gwmcName}}
      </template>
      <template slot="gwlbm"
                slot-scope="scope">
        {{scope.row.gwlbmName}}
      </template>
    </avue-crud>
    <!--excel 模板导入 -->
    <excel-upload ref="excelUpload"
                  title="用户信息导入"
                  url="/staff/zzjgoffice/import"
                  temp-name="教职工任职信息模板.xlsx"
                  temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/jzgrzxxmb.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </basic-container>
</template>

<script>
import { option } from "@/views/staff/staffInfo/option/office";
import {
  fetchList,
  addObj,
  delObj,
  putObj,
  getPostType,
} from "@/api/staff/crud";
import { url } from "@/api/baseUrl";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";
import ExcelUpload from "@/components/upload/excel";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {},
      search: {},
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,

      export_btn: false,
      import_btn: false,
    };
  },
  components: {
    ExcelUpload,
  },
  created() {
    this.edit_btn = this.permissions["staff_zzjgoffice_edit"]; //修改
    this.export_btn = this.permissions["staff_zzjgoffice_export"]; //导出
    this.import_btn = this.permissions["staff_zzjgoffice_import"]; //导入
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.staff_zzjgoffice_view, false),
        editBtn: this.vaildData(this.permissions.staff_zzjgoffice_edit, false),
      };
    },
  },
  watch: {
    "form.gwmc": {
      async handler(val) {
        if (!validatenull(val)) {
          const { data: res } = await getPostType(val);
          if (res.code != 0) return this.$message.error(res.error);
          this.form.gwlbm = res.data;
        }
      },
    },
  },
  methods: {
    rowEdit(row, index) {
      let gwmc = this.findObject(this.option.column, "gwmc");
      // 判断是新增还是修改去动态禁用岗位名称字段
      if (validatenull(row.id)) {
        gwmc.disabled = false;
      } else {
        gwmc.disabled = true;
      }
      this.$refs.crud.rowEdit(row, index);
    },
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjgoffice/export",
        this.search,
        "教职工任职信息表.xlsx"
      );
    },
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "office",
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
    // 加载
    onLoad() {
      this.fetchList(this.search);
    },
    // 添加
    async rowSave(form, done, loading) {
      const obj = {
        ...form,
        jyclsc: validatenull(form.jyclsc) ? undefined : form.jyclsc[0].value,
      };
      const { data: res } = await addObj("office", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const obj = {
        ...form,
        id: this.data[index].id,
        staffId: this.data[index].staffId,
        jyclsc: validatenull(form.jyclsc) ? undefined : form.jyclsc[0].value,
      };
      const { data: res } = await putObj("office", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done();
      this.refreshChange();
      this.$message.success("修改成功！");
    },
    // 删除
    async rowDel(form, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("office", form.id);
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
    searchChange(params, done) {
      this.page.currentPage = 1;
      this.fetchList(params);
      done();
    },
    // 上传后
    uploadAfter(res, done, loading, column) {
      if (!validatenull(res.fileName)) {
        this.$message.success("上传成功");
      }
      done();
    },
    // 预览
    uploadPreview(file, column, done) {
      if (column.accept === "image/png, image/jpg") {
        this.$ImagePreview(
          [
            {
              thumbUrl: `${url}${file.url}`,
              url: `${url}${file.url}`,
            },
          ],
          0,
          {
            closeOnClickModal: true,
          }
        );
      } else {
        this.downFile(`${url}${file.url}`, splitUploadData(file.name));
      }
    },
    // 上传失败
    uploadError(error, column) {
      this.$message.success("上传失败" + error);
    },
  },
};
</script>
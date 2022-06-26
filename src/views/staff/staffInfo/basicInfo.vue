<template>
  <basic-container>
    <avue-crud ref="crud"
               v-model="form"
               :data="data"
               :option="option"
               :page.sync="page"
               :search.sync="search"
               :table-loading="showLoading"
               :before-open="beforeOpen"
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
      <template slot="jgCodes"
                slot-scope="scope">
        {{scope.row.jgName}}
      </template>
      <template slot="hkszdmCodes"
                slot-scope="scope">
        {{scope.row.hkszdmName}}
      </template>
      <template slot="jjzqssj"
                slot-scope="scope">
        {{scope.row.jjzqssj}}-{{scope.row.jjzjzsj}}
      </template>
      <template slot="menuLeft">
        <el-button v-if="import_btn"
                   type="primary"
                   icon="el-icon-upload"
                   @click="$refs.excelUpload.show()">导入
        </el-button>
        <el-button v-if="export_btn"
                   type="primary"
                   icon="el-icon-download"
                   @click="exportExcel">导出
        </el-button>
      </template>
      <template slot="menu"
                slot-scope="scope">
        <el-button v-if="child_btn"
                   type="text"
                   icon="el-icon-paperclip"
                   @click="toSubset(scope.row)">子集</el-button>
      </template>
    </avue-crud>
    <!--excel 模板导入 -->
    <excel-upload ref="excelUpload"
                  title="用户信息导入"
                  url="/staff/zzjginfo/import"
                  temp-name="教职工基本信息模板.xlsx"
                  temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/jzgjbxxmb.xlsx"
                  @refreshDataList="refreshChange"></excel-upload>
  </basic-container>
</template>

<script>
import { option } from "@/views/staff/staffInfo/option/basicInfo";
import { fetchList, addObj, delObj, putObj } from "@/api/staff/crud";
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
      child_btn: false,
    };
  },
  components: {
    ExcelUpload,
  },
  created() {
    this.export_btn = this.permissions["staff_zzjginfo_export"]; //导出
    this.import_btn = this.permissions["staff_zzjginfo_import"]; //导入
    this.child_btn = this.permissions["staff_zzjginfo_child"]; //子集
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList() {
      return {
        viewBtn: this.vaildData(this.permissions.staff_zzjginfo_view, false),
        addBtn: this.vaildData(this.permissions.staff_zzjginfo_add, false),
        delBtn: this.vaildData(this.permissions.staff_zzjginfo_del, false),
        editBtn: this.vaildData(this.permissions.staff_zzjginfo_edit, false),
      };
    },
  },
  methods: {
    // 导出excel
    exportExcel() {
      this.downBlobFile(
        "/staff/zzjginfo/export",
        this.search,
        "教职工基本信息表.xlsx"
      );
    },
    // 弹窗打开前
    beforeOpen(done, type) {
      if (type === "edit" || type === "view") {
        this.form.jjzqssj =
          validatenull(this.form.jjzqssj) || validatenull(this.form.jjzjzsj)
            ? undefined
            : [this.form.jjzqssj, this.form.jjzjzsj];
        this.form.jg = JSON.parse(this.form.jg)
          ? undefined
          : JSON.stringify(this.form.jg);
        this.form.hkszdm = validatenull(this.form.hkszdm)
          ? undefined
          : JSON.parse(this.form.hkszdm);
      }
      console.log(this.form);
      done();
    },
    // 获取数据
    async fetchList(query) {
      this.showLoading = true;
      const { data: res } = await fetchList(
        "info",
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
        jjzqssj: validatenull(form.jjzqssj) ? null : form.jjzqssj[0],
        jjzjzsj: validatenull(form.jjzqssj) ? null : form.jjzqssj[1],
        jg: validatenull(form.jgCodes) ? null : form.jgCodes.slice(-1)[0],
        hkszdm: validatenull(form.hkszdmCodes)
          ? null
          : form.hkszdmCodes.slice(-1)[0],
        sfzFrontImg: validatenull(form.sfzFrontImg)
          ? null
          : form.sfzFrontImg[0].value,
        sfzBackImg: validatenull(form.sfzBackImg)
          ? null
          : form.sfzBackImg[0].value,
        zgxlzsc: validatenull(form.zgxlzsc) ? null : form.zgxlzsc[0].value,
        qrzxlzsc: validatenull(form.qrzxlzsc) ? null : form.qrzxlzsc[0].value,
      };
      console.log(obj);
      const { data: res } = await addObj("info", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done({ ...obj, id: res.data });
      this.refreshChange();
      this.$message.success("添加成功！");
    },
    // 修改
    async rowUpdate(form, index, done, loading) {
      const obj = {
        ...form,
        jjzqssj: validatenull(form.jjzqssj) ? undefined : form.jjzqssj[0],
        jjzjzsj: validatenull(form.jjzqssj) ? undefined : form.jjzqssj[1],
        jg: validatenull(form.jgCodes) ? null : form.jgCodes.slice(-1)[0],
        hkszdm: validatenull(form.hkszdmCodes)
          ? null
          : form.hkszdmCodes.slice(-1)[0],
        sfzFrontImg: validatenull(form.sfzFrontImg)
          ? undefined
          : form.sfzFrontImg[0].value,
        sfzBackImg: validatenull(form.sfzBackImg)
          ? undefined
          : form.sfzBackImg[0].value,
        zgxlzsc: validatenull(form.zgxlzsc) ? undefined : form.zgxlzsc[0].value,
        qrzxlzsc: validatenull(form.qrzxlzsc)
          ? undefined
          : form.qrzxlzsc[0].value,
      };
      const { data: res } = await putObj("info", obj);
      if (res.code !== 0) return this.$message.error(res.msg);
      done(obj);
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
          const { data: res } = await delObj("info", form.id);
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
    // 跳转子集页面
    toSubset(row) {
      this.$router.push(`/subset-set/index/${row.id}`);
    },
  },
};
</script>
<template>
  <div>
    <el-row type="flex"
            justify="start"
            style="padding: 10px 0">
      <el-button v-if="edit_btn"
                 type="primary"
                 @click="editInfo"
                 :icon="this.option.detail ?
                  'el-icon-edit' :
                  'el-icon-folder-checked' ">
        {{option.detail ? "编 辑" : "保 存"}}
      </el-button>
    </el-row>
    <avue-form ref="form"
               v-model="obj"
               :option="option"
               @submit="submit"
               :upload-after="uploadAfter"
               :upload-preview="uploadPreview"
               :upload-error="uploadError">
    </avue-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { option } from "./option/info";
import { getInfoByGh, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

export default {
  data() {
    return {
      obj: {},
      option: option,
      edit_btn: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "permissions"]),
    ...mapMutations(["setStaffId"]),
  },
  methods: {
    async getObj() {
      const { data: res } = await getInfoByGh(this.userInfo.username);
      if (res.code !== 0) return this.$message.error(res.msg);
      if (validatenull(res.data))
        return this.$message.error("该账号未在教职工基本信息添加信息！");
      this.obj = {
        ...res.data,
        jjzqssj: validatenull(res.data.jjzqssj)
          ? undefined
          : [res.data.jjzqssj, res.data.jjzjzsj],
        sfzFrontImg: validatenull(res.data.sfzFrontImg)
          ? undefined
          : splitUploadData(res.data.sfzFrontImg),
        sfzBackImg: validatenull(res.data.sfzBackImg)
          ? undefined
          : splitUploadData(res.data.sfzBackImg),
        zgxlzsc: validatenull(res.data.zgxlzsc)
          ? undefined
          : splitUploadData(res.data.zgxlzsc),
        qrzxlzsc: validatenull(res.data.qrzxlzsc)
          ? undefined
          : splitUploadData(res.data.qrzxlzsc),
      };
      this.$store.commit("setStaffId", this.obj.id);
    },
    submit(form, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
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
          zgxlzsc: validatenull(form.zgxlzsc)
            ? undefined
            : form.zgxlzsc[0].value,
          qrzxlzsc: validatenull(form.qrzxlzsc)
            ? undefined
            : form.qrzxlzsc[0].value,
        };
        const { data: res } = await putObj("info", obj);
        if (res.code !== 0) return this.$message.error(res.msg);
        this.$message.success("保存成功!");
        loading();
      }, 1000);
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
    // 切换编辑模式
    editInfo() {
      this.option.detail = !this.option.detail;
    },
  },
  mounted() {
    this.edit_btn = this.permissions["staff_myinfo_edit"]; //个人信息编辑权限
    this.getObj();
    console.log(this.$refs.form.$refs.jgCodes[0].column.lazyLoad());
  },
};
</script>

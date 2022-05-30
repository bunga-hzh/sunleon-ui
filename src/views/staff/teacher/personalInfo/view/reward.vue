<template>
  <avue-form ref="form"
             v-model="obj"
             :option="option"
             @submit="submit"
             :upload-after="uploadAfter"
             :upload-preview="uploadPreview"
             :upload-error="uploadError">
  </avue-form>
</template>

<script>
import { mapGetters } from "vuex";
import { option } from "@/views/staff/teacher/teacherInfo/option/reward";
import { fetchList, putObj } from "@/api/staff/crud";
import { validatenull } from "@/util/validate";
import { splitUploadData } from "@/views/staff/teacher/teacherInfo/util/util";

export default {
  data() {
    return {
      obj: {},
      option: option,

      id: undefined,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    async getObj() {
      const { data: res } = await fetchList("punish", {
        current: 1,
        size: 1,
        staffId: this.userInfo.userId,
      });
      if (res.code !== 0) return this.$message.error(res.msg);
      if (validatenull(res.data.records[0])) return;
      this.obj = {
        ...res.data.records[0],
        cfrq: [res.data.records[0].cfrq, res.data.records[1].cfcxrq],
      };
    },
    submit(form, loading) {
      if (JSON.stringify(form) === "{}") {
        loading();
        return this.$message.warning("请输入信息!");
      }
      setTimeout(async () => {
        loading();
        this.obj = {
          ...form,
          staffId: this.userInfo.userId,
        };
        if (this.id) {
          //编辑
          const { data: res } = await edit("reward", { ...obj, id: this.id });
          if (res.code !== 0) return this.$message.error(res.msg);
          loading();
          this.$message.success("保存成功!");
        } else {
          //添加
          const { data: res } = await add("reward", obj);
          if (res.code !== 0) return this.$message.error(res.msg);
          this.id = res.data;
          this.option.submitText = "保存";
          loading();
          this.$message.success("添加成功!");
        }
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
  },
  mounted() {
    this.option.submitText = "保存";
    this.getObj();
  },
};
</script>

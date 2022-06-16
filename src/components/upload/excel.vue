<template>
  <div>
    <!-- 导入对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="upload.open"
      width="400px"
      append-to-body
      :before-close="handleClose"
    >
      <el-upload
        ref="upload"
        :limit="1"
        :accept="accept ? accept:'.xlsx, .xls'"
        :headers="headers"
        :action="url"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :on-error="handleFileError"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip text-center" slot="tip">
          <span>{{desc ? desc:'仅允许导入xls、xlsx格式文件。'}}</span>
          <el-link
            type="primary"
            :underline="false"
            style="font-size:12px;vertical-align: baseline;margin-right: 10px;"
            @click="downTemp(tempContractUrl,tempContractName)"
            v-if="tempContractUrl"
          >下载合同模板
          </el-link>
          <el-link
            type="primary"
            :underline="false"
            style="font-size:12px;vertical-align: baseline;"
            @click="downExcelTemp"
            v-if="tempUrl"
          >下载{{downLoadText ? downLoadText:''}}模板
          </el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <!--校验失败错误数据-->
    <el-dialog title="校验失败数据" :visible.sync="errorVisible">
      <el-table :data="errorData">
        <el-table-column
          property="lineNum"
          label="行号"
          width="50"
        ></el-table-column>
        <el-table-column
          property="errors"
          label="错误描述"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-tag
              type="danger"
            >{{ scope.row.errors }}
            </el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "ExcelUpload",
  components: {},
  props: {
    url: {
      type: String
    },
    title: {
      type: String
    },
    tempUrl: {
      type: String
    },
    tempName: {
      type: String
    },
    desc:{
      type: String
    },
    accept:{
      type: String
    },
    tempContractUrl:{
      type:String
    },
    tempContractName:{
      type:String
    },
    downLoadText:{
      type: String
    }
  },
  data() {
    return {
      upload: {
        open: false,
        isUploading: false
      },
      errorVisible: false,
      errorData: []
    };
  },
  computed: {
    headers: function () {
      return {
        Authorization: "Bearer " + store.getters.access_token,
        version:'hjy'
      };
    }
  },
  methods: {
    handleClose(done){
      this.$emit("onClose");
      done()
    },
    downTemp(url,name) {
      this.downBlobFile(url, {}, name);
    },
    downExcelTemp() {
      this.downBlobFile(this.tempUrl, {}, this.tempName);
    },
    handleFileUploadProgress() {
      this.upload.isUploading = true;
    },
    handleFileError() {
      this.$message.error('上传失败,数据格式不合法!')
      this.upload.open = false;
    },
    handleFileSuccess(response) {
      this.upload.isUploading = false;
      this.upload.open = false;
      this.$refs.upload.clearFiles();
      // 校验失败
      if (response.code === 1) {
        this.$message.error("导入失败，以下数据不合法");
        this.errorVisible = true;
        this.errorData = response.data;
        this.$refs.upload.clearFiles();
      } else {
        this.$message.success("导入成功");
        // 刷新表格
        this.$emit("refreshDataList");
        this.$emit("onUploadSuccess",response.data)
      }
    },
    submitFileForm() {
      if(this.url=='action'){
        if(this.$refs.upload.uploadFiles.length<1){
          this.$message.error("请上传导入文件!");
        }else{
          // 刷新表格
          this.$emit("onChange",this.$refs.upload.uploadFiles[0]);
          this.upload.isUploading = false;
          this.upload.open = false;
          this.$refs.upload.clearFiles();
        }
      }else {
        this.$refs.upload.submit();
      }
    },
    show() {
      this.upload.isUploading = false;
      this.upload.open = true;
    }
  }
};
</script>

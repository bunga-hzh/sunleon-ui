<template>
    <div class="execution">
      <basic-container>
        <avue-crud
          ref="typeManager"
          :option="option"
          v-model="form"
          :data="list"
          :page.sync="page"
          :table-loading="listLoading"
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @current-change="currentChange"
          @on-load="getList"
          @row-save="create"
          @row-update="update"
          @row-del="handleDel"
        >
          <template slot-scope="scope" slot="menu">
            <el-button
              size="small"
              type="text"
              v-if="scope.row.fjId=='0'"
              icon="el-icon-plus"
              @click="addOrUpdateHandle(scope.row.id)"
            >新增
            </el-button>
            <el-button
              size="small"
              type="text"
              icon="el-icon-edit"
              @click="$refs.typeManager.rowEdit(scope.row,scope.index)"
              >修改
            </el-button>
            <el-button
              size="small"
              type="text"
              icon="el-icon-delete"
              @click="handleDelRow(scope.row,scope.index)"
              >删除
            </el-button>
            <el-button
              v-if="scope.row.hasOwnProperty('children') ? false:true"
              size="small"
              type="text"
              icon="el-icon-view"
              @click="handleTemplate(scope.row)"
            >模板管理
            </el-button>
          </template>
        </avue-crud>
      </basic-container>
      <el-dialog title="模板管理"
                 v-dialogDrag
                 :visible.sync="templateState"
                 class="avue-dialog avue-dialog--top"
                 width="60%">
        <avue-crud
          ref="typeManager"
          :option="templateOption"
          v-model="tempForm"
          :data="tempList"
          :page.sync="tempPage"
          :table-loading="tempListLoading"
          @refresh-change="tempRefreshChange"
          @size-change="tempSizeChange"
          @current-change="tempCurrentChange"
          @row-save="create"
          @row-update="update"
          @row-del="handleDel"
        >
          <template slot="menuLeft" slot-scope="{size}">
            <el-button type="primary" :size="size" icon="el-icon-upload" @click="$refs.tempUpload.show()">上传模板</el-button>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button
              size="small"
              type="text"
              icon="el-icon-down"
              @click="handleDownload(scope.row)"
            >下载模板
            </el-button>
          </template>
        </avue-crud>
      </el-dialog>
      <excel-upload
        ref="tempUpload"
        :accept="'.doc,.docx'"
        title="合同模板上传"
        :desc="' '"
        @onUploadSuccess="handleUploadSuccess"
        :url="'/admin/sys-file/upload'"
      ></excel-upload>
    </div>
</template>

<script>
import {templateOption, typeManagerOption} from "@/views/contract/basic/option/typeManagerOption";
import {delObj, fetchList, fetchTempList, putObj, saveObj, saveTempObj} from '@/api/contract/basic/typeManager'
import ExcelUpload from "@/components/upload/excel";

export default {
  name:'typeManager',
  components:{ExcelUpload},
  data(){
    return {
      option:typeManagerOption,
      templateOption:templateOption,
      templateState:false,
      list:[],
      tempForm:{},
      tempList:[],
      tempPage: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      tempListLoading:false,
      htlxId:'',
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      listLoading: true,
      form:{},
    }
  },
  methods:{
    handleDelRow(row,index){
      if(row.fjId=='0' && row.children){
        if(row.children.length>0){
          this.$message({
            type:'warning',
            message:'该分类下存在合同类型数据，无法删除。'
          })
        }
      }else{
        this.$refs.typeManager.rowDel(row,index)
      }

    },
    handleDownload(row){
      this.downBlobFile(row.wjDz, {}, row.wjMc);
    },
    handleUploadSuccess(data){
      let putObj = {
        htlxId:this.htlxId,
        wjMc:data.originalName,
        wjDz:data.url
      };
      saveTempObj(putObj).then(res=>{
        this.tempGetList(this.tempPage);
      })
    },
    handleTemplate(row){
      this.htlxId = row.id;
      this.templateState = true;
      this.tempGetList(this.tempPage);
    },
    handleDel(row) {
      this.$confirm('是否确认删除名称为"' + row.htlxMc + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return delObj(row.id);
      }).then(() => {
        this.getList(this.page)
        this.$message.success('删除成功')
      })
    },
    create(row, done, loading){
      saveObj(row).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('创建成功!')
      })
    },
    update(row, index, done, loading) {
      putObj(row).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('修改成功!')
      })
    },
    addOrUpdateHandle(id) {
      this.form.fjId = id;
      this.$refs.typeManager.rowAdd();
    },
    getList(page, params){
      this.listLoading = true;
      fetchList({
        current: page.currentPage,
        size: page.pageSize
      }).then(response=>{
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    tempGetList(page, params){
      this.tempListLoading = true;
      fetchTempList({
        current: page.currentPage,
        size: page.pageSize,
        htlxId:this.htlxId
      }).then(response=>{
        this.tempList = response.data.data.records
        this.tempPage.total = response.data.data.total
        this.tempListLoading = false
      })
    },
    tempRefreshChange() {
      this.tempGetList(this.tempPage)
    },
    tempSizeChange(pageSize) {
      this.tempPage.pageSize = pageSize
    },
    tempCurrentChange(current) {
      this.tempPage.currentPage = current
    },
    refreshChange() {
      this.getList(this.page)
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    currentChange(current) {
      this.page.currentPage = current
    },
  }
}
</script>

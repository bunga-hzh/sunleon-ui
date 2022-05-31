<template>
    <div class="post">
        <basic-container>
          <avue-crud
            ref="crud"
            :page.sync="page"
            :data="tableData"
            :table-loading="tableLoading"
            :option="tableOption"
            @on-load="getList"
            @row-save="rowSave"
            @row-update="rowUpdate"
            @search-change="searchChange"
            @refresh-change="refreshChange"
            @row-del="rowDel"
            @size-change="sizeChange"
            @current-change="currentChange"/>
        </basic-container>
    </div>
</template>


<script>
import {delObj, fetchList, putObj, saveObj} from "@/api/recuit/interviewer/interviewer";
import {interviewerOption} from "@/views/recruit/interviewer/option";

export default{
    name:'interviewer',
    data(){
        return {
          tableOption:interviewerOption,
          tableData: [],
          page: {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 20 // 每页显示多少条
          },
          tableLoading: false,
          searchForm: {},
        }
    },
    methods:{
      rowSave(form,done,loading){
        saveObj(form).then(res=>{
          this.getList(this.page)
          done(form);
          this.$message.success('创建成功!')
        })
      },
      rowUpdate(form,index,done,loading){
        putObj(form).then((res)=>{
          this.getList(this.page)
          done(form);
          this.$message.success('修改成功!')
        })
      },
      rowDel(form,index){
        this.$confirm('此操作将永久删除该面试官, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         delObj(form.id).then(res=>{
           this.getList(this.page)
           this.$message({
             type: 'success',
             message: '删除成功!'
           });
         })
        }).catch(() => { });
      },
      getList(page, params) {
        this.listLoading = true
        fetchList({
          current: page.currentPage,
          size: page.pageSize
        }).then(response=>{
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.listLoading = false
        })
      },
      searchChange(form, done) {
        this.searchForm = form
        this.page.currentPage = 1
        this.getList(this.page, form)
        done()
      },
      sizeChange(pageSize) {
        this.page.pageSize = pageSize
      },
      currentChange(current) {
        this.page.currentPage = current
      },
      refreshChange() {
        this.getList(this.page)
      }
    }
}

</script>

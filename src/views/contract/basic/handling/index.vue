<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        v-model="form"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @row-save="create"
        @row-update="update"
        @row-del="handleDel"
      />
    </basic-container>
  </div>
</template>

<script>
import {fetchList, putObj, saveObj,delObj} from "@/api/contract/basic/handling"
import {handlingOption} from "@/views/contract/basic/option/handlingOption";

export default {
  name:'capital',
  data(){
    return {
      tableOption:handlingOption,
      form:{},
      page:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      listLoading: false,
    }
  },
  methods:{
    create(row, done, loading){
      row.zjfzrId = row.zjfzrId.toString();
      saveObj(row).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('创建成功!')
      }).catch(err=>{
        loading();
      })
    },
    update(row, index, done, loading) {
      row.zjfzrId = row.zjfzrId.toString();
      putObj(row).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('修改成功!')
      })
    },
    handleDel(row) {
      this.$confirm('是否确认删除名称为"' + row.zjfzrName + '"的数据项?', "警告", {
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
    getList(page, params) {
      this.listLoading = true;
      fetchList(Object.assign({
        current: page.currentPage,
        size: page.pageSize
      },params ? params :{})).then((response=>{
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      }))
    },
    searchChange(form, done) {
      this.page.currentPage = 1
      this.getList(this.page, form)
      done()
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

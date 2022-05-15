<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        v-model="form"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @row-update="update"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange">
        <template slot="menuLeft" slot-scope="{size}">
          <el-button
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-download"
            style="margin-left: 10px;"
            @click="exportExcel"
          >导出
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>


<script>

import {employOptionOption} from "@/views/compete/employment/employOption";
import {fetchEmployList, updateEmployObj} from "@/api/compete/employment";
import {exportExcel} from "@/api/recuit/post/post";

export default {
  name: 'employment',
  data() {
    return {
      searchForm: {
        yearTime:new Date().getFullYear()
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      tableOption:employOptionOption,
      listLoading: true,
    }
  },
  methods:{
    exportExcel() {
      let queryParams = {
        "token":null,
        "yearTime":this.searchForm.yearTime,
        "candidateName": this.searchForm.hasOwnProperty("candidateName") ?  this.searchForm.candidateName:"",
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":1
      };
      exportExcel("679230620001722368",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '聘期信息.xlsx';
        const linkNode = document.createElement('a');

        linkNode.download = fileName; //a标签的download属性规定下载文件的名称
        linkNode.style.display = 'none';
        linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
        document.body.appendChild(linkNode);
        linkNode.click();  //模拟在按钮上的一次鼠标单击

        URL.revokeObjectURL(linkNode.href); // 释放URL 对象
        document.body.removeChild(linkNode);
      });
    },
    getList(page, params) {
      this.listLoading = true
      fetchEmployList(Object.assign({}, params),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    update(row, index, done, loading) {
      updateEmployObj(row).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('修改成功!')
      })
    },
    searchChange(form, done) {
      this.searchForm = form;
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

<template>
  <div class="clause">
    <basic-container>
      <el-row :span="24">
        <el-col
          :xs="24"
          :sm="24"
          :md="5"
          class="clause__tree">
          <avue-tree
            :option="treeOption"
            :data="treeData"
            @node-click="nodeClick">
            <span class="el-tree-node__label" slot-scope="{ node, data }">
              <el-tooltip class="item" effect="dark" content="无数据权限" placement="right-start" v-if="data.isLock">
                <span>{{node.label}}  <i class="el-icon-lock"></i></span>
              </el-tooltip>
              <span v-if="!data.isLock">{{node.label}}</span>
            </span>
          </avue-tree>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="19"
          class="clause__main">
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
          >
            <template slot="menuLeft" slot-scope="{size}">
              <el-button class="filter-item"
                         plain
                         type="primary"
                         style="margin-left: 10px;"
                         size="small"
                         icon="el-icon-upload"  @click="$refs.excelUpload.show()">导入条款</el-button>
            </template>
          </avue-crud>
        </el-col>
      </el-row>
      <excel-upload
        ref="excelUpload"
        title="导入条款"
        url="/act/htLxTk/contractImport"
        temp-name="条款模板.xls"
        temp-url="/admin/sys-file/res/template/jpgwmb.xls"
        @refreshDataList="handleRefreshChange"
      ></excel-upload>
    </basic-container>
  </div>
</template>

<script>

import {fetchList, fetchTree, delObj, saveObj, putObj} from "@/api/contract/basic/clause";
import {clauseOption} from "@/views/contract/basic/option/clauseOption";
import ExcelUpload from "@/components/upload/excel";

export default {
  name:'clause',
  components: { ExcelUpload },
  data(){
    return{
      treeOption: {
        nodeKey: 'id',
        addBtn: false,
        menu: false,
        props: {
          label: 'htlxMc',
          value: 'id'
        }
      },
      treeData:[],
      tableOption:clauseOption,
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
  created() {
    this.init();
  },
  methods:{
    handleRefreshChange() {
      this.getList(this.page);
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
    handleDel(row) {
      this.$confirm('是否确认删除编号为"' + row.tkBh + '"的数据项?', "警告", {
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
      },params ? params :{})).then(response=>{
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    init() {
      fetchTree().then(response => {
        this.treeData = response.data.data
      })
    },
    nodeClick(data) {
      this.page.page = 1
      this.getList(this.page, {htlxId: data.id})
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


<style lang="scss">
.clause {
  height: 100%;

  &__tree {
    padding-top: 3px;
    padding-right: 20px;
  }

  &__main {
    .el-card__body {
      padding-top: 0;
    }
  }
}
</style>

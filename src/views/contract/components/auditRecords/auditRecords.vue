<!-- 简历对话框 -->
<template>
  <el-dialog
    :visible.sync="open"
    width="70%"
    class="dialog-audit"
    append-to-body
    title="审核历史记录"
  >
    <el-tabs v-model="activeName">
      <el-tab-pane label="流程图" name="first">
        <el-steps :active="2" align-center>
          <el-step title="申请人提交" description="申请人提交审批"></el-step>
          <el-step title="部门负责人审核" description="张老师"></el-step>
          <el-step title="资金负责人" description="王老师"></el-step>
          <el-step title="完成" description="合同审核通过"></el-step>
        </el-steps>
      </el-tab-pane>
      <el-tab-pane label="审核记录" name="second">
        <avue-crud
          ref="crud"
          :option="tableOption"
          :page.sync="page"
          :table-loading="listLoading"
          :data="list"
          @on-load="getList"
          @search-change="searchChange"
          @refresh-change="refreshChange"
          @size-change="sizeChange"
          @current-change="currentChange">
        </avue-crud>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import {getHis} from "@/api/contract/admin/admin";

export default {
  name:'auditRecords',
  data(){
    return{
      open:false,
      activeName:'first',
      propData:{},
      tableOption:{
        border: true,
        index: true,
        indexLabel: '序号',
        stripe: true,
        menuAlign: 'center',
        selection: false,
        searchMenuSpan: 6,
        editBtn: false,
        delBtn: false,
        viewBtn: true,
        searchIndex: 3,
        searchIcon: true,
        align: 'center',
        menu:false,
        header:false,
        menuHeaderAlign: 'center',
        labelWidth: 120,
        gutter: 60,
        addBtn: false,
        column: [
          {
            label:'用户',
            prop:'userName'
          },
          {
            label:'审核意见',
            prop:'shnr'
          },
          {
            label:'审核状态',
            prop:'spzt',
            type:'select',
            dicData:[
              {
                label:'待处理',
                value:0
              },
              {
                label:'审核通过',
                value:1
              },
              {
                label:'审核驳回',
                value:2
              }
            ]
          },
          {
            label:'接收时间',
            prop:'cjsj'
          },
          {
            label:'操作时间',
            prop:'gxsj'
          },
        ]
      },
      page:{
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list:[],
      listLoading:false,
    }
  },
  methods:{
    getList(page, params) {
      this.listLoading = true;
      getHis({
        current: page.currentPage,
        size: page.pageSize,
        htGlId:this.propData.id,
      }).then(response=>{
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
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
    show(row,index) {
      this.propData = row;
      this.open = true;
    }
  }
}
</script>

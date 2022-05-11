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
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange">
        <template slot-scope="{type,size,row}" slot="menu">
          <!-- <el-button icon="el-icon-view" :size="size" :type="type" @click="">查看简历</el-button> -->
          <el-button icon="el-icon-view" :size="size" :type="type" @click="handlePrint(row)">打印登记表</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {MemberListOption} from "@/views/recruit/endface/memberlist/tableOption";
import {fetchMemberList} from "@/api/recuit/endFace/memberList/memberList";
import {exportExcel, exportPdf} from "@/api/recuit/post/post";

export default {
  name:'MemberList',
  data(){
    return {
      tableOption:MemberListOption,
      diaLogform:true,
      searchForm: {
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      listLoading: false,
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods:{
    //导出
    handlePrint(row){
      let queryParams = {
        "token":null,
        "user_id":row.userId,
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":10
      };
      exportPdf("671355610982150144",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = row.candidateName+'-登记表.pdf';
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
      this.listLoading = true;
      fetchMemberList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
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

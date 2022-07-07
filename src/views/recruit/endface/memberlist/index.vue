<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        :search.sync="searchForm"
        v-model="form"
        :page.sync="page"
        :table-loading="listLoading"
        :data="list"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange">
        <template slot-scope="{disabled,size}" slot="gwlxIdSearch">
          <el-select v-model="searchForm.gwlxId" clearable placeholder="请选择" @change="GetCurId1">
            <el-option
              v-for="item in gwlxDict"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <template slot-scope="{disabled,size}" slot="postNameIdsSearch">
          <el-select ref="postRef" v-model="searchForm.postNameIds" multiple clearable placeholder="请选择">
            <el-option
              v-for="item in postDict"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot="menuLeft" slot-scope="{size}">
          <el-button type="primary" :size="size" @click="handleExport()">导出登记表</el-button>
        </template>
        <template slot-scope="{type,size,row}" slot="menu">
          <!-- <el-button icon="el-icon-view" :size="size" :type="type" @click="">查看简历</el-button> -->
          <el-button icon="el-icon-view" :size="size" :type="type"  v-if="row.isPerfect" @click="handlePrint(row)">导出登记表</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {MemberListOption} from "@/views/recruit/endface/memberlist/tableOption";
import {exportPersonal, exportZip, fetchMemberList} from "@/api/recuit/endFace/memberList/memberList";
import {exportExcel, exportPdf} from "@/api/recuit/post/post";
import {getDictByType, getPostNameById} from "@/api/recuit/common/commonApi";

export default {
  name:'MemberList',
  data(){
    return {
      tableOption:MemberListOption,
      diaLogform:true,
      searchForm: {
        yearTime:new Date().getFullYear(),
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
      gwlxDict:[],//岗位类型
      postDict:[],//岗位名称
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  created() {
    getDictByType('post_type').then(res=>{
      this.gwlxDict = res.data.data.items;
    })
  },
  methods:{
    GetCurId1(val){
      this.searchForm.postNameIds = [];
      if(val){
        getPostNameById(val).then(res=>{
          this.postDict = res.data.data;
        })
      }
    },
    //导出登记表
    handleExport(){
      const loading = this.$loading({
        lock: true,
        text: '请等待打包压缩完成...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      exportZip(this.searchForm).then((response=>{
        // 前提是服务端要在header设置Access-Control-Expose-Headers: Content-Disposition
        // 前端才能正常获取到Content-Disposition内容
        const disposition = response.headers['content-disposition'];
        let fileName = disposition.substring(disposition.indexOf('filename=') + 9, disposition.length);
        // iso8859-1的字符转换成中文
        fileName = decodeURI(escape(fileName));
        // 去掉双引号
        fileName = fileName.replace(/\"/g, "");
        const content = response.data;
        console.info("rep:", disposition);
        console.info("fileName:", fileName);
        // 创建a标签并点击， 即触发下载
        let url = window.URL.createObjectURL(new Blob([content]));
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileName);
        //link.download = "测试下载文件.xls"
        // 模拟
        document.body.appendChild(link);
        link.click();
        // 释放URL 对象
        window.URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      })).finally(()=>{
        loading.close();
      })
    },
    //导出
    handlePrint(row){
      // console.log(row)
      // userId
      // candidateName
      // postName
      exportPersonal({
        frontUserId:row.userId,
        frontUserRealName:row.candidateName,
        postName:row.postName
      }).then(res=>{
          const blob = new Blob([res.data]);
          const fileName = row.candidateName+'-登记表.docx';
          const linkNode = document.createElement('a');

          linkNode.download = fileName; //a标签的download属性规定下载文件的名称
          linkNode.style.display = 'none';
          linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
          document.body.appendChild(linkNode);
          linkNode.click();  //模拟在按钮上的一次鼠标单击

          URL.revokeObjectURL(linkNode.href); // 释放URL 对象
          document.body.removeChild(linkNode);
      })
      // let queryParams = {
      //   "token":null,
      //   "user_id":row.userId,
      //   "pageNo":this.page.currentPage,
      //   "pageSize":this.page.pageSize,
      //   "currentPageNo":"1",
      //   "currentPageSize":10
      // };
      // exportPdf("671355610982150144",queryParams).then(res=>{
      //   const blob = new Blob([res.data]);
      //   const fileName = row.candidateName+'-登记表.pdf';
      //   const linkNode = document.createElement('a');
      //
      //   linkNode.download = fileName; //a标签的download属性规定下载文件的名称
      //   linkNode.style.display = 'none';
      //   linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
      //   document.body.appendChild(linkNode);
      //   linkNode.click();  //模拟在按钮上的一次鼠标单击
      //
      //   URL.revokeObjectURL(linkNode.href); // 释放URL 对象
      //   document.body.removeChild(linkNode);
      // });
    },
    getList(page, params) {
      this.listLoading = true;
      fetchMemberList(Object.assign({}, params),{
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

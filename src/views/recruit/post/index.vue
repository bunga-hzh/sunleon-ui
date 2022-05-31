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
        :before-open="beforeOpen"
        @current-change="currentChange"
        @row-update="update"
        @row-del="handleDel"
        @row-save="create">
        <template slot="menuLeft" slot-scope="{size}">
          <el-button type="primary" icon="el-icon-download" @click="handleExportExcel" :size="size">导出</el-button>
        </template>
        <template slot-scope="scope" slot="menuForm">
          <el-button @click="handleSaveAndRe(scope)" v-if="scope.type!='view'">保存并发布</el-button>
        </template>
        <template slot-scope="scope" slot="startTime">
          <span>{{scope.row.startTime | datePipe('yyyy-MM-dd')}} ~ {{scope.row.endTime | datePipe('yyyy-MM-dd')}}</span>
        </template>
        <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-s-promotion" :size="size" @click="handleRekease(row)" :type="type">{{row.isRelease =='1' ? '撤销':'发布'}}</el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import {tableOption} from "@/views/recruit/post/postOption";
import {fetchList, addObj, delObj, release, putObj, getPostinfo, exportExcel} from "@/api/recuit/post/post";

export default {
  name: 'Post',
  data() {
    return{
      searchForm: {
        yearTime:new Date().getFullYear(),
        postNameId:'',
      }, //搜索条件
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      list: [],
      tableOption:tableOption,
      listLoading: true,
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  created(){ //初始化时
    this.post_edit = this.permissions['post_edit'] //编辑
    this.post_release = this.permissions['post_release'] //发布
    this.post_del = this.permissions['post_del'] //删除
    this.post_export = this.permissions['post_export'] //导出
    this.post_add = this.permissions['post_add'] //添加
    this.getList(this.page)
  },
  watch: {
    'form.postNameId'(val) {
      if(JSON.stringify(this.form)!="{}" && val!=null && val!=undefined && val!=''){
        getPostinfo(val).then((res)=>{
          this.form.postDuty = res.data.data;
        })
      }
    },
  },
  methods:{ //相关函数方法
    getList(page, params) {
      this.listLoading = true
      fetchList(Object.assign({},params, this.searchForm),
        {
          current: page.currentPage,
          size: page.pageSize
        }
      ).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    //弹出表单前
    beforeOpen(done,type){
      if(type=='edit'){
        this.form.startTime = [this.form.startTime,this.form.endTime];
        done();
      }else if(type=='view'){
        this.form.startTime = [this.form.startTime,this.form.endTime];
        done();
      }else{
        done()
      }
    },
    //导出
    handleExportExcel(){
      let queryParams = {
        "token":null,
        "yearTime": this.searchForm.yearTime,
        "postNameId":this.searchForm.postNameId,
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":10
      };
      exportExcel("670880742025097216",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '岗位发布统计表.xlsx';
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
    handleSaveAndRe(sco){
      this.$refs.crud.validate((resxx)=>{
        if(resxx){
          const data = {
            postCode:this.form.postCode, //岗位编号
            postNameId:this.form.postNameId, //所属岗位ID
            recruitNumber:this.form.recruitNumber, //招聘人数
            startTime:this.form.startTime[0], //开始时间
            endTime:this.form.startTime[1], // 结束时间
            recruitRequire:this.form.recruitRequire, //招聘要求
            postRequire:this.form.postRequire, //岗位要求
            id:this.form.id,
            isRelease:1, //保存及发布
            gwlxId:this.form.gwlxId,
          };
          if(this.form.id){
            putObj(data).then(res=>{
              this.getList(this.page)
              this.$refs.crud.closeDialog();
              this.$notify.success('修改成功!')
            }).catch(err=>{
              done();
            })
          }else{
            addObj(data).then(res=>{
              this.getList(this.page)
              this.$refs.crud.closeDialog();
              this.$notify.success('创建成功!')
            })
          }
        }
      });

    },
    handleDel: function (row) {
      this.$confirm('是否确认删除岗位编号为"' + row.postCode + '"的信息吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return delObj([row.id])
      }).then(() => {
        this.getList(this.page)
        this.$message.success('删除成功')
      })
    },
    handleRekease(row){
      if(row.isRelease=='1'){ //撤销发布
        release([row.id],'0').then(res=>{
          this.getList(this.page)
          this.$message.success('撤销成功')
        })
      }else{ //发布岗位
        release([row.id],'1').then(res=>{
          this.getList(this.page)
          this.$message.success('发布成功')
        })
      }
    },
    searchChange(form, done) {
      this.searchForm = {
        postNameId:form.postNameId,
        yearTime:form.createTime
      }
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
    update(row, index, done, loading) {
      const data = {
        postCode:this.form.postCode, //岗位编号
        postNameId:this.form.postNameId, //所属岗位ID
        recruitNumber:this.form.recruitNumber, //招聘人数
        startTime:this.form.startTime[0], //开始时间
        endTime:this.form.startTime[1], // 结束时间
        recruitRequire:this.form.recruitRequire, //招聘要求
        postRequire:this.form.postRequire,//岗位要求
        id:this.form.id,
        gwlxId:this.form.gwlxId,
      };
      putObj(data).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('修改成功!')
      }).catch(err=>{
        done();
      })
    },
    create(row, done, loading) {
      const data = {
        postCode:this.form.postCode, //岗位编号
        postNameId:this.form.postNameId, //所属岗位ID
        recruitNumber:this.form.recruitNumber, //招聘人数
        startTime:this.form.startTime[0], //开始时间
        endTime:this.form.startTime[1], // 结束时间
        recruitRequire:this.form.recruitRequire, //招聘要求
        postRequire:this.form.postRequire,//岗位要求
        gwlxId:this.form.gwlxId,
      };
      addObj(data).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('创建成功!')
      })
    }
  }
}

</script>

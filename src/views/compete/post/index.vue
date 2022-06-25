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
        @current-change="currentChange"
        @row-save="create"
        @row-update="update"
        @row-del="handleDel">
        <template slot="menuLeft" slot-scope="{size}">
          <el-button
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-download"
            style="margin-left: 10px;"
            @click="exportExcel"
          >导出竞聘岗位
          </el-button>
          <el-button class="filter-item"
                     plain
                     type="primary"
                     style="margin-left: 10px;"
                     size="small"
                     icon="el-icon-upload"  @click="$refs.excelUpload.show()">导入竞聘岗位</el-button>
          <el-button type="danger" plain :size="size" style="margin-left: 10px;"  @click="handleDels()">删除</el-button>
          <el-button type="warning" plain :size="size" style="margin-left: 10px;"  @click="handleRel()">发布/撤销</el-button>

        </template>
        <template slot-scope="{type,size,row,index}" slot="menu">
          <el-button icon="el-icon-s-promotion" :size="size" @click="handleRelease(row)" :type="type">{{row.isRelease =='1' ? '撤销发布':'发布'}}</el-button>
          <el-button icon="el-icon-edit" :size="size" @click="$refs.crud.rowEdit(row,index)" :type="type">编辑</el-button>
          <el-button icon="el-icon-delete" :size="size  " @click="handleDel(row)" :disabled="row.isRelease =='1'" :type="type">删除</el-button>
        </template>
      </avue-crud>
      <!--excel 模板导入 -->
      <excel-upload
        ref="excelUpload"
        title="竞聘岗位导入"
        url="/act/jpGwgl/batchImport"
        temp-name="竞聘岗位导入模板.xls"
        temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/jpgwmb.xls"
        @refreshDataList="handleRefreshChange"
      ></excel-upload>
    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {competePostOption} from "@/views/compete/post/postOption";
import {addCompeteObj, deletePost, fetchCompeteList, optionRelease} from "@/api/compete/post";
import ExcelUpload from "@/components/upload/excel";
import {exportExcel, getPostinfo} from "@/api/recuit/post/post";

export default {
  name:'postc',
  components: { ExcelUpload },
  data() {
    return{
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
      tableOption:{},
      listLoading: true,
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  watch:{
    'form.gwlbId'(val) {
      if(JSON.stringify(this.form)!="{}" && val!=null && val!=undefined && val!=''){
        console.log(val)
        getPostinfo(val).then((res)=>{
          this.form.gzrwzc = res.data.data;
          // this.form.gzrwzc = res.data.data.postRequire;
          // this.form.gzrwyq = res.data.data.postDuty;
        })
      }
    },
  },
  created() {
    var validateDate = (rule, value, callback)=>  {
      if (value === '') {
        callback(new Error('请输入结束时间!'));
      } else if (new Date(value) < new Date(this.form.startTime)) {
        callback(new Error('结束时间需大于开始时间！'));
      } else {
        callback();
      }
    };
    let option = competePostOption;
    option.column[8].rules.push({validator:validateDate,trigger: 'blur'});
    this.tableOption = option;
  },
  methods:{
    //编辑
    handleEdit(row){
      this.$refs.crud.rowEdit();
    },
    //excel导入
    handleImport(){

    },
    //导出
    exportExcel() {
      let queryParams = {
        "token":null,
        "yearTime":this.searchForm.yearTime,
        "postName": this.searchForm.hasOwnProperty("postName") ?  this.searchForm.postName:"",
        "postTypeId":this.searchForm.hasOwnProperty("postTypeId") ? this.searchForm.postTypeId:"",
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":1
      };
      exportExcel("678401837539614720",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '岗位列表.xlsx';
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
    handleRefreshChange() {
      this.getList(this.page);
    },
    handleRelease(row){ //撤销/发布
      if(row.isRelease=='1'){
        optionRelease([{id:row.id,state:row.isRelease}]).then(res=>{
          this.getList(this.page, this.form)
          this.$message.success('撤销成功!')
        })
      }else{
        optionRelease([{id:row.id,state:row.isRelease}]).then(res=>{
          this.getList(this.page, this.form)
          this.$message.success('发布成功!')
        })
      }
    },
    /**
     * 批量发布/撤销发布
     */
    handleRel(){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }

      try {
        let array = [];
        tempList.map((item)=>{
          array.push({id:item.id,state:item.isRelease})
        })
        this.$confirm('确认发布/撤销岗位吗？', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          return optionRelease(array)
        }).then(() => {
          this.getList(this.page)
          this.$message.success('操作成功')
        })

      }catch (e){
        // this.$message.error("选择的列表中存在已发布的岗位，无法删除！")
      }
    },
    /**
     * 批量删除
     */
    handleDels(){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }

      try {
        let array = [];
        tempList.map((item)=>{
          array.push(item.id)
          if(item.isRelease=='1'){
            throw 'out';
          }
        })
          this.$confirm('是否确认删除选择的岗位信息吗?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(function () {
            return deletePost(array)
          }).then(() => {
            this.getList(this.page)
            this.$message.success('删除成功')
          })

      }catch (e){
        this.$message.error("选择的列表中存在已发布的岗位，无法删除！")
      }
    },
    /**
     * 删除岗位
     * @param row
     */
    handleDel(row){
      if(row.isRelease=='1'){
        this.$message.error('岗位已发布，无法删除!');
        return;
      }
      this.$confirm('是否确认删除选择的岗位信息吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return deletePost([row.id])
      }).then(() => {
        this.getList(this.page)
        this.$message.success('删除成功')
      })
    },
    getList(page, params) {
      this.listLoading = true
      fetchCompeteList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
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
    update(row, index, done, loading) {
      const data = {
        gwmc:this.form.postName, //岗位名称
        jpksny:this.form.startTime,//竞聘开始时间
        jpjsny:this.form.endTime, //竞聘结束时间
        gzbmId:this.form.gzbmId, //工作部门
        gwlbId:this.form.gwlbId, //岗位类别
        gwjd:this.form.gwjd, //岗位绩点
        gzrwzc:this.form.gzrwzc, //工作要求
        gzrwyq:this.form.gzrwyq,// 工作条件
        rztj:this.form.rztj, //任职条件
        gwlxId:this.form.gwlxId, //岗位类型
        id:this.form.id,
        jprs:this.form.jprs, //竞聘人数
      };
      addCompeteObj(data).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('修改岗位成功!')
      }).catch(()=>{
        this.$notify.success('修改岗位失败!')
        done();
      })
    },
    create(row, done, loading) {
      const data = {
        gwmc:this.form.postName, //岗位名称
        jpksny:this.form.startTime,//竞聘开始时间
        jpjsny:this.form.endTime, //竞聘结束时间
        gzbmId:this.form.gzbmId, //工作部门
        gwlbId:this.form.gwlbId, //岗位类别
        gwjd:this.form.gwjd, //岗位绩点
        gzrwzc:this.form.gzrwzc, //工作要求
        gzrwyq:this.form.gzrwyq,// 工作条件
        gwlxId:this.form.gwlxId, //岗位类型
        rztj:this.form.rztj, //任职条件
        jprs:this.form.jprs, //竞聘人数
      };
      addCompeteObj(data).then(res=>{
        this.getList(this.page)
        done()
        this.$notify.success('新建岗位成功!')
      }).catch(err=>{
        this.$notify.success('新增岗位失败!')
      })
    }
  },
}

</script>

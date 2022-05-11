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
        <template slot-scope="{type,size,row,index}" slot="menu">
          <el-popover
            v-if="row.state=='1'"
            placement="left"
            width="200"
            trigger="click">
            <div class="demo-input-suffix">
              <el-input
                type="number"
                min="0"
                max="100"
                placeholder="请输入分数"
                v-model="Fraction">
              </el-input>
            </div>
            <el-button @click="handleSet(row)" type="primary" style="width: 100%;margin:10px 0px;">确定</el-button>
            <el-button icon="el-icon-setting" :type="type" :size="size" slot="reference">设置答辩分数</el-button>
          </el-popover>
          <el-button icon="el-icon-check" :size="size" @click="handleConfirm(row,true)" style="margin-left: 10px" :type="type" v-if="row.state=='2'">成功确认</el-button>
          <el-button icon="el-icon-sort" :size="size" @click="handleWorkHandover(row,true)" style="margin-left: 10px" :type="type" v-if="row.state=='4'">开始交接</el-button>
          <el-button icon="el-icon-sort" :size="size" @click="handleWorkHandover(row,false)" style="margin-left: 10px" :type="type" v-if="row.state=='6'">完成交接</el-button>
          <el-button icon="el-icon-edit" :size="size" @click="handlePinqi(row,true)" style="margin-left: 10px" :type="type" v-if="row.state=='7'">转入聘期</el-button>
          <el-button icon="el-icon-close" :size="size" v-if="row.state=='1' || row.state=='2' || row.state=='4'" style="color:#F56C6C;margin-left: 10px" @click="handleRefuse(row,false)" :type="type">竞聘结束</el-button>
        </template>
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
          <el-button
            class="filter-item"
            plain
            @click="handlePinqi({},false)"
            type="primary"
            size="small"
            icon="el-icon-sort"
            style="margin-left: 10px;"
          >转入聘期
          </el-button>
          <el-button
            class="filter-item"
            plain
            type="primary"
            size="small"
            icon="el-icon-finished"
            style="margin-left: 10px;"
            @click="handleSuccess"
          >成功确认
          </el-button>
          <el-button
            class="filter-item"
            plain
            type="danger"
            size="small"
            icon="el-icon-close"
            style="margin-left: 10px;"
            @click="handleRefuse({},true)"
          >竞聘结束
          </el-button>
        </template>
      </avue-crud>
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {nameFormOption, nameListFormOption, nameListOption, pinqiOption} from "@/views/compete/namelist/nameListOption";
import {
  batchSettingConfirm,
  fetchManageList,
  JPConfirmation, JPWorkState,
  settingConfirm,
  settingFraction,
  settingRefuse
} from "@/api/compete/nameList";
import {exportExcel} from "@/api/recuit/post/post";

export default {
  name:'nameList',
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
      tableOption:nameListOption,
      listLoading: true,
      Fraction:0, //分数
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods:{
    exportExcel() {
      console.log("点击l ")
      let queryParams = {
        "token":null,
        "yearTime":this.searchForm.yearTime,
        "candidateName": this.searchForm.hasOwnProperty("candidateName") ?  this.searchForm.candidateName:"",
        "state":this.searchForm.hasOwnProperty("state") ? this.searchForm.state:"",
        "pageNo":this.page.currentPage,
        "pageSize":this.page.pageSize,
        "currentPageNo":"1",
        "currentPageSize":1
      };
      exportExcel("679228688134660096",queryParams).then(res=>{
        const blob = new Blob([res.data]);
        const fileName = '竞聘名单.xlsx';
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
    //工作交接
    handleWorkHandover(row,bool){
      this.listLoading = true;
      JPWorkState({id:row.id,state:bool}).then(res=>{
        this.getList(this.page)
      }).finally(()=>{
        this.listLoading = false;
      });
    },
    //聘期
    handlePinqi(row,bool){
      if(bool){
        this.$DialogForm.show({
          title: '转入聘期确认',
          width: '50%',
          menuPosition: 'center',
          option: pinqiOption,
          data:{
            dynamic:[{
              jpzName:row.candidateName,
              newPostName:row.postChangeName,
              userId:row.userId,
              gwId:row.postId,
            }]
          },
          beforeClose: (done) => {
            done()
          },
          callback: (res) => {
            let putData = [{
              rzksny:res.data.startEndTime[0], //聘期开始时间
              rzjsny:res.data.startEndTime[1], //聘期结束时间
              bz:res.data.remark, // 备注
              gwtdId:row.gwtdId, //岗位ID
              userId:row.userId, //用户ID
              gwId:row.gwId //
            }];

            JPConfirmation(putData).then((conf)=>{
              this.$message.success('转入成功!')
              this.getList(this.page)
              res.close();
            })
          }
        });
      }else{
        let array = [];
        const tempList = this.$refs.crud.tableSelect;
        if(tempList.length<1){
          this.$message.error("请勾选列表！")
          return;
        }

        let isPass = false;
        tempList.map((item)=>{
          if(item.state=='4'){
            array.push({
              jpzName:item.candidateName,
              newPostName:item.postChangeName,
              userId:item.userId,
              gwtdId:item.gwtdId,
              gwId:item.gwId
            })
          }else{
            isPass = true;
          }
        })

        if(array.length>0){
          if(isPass){
            this.$message.warning("您所选择的数据中存在其他状态的数据，系统已自动忽略!");
          }
        }else{
          this.$message.warning("您所选择的数据中暂无需要转入聘期的数据!");
          return;
        }


        this.$DialogForm.show({
          title: '转入聘期确认',
          width: '50%',
          menuPosition: 'center',
          option: pinqiOption,
          data:{
            dynamic:array
          },
          beforeClose: (done) => {
            done()
          },
          callback: (res) => {
            let putData = [];

            array.map(item=>{
              putData.push({
                rzksny:res.data.startEndTime[0],
                rzjsny:res.data.startEndTime[1],
                bz:res.data.remark,
                gwtdId:item.gwtdId,
                userId:item.userId,
                gwId:item.gwId
              })
            })
            JPConfirmation(putData).then((conf)=>{
              this.$message.success('转入成功!')
              this.getList(this.page)
              res.close();
            })

          }
        });
      }
    },
    //不通过
    handleRefuse(row,bool){
      let array = [];
      let isPass = false;
      if(!bool){
        array.push(row.id);
      }else{
        const tempList = this.$refs.crud.tableSelect;
        if(tempList.length<1){
          this.$message.error("请勾选列表！")
          return;
        }
        tempList.map((item)=>{
          if(item.state=='1' || item.state=='2' || item.state=='4'){
            array.push(item.id)
          }else{
            isPass = true;
          }
        })
      }
      if(array.length>0 && bool){
        if(isPass){
          this.$message.warning("您所选择的数据中存在已结束竞聘状态的数据，系统已自动忽略!");
        }
      }else{
        this.$message.warning("您所选择的数据中暂无需要结束竞聘的数据!");
        return;
      }

      this.$confirm('确认将选中的竞聘者设置为不通过吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return settingRefuse(array)
      }).then(() => {
        this.getList(this.page)
        this.$message.success('设置成功')
      })
    },
    handleSuccess(){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }
      let array = [];
      let isPass = false;
      tempList.map((item)=>{
        if(item.state=="2"){
          array.push({
            jpzName:item.candidateName,
            id:item.id
          })
        }else{
          isPass = true;
        }
      })

      if(array.length>0){
        if(isPass){
          this.$message.warning("您所选择的数据中存在其他状态，系统已自动忽略!");
        }
      }else{
        this.$message.warning("您所选择的数据中暂无需要确认的数据!");
        return;
      }

      this.$DialogForm.show({
        title: '竞聘成功确认',
        width: '50%',
        menuPosition: 'center',
        option: nameListFormOption,
        data:{
          dynamic:array
        },
        beforeClose: (done) => {
          done()
        },
        callback: (res) => {
          let postData = [];
          res.data.dynamic.map((item)=>{
            postData.push({
              id:item.id,
              exactly:item.exactly==0 ? true:false,
            })
          })
          batchSettingConfirm(postData).then(resx=>{
            this.$message.success('操作成功!')
            this.getList(this.page)
            res.close();
          })
        }
      });
    },
    //设置成功确认工作变动
    handleConfirm(row,bool){
      this.$DialogForm.show({
        title: '竞聘成功确认',
        width: '30%',
        menuPosition: 'center',
        option: nameFormOption,
        beforeClose: (done) => {
          done()
        },
        callback: (res) => {
          settingConfirm({
            exactly:res.data.exactly==0 ? true:false,
            id:row.id
          }).then(resx=>{
            this.$message.success('操作成功!')
            this.getList(this.page)
            res.close();
          })
        }
      });

    },
    //设置分数
    handleSet(row){
      if(this.Fraction){
        settingFraction({
          fraction:this.Fraction,
          id:Number.parseInt(row.id)
        }).then(res=>{
          this.$message.success('设置成功!')
          this.getList(this.page)
        })
      }else{
        this.$message.error('请设置分数!')
      }
    },
    getList(page, params) {
      this.listLoading = true
      fetchManageList(Object.assign({}, params, this.searchForm),{
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
  },
}

</script>



<!--
  -    Copyright (c) 2018-2025, sunleon All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: sunleon
  -->

<template>
  <div class="execution">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :data="tableData"
        :table-loading="tableLoading"
        :option="tableOption"
        @on-load="getList"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @row-del="rowDel">
        <template slot-scope="{type,size,row,index}" slot="menu">
          <el-button icon="el-icon-edit" :size="size" v-if="permissions.act_process_manage" @click.native="handlePic(row,index)" :type="type">流程设置</el-button>
<!--          <el-button icon="el-icon-edit" :size="size" v-if="permissions.act_process_manage" @click.native="handleUserSetting(row,index)" :type="type">审核人设置</el-button>-->
          <el-button icon="el-icon-edit" :size="size" v-if="permissions.act_process_manage && row.suspend"  @click.native="handleStatus(row,'active')" :type="type">激活</el-button>
          <el-button icon="el-icon-edit" :size="size" v-if="permissions.act_process_manage && !row.suspend" @click.native="handleStatus(row,'suspend')" :type="type">失效</el-button>
          <el-button icon="el-icon-delete" :size="size" v-if="permissions.act_process_manage" @click.native="handleDel(row,'suspend')" :type="type">删除</el-button>
<!--          <el-dropdown-item-->
<!--            v-if="permissions.act_process_manage"-->
<!--            divided-->
<!--            @click.native="handlePic(scope.row,scope.index)">流程图-->
<!--          </el-dropdown-item>-->
<!--          <el-dropdown-item-->
<!--            v-if="permissions.act_process_manage && scope.row.suspend"-->
<!--            divided-->
<!--            @click.native="handleStatus(scope.row,'active')"-->
<!--          >激活-->
<!--          </el-dropdown-item>-->

<!--          <el-dropdown-item-->
<!--            v-if="permissions.act_process_manage && !scope.row.suspend"-->
<!--            divided-->
<!--            @click.native="handleStatus(scope.row,'suspend')"-->
<!--          >失效-->
<!--          </el-dropdown-item>-->

<!--          <el-dropdown-item-->
<!--            v-if="permissions.act_process_manage"-->
<!--            divided-->
<!--            @click.native="handleDel(scope.row,'suspend')"-->
<!--          >删除-->
<!--          </el-dropdown-item>-->
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog :visible.sync="showPicDialog" title="流程图">
      <div style="width: 100%;text-align: center">
        <img :src="actPicUrl">
      </div>
      <avue-form :option="option1" v-model="obj" @submit="handleSubmit">
      </avue-form>
    </el-dialog>
  </div>
</template>

<script>
  import {delObj, fetchList, status} from '@/api/activiti/process'
  import {settingReviewerOption, tableOption} from '@/const/crud/activiti/process'
  import {mapGetters} from 'vuex'
  import {getActivitiMember, updateActivitiMember} from "@/api/recuit/common/commonApi";

  export default {
    name: 'Process',
    data() {
      return {
        searchForm: {},
        option1:settingReviewerOption,
        obj:{},
        showPicDialog: false,
        actPicUrl: '',
        tableData: [],
        page: {
          total: 0, // 总页数
          currentPage: 1, // 当前页数
          pageSize: 20 // 每页显示多少条
        },
        tableLoading: false,
        tableOption: tableOption,
        openKey:'',//打开的流程key
      }
    },
    created() {
    },
    mounted: function () {
    },
    computed: {
      ...mapGetters(['permissions'])
    },
    methods: {
      //审核人设置
      handleUserSetting(row,index){
        console.log(row)
      },
      getList(page, params) {
        this.tableLoading = true
        fetchList(
          Object.assign(
            {
              descs: 'create_time',
              current: page.currentPage,
              size: page.pageSize
            },
            params,
            this.searchForm
          )
        ).then(response => {
          this.tableData = response.data.data.records
          this.page.total = response.data.data.total
          this.tableLoading = false
        })
      },
      handleSubmit(data,done){
        let postData = {
          publicKey:'',
          publicValue:""
        };

        switch (this.openKey) {
          case 'cailiao_review':
            postData.publicKey = 'ZZCL_REVIEW_USER_NAME';
            break;
          case 'JP_review':
            postData.publicKey = 'ZP_YX_REVIEWER';
            break;
        }

        let array = [];

        data.dynamic.map((item)=>{
          if(item.shr){
            array.push({shr:item.shr})
          }
        })
        if(array.length>0){
          postData.publicValue = JSON.stringify(array);

          updateActivitiMember(postData).then((res)=>{
            this.$message.success("设置成功!")
          }).finally(()=>{
            done();
          })
        }else{
          this.$message.success("审核人不能为空!")
          done();
        }


      },
      handlePic(row) {
        this.openKey = row.key;
        this.actPicUrl =
          `/act/process/resource/` +
          row.deploymentId +
          '/' +
          row.processonDefinitionId +
          '/image';
        let publicKey = "";
        switch (this.openKey) {
          case 'cailiao_review':
            publicKey = 'ZZCL_REVIEW_USER_NAME';
            break;
          case 'JP_review':
            publicKey = 'ZP_YX_REVIEWER';
            break;
        }

        getActivitiMember(publicKey).then((res)=>{
          this.obj = {
            dynamic:JSON.parse(res.data.data)
          };
        })

        this.showPicDialog = true
      },
      handleStatus(row, type) {
        var _this = this
        this.$confirm(
          '是否确认操作ID为"' + row.processonDefinitionId + '"的流程?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(function () {
          return status(row.processonDefinitionId, type)
        }).then(() => {
          this.$message.success('操作成功')
          this.getList(this.page)
        })
      },
      handleDel(row, index) {
        this.$refs.crud.rowDel(row, index)
      },
      rowDel: function (row) {
        this.$confirm(
          '是否确认删除ID为"' + row.deploymentId + '"的模型?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(function () {
          return delObj(row.deploymentId)
        }).then(() => {
          this.$message.success('删除成功')
          this.getList(this.page)
        })
      },
      searchChange(form, done) {
        this.searchForm = form
        this.page.currentPage = 1
        this.getList(this.page, form)
        done()
      },
      refreshChange() {
        this.getList(this.page)
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>


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
          <!-- <el-button icon="el-icon-view" :size="size" :type="type">查看简历</el-button> -->
          <el-button icon="el-icon-view" :size="size" :type="type" :disabled="row.resumeStatus==13 ? false:true" @click="$refs.aduitWindow.show(row)">审核佐证材料</el-button>
          <el-button icon="el-icon-setting" :size="size" :type="type" :disabled="row.resumeStatus==14 ? false:true" @click="handleToInduction(row)">转入入职管理</el-button>
        </template>
      </avue-crud>
      <aduit-window
        ref="aduitWindow"
        @getlist="handleGet"
      />
    </basic-container>
  </div>
</template>



<script>
import {mapGetters} from "vuex";
import {ViaMemberListOption} from "@/views/recruit/endface/viapersonnellist/tableOption";
import {
  fetchMaterialsInfo,
  fetchViaMemberList,
  transferInduction
} from "@/api/recuit/endFace/viaMemberList/viaMemberList";
import {postReviewComments} from "@/api/recuit/common/commonApi";
import aduitWindow from '@/components/recruit-components/aduitwindow/aduitWindow.vue';

export default {
  components: { aduitWindow },
  name:'ViaMemberList',
  data(){
    return {
      tableOption:ViaMemberListOption,
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
    getList(page, params) {
      this.listLoading = true;
      fetchViaMemberList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    handleGet(){
      this.getList(this.page)
    },
    //转入入职
    handleToInduction(row){
      this.$confirm(`确认将应聘者：《${row.candidateName}》正式转为入职人员, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        transferInduction(row.deliveryId).then(re=>{
          this.$message({
            type: 'success',
            message: '成功转入!'
          });
          this.getList(this.page);
        })
      }).catch(() => {
      });
    },
    handleToExamineMaterial(row){

      fetchMaterialsInfo(row.deliveryId).then((fetchRes)=>{
        this.$DialogForm.show({
          title: `佐证材料审核`,
          width: '50%',
          option: MaterialFormOption,
          data: {
            name:row.candidateName,
            resourcesList:fetchRes.data.data.zzzclLbs,
            cjsj:fetchRes.data.data.zzcl.cjsj,
            fzjl:fetchRes.data.data.zzcl.sffz
          },
          beforeClose: (done) => {
            done()
          },
          callback: (res) => {
            // console.log(res.data)
            const postData = {
              taskId:fetchRes.data.data.taskId,
              comment:res.data.remark,
              gwTdId:fetchRes.data.data.zzcl.gwtdId,
              submitFlag:true
            };
            postReviewComments(postData).then((res)=>{

            })
          }
        })
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

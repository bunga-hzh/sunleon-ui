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
        <template slot="menuLeft" slot-scope="{size}">
          <el-button type="primary" @click="handleAdoptArray" :size="size">转入面试预约</el-button>
          <el-button type="danger" @click="handleRefuseArray" :size="size">结束面试</el-button>
        </template>
        <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-edit" :size="size" v-if="row.resumeStatus==8" :type="type" @click="handleScore(row)">评分</el-button>
          <el-button icon="el-icon-view" :size="size" @click="$refs.resumeView.show(row,'current')" :type="type">详情</el-button>
          <el-button icon="el-icon-check" :size="size" v-if="row.resumeStatus==9 && !row.isFinalRound" :type="type" @click="handleAdopt(row)" >转入面试预约({{ row.isNextRoundFinal ? '终面':(Number.parseInt(row.interviewNumber)+1)+'面'}})</el-button>
          <el-button icon="el-icon-check" :size="size" v-if="row.isFinalRound" :type="type" @click="handleFinalPass(row)" >终面通过</el-button>
          <el-button icon="el-icon-close" v-if="row.resumeStatus ==-1 ? false:row.resumeStatus!=11" :size="size" style="color: #F56C6C;" @click="handleRefuse(row)" :type="type">结束面试</el-button>
        </template>
      </avue-crud>
      <resume-view
        ref="resumeView"
        title="简历查看"
        show-view="234"
        menu-view="3"
        @arrange="handleAdopt(arguments[0],arguments[1])"
      />
    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {
  batchEnd,
  batchReservation,
  fetchScoreList,
  finalPass,
  getGradingTeacher,
  postScoreData,
  transferInReserve
} from "@/api/recuit/score/score";
import {scoreFormOption, scoreOption} from "@/views/recruit/score/tableOption";
import resumeView from '@/components/resume/resumeView'
import {examState} from "@/api/recuit/reserve/reserve";
import {delObj} from "@/api/recuit/post/post";

export default {
  name:'Score',
  components:{resumeView},
  data(){
    return {
      tableOption:scoreOption,
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
      ruleForm: {
        name: '',
        mssj:''
      },
      rules: {
        name: [
          { required: true, message: '请输入应聘者姓名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  methods:{
    handleRefuse(row){
      this.$confirm('此操作将结束该应聘者面试, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        examState(row.deliveryId).then(res=>{
          this.getList(this.page, this.form)
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(err=>{
        })
      }).catch(() => { });

    },
    //终面通过
    handleFinalPass(row){
      this.$confirm(`应聘者：《${row.candidateName}》终面通过, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        finalPass({
          deliveryId:row.deliveryId
        }).then(re=>{
          this.$message({
            type: 'success',
            message: '设置成功!'
          });
          this.getList(this.page);
        })
      }).catch(() => {
      });
    },
    getList(page, params) {
      this.listLoading = false;
      fetchScoreList(Object.assign({}, params, this.searchForm),{
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
    //结束面试
    handleRefuseArray(){

      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }

      let array = [];
      let isStatus = false;
      tempList.map((item)=>{
        if(item.resumeStatus!=11 && item.resumeStatus!= -1){
          array.push(item.deliveryId)
        }else{
          isStatus = true;
        }
      })

      if(array.length<1){
        this.$message.warning("所选择的应聘者已处理，无法再次处理!")
        return;
      }else{
        this.$message.warning("所选择的应聘者存在已处理的数据，系统将忽略对应的应聘者!")
      }

      this.$confirm('是否确认结束所选的应聘者?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return batchEnd(array)
      }).then(() => {
        this.getList(this.page)
        this.$message.success('操作成功!')
      })
    },
    //转入面试预约
    handleAdoptArray(){
      const tempList = this.$refs.crud.tableSelect;
      if(tempList.length<1){
        this.$message.error("请勾选列表！")
        return;
      }

      let array = [];
      let isStatus = false;
      tempList.map((item)=>{
        if(item.resumeStatus==9 && !item.isFinalRound && item.resumeStatus!= -1){
          array.push(item.deliveryId)
        }else{
          isStatus = true;
        }
      })

      if(array.length<1){
        this.$message.warning("所选择的应聘者已处理，无法再次处理!")
        return;
      }else{
        this.$message.warning("所选择的应聘者存在已处理的数据，系统将忽略对应的应聘者!")
      }

      batchReservation(array).then(res=>{
        this.$message.success("转入成功!")
        this.getList(this.page)
      })
    },
    //转入预约
    handleAdopt(row) {
      this.$confirm(`确认将应聘者：《${row.candidateName}》转入${ row.isNextRoundFinal ? '终':Number.parseInt(row.interviewNumber)+1}面预约, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        transferInReserve({
          deliveryId:row.deliveryId
        }).then(re=>{
          this.$message({
            type: 'success',
            message: '成功转入!'
          });
          this.getList(this.page);
        })
      }).catch(() => {
      });
    },
    //评分
    handleScore(row) {

      getGradingTeacher(row.deliveryId,row.interviewNumber).then(teacherList => {
        this.$DialogForm.show({
          title: `面试评分`,
          width: '50%',
          option: scoreFormOption,
          data:{
            name:row.candidateName,
            peopleVO:teacherList.data.data
          },
          beforeClose: (done) => {
            done()
          },
          callback:(res)=> {
            const postData = {
              deliveryId:row.deliveryId,
              userId:row.userId,
              reserveId:row.reserveId,
              peopleVO:res.data.peopleVO,
              pflx:res.data.pflx,
              pfbz:res.data.pfbz
            };
            postScoreData(postData).then(resx => {
              res.close();
              this.getList(this.page);
            }).catch((err)=>{
              this.$message.error(JSON.stringify(err))
              res.done();
            })
          }
        });
      })


    }
  }
}

</script>

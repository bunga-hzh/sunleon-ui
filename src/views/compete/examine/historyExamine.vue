<template>
  <div>
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
    </avue-crud>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {examFormOption, examineOption} from "@/views/compete/examine/HistoryExamineOption";
import {
  fetchApplyList,
  fetchDeliverListList, fetchExamineHistory, fetchHistoryExamine,
  getBottomTimelineInfo,
  getLeftFormInfo, getOptionButtton,
  postExamine
} from "@/api/compete/examine";
export default {
  name:'historyExamine',
  data() {
    return{
      activities: [],
      tabIndex:0,
      searchForm: {
        yearTime:new Date().getFullYear()
      }, //搜索条件
      obj:{},//竞聘者表单信息
      option:examFormOption,//竞聘者表单配置项
      centerDialogVisible:false,
      formLabelAlign: {
        userId:'', //用户ID
        name: '', // 竞聘者姓名
        okZy:'', // 通过志愿
        applyTime:'',// 申请时间
        remark:'',//审核意见
        id:'', // 列表ID
      }, //竞聘者配置项
      form: {}, //表单
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      dicData:[], //申请列表数据
      list: [],
      tableOption:examineOption,
      listLoading: true,
      optionFormButton:null, //按钮权限组
      examineHistory:[], //审核记录
    }
  },
  computed: {
    ...mapGetters(['permissions'])
  },
  watch:{
    centerDialogVisible:function (val){
      if(!val){
        this.formLabelAlign = {
          userId:'', //用户ID
          name: '', // 竞聘者姓名
          okZy:'', // 通过志愿
          applyTime:'',// 申请时间
          remark:'',//审核意见
          id:'', // 列表ID
        };
      }
    }
  },
  methods:{
    //提交数据
    handleExamine (type) {
      if(type==1 || type==2){
        if (this.formLabelAlign.okZy==''){
          this.$message.error('请选择通过的岗位!')
          return;
        }
      }
      if(type==3){
        if(this.formLabelAlign.remark.length<1){
          this.$message.error('请填写审核意见!')
          return;
        }
      }
      const postData = {
        comment:this.formLabelAlign.remark, //审核意见
        // postId:this.formLabelAlign.okZy, //通过的岗位ID
        state:type, //审核状态 1通过无需 2通过待竞 3不通过
        userId:this.formLabelAlign.userId, //用户ID
        id:this.formLabelAlign.id, //列表ID
        taskId:this.obj.taskId, //任务ID
        jpTdId:this.formLabelAlign.id, //岗位投递ID
        submitFlag:type, //审核ID
      };
      postExamine(Object.assign(postData,type==3 ? {}:{passedGwId:this.formLabelAlign.okZy})).then(res=>{
        this.$message.success('操作成功!')
        this.getList(this.page)
        this.centerDialogVisible = false;
      })
    },
    //审核
    handleView(row){
      this.listLoading = true;
      this.formLabelAlign.name = row.candidateName; //名称
      this.formLabelAlign.applyTime = row.createTime; //申请时间
      this.formLabelAlign.userId = row.userId;
      this.formLabelAlign.id = row.id;

      fetchApplyList(row.id).then(res=>{
        this.dicData = res.data.data;
      })

      getLeftFormInfo(row.id).then(res=>{

        this.centerDialogVisible = true;
        this.obj = Object.assign(res.data.data,{});
        getOptionButtton(res.data.data.taskId,false).then(optionRes => {
          this.optionFormButton = optionRes.data.data;
          this.formLabelAlign.okZy = optionRes.data.data.passedGwId;
        })

        fetchExamineHistory(row.id).then(res=>{
          this.examineHistory = res.data.data;
        })
      }).catch(err=>{
      }).finally(()=>{
        this.listLoading = false;
      })

      getBottomTimelineInfo(row.id).then(res=>{
        this.activities = res.data.data;
      });
    },
    getList(page, params) {
      this.listLoading = true
      fetchHistoryExamine(Object.assign({},params, this.searchForm),{ current: page.currentPage,
        size: page.pageSize}).then(response => {
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

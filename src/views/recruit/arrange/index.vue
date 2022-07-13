<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :option="tableOption"
        v-model="form"
        :search.sync="searchForm"
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
        <template slot-scope="scope" slot="resumeStatusName">
          <el-tag :type=" scope.row.resumeStatus==6 ? 'warning':'success'">{{scope.row.resumeStatusName}}</el-tag>
        </template>
        <template slot="menuLeft" slot-scope="{size}">
          <el-button type="primary" :size="size" @click="handleAdopt({},1)">面试安排</el-button>
        </template>
         <template slot-scope="{type,size,row}" slot="menu">
          <el-button icon="el-icon-view" :size="size" :type="type" @click="$refs.resumeView.show(row)">查看简历</el-button>
           <el-button icon="el-icon-view" :size="size" v-if="row.resumeStatus==7" :type="type" @click="handleCallBack(row)">撤回安排</el-button>
           <el-button icon="el-icon-back" v-if="row.resumeStatus==-1 && row.jsmsId==1" :size="size" :type="type" @click="handleStopCallBack(row)">撤回结束</el-button>
          <el-button icon="el-icon-check" :size="size" v-if="row.resumeStatus==6" :type="type" @click="handleAdopt(row,0)" >面试安排({{row.interviewNumber}}面)</el-button>
          <el-button icon="el-icon-close" :size="size" v-if="row.resumeStatus!=-1 && row.resumeStatus!=11" style="color: #F56C6C;" @click="handleStop(row)" :type="type">结束面试</el-button>
        </template>
      </avue-crud>
      <resume-view
        ref="resumeView"
        title="简历查看"
        show-view="23"
        menu-view="234"
        @arrange="handleAdopt(arguments[0],arguments[1])"
      />
    </basic-container>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {arrangeOption,formOption} from './tableOption'
import {fetchArrangeList, postArrangeData} from "@/api/recuit/arrange/arrange";
import resumeView from '@/components/resume/resumeView'
import {examState, setCallback, setStopCallBack} from "@/api/recuit/reserve/reserve";
import {getDictByType, getPostNameById} from "@/api/recuit/common/commonApi";

export default {
  name:'Arrange',
  components:{resumeView},
  data(){
    return {
      tableOption:arrangeOption,
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
      gwlxDict:[],//岗位类型
      postDict:[],//岗位名称
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
    handleStopCallBack(row){
      setStopCallBack(row.deliveryId).then(res=>{
        this.getList(this.page);
      })
    },
    handleCallBack(row){
      setCallback(row.reserveId,'return_ap').then(res=>{
        this.getList(this.page);
      })
    },
    //面试结束
    handleStop(row){
      this.$DialogForm.show({
        title: '结束确认',
        width: '50%',
        menuPosition:'right',
        option: {
          submitText: '确认',
          span:24,
          column: [
            {
              label: "发送短信",
              prop: "sms",
              type: 'switch',
              value:0,
            },
            {
              label: "结束消息",
              prop: "msg",
              maxlength:50,
              showWordLimit:true,
              type:'textarea',
              rules: [{
                required: true,
                message: "请输入结束面试消息",
                trigger: "blur"
              }],
            }
          ]
        },
        beforeClose: (done) => {
          done()
        },
        callback:(res)=>{
          examState(row.deliveryId,res.data.msg,1,res.data.sms==0 ? false:true).then(resx=>{
            res.done()
            res.close()
            this.getList(this.page, this.form)
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }).catch(err=>{
          })
        }
      })
    },
    getList(page, params) {
      this.listLoading = false;
      fetchArrangeList(Object.assign({}, params, this.searchForm),{
        current: page.currentPage,
        size: page.pageSize
      }).then(response => {
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false
      })
    },
    //弹出表单
    handleAdopt(row,type){
      if(type==1){
        const tempList = this.$refs.crud.tableSelect;
        if(tempList.length<1){
          this.$message.error("请勾选列表！")
          return;
        }

        let data =[];
        let isStatus = false;
        tempList.map((item)=>{
          if(item.resumeStatus==6){
            data.push({
              name:item.candidateName,
              interviewTime:item.interviewTime,
              wzdz:item.wzdz,
              userId:item.userId, //应聘者ID
              deliveryId:item.deliveryId, //中间表ID
              reserveId:item.reserveId,
            });
          }else{
            isStatus = true;
          }
        })

        if(data.length<1){
          this.$message.warning("所选择的应聘者已处理，无法再次处理!")
          return;
        }else{
          if(data.length != tempList.length){
            this.$message.warning("所选择的应聘者存在已处理的数据，系统将忽略对应的应聘者!")
          }
        }

        this.$DialogForm.show({
          title: `面试安排`,
          width: '80%',
          option: formOption.option,
          data: {
            list:data,
          },
          beforeClose: (done) => {
            done()
          },
          callback: (res) => {
            const postData = [];

            data.map((item)=>{
              postData.push(
                {
                  userId:item.userId, //应聘者ID
                  deliveryId:item.deliveryId, //中间表ID
                  interviewers: res.data.MSG.join(','), //面试官
                  wbInterviewers:res.data.wbInterviewers ? res.data.wbInterviewers.join(','):'',
                  // interviewNumber:row.interviewNumber, //面试轮数
                  reserveId:item.reserveId,
                  remarks:res.data.remarks //备注
                }
              )
            })

            postArrangeData(postData).then(resx => {
              res.close();
              this.getList(this.page);
            }).catch((err)=>{
              this.$message.error(JSON.stringify(err))
              res.done();
            })

          }
        });
      }else{
        this.$DialogForm.show({
          title: `面试安排(${row.interviewNumber}面)`,
          width: '50%',
          option:formOption.option,
          data:{
            list:[{
              name:row.candidateName,
              interviewTime:row.interviewTime,
              wzdz:row.wzdz
            }],
            feedback:row.feedback,
            remark:row.remarks
          },
          beforeClose: (done) => {
            done()
          },
          callback:(res)=>{
            const postData = [{
              userId:row.userId, //应聘者ID
              deliveryId:row.deliveryId, //中间表ID
              interviewers: res.data.MSG.join(','), //面试官
              wbInterviewers:res.data.wbInterviewers ? res.data.wbInterviewers.join(','):'',
              // interviewNumber:row.interviewNumber, //面试轮数
              reserveId:row.reserveId,
              remarks:res.data.remarks //备注
            }];
            postArrangeData(postData).then(resx => {
              res.close();
              this.getList(this.page);
            }).catch((err)=>{
              this.$message.error(JSON.stringify(err))
              res.done();
            })
          }
        });
      }
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

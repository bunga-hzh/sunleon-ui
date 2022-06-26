<template>
  <div style="background-color: #F2F3F5;margin-top: 43px;margin-bottom: 46px;">
    <div class="header_tools">
      <el-button type="primary" v-if="viewInitData.view>0" @click="handleSave">保存合同</el-button>
    </div>
    <div class="main_draft">
      <div class="draft_content">
        <div style="background: #FFF;    font-size: 16pt;
    font-family: Microsoft YaHei;
    margin: 18px;
    padding: 20px 20px 20px 50px;
    font-weight: bold;
    color: black;">
          合同{{viewInitData.view==0 ? '查看': viewInitData.view==1 ? '编辑':'录入'}}
        </div>
      </div>
      <div class="draft_content">
        <el-card class="box_card_draft">
          <div slot="header" class="clearfix">
            <span class="card_header_title">基本信息</span>
          </div>
          <avue-form ref="formBasic" v-model="formData" :option="basicOption"></avue-form>
        </el-card>

        <el-card class="box_card_draft">
          <div slot="header" class="clearfix">
            <span class="card_header_title">合同信息</span>
          </div>
          <avue-form ref="formContract" v-model="formData" :option="contractOption"></avue-form>
        </el-card>

        <el-card class="box_card_draft">
          <div slot="header" class="clearfix">
            <span class="card_header_title">签约方信息</span>
          </div>
          <avue-form ref="formParty" v-model="htQyf" :option="partyOption"></avue-form>
        </el-card>

        <el-card class="box_card_draft" v-if="viewInitData.biaodiwu==1">
          <div slot="header" class="clearfix">
            <span class="card_header_title">标的物信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" v-if="viewInitData.view>1" @click="$refs.excelUpload.show()">导入标的物</el-button>
          </div>
          <avue-form ref="goodsForm" class="goodsForm" v-model="hwqdList" :option="goodsOption">
            <template slot-scope="{row}" slot="total">
              <span>{{row.sl * row.je}}</span>
            </template>
          </avue-form>
        </el-card>



        <el-card class="box_card_draft">
          <div slot="header" class="clearfix">
            <span class="card_header_title">付款约定</span>
          </div>
          <avue-crud class="goodsForm" ref="formPayment" :data="htGlFkydList" :option="payMentOption"></avue-crud>
        </el-card>

        <el-card class="box_card_draft" v-if="viewInitData.view>1">
          <div slot="header" class="clearfix">
            <span class="card_header_title">合同附件</span>
          </div>
          <avue-form ref="htfjRef" v-model="formData" :option="contractFileOption"></avue-form>
        </el-card>

        <el-card class="box_card_draft"  v-if="viewInitData.view>1">
          <div slot="header" class="clearfix">
            <span class="card_header_title">其他附件</span>
          </div>
          <avue-form ref="formFile" v-model="formData" :option="enclosureOption">
          </avue-form>
        </el-card>

      </div>
    </div>
    <excel-upload
      ref="excelUpload"
      title="标的物导入"
      :auto-upload="false"
      url="action"
      temp-name="标的物导入.xls"
      temp-url="/admin/sys-file/res/template/jpgwmb.xls"
      @onChange="handleChange"
    ></excel-upload>
  </div>
</template>

<script>
import basicOption from "@/views/contract/admin/draft/option/basicOption";
import partyOption from "@/views/contract/admin/draft/option/partyOption";
import goodsOption from "@/views/contract/admin/draft/option/goodsOption";
import ExcelUpload from "@/components/upload/excel";
import {remote} from "@/api/admin/dict";
import {findArrayLabel} from "@/util/util";
import paymentOption from "@/views/contract/admin/draft/option/paymentOption";
import contractOption from "@/views/contract/admin/draft/option/contractOption";
import clauseOption from "@/views/contract/admin/draft/option/clauseOption";
import enclosureOption from "@/views/contract/admin/draft/option/enclosureOption";
import {fetchContractInfo, getHtlxInfo, saveObj} from "@/api/contract/admin/admin";
import store from "@/store";
import contractFileOption from "@/views/contract/admin/draft/option/contractFileOption";

export default {
  name:'draft',
  components: { ExcelUpload },
  data(){
    return{
      headers: {
        Authorization: "Bearer " + store.getters.access_token,
      },
      formData:{},
      htQyf:{},//合同签约方
      htGlTkList:{}, //合同条款
      hwqdList:{},//标的物信息
      htGlFkydList:[],// 付款条件
      basicOption:basicOption, //基本信息
      contractOption:contractOption, //合同信息
      partyOption:partyOption, //签约方信息
      goodsOption:goodsOption, //标的物
      clauseOption:clauseOption,//条款信息
      payMentOption:paymentOption, //付款约定
      enclosureOption:enclosureOption, //附件
      contractFileOption:contractFileOption, //合同附件
      goodsDataList:[], //类型数据
      viewInitData:{
        view:0, //0:查看，1:修改,2=录入
        lxId:'', //选择编辑的类型ID
        biaodiwu:0, // 0:不显示，1：显示
        id:'', //处理编辑时展示id
      }, //初始化参数
      templateData:{}, //合同模板信息
    }
  },
  created() {
    const params = JSON.parse(decodeURIComponent(this.$route.query.params));
    if(this.$route.params.id=='draft'){
      this.viewInitData = params;
    }else {

      this.viewInitData = params;
      if(this.$route.params.id){
        this.getDartInfo(this.$route.params.id);
      }
    }

    setTimeout(()=>{
      this.getHTlxType(this.viewInitData.lxId);
      if(params.view==0){
        this.basicOption['detail'] = true;
        this.contractOption['detail'] = true;
        this.partyOption['detail'] = true;
        this.goodsOption['detail'] = true;
        this.clauseOption['detail'] = true;
        this.payMentOption['detail'] = true;
        this.enclosureOption['detail'] = true;
        this.contractFileOption['detail'] = true;
      }
      remote('contract_goods_type').then(res=>{
        this.goodsDataList = res.data.data;
      })
    },700)
  },
  methods:{
    getHTlxType(htlxId){
      getHtlxInfo(htlxId).then(res=>{
        const p = res.data.data;
        this.templateData = p;
        if(p.xshwnr==1){
          this.viewInitData.biaodiwu = 1;
        }else{
          this.viewInitData.biaodiwu = 0;
        }
      })
    },
    handleFileChange(response,file){
      this.formData.fjxx.push({value:response.data.url,name:response.data.originalName,res_id:response.data.res_id});
    },
    //保存合同
    handleSave(){
      this.$refs.formBasic.validate(formBasic=>{
        if(formBasic){
          this.$refs.formContract.validate((formContract)=>{
            if(formContract){
              this.$refs.formParty.validate((formParty)=>{
                if(formParty){
                  if(this.formData.htfjId && this.formData.htfjId.length>0){
                    this.formData.htQyf = this.htQyf;
                    this.formData.htGlFkydList = this.htGlFkydList;
                    this.formData.hwqdList = this.hwqdList['hwqdList'];
                    this.formData.htGlTkList = this.htGlTkList['htGlTkList'];
                    if(this.formData.htqzrq){
                      this.formData.htqzrq = JSON.stringify(this.formData.htqzrq);
                    }
                    if(this.viewInitData.biaodiwu==1){
                      if(this.formData.hwqdList && this.formData.hwqdList.length>0){
                        //当为新增时增加合同类型ID
                        if(this.viewInitData.view==2){
                          this.formData['htlx'] = this.viewInitData.lxId;
                        }

                        saveObj(this.formData).then(res=>{
                          this.$notify({
                            type:'success',
                            message:'保存成功!'
                          })
                        })
                      }else{
                        this.$message({
                          type:'warning',
                          message:'请填写标的物信息!'
                        })
                      }
                    }else{
                      //当为新增时增加合同类型ID
                      if(this.viewInitData.view==2){
                        this.formData['htlx'] = this.viewInitData.lxId;
                      }
                      saveObj(this.formData).then(res=>{
                        this.$notify({
                          type:'success',
                          message:'保存成功!'
                        })
                      })
                    }
                  }else{
                    this.$message({
                      type:'warning',
                      message:'请上传合同附件!'
                    })
                  }
                }else{
                  this.$message({
                    type:'warning',
                    message:'请完整填写签约方信息!'
                  })
                }
              })
            }else{
              this.$message({
                type:'warning',
                message:'请完整填写合同信息!'
              })
            }
          })
        }else{
          this.$message({
            type:'warning',
            message:'请完整填写基本信息!'
          })
        }
      })
    },
    getDartInfo(id){ // 获取合同信息
      fetchContractInfo(id).then(res=>{
        let data = res.data.data;
        if(data.htQyf){
          this.htQyf = data.htQyf;
        }

        this.getHTlxType(data.htlx);

        if(data.htqzrq){
          data.htqzrq = JSON.parse(data.htqzrq);
        }

        this.htGlFkydList = data.htGlFkydList;
        this.hwqdList['hwqdList'] = data.hwqdList;
        this.htGlTkList['htGlTkList'] = data.htGlTkList;
        data.fjxx = JSON.parse(data.fjxx);
        data.htfjId = JSON.parse(data.htfjId);
        this.formData = data;
      })
    },
    handleChange(file, fileLis){
      this.$Export.xlsx(file.raw)
        .then(data => {
          const array = data.results;
          let goodsList = [];
          array.map(item=>{
            goodsList.push({
              hwmc:item['标的物名称(*)'],
              hwxh:item['型号规格(*)'],
              hwdw: findArrayLabel(this.goodsDataList,item['单位(*)']),
              hwsl:item['数量(*)'],
              hwdj:item['单价(*)'],
              gdzc:item['固定资产(*)']=='是' ? 0:1
            });
          })
          this.$refs.goodsForm.form.bdwList = this.$refs.goodsForm.form.bdwList.concat(goodsList);
        })
    }
  }
}
</script>


<style scoped>
.header_tools{
  height: 42px;
  background: transparent;
  border-bottom: 0;
  border-bottom: 1px solid #d7d7d7;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  text-align: right;
  line-height: 38px;
  padding-right: 60px;
  box-shadow: 0 0 3px rgba(0,0,0,0.06);
}

.main_draft{
  height: calc(100vh - 46px);
  padding-top: 10px;
  overflow: auto;
}

.draft_content{
  width: 90%;
  min-width: 980px;
  max-width: 1200px;
  margin: 0px auto;
  /*background-color: #FFF;*/
}
</style>

<style>
.box_card_draft{
  margin: 18px;
}
.box_card_draft .el-card__header {
  font-size: 14px;
  font-weight: 500;
  height: auto;
  padding: 14px 30px;
  border: 0px;
  background: #f7f9fd;
}

.box_card_draft .el-card__header .card_header_title {
  border-left-width: 3px;
  border-left-style: solid;
  border-left-color: #65c7a3;
  vertical-align: middle;
  word-wrap: break-word;
  word-break: break-word;
  text-align: left;
  padding-left: 16px;
}


.goodsForm .avue-form__row{
  padding: 0px !important;
}

</style>

<template>
  <div class="execution">
    <basic-container>
        <el-collapse v-model="collapseArray">
            <el-collapse-item v-for="(item,index) in list" :key="index" :name="index">
                <template slot="title">
                    <i class="header-icon el-icon-star-on" style="color:#56BF99"></i>{{item.htlxMc}}
                </template>
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(childItem,indexx) in item.children" :key="indexx+'_child'">
                        <el-card shadow="hover" class="type_select_item" @click.native="handleOpen(childItem)">
                            {{childItem.htlxMc}}
                        </el-card>
                    </el-col>
                </el-row>
            </el-collapse-item>
        </el-collapse>
<!--      <excel-upload-->
<!--        ref="excelUpload"-->
<!--        title="采购表导入"-->
<!--        :url="'/act/htGl/contractImport?htlxId='+id"-->
<!--        temp-name="采购表模板.xlsx"-->
<!--        temp-url="/admin/sys-file/get_file?bucket=res&fileName=template/合同导入模版.xlsx"-->
<!--        :temp-contract-url="WjDz"-->
<!--        down-load-text="采购表"-->
<!--        :temp-contract-name="wjMc"-->
<!--        @refreshDataList="handleRefreshChange"-->
<!--        @onClose="id=''"-->
<!--      ></excel-upload>-->
    </basic-container>
  </div>
</template>

<script>
import {fetchList} from '@/api/contract/basic/typeManager'
import ExcelUpload from "@/components/upload/excel";
export default {
  name: "draftView",
  components:{ExcelUpload},
  data() {
    return {
      list:[],
      collapseArray:[],
      id:'', //接口ID
      WjDz:'',
      wjMc:'',
    };
  },
  created(){
    this.getList()
  },
  methods: {
    handleRefreshChange() {

    },
    handleOpen(item){
      const{ href } = this.$router.resolve({
        path:"/contract/edit/draft",
        query:{
          params:encodeURIComponent(JSON.stringify({
            view:2,
            lxId:item.id,
            id:''
          }))
        }});
      window.open(href, "_blank");
    },
    getList() {
      fetchList({
        current: 1,
        size: 1000,
      }).then((response) => {
          this.list = response.data.data.records;
          this.list.map((item,index)=>{
            this.collapseArray.push(index);
          })
      });
    },
  },
};
</script>



<style>
.type_select_item{
    cursor: pointer !important;
}
</style>

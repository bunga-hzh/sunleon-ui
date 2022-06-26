<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :table-loading="listLoading"
        :data="data"
        :option="option"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @on-load="getList"
      ></avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {getJpTDReort} from "@/api/recuit/common/commonApi";

export default {
  name: "delivery",
  data(){
    return {
      data:[],
      searchForm: {
        yearTime:new Date().getFullYear(),
      }, //搜索条件
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 1, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      listLoading: false,
      option: {
        filterParams: ['yearTime'],
        menu:false,
        index:true,
        indexLabel:'序号',
        align:'center',
        addBtn:false,
        selection: true,
        border: true,
        excelBtn:true,
        column: [
          {
            label: '所在部门',
            prop: 'bm'
          },
          {
            label: '姓名',
            prop: 'xm'
          },
          {
            label: '原职务',
            prop: 'yzw'
          },
          {
            label: '意向一',
            prop: 'yxy',
            formatter:(val,value,label)=>{
              return val.yxy ? val.yxy:'无'
            }
          },
          {
            label: '意向二',
            prop: 'yxr',
            formatter:(val,value,label)=>{
              return val.yxr ? val.yxr:'无'
            }
          },
          {
            label: '意向三',
            prop: 'yxs',
            formatter:(val,value,label)=>{
              return val.yxs ? val.yxs:'无'
            }
          },
          {
            label: '备注',
            prop: 'bz'
          },
          {
            label: '日期',
            prop: 'yearTime',
            search: true,
            viewDisplay:false,
            searchTitle: '日期',
            searchValue: new Date().getFullYear()+"",
            type: 'year',
            format: 'yyyy年',
            valueFormat: 'yyyy',
            editDisplay: false,
            addDisplay: false,
            editDisabled: true,
            showColumn: false,
            hide:true,
            span: 24
          },
        ]
      },

    }
  },
  methods:{
    getList(params) {
      this.listLoading = true;
      getJpTDReort(Object.assign(this.searchForm)).then(response=>{
        this.listLoading = false;
        this.data = response.data.data;
      })
    },
    searchChange(form, done) {
      this.getList(form)
      done()
    },
    refreshChange() {
      this.getList(this.searchForm)
    },
  }
}
</script>

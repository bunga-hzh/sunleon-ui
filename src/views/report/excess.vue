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
import {getJpExcessTDReort} from "@/api/recuit/common/commonApi";

export default {
  name: "excess",
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
            label: '岗位',
            prop: 'gw'
          },
          {
            label: '人员',
            prop: 'ry'
          },
          {
            label: '绩点',
            prop: 'jd'
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
      getJpExcessTDReort(Object.assign(this.searchForm)).then(response=>{
        this.listLoading = false;
        const s = response.data.data;
        s.map((item,index)=>{
          s[index].ry = item.ry.toString()
        })

        this.data = s;
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

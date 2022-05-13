<template>
  <div class="post">
    <basic-container>
      <avue-crud
        ref="crud"
        :page.sync="page"
        :table-loading="listLoading"
        :data="data"
        :option="option"
        :span-method="arraySpanMethod"
        @search-change="searchChange"
        @refresh-change="refreshChange"
        @size-change="sizeChange"
        @current-change="currentChange"
        @on-load="getList"
      ></avue-crud>
    </basic-container>
  </div>
</template>

<script>
import {getFinalScore} from "@/api/recuit/common/commonApi";

export default {
  name: "finalScore",
  data(){
    return {
      data:[],
      searchForm: {
      }, //搜索条件
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 1, // 每页显示多少条,
        isAsc: false// 是否倒序
      },
      listLoading: false,
      spanArr:[],
      key:['bm','me'],
      needMergeArr: ['bm', 'me'], // 有合并项的列
      rowMergeArrs: {}, // 包含需要一个或多个合并项信息的对象
      option: {
        menu:false,
        index:true,
        indexLabel:'序号',
        align:'center',
        addBtn:false,
        border: true,
        column: [
          {
            label: '部门',
            prop: 'bm'
          },
          {
            label: '名额',
            prop: 'me'
          },
          {
            label: '姓名',
            prop: 'name'
          },
          {
            label: '日期',
            prop: 'yearTime',
            search: true,
            viewDisplay:false,
            searchTitle: '日期',
            type: 'date',
            format: 'yyyy年MM月dd日',
            valueFormat: 'yyyy-MM-dd',
            searchValue: new Date()+"",
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
    getList(page, params) {
      this.listLoading = true;
      getFinalScore(Object.assign({
        current: page.currentPage,
        size: page.pageSize}
        , params, this.searchForm)).then(response => {
          // console.log(response.data.data.total)
        this.list = response.data.data.records
        this.page.total = response.data.data.total
        this.listLoading = false;

        let option = [];

        this.data = response.data.data.records;

        if(response.data.data.records.length>0){
          const cacheOption = response.data.data.records[0].hrRealNames;
          for (var val in cacheOption) {
            option.push({
              label: cacheOption[val],
              prop: val
            });
          }
        }
        option.push({
          label: '最终得分',
          prop: 'fs'
        });
        this.option.column = this.option.column.concat(option);
        this.rowMergeArrs = this.rowMergeHandle(this.needMergeArr, this.data); // 处理数据
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
    rowspan() {
      this.spanArr=[];
      this.position=0;
      this.data.forEach((item,index)=>{
        if(index===0){
          this.spanArr.push(1)
          this.position=0;
        }else{
          if(this.data[index][this.key[0]]===this.data[index-1][this.key[0]]){
            this.spanArr[this.position] +=1;
            this.spanArr.push(0)
          }else{
            this.spanArr.push(1)
            this.position=index
          }
        }
      })
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (column.property == [this.key[0]]) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    /**
     * @description 实现合并行或列
     * @param row:Object 需要合并的列name 如:'name' 'id'
     * @param column:Object 当前行的行数，由合并函数传入
     * @param rowIndex:Number 当前列的数据，由合并函数传入
     * @param columnIndex:Number 当前列的数据，由合并函数传入
     *
     * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
     * 参考地址：https://element.eleme.cn/#/zh-CN/component/table#table-biao-ge
     */
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // 没办法循环判断具体是那一列 所以就只好写了多个if
      if (column.property === 'bm') return this.mergeAction('bm', rowIndex, column);
      if (column.property === 'me') return this.mergeAction('me', rowIndex, column);
    },
    /**
     * @description 根据数组来确定单元格是否需要合并
     * @param val:String 需要合并的列name 如:'name' 'id'
     * @param rowIndex:Number 当前行的行数，由合并函数传入
     * @param colData:Object 当前列的数据，由合并函数传入
     *
     * @return 返回值为一个数组表示该单元格是否需要合并; 说明: [0,0]表示改行被合并了 [n+,1]n为1时表示该单元格不动,n大于1时表示合并了N-1个单元格
     */
    mergeAction(val, rowIndex, colData) {
      let _row = this.rowMergeArrs[val].rowArr[rowIndex];
      let _col = _row > 0 ? 1 : 0;
      return [_row, _col];
    },
    /**
     * @description 根据数组将指定对象转化为相应的数组
     * @param arr:Array[String] 必填 必须是字符串形式的数组
     * @param data:Array 必填 需要转化的对象
     *
     * @return 返回一个对象
     * 例：rowMerge(['name','value'], [{value:'1', name:'小明'}, {value:'2', name:'小明'}, {value:'3', name:'小明'}, {value:'1', name:'小明'}, {value:'1', name:'小明'}])
     * 返回值: {
     *          name:{
     *            rowArr: [5, 0, 0, 0, 0]
     *            rowMergeNum: 0,
     *          },
     *          value: {
     *            rowArr: [1, 1, 1, 2, 0],
     *            rowMergeNum: 3
     *          }
     *        }
     */
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        };
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      return needMerge;
    }
  }
}
</script>

<style scoped>

</style>

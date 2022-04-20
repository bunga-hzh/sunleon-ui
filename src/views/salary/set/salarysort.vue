<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
    >
      <template slot="menu" slot-scope="scope">
        <el-button type="text" icon="el-icon-view" @click="view(scope.row)"
          >查看详情</el-button
        >
        <el-button type="text" icon="el-icon-edit" @click="edit(scope.row)"
          >修改</el-button
        >
      </template>
    </avue-crud>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="60%">
      <el-form ref="formRef" :model="form" label-width="80px">
        <el-form-item label="编码">
          <el-input v-model="form.bm"></el-input>
        </el-form-item>
        <el-form-item label="类型名称">
          <el-input v-model="form.lxmc"></el-input>
        </el-form-item>
        <el-form-item label="发放时间">
          <el-date-picker
            v-model="form.ffsj"
            type="date"
            format="dd 日"
            value-format="dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
            v-model="form.ms"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <el-row>
        <table>
          <tr>
            <th>
              <span>{{ titleName }}</span>
              <span></span>
            </th>
          </tr>
          <tr>
            <td>
              <avue-crud
                :data="dataChild"
                :option="optionChild"
                @row-save="rowSaveChild"
              ></avue-crud>
            </td>
          </tr>
        </table>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  option,
  optionChild,
  dataChilds,
} from "@/const/crud/salary/set/salarysort";

export default {
  data() {
    return {
      data: [
        {
          id: 1,
          bm: "GJGZ",
          lxmc: "国家工资",
          ffsj: "5号",
          ms: "这是一段信息",
        },
        {
          id: 2,
          bm: "XNJJ",
          lxmc: "校内奖金",
          ffsj: "15号",
          ms: "这是一段信息",
        },
        {
          id: 3,
          bm: "LXFF",
          lxmc: "零星发放",
          ffsj: "25号",
          ms: "这是一段信息",
        },
        {
          id: 4,
          bm: "BDSFF",
          lxmc: "不定时发放",
          ffsj: "未知",
          ms: "这是一段信息",
        },
      ],
      option: option,
      search: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },

      dialogVisible: false,
      dialogTitle: undefined,

      form: {
        bm: undefined,
        fflx: undefined,
        ffsj: undefined,
        ms: undefined,
      },

      dataChild: undefined,
      optionChild: optionChild,

      titleName: undefined,

      dataChilds: dataChilds,
    };
  },
  methods: {
    add() {
      this.dialogVisible = true;
      this.dialogTitle = "添加";
    },
    view(row) {
      this.dialogVisible = true;
      this.dialogTitle = "查看详情";
      this.form = row;
      this.titleName = row.lxmc;
      this.dataChild = this.dataChilds[row.$index];
    },
    edit(row) {
      console.log(row);
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      this.form = row;
      this.titleName = row.lxmc;
    },
    rowSaveChild(form, done, loading) {
      done(form);
    },
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  line-height: 40px;
  border: #eee solid 1px;
  th {
    padding-left: 5px;
    background-color: #56bf99;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    color: #ffffff;
    .title {
      font-size: 16px;
      font-family: Medium;
    }
  }
  td {
    padding-left: 5px;
    font-size: 14px;
    font-family: Base;
    position: relative;
  }
}
</style>

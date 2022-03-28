<template>
  <div class="notice_container">
    <basic-container>
      <avue-crud
        :data="data"
        :option="option"
        :search.sync="search"
        :page.sync="page_notice"
      >
        <template slot="menu">
          <el-button type="text">撤稿</el-button>
          <el-button type="text">查看</el-button>
        </template>
        <template slot="menuLeft">
          <el-button type="primary" @click="openDialog">添加</el-button>
          <!-- 添加对话框 -->
        </template>
      </avue-crud>
    </basic-container>
    <el-dialog
      title="新增"
      @open="createEditer"
      :visible.sync="dialogVisible_add"
      width="60%"
      class="avue-dialog"
      :dialogFullscreen="true"
    >
      <el-form
        ref="form"
        :rules="rules"
        size="small "
        :model="form"
        label-width="120px"
      >
        <el-form-item label="消息类型" prop="type">
          <el-radio v-model="form.type" label="1">通知公告</el-radio>
          <el-radio v-model="form.type" label="2">系统消息</el-radio>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入摘要"
            v-model="form.summary"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="截至日期" prop="up_by_time">
          <el-date-picker
            v-model="form.up_by_time"
            type="date"
            placeholder="请选择结束时间"
            style="width: 100%"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="接受用户" prop="user_type">
          <el-radio v-model="form.user_type" label="1">指定用户</el-radio>
          <el-radio v-model="form.user_type" label="2">全体用户</el-radio>
        </el-form-item>
        <el-form-item
          label="指定用户"
          prop="user_type"
          v-show="form.user_type === '1'"
        >
          <el-row :gutter="20">
            <el-col :span="20">
              <el-select
                ref="select"
                size="small"
                style="width: 100%"
                v-model="form.uids"
                multiple
                placeholder="请选择指定用户"
                clearable
              >
                <el-option
                  v-for="item in selectUserOptions"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid"
                >
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="selectUser"
                >选择</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="优先级">
          <el-radio v-model="form.priority" label="1">低</el-radio>
          <el-radio v-model="form.priority" label="2">中</el-radio>
          <el-radio v-model="form.priority" label="3">高</el-radio>
        </el-form-item>
        <el-form-item label="内容">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="primary">保存并提交</el-button>
      </span>
    </el-dialog>
    <!-- 选择指定用户对话框 -->
    <el-dialog
      title="用户选择"
      append-to-body
      :visible.sync="dialogVisible_select"
      width="80%"
      class="avue-dialog"
      @open="clearSelectData"
      @close="clearCheck"
    >
      <el-row :gutter="20">
        <el-col :span="17">
          <avue-crud
            ref="crud"
            :option="selectUserOption"
            :search.sync="selectUserSearch"
            :data="selectUserData"
            :page.sync="page_user"
            @row-click="handleRowClick"
            @selection-change="selectionChange"
          >
            <template slot="depSearch">
              <el-select v-model="selectUserSearch.dep" placeholder="请选择">
                <el-option
                  v-for="item in depOptions"
                  :key="item.id"
                  :label="item.depName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </template>
          </avue-crud>
        </el-col>
        <el-col :span="6">
          <p>已选用户</p>
          <avue-crud
            :option="selectOption"
            :data="selectData"
            @row-del="delRowSelect"
          >
          </avue-crud>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_select = false">取 消</el-button>
        <el-button type="primary" @click="getSelectUids">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";
import {
  data,
  option,
  rules,
  selectUserOption,
  selectUserData,
  depOptions,
  selectOption,
  selectUserOptions,
} from "@/const/crud/admin/notice";

export default {
  name: "Notice",
  data() {
    return {
      form: {
        type: "1",
        title: undefined,
        summary: undefined,
        up_by_time: undefined,
        user_type: "2",
        uids: [],
        priority: "3",
        userId: undefined,
      },
      // 控制添加对话框的显示与隐藏
      dialogVisible_add: false,
      // 控制选择用户对话框的显示与隐藏
      dialogVisible_select: false,
      search: {
        title: "",
      },
      data: data,
      option: option,
      rules: rules,
      selectUserOption: selectUserOption,
      selectUserData: selectUserData,
      selectUserSearch: {
        uid: undefined,
        name: undefined,
        dep: undefined,
      },
      depOptions: depOptions,
      selectOption: selectOption,
      selectData: [],
      selectList: [],
      isEdit: true,
      selectUserOptions: [],
      page_notice: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
      page_user: {
        total: 1000,
        currentPage: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible_add = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    // 提交
    submit() {
      this.dialogVisible_add = false;
    },
    selectUser() {
      this.dialogVisible_select = true;
      this.selectData = [];
      this.selectUserOptions = selectUserOptions;
    },
    selectionChange(row) {
      console.log(row);
      this.selectData = [];
      row.forEach((item) => {
        const obj = {};
        obj.uid = item.uid;
        obj.name = item.name;
        this.selectData.push(obj);
      });
    },
    handleRowClick(row) {
      this.$refs.crud.toggleSelection([this.selectUserData[row.$index]]);
    },
    delRowSelect(row) {
      console.log(row);
    },
    getSelectUids() {
      this.dialogVisible_select = false;
      const uids = [];
      this.selectData.forEach((item) => {
        uids.push(item.uid);
      });
      this.form.uids = uids;
    },
    createEditer() {
      this.$nextTick(() => {
        if (this.isEdit) {
          const editor = new E("#editor");
          editor.create();
          this.isEdit = false;
        }
      });
    },
    clearSelectData() {
      this.selectData = [];
    },
    clearCheck() {
      this.$refs.crud.toggleSelection();
    },
  },
};
</script>

<style scoped>
#editor {
  width: 100%;
}
</style>

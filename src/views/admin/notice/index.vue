<template>
  <div class="notice_container">
    <basic-container>
      <avue-crud :data="data" :option="option" :search.sync="search">
        <template slot="menu">
          <el-button type="text">撤稿</el-button>
          <el-button type="text">查看</el-button>
        </template>
        <template slot="menuLeft">
          <el-button type="primary" @click="openDialog">添加</el-button>
        </template>
      </avue-crud>
    </basic-container>
    <!-- 添加对话框 -->
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
                size="small"
                style="width: 100%"
                v-model="form.uids"
                multiple
                placeholder="请选择指定用户"
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
      @close="getSelectUids"
    >
      <el-row :gutter="20">
        <el-col :span="17">
          <avue-crud
            ref="crud"
            :option="selectUserOption"
            :search.sync="selectUserSearch"
            :data="selectUserData"
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
        <el-button type="primary" @click="dialogVisible_select = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import E from "wangeditor";

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
      data: [
        {
          title: "测试",
          notice_type: "通知公告",
          publisher: "张三",
          priority: "高",
          notice_obj: "全体用户",
          pub_status: "已发布",
          pub_time: "2022-03-26 11:51:10",
          revoke_time: "",
        },
        {
          title: "测试",
          notice_type: "通知公告",
          publisher: "张三",
          priority: "高",
          notice_obj: "全体用户",
          pub_status: "已发布",
          pub_time: "2022-03-26 11:51:10",
          revoke_time: "",
        },
      ],
      option: {
        addBtn: false,
        delBtn: false,
        editBtn: false,
        align: "center",
        searchMenuSpan: 4,
        border: true,
        column: [
          {
            label: "标题",
            prop: "title",
            search: true,
          },
          {
            label: "消息类型",
            prop: "notice_type",
          },
          {
            label: "发布人",
            prop: "publisher",
          },
          {
            label: "优先级",
            prop: "priority",
          },
          {
            label: "通告对象",
            prop: "notice_obj",
          },
          {
            label: "发布状态",
            prop: "pub_status",
          },
          {
            label: "发布时间",
            prop: "pub_time",
            width: 150,
          },
          {
            label: "撤销时间",
            prop: "revoke_time",
            width: 150,
          },
        ],
      },
      rules: {
        type: [{ required: true, message: "选择消息类型" }],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        summary: [{ required: true, message: "请输入摘要", trigger: "blur" }],
        up_by_time: [{ required: true, message: "请选择结束时间" }],
        user_type: [{ required: true, message: "请选择结束用户" }],
        user_type: [{ required: true, message: "请选择指定用户" }],
      },
      selectUserOption: {
        searchMenuSpan: 6,
        addBtn: false,
        border: true,
        menu: false,
        selection: true,
        column: [
          {
            label: "教职工号",
            prop: "uid",
            search: true,
          },
          {
            label: "姓名",
            prop: "name",
            search: true,
          },
          {
            label: "部门",
            prop: "dep",
            search: true,
            searchslot: true,
          },
        ],
      },
      selectUserData: [
        {
          uid: "123",
          name: "张三",
          dep: "部门一",
        },
        {
          uid: "456",
          name: "李四",
          dep: "部门一",
        },
        {
          uid: "789",
          name: "王五",
          dep: "部门一",
        },
      ],
      selectUserSearch: {
        uid: undefined,
        name: undefined,
        dep: undefined,
      },
      depOptions: [
        {
          id: "1",
          depName: "部门一",
        },
        {
          id: "2",
          depName: "部门二",
        },
        {
          id: "3",
          depName: "部门三",
        },
      ],
      selectOption: {
        menuWidth: 100,
        addBtn: false,
        columnBtn: false,
        refreshBtn: false,
        editBtn: false,
        border: true,
        column: [
          {
            label: "姓名",
            prop: "name",
          },
        ],
      },
      selectData: [],
      selectList: [],
      isEdit: true,
      selectUserOptions: [
        {
          uid: 123,
          name: "张三",
        },
        {
          uid: 456,
          name: "李四",
        },
        {
          uid: 789,
          name: "王五",
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialogVisible_add = true;
    },
    // 提交
    submit() {
      this.dialogVisible_add = false;
    },
    selectUser() {
      this.dialogVisible_select = true;
      this.selectData = [];
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
      console.log(this.selectData);
      this.selectData.forEach((item) => {
        const obj = {};
        obj.uid = item.uid;
        obj.name = item.name;
        console.log("aaa");
        console.log(obj);
        this.form.uids.push(obj);
        console.log(this.form.uids[0]);
        // debugger;
      });
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
  },
};
</script>

<style scoped>
#editor {
  width: 100%;
}
</style>

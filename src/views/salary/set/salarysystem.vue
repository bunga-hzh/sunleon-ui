<template>
  <basic-container>
    <avue-crud
      :data="data"
      :option="option"
      :search.sync="search"
      :page.sync="page"
      v-model="form"
    >
      <template slot="menuLeft">
        <el-button type="primary" icon="el-icon-plus" @click="add"
          >添加</el-button
        >
      </template>
      <template slot="menu">
        <el-button type="text" icon="el-icon-view" @click="add"
          >查看详情</el-button
        >
      </template>
      <template slot="sygwSearch">
        <el-select v-model="search.sygw" placeholder="请选择" clearable>
          <el-option
            v-for="item in sygwOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="syztSearch">
        <el-select v-model="search.syzt" placeholder="请选择" clearable>
          <el-option
            v-for="item in syztOptions"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </template>
      <template slot="sygw" slot-scope="scope">
        <span v-if="scope.row.sygw === '1'">专业技术人员</span>
        <span v-else-if="scope.row.sygw === '2'">管理人员</span>
        <span v-else-if="scope.row.sygw === '3'">普教教师</span>
        <span v-else-if="scope.row.sygw === '4'">工人</span>
        <el-tag v-else type="danger">错误，请联系管理员</el-tag>
      </template>
      <template slot="syzt" slot-scope="scope">
        <el-tag v-if="scope.row.syzt === '1'" type="success">启用</el-tag>
        <el-tag v-else-if="scope.row.syzt === '2'" type="warning">停用</el-tag>
        <el-tag v-else type="danger">错误，请联系管理员</el-tag>
      </template>
    </avue-crud>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisible_add"
      width="60%"
      class="avue-dialog"
    >
      <table>
        <tr>
          <th>
            <span class="title">添加工资体系</span>
            <span></span>
          </th>
        </tr>
        <tr>
          <td>
            <el-form ref="form" :model="form" label-width="80px">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="体系名称">
                    <el-input v-model="form.txmc"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="适用岗位">
                    <el-select
                      v-model="form.sygw"
                      placeholder="请选择"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in sygwOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="使用状态">
                    <el-radio-group v-model="form.syzt">
                      <el-radio :label="247">启用</el-radio>
                      <el-radio :label="248">停用</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="描述">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      placeholder="请输入内容"
                      v-model="form.ms"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </td>
        </tr>
        <tr>
          <th>
            <span class="title">国家工资</span>
            <span
              ><el-button type="primary" @click="openChildDialog('gjgz')"
                >添加</el-button
              ></span
            >
          </th>
        </tr>
        <tr>
          <td>
            <el-row>
              <el-tag
                v-for="tag in gjgzList"
                :key="tag.zdbh"
                closable
                type="primary"
                @close="removeItem('gjgz', tag)"
              >
                {{ tag.gzxmc }}
              </el-tag>
            </el-row>
          </td>
        </tr>
        <tr>
          <th>
            <span class="title">校内工资</span>
            <span
              ><el-button type="primary" @click="openChildDialog('xngz')"
                >添加</el-button
              ></span
            >
          </th>
        </tr>
        <tr>
          <td>
            <el-row>
              <el-tag
                v-for="tag in xngzList"
                :key="tag.zdbh"
                closable
                type="primary"
                @close="removeItem('xngz', tag)"
              >
                {{ tag.gzxmc }}
              </el-tag>
            </el-row>
          </td>
        </tr>
        <tr>
          <th>
            <span class="title">零星发放</span>
            <span
              ><el-button type="primary" @click="openChildDialog('lxff')"
                >添加</el-button
              ></span
            >
          </th>
        </tr>
        <tr>
          <td>
            <el-row>
              <el-tag
                v-for="tag in lxffList"
                :key="tag.zdbh"
                closable
                type="primary"
                @close="removeItem('lxff', tag)"
              >
                {{ tag.gzxmc }}
              </el-tag>
            </el-row>
          </td>
        </tr>
        <tr>
          <th>
            <span class="title">不定时发放</span>
            <span
              ><el-button type="primary" @click="openChildDialog('bdsff')"
                >添加</el-button
              ></span
            >
          </th>
        </tr>
        <tr>
          <td>
            <el-row>
              <el-tag
                v-for="tag in bdsffList"
                :key="tag.zdbh"
                closable
                type="primary"
                @close="removeItem('bdsff', tag)"
              >
                {{ tag.gzxmc }}
              </el-tag>
            </el-row>
          </td>
        </tr>
      </table>
      <span slot="footer">
        <el-button @click="dialogVisible_add = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible_child"
      width="60%"
      append-to-body
    >
      <avue-crud
        ref="crudChildRef"
        :data="childData"
        :option="childOption"
        :page.sync="childPage"
        @selection-change="selectionChange"
      ></avue-crud>
      <span slot="footer">
        <el-button @click="dialogVisible_child = false">取 消</el-button>
        <el-button type="primary" @click="submitChild">确 定</el-button>
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import { option, childOption } from "@/const/crud/salary/set/salarysystem";
import { data } from "@/const/crud/salary/itemdatas";
import { getRygwlx, getSyzt } from "@/const/staff/getSelectOption";

export default {
  data() {
    return {
      data: [
        {
          txmc: "一",
          sygw: "1",
          syzt: "1",
          ms: "无",
        },
        {
          txmc: "二",
          sygw: "2",
          syzt: "1",
          ms: "无",
        },
        {
          txmc: "三",
          sygw: "3",
          syzt: "1",
          ms: "无",
        },
        {
          txmc: "四",
          sygw: "4",
          syzt: "1",
          ms: "无",
        },
      ],
      option: option,
      search: {},
      form: {},
      page: {
        total: 100,
        current: 1,
        size: 10,
      },
      childData: data,
      childOption: childOption,
      childPage: {
        total: 100,
        current: 1,
        size: 10,
      },

      snapData: [],
      currentType: undefined,

      gjgzList: [],
      xngzList: [],
      lxffList: [],
      bdsffList: [],

      sygwOptions: undefined,
      syztOptions: undefined,

      dialogVisible_add: false,
      dialogVisible_child: false,
    };
  },
  methods: {
    // 添加
    add() {
      this.dialogVisible_add = true;
    },
    // 提交
    submit() {},
    async getRygwlx() {
      const { data: res } = await getRygwlx();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.sygwOptions = res.data;
    },
    async getSyzt() {
      const { data: res } = await getSyzt();
      if (res.code !== 0) return this.$message.error(res.msg);
      this.syztOptions = res.data;
    },
    openChildDialog(type) {
      this.dialogVisible_child = true;
      this.snapData = [];
      this.currentType = type;
    },
    selectionChange(list) {
      this.snapData = list;
    },
    submitChild() {
      this.dialogVisible_child = false;
      this[`${this.currentType}List`] = this.snapData;
      this.$refs.crudChildRef.toggleSelection();
    },
    removeItem(type, tag) {
      this[`${type}List`].some((item, index) => {
        if (item.zdbh === tag.zdbh) {
          this[`${type}List`].splice(index, 1);
        }
      });
    },
  },
  mounted() {
    this.getRygwlx();
    this.getSyzt();
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin: 20px;
}
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
.el-tag {
  margin: 0 10px;
}
</style>

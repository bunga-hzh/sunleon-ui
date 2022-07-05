<template>
  <basic-container>
    <el-card shadow="never"
             :body-style="{ padding: '0px' }">
      <div slot="header">
        <el-row :gutter="10">
          <el-col :span="24"
                  align="right">
            <el-input v-model="key"
                      placeholder="角色名称"
                      class="w_200"
                      clearable />
            <el-button type="primary"
                       icon="el-icon-search"
                       class="m_l_10"
                       @click="query">
              查询
            </el-button>
          </el-col>
        </el-row>
      </div>
      <el-table v-loading="$store.state.loading"
                element-loading-text="加载中，请稍后"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="pager.records"
                style="width: 100%"
                border
                stripe>
        <el-table-column prop="roleName"
                         label="角色名称" />
        <el-table-column label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button type="text"
                       size="small"
                       @click="showDialog(scope.row)">
              权限分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background
                     :current-page="pager.current"
                     :page-size="pager.size"
                     :total="pager.total"
                     class="pagination text-right"
                     :page-sizes="$store.state.paginationPageSizes"
                     :layout="$store.state.paginationLayout"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog :title="title"
               :visible.sync="dialogVisible">
      <el-form :label-position="'right'"
               label-width="80px">
        <el-tree ref="tree"
                 :data="treeData"
                 :default-checked-keys="checkedKeys"
                 check-strictly
                 node-key="id"
                 accordion
                 show-checkbox
                 @check="clickCheck" />
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">
          取 消
        </el-button>
        <el-button type="primary"
                   @click="saveAuth">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </basic-container>
</template>
<script>
import "@/styles/assessment-style.scss";
export default {
  name: "RoleAuth",
  data() {
    return {
      key: null,
      title: null,
      dialogVisible: false,
      pager: { current: 1, size: 10, total: 0, records: [] },
      current: 1,
      size: 10,
      oid: null,
      auths: null,
      treeData: null,
      checkedKeys: [],
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      this.$store.commit("setLoading", true);
      this.$http
        .get("/role/list", {
          params: {
            key: this.key,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.pager = res.data.data;
          this.$store.commit("setLoading", false);
        });
    },
    handleSizeChange: function (size) {
      this.current = 1;
      this.pager.current = 1;
      this.size = size;
      this.query();
    },
    handleCurrentChange: function (current) {
      this.current = current;
      this.query();
    },
    showDialog(row) {
      this.oid = row.oid;
      this.$http
        .post("/role/findMenuData", {
          roleId: this.oid,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.treeData = res.data.data.treeData;
            this.checkedKeys = res.data.data.checkedIds;
            this.title = "【" + row.roleName + "】分配权限";
            this.dialogVisible = true;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    clickCheck(currentObj, treeStatus) {
      let selected = treeStatus.checkedKeys.indexOf(currentObj.id);
      if (selected !== -1) {
        this.selectedParent(currentObj);
        this.uniteChildSame(currentObj, true);
      } else {
        if (currentObj.children && currentObj.children.length > 0) {
          this.uniteChildSame(currentObj, false);
        }
      }
    },
    uniteChildSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.id, isSelected);
      if (treeList.children) {
        for (let i = 0; i < treeList.children.length; i++) {
          this.uniteChildSame(treeList.children[i], isSelected);
        }
      }
    },
    selectedParent(currentObj) {
      let currentNode = this.$refs.tree.getNode(currentObj);
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true);
        this.selectedParent(currentNode.parent);
      }
    },
    saveAuth() {
      const keys = this.$refs.tree.getCheckedKeys();
      if (keys == "" || keys == null) {
        this.$message.error("请选择权限");
      } else {
        this.auths = keys.join(",");
        this.$http
          .post("/role/saveAuth", { roleId: this.oid, ids: this.auths })
          .then((res) => {
            if (res.data.code == 0) {
              this.$message.success(res.data.message);
              this.dialogVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
      }
    },
  },
};
</script>
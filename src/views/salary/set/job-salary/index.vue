<template>
  <basic-container>
    <Setting :settingType="type" @get-row-id="getRowId">
      <template slot="dialog" slot-scope="{ id }">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in personTypeArr"
            :key="item.id"
            :label="item.label"
            :name="item.value"
            :id="id"
          />
          <avue-crud
            ref="crud"
            :data="data"
            :option="option"
            :page.sync="page"
            :table-loading="showLoading"
            :permission="permissionList"
            @on-load="onLoad"
            @row-save="rowSave"
            @row-update="rowUpdate"
            @row-del="rowDel"
            @refresh-change="refreshChange"
          >
          </avue-crud>
        </el-tabs>
      </template>
    </Setting>
  </basic-container>
</template>

<script>
import Setting from "@/components/salary/setting/index"
import constants from "@/const/crud/salary/constants"
import { option } from "./option"
import { mapGetters } from "vuex"
import {
  fetchList,
  addObj,
  putObj,
  delObj,
  getDict,
} from "@/api/salary/commonApi"

export default {
  data () {
    return {
      activeName: null,
      type: constants.POST_SALARY,
      data: [],
      option: option,
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10,
      },
      showLoading: false,
      personTypeArr: [],
      rowId: null,
    }
  },
  computed: {
    ...mapGetters(["permissions"]),
    permissionList () {
      return {
        addBtn: this.vaildData(this.permissions.sal_salsettingitem_add, false),
        delBtn: this.vaildData(this.permissions.sal_salsettingitem_del, false),
        editBtn: this.vaildData(
          this.permissions.sal_salsettingitem_edit,
          false
        ),
      }
    },
  },
  components: {
    Setting,
  },
  methods: {
    async getList () {
      this.showLoading = true
      const { data: res } = await fetchList(
        "settingitem",
        Object.assign(
          {
            current: this.page.currentPage,
            size: this.page.pageSize,
          },
          {
            settingId: this.rowId,
            personTypeId: this.activeName,
          }
        )
      )
      if (res.code != 0) return this.$message.error(res.msg)
      this.page.total = res.data.total
      this.data = res.data.records
      this.showLoading = false
    },
    handleClick (tab, event) {
      this.getList()
    },
    getRowId (id) {
      this.rowId = id
      this.getList()
      this.activeName = this.personTypeArr[0].value
    },
    onLoad () {
      this.getList()
    },
    refreshChange () {
      this.getList()
    },
    async rowSave (form, done, loading, id) {
      const obj = {
        settingId: this.rowId,
        personTypeId: this.activeName,
        salLevel: form.salLevel,
        standard: form.standard,
        sort: form.sort,
      }
      const { data: res } = await addObj("settingitem", obj)
      if (res.code != 0) return this.$message.error(res.msg)
      this.$message.success("???????????????")
      this.getList()
      done()
    },
    rowUpdate (form, index, done, loading) {
      this.$confirm('???????????????????????????????????????????????????????????????')
        .then(async _ => {
          const obj = {
            id: form.id,
            settingId: this.rowId,
            personTypeId: this.activeName,
            salLevel: form.salLevel,
            standard: form.standard,
            sort: form.sort,
          }
          const { data: res } = await putObj("settingitem", obj)
          if (res.code != 0) return this.$message.error(res.msg)
          this.$message.success("???????????????")
          done(obj)
        })
        .catch(_ => { })
    },
    async rowDel (form, index) {
      this.$confirm("?????????????????????????????????, ?????????????", "??????", {
        confirmButtonText: "??????",
        cancelButtonText: "??????",
        type: "warning",
      })
        .then(async () => {
          const { data: res } = await delObj("settingitem", form.id)
          if (res.code !== 0)
            return this.$message.error("???????????????" + res.msg)
          this.$message({
            type: "success",
            message: "????????????!",
          })
          this.refreshChange()
        })
        .catch(() => { })
    },
    async getPersonType () {
      const { data: res } = await getDict("sal_person_type")
      if (res.code != 0) return this.$message.error(res.msg)
      this.personTypeArr = res.data
      this.activeName = res.data[0].value
    },
  },
  created () {
    this.getPersonType()
  },
};
</script>

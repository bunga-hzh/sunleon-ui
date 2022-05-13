import {
  fetchList,
  addObj,
  getObj,
  delObj,
  putObj
} from '@/api/staff/crud'

import {
  result
} from "@/const/staff/message";

export function get(type, page, query, search) {
  return fetchList(type, Object.assign({
      current: page.currentPage,
      size: page.pageSize,
    },
    query,
    search))
}

export function add(type, obj) {
  return addObj(type, obj)
}

export function edit(type, obj) {
  return putObj(type, obj)
}

export function del(type, id) {
  return delObj(type, id)
}

// 获取列表
export async function getList(type, _this, query) {
  const {
    data: res
  } = await get(type, _this.page, query, _this.search);
  if (res.code !== 0) return this.$message.error('获取数据失败');
  _this.data = res.data.records
  _this.page.total = res.data.total;
}

// 添加
export async function addData(type, _this, form, done, loading) {
  const {
    data: res
  } = await add(type, form);
  if (!result(_this, res, "add")) return true;
  form.id = res.data;
  done(form);
}

//修改
export async function editData(type, _this, form, index, done, loading) {
  const {
    data: res
  } = await edit(type, form);
  if (!result(_this, res, "edit")) return true;
  done(form);
}

// 删除
export async function delData(type, _this, form, index, callback) {
  _this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
    .then(async () => {
      const {
        data: res
      } = await del(type, form.id);
      if (!result(_this, res, "del")) return true;
      callback();
    })
    .catch(() => {});
}

// 搜索
export async function searchData(type, _this, form, done) {
  _this.search = form;
  _this.page.currentPage = 1;
  getList(type, _this, form);
  done();
}

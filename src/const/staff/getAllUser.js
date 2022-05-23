import {
  fetchList
} from "@/api/staff/crud";
import {
  jzg_page
} from "@/const/staff/page";

var users = [];

function createStateFilter(queryString) {
  return (state) => {
    return (
      state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
}

export async function loadAll() {
  const {
    data: res
  } = await fetchList("info", jzg_page);
  if (res.code !== 0) return true;
  res.data.records.forEach((item) => {
    users.push({
      value: item.xm,
      gh: item.gh,
      orgId: item.orgId,
      staffId: item.id,
    });
  });
}

export function querySearch(queryString) {
  var restaurants = users;
  var results = queryString ?
    restaurants.filter(createStateFilter(queryString)) :
    restaurants;
  return results
}

export default users

import {
  getAll
} from "@/api/staff/crud";
import {
  jzg_page
} from "@/const/staff/page";
import {
  validatenull
} from "@/util/validate";

var users = [];

function createStateFilter(queryString) {
  return (state) => {
    return (
      state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
}

export async function loadAll(list) {
  const {
    data: res
  } = await getAll();
  if (res.code !== 0) return true;
  if (validatenull(list)) {
    res.data.forEach((item) => {
      users.push({
        value: item.xm,
        gh: item.gh,
        orgId: item.orgId,
        staffId: item.id,
      });
    });
  } else {
    list = res.data.records
  }
}

export function querySearch(queryString) {
  var restaurants = users;
  var results = queryString ?
    restaurants.filter(createStateFilter(queryString)) :
    restaurants;
  return results
}

export default users

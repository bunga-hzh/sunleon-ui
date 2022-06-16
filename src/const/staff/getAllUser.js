import {
  getAll
} from "@/api/staff/crud";

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
  } = await getAll();
  if (res.code !== 0) return true;
  users = [];
  res.data.forEach((item) => {
    users.push({
      value: item.xm,
      gh: item.gh,
      deptId: item.deptId,
      staffId: item.id,
    });
  });
}

export function querySearch(queryString) {
  const restaurants = users;
  const results = queryString ?
    restaurants.filter(createStateFilter(queryString)) :
    restaurants;
  return results
}

export default users

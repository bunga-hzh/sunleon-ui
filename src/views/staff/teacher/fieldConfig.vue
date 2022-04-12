<template>
  <div class="power_info_container">
    <basic-container>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
        <el-tab-pane
          v-for="item in transferList"
          :key="item.id"
          :label="item.title"
          :name="item.id"
        >
          <div class="transfer_box">
            <p>{{ item.title }}</p>
            <el-transfer
              style="text-align: left; display: inline-block"
              v-model="value"
              filterable
              :left-default-checked="[2, 3]"
              :right-default-checked="[1]"
              :render-content="renderFunc"
              :titles="['所有字段', '可修改的字段']"
              :button-texts="['到左边', '到右边']"
              :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}',
              }"
              @change="handleChange"
              :data="data"
            >
              <template slot="left-footer">
                <avue-select
                  v-model="form"
                  placeholder="请选择内容"
                  type="tree"
                  :dic="dic"
                ></avue-select>
              </template>
              <template slot="right-footer">
                <avue-select
                  v-model="form"
                  placeholder="请选择内容"
                  type="tree"
                  :dic="dic"
                ></avue-select>
              </template>
            </el-transfer>
          </div>
        </el-tab-pane>
      </el-tabs>
    </basic-container>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = (_) => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0,
        });
      }
      return data;
    };
    return {
      activeName: "1",
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      // 穿梭框的数据
      transferList: [
        { id: "1", title: "本人可修改的" },
        { id: "2", title: "人事可修改的" },
        { id: "3", title: "与数据中心对接的" },
      ],
    };
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    handleClick(tab, event) {
      console.log(tab.name);
    },
  },
};
</script>

<style lang="scss" scoped>
.transfer_box {
  p {
    text-align: center;
    font-size: 18px;
    font-family: large;
  }
  .el-transfer {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
>

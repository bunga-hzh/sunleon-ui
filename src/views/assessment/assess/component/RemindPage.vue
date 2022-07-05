<template>
  <div v-if="!send"
       class="remind_page">
    <div class="remind_icon">
      <i class="el-icon-sunrise-1" />
    </div>
    <div class="remind_txt">
      {{ remindTxt }}
    </div>
  </div>
</template>
<script>
import "@/styles/assessment-style.scss";
export default {
  name: "RemindPage",
  props: {
    roleId: { type: String, default: "" },
    assessType: { type: Number, default: null },
    random: { type: Number, default: null },
    rangeSize: { type: Number, default: null },
  },
  data() {
    return {
      yearId: null,
      send: false,
      remindTxt: "",
    };
  },
  watch: {
    roleId: {
      immediate: true,
      handler(roleId) {
        this.roleId = roleId;
      },
    },
    assessType: {
      immediate: true,
      handler(assessType) {
        if (assessType != 0) {
          this.assessType = assessType;
        }
      },
    },
    random() {
      this.init();
    },
    rangeSize: {
      immediate: true,
      handler(rangeSize) {
        this.rangeSize = rangeSize;
      },
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.yearId = this.$store.state.user.yearId;
      const roleIds = this.$store.state.user.roleIds;
      let via = false;
      if (this.roleId === "syzc") {
        if (roleIds.indexOf("3") >= 0 || roleIds.indexOf("4") >= 0) {
          via = true;
        }
      } else if (this.roleId === "syld") {
        if (roleIds.indexOf("1") >= 0 || roleIds.indexOf("2") >= 0) {
          if (this.assessType === 2) {
            if (this.rangeSize > 0) {
              via = true;
            } else {
              via = false;
            }
          } else {
            via = true;
          }
        }
      } else if (this.roleId === "zcjs") {
        if (
          roleIds.indexOf("3") >= 0 ||
          roleIds.indexOf("4") >= 0 ||
          roleIds.indexOf("5") >= 0
        ) {
          via = true;
        }
      } else if (this.roleId == 5) {
        //2021临时使用
        let staffType = this.$store.state.user.staffType;
        if (staffType === 3) {
          via = false;
        } else {
          via = true;
        }
      } else if (roleIds.indexOf(this.roleId) >= 0) {
        via = true;
      }
      if (via) {
        this.query();
      } else {
        this.send = false;
        this.remindTxt = "您无需填写";
      }
    },
    query() {
      this.$http
        .get("/assess/state", {
          params: {
            yearId: this.yearId,
            assessType: this.assessType,
          },
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$emit("parentChange", true);
            this.send = true;
          } else {
            this.send = false;
            this.remindTxt = res.data.message;
          }
        });
    },
  },
};
</script>
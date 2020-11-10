<template>
  <div>
    <el-button type="info" @click="clickOut">退出</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    clickOut() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less" scoped></style>

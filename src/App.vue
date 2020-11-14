<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// const Login = () => import('../src/components/Login')
export default {
  name: "app",
  components: {
    // Login
  },
  created() {
    // 在页面加载时读取sessionStore里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    // 在页面刷新时将vuex里的信息保存到sessionStore中
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
};
</script>
<style>
</style>

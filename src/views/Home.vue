<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>电商管理系统</div>
      <el-button type="info" @click="clickOut">退出</el-button>
    </el-header>
    <!-- 页面主体部分 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconlist[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + chiItem.path"
              v-for="chiItem in item.children"
              :key="chiItem.id"
              @click="saveNavState('/' + chiItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ chiItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 菜单
      menulist: [],
      iconlist: {
        125: "el-icon-user",
        103: "el-icon-bangzhu",
        101: "el-icon-shopping-bag-2",
        102: "el-icon-s-order",
        145: "el-icon-data-line",
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: "",
    };
  },
  methods: {
    clickOut() {
      this.$store.commit("saveToken", "");
      this.$router.push("/login");
    },
    // 获取菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
    },
    // 点击折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    saveNavState(path) {
      this.$store.commit("savePath", path);
      this.activePath = path;
    },
  },
  created() {
    this.getMenuList();
    this.activePath = this.$store.state.path;
  },
};
</script>
<style lang="less" scoped>
.el-header {
  background: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    font-size: 20px;
    color: #ffffff;
  }
}

.el-aside {
  background: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background: #eaedf1;
}

.home-container {
  height: 100%;
}

.home-tem {
  width: 160px;
}

.toggle-button {
  background: #4a5064;
  font-size: 10px;
  line-height: 21px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

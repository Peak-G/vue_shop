<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column
          label="权限名称"
          prop="authName"
          align="center"
        ></el-table-column>
        <el-table-column
          label="路径"
          prop="path"
          align="center"
        ></el-table-column>
        <el-table-column label="权限等级" prop="level" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == '0'">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == '1'"
              >二级权限</el-tag
            >
            <el-tag type="warning" v-else>三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rightsList: [],
    };
  },
  methods: {
    // 获取所有权限
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.rightsList = res.data;
    },
  },
  created() {
    // 获取权限列表
    this.getRightsList();
  },
};
</script>
<style lang="less" scoped>
</style>
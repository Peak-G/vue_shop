<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        border
        class="tree-table"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level == 0">一级</el-tag>
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level == 1"
            >二级</el-tag
          >
          <el-tag type="warning" size="mini" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditCate(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteCate(scope.row)"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
      @close="addCateDialogClose"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="父级分类：">
          <el-cascader
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
            v-model="selectKeys"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="editCateDialogVisible"
      width="50%"
      @close="editCateDialogClose"
    >
      <!-- 添加分类的表单 -->
      <el-form
        :model="editCateForm"
        :rules="editCateFormRules"
        ref="editCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 商品分类的数据列表
      cateList: [],
      // 总数据条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 将当前列定义为模板列
          type: "template",
          // 使用的模板名称
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "order",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
      // 控制添加分类对话框的显示和隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: "",
        // 父级分类的id
        cat_pid: 0,
        // 分类的等级，默认要添加的是1级分类
        cat_level: 0,
      },
      // 添加分类的表单验证规则
      addCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      // 父级分类的列表
      parentCateList: [],
      // 指定级联选择器的配置对象
      cascaderProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
        expandTrigger: "hover",
        checkStrictly: "true",
      },
      // 选中的父级分类的id数组
      selectKeys: [],
      // 控制编辑分类的显示与 隐藏
      editCateDialogVisible: false,
      // 编辑分类的数据
      editCateForm: {
        cat_id: 0,
        cat_name: "",
      },
      // 编辑分类的表单验证规则
      editCateFormRules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
    // 监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getCateList();
    },
    // 监听pagenum改变
    handleCurrentChange(newNum) {
      this.queryInfo.pagenum = newNum;
      this.getCateList();
    },
    // 点击按钮展示添加分类对话框
    showAddDialog() {
      this.getParentCateList();
      this.addCateDialogVisible = true;
    },
    // 获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 },
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.parentCateList = res.data;
    },
    // 选择项发生改变触发该函数
    parentCateChange() {
      // 如果selectKeys数组中的length大于0，则证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if (this.selectKeys.length > 0) {
        // 父级分类的id
        this.addCateForm.cat_pid = this.selectKeys[this.selectKeys.length - 1];
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectKeys.length;
        return;
      } else {
        this.addCateForm.cat_pid = 0;
        this.addCateForm.cat_level = 0;
      }
    },
    // 点击添加分类
    addCate() {
      this.$refs.addCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post(
          "categories",
          this.addCateForm
        );
        if (res.meta.status !== 201) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.addCateDialogVisible = false;
        this.getCateList();
      });
    },
    // 监听添加分类对话框的关闭
    addCateDialogClose() {
      this.addCateForm.cat_name = "";
      this.addCateForm.cat_pid = 0;
      this.addCateForm.cat_level = 0;
      this.selectKeys = [];
    },
    // 监听删除按钮事件
    async deleteCate(cate) {
      const result = await this.$confirm(
        "此操作将永久删除该分类, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (result !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete(
        "categories/" + cate.cat_id
      );
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success(res.meta.msg);
      this.getCateList();
    },
    // 监听编辑按钮
    async showEditCate(cate) {
      const { data: res } = await this.$http.get("categories/" + cate.cat_id);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.editCateForm.cat_id = res.data.cat_id;
      this.editCateForm.cat_name = res.data.cat_name;
      this.editCateDialogVisible = true;
    },
    // 监听编辑分类对话框的关闭
    editCateDialogClose() {
      this.editCateForm.cat_id = 0;
      this.cat_name = "";
    },
    // 监听编辑分类对话框的提交事件
    editCate() {
      this.$refs.editCateFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.put(
          "categories/" + this.editCateForm.cat_id,
          { cat_name: this.editCateForm.cat_name }
        );
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.$message.success(res.meta.msg);
        this.editCateDialogVisible = false;
        this.getCateList();
      });
    },
  },
  created() {
    this.getCateList();
  },
};
</script>
<style lang="less">
.tree-table {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
.el-cascader-panel {
  height: 200px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>

### 后端API接口源码  [下载](https://gitee.com/wBekvam/vueShop-api-server.git). 

### 功能

> 用于管理用户账号，商品分类，商品信息，订单，数据统计等业务功能


### 开发模式

> 电商后台管理系统整体采用前后端分离的开发模式,其中前端项目是基于Vue技术栈的SPA项目


### 技术选型

#### 前端项目技术栈

- Vue
- Vue-router
- Element-UI
- Axios
- Echarts
- Vuex


  后端源码  [下载](https://gitee.com/wBekvam/vueShop-api-server.git).

### 登录概述

#### 登录业务流程

1. 在登录页面输入用户名和密码
2. 调用后台接口进行验证
3. 通过验证之后,根据后台的响应状态跳转到项目主页


#### 登录业务流程

##### 登录页面的布局

通过Element-UI组件实现布局

- el-form
- el-form-item
- el-input
- el-button
- 字体图标

##### 路由导航守卫控制访问权限

> 如果用户没有登录,但是直接通过URL访问特定页面,需要重新导航到登录页面
> 因为用vuex存储用户token，而在导航守卫中this指向不一

```js
import store from '@/store'
//为路由对象,添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 方式一
  // const tokenStr = store.state.token
  // if (!tokenStr) return next('/login')
  // next()
  // 方式二
  next(vm => {
    const tokenStr = this.$store.state.token
    if (!tokenStr) return next('/login')
  })
})
```

### 主页布局

#### 通过接口获取菜单数据

> 通过axios请求拦截器添加token,保证拥有获取数据的权限

```js
// axios请求拦截
axiox.interceptors.request.use(config => {
  config.headers.Authorization = store.state.token
  return config
})
```

### 权限管理

#### 权限管理业务分析

> 通过权限管理模块控制不同的用户可以进行哪些操作,具体可以通过角色的方式进行控制,即每个用户分配一个特定的角色,角色包括不同的功能权限



### 分类管理

#### 商品分类概述

> 商品分类用于在购物时,快速找到需要购买的商品,进行直观显示



### 参数管理

#### 参数管理概述

> 商品参数用于显示商品的特征信息,可以通过电商平台详情页面直观的看到



### 项目所用依赖(vue全家桶不描述)

1. 运行依赖

- axios => 发送请求
- echarts => 图表
- element-ui => element ui组件
- nprogress => 进度条库
- vue-quill-editor => 富文本编辑器
- vue-table-with-tree-grid => 树形菜单/表格

1. 开发依赖

- babel => es6+语法转换
- less/less-loader => less语法

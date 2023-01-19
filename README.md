# Vue 3 + TypeScript + Vite

# pnpm add xx -D -E

# 禁止使用npm / yarn
# 禁止使用npm / yarn
# 禁止使用npm / yarn

# eslint vue ts 校验使用 腾讯 https://github.com/AlloyTeam/eslint-config-alloy/blob/master/README.zh-CN.md

# Prettier  使用官方推荐 

# css unocss

# vite-plugin-html 修改html文件

# 组件库 使用 https://arco.design/vue/component/menu

#

# config 
   env 环境变量配置
   vite
      base 通用基础配置
      serve 开发环境配置
      build 生产环境配置

# pages 存放业务开发模块



# router 路由模块 
# 自动导入 pages下面的router.ts 模块



# 权限相关 权限模块作为一个插件

# 俩方面拦截 一个是页面元素 一个是浏览器路由拦截 
# 动静结合 权限=>菜单=>路由 这样路由就跟权限没有关系 隔离开


# 动态权限路由存在 刷新后如何处理问题。我刷新后何时添加路由 我怎么添加路由。

# 通过在点击后的路由信息存在session。刷新后 在初始化加载的时候就挂载上去
# 刷新后如何路由不存在 都跳转到无权限页面，用户重新登录

# 动态添加路由 根据渲染的子菜单来 判断是否需要添加上去

# 路由权限信息被更新 逻辑上来说 应该重新登录的 

# 权限组件 / 权限函数

# 权限码

# 权限变更
# websocket 通知前端退出系统 重新登录

```TypeScript
   interface permission {
      [key:string]: string
   }
```


# 组件分为两种 一个是纯组件 跟业务无任何关系 一种是业务组件跟当前系统的业务相关
# 标准就是离开当前系统 单独拷贝出去都能使用

# 纯组件存放在pure文件夹下面
# 业务组件存放在logic文件夹下面


# 菜单组件要满足几点要求
# 正确跳转 
# 高亮
# 动态加载路由
# 刷新后动态挂载当前路由
# 只做到二级菜单
 
```TypeScript
   interface router {
      routes: RouteRecordRaw[]
   }
```



## 看起来是一个spa  其实是一个mpa 登录和主业务是分开的html业务






## 网络接口统一设置

### 接口data返回规范 默认配置

```typescript
    interface data {
      data: Object
      error: null | array
    }
```

### 网络状态非 200 异常全部抛出 
### 接口返回error 异常全部抛出


### 依赖更新步骤
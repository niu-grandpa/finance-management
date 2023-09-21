# 金融后台管理面板系统

## 技术栈

前端：Vite + React + React Router + Typescript + MUI + Redux + Recharts

后端： Express + MongoDB

## 运行

调试项目

```shell
npm run dev
```

打包项目

```shell
npm run build
```

### 职责

- 搭建并部署后端服务，实现nginx反向代理解决跨域，实现kpi、product、transaction 路由

- 使用 Atlas 创建部署 mongodb 、定义数据库模式、结合 nodejs-mongoose 管理数据

- 使用 redux 管理注入全局应用状态、创建数据请求方法

- 实现数据仪表盘、收支预测等路由页面，封装导航栏组件、recharts图表面板组件

- 实现路由懒加载优化、首页滚动加载图表组件，提升页面运行性能

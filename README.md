# 海拉鲁武器图鉴

基于 React + Vite 的纯客户端武器收集图鉴。

- 无需登录或数据库
- 获取状态保存在当前浏览器的 `localStorage`
- 支持旷野之息、王国之泪切换
- 支持名称、武器状态和获取状态筛选
- 可一键清除全部本地获取记录

## 本地开发

```bash
npm install
npm run dev
```

## 生产构建

```bash
npm run build
```

## 部署到 GitHub Pages

项目已包含 GitHub Actions 工作流：`.github/workflows/deploy-pages.yml`。

启用步骤：

1. 推送到 `main` 分支（或手动触发 workflow）。
2. 在仓库 `Settings -> Pages` 中，将 `Build and deployment` 的 `Source` 设为 `GitHub Actions`。
3. 等待 Actions 执行完成后，即可通过 Pages 链接访问。

说明：

- workflow 会在构建时自动设置 Vite 的 `base` 为仓库名路径（`/<repo>/`），用于项目页（`https://<user>.github.io/<repo>/`）部署。

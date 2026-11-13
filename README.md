# openUrain 官网

[openurain.com](https://openurain.com) · [GitHub 组织](https://github.com/openUrain)

Building software for real needs. 让需求有回应，让开源更好用。

## 本地开发

使用 Node.js 22.23.4 或更新版本。仓库通过 `.node-version` 固定 Node.js 22.23.5。

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Astro 将首页、404 和 sitemap 静态生成到 `dist/`。预览命令在构建后运行。

## Cloudflare Pages

合并前，在 Cloudflare 控制台进入 **Workers & Pages → openurain-site → Settings → Builds & deployments → Build configurations**，编辑现有项目的构建配置。

| 配置项 | 值 |
| --- | --- |
| Framework preset | Astro |
| Production branch | `main` |
| Build command | `npm run build`，替换 `exit 0` |
| Build output directory | `dist`，替换 `public` |
| Root directory | 留空，使用仓库根目录 |
| Node.js | 由仓库的 `.node-version` 指定为 22.23.5。如已有 `NODE_VERSION` 覆盖项，将其设为相同版本。 |

保存后，由 Owner 合并 PR，Pages 会从新的 `main` 构建。部署成功后可以在 [openurain.com](https://openurain.com) 检查首页、`/sitemap.xml` 和任意不存在的路径。Pages 会在缺失路径上提供构建产物中的 `404.html`。详见 [Cloudflare Pages 构建配置](https://developers.cloudflare.com/pages/configuration/build-configuration/)。

## 品牌与产品资料

- 官网标志和字标裁自组织的[原始 Logo](https://github.com/openUrain/.github/blob/main/profile/openUrain.png)。组织介绍见 [GitHub 组织首页](https://github.com/openUrain)。
- Zibblu 使用其[桌面应用图标](https://github.com/openUrain/Zibblu/blob/main/apps/desktop/src-tauri/icons/icon.png)，功能描述依据[项目 README](https://github.com/openUrain/Zibblu#readme)和[安全说明](https://github.com/openUrain/Zibblu/blob/main/docs/SECURITY.md)。产品展区的对话气泡是品牌插图。
- 在 `src/data/products.ts` 添加产品即可复用展示结构。在 `src/styles/site.css` 的对应产品选择器中定义品牌配色。

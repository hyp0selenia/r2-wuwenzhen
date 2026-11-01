# wenzi-web

一个只做两件事的 Cloudflare Worker 页面：**查看文件列表**、**下载文件**。

它本身不持有 R2 绑定，而是把已有的 [R2-Explorer](https://github.com/G4brym/R2-Explorer) 实例当作上游，
通过 Cloudflare service binding 读取列表与文件流，对外只暴露一个干净的只读页面。

- 纯静态样式与原生 JS，无前端框架、无构建步骤
- 服务端渲染首屏（第一层目录数据直接内嵌在 HTML 里），首屏无额外请求
- 支持多级目录、面包屑、当前目录搜索、分页加载、深色模式、移动端适配
- 上传 / 删除 / 重命名 / 分享链接 / 邮件等上游能力在页面上**完全没有入口**
- 中文、空格、子目录文件名都能正确下载

## 它是怎么工作的

```
浏览器 ──HTTPS──> 你的域名 ──> wenzi-web（本项目）
                                   │
                   env.API_SERVICE.fetch(...)   ← service binding，Cloudflare 内部调用
                                   ↓
                           你的 R2-Explorer 实例
                                   │
                            env["<bucket binding>"]   ← R2 bucket binding
                                   ↓
                               R2 存储桶
```

文件和列表数据全程在 Cloudflare 内部传递，唯一走公网的一段是从本 Worker 到用户浏览器。
上游的公开域名（例如 `api.example.com`）因此**不需要**对外暴露，只留 service binding 即可。

### 关于 service binding 的一个坑

`wrangler.toml` 里的 `[[services]]` 只是**绑定表**，它不会往 `env` 注入同名变量。
代码里必须显式用 `binding = "API_SERVICE"` 声明时的那个名字去取：

```js
const binding = env.API_SERVICE;          // 与 wrangler.toml 的 binding 字段严格一致
await binding.fetch(new Request(`https://api.internal${path}`, { method, headers }));
```

名字写错时 `env.API_SERVICE` 会是 `undefined`，请求会静默退化到公网回退路径 ——
表面一切正常，实际根本没走内网。本项目把绑定名写成了代码里的默认常量，避免配置漂移。

## 快速开始

```bash
npm install
npm run dev        # http://127.0.0.1:8787
```

本地想指向别的上游，在项目根目录建 `.dev.vars`：

```
API_BASE=http://127.0.0.1:8791
BUCKET_NAME=my-bucket
```

## 部署

1. 改 `wrangler.toml` 里这三处：

   ```toml
   name = "wenzi-web"                       # 你的 Worker 名
   routes = [{ pattern = "your.domain.com", custom_domain = true }]
   [[services]]
   binding = "API_SERVICE"
   service = "your-r2-explorer-worker"      # 你的 R2-Explorer Worker 名
   ```

2. 部署：

   ```bash
   npm run deploy     # 需要先 npx wrangler login
   ```

自定义域名交给 wrangler 管理：首次部署会自动创建 DNS 记录与证书。
若提示该域名已存在冲突记录，到 Cloudflare 控制台删掉旧记录再部署即可。

### CI 自动部署

`.github/workflows/deploy.yml` 会在 push 到 `main` 时自动部署。
需要在仓库 Settings → Secrets and variables → Actions 里加两个 Secret：

- `CLOUDFLARE_API_TOKEN`：权限为 Account → Workers Scripts → Edit，
  以及 Zone → Workers Routes → Edit、Zone → DNS → Edit
- `CLOUDFLARE_ACCOUNT_ID`

没配 Secret 时工作流会打印一条 warning 并跳过部署，不会让 CI 变红。

## 配置项

`wrangler.toml` 的 `[vars]`：

| 变量 | 必填 | 说明 |
| --- | --- | --- |
| `SITE_TITLE` | 否 | 页面与 `<title>` 里的站点名 |
| `BUCKET_NAME` | 否 | 上游桶的**绑定名**（不是桶名）。留空时会自动请求上游 `/api/server/config` 读取 |
| `HIDDEN_PREFIX` | 否 | 不对外展示的内部前缀，默认 `.r2-explorer/`（上游存分享链接元数据的地方） |
| `API_BASE` | 否 | 公网兜底地址。正常用不到；配置它就意味着 binding 失效时会静默走公网 |
| `API_SERVICE` | 否 | service binding 的变量名，默认 `API_SERVICE`，一般不用改 |

## 接口

| 路径 | 说明 |
| --- | --- |
| `GET /` | 页面，首屏数据已内嵌 |
| `GET /api/list?path=&cursor=` | 某层目录的 JSON（`path` 以 `/` 结尾） |
| `HEAD` / `GET /dl/<base64url key>` | 下载文件，透传 `content-length` / `etag` |
| `GET /healthz` | 自检：上游连通性、桶名、条目数 |

除 `GET` / `HEAD` 外的请求一律返回 405。

## 目录结构

```
src/worker.js    路由与上游通信（/、/api/list、/dl/<key>、/healthz）
src/ui.js        服务端渲染的页面骨架：样式 + 客户端脚本
public/          图标、favicon、web manifest（静态资源绑定 ASSETS）
scripts/         图标生成与测试脚本
```

## 测试脚本

这些脚本用无头浏览器（Edge/Chrome）驱动，目前只在 Windows 下验证过：

```bash
npm run check:ui     # 本地交互回归：起 mock 上游 + 浏览器，验证导航、面包屑、
                     # 搜索、隐藏前缀过滤、下载字节数、深色模式
npm run check:live   # 对线上实例做同样的事，含真实文件下载
npm run shots        # 桌面 / 深色 / 移动端截图，输出到 .tmp/
```

`npm run icons` 会从 `scripts/source-favicon.jpg` 重新生成整套图标
（需要 `sharp`：`npm i -D sharp`，或用 `SHARP_PATH` 指向现成的安装）。
不重新生成也可以直接用仓库里已有的 `public/` 图标。

## 已知限制

- **不支持 Range 请求**：上游 R2-Explorer 的 `GetObject` 没有透传 `range`
  （源码里是 `bucket.get(filePath)`），所以大文件是整体流式下载，
  断点续传与视频拖动进度条不可用。需要这些能力得改上游 Worker。
- **列表分页**：上游默认单页 1000 条，页面会按需显示「加载更多」取下一页。
- **搜索只作用于当前目录**：前端过滤已加载的条目，不递归搜索整个桶。
- 测试脚本硬编码了 Windows 上的 Edge 路径，macOS/Linux 上需自行替换。

## 品牌与图标

页面名称来自 `SITE_TITLE`，图标来自 `public/icons/`。
仓库自带的是本项目使用的吉祥物图标，可直接替换 `public/` 下的文件
（并相应调整或跳过 `scripts/gen-icons.mjs`）。

## 许可证

[MIT](LICENSE)

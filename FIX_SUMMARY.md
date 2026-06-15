# 本地 Web 连接失败 - 修复记录

## 问题原因

`next.config.mjs` 中配置了 `output: 'export'`，导致 Next.js 进入静态导出模式，
`next dev` 无法正常启动服务端渲染。

## 已修复内容

1. **删除了 `output: 'export'` 配置**
   - 文件: `next.config.mjs`
   - 原来第 9 行的 `output: 'export',` 已移除

2. **清理了缓存目录**
   - 删除了 `.next/` 目录（旧构建缓存）
   - 删除了 `out/` 目录（旧静态导出文件）

## 验证结果

- `npm run dev` 已成功启动
- 服务器运行在 http://localhost:3000
- Next.js 版本: 14.2.35

## 如何重新启动

```bash
cd D:\ABA\ai-learning
npm run dev
```

然后访问 http://localhost:3000
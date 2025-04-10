// path 模块提供了一些工具函数，用于处理文件与目录的路径
import { resolve } from 'path'
// 使用 defineConfig 工具函数，这样不用 jsdoc 注解也可以获取类型提示
import { defineConfig } from 'vite'

/** 当前执行 node 命令时文件夹的地址（工作目录） */
const root = process.cwd()

/** 路径拼接函数，简化代码 */
const pathResolve = (path) => resolve(root, path)

export default defineConfig({
  resolve: {
    alias: [
      /** 设置 `@` 指向 `src` 目录 */
      { find: '@', replacement: pathResolve('src') },
      /** 设置 `#` 指向 `types` 目录 */
      { find: '#', replacement: pathResolve('types') },
    ],
  },
})

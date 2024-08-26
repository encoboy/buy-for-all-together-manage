# README

`@umijs/max` 模板项目，更多功能参考 [Umi Max 简介](https://umijs.org/docs/max/introduce)

## umi 一元购后台管理系统

### 编码规范 安装 eslint 和 stylelint

- 参考文档：https://juejin.cn/post/7089717571699605540
- cdn: https://www.jsdelivr.com/package/npm/@umijs/fabric

### 设置全局 ts 变量

- 变量报红色下划线解决方法：https://blog.csdn.net/hzxOnlineOk/article/details/128871580

### 使用 umi-plus-keep-alive

- [要注意修复 useModel 的使用](https://blog.csdn.net/weixin_62192841/article/details/130684240)
- 使用高阶组件将页面组件包裹，然后用 useModel 来执行返回的 table 刷新
- 不能用 keep-alive 方案来保存页数，相比较于传 url 参数方法要麻烦。
- 用 useSearchParam 来获取 url 的参数可能会比 location 的 state 好些

### 代码压缩配置和去掉 console.log

- [代码压缩配置和去掉](https://blog.csdn.net/qq_38969618/article/details/130320888)

### umi 拆包优化

- [打包的时候检查有些包太大，是否需要拆包，执行命令后，打开 http://127.0.0.1:8888](https://blog.csdn.net/Zong_0915/article/details/131247138)

### json 转 ts 快捷键 使用

- vscode 粘贴复制 json，然后通过 option+control+shift+s

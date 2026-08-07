# Project: countdown-timer-app（Countdown Studio）

零构建静态站，`index.html`/`style.css`/`script.js` 标准三件套（**没有** `data.js`——这个工具
不需要预设数据集，纯用户输入驱动）。**双语 EN（默认）/DE，不是三语**——这是这个工具家族里少数
UI 只支持两种语言的例外，别想当然加中文；引用它时（比如 portfolio 首页卡片标题）也该保持双语，
不要强行凑三语。

两种模式：从设定时长倒数的计时器，以及追踪生日/发布日等自定义日期事件的倒数日。

## 这个仓库是整个工具家族模式的起点
`junpingkoch-web-tool-ecosystem` 记忆里记录的零构建/i18n/卡片组件约定，最早就是从这个仓库确认下来的
（其他工具如 watch-price-tracker 是照着这个仓库的模式复用）。改这里的基础模式前，想一下改动是否也该同步到其他 sibling 仓库。

## 位置注意
**这个仓库不在 Desktop 下，在 `C:\Users\junpi\My Project\countdown-timer-app`**——跟其他 sibling 工具的位置约定不一样，脚本/自动化如果假设"都在 Desktop 下"会漏掉这个仓库。

## Commands
- 无构建/测试命令
- 本地预览：共享配置 `C:\Users\junpi\.claude\.claude\launch.json`，端口 5501

## 明确禁止的事
- 不要给 UI 加中文/第三语言，除非明确被要求——这个工具就是双语定位

## 部署流程
- 改完直接 commit + push 到 `main`
- Commit 作者身份：`Junping Koch <junping.koch@gmail.com>`，仓库单独设置

## 持续维护
每次你需要重复纠正 Claude 同一件事三次以上，就把结论补进这个文件对应章节。

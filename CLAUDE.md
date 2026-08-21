# Project: countdown-timer-app（Countdown Studio）

零构建静态站，`index.html`/`style.css`/`script.js` 标准三件套（**没有** `data.js`——这个工具
不需要预设数据集，纯用户输入驱动）。**更正（2026-08-21）：已经是三语 zh/en/de**，默认语言是 DE
（`script.js` 里 `currentLang` 初始值 + 导航语言探测），中文是后加的，`i18n.zh` 字典完整存在——这条
笔记之前写的"双语 EN/DE，不要加中文"已经过时，不要再照做。

**长尾 SEO 落地页（2026-08-21 新增）：** `pomodoro/index.html`、`christmas-countdown/index.html` 作为
独立子目录页面，走同样的零构建、三语、cookie-consent、ad-slot 约定，但**不引用共享的 `script.js`**——
它们各自内嵌一份精简版的语言切换 + 倒计时逻辑（复用 `countdownStudio.lang` 这个 localStorage key
保持语言偏好跨页面一致），因为 `script.js` 硬编码查询了首页专属的 DOM id（`dateForm`/`helpToggle` 等），
直接引入会在这些页面报错。新增同类长尾页时复用这个模式，而不是尝试复用 `script.js` 本体。
`pomodoro/index.html` 还额外带了一个"🎄 Christmas Countdown" bonus 卡片（复用 `christmas-countdown/`
同一套 `christmasTarget()` 逻辑，独立一份内嵌在 pomodoro 页里）。

**季节性内容提醒（2026-08-21 记）：圣诞节（12月25日）过完之后，下一个自然的长尾页是"新年倒计时"
（New Year's Eve countdown）。** `christmas-countdown/` 页面本身的倒计时逻辑会自动翻到下一年圣诞节，
不会真的坏掉，但那时候"圣诞节"就不再是应季关键词了——被问到"更新一下季节性内容"或类似请求时，
默认应该是：参照 `pomodoro/`、`christmas-countdown/` 已有的模式，新建一个 `new-year/` 长尾页
（含独立倒计时逻辑、三语 FAQ、JSON-LD Event），并评估要不要把 `pomodoro/` 里的圣诞节 bonus 卡片
换成新年倒计时 bonus 卡片。

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
- （已过时，见开头更正：这个工具现在是 zh/en/de 三语，中文早就加了）

## 部署流程
- 改完直接 commit + push 到 `main`
- Commit 作者身份：`Junping Koch <junping.koch@gmail.com>`，仓库单独设置

## 持续维护
每次你需要重复纠正 Claude 同一件事三次以上，就把结论补进这个文件对应章节。

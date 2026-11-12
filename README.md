# FIN4080 Behavioral Finance Study Website

CUHK-SZ FIN4080 行为金融学课程自学网站：9 个 Part 的中文讲解（重要概念保留英文）、SVG 图示、双语概念速查、自测练习与个人标记（localStorage）。

**在线访问**：https://kikyuyu.github.io/fin4080-study-website/

## 结构

```
index.html                  课程总览与地图
part1-introduction.html     导论：EMH 与泡沫之争
part2-limits-to-arbitrage.html   套利限制
part3-psychology.html       心理学基础（PT / 窄框架 / 模糊厌恶 / 双曲折现 / 信念偏差）
part4-asset-prices.html     资产价格的事实
part5-investor-behavior.html     投资者行为的事实（含 Rank Effect、Selling Fast Buying Slow）
part6-behavioral-models.html     行为资产定价模型（BSV / DHS / HS / BHS）
part7-corporate-prescriptive.html 行为公司金融与规范性 BF（含公司金融经验事实）
part8-pt-applications.html  前景理论的应用（偏度定价 / 短视损失厌恶 / 实现效用）
part9-salience.html         显著性理论（Allais 悖论 / BGS 模型 / ST 因子）
assets/                     style.css、app.js（导航）、figures.js（SVG 图）、mindmap.js（知识地图）、marks.js（个人标记）、tex-mml-svg.js（本地 MathJax）
```

纯静态站点，无构建步骤。本地预览：在本目录运行 `python -m http.server` 后访问 `http://localhost:8000`。

## 个人标记

「我的标记」（划重点、行内笔记、阅读进度）保存在浏览器 localStorage（key: `fin4080-marks-v1`），不上传任何服务器；清理浏览器数据会丢失。

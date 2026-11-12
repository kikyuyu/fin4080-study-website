/* ============================================================
   FIN 4080 Behavioral Finance — Collapsible mind map
   只保留最核心的理论/公式主干（每页 7–9 条）；课件里仅提到名字、
   没有展开的内容放进二级分支（默认折叠），点 ➕ 即可展开。
   ============================================================ */
(function () {
  "use strict";

  /* 每条 kid = 一个关键结论/公式；其 kids = 可展开的补充说明 */
  var MAPS = {
    index: {
      root: "FIN 4080 · 行为金融",
      note: "只列主线与核心判据；带 ➕ 的分支可点开看被略过的背景与公式细节。",
      kids: [
        { t: "课程主线（Barberis–Thaler 结构）", kids: [
          { t: "I. 导论 → II. 两大基石（套利限制 + 心理学）" },
          { t: "III. 事实 → IV. 模型与预测 → V. 重访事实" },
          { t: "VI. 规范性行为金融 → VII. 结论" },
          { t: "两条学习产出：解释现象 + 构造行为因子/交易策略" }
        ]},
        { t: "三大范式的分工", kids: [
          { t: "传统金融：理性 + 无摩擦" },
          { t: "摩擦金融：理性 + 有摩擦" },
          { t: "行为金融：部分人非完全理性" },
          { t: "理性的两根支柱：Bayes 更新 + EU/SEU 决策" }
        ]},
        { t: "Part 1 导论：EMH 与泡沫之争", kids: [
          { t: "弱式/半强式/强式；联合假设问题" },
          { t: "Tesla RSI 反证：可预测 ⇒ 无效" },
          { t: "Greenwood–Shleifer–You (2017) 加速度" }
        ]},
        { t: "Part 2 套利限制：为什么错价能存在", kids: [
          { t: "四类风险 + 实施成本" },
          { t: "三个经典证据：孪生股 / carve-out / 指数纳入" },
          { t: "DSSW (1990)、Shleifer & Vishny (1997)" }
        ]},
        { t: "Part 3 心理学：偏好 side 与信念 side", kids: [
          { t: "前景理论四要素 + T&K (1992) 参数" },
          { t: "窄框架、模糊厌恶、双曲折现" },
          { t: "信念侧：代表性、保守性、锚定、过度自信" }
        ]},
        { t: "Part 4 资产价格的事实", kids: [
          { t: "总量三大谜：溢价 / 波动 / 可预测" },
          { t: "横截面：动量、反转、规模、价值、应计…" },
          { t: "其他资产类别与泡沫" }
        ]},
        { t: "Part 5 投资者行为的事实", kids: [
          { t: "散户：储蓄不足、不参与、分散化不足、处置效应" },
          { t: "买高卖低：资金加权收益落后时间加权" },
          { t: "机构投资者平均业绩" }
        ]},
        { t: "Part 6–7 模型与公司金融 / 规范性", kids: [
          { t: "BSV / DHS / HS 统一解释动量与反转" },
          { t: "BHS (2001)：前景理论解释高股权溢价" },
          { t: "行为公司金融：非理性投资者 + 非理性管理者" },
          { t: "规范性 BF：助推、SMarT、选择架构" }
        ]},
        { t: "Part 8 前景理论的应用", kids: [
          { t: "横截面：偏度被定价（BMV / CDG / BCW）" },
          { t: "总体市场：短视损失厌恶与股权溢价" },
          { t: "交易行为：实现效用解释处置效应" }
        ]},
        { t: "Part 9 显著性理论", kids: [
          { t: "Allais 悖论：情境依赖的偏好逆转" },
          { t: "显著性函数 σ + 扭曲权重 π̃ = π·ω" },
          { t: "定价：E[r] = −cov[ω, r] ≡ −ST" },
          { t: "实证：ST 因子，套利限制越强预测力越强" }
        ]}
      ]
    },

    part1: {
      root: "Part 1 · 导论：什么是行为金融",
      note: "只保留最核心的判据；推导与背景放进可展开的二级分支。",
      kids: [
        { t: "有效市场假说 EMH", kids: [
          { t: "价格 = 内在价值 = 反映所有可得信息" },
          { t: "新信息立刻进入价格，无人能持续战胜市场" },
          { t: "推论：不存在泡沫" }
        ]},
        { t: "EMH 的三种形式", kids: [
          { t: "弱式：历史价量、卖空余额" },
          { t: "半强式：+ 财务会计信息" },
          { t: "强式：+ 内幕信息" },
          { t: "Kendall (1953)：价格近似随机游走" }
        ]},
        { t: "可预测 ⇒ 无效率（Tesla 反证）", kids: [
          { t: "若 RSI<30 就能涨 20%，人人会抢跑" },
          { t: "抢跑本身就把价格推到新位置" },
          { t: "信息竞赛 arms race 是 EMH 的隐含前提" }
        ]},
        { t: "EMH 的两条隐含假设", kids: [
          { t: "投资者理性（按 Bayes 更新 + EU 决策）" },
          { t: "套利机制运转良好" },
          { t: "行为金融放松第一条，摩擦金融放松第二条" }
        ]},
        { t: "联合假设问题 Joint hypothesis", kids: [
          { t: "必须用一个资产定价模型才能定义「正常收益」" },
          { t: "拒绝 α=0 未必等于市场无效" },
          { t: "替代检验：基金经理能否持续创造 α" }
        ]},
        { t: "行为金融的两个定义", kids: [
          { t: "定义 1：某些金融现象源于不完全理性的思考" },
          { t: "定义 2：用心理上更现实的模型解释金融现象" },
          { t: "三个范式：传统 / 摩擦 / 行为" }
        ]},
        { t: "泡沫：EMH 的直接反例", kids: [
          { t: "郁金香 1637、互联网 1995-2000、A 股 2014-15" },
          { t: "非信息驱动、模式可识别、整体错误定价" },
          { t: "解释：这次不一样 / 过度自信 / 外推 / 羊群" }
        ]},
        { t: "Fama vs. Shleifer：泡沫之争的判据", kids: [
          { t: "Fama：需要事前可识别的崩盘预测才算泡沫" },
          { t: "GSY (2017)：40 起美国行业泡沫 + 107 起国际案例" },
          { t: "加速度（凸性）比涨幅更能预测崩盘" },
          { t: "平均收益难预测，但崩盘概率 20% → 80%" }
        ]},
        { t: "行为金融的两大经典质疑与回应", kids: [
          { t: "套利质疑 → 回应：套利是有限的" },
          { t: "缺乏纪律质疑 → 回应：用新预测去检验" },
          { t: "起源：Shiller (1981)；起飞：1990s" }
        ]}
      ]
    },

    part2: {
      root: "Part 2 · 套利限制 Limits to Arbitrage",
      note: "核心是「为什么理性的钱也不敢把价格拉回来」。",
      kids: [
        { t: "四个术语：谁是谁", kids: [
          { t: "基本面价值 = 完全理性无摩擦经济下的价格" },
          { t: "错价 mispricing = 价格对基本面的偏离" },
          { t: "套利者 arbitrageurs = 理性投资者" },
          { t: "噪声交易者 noise traders = 非完全理性者" }
        ]},
        { t: "四类风险（狭义 but 关键）", kids: [
          { t: "基本面风险：关于基本面的坏消息（可用替代证券对冲，但不完全）" },
          { t: "噪声交易者风险：错价短期加深 ⇒ 被迫止损" },
          { t: "期限风险：错价纠正太慢 ⇒ 收益低于无风险利率" },
          { t: "模型风险：所谓错价其实不是错价" }
        ]},
        { t: "实施成本 Implementation costs", kids: [
          { t: "交易佣金、买卖价差" },
          { t: "卖空成本（借券费、召回风险）" },
          { t: "理解错价本身的认知成本" }
        ]},
        { t: "为什么短期限限致命：Shleifer–Vishny (1997)", kids: [
          { t: "套利者管的是别人的钱、还加杠杆" },
          { t: "短期浮亏 ⇒ 客户赎回 / 追加保证金" },
          { t: "结果：错价越深，可用资本越少" }
        ]},
        { t: "反扑：非理性交易者也会「对着干」", kids: [
          { t: "DSSW (1990)：噪声交易者抱乐观 ⇒ 理性人也跟进买入" },
          { t: "实证：Brunnermeier–Nagel (2004) 对冲基金在互联网泡沫中仍然超配科技股" }
        ]},
        { t: "证据一：孪生股 Twin shares", kids: [
          { t: "Royal Dutch / Shell：理论上价格比应为 60/40 = 1.5" },
          { t: "Froot–Dabora (1999)：实际长期偏离，一度折价 35%" },
          { t: "限制了什么？基本面风险几乎为零，主要是卖空成本与资金约束" }
        ]},
        { t: "证据二：股权分拆 carve-outs", kids: [
          { t: "Mitchell et al. (2002)：母公司市值 < 子公司持股价值" },
          { t: "Lamont–Thaler (2003)：6 例中卖空费用是关键摩擦" },
          { t: "70 例中有 18 例以失败告终（基本面风险）" }
        ]},
        { t: "证据三：指数纳入 Index inclusion", kids: [
          { t: "Harris–Gurel (1986)、Shleifer (1986)：纳入后跳涨且不回落" },
          { t: "Wurgler–Zhuravskaya (2002)：替代品越差，跳涨越多" },
          { t: "限制了什么？替代品的不完美 ⇒ 基本面风险不可分散" }
        ]},
        { t: "动态版质疑：噪声交易者会破产吗", kids: [
          { t: "静态版：即使纠正不了，长期也不会影响价格" },
          { t: "动态版：亏钱的人最终退出市场（survival literature）" },
          { t: "现实折中：短期影响价格，长期才谈生存" }
        ]}
      ]
    },

    part3: {
      root: "Part 3 · 心理学基础 Psychology",
      note: "两类放松：偏离 Bayes（信念）与偏离 EU（偏好）。",
      kids: [
        { t: "前景理论四大要素", kids: [
          { t: "参考点依赖：价值载体是损益而非最终财富" },
          { t: "损失厌恶：v(x) 在原点有折点，λ ≈ 2.25" },
          { t: "边际递减敏感度：收益区凹、损失区凸" },
          { t: "概率权重：π(p) 高估小概率" }
        ]},
        { t: "前瞻值 vs 期望效用", kids: [
          { t: "EU：p·U(W+x) + q·U(W+y)" },
          { t: "PT：π(p)·v(x) + π(q)·v(y)" },
          { t: "累积前景理论 CPT：对累积分布做权重变换" }
        ]},
        { t: "Tversky–Kahneman (1992) 参数化", kids: [
          { t: "v(x) = x^α (x≥0)；= −λ(−x)^α (x<0)" },
          { t: "α = 0.88，λ = 2.25，δ = 0.65" },
          { t: "π(P) = P^δ / (P^δ + (1−P)^δ)^(1/δ)" }
        ]},
        { t: "概率权重的心理基础", kids: [
          { t: "敏感度递减：0.99→1.00 的心理距离远大于 0.45→0.55" },
          { t: "进化解释：把风吹草动当猛兽比漏判便宜" },
          { t: "显著性：极端/新颖的结果占用更多注意力" }
        ]},
        { t: "禀赋效应 Endowment effect", kids: [
          { t: "卖方 7.12 vs 买方 2.87 vs 选择者 3.12" },
          { t: "损失厌恶在无风险环境下的表现" },
          { t: "≈ System I（快系统）的典型体现" }
        ]},
        { t: "窄框架 Narrow framing", kids: [
          { t: "新风险被孤立评估，不与既有风险合并" },
          { t: "拒绝 (−100, ½; 110, ½) 是损失厌恶 + 窄框架的双重证据" },
          { t: "金融含义：对股票账户单独做损益计算" }
        ]},
        { t: "模糊厌恶 Ambiguity aversion", kids: [
          { t: "Ellsberg 双瓮：偏好已知瓮，无论是押红还是押黑" },
          { t: "能力假说 competence：自认懂时厌恶消失甚至反转" },
          { t: "可通过「对比更模糊的赌局」操纵" }
        ]},
        { t: "双曲折现 Hyperbolic discounting", kids: [
          { t: "u(c₀) + β·Σ δᵗu(c_t)，β < 1" },
          { t: "预测时间不一致：naive vs sophisticated" },
          { t: "O'Donoghue & Rabin (1999)" }
        ]},
        { t: "信念侧偏差 Belief-side biases", kids: [
          { t: "代表性、小数定律：好消息序列被外推" },
          { t: "保守性、锚定：公开信息更新不足" },
          { t: "过度自信、证实偏差、记忆偏差" }
        ]},
        { t: "社会心理学与社会传染", kids: [
          { t: "认知失调、从众、群体思维、服从权威" },
          { t: "人格 + 环境两条宽路径" },
          { t: "为羊群行为与泡沫提供微观基础" }
        ]}
      ]
    },

    part4: {
      root: "Part 4 · 资产价格的事实 Facts: Asset Prices",
      note: "三类问题：能不能解释总量三大谜？能不能解释横截面异象？能不能解释泡沫？",
      kids: [
        { t: "共识的演变：1970s vs today", kids: [
          { t: "早期：CAPM 好用、收益不可预测、主动管理跑不赢" },
          { t: "现在：存在 β 解释不了的平均收益；收益可预测" },
          { t: "McLean & Pontiff (2016)：异象公开发表后衰减" }
        ]},
        { t: "股权溢价之谜 Equity premium puzzle", kids: [
          { t: "1889–2005 美股年均超额收益 6.4%" },
          { t: "Hansen–Jagannathan 界：Sharpe ≤ σ(m)/E(m) ≈ γ·σ(Δln c)" },
          { t: "σ(Δln c) ≈ 1%、Sharpe ≈ 0.5 ⇒ 需要 γ ≈ 50" },
          { t: "rational 解法：习惯形成、长期风险、罕见灾难" }
        ]},
        { t: "波动之谜 Volatility puzzle", kids: [
          { t: "实际年化波动 ≈ 20%，理性模型给不出" },
          { t: "Shiller (1981)、LeRoy–Porter (1981)：超额波动" },
          { t: "固定折现率 + 理性预期是致命组合" },
          { t: "时变风险厌恶（习惯形成）是较被接受的出路" }
        ]},
        { t: "可预测性之谜 Predictability puzzle", kids: [
          { t: "R_{t→t+k} = a + b·(D_t/P_t)" },
          { t: "理性预期下投资者应知道 ⇒ 定价该消化掉" },
          { t: "P/D 预测不了现金流 ⇒ 只能预测收益" }
        ]},
        { t: "横截面：为什么 β 不够", kids: [
          { t: "Fama & French (1992)：β 在截面里没有预测力" },
          { t: "控制 β 后，许多特征有预测力" },
          { t: "两大结果是价值与动量" }
        ]},
        { t: "动量 vs 反转：必须一起解释", kids: [
          { t: "De Bondt–Thaler (1985)：3–5 年负向" },
          { t: "Jegadeesh–Titman (1993)：2–12 月正向" },
          { t: "Lehmann (1990)：1 月/周负向" },
          { t: "Asness–Moskowitz–Pedersen (2013)：多资产皆然" }
        ]},
        { t: "其他横截面预测变量", kids: [
          { t: "规模 Banz (1981)、价值 FF (1992)" },
          { t: "盈利惊喜 Bernard–Thomas (1989)；分析师修正 CJL (1996)" },
          { t: "发行 Loughran–Ritter (1995)；应计 Sloan (1996)" },
          { t: "波动：Ang et al. (2006) IVOL；BAB Frazzini–Pedersen (2010)" }
        ]},
        { t: "方法论：如何才算一个新异象", kids: [
          { t: "Fama–MacBeth 回归 + 时间序列 α 双重检验" },
          { t: "数据挖掘 data mining 是主要顾虑" },
          { t: "三因子模型能否「解释」？" }
        ]},
        { t: "其他资产类别与泡沫", kids: [
          { t: "国债：预期假说失效；信用债：信用利差之谜" },
          { t: "货币：carry trade 高收益；商品：时间序列动量" },
          { t: "泡沫：高换手率、聪明钱也会 ride、常由好消息触发" }
        ]}
      ]
    },

    part5: {
      root: "Part 5 · 投资者行为的事实 Facts: Investor Behavior",
      note: "以散户（家庭金融）为主，兼看机构业绩。",
      kids: [
        { t: "数据来源：为什么现在是黄金期", kids: [
          { t: "SCF 消费金融调查、券商账户（Odean）" },
          { t: "芬兰、瑞典全样本税务数据" },
          { t: "401(k) 计划数据、TAQ" }
        ]},
        { t: "储蓄不足 Under-saving", kids: [
          { t: "2/3 受访者自认储蓄率不足" },
          { t: "35% 计划提高，几乎没人真的做" },
          { t: "≈ 拖延 + 双曲折现的现实表现" }
        ]},
        { t: "不参与 Non-participation", kids: [
          { t: "1984 年仅 28% 家庭持股；流动资产 >10万美元者中也仅 48%" },
          { t: "参与率与教育、收入、财富正相关" },
          { t: "理性解释：一次性/持续参与成本" }
        ]},
        { t: "买高卖低 Buy high, sell low", kids: [
          { t: "资金加权收益 < 时间加权收益约 1.6%/年" },
          { t: "在高收益前加仓、在低收益前减仓" },
          { t: "Friesen & Sapp (2007)" }
        ]},
        { t: "分散化不足的四种类型", kids: [
          { t: "本土偏好：美/英/日 94/82/98%" },
          { t: "本地偏好：31% 持仓在 250 英里内" },
          { t: "集中持股：1989 年约 30% 家庭持股 < 10 只" },
          { t: "本公司重仓：401(k) 自主缴费的 23%" }
        ]},
        { t: "选股业绩 Stock-picking performance", kids: [
          { t: "Barber & Odean (2000)：净收益跑输各类基准" },
          { t: "亏损主要来自交易成本（交易越频繁越差）" },
          { t: "认知能力高者表现更好，但仍只刚好覆盖成本" }
        ]},
        { t: "处置效应 Disposition effect", kids: [
          { t: "Odean (1998)：PGR > PLR" },
          { t: "不能被信息、流动性、税收、再平衡解释" },
          { t: "专业程度越高越弱；房地产同样存在" }
        ]},
        { t: "卖出倾向的新事实", kids: [
          { t: "V 型关系：盈亏幅度大时更容易卖" },
          { t: "rank 效应：组合中极端排名的股票更容易被卖" },
          { t: "Ben-David & Hirshleifer (2012)；Hartzmark (2015)" }
        ]},
        { t: "退休后：年金化不足", kids: [
          { t: "Yaari (1965)：退休时应 100% annuitize" },
          { t: "现实中极少有人这么做" },
          { t: "解释：遗赠动机、逆向选择、框架效应" }
        ]},
        { t: "负债侧与机构投资者", kids: [
          { t: "家庭债务占 GDP 从 1970 的 50% → 2012 的 100%" },
          { t: "ARM vs FRM 选择、再融资、违约决策" },
          { t: "基金毛 α 略为正、净 α 约为零 ⇒ Rubinstein (2001) 推论" }
        ]}
      ]
    },

    part6: {
      root: "Part 6 · 行为资产定价模型 Behavioral Models",
      note: "好模型的标准：一个模型同时解释动量、反转、过度波动与高溢价。",
      kids: [
        { t: "建模的两条路线", kids: [
          { t: "偏好路线：前景理论型投资者" },
          { t: "信念路线：非 Bayes 的信念更新" },
          { t: "共同点：只有一部分人非理性，且套利受限" }
        ]},
        { t: "DSSW (1990)：噪声交易者模型", kids: [
          { t: "噪声交易者的情绪 ρ 直接进入均衡价格" },
          { t: "理性人知道会回归，但噪声交易者风险让他们不敢满仓" },
          { t: "结论：价格 = 基本面 + 情绪；可解释过度波动" }
        ]},
        { t: "BSV (1998)：保守性 + 代表性", kids: [
          { t: "保守性：对公开信息更新不足 ⇒ 动量 / PEAD" },
          { t: "代表性：把好消息序列当趋势 ⇒ 长期反转" },
          { t: "一个模型两个后果，正好对应 Part 4 的事实" }
        ]},
        { t: "DHS (1998)：过度自信 + 自我归因", kids: [
          { t: "过度自信 ⇒ 过度倚重私有信息 ⇒ 初期过度反应" },
          { t: "自我归因偏差 ⇒ 偏差随证实而加深" },
          { t: "公开信息到来时价格才回归 ⇒ 反转" }
        ]},
        { t: "HS (1999)：渐进信息扩散", kids: [
          { t: "信息观察者只拿到部分私人信息" },
          { t: "动量交易者只能做简单的趋势策略" },
          { t: "信息缓慢扩散 ⇒ 短期动量，随后反转" }
        ]},
        { t: "统一理论的共同预测", kids: [
          { t: "短期：反应不足 ⇒ 动量" },
          { t: "长期：过度反应 ⇒ 反转" },
          { t: "波动大于基本面 ⇒ 波动之谜" }
        ]},
        { t: "BHS (2001)：前景理论 + 股权溢价", kids: [
          { t: "投资者对股票账户盈亏做窄框架评估" },
          { t: "前期盈利 ⇒ 损失厌恶减弱 ⇒ 愿意冒更大风险" },
          { t: "反之亦然 ⇒ 价格大幅波动且要求高溢价" }
        ]},
        { t: "心理学免费模型 Psychology-free models", kids: [
          { t: "仅用有限理性/信息摩擦，不引入具体心理机制" },
          { t: "例如不关注、信息处理成本" },
          { t: "好处：更难被指责为「事后挑心理」" }
        ]},
        { t: "实证上的自我约束", kids: [
          { t: "必须提出可证伪的新预测" },
          { t: "构造行为因子并做交易策略检验" },
          { t: "回应 lack-of-discipline 批评" }
        ]}
      ]
    },

    part7: {
      root: "Part 7 · 行为公司金融 & 规范性行为金融",
      note: "两条对称路线：投资者非理性 vs 管理者非理性；以及怎么用它们改善决策。",
      kids: [
        { t: "框架：谁是理性的那个？", kids: [
          { t: "投资者非理性 + 管理者理性" },
          { t: "管理者非理性 + 投资者理性" },
          { t: "两者都非理性" }
        ]},
        { t: "市场择时 Market timing", kids: [
          { t: "股价高估 ⇒ 发股；低估 ⇒ 回购 / 现金收购" },
          { t: "Baker & Wurgler (2002)：资本结构是历史融资窗口的累积" },
          { t: "推论：杠杆率与历史估值负相关" }
        ]},
        { t: "迎合理论与 cater", kids: [
          { t: "迎合投资者的股利偏好 ⇒ 发放或取消股利" },
          { t: "迎合对成长股的偏好 ⇒ 改名、拆股、概念化" },
          { t: "Polk & Sapienza (2009)：迎合投资偏好做真实投资" }
        ]},
        { t: "管理者过度自信 CEO overconfidence", kids: [
          { t: "高估自身项目的 NPV ⇒ 过度投资" },
          { t: "过度自信者偏好内源资金 ⇒ 债务保守" },
          { t: "并购：赢家诅咒、溢价过高、股价下跌" },
          { t: "Roll (1986) hubris hypothesis" }
        ]},
        { t: "锚定与管理层决策", kids: [
          { t: "要约收购锚在过去的 52 周高点" },
          { t: "分析师预期锚定与管理层业绩指引" },
          { t: "薪酬对标公司的锚" }
        ]},
        { t: "规范性 BF 的问题意识", kids: [
          { t: "描述性 BF 告诉你哪里会错" },
          { t: "规范性 BF 告诉你怎么改（制度而非说教）" },
          { t: "naive vs sophisticated 的时间不一致" }
        ]},
        { t: "自助型处方 Self-correction", kids: [
          { t: "降低查看账户频率 ⇒ 缓解短视损失厌恶" },
          { t: "拉长评估周期、预设再平衡/止损规则" },
          { t: "投资日记对抗事后聪明偏差" }
        ]},
        { t: "助推与选择架构 Nudge", kids: [
          { t: "自动加入 automatic enrollment" },
          { t: "SMarT：Save More Tomorrow，把加薪与提缴绑定" },
          { t: "默认选项 default 的力量" },
          { t: "Thaler & Benartzi (2004)" }
        ]},
        { t: "局限与边界", kids: [
          { t: "助推不能解决能力不足与市场规模问题" },
          { t: "对外推广前需做成本收益与异质性分析" },
          { t: "行为金融不是「万能 explanation」，先问套利是否真的受限" }
        ]}
      ]
    },

    part8: {
      root: "Part 8 · 前景理论的应用",
      note: "把 EU 换成 PT 后能解释什么？三条线：横截面定价、总体市场、交易行为。",
      kids: [
        { t: "CPT 函数形式与参数", kids: [
          { t: "v(x)=x^0.88（盈利）/ −2.25(−x)^0.88（亏损）" },
          { t: "π(P)=P^δ/(P^δ+(1−P)^δ)^{1/δ}，δ=0.65" },
          { t: "α=0.88，λ=2.25：温和凹性 + 强损失厌恶" },
          { t: "reference point 内生化的挑战：Kőszegi–Rabin" }
        ]},
        { t: "应用一：横截面——偏度定价", kids: [
          { t: "正偏股票被高估 ⇒ 未来收益更低（BMV 2010）" },
          { t: "彩票型证据：IPO/OTC、高 IVOL、MAX（BCW 2011）" },
          { t: "总体市场负偏 ⇒ 要求高溢价（CDG 2007）" },
          { t: "MV 2007：分散化不足与偏度偏好" },
          { t: "BMW 2016：用 CPT 反推每只股票的 TK 值" },
          { t: "损失厌恶之谜：高波动股票收益反而更低" }
        ]},
        { t: "应用二：总体市场——股权溢价", kids: [
          { t: "Benartzi–Thaler 短视损失厌恶三要素" },
          { t: "BHS / BHT：窄框架下的损失厌恶" },
          { t: "De Giorgi–Legg：概率加权的贡献" },
          { t: "动态损失厌恶：参照点随市场变化" }
        ]},
        { t: "应用三：交易行为——实现效用", kids: [
          { t: "朴素 PT 预测卖亏持盈，为何失败" },
          { t: "Realization utility：效用来自已实现盈亏" },
          { t: "七个应用：过度交易、破前高卖出、波动率负溢价…" },
          { t: "Frydman et al. (2014)：腹侧纹状体 vSt 神经证据" }
        ]}
      ]
    },

    part9: {
      root: "Part 9 · 显著性理论（Salience Theory）",
      note: "注意力聚焦最显著 payoff 并高估其状态权重；选择是 context-dependent 的。",
      kids: [
        { t: "Allais 悖论", kids: [
          { t: "L₁(z)={2500:0.33, 0:0.01, z:0.66} vs L₂(z)={2400:0.34, z:0.66}" },
          { t: "Case 1（z=2400）：选确定 2400 → 风险厌恶" },
          { t: "Case 2（z=0）：选 L₁ → 风险寻求（偏好逆转）" },
          { t: "课件第 13 页文字笔误，以公式 L₁(0)≻L₂(0) 为准" }
        ]},
        { t: "两种解释", kids: [
          { t: "PT：固定 π 高估小概率——解释勉强" },
          { t: "ST：情境决定显著性——下行显著则厌恶、上行显著则寻求" },
          { t: "ST vs PT：尾部「总是」vs「仅当显著时」被高估" },
          { t: "相关结构 correlation structure 只在 ST 中重要" }
        ]},
        { t: "形式化", kids: [
          { t: "σ(x,x̄)=|x−x̄|/(|x|+|x̄|+θ)，θ>0" },
          { t: "三性质：Ordering / Diminishing sensitivity / Reflection" },
          { t: "π̃_is = π_s·ω_is，ω_is = δ^{k}/Σδ^{k}π" },
          { t: "δ=1 无扭曲；δ<1 显著状态权重被放大" }
        ]},
        { t: "BGS (2013) 定价模型", kids: [
          { t: "代表性 salient thinker，两期，线性效用" },
          { t: "FOC ⇒ p_i = E[x_is] + cov[ω_is, x_is]" },
          { t: "E[r_is] = −cov[ω_is, r_is] ≡ −ST_i" },
          { t: "上行显著 ⇒ 高估 ⇒ 未来收益低" }
        ]},
        { t: "实证：ST 因子（Cosemans & Frehen 2021）", kids: [
          { t: "状态=过去一月日收益，θ=0.1，δ=0.7" },
          { t: "EW High−Low = −1.28%/月（t=−10.73）" },
          { t: "双重排序：控制 REV、MAX 后价差收窄" },
          { t: "Fama–MacBeth：套利限制交互项全部正显著" },
          { t: "Open-to-open 收益下预测力减弱 → 注意力现象" }
        ]}
      ]
    }
  };

  /* ============================================================
     Render
     ============================================================ */
  function node(label, kids, depth) {
    var has = kids && kids.length;
    /* 主干（depth 1）可见，其下的细节（depth ≥ 2）默认折叠，点击 ➕ 展开 */
    var cls = "mm-item" + (has ? " mm-branch" : " mm-leaf") + (depth >= 1 ? " collapsed" : "");
    var s = "<li class='" + cls + "'>";
    if (has) {
      s += "<button type='button' class='mm-toggle' aria-label='展开或折叠'><span class='mm-sign'>−</span></button>";
    } else {
      s += "<span class='mm-bullet'></span>";
    }
    s += "<span class='mm-text'>" + label.replace(/</g, "&lt;") + "</span>";
    if (has) {
      s += "<ul>" + kids.map(function (k) { return node(k.t, k.kids, depth + 1); }).join("") + "</ul>";
    }
    return s + "</li>";
  }

  function render() {
    var host = document.getElementById("mindmap-host");
    if (!host) return;
    var key = document.body.getAttribute("data-page");
    var data = MAPS[key];
    if (!data) { host.style.display = "none"; return; }

    host.className = "mindmap";
    host.innerHTML =
      "<div class='mm-head'>" +
        "<div class='mm-head-l'><h3>知识地图 Mind Map</h3>" +
        "<p class='mm-note'>" + data.note + "</p></div>" +
        "<div class='mm-actions'>" +
          "<button type='button' class='mm-btn' data-act='expand'>全部展开</button>" +
          "<button type='button' class='mm-btn' data-act='collapse'>全部折叠</button>" +
        "</div>" +
      "</div>" +
      "<div class='mm-body'><ul class='mm-root'><li class='mm-item mm-branch'>" +
        "<button type='button' class='mm-toggle'><span class='mm-sign'>−</span></button>" +
        "<span class='mm-text mm-root-text'>" + data.root + "</span><ul>" +
        data.kids.map(function (k) { return node(k.t, k.kids, 1); }).join("") +
        "</ul></li></ul></div>";

    /* toggle a branch (and keep the root open so the map never looks empty) */
    host.addEventListener("click", function (e) {
      var btn = e.target.closest ? e.target.closest(".mm-toggle") : null;
      if (btn) {
        var li = btn.parentNode;
        li.classList.toggle("collapsed");
        var sign = btn.querySelector(".mm-sign");
        if (sign) {
          sign.textContent = li.classList.contains("collapsed") ? "+" : "−";
        }
        return;
      }
      var act = e.target.closest ? e.target.closest(".mm-btn") : null;
      if (act) {
        var all = host.querySelectorAll(".mm-item.mm-branch");
        var collapse = act.getAttribute("data-act") === "collapse";
        Array.prototype.forEach.call(all, function (li) {
          if (li.classList.contains("mm-root-text") ||
              li.parentNode.classList.contains("mm-root")) return;
          li.classList.toggle("collapsed", collapse);
          var sg = li.querySelector(":scope > .mm-toggle .mm-sign");
          if (sg) { sg.textContent = collapse ? "+" : "−"; }
        });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }

  window.MindMaps = MAPS;
})();

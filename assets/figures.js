/* ============================================================
   FIN 4080 Behavioral Finance — Inline SVG figure library
   Renders conceptual diagrams into <div class="fig" data-fig="NAME">
   Figures are hand-written vector SVG: crisp, tiny, offline-safe.
   ============================================================ */
(function () {
  "use strict";

  var C = {
    navy: "#0f2b52", blue: "#1d4ed8", blueSoft: "#eaf1ff", blueLine: "#c7d9ff",
    amber: "#b45309", amberSoft: "#fff7ed", amberLine: "#fed7aa",
    green: "#047857", greenSoft: "#ecfdf5", greenLine: "#a7f3d0",
    purple: "#6d28d9", purpleSoft: "#f5f3ff", purpleLine: "#ddd6fe",
    red: "#b91c1c", redSoft: "#fef2f2", redLine: "#fecaca",
    gray: "#94a3b8", graySoft: "#f8fafc",
    ink: "#1b2430", muted: "#6b7787", axis: "#94a3b8", grid: "#e8edf4"
  };
  var FONT = "'Segoe UI','PingFang SC','Microsoft YaHei',sans-serif";

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function n(v) { return Math.round(v * 10) / 10; }

  function txt(x, y, s, o) {
    o = o || {};
    return "<text x='" + n(x) + "' y='" + n(y) + "' text-anchor='" + (o.anchor || "middle") +
      "' font-family=\"" + FONT + "\" font-size='" + (o.size || 12) +
      "' fill='" + (o.fill || C.ink) + "' font-weight='" + (o.weight || 400) + "'" +
      (o.italic ? " font-style='italic'" : "") + ">" + esc(s) + "</text>";
  }
  function line(x1, y1, x2, y2, o) {
    o = o || {};
    return "<line x1='" + n(x1) + "' y1='" + n(y1) + "' x2='" + n(x2) + "' y2='" + n(y2) +
      "' stroke='" + (o.stroke || C.axis) + "' stroke-width='" + (o.w || 1.5) + "'" +
      (o.dash ? " stroke-dasharray='" + o.dash + "'" : "") +
      (o.cap ? " stroke-linecap='round'" : "") + "/>";
  }
  function path(d, o) {
    o = o || {};
    return "<path d='" + d + "' fill='" + (o.fill || "none") + "' stroke='" + (o.stroke || C.blue) +
      "' stroke-width='" + (o.w || 2) + "'" + (o.dash ? " stroke-dasharray='" + o.dash + "'" : "") +
      (o.opacity ? " opacity='" + o.opacity + "'" : "") + " stroke-linejoin='round'/>";
  }
  function dot(x, y, r, o) {
    o = o || {};
    return "<circle cx='" + n(x) + "' cy='" + n(y) + "' r='" + (r || 4.5) + "' fill='" + (o.fill || C.blue) +
      "'" + (o.stroke ? " stroke='" + o.stroke + "' stroke-width='2'" : "") + "/>";
  }
  function rect(x, y, w, h, o) {
    o = o || {};
    return "<rect x='" + n(x) + "' y='" + n(y) + "' width='" + n(w) + "' height='" + n(h) +
      "' rx='" + (o.rx || 5) + "' fill='" + (o.fill || C.blueSoft) + "' stroke='" + (o.stroke || C.blueLine) +
      "' stroke-width='" + (o.sw || 1) + "'" + (o.opacity ? " opacity='" + o.opacity + "'" : "") + "/>";
  }
  function arrow(x1, y1, x2, y2, o) {
    o = o || {};
    var col = o.stroke || C.blue, w = o.w || 2;
    var ang = Math.atan2(y2 - y1, x2 - x1), hs = o.head || 7;
    var ax = x2 - hs * Math.cos(ang - 0.42), ay = y2 - hs * Math.sin(ang - 0.42);
    var bx = x2 - hs * Math.cos(ang + 0.42), by = y2 - hs * Math.sin(ang + 0.42);
    return line(x1, y1, x2, y2, { stroke: col, w: w, dash: o.dash }) +
      "<path d='M" + n(x2) + "," + n(y2) + " L" + n(ax) + "," + n(ay) + " L" + n(bx) + "," + n(by) +
      " Z' fill='" + col + "'/>";
  }

  /* measured text width: CJK ≈ font-size, ASCII ≈ 0.56× */
  function textW(s, size) {
    var w = 0, i, c;
    s = String(s);
    for (i = 0; i < s.length; i++) {
      c = s.charCodeAt(i);
      w += (c > 0x2E7F) ? size : size * 0.56;
    }
    return w;
  }

  /* ---- axis frame:
     axis at B; tick labels at B+16; axis title at B+37; caption free at B+59 ---- */
  function frame(o) {
    var H = o.h || 300, L = 74, R = 644, T = 34, B = H - 66;
    var sx = function (v) { return L + (v - o.xMin) / (o.xMax - o.xMin) * (R - L); };
    var sy = function (v) { return B - (v - o.yMin) / (o.yMax - o.yMin) * (B - T); };
    var s = "";
    (o.yTicks || []).forEach(function (t) {
      var y = sy(t.v);
      s += line(L, y, R, y, { stroke: C.grid, w: 1 });
      s += txt(L - 8, y + 4, t.l, { anchor: "end", size: 10.5, fill: C.muted });
    });
    (o.xTicks || []).forEach(function (t) {
      var x = sx(t.v);
      s += line(x, T, x, B, { stroke: C.grid, w: 1 });
      s += txt(x, B + 16, t.l, { size: 10.5, fill: C.muted });
    });
    s += line(L, T, L, B, { stroke: C.axis, w: 1.6 });
    s += line(L, B, R, B, { stroke: C.axis, w: 1.6 });
    s += txt((L + R) / 2, B + 37, o.xLabel || "", { size: 12, weight: 600, fill: C.navy });
    s += "<text x='16' y='" + n((T + B) / 2) + "' text-anchor='middle' font-family=\"" + FONT +
      "\" font-size='12' fill='" + C.navy + "' font-weight='600' transform='rotate(-90 16 " +
      n((T + B) / 2) + ")'>" + esc(o.yLabel || "") + "</text>";
    return { svg: s, sx: sx, sy: sy, L: L, R: R, T: T, B: B, H: H, capY: B + 59 };
  }

  function wrap(H, inner) {
    return "<svg viewBox='0 0 680 " + H + "' width='100%' role='img' style='display:block;max-width:680px;margin:0 auto'>" +
      "<rect x='0' y='0' width='680' height='" + H + "' fill='#fbfcfe' rx='10'/>" + inner + "</svg>";
  }

  function legend(items, x, y) {
    var s = "", cx = x;
    items.forEach(function (it) {
      s += line(cx, y, cx + 22, y, { stroke: it.color, w: 2.6, dash: it.dash });
      if (it.dot) s += dot(cx + 11, y, 4, { fill: it.color });
      s += txt(cx + 27, y + 4, it.label, { anchor: "start", size: 11, fill: C.ink });
      cx += 27 + textW(it.label, 11) + 22;
    });
    return s;
  }

  /* column node: title + lines, safe against overlap (22px baseline step) */
  function colNode(cx, y, w, o) {
    o = o || {};
    var lines = o.lines || [], h = 34 + lines.length * 22 + 8;
    var x = cx - w / 2, s = rect(x, y, w, h, { fill: o.fill, stroke: o.stroke, rx: 8, sw: 1.4 });
    s += txt(cx, y + 21, o.title, { size: 12.5, weight: 700, fill: o.titleFill || C.navy });
    lines.forEach(function (l, i) {
      s += txt(cx, y + 41 + i * 22, l, { size: 11, fill: o.textFill || C.ink });
    });
    return { svg: s, bottom: y + h };
  }

  /* ============================================================
     FIGURES
     ============================================================ */
  var FIG = {};

  /* ---------- 1. Three paradigms ---------- */
  FIG.paradigms = function () {
    var H = 286, s = "";
    s += txt(340, 26, "金融学的三个范式 Three Paradigms", { size: 13, weight: 700, fill: C.navy });
    var cols = [
      { cx: 118, t: "传统金融", en: "Traditional", fill: C.graySoft, st: C.gray,
        lines: ["行为人理性", "无摩擦", "最基础：心理与", "制度都不现实"] },
      { cx: 340, t: "摩擦金融", en: "Frictional", fill: C.blueSoft, st: C.blueLine,
        lines: ["行为人理性", "有摩擦", "制度更现实", "（不能自由借贷）"] },
      { cx: 562, t: "行为金融", en: "Behavioral", fill: C.amberSoft, st: C.amberLine,
        lines: ["部分行为人", "非完全理性", "心理上更现实", "偏离 Bayes/EU"] }
    ];
    cols.forEach(function (c) {
      var nd = colNode(c.cx, 46, 190, { title: c.t + " · " + c.en, lines: c.lines, fill: c.fill, stroke: c.st });
      s += nd.svg;
    });
    s += arrow(222, 108, 240, 108, { stroke: C.muted, w: 2 });
    s += arrow(444, 108, 462, 108, { stroke: C.muted, w: 2 });
    s += txt(340, 200, "放宽假设的方向 →", { size: 11, fill: C.muted });
    s += rect(70, 222, 540, 46, { fill: C.greenSoft, stroke: C.greenLine, rx: 8 });
    s += txt(340, 244, "行为金融的定义：研究「某些金融现象是否源于不完全理性的思考」", { size: 11.5, weight: 600, fill: C.green });
    s += txt(340, 260, "Definition: financial phenomena as the result of less than fully rational thinking", { size: 10, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 2. Two pillars of rationality ---------- */
  FIG.rational_bench = function () {
    var H = 268, s = "";
    s += txt(340, 26, "理性的两根支柱 Two Pillars of Rationality", { size: 13, weight: 700, fill: C.navy });
    s += rect(60, 46, 250, 62, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(185, 68, "信念更新 beliefs", { size: 12.5, weight: 700, fill: C.navy });
    s += txt(185, 88, "按 Bayes' rule 更新", { size: 11, fill: C.ink });
    s += rect(370, 46, 250, 62, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(495, 68, "决策偏好 preferences", { size: 12.5, weight: 700, fill: C.navy });
    s += txt(495, 88, "按 EU / SEU 最大化", { size: 11, fill: C.ink });
    s += arrow(185, 112, 185, 148, { stroke: C.red, w: 2, dash: "5 3" });
    s += arrow(495, 112, 495, 148, { stroke: C.red, w: 2, dash: "5 3" });
    s += rect(60, 152, 250, 78, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(185, 174, "心理：偏离 Bayes' rule", { size: 12, weight: 700, fill: C.amber });
    s += txt(185, 194, "代表性 · 保守性 · 锚定", { size: 10.5, fill: C.ink });
    s += txt(185, 212, "过度自信 · 证实偏差", { size: 10.5, fill: C.ink });
    s += rect(370, 152, 250, 78, { fill: C.purpleSoft, stroke: C.purpleLine, rx: 8 });
    s += txt(495, 174, "心理：偏离 EU", { size: 12, weight: 700, fill: C.purple });
    s += txt(495, 194, "前景理论 · 损失厌恶", { size: 10.5, fill: C.ink });
    s += txt(495, 212, "模糊厌恶 · 窄框架", { size: 10.5, fill: C.ink });
    s += txt(340, 254, "效用定义在财富/消费之上 ⇒ 研究信念时放松前者，研究偏好时放松后者", { size: 11, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 3. Capital allocation line ---------- */
  FIG.cal = function () {
    var f = frame({
      h: 312, xMin: 0, xMax: 0.30, yMin: 0.02, yMax: 0.14,
      xLabel: "组合标准差 σ", yLabel: "期望收益 E(r)",
      xTicks: [{ v: 0, l: "0" }, { v: 0.08, l: "8%" }, { v: 0.16, l: "16%" }, { v: 0.24, l: "24%" }],
      yTicks: [{ v: 0.03, l: "3%" }, { v: 0.05, l: "5%" }, { v: 0.07, l: "7%" }, { v: 0.09, l: "9%" }, { v: 0.11, l: "11%" }, { v: 0.13, l: "13%" }]
    });
    var s = f.svg, y0 = f.sy(0.03), xp = f.sx(0.20), yp = f.sy(0.11);
    s += line(f.L, y0, f.sx(0.26), f.sy(0.03 + 0.08 / 0.20 * 0.26), { stroke: C.blue, w: 2.4 });
    s += dot(xp, yp, 5, { fill: C.blue });
    s += txt(xp + 8, yp - 8, "P 风险资产组合", { anchor: "start", size: 11, weight: 600, fill: C.blue });
    s += dot(f.L, y0, 4.5, { fill: C.green });
    s += txt(f.L + 10, y0 + 17, "r_f 无风险资产", { anchor: "start", size: 11, weight: 600, fill: C.green });
    s += txt((f.L + xp) / 2 - 6, (y0 + yp) / 2 - 8, "CAL", { size: 12.5, weight: 700, fill: C.navy });
    s += txt((f.L + xp) / 2 + 22, (y0 + yp) / 2 + 8, "斜率 = Sharpe ratio", { size: 10.5, fill: C.muted });
    s += rect(390, 176, 240, 56, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(510, 196, "有借贷约束时", { size: 11, weight: 700, fill: C.amber });
    s += txt(510, 216, "CAL 变成两段折线", { size: 10.5, fill: C.ink });
    s += txt(340, f.capY, "资本市场线与夏普比率：放松「无摩擦」即进入 frictional finance", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 4. Three forms of EMH ---------- */
  FIG.emh_forms = function () {
    var H = 262, s = "";
    s += txt(340, 26, "有效市场假说的三种形式 Three Forms of EMH", { size: 13, weight: 700, fill: C.navy });
    var rows = [
      { y: 56, w: 200, t: "弱式 Weak-form", d: "过去价格、成交量、卖空余额", c: C.greenSoft, sc: C.greenLine },
      { y: 110, w: 340, t: "半强式 Semi-strong", d: "过去信息 + 财务会计信息", c: C.blueSoft, sc: C.blueLine },
      { y: 164, w: 480, t: "强式 Strong-form", d: "半强式信息 + 内幕信息", c: C.purpleSoft, sc: C.purpleLine }
    ];
    rows.forEach(function (r) {
      s += rect(340 - r.w / 2, r.y, r.w, 44, { fill: r.c, stroke: r.sc, rx: 8 });
      s += txt(340, r.y + 19, r.t, { size: 12, weight: 700, fill: C.navy });
      s += txt(340, r.y + 36, r.d, { size: 10.5, fill: C.muted });
    });
    s += line(340, 100, 340, 110, { stroke: C.muted, w: 1.5, dash: "4 3" });
    s += line(340, 154, 340, 164, { stroke: C.muted, w: 1.5, dash: "4 3" });
    s += txt(340, 232, "形式越「强」，拒绝它所需的证据越难 ⇒ 检验实证数据通常是照顾到最外层", { size: 11, fill: C.muted });
    s += txt(340, 250, "Kendall (1953): stock prices are not predictable — random walk", { size: 10.5, fill: C.muted, italic: true });
    return wrap(H, s);
  };

  /* ---------- 5. Joint hypothesis problem ---------- */
  FIG.joint_test = function () {
    var H = 236, s = "";
    s += txt(340, 26, "联合假设问题 The Joint Hypothesis Problem", { size: 13, weight: 700, fill: C.navy });
    s += rect(40, 60, 220, 60, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(150, 80, "市场有效", { size: 12, weight: 700, fill: C.navy });
    s += txt(150, 100, "Market efficiency", { size: 10.5, fill: C.muted });
    s += txt(268, 90, "+", { size: 16, weight: 700, fill: C.ink });
    s += rect(292, 60, 220, 60, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(402, 80, "资产定价模型", { size: 12, weight: 700, fill: C.navy });
    s += txt(402, 100, "Asset-pricing model", { size: 10.5, fill: C.muted });
    s += arrow(150, 124, 150, 152, { stroke: C.navy, w: 2 });
    s += arrow(402, 124, 402, 152, { stroke: C.navy, w: 2 });
    s += rect(180, 156, 320, 44, { fill: C.graySoft, stroke: C.gray, rx: 8 });
    s += txt(340, 176, "可检验的推论：α = 0", { size: 12, weight: 700, fill: C.navy });
    s += txt(340, 192, "Testable implication", { size: 10.5, fill: C.muted });
    s += txt(340, 226, "拒绝 α = 0 时，无法区分是「市场无效」还是「模型不好」", { size: 11, fill: C.red });
    return wrap(H, s);
  };

  /* ---------- 6. Bubble price path ---------- */
  FIG.bubble_path = function () {
    var f = frame({
      h: 322, xMin: 0, xMax: 10, yMin: 0, yMax: 100,
      xLabel: "时间 Time", yLabel: "价格 Price",
      xTicks: [{ v: 0, l: "0" }, { v: 2, l: "2" }, { v: 4, l: "4" }, { v: 6, l: "6" }, { v: 8, l: "8" }, { v: 10, l: "10" }],
      yTicks: [{ v: 0, l: "0" }, { v: 25, l: "25" }, { v: 50, l: "50" }, { v: 75, l: "75" }, { v: 100, l: "100" }]
    });
    var s = f.svg;
    s += path("M" + f.sx(0) + "," + f.sy(10) + " L" + f.sx(4) + "," + f.sy(30) + " L" + f.sx(8) + "," + f.sy(50) + " L" + f.sx(10) + "," + f.sy(55),
      { stroke: C.gray, w: 2.2, dash: "6 4" });
    s += txt(f.sx(9.2), f.sy(56) - 10, "基本面价值", { size: 11, fill: C.muted });
    var pts = [[0, 10], [1.5, 14], [3, 26], [4.2, 46], [5.4, 72], [6.4, 92], [7.2, 78], [8, 44], [9, 26], [10, 22]];
    var d = "M", i;
    for (i = 0; i < pts.length; i++) d += (i ? " L" : "") + n(f.sx(pts[i][0])) + "," + n(f.sy(pts[i][1]));
    s += path(d, { stroke: C.red, w: 2.6 });
    s += dot(f.sx(6.4), f.sy(92), 5, { fill: C.red });
    s += txt(f.sx(6.4) - 2, f.sy(98), "顶峰 Peak", { size: 11, weight: 600, fill: C.red });
    s += txt(f.sx(8.6), f.sy(36), "崩盘 Crash", { size: 11, weight: 600, fill: C.red });
    s += txt(f.sx(3.6), f.sy(64), "投机需求推高", { size: 10.5, fill: C.amber });
    return wrap(f.H, s);
  };

  /* ---------- 7. Acceleration / convexity ---------- */
  FIG.acceleration = function () {
    var f = frame({
      h: 310, xMin: 0, xMax: 24, yMin: 0, yMax: 100,
      xLabel: "月 Month", yLabel: "累计收益率 Cumulative return",
      xTicks: [{ v: 0, l: "0" }, { v: 12, l: "12" }, { v: 24, l: "24" }],
      yTicks: [{ v: 0, l: "0" }, { v: 25, l: "25%" }, { v: 50, l: "50%" }, { v: 75, l: "75%" }, { v: 100, l: "100%" }]
    });
    var s = f.svg;
    s += path("M" + f.sx(0) + "," + f.sy(0) + " L" + f.sx(24) + "," + f.sy(100), { stroke: C.green, w: 2.6 });
    s += txt(f.sx(19), f.sy(80) + 4, "线性增长（健康）", { size: 11, fill: C.green });
    var d = "M" + n(f.sx(0)) + "," + n(f.sy(0)), i, t;
    for (i = 1; i <= 24; i++) {
      t = i / 24;
      d += " L" + n(f.sx(i)) + "," + n(f.sy(100 * Math.pow(t, 2.6)));
    }
    s += path(d, { stroke: C.red, w: 2.6 });
    s += txt(f.sx(16), f.sy(48) - 8, "凸性：加速上涨", { size: 11, weight: 600, fill: C.red });
    s += arrow(f.sx(23), f.sy(58), f.sx(23.4), f.sy(88), { stroke: C.amber, w: 2 });
    s += legend([{ label: "后期加速度现象", color: C.red }, { label: "稳定增长 · 由基本面驱动", color: C.green }], 150, 52);
    s += txt(340, f.capY, "Greenwood, Shleifer & You (2017): Acceleration = R[t→t+24] − R[t→t+12]", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 8. Crash probability ---------- */
  FIG.crash_prob = function () {
    var f = frame({
      h: 306, xMin: 0, xMax: 5, yMin: 0, yMax: 100,
      xLabel: "过去两年累计收益（分位 · 低→高）", yLabel: "两年内崩盘概率 Crash probability",
      xTicks: [{ v: 0, l: "最低" }, { v: 1, l: "Q2" }, { v: 2, l: "Q3" }, { v: 3, l: "Q4" }, { v: 4, l: "Q5" }, { v: 5, l: "最高加速度" }],
      yTicks: [{ v: 0, l: "0%" }, { v: 25, l: "25%" }, { v: 50, l: "50%" }, { v: 75, l: "75%" }, { v: 100, l: "100%" }]
    });
    var s = f.svg, bars = [[0.5, 20], [1.5, 32], [2.5, 45], [3.5, 58], [4.5, 76]];
    bars.forEach(function (b, i) {
      var x = f.sx(b[0]) - 26, y = f.sy(b[1]);
      s += rect(x, y, 52, f.B - y, { fill: i === 4 ? C.redSoft : C.blueSoft, stroke: i === 4 ? C.red : C.blueLine, rx: 5 });
      s += txt(f.sx(b[0]), y - 7, b[1] + "%", { size: 11, weight: 700, fill: i === 4 ? C.red : C.blue });
    });
    s += line(f.L, f.sy(20), f.R, f.sy(20), { stroke: C.gray, w: 1.4, dash: "6 4" });
    s += txt(f.R - 6, f.sy(20) - 8, "基准：无条件概率 ≈ 20%", { anchor: "end", size: 10.5, fill: C.gray });
    s += txt(340, f.capY, "平均收益跟不上 arasıamb… ⇒ 平均收益难以预测，但崩盘概率可以预测", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 9. Limits to arbitrage map ---------- */
  FIG.limits_map = function () {
    var H = 300, s = "";
    s += txt(340, 26, "套利限制 Limits to Arbitrage：为什么错价难以被削平", { size: 13, weight: 700, fill: C.navy });
    s += rect(270, 44, 140, 42, { fill: C.redSoft, stroke: C.red, rx: 8 });
    s += txt(340, 63, "错价 Mispricing", { size: 12, weight: 700, fill: C.red });
    s += txt(340, 79, "irrational traders move price", { size: 9.5, fill: C.muted });
    var boxes = [
      { x: 30, y: 118, t: "基本面风险", en: "Fundamental risk" },
      { x: 186, y: 118, t: "噪声交易者风险", en: "Noise trader risk" },
      { x: 366, y: 118, t: "期限风险", en: "Horizon risk" },
      { x: 520, y: 118, t: "模型风险", en: "Model risk" }
    ];
    boxes.forEach(function (b, i) {
      var col = [C.blue, C.amber, C.purple, C.green][i];
      var soft = [C.blueSoft, C.amberSoft, C.purpleSoft, C.greenSoft][i];
      var lin = [C.blueLine, C.amberLine, C.purpleLine, C.greenLine][i];
      s += rect(b.x, b.y, 134, 48, { fill: soft, stroke: lin, rx: 7 });
      s += txt(b.x + 67, b.y + 20, b.t, { size: 11.5, weight: 700, fill: col });
      s += txt(b.x + 67, b.y + 37, b.en, { size: 9.5, fill: C.muted });
      s += arrow(b.x + 67, b.y, 340, 90, { stroke: C.gray, w: 1.3, dash: "4 3" });
    });
    s += rect(230, 182, 220, 40, { fill: C.amberSoft, stroke: C.amberLine, rx: 7 });
    s += txt(340, 200, "实施成本 Implementation costs", { size: 11.5, weight: 700, fill: C.amber });
    s += txt(340, 215, "交易成本 · 卖空成本 · 认知成本", { size: 10, fill: C.muted });
    s += arrow(340, 182, 340, 150, { stroke: C.gray, w: 1.3, dash: "4 3" });
    s += rect(120, 240, 440, 44, { fill: C.greenSoft, stroke: C.greenLine, rx: 8 });
    s += txt(340, 259, "套利者只做「有限套利」 ⇒ 错价长期存在", { size: 12, weight: 700, fill: C.green });
    s += txt(340, 275, "arbitrageurs trade against mispricing only to a limited extent", { size: 10, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 10. Noise trader risk timeline ---------- */
  FIG.noise_trader = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 10, yMin: 0, yMax: 60,
      xLabel: "时间 Time", yLabel: "错价幅度 Size of mispricing",
      xTicks: [{ v: 0, l: "t₀ 建仓" }, { v: 3, l: "t₁" }, { v: 6, l: "t₂ 错价加深" }, { v: 10, l: "t₃ 回归" }],
      yTicks: [{ v: 0, l: "0" }, { v: 15, l: "15" }, { v: 30, l: "30" }, { v: 45, l: "45" }]
    });
    var s = f.svg;
    s += line(f.L, f.sy(0), f.R, f.sy(0), { stroke: C.gray, w: 1.6, dash: "6 4" });
    s += path("M" + f.sx(0) + "," + f.sy(10) + " C" + f.sx(3) + "," + f.sy(16) + " " + f.sx(4.5) + "," + f.sy(34) + " " + f.sx(6) + "," + f.sy(42) +
      " C" + f.sx(7.5) + "," + f.sy(26) + " " + f.sx(8.5) + "," + f.sy(8) + " " + f.sx(10) + "," + f.sy(2),
      { stroke: C.red, w: 2.6 });
    s += dot(f.sx(6), f.sy(42), 5, { fill: C.red });
    s += rect(f.sx(5.2), f.sy(52), 92, 30, { fill: C.redSoft, stroke: C.red, rx: 6 });
    s += txt(f.sx(5.66), f.sy(52) + 14, "被迫平仓", { size: 10.5, weight: 700, fill: C.red });
    s += txt(f.sx(5.66), f.sy(52) + 26, "forced liquidation", { size: 9, fill: C.muted });
    s += txt(f.sx(1), f.sy(10) - 10, "套利者入场", { size: 10.5, fill: C.blue });
    s += txt(f.sx(9.4), f.sy(6), "错价最终修复", { size: 10.5, fill: C.green });
    s += txt(340, f.capY, "De Long et al. (1990) · Shleifer & Vishny (1997)：代理人资本 + 杠杆 ⇒ 短期亏损即致命", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 11. Twin shares deviation ---------- */
  FIG.twin_shares = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 10, yMin: 0.8, yMax: 2.0,
      xLabel: "时间 Time", yLabel: "Royal Dutch / Shell 价格比",
      xTicks: [{ v: 0, l: "0" }, { v: 2, l: "2" }, { v: 4, l: "4" }, { v: 6, l: "6" }, { v: 8, l: "8" }, { v: 10, l: "10" }],
      yTicks: [{ v: 0.8, l: "0.8" }, { v: 1.1, l: "1.1" }, { v: 1.5, l: "1.5" }, { v: 1.8, l: "1.8" }]
    });
    var s = f.svg;
    s += line(f.L, f.sy(1.5), f.R, f.sy(1.5), { stroke: C.green, w: 2.4, dash: "7 4" });
    s += txt(f.R - 4, f.sy(1.5) - 8, "理论基准 60/40 = 1.5", { anchor: "end", size: 10.5, weight: 600, fill: C.green });
    var pts = [[0, 1.42], [1, 1.28], [2, 1.12], [3, 1.05], [4, 1.18], [5, 1.36], [6, 1.58], [7, 1.72], [8, 1.63], [9, 1.48], [10, 1.33]];
    var d = "M", i;
    for (i = 0; i < pts.length; i++) d += (i ? " L" : "") + n(f.sx(pts[i][0])) + "," + n(f.sy(pts[i][1]));
    s += path(d, { stroke: C.red, w: 2.6 });
    s += txt(f.sx(3), f.sy(1.05) + 20, "折价 −35%", { size: 10.5, fill: C.red });
    s += txt(f.sx(7), f.sy(1.72) - 10, "溢价 +15%", { size: 10.5, fill: C.red });
    s += txt(340, f.capY, "Froot & Dabora (1999)：同一现金流的两份索取权，偏离可长期不修复", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 12. Negative stub value (carve-out) ---------- */
  FIG.carveout = function () {
    var H = 252, s = "";
    s += txt(340, 26, "Equity Carve-outs：母公司市值 < 子公司股权价值", { size: 13, weight: 700, fill: C.navy });
    s += rect(70, 56, 220, 120, { fill: C.blueSoft, stroke: C.blueLine, rx: 10 });
    s += txt(180, 80, "母公司市值", { size: 12, weight: 700, fill: C.navy });
    s += line(90, 100, 270, 100, { stroke: C.blueLine, w: 1.4 });
    s += rect(90, 104, 160, 56, { fill: "#ffffff", stroke: C.blue, rx: 6 });
    s += txt(170, 122, "账面持有的子公司股权", { size: 11, fill: C.blue });
    s += txt(170, 142, "stub value（虚拟值）", { size: 10.5, weight: 700, fill: C.red });
    s += rect(390, 56, 220, 120, { fill: C.amberSoft, stroke: C.amberLine, rx: 10 });
    s += txt(500, 80, "子公司（母公司持股超过 50%）", { size: 11.5, weight: 700, fill: C.amber });
    s += rect(410, 104, 180, 56, { fill: "#ffffff", stroke: C.amber, rx: 6 });
    s += txt(500, 122, "子公司独立上市后的市值", { size: 11, fill: C.amber });
    s += txt(500, 142, "按持股比例归属母公司", { size: 10.5, fill: C.muted });
    s += txt(340, 116, ">", { size: 26, weight: 700, fill: C.red });
    s += rect(120, 196, 440, 40, { fill: C.redSoft, stroke: C.red, rx: 8 });
    s += txt(340, 215, "剩余股权隐含价值为负 ⇒ 明显错价 evidence of limits to arbitrage", { size: 11.5, weight: 700, fill: C.red });
    return wrap(H, s);
  };

  /* ---------- 13. Index inclusion event study ---------- */
  FIG.index_inclusion = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 10, yMin: 0, yMax: 12,
      xLabel: "事件窗口（公告日 → 生效日 → 之后）", yLabel: "累计超额收益率",
      xTicks: [{ v: 0, l: "−5" }, { v: 3, l: "公告日" }, { v: 6, l: "生效日" }, { v: 10, l: "+20" }],
      yTicks: [{ v: 0, l: "0" }, { v: 3, l: "3%" }, { v: 6, l: "6%" }, { v: 9, l: "9%" }]
    });
    var s = f.svg;
    s += line(f.L, f.sy(0), f.R, f.sy(0), { stroke: C.gray, w: 1.6 });
    s += path("M" + f.sx(0) + "," + f.sy(0.4) + " L" + f.sx(2.6) + "," + f.sy(0.6) + " L" + f.sx(3.2) + "," + f.sy(4.6) +
      " L" + f.sx(5.6) + "," + f.sy(5.4) + " L" + f.sx(6.2) + "," + f.sy(8.6) + " L" + f.sx(10) + "," + f.sy(8.9),
      { stroke: C.red, w: 2.6 });
    s += dot(f.sx(6.2), f.sy(8.6), 5, { fill: C.red });
    s += txt(f.sx(6.6), f.sy(9.6), "跳涨不回调", { size: 11, weight: 600, fill: C.red });
    s += arrow(f.sx(4), f.sy(2.2), f.sx(4), f.sy(6.2), { stroke: C.amber, w: 1.6, dash: "4 3" });
    s += txt(f.sx(4), f.sy(1.4), "announcement day", { size: 10, fill: C.muted });
    s += txt(340, f.capY, "Harris & Gurel (1986) · Shleifer (1986)：无信息事件却有永久价格效应", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 14. Prospect theory value function ---------- */
  FIG.pt_value = function () {
    var f = frame({
      h: 330, xMin: -4, xMax: 4, yMin: -9, yMax: 4,
      xLabel: "收益 / 损失（相对参考点）", yLabel: "价值 v(x)",
      xTicks: [{ v: -4, l: "−4" }, { v: -2, l: "−2" }, { v: 0, l: "0" }, { v: 2, l: "+2" }, { v: 4, l: "+4" }],
      yTicks: [{ v: -8, l: "−8" }, { v: -6, l: "−6" }, { v: -4, l: "−4" }, { v: -2, l: "−2" }, { v: 2, l: "2" }, { v: 4, l: "4" }]
    });
    var s = f.svg, a = 0.88, lam = 2.25, i, d = "M", first = true;
    for (i = 0; i <= 40; i++) {
      var x = -4 + 8 * i / 40;
      var v = x >= 0 ? Math.pow(x, a) : -lam * Math.pow(-x, a);
      d += (first ? "" : " L") + n(f.sx(x)) + "," + n(f.sy(v));
      first = false;
    }
    s += path(d, { stroke: C.red, w: 2.8 });
    s += line(f.L, f.sy(0), f.R, f.sy(0), { stroke: C.axis, w: 1.6 });
    s += line(f.sx(0), f.T, f.sx(0), f.B, { stroke: C.axis, w: 1.6 });
    s += dot(f.sx(0), f.sy(0), 5, { fill: C.navy });
    s += txt(f.sx(0.35), f.sy(0) - 8, "参考点 kink", { anchor: "start", size: 10.5, weight: 600, fill: C.navy });
    s += txt(f.sx(2.6), f.sy(Math.pow(2.6, a)) + 22, "收益区：凹 · 风险厌恶", { size: 10.5, fill: C.green });
    s += txt(f.sx(-2.6), f.sy(-lam * Math.pow(2.6, a)) - 18, "损失区：凸 · 风险寻求", { size: 10.5, fill: C.amber });
    s += txt(f.L + 30, f.sy(-8) - 10, "λ ≈ 2.25：亏损比等额收益痛 2 倍多", { anchor: "start", size: 10.5, weight: 600, fill: C.red });
    return wrap(f.H, s);
  };

  /* ---------- 15. Probability weighting ---------- */
  FIG.pt_weight = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 1, yMin: 0, yMax: 1,
      xLabel: "客观概率 p", yLabel: "决策权重 π(p)",
      xTicks: [{ v: 0, l: "0" }, { v: 0.25, l: "0.25" }, { v: 0.5, l: "0.5" }, { v: 0.75, l: "0.75" }, { v: 1, l: "1" }],
      yTicks: [{ v: 0, l: "0" }, { v: 0.25, l: "0.25" }, { v: 0.5, l: "0.5" }, { v: 0.75, l: "0.75" }, { v: 1, l: "1" }]
    });
    var s = f.svg, d = 0.65, i, str = "M", first = true;
    s += line(f.sx(0), f.sy(0), f.sx(1), f.sy(1), { stroke: C.gray, w: 1.6, dash: "6 4" });
    for (i = 0; i <= 50; i++) {
      var p = i / 50;
      var P = Math.pow(p, d), D = Math.pow(Math.pow(P, d) + Math.pow(1 - p, d), 1 / d);
      var pi = p === 0 ? 0 : P / D;
      str += (first ? "" : " L") + n(f.sx(p)) + "," + n(f.sy(pi));
      first = false;
    }
    s += path(str, { stroke: C.purple, w: 2.8 });
    s += txt(f.sx(0.86), f.sy(0.86) - 6, "45° 线", { size: 10.5, fill: C.gray });
    s += txt(f.sx(0.16), f.sy(0.1) + 22, "小概率被高估", { size: 10.5, weight: 600, fill: C.purple });
    s += txt(f.sx(0.86), f.sy(0.55), "中高概率被低估", { size: 10.5, fill: C.purple });
    s += txt(340, f.capY, "π(P) = P^δ / (P^δ + (1−P)^δ)^(1/δ)，δ ≈ 0.65 ⇒ 同时买彩票又买保险", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 16. EU vs PT ---------- */
  FIG.eu_vs_pt = function () {
    var H = 232, s = "";
    s += txt(340, 26, "同一笔钱，两种算法：EU 看最终财富，PT 看相对损益", { size: 13, weight: 700, fill: C.navy });
    s += rect(40, 50, 260, 122, { fill: C.blueSoft, stroke: C.blueLine, rx: 10 });
    s += txt(170, 72, "Expected Utility (EU)", { size: 12.5, weight: 700, fill: C.navy });
    s += txt(170, 96, "p·U(W + x) + q·U(W + y)", { size: 12, fill: C.ink });
    s += txt(170, 118, "把奖金并入既有财富", { size: 10.5, fill: C.muted });
    s += txt(170, 140, "两个选择题最终状态相同", { size: 10.5, fill: C.muted });
    s += txt(170, 158, "⇒ 预测选择也相同（反证）", { size: 10.5, weight: 600, fill: C.red });
    s += rect(380, 50, 260, 122, { fill: C.amberSoft, stroke: C.amberLine, rx: 10 });
    s += txt(510, 72, "Prospect Theory (PT)", { size: 12.5, weight: 700, fill: C.navy });
    s += txt(510, 96, "π(p)·v(x) + π(q)·v(y)", { size: 12, fill: C.ink });
    s += txt(510, 118, "收益与损失相对参考点计算", { size: 10.5, fill: C.muted });
    s += txt(510, 140, "Subjects did not integrate", { size: 10.5, fill: C.muted, italic: true });
    s += txt(510, 158, "⇒ 预测出现偏好反转", { size: 10.5, weight: 600, fill: C.green });
    s += txt(340, 196, "Example One: (1000, 0.5; 0, 0.5) vs (500, 1) 两个版本最终状态相同，答案却相反", { size: 10.5, fill: C.muted });
    s += txt(340, 216, "Reference dependence：价值的载体是损益，不是最终财富", { size: 10.5, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 17. Endowment effect ---------- */
  FIG.endowment = function () {
    var f = frame({
      h: 296, xMin: 0, xMax: 4, yMin: 0, yMax: 8,
      xLabel: "", yLabel: "对马克杯的估值 ($)",
      xTicks: [{ v: 1, l: "卖方" }, { v: 2, l: "买方" }, { v: 3, l: "选择者" }],
      yTicks: [{ v: 0, l: "0" }, { v: 2, l: "2" }, { v: 4, l: "4" }, { v: 6, l: "6" }, { v: 8, l: "8" }]
    });
    var s = f.svg, bars = [[1, 7.12, "Sellers 7.12", C.red], [2, 2.87, "Buyers 2.87", C.blue], [3, 3.12, "Choosers 3.12", C.green]];
    bars.forEach(function (b) {
      var x = f.sx(b[0]) - 40, y = f.sy(b[1]);
      s += rect(x, y, 80, f.B - y, { fill: "#ffffff", stroke: b[3], rx: 6, sw: 1.6 });
      s += txt(f.sx(b[0]), y - 8, b[2], { size: 11, weight: 700, fill: b[3] });
    });
    s += line(f.sx(1), f.sy(7.12), f.sx(3), f.sy(7.12), { stroke: C.red, w: 1.3, dash: "5 3" });
    s += txt(f.sx(2.1), f.sy(7.12) - 8, "禀赋效应：一旦持有，主观价值立刻上升", { size: 10.5, fill: C.red });
    s += txt(340, f.capY, "Kahneman, Knetsch & Thaler (1990)：无风险的损失厌恶 analog", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 18. Narrow framing ---------- */
  FIG.narrow_framing = function () {
    var H = 268, s = "";
    s += txt(340, 26, "窄框架 vs 宽框架 Narrow vs Broad Framing", { size: 13, weight: 700, fill: C.navy });
    s += rect(40, 48, 260, 150, { fill: C.amberSoft, stroke: C.amberLine, rx: 10 });
    s += txt(170, 70, "窄框架 Narrow framing", { size: 12.5, weight: 700, fill: C.amber });
    s += rect(60, 84, 220, 34, { fill: "#ffffff", stroke: C.amber, rx: 6 });
    s += txt(170, 105, "逐个评估每个新风险", { size: 11, fill: C.ink });
    s += rect(60, 126, 220, 34, { fill: "#ffffff", stroke: C.amber, rx: 6 });
    s += txt(170, 147, "拒绝 (−100, ½; 110, ½)", { size: 11, weight: 700, fill: C.red });
    s += txt(170, 176, "Barberis, Huang & Thaler (2006)", { size: 10, fill: C.muted });
    s += rect(380, 48, 260, 150, { fill: C.greenSoft, stroke: C.greenLine, rx: 10 });
    s += txt(510, 70, "宽框架 Broad framing", { size: 12.5, weight: 700, fill: C.green });
    s += rect(400, 84, 220, 34, { fill: "#ffffff", stroke: C.green, rx: 6 });
    s += txt(510, 105, "把新风险与既有风险合并", { size: 11, fill: C.ink });
    s += rect(400, 126, 220, 34, { fill: "#ffffff", stroke: C.green, rx: 6 });
    s += txt(510, 147, "100 个赌注一起看 → 接受", { size: 11, weight: 700, fill: C.green });
    s += txt(510, 176, "标准财富/消费效用模型", { size: 10, fill: C.muted });
    s += txt(340, 226, "金融含义：投资者会对「单只股票」「股市账户」分别做损益计算 ⇒ 过度厌恶短期波动", { size: 11, fill: C.muted });
    s += txt(340, 246, "Implication: gains/losses measured on specific components of wealth", { size: 10, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 19. Ellsberg paradox ---------- */
  FIG.ellsberg = function () {
    var H = 268, s = "";
    s += txt(340, 26, "Ellsberg Paradox (1961) 与模糊厌恶", { size: 13, weight: 700, fill: C.navy });
    s += rect(60, 48, 240, 150, { fill: C.blueSoft, stroke: C.blueLine, rx: 10 });
    s += txt(180, 70, "已知瓮 C (Known urn)", { size: 12.5, weight: 700, fill: C.navy });
    s += rect(80, 82, 200, 44, { fill: "#ffffff", stroke: C.blue, rx: 6 });
    s += txt(180, 100, "100 球：50 红 / 50 黑", { size: 11, fill: C.ink });
    s += txt(180, 118, "概率客观已知", { size: 10.5, fill: C.muted });
    s += txt(180, 158, "人们更愿意押「已知瓮」", { size: 11, weight: 600, fill: C.green });
    s += txt(180, 178, "⇒ 偏好 R1 胜过 R2", { size: 10.5, fill: C.muted });
    s += rect(380, 48, 240, 150, { fill: C.purpleSoft, stroke: C.purpleLine, rx: 10 });
    s += txt(500, 70, "未知瓮 U (Ambiguous urn)", { size: 12.5, weight: 700, fill: C.navy });
    s += rect(400, 82, 200, 44, { fill: "#ffffff", stroke: C.purple, rx: 6 });
    s += txt(500, 100, "100 球：红/黑比例未知", { size: 11, fill: C.ink });
    s += txt(500, 118, "分布不确定 ⇒ ambiguity", { size: 10.5, fill: C.muted });
    s += txt(500, 158, "但对 B1 vs B2 也一样偏好 C", { size: 11, weight: 600, fill: C.red });
    s += txt(500, 178, "⇒ 违反主观概率一致性", { size: 10.5, fill: C.muted });
    s += rect(120, 214, 440, 40, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(340, 233, "Competence hypothesis：自我评价「懂」时，模糊厌恶会消失甚至反转", { size: 11, weight: 600, fill: C.amber });
    s += txt(340, 248, "Heath & Tversky (1991) · Fox & Tversky (1995)", { size: 9.5, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 20. Hyperbolic discounting ---------- */
  FIG.hyperbolic = function () {
    var f = frame({
      h: 306, xMin: 0, xMax: 10, yMin: 0, yMax: 1.05,
      xLabel: "延迟年数 t", yLabel: "折现因子 Discount factor",
      xTicks: [{ v: 0, l: "0" }, { v: 1, l: "1" }, { v: 2, l: "2" }, { v: 3, l: "3" }, { v: 5, l: "5" }, { v: 8, l: "8" }],
      yTicks: [{ v: 0, l: "0" }, { v: 0.25, l: "0.25" }, { v: 0.5, l: "0.5" }, { v: 0.75, l: "0.75" }, { v: 1, l: "1" }]
    });
    var s = f.svg, d = 0.9, b = 0.6, i, e1 = "M", e2 = "M", first1 = true, first2 = true;
    for (i = 0; i <= 60; i++) {
      var t = 10 * i / 60;
      var ex = Math.pow(d, t), hy = t === 0 ? 1 : b * Math.pow(d, t);
      e1 += (first1 ? "" : " L") + n(f.sx(t)) + "," + n(f.sy(ex));
      e2 += (first2 ? "" : " L") + n(f.sx(t)) + "," + n(f.sy(hy));
      first1 = false; first2 = false;
    }
    s += path(e1, { stroke: C.blue, w: 2.4 });
    s += path(e2, { stroke: C.red, w: 2.6 });
    s += dot(f.sx(1), f.sy(0.6 * 0.9), 4.5, { fill: C.red });
    s += txt(f.sx(1.5), f.sy(0.6 * 0.9) - 10, "β 造成的短期陡降", { anchor: "start", size: 10.5, weight: 600, fill: C.red });
    s += legend([{ label: "指数折现 δᵗ", color: C.blue }, { label: "双曲折现 βδᵗ", color: C.red }], 400, 48);
    s += txt(340, f.capY, "今天要有 $110 而不要明天的 $100，却愿意等 31 天换 $110 ⇒ 时间不一致", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 21. Belief-side biases ---------- */
  FIG.beliefs_biases = function () {
    var H = 292, s = "";
    s += txt(340, 26, "信念侧偏差 Psychology of Beliefs（偏离 Bayes' rule）", { size: 13, weight: 700, fill: C.navy });
    var items = [
      { t: "代表性", en: "Representativeness", d: "用好样本/刻板印象代替基础比率", c: C.blue, f: C.blueSoft, l: C.blueLine },
      { t: "小数定律", en: "Law of small numbers", d: "相信小样本也服从大数定律", c: C.amber, f: C.amberSoft, l: C.amberLine },
      { t: "保守性", en: "Conservatism", d: "新信息到来时更新不足", c: C.green, f: C.greenSoft, l: C.greenLine },
      { t: "锚定", en: "Anchoring", d: "判断停留在某个初始值附近", c: C.purple, f: C.purpleSoft, l: C.purpleLine },
      { t: "证实偏差", en: "Confirmation bias", d: "偏好支持既有信念的证据", c: C.red, f: C.redSoft, l: C.redLine },
      { t: "过度自信", en: "Overconfidence", d: "高估私有信息精度 · 区间过窄", c: C.navy, f: C.graySoft, l: C.gray }
    ];
    items.forEach(function (it, i) {
      var x = 40 + (i % 3) * 210, y = 48 + Math.floor(i / 3) * 110;
      s += rect(x, y, 194, 92, { fill: it.f, stroke: it.l, rx: 8 });
      s += txt(x + 97, y + 21, it.t, { size: 12, weight: 700, fill: it.c });
      s += txt(x + 97, y + 38, it.en, { size: 9.5, fill: C.muted, italic: true });
      s += txt(x + 97, y + 60, it.d, { size: 10.5, fill: C.ink });
    });
    return wrap(H, s);
  };

  /* ---------- 22. Equity premium puzzle ---------- */
  FIG.equity_premium = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 4, yMin: 0, yMax: 55,
      xLabel: "", yLabel: "风险厌恶系数 γ",
      xTicks: [{ v: 1, l: "美国实际\nSharpe=0.5 →" }, { v: 2, l: "隐含 γ" }, { v: 3, l: "实验测得的\n合理 γ" }],
      yTicks: [{ v: 0, l: "0" }, { v: 10, l: "10" }, { v: 20, l: "20" }, { v: 30, l: "30" }, { v: 40, l: "40" }, { v: 50, l: "50" }]
    });
    var s = f.svg, bars = [[1, 50, "隐含 γ ≈ 50", C.red], [3, 8, "合理 γ ≤ 10", C.green]];
    bars.forEach(function (b) {
      var x = f.sx(b[0]) - 52, y = f.sy(b[1]);
      s += rect(x, y, 104, f.B - y, { fill: "#ffffff", stroke: b[3], rx: 6, sw: 1.6 });
      s += txt(f.sx(b[0]), y - 8, b[2], { size: 11, weight: 700, fill: b[3] });
    });
    s += rect(90, 52, 250, 62, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(215, 72, "Sharpe ≤ γ · σ(Δln c)", { size: 12.5, weight: 700, fill: C.amber });
    s += txt(215, 92, "σ(Δln c) ≈ 1% ，Sharpe ≈ 0.5", { size: 10.5, fill: C.ink });
    s += txt(215, 108, "⇒ 必须 γ ≈ 50 才能自洽", { size: 10.5, weight: 600, fill: C.red });
    s += txt(340, f.capY, "Equity premium puzzle：1889–2005 美股超额收益年均 6.4%", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 23. Excess volatility ---------- */
  FIG.vol_puzzle = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 10, yMin: -30, yMax: 40,
      xLabel: "时间 Time", yLabel: "价格 / 股利现值（对数刻度）",
      xTicks: [{ v: 0, l: "0" }, { v: 2, l: "2" }, { v: 4, l: "4" }, { v: 6, l: "6" }, { v: 8, l: "8" }, { v: 10, l: "10" }],
      yTicks: [{ v: -20, l: "−20%" }, { v: 0, l: "0" }, { v: 20, l: "20%" }, { v: 40, l: "40%" }]
    });
    var s = f.svg;
    s += path("M" + f.sx(0) + "," + f.sy(-2) + " L" + f.sx(2) + "," + f.sy(3) + " L" + f.sx(4) + "," + f.sy(6) +
      " L" + f.sx(6) + "," + f.sy(9) + " L" + f.sx(8) + "," + f.sy(11) + " L" + f.sx(10) + "," + f.sy(14),
      { stroke: C.gray, w: 2.2, dash: "6 4" });
    s += txt(f.sx(7.6), f.sy(11) + 20, "事后理性价格 P*", { size: 11, fill: C.muted });
    s += path("M" + f.sx(0) + "," + f.sy(4) + " L" + f.sx(1.4) + "," + f.sy(-14) + " L" + f.sx(2.8) + "," + f.sy(22) +
      " L" + f.sx(4.2) + "," + f.sy(-8) + " L" + f.sx(5.6) + "," + f.sy(28) + " L" + f.sx(7) + "," + f.sy(2) +
      " L" + f.sx(8.4) + "," + f.sy(24) + " L" + f.sx(10) + "," + f.sy(8),
      { stroke: C.red, w: 2.4 });
    s += txt(f.sx(1.6), f.sy(-14) - 9, "实际股价 P", { size: 11, weight: 600, fill: C.red });
    s += legend([{ label: "实际价格", color: C.red }, { label: "事后现金流贴现的理性价格", color: C.gray, dash: "6 4" }], 150, 46);
    s += txt(340, f.capY, "Shiller (1981) · LeRoy & Porter (1981)：固定折现率 + 理性预期 ⇒ 无法解释波动", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 24. Predictability ---------- */
  FIG.predictability = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 0.075, yMin: 0, yMax: 0.16,
      xLabel: "股息/价格比率 D/P", yLabel: "未来一年超额收益 E(R)",
      xTicks: [{ v: 0.01, l: "1%" }, { v: 0.02, l: "2%" }, { v: 0.03, l: "3%" }, { v: 0.04, l: "4%" }, { v: 0.05, l: "5%" }, { v: 0.06, l: "6%" }],
      yTicks: [{ v: 0, l: "0" }, { v: 0.04, l: "4%" }, { v: 0.08, l: "8%" }, { v: 0.12, l: "12%" }, { v: 0.16, l: "16%" }]
    });
    var s = f.svg;
    var pts = [[0.012, 0.012], [0.019, 0.035], [0.024, 0.055], [0.031, 0.072], [0.038, 0.094], [0.045, 0.11], [0.052, 0.126], [0.06, 0.142]];
    pts.forEach(function (p) { s += dot(f.sx(p[0]), f.sy(p[1]), 4, { fill: C.blue }); });
    s += line(f.sx(0.008), f.sy(0.006), f.sx(0.062), f.sy(0.148), { stroke: C.red, w: 2.4 });
    s += txt(f.sx(0.052), f.sy(0.142) - 12, "R = a + b·(D/P)", { size: 11.5, weight: 700, fill: C.red });
    s += txt(f.sx(0.02), f.sy(0.035) + 22, "P/D 高 ⇒ 预期收益低", { size: 10.5, fill: C.blue });
    s += txt(f.sx(0.05), f.sy(0.11) - 14, "P/D 低 ⇒ 预期收益高", { size: 10.5, fill: C.blue });
    s += txt(340, f.capY, "Campbell & Shiller (1988) · Fama & French (1988)：P/D 必须预测现金流或收益", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 25. Cross-sectional anomaly map ---------- */
  FIG.anomaly_map = function () {
    var H = 336, s = "";
    s += txt(340, 26, "横截面异象图鉴 Cross-sectional Anomalies", { size: 13, weight: 700, fill: C.navy });
    var rows = [
      { t: "规模 Size", en: "Banz (1981)", d: "市值越大 ⇒ 后续收益越低", sign: "−", row: 0, c: C.blue },
      { t: "价值 Value", en: "Fama–French (1992)", d: "P/E、P/B 越高 ⇒ 后续收益越低", sign: "−", row: 0, c: C.amber },
      { t: "发行 Issuance", en: "Loughran–Ritter (1995)", d: "增发后收益差，回购后收益好", sign: "−", row: 0, c: C.purple },
      { t: "动量 Momentum", en: "Jegadeesh–Titman (1993)", d: "中期（2–12 月）过去收益正向预测", sign: "+", row: 1, c: C.green },
      { t: "反转 Reversal", en: "De Bondt–Thaler (1985)", d: "长期（3–5 年）过去收益负向预测", sign: "−", row: 1, c: C.red },
      { t: "应计 Accruals", en: "Sloan (1996)", d: "应计越高 ⇒ 后续收益越低", sign: "−", row: 1, c: C.navy },
      { t: "盈利惊喜", en: "Bernard–Thomas (1989)", d: "盈余公告惊喜越大 ⇒ 后续收益越高", sign: "+", row: 2, c: C.green },
      { t: "特质波动 IVOL", en: "Ang et al. (2006)", d: "IVOL 越高 ⇒ 后续收益越低", sign: "−", row: 2, c: C.purple },
      { t: "换手率 Volume", en: "Datar et al. (1998)", d: "过去一年换手率高 ⇒ 收益低", sign: "−", row: 2, c: C.amber }
    ];
    rows.forEach(function (r, i) {
      var col = i % 3, x = 34 + col * 212, y = 48 + r.row * 96;
      s += rect(x, y, 200, 82, { fill: C.graySoft, stroke: C.gray, rx: 8 });
      s += rect(x + 8, y + 8, 26, 26, { fill: "#ffffff", stroke: r.c, rx: 6, sw: 1.4 });
      s += txt(x + 21, y + 26, r.sign, { size: 14, weight: 700, fill: r.c });
      s += txt(x + 44, y + 24, r.t, { anchor: "start", size: 11.5, weight: 700, fill: r.c });
      s += txt(x + 100, y + 56, r.d, { size: 10, fill: C.ink });
      s += txt(x + 100, y + 72, r.en, { size: 9, fill: C.muted, italic: true });
    });
    return wrap(H, s);
  };

  /* ---------- 26. Reversal vs momentum ---------- */
  FIG.reversal_momentum = function () {
    var H = 246, s = "";
    s += txt(340, 26, "收益预测力：短期 / 中期 / 长期的符号不同", { size: 13, weight: 700, fill: C.navy });
    var bands = [
      { x0: 80, x1: 250, lab: "1 周 – 1 个月", t: "短期反转", sign: -1, c: C.blue, f: C.blueSoft },
      { x0: 280, x1: 450, lab: "2 – 12 个月", t: "动量", sign: 1, c: C.green, f: C.greenSoft },
      { x0: 480, x1: 620, lab: "3 – 5 年", t: "长期反转", sign: -1, c: C.red, f: C.redSoft }
    ];
    bands.forEach(function (b, i) {
      var y = i === 1 ? 48 : 64, h = 48;
      var mid = (b.x0 + b.x1) / 2;
      s += rect(b.x0, y, b.x1 - b.x0, h, { fill: b.f, stroke: b.c, rx: 7 });
      s += txt(mid, y + 21, b.t, { size: 11.5, weight: 700, fill: b.c });
      s += txt(mid, y + 38, b.sign > 0 ? "后续收益：正" : "后续收益：负", { size: 10, fill: C.muted });
      s += arrow(mid, y + h + 2, mid, 120, { stroke: C.gray, w: 1.2 });
      s += txt(mid, 132, b.lab, { size: 10.5, fill: C.gray });
    });
    s += line(60, 146, 640, 146, { stroke: C.axis, w: 1.6 });
    s += rect(70, 164, 540, 46, { fill: C.amberSoft, stroke: C.amberLine, rx: 7 });
    s += txt(340, 184, "难就难在：同一个「过去收益」变量，在不同期限符号相反", { size: 11, weight: 600, fill: C.amber });
    s += txt(340, 200, "⇒ 需要一个能同时解释动量与反转的模型", { size: 10.5, fill: C.ink });
    return wrap(H, s);
  };

  /* ---------- 27. Disposition effect ---------- */
  FIG.disposition = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 4, yMin: 0, yMax: 0.30,
      xLabel: "", yLabel: "卖出倾向 / 实现比例",
      xTicks: [{ v: 1, l: "PGR\n(实现盈利)" }, { v: 2, l: "PLR\n(实现亏损)" }, { v: 3, l: "基准\n(中性)" }],
      yTicks: [{ v: 0, l: "0%" }, { v: 0.08, l: "8%" }, { v: 0.16, l: "16%" }, { v: 0.24, l: "24%" }, { v: 0.30, l: "30%" }]
    });
    var s = f.svg, bars = [[1, 0.148, "PGR 14.8%", C.red], [2, 0.098, "PLR 9.8%", C.blue], [3, 0.123, "参考水平 12.3%", C.gray]];
    bars.forEach(function (b) {
      var x = f.sx(b[0]) - 44, y = f.sy(b[1]);
      s += rect(x, y, 88, f.B - y, { fill: "#ffffff", stroke: b[3], rx: 6, sw: 1.6 });
      s += txt(f.sx(b[0]), y - 8, b[2], { size: 11, weight: 700, fill: b[3] });
    });
    s += txt(f.sx(1.55), f.sy(0.185), "PGR − PLR > 0", { size: 12, weight: 700, fill: C.red });
    s += rect(330, 44, 300, 68, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(480, 64, "Odean (1998)：投资者更倾向卖出盈利股", { size: 11, weight: 600, fill: C.amber });
    s += txt(480, 84, "更专业的投资者与基金经理效应较弱", { size: 10, fill: C.ink });
    s += txt(480, 100, "Dhar & Zhu (2006) · Frazzini (2006)", { size: 9.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 28. Participation ---------- */
  FIG.participation = function () {
    var f = frame({
      h: 292, xMin: 0, xMax: 4, yMin: 0, yMax: 80,
      xLabel: "", yLabel: "持有股票的家庭比例 (%)",
      xTicks: [{ v: 1, l: "1984\n全部家庭" }, { v: 2, l: "1984\n流动资产\n> $100k" }, { v: 3, l: "2001\n onward." }],
      yTicks: [{ v: 0, l: "0" }, { v: 20, l: "20%" }, { v: 40, l: "40%" }, { v: 60, l: "60%" }, { v: 80, l: "80%" }]
    });
    var s = f.svg, bars = [[1, 28, "28%", C.red], [2, 48, "48%", C.amber], [3, 62, "62%", C.green]];
    bars.forEach(function (b) {
      var x = f.sx(b[0]) - 44, y = f.sy(b[1]);
      s += rect(x, y, 88, f.B - y, { fill: "#ffffff", stroke: b[3], rx: 6, sw: 1.6 });
      s += txt(f.sx(b[0]), y - 8, b[2], { size: 11, weight: 700, fill: b[3] });
    });
    s += txt(340, 52, "Non-participation 之谜：很多（甚至富有的人）根本不入市", { size: 11.5, weight: 600, fill: C.navy });
    s += txt(340, f.capY, "理性解释：一次性/持续的参与成本 · Vissing-Jorgensen (2003)", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 29. Four types of under-diversification ---------- */
  FIG.under_diversification = function () {
    var H = 268, s = "";
    s += txt(340, 26, "分散化不足的四种类型 Under-diversification", { size: 13, weight: 700, fill: C.navy });
    var items = [
      { t: "本土偏好", en: "Home bias", d: "1989 年美/英/日本国\n股票占比 94/82/98%" },
      { t: "本地偏好", en: "Local bias", d: "组合中 31% 的股票在\n250 英里内（全市场 12%）" },
      { t: "集中持股", en: "Concentrated holdings", d: "1989 年约 30% 家庭\n账户少于 10 只股票" },
      { t: "本公司重仓", en: "Own-company stock", d: "401(k) 中约 23% 的\n自主缴费买了本公司股" }
    ];
    items.forEach(function (it, i) {
      var x = 34 + (i % 2) * 320, y = 48 + Math.floor(i / 2) * 100;
      var col = [C.blue, C.amber, C.purple, C.green][i];
      var soft = [C.blueSoft, C.amberSoft, C.purpleSoft, C.greenSoft][i];
      var lin = [C.blueLine, C.amberLine, C.purpleLine, C.greenLine][i];
      s += rect(x, y, 300, 84, { fill: soft, stroke: lin, rx: 8 });
      s += txt(x + 14, y + 22, it.t, { anchor: "start", size: 12, weight: 700, fill: col });
      s += txt(x + 14, y + 40, it.en, { anchor: "start", size: 9.5, fill: C.muted, italic: true });
      s += txt(x + 14, y + 62, it.d, { anchor: "start", size: 10.5, fill: C.ink });
    });
    s += txt(340, 250, "French–Poterba (1991) · Ivković–Weisbenner (2005) · Benartzi (2001)", { size: 10, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 30. DSSW noise trader model ---------- */
  FIG.dssw = function () {
    var f = frame({
      h: 306, xMin: -3, xMax: 3, yMin: -3, yMax: 3,
      xLabel: "噪声交易者情绪 ρ（对价格的误判）", yLabel: "价格偏离基本面的幅度",
      xTicks: [{ v: -3, l: "极度悲观" }, { v: -1.5, l: "−1.5" }, { v: 0, l: "0" }, { v: 1.5, l: "+1.5" }, { v: 3, l: "极度乐观" }],
      yTicks: [{ v: -3, l: "−3" }, { v: -2, l: "−2" }, { v: -1, l: "−1" }, { v: 1, l: "1" }, { v: 2, l: "2" }, { v: 3, l: "3" }]
    });
    var s = f.svg;
    s += line(f.L, f.sy(0), f.R, f.sy(0), { stroke: C.gray, w: 1.6 });
    s += line(f.sx(0), f.T, f.sx(0), f.B, { stroke: C.gray, w: 1.6 });
    s += path("M" + f.sx(-3) + "," + f.sy(-2.4) + " L" + f.sx(3) + "," + f.sy(2.4), { stroke: C.red, w: 2.6 });
    s += path("M" + f.sx(-3) + "," + f.sy(-1.1) + " L" + f.sx(3) + "," + f.sy(1.1), { stroke: C.green, w: 2.4, dash: "6 4" });
    s += txt(f.sx(2.3), f.sy(2.4) - 10, "有噪声交易者：错价 ∝ ρ", { size: 10.5, weight: 600, fill: C.red });
    s += txt(f.sx(2.1), f.sy(0.9) + 14, "仅含少量套利的均衡", { size: 10, fill: C.green });
    s += legend([{ label: "DSSW (1990) 的均衡错价", color: C.red }, { label: "无摩擦基准", color: C.green, dash: "6 4" }], 100, 42);
    s += txt(340, f.capY, "即使没有基本面风险，噪声交易者风险也能让套利者不敢满仓 ⇒ 价格 = 基本面 + 情绪", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 31. HS gradual information diffusion ---------- */
  FIG.hs = function () {
    var f = frame({
      h: 300, xMin: 0, xMax: 10, yMin: -10, yMax: 20,
      xLabel: "信息到达后经过的期数", yLabel: "价格对基本面冲击的反应",
      xTicks: [{ v: 0, l: "0" }, { v: 2, l: "2" }, { v: 4, l: "4" }, { v: 6, l: "6" }, { v: 8, l: "8" }, { v: 10, l: "10" }],
      yTicks: [{ v: -10, l: "−10" }, { v: 0, l: "0" }, { v: 10, l: "10" }, { v: 20, l: "20" }]
    });
    var s = f.svg;
    s += line(f.L, f.sy(10), f.R, f.sy(10), { stroke: C.green, w: 2, dash: "6 4" });
    s += txt(f.R - 4, f.sy(10) - 8, "完全信息下应到达的价格", { anchor: "end", size: 10.5, fill: C.green });
    s += path("M" + f.sx(0) + "," + f.sy(1) + " C" + f.sx(2) + "," + f.sy(3) + " " + f.sx(4) + "," + f.sy(7) + " " + f.sx(6) + "," + f.sy(14) +
      " C" + f.sx(7.5) + "," + f.sy(11) + " " + f.sx(8.5) + "," + f.sy(11) + " " + f.sx(10) + "," + f.sy(10.5),
      { stroke: C.red, w: 2.6 });
    s += txt(f.sx(5.6), f.sy(15), "过度反应 ⇒ 随后反转", { size: 10.5, weight: 600, fill: C.red });
    s += txt(f.sx(2), f.sy(4) + 18, "反应不足 ⇒ 动量", { size: 10.5, weight: 600, fill: C.blue });
    s += txt(340, f.capY, "Hong & Stein (1999)：信息观察者 + 动量交易者 ⇒短期动量、长期反转", { size: 10.5, fill: C.muted });
    return wrap(f.H, s);
  };

  /* ---------- 32. BSV / DHS reaction map ---------- */
  FIG.reaction_map = function () {
    var H = 260, s = "";
    s += txt(340, 26, "统一 theories：一个模型同时解释动量与反转", { size: 13, weight: 700, fill: C.navy });
    var items = [
      { t: "BSV (1998)", k: "保守性 Conservatism", d: "公开信息更新不足 ⇒ 短期动量、盈余漂移", c: C.blue, f: C.blueSoft, l: C.blueLine, x: 34 },
      { t: "BSV (1998)", k: "代表性 Representativeness", d: "把好消息外推 ⇒ 长期过度反应与反转", c: C.amber, f: C.amberSoft, l: C.amberLine, x: 250 },
      { t: "DHS (1998)", k: "过度自信 Overconfidence", d: "过度倚重私有信号 ⇒ 初期过度反应", c: C.purple, f: C.purpleSoft, l: C.purpleLine, x: 466 }
    ];
    items.forEach(function (it) {
      s += rect(it.x, 48, 182, 108, { fill: it.f, stroke: it.l, rx: 8 });
      s += txt(it.x + 91, 68, it.t, { size: 11.5, weight: 700, fill: C.navy });
      s += txt(it.x + 91, 88, it.k, { size: 10.5, weight: 700, fill: it.c, italic: true });
      s += txt(it.x + 91, 110, it.d.slice(0, 12), { size: 10.5, fill: C.ink });
      s += txt(it.x + 91, 126, it.d.slice(12), { size: 10.5, fill: C.ink });
    });
    items.forEach(function (it) { s += arrow(it.x + 91, 160, 340, 188, { stroke: it.c, w: 1.8 }); });
    s += rect(140, 192, 400, 52, { fill: C.greenSoft, stroke: C.greenLine, rx: 8 });
    s += txt(340, 212, "统一预测：短期反应不足（动量）+ 长期过度反应（反转）", { size: 11.5, weight: 700, fill: C.green });
    s += txt(340, 232, "Barberis–Shleifer–Vishny (1998) · Daniel–Hirshleifer–Subrahmanyam (1998)", { size: 9.5, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 33. Behavioral corporate finance ---------- */
  FIG.corporate_timing = function () {
    var H = 268, s = "";
    s += txt(340, 26, "行为公司金融：投资者非理性 → 管理者的理性应对", { size: 13, weight: 700, fill: C.navy });
    s += rect(40, 48, 200, 66, { fill: C.redSoft, stroke: C.red, rx: 8 });
    s += txt(140, 68, "股价被高估", { size: 12, weight: 700, fill: C.red });
    s += txt(140, 88, "Overvalued equity ⇒ 资金成本低估", { size: 9.5, fill: C.muted });
    s += arrow(250, 66, 300, 66, { stroke: C.navy, w: 2 });
    s += rect(310, 48, 330, 66, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(475, 68, "发行股票 / 以股票支付并购对价", { size: 11.5, weight: 700, fill: C.navy });
    s += txt(475, 88, "SEO / stock-financed M&A", { size: 10, fill: C.muted, italic: true });
    s += rect(40, 130, 200, 66, { fill: C.greenSoft, stroke: C.greenLine, rx: 8 });
    s += txt(140, 150, "股价被低估", { size: 12, weight: 700, fill: C.green });
    s += txt(140, 170, "Undervalued equity", { size: 10, fill: C.muted, italic: true });
    s += arrow(250, 148, 300, 148, { stroke: C.navy, w: 2 });
    s += rect(310, 130, 330, 66, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(475, 150, "回购股票 / 现金收购", { size: 11.5, weight: 700, fill: C.navy });
    s += txt(475, 170, "Repurchase / cash-financed M&A", { size: 10, fill: C.muted, italic: true });
    s += rect(80, 212, 520, 42, { fill: C.graySoft, stroke: C.gray, rx: 8 });
    s += txt(340, 230, "Baker & Wurgler (2002) 市场择时：资本结构 = 历史IPO  financing 路径的累积结果", { size: 10.5, fill: C.ink });
    s += txt(340, 246, "Catering：管理层迎合投资者的股利/更名/拆分偏好", { size: 10, fill: C.muted });
    return wrap(H, s);
  };

  /* ---------- 34. Prescriptive BF ---------- */
  FIG.prescriptive = function () {
    var H = 252, s = "";
    s += txt(340, 26, "规范性行为金融 Prescriptive Behavioral Finance", { size: 13, weight: 700, fill: C.navy });
    s += rect(40, 48, 260, 170, { fill: C.purpleSoft, stroke: C.purpleLine, rx: 10 });
    s += txt(170, 70, "自我纠偏 Self-correction", { size: 12.5, weight: 700, fill: C.purple });
    s += txt(170, 96, "少看账户（避免短视亏损厌恶）", { size: 10.5, fill: C.ink });
    s += txt(170, 118, "拉长评估周期 / 承诺装置", { size: 10.5, fill: C.ink });
    s += txt(170, 140, "事前设好止损规则", { size: 10.5, fill: C.ink });
    s += txt(170, 162, "写投资日记对抗事后聪明", { size: 10.5, fill: C.ink });
    s += txt(170, 190, "Thaler & Benartzi (2004)", { size: 9.5, fill: C.muted, italic: true });
    s += rect(380, 48, 260, 170, { fill: C.greenSoft, stroke: C.greenLine, rx: 10 });
    s += txt(510, 70, "选择架构 Choice architecture", { size: 12.5, weight: 700, fill: C.green });
    s += txt(510, 96, "默认加入自动登记", { size: 10.5, fill: C.ink });
    s += txt(510, 118, "默认缴费率 + 自动递增", { size: 10.5, fill: C.ink });
    s += txt(510, 140, "「Save More Tomorrow」SMarT", { size: 10.5, fill: C.ink });
    s += txt(510, 162, "用惰性战胜惰性 nudge", { size: 10.5, fill: C.ink });
    s += txt(510, 190, "Thaler & Sunstein, Nudge (2021)", { size: 9.5, fill: C.muted, italic: true });
    s += txt(340, 238, "共同点：承认人性的不完美，然后用制度而不是说教来改善决策", { size: 11, weight: 600, fill: C.navy });
    return wrap(H, s);
  };

  /* ---------- 35. Skewness pricing (Part 8) ---------- */
  FIG.skew_pricing = function () {
    var H = 268, s = "";
    s += txt(340, 26, "偏度定价 Skewness Pricing：彩票型股票被高估", { size: 13, weight: 700, fill: C.navy });
    /* left: right-skewed distribution with overweighted tail */
    s += rect(40, 46, 290, 168, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(185, 68, "右偏分布 + 概率加权", { size: 11.5, weight: 700, fill: C.blue });
    s += path("M70,190 C110,190 120,150 140,110 C155,82 170,78 185,80 C210,84 225,120 240,150 C252,172 262,184 280,188", { stroke: C.blue, w: 2.4 });
    s += path("M240,150 C258,178 268,186 285,189 L285,196 L240,196 Z", { fill: C.amber, stroke: "none", opacity: 0.55 });
    s += line(62, 196, 300, 196, { stroke: C.axis, w: 1.4 });
    s += txt(263, 168, "右尾被高估", { size: 10, weight: 700, fill: C.amber });
    s += txt(263, 182, "overweighted tail", { size: 9, fill: C.muted, italic: true });
    s += txt(185, 208, "投资者愿意为彩票属性付溢价", { size: 10.5, fill: C.ink });
    /* right: skewness vs return */
    s += rect(370, 46, 270, 168, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(505, 68, "偏度 ↑ ⇒ 平均收益 ↓", { size: 11.5, weight: 700, fill: C.amber });
    s += line(400, 190, 620, 190, { stroke: C.axis, w: 1.4 });
    s += line(400, 190, 400, 88, { stroke: C.axis, w: 1.4 });
    s += txt(392, 96, "E[r]", { size: 10, fill: C.muted, anchor: "end" });
    s += txt(622, 204, "Skewness", { size: 10, fill: C.muted, anchor: "end" });
    s += path("M412,102 C460,120 520,150 612,172", { stroke: C.red, w: 2.6 });
    s += dot(430, 108, 4, { fill: C.blue }); s += txt(430, 122, "IPO / OTC", { size: 9.5, fill: C.muted });
    s += dot(596, 166, 4, { fill: C.blue }); s += txt(596, 156, "高 IVOL / MAX", { size: 9.5, fill: C.muted });
    s += txt(505, 208, "BMV 2010 · BCW 2011 · CDG 2007", { size: 9.5, fill: C.muted, italic: true });
    s += txt(340, 240, "概率加权使右尾「感觉上」概率更大 ⇒ 正偏资产价格被推高、未来收益更低", { size: 11, weight: 600, fill: C.navy });
    return wrap(H, s);
  };

  /* ---------- 36. Myopic loss aversion (Part 8) ---------- */
  FIG.myopic_la = function () {
    var H = 262, s = "";
    s += txt(340, 26, "短视损失厌恶 Myopic Loss Aversion（Benartzi–Thaler 1995）", { size: 13, weight: 700, fill: C.navy });
    s += txt(340, 46, "评估越频繁，看到的亏损次数越多 ⇒ 感知风险越大 ⇒ 要求的股权溢价越高", { size: 10.5, fill: C.muted });
    /* annual panel */
    s += rect(50, 64, 270, 128, { fill: C.greenSoft, stroke: C.greenLine, rx: 8 });
    s += txt(185, 86, "每年看一次（Annual）", { size: 11.5, weight: 700, fill: C.green });
    s += path("M75,168 C105,166 115,140 135,118 C150,102 165,98 180,100 C205,104 225,130 245,150 C262,164 282,168 300,166", { stroke: C.green, w: 2.4 });
    s += line(68, 174, 308, 174, { stroke: C.axis, w: 1.3 });
    s += txt(185, 186, "亏损概率小 · 愿意持股", { size: 10, fill: C.ink });
    /* monthly panel */
    s += rect(360, 64, 270, 128, { fill: C.redSoft, stroke: C.redLine, rx: 8 });
    s += txt(495, 86, "每月看一次（Monthly）", { size: 11.5, weight: 700, fill: C.red });
    s += path("M382,168 C392,150 400,178 410,158 C420,138 428,172 438,150 C448,128 456,170 466,146 C476,124 486,168 496,144 C506,122 516,166 526,142 C536,120 546,164 556,140 C566,120 578,160 590,146", { stroke: C.red, w: 2.2 });
    s += line(376, 174, 616, 174, { stroke: C.axis, w: 1.3 });
    s += txt(495, 186, "亏损频繁出现 · 心理痛苦大", { size: 10, fill: C.ink });
    s += arrow(322, 128, 356, 128, { stroke: C.navy, w: 2 });
    s += rect(140, 208, 400, 36, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(340, 231, "股权溢价之谜的一种解释：λ × 评估频率 ⇒ 要求更高补偿", { size: 11, weight: 600, fill: C.navy });
    return wrap(H, s);
  };

  /* ---------- 37. Realization utility (Part 8) ---------- */
  FIG.realization_util = function () {
    var H = 252, s = "";
    s += txt(340, 26, "实现效用 Realization Utility（Shefrin–Statman 1985）", { size: 13, weight: 700, fill: C.navy });
    /* price path */
    s += line(70, 170, 620, 170, { stroke: C.axis, w: 1.3 });
    s += line(70, 170, 70, 70, { stroke: C.axis, w: 1.3 });
    s += txt(62, 76, "价格", { size: 10, fill: C.muted, anchor: "end" });
    s += path("M80,160 C130,150 160,120 200,108 C240,96 280,88 330,84 C370,81 400,70 430,58", { stroke: C.blue, w: 2.6 });
    s += dot(430, 58, 5, { fill: C.green, stroke: "#fff" });
    s += line(430, 58, 430, 170, { stroke: C.green, w: 1.6, dash: "4 3" });
    s += rect(372, 176, 116, 30, { fill: C.greenSoft, stroke: C.greenLine, rx: 6 });
    s += txt(430, 195, "卖出盈利 ✦ 效用脉冲", { size: 10.5, weight: 700, fill: C.green });
    s += line(140, 118, 140, 170, { stroke: C.gray, w: 1.4, dash: "3 3" });
    s += txt(140, 112, "账面盈利（未实现）", { size: 10, fill: C.muted });
    s += rect(60, 204, 560, 34, { fill: C.purpleSoft, stroke: C.purpleLine, rx: 8 });
    s += txt(340, 226, "效用来自「已实现」盈亏：关闭盈利头寸 = 获得心理奖励 ⇒ 过早卖出赢家（处置效应）", { size: 10.5, weight: 600, fill: C.purple });
    s += txt(340, 246, "神经证据：Frydman et al. (2014) —— 腹侧纹状体 vSt 仅在「卖出盈利」时激活", { size: 9.5, fill: C.muted, italic: true });
    return wrap(H, s);
  };

  /* ---------- 38. Allais paradox (Part 9) ---------- */
  FIG.allais = function () {
    var H = 272, s = "";
    s += txt(340, 26, "Allais 悖论：同一个 1% 空门事件，情境决定它是否被「看见」", { size: 13, weight: 700, fill: C.navy });
    /* Case 1 */
    s += rect(40, 46, 290, 172, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(185, 68, "Case 1：z = 2400 → 风险厌恶", { size: 11.5, weight: 700, fill: C.blue });
    s += txt(185, 92, "L₁: 2500 (33%) · $0 (1%) · 2400 (66%)", { size: 10, fill: C.ink });
    s += txt(185, 112, "L₂: $2400 确定 ✓ 被选中", { size: 10, weight: 700, fill: C.green });
    s += rect(64, 126, 118, 26, { fill: C.redSoft, stroke: C.redLine, rx: 5 });
    s += txt(123, 143, "下行 $0 最显著", { size: 9.5, weight: 700, fill: C.red });
    s += txt(185, 172, "「0 比 2400 低太多」→ 聚焦下行", { size: 10, fill: C.ink });
    s += txt(185, 192, "高估 1% 空门状态 → 拒绝 L₁", { size: 10, fill: C.ink });
    /* Case 2 */
    s += rect(350, 46, 290, 172, { fill: C.amberSoft, stroke: C.amberLine, rx: 8 });
    s += txt(495, 68, "Case 2：z = 0 → 风险寻求", { size: 11.5, weight: 700, fill: C.amber });
    s += txt(495, 92, "L₁: 2500 (33%) · $0 (67%) ✓ 被选中", { size: 10, weight: 700, fill: C.green });
    s += txt(495, 112, "L₂: 2400 (34%) · $0 (66%)", { size: 10, fill: C.ink });
    s += rect(474, 126, 118, 26, { fill: C.greenSoft, stroke: C.greenLine, rx: 5 });
    s += txt(533, 143, "上行 2500 最显著", { size: 9.5, weight: 700, fill: C.green });
    s += txt(495, 172, "两者下行相同（都是 0）→ 不显著", { size: 10, fill: C.ink });
    s += txt(495, 192, "聚焦上行差异 → 选择 L₁", { size: 10, fill: C.ink });
    s += rect(120, 230, 440, 30, { fill: C.purpleSoft, stroke: C.purpleLine, rx: 8 });
    s += txt(340, 250, "Salience：显著 payoff = 与其他彩票差异最大的 payoff —— 选择随情境逆转", { size: 10.5, weight: 600, fill: C.purple });
    return wrap(H, s);
  };

  /* ---------- 39. Salience-distorted weights (Part 9) ---------- */
  FIG.salience_weight = function () {
    var H = 258, s = "";
    s += txt(340, 26, "显著性扭曲权重：π̃ = π × ω（δ = 0.7）", { size: 13, weight: 700, fill: C.navy });
    var states = ["s₃ 最显著 k=1", "s₁ 次显著 k=2", "s₂ 不显著 k=3"];
    var pi = [0.333, 0.333, 0.333];
    var pit = [0.457, 0.320, 0.224];
    var bx = [90, 280, 470], i;
    for (i = 0; i < 3; i++) {
      var hPi = pi[i] * 300, hPt = pit[i] * 300;
      s += rect(bx[i], 210 - hPi, 46, hPi, { fill: C.graySoft, stroke: C.gray, rx: 3 });
      s += rect(bx[i] + 56, 210 - hPt, 46, hPt, { fill: i === 0 ? C.redSoft : C.blueSoft, stroke: i === 0 ? C.redLine : C.blueLine, rx: 3 });
      s += txt(bx[i] + 51, 232, states[i], { size: 9.5, weight: 600, fill: i === 0 ? C.red : C.ink });
    }
    s += line(70, 210, 620, 210, { stroke: C.axis, w: 1.4 });
    s += legend([{ color: C.gray, label: "客观 π = 1/3" }, { color: C.blue, label: "扭曲后 π̃" }], 180, 52);
    s += txt(340, 74, "", { size: 9 });
    s += rect(150, 88, 380, 26, { fill: C.redSoft, stroke: C.redLine, rx: 6 });
    s += txt(340, 105, "最显著状态权重被放大：ω ≈ 1.37 → π̃ ≈ 0.457", { size: 10, weight: 600, fill: C.red });
    return wrap(H, s);
  };

  /* ---------- 40. Salience pricing (Part 9) ---------- */
  FIG.st_pricing = function () {
    var H = 262, s = "";
    s += txt(340, 26, "显著性定价：pᵢ = E[x] + cov[ω, x]", { size: 13, weight: 700, fill: C.navy });
    s += line(80, 210, 620, 210, { stroke: C.axis, w: 1.4 });
    s += line(350, 210, 350, 60, { stroke: C.axis, w: 1.3, dash: "5 4" });
    s += txt(350, 228, "理性价值 E[x]", { size: 10, fill: C.muted });
    /* upside salient */
    s += dot(500, 96, 6, { fill: C.red, stroke: "#fff" });
    s += arrow(500, 150, 500, 102, { stroke: C.red, w: 2.2 });
    s += txt(500, 84, "上行显著（ST > 0）", { size: 11, weight: 700, fill: C.red });
    s += txt(500, 170, "被高估、买贵了", { size: 10, fill: C.ink });
    s += txt(500, 244, "未来收益低", { size: 10.5, weight: 700, fill: C.red });
    /* downside salient */
    s += dot(200, 178, 6, { fill: C.green, stroke: "#fff" });
    s += arrow(200, 118, 200, 170, { stroke: C.green, w: 2.2 });
    s += txt(200, 84, "下行显著（ST < 0）", { size: 11, weight: 700, fill: C.green });
    s += txt(200, 200, "被低估、卖便宜了", { size: 10, fill: C.ink });
    s += txt(200, 244, "未来收益高", { size: 10.5, weight: 700, fill: C.green });
    s += rect(230, 130, 240, 30, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(350, 150, "cov[ω, x] 决定偏离方向与幅度", { size: 10, weight: 600, fill: C.navy });
    return wrap(H, s);
  };

  /* ---------- 41. ST measure pipeline (Part 9) ---------- */
  FIG.st_measure = function () {
    var H = 236, s = "";
    s += txt(340, 26, "ST 因子构造与检验（Cosemans & Frehen 2021）", { size: 13, weight: 700, fill: C.navy });
    var steps = [
      { t: "① 过去一个月日收益", d: "状态空间 · 等概率 1/N", fill: C.blueSoft, stroke: C.blueLine, tf: C.blue },
      { t: "② 相对市场算 σ", d: "|r−r̄|/(|r|+|r̄|+0.1)", fill: C.purpleSoft, stroke: C.purpleLine, tf: C.purple },
      { t: "③ 排名 → ω", d: "δ=0.7 加权归一化", fill: C.amberSoft, stroke: C.amberLine, tf: C.amber },
      { t: "④ 月末得 ST", d: "E[r] = −cov[ω, r]", fill: C.greenSoft, stroke: C.greenLine, tf: C.green }
    ];
    var x = 36, i;
    for (i = 0; i < 4; i++) {
      s += rect(x, 52, 138, 74, { fill: steps[i].fill, stroke: steps[i].stroke, rx: 8 });
      s += txt(x + 69, 80, steps[i].t, { size: 10.5, weight: 700, fill: steps[i].tf });
      s += txt(x + 69, 104, steps[i].d, { size: 9, fill: C.ink });
      if (i < 3) s += arrow(x + 140, 89, x + 156, 89, { stroke: C.navy, w: 2 });
      x += 158;
    }
    s += rect(36, 146, 300, 66, { fill: C.redSoft, stroke: C.redLine, rx: 8 });
    s += txt(186, 168, "十分位检验（EW High−Low）", { size: 11, weight: 700, fill: C.red });
    s += txt(186, 190, "−1.28%/月，t = −10.73", { size: 11.5, weight: 700, fill: C.ink });
    s += txt(186, 206, "做多低 ST · 做空高 ST", { size: 9.5, fill: C.muted });
    s += rect(356, 146, 288, 66, { fill: C.blueSoft, stroke: C.blueLine, rx: 8 });
    s += txt(500, 168, "Fama–MacBeth 交互项", { size: 11, weight: 700, fill: C.blue });
    s += txt(500, 190, "套利限制越强 ⇒ ST 预测力越强", { size: 10.5, weight: 600, fill: C.ink });
    s += txt(500, 206, "ME · ILLIQ · IVOL · IO · NOA 全部正显著", { size: 9.5, fill: C.muted });
    return wrap(H, s);
  };

  /* ============================================================
     Renderer
     ============================================================ */
  function renderAll() {
    var nodes = document.querySelectorAll("[data-fig]");
    Array.prototype.forEach.call(nodes, function (el) {
      var key = el.getAttribute("data-fig");
      var fn = FIG[key];
      if (!fn) { el.innerHTML = "<p class='muted'>（缺少图形：" + key + "）</p>"; return; }
      var cap = el.getAttribute("data-cap") || "";
      var src = el.getAttribute("data-src") || "";
      el.className = "figure";
      el.innerHTML = "<div class='fig-canvas'>" + fn() + "</div>" +
        (cap ? "<div class='fig-cap'><b>Figure.</b> " + esc(cap) +
          (src ? " <span class='fig-src'>Source: " + esc(src) + "</span>" : "") + "</div>" : "");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderAll);
  } else {
    renderAll();
  }

  window.Figures = FIG;
})();

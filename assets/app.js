/* ============================================================
   FIN 4080 Behavioral Finance Study Site
   navigation + TOC + back-to-top + exercise numbering
   ============================================================ */
(function () {
  "use strict";

  // ---- Resolve the app base so relative links/nav work on any host ----
  // (incl. Miaoda sub-paths like /page/<token>/). Without this, links like
  // "part2.html" resolve against the bare entry path and drop the app folder,
  // landing on the homepage instead of the target page.
  var APP_BASE = (function () {
    var p = location.pathname || "/";
    if (/\/[^\/]+\.[a-z0-9]+$/i.test(p)) p = p.replace(/[^\/]+$/, "");
    if (p && p.charAt(p.length - 1) !== "/") p += "/";
    return p;
  })();
  (function () {
    var b = document.createElement("base");
    b.href = APP_BASE;
    if (document.head && document.head.firstChild) document.head.insertBefore(b, document.head.firstChild);
    else (document.head || document.documentElement).appendChild(b);
  })();

  // ---- Site map (single source of truth for navigation) ----
  var SITE = [
    { group: null, items: [
      { id: "index", file: "index.html", label: "课程总览", sub: "Syllabus & Roadmap" }
    ]},
    { group: "Part 1 · 导论", items: [
      { id: "part1", file: "part1-introduction.html", label: "Part 1 导论", sub: "EMH · 三大范式 · 理性基准 · 泡沫之争" }
    ]},
    { group: "Part 2 · 套利限制", items: [
      { id: "part2", file: "part2-limits-to-arbitrage.html", label: "Part 2 套利限制", sub: "四类风险 · 实施成本 · twin shares / carve-out / 指数纳入" }
    ]},
    { group: "Part 3 · 心理学基础", items: [
      { id: "part3", file: "part3-psychology.html", label: "Part 3 心理学基础", sub: "前景理论 · 窄框架 · 模糊厌恶 · 双曲折现 · 信念偏差" }
    ]},
    { group: "Part 4 · 资产价格的事实", items: [
      { id: "part4", file: "part4-asset-prices.html", label: "Part 4 资产价格的事实", sub: "股权溢价 · 波动 · 可预测性 · 横截面异象" }
    ]},
    { group: "Part 5 · 投资者行为的事实", items: [
      { id: "part5", file: "part5-investor-behavior.html", label: "Part 5 投资者行为", sub: "分散化不足 · 处置效应 · 买卖行为 · 机构业绩" }
    ]},
    { group: "Part 6 · 行为资产定价模型", items: [
      { id: "part6", file: "part6-behavioral-models.html", label: "Part 6 行为模型", sub: "DSSW · BSV · DHS · HS · BHS" }
    ]},
    { group: "Part 7 · 公司金融与规范性", items: [
      { id: "part7", file: "part7-corporate-prescriptive.html", label: "Part 7 公司金融 & 规范性", sub: "错误定价 · 管理者非理性 · 助推 · Nudge" }
    ]},
    { group: "Part 8 · 前景理论的应用", items: [
      { id: "part8", file: "part8-pt-applications.html", label: "Part 8 前景理论应用", sub: "偏度定价 · 股权溢价 · 实现效用 · TK (2016)" }
    ]},
    { group: "Part 9 · 显著性理论", items: [
      { id: "part9", file: "part9-salience.html", label: "Part 9 显著性理论", sub: "Allais 悖论 · BGS 模型 · ST 因子 · 实证" }
    ]}
  ];

  var EN_MAP = {
    "index": "Overview",
    "part1": "Introduction",
    "part2": "Limits to Arbitrage",
    "part3": "Psychology",
    "part4": "Facts: Asset Prices",
    "part5": "Facts: Investor Behavior",
    "part6": "Behavioral Models",
    "part7": "Corporate & Prescriptive",
    "part8": "PT Applications",
    "part9": "Salience Theory"
  };

  var current = document.body.getAttribute("data-page") || "";
  var root = document.body.getAttribute("data-root") || "";

  // ---- Build top bar ----
  function buildTopbar() {
    var host = document.getElementById("site-topbar");
    if (!host) return;

    var navLinks = SITE.map(function (g) {
      return g.items.map(function (it) {
        var active = it.id === current ? " active" : "";
        return '<a class="' + active.trim() + '" href="' + APP_BASE + it.file + '">' + it.label + '</a>';
      }).join("");
    }).join("");

    var panel = SITE.map(function (g) {
      var label = g.group
        ? '<div class="group-label">' + g.group + '</div>'
        : '<div class="group-label">开始</div>';
      var links = g.items.map(function (it) {
        var active = it.id === current ? " active" : "";
        return '<a class="' + active.trim() + '" href="' + APP_BASE + it.file + '">' +
          it.label + '<span class="sub">' + it.sub + '</span></a>';
      }).join("");
      return label + links;
    }).join("");

    host.className = "topbar";
    host.innerHTML =
      '<div class="topbar-inner">' +
        '<a class="brand" href="' + APP_BASE + 'index.html">' +
          '<span class="logo">4080</span>' +
          '<span>FIN 4080 学习站<small>Behavioral Finance · CUHK-Shenzhen</small></span>' +
        '</a>' +
        '<nav class="topnav">' + navLinks + '</nav>' +
        '<span class="spacer"></span>' +
        '<div class="dropdown" id="themeDD">' +
          '<button type="button" aria-haspopup="true" aria-expanded="false">' +
            '主题选择 · ' + (EN_MAP[current] || "Navigate") + ' <span class="caret">▼</span>' +
          '</button>' +
          '<div class="dropdown-panel">' + panel + '</div>' +
        '</div>' +
      '</div>';

    var dd = document.getElementById("themeDD");
    var btn = dd.querySelector("button");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      dd.classList.toggle("open");
      btn.setAttribute("aria-expanded", dd.classList.contains("open") ? "true" : "false");
    });
    document.addEventListener("click", function () { dd.classList.remove("open"); });

    // ---- Top nav: wheel scrolls horizontally, keep active link visible ----
    var nav = host.querySelector(".topnav");
    if (nav) {
      nav.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          nav.scrollLeft += e.deltaY;
        }
      }, { passive: false });
      var act = nav.querySelector("a.active");
      if (act) {
        requestAnimationFrame(function () {
          nav.scrollLeft = act.offsetLeft - nav.clientWidth / 2 + act.offsetWidth / 2;
        });
      }
    }
  }

  // ---- Build left sidebar: site-wide part nav (auto-locates current page) + in-page TOC ----
  function buildTOC() {
    var host = document.getElementById("site-toc");
    var main = document.querySelector("main");
    if (!host || !main) { if (host) host.style.display = "none"; return; }

    // (1) Site-wide navigation — the left "目录". Current Part is auto-highlighted.
    var siteNav =
      '<div class="toc-site"><h4>课程导航</h4>' +
      SITE.map(function (g) {
        return g.items.map(function (it) {
          var active = it.id === current ? ' class="active"' : "";
          return '<a' + active + ' href="' + APP_BASE + it.file + '">' + it.label + '</a>';
        }).join("");
      }).join("") +
      '</div>';

    // (2) In-page section TOC (built from headings)
    var heads = main.querySelectorAll("h2.sec, h3.sub");
    var list = [];
    var pageHtml = "";
    if (heads.length) {
      pageHtml = '<div class="toc-page"><h4>本页目录</h4>';
      Array.prototype.forEach.call(heads, function (h, i) {
        if (!h.id) h.id = "sec-" + i;
        var cls = h.tagName === "H3" ? ' class="lvl2"' : "";
        var label = h.getAttribute("data-short") || h.textContent.replace(/¶|Section|§/g, "").trim();
        pageHtml += '<a href="#' + h.id + '"' + cls + '>' + label + '</a>';
        list.push(h);
      });
      pageHtml += '</div>';
    }

    host.innerHTML = siteNav + pageHtml;
    if (!heads.length) return;

    // scroll-spy for the in-page TOC only
    var links = host.querySelectorAll(".toc-page a");
    if (!links.length) return;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY + 130;
        var activeIdx = -1;
        for (var i = 0; i < list.length; i++) {
          if (list[i].getBoundingClientRect().top + window.scrollY <= y) activeIdx = i;
        }
        links.forEach(function (a, i) { a.classList.toggle("active", i === activeIdx); });
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // ---- Back to top ----
  function buildTop() {
    var b = document.createElement("button");
    b.className = "totop";
    b.title = "回到顶部";
    b.innerHTML = "↑";
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(b);
    window.addEventListener("scroll", function () {
      b.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
  }

  // ---- Auto-generate exercise numbering per page ----
  function numberExercises() {
    var groups = document.querySelectorAll("[data-exgroup]");
    Array.prototype.forEach.call(groups, function (g) {
      var ex = g.querySelectorAll(".exercise[data-ex]");
      Array.prototype.forEach.call(ex, function (e, i) {
        var tag = e.querySelector(".ex-title .num");
        if (tag) tag.textContent = (i + 1);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildTopbar();
    buildTOC();
    buildTop();
    numberExercises();
  });
})();

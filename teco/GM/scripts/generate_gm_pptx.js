// ============================================================
// 東元 GM AI Agent 導入規劃簡報
// 商機分析師 × 報價策略決策（雙案併行）
// ============================================================

const pptxgen = require("pptxgenjs");
const fs = require("fs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333" x 7.5"
pres.author = "智慧方案股份有限公司";
pres.title = "東元 GM AI Agent 導入規劃書";

// ===== 色系（Intellicon / EgentHub 紫色品牌色）=====
const PRIMARY = "8A7AD2";       // Intellicon 主紫
const SECONDARY = "5D4894";     // 深紫
const DARK = "3D2F66";          // 極深紫
const LIGHT = "D5C8EE";         // 中淺紫
const VLIGHT = "E9DEF6";        // 淺紫
const BG_LIGHT = "F4EFFA";      // 極淺紫
const TEXT_DEFAULT = "2A2740";  // 深紫黑
const TEXT_MUTED = "6B6580";    // 紫灰
const WHITE = "FFFFFF";
const ACCENT_GOLD = "D4A95C";   // 暖金（與紫互補）

const FONT = "Microsoft JhengHei";

// ===== 版面常用座標 =====
const SLIDE_W = 13.333;
const SLIDE_H = 7.5;
const MARGIN = 0.5;
const TITLE_Y = 0.35;
const TITLE_H = 0.6;
const SUBTITLE_Y = 0.95;
const CONTENT_Y = 1.5;

// ===== Helpers =====
function addSlideHeader(slide, title, subtitle) {
  // 頁首左側細彩條
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: SLIDE_H,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  // 標題
  slide.addText(title, {
    x: 0.5, y: TITLE_Y, w: 12.3, h: TITLE_H,
    fontFace: FONT, fontSize: 28, bold: true, color: PRIMARY, valign: "top", margin: 0
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: SUBTITLE_Y, w: 12.3, h: 0.4,
      fontFace: FONT, fontSize: 14, color: TEXT_MUTED, valign: "top", margin: 0
    });
  }
  // 頁尾
  slide.addText("智慧方案股份有限公司  |  EgentHub 企業 AI Agent 平台", {
    x: 0.5, y: SLIDE_H - 0.35, w: 8, h: 0.25,
    fontFace: FONT, fontSize: 9, color: TEXT_MUTED, margin: 0
  });
  slide.addText(`東元 GM 事業群  AI Agent 導入規劃書`, {
    x: SLIDE_W - 6.5, y: SLIDE_H - 0.35, w: 4.5, h: 0.25,
    fontFace: FONT, fontSize: 9, color: TEXT_MUTED, align: "right", margin: 0
  });
}

function pageNumber(slide, n, total) {
  slide.addText(`${n} / ${total}`, {
    x: SLIDE_W - 1.2, y: SLIDE_H - 0.35, w: 0.7, h: 0.25,
    fontFace: FONT, fontSize: 9, color: TEXT_MUTED, align: "right", margin: 0
  });
}

const TOTAL = 18;

// ============================================================
// Slide 1 — 封面
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: PRIMARY };

  // 左側裝飾色塊
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.4, h: SLIDE_H, fill: { color: ACCENT_GOLD }, line: { color: ACCENT_GOLD }
  });

  // 副標籤
  s.addText("東元電機 機電系統事業群（GM）", {
    x: 1.2, y: 1.6, w: 11, h: 0.5,
    fontFace: FONT, fontSize: 18, color: LIGHT, margin: 0
  });

  // 主標題
  s.addText("AI Agent 導入規劃書", {
    x: 1.2, y: 2.2, w: 11, h: 1.2,
    fontFace: FONT, fontSize: 54, bold: true, color: WHITE, margin: 0
  });

  // 副標題
  s.addText("商機分析師  ×  報價策略決策", {
    x: 1.2, y: 3.6, w: 11, h: 0.6,
    fontFace: FONT, fontSize: 28, color: WHITE, margin: 0
  });

  // 設計理念 tagline
  s.addText("Autonomous Agent × EgentHub 雙層協作架構", {
    x: 1.2, y: 4.4, w: 11, h: 0.5,
    fontFace: FONT, fontSize: 16, color: LIGHT, italic: true, margin: 0
  });

  // 分隔線
  s.addShape(pres.shapes.LINE, {
    x: 1.2, y: 5.2, w: 5, h: 0,
    line: { color: ACCENT_GOLD, width: 2 }
  });

  // 提案公司
  s.addText("智慧方案股份有限公司  |  Intellicon Solutions", {
    x: 1.2, y: 5.5, w: 11, h: 0.4,
    fontFace: FONT, fontSize: 16, color: WHITE, bold: true, margin: 0
  });
  s.addText("EgentHub 企業 AI Agent 平台", {
    x: 1.2, y: 5.95, w: 11, h: 0.35,
    fontFace: FONT, fontSize: 12, color: LIGHT, margin: 0
  });
  s.addText("2026 年 5 月", {
    x: 1.2, y: 6.5, w: 11, h: 0.35,
    fontFace: FONT, fontSize: 12, color: LIGHT, margin: 0
  });
}

// ============================================================
// Slide 2 — 議程
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "議程  Agenda", "本次規劃涵蓋兩大題目，從設計哲學到實施稽核共九個章節");
  pageNumber(s, 2, TOTAL);

  const items = [
    ["01", "專案背景與設計哲學", "GM 現況痛點、四項核心設計原則"],
    ["02", "整體架構：雙層協作", "Autonomous Agent × EgentHub 分工"],
    ["03", "題目一：商機分析師", "場景、資料、SOP、知識庫"],
    ["04", "題目二：報價策略決策", "場景、資料、SOP、知識庫"],
    ["05", "POC 實施規劃與時程", "五階段、6 個月甘特圖"],
    ["06", "顧問時數估算", "Intellicon 約 150 小時"],
    ["07", "總管理處稽核機制", "六大稽核點"],
    ["08", "後續擴展藍圖", "第二、三層 Agent 與跨事業群"],
    ["09", "下一步行動建議", "立即至 6 個月行動清單"],
  ];

  const cols = 3, rows = 3, cw = 4.0, ch = 1.5;
  const startX = 0.7, startY = 1.7;

  items.forEach((it, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const x = startX + col * (cw + 0.15);
    const y = startY + row * (ch + 0.2);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: VLIGHT, width: 0.5 }
    });
    // 編號
    s.addText(it[0], {
      x: x + 0.15, y: y + 0.15, w: 0.7, h: 0.6,
      fontFace: FONT, fontSize: 24, bold: true, color: PRIMARY, margin: 0
    });
    // 標題
    s.addText(it[1], {
      x: x + 0.85, y: y + 0.15, w: cw - 1.0, h: 0.55,
      fontFace: FONT, fontSize: 14, bold: true, color: PRIMARY, valign: "middle", margin: 0
    });
    // 描述
    s.addText(it[2], {
      x: x + 0.15, y: y + 0.78, w: cw - 0.3, h: 0.6,
      fontFace: FONT, fontSize: 11, color: TEXT_MUTED, margin: 0
    });
  });
}

// ============================================================
// Slide 3 — 核心問題定義
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "核心問題定義", "不是「AI 寫不寫得出報告」，是「判斷流程能不能被組織保存」");
  pageNumber(s, 3, TOTAL);

  // 左欄：現況痛點
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 6.0, h: 5.4,
    fill: { color: VLIGHT }, line: { color: LIGHT, width: 0.5 }
  });
  s.addText("現況：藏在資深業務腦中的判斷邏輯", {
    x: 0.7, y: 1.65, w: 5.6, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const pains = [
    { t: "商機資訊高度分散", d: "新聞、年報、徵才、原料行情、政府方案各走各的，沒有統一視角" },
    { t: "早期訊號最有價值卻最容易漏接", d: "客戶剛擴廠的訊號最有價值，但模糊難以量化判斷" },
    { t: "報價判斷仰賴資深業務", d: "「這價格殺得下去嗎」「這客戶最近有競爭嗎」邏輯藏在腦中" },
    { t: "新人難以複製、難以交接", d: "資深業務退休或請假，組織能力直接斷層" },
    { t: "AI 容易過度推論", d: "資料不全時，AI 能「寫」出看似專業實則根據不足的結論" },
  ];

  pains.forEach((p, i) => {
    const y = 2.2 + i * 0.92;
    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y + 0.05, w: 0.3, h: 0.3,
      fill: { color: PRIMARY }, line: { color: PRIMARY }
    });
    s.addText(`${i + 1}`, {
      x: 0.7, y: y + 0.05, w: 0.3, h: 0.3,
      fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(p.t, {
      x: 1.1, y: y, w: 5.3, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
    });
    s.addText(p.d, {
      x: 1.1, y: y + 0.4, w: 5.3, h: 0.45,
      fontFace: FONT, fontSize: 10.5, color: TEXT_MUTED, margin: 0
    });
  });

  // 右欄：核心命題
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 1.5, w: 6.0, h: 5.4,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("專案目標", {
    x: 7.05, y: 1.65, w: 5.6, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: WHITE, margin: 0
  });

  s.addText("不是做一個「會寫報告的 AI」，", {
    x: 7.05, y: 2.3, w: 5.6, h: 0.45,
    fontFace: FONT, fontSize: 16, color: WHITE, margin: 0
  });
  s.addText("而是打造「會遵循 SOP、知道何時該停下來、", {
    x: 7.05, y: 2.75, w: 5.6, h: 0.45,
    fontFace: FONT, fontSize: 16, color: WHITE, margin: 0
  });
  s.addText("並主動要求補資料」的 AI Agent 團隊。", {
    x: 7.05, y: 3.2, w: 5.6, h: 0.45,
    fontFace: FONT, fontSize: 16, color: WHITE, margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 7.05, y: 3.85, w: 4.5, h: 0,
    line: { color: ACCENT_GOLD, width: 1.5 }
  });

  s.addText("讓判斷可被放大、可被保存、可被新人繼承", {
    x: 7.05, y: 4.05, w: 5.6, h: 0.4,
    fontFace: FONT, fontSize: 14, italic: true, bold: true, color: ACCENT_GOLD, margin: 0
  });

  s.addText("交付目標：", {
    x: 7.05, y: 4.75, w: 5.6, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: LIGHT, margin: 0
  });
  s.addText([
    { text: "從「資深業務的個人英雄主義」", options: { breakLine: true, color: WHITE, fontSize: 13 } },
    { text: "走向「組織級可複製、可稽核的決策能力」", options: { color: WHITE, fontSize: 13 } }
  ], {
    x: 7.05, y: 5.1, w: 5.6, h: 0.9,
    fontFace: FONT, margin: 0
  });

  s.addText("這次同時做兩個 Agent：", {
    x: 7.05, y: 6.05, w: 5.6, h: 0.3,
    fontFace: FONT, fontSize: 11, color: LIGHT, margin: 0
  });
  s.addText("商機分析師（事前主動）  +  報價策略決策（事中即時）", {
    x: 7.05, y: 6.4, w: 5.6, h: 0.4,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
}

// ============================================================
// Slide 4 — 設計哲學四原則
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "整體設計原則", "兩個 Agent 都遵循這四項核心哲學，是稽核 AI 行為的依據");
  pageNumber(s, 4, TOTAL);

  const principles = [
    { n: "01", t: "流程優先於模型", d: "先定義「GM 業務應該如何挖商機、如何決策報價」，AI 才介入輔助每個步驟。提示詞與工具都是流程的延伸，不是流程的核心。" },
    { n: "02", t: "資料確認是硬閘門", d: "在關鍵資料未確認前，AI 不分析、不推估、不下結論。寧可主動回頭要求業務補資料，也不容許「看似完整但根據不足」的輸出污染決策。" },
    { n: "03", t: "判斷邏輯與事實資料分離", d: "判斷規則與估算邏輯內建於 Agent 行為規範；客戶、產業、歷史報價、原料行情則存於企業知識庫。讓兩者各自演化。" },
    { n: "04", t: "人機協作，不是全自動", d: "AI 的責任是加速、結構化、指出不確定性。最終商機判斷與報價決策仍由業務或業務主管執行。AI 是夥伴，不是取代。" },
  ];

  const cw = 6.0, ch = 2.7;
  const startX = 0.5, startY = 1.5;
  principles.forEach((p, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cw + 0.3);
    const y = startY + row * (ch + 0.2);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: PRIMARY, width: 1 }
    });
    // 左側深色條
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.15, h: ch,
      fill: { color: PRIMARY }, line: { color: PRIMARY }
    });
    // 編號
    s.addText(p.n, {
      x: x + 0.35, y: y + 0.15, w: 1.0, h: 0.55,
      fontFace: FONT, fontSize: 28, bold: true, color: PRIMARY, margin: 0
    });
    // 原則標題
    s.addText(p.t, {
      x: x + 0.35, y: y + 0.75, w: cw - 0.5, h: 0.55,
      fontFace: FONT, fontSize: 20, bold: true, color: DARK, margin: 0
    });
    // 描述
    s.addText(p.d, {
      x: x + 0.35, y: y + 1.4, w: cw - 0.5, h: ch - 1.5,
      fontFace: FONT, fontSize: 12, color: TEXT_DEFAULT, margin: 0
    });
  });
}

// ============================================================
// Slide 5 — 整體架構（嵌入架構圖）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "整體架構：Autonomous Agent × EgentHub 雙層協作", "訊號層給「事實」，決策層給「決策」，鬆耦合設計確保未來可替換訊號層");
  pageNumber(s, 5, TOTAL);

  // 嵌入架構圖
  s.addImage({
    path: "/sessions/jolly-amazing-franklin/mnt/outputs/architecture_diagram.png",
    x: 0.5, y: 1.55, w: 12.3, h: 5.6, sizing: { type: "contain", w: 12.3, h: 5.6 }
  });
}

// ============================================================
// Slide 6 — 重要附註：Autonomous Agent 技術環境
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "重要附註：Autonomous Agent 技術環境說明", "讓總管理處清楚理解工具屬性、責任歸屬、未來替換時點");
  pageNumber(s, 6, TOTAL);

  // 主要說明卡片
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 12.3, h: 1.4,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 0.18, h: 1.4,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("Autonomous Agent 並非 EgentHub 平台既有功能", {
    x: 0.85, y: 1.7, w: 11.8, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("Intellicon 可在指令設計、任務拆解、訊號蒐集策略提供顧問建議；初期實際的技術環境建置（執行框架、爬蟲管線、資料儲存、研究報告產出）由東元數發處負責並指派專責人員維運。", {
    x: 0.85, y: 2.15, w: 11.8, h: 0.75,
    fontFace: FONT, fontSize: 12, color: TEXT_DEFAULT, margin: 0
  });

  // 三張時間軸卡片
  const cards = [
    { phase: "現在（POC 期）", title: "數發處主導建置", color: PRIMARY,
      pts: ["數發處建置技術環境並維運", "Intellicon 提供指令設計與策略建議", "已驗證可行（CTCI 案）", "數發處同時累積 Agent 實作經驗"] },
    { phase: "2026 年 Q3", title: "Intellicon 自有方案推出", color: SECONDARY,
      pts: ["Intellicon 原生 Autonomous Agent 上線", "整合進 EgentHub 成為平台原生能力", "享有平台層級更新與維運支援", "跨事業群統一管理"] },
    { phase: "Q3 末評估會議", title: "替換決策點", color: DARK,
      pts: ["盤點數發處初期建置成果", "比對 Intellicon 原生方案功能與成本", "評估跨事業群擴展性", "鬆耦合設計：替換不影響 EgentHub Agent"] },
  ];

  const cw = 4.0, ch = 3.7;
  const startX = 0.5, startY = 3.2;
  cards.forEach((c, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: WHITE }, line: { color: c.color, width: 1.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.6,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.phase, {
      x: x + 0.2, y: startY + 0.1, w: cw - 0.4, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: WHITE, valign: "middle", margin: 0
    });
    s.addText(c.title, {
      x: x + 0.2, y: startY + 0.75, w: cw - 0.4, h: 0.4,
      fontFace: FONT, fontSize: 16, bold: true, color: c.color, margin: 0
    });
    const items = c.pts.map((p, j) => ({
      text: p,
      options: { bullet: true, breakLine: j !== c.pts.length - 1, fontSize: 11, color: TEXT_DEFAULT }
    }));
    s.addText(items, {
      x: x + 0.25, y: startY + 1.3, w: cw - 0.45, h: ch - 1.4,
      fontFace: FONT, valign: "top", margin: 0
    });
  });

  // 底部
  s.addText("鬆耦合設計：訊號層與決策層透過 xlsx 報告中介，未來替換訊號層工具時，決策層 Agent 不需重新開發", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 7 — 三方協作分工
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "三方協作分工", "本案涉及三個關鍵單位的協作，AI 工具成為跨單位的共同語言");
  pageNumber(s, 7, TOTAL);

  const roles = [
    {
      name: "東元數發處",
      role: "主執行（Execution）",
      duties: ["Autonomous Agent 技術環境建置與維運", "知識庫資料準備（CSV、ERP 拋接）", "簡單提示詞撰寫與迭代測試", "上線部署與後續維運"],
      cycle: "1-2 位專責人員，全程",
      color: PRIMARY
    },
    {
      name: "Intellicon 顧問團隊",
      role: "主指導（Coaching）",
      duties: ["策略指導、SOP 共創主持", "高難度提示詞撰寫（資料閘門、Phase 4-6）", "Code Review 與品質把關", "種子團隊培訓與陪跑"],
      cycle: "約 150 小時，12 週",
      color: SECONDARY
    },
    {
      name: "GM 業務團隊（種子）",
      role: "主共創（Co-creation）",
      duties: ["提供商機判斷與報價決策邏輯", "組成種子團隊（PM 加 1-2 工程師）", "使用 Agent 並回饋迭代", "資深業務深度訪談（前 4 週為主）"],
      cycle: "全專案週期",
      color: DARK
    },
  ];

  const cw = 4.05, ch = 5.0;
  const startX = 0.5, startY = 1.55;
  roles.forEach((r, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: r.color, width: 1.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 1.0,
      fill: { color: r.color }, line: { color: r.color }
    });
    s.addText(r.name, {
      x: x + 0.2, y: startY + 0.15, w: cw - 0.4, h: 0.45,
      fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
    });
    s.addText(r.role, {
      x: x + 0.2, y: startY + 0.6, w: cw - 0.4, h: 0.35,
      fontFace: FONT, fontSize: 12, color: LIGHT, margin: 0
    });

    s.addText("主要職責", {
      x: x + 0.25, y: startY + 1.15, w: cw - 0.5, h: 0.35,
      fontFace: FONT, fontSize: 12, bold: true, color: r.color, margin: 0
    });
    const items = r.duties.map((d, j) => ({
      text: d,
      options: { bullet: true, breakLine: j !== r.duties.length - 1, fontSize: 11, color: TEXT_DEFAULT }
    }));
    s.addText(items, {
      x: x + 0.25, y: startY + 1.55, w: cw - 0.5, h: ch - 2.3,
      fontFace: FONT, valign: "top", margin: 0
    });

    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: startY + ch - 0.7, w: cw - 0.5, h: 0,
      line: { color: r.color, width: 0.75 }
    });
    s.addText(`投入週期：${r.cycle}`, {
      x: x + 0.25, y: startY + ch - 0.55, w: cw - 0.5, h: 0.35,
      fontFace: FONT, fontSize: 11, italic: true, color: r.color, margin: 0
    });
  });

  // 註腳
  s.addText("此外：GM 與總管理處於雙週節點稽核專案進度與成果；GM 資深業務（受訪者）於前 4 週深度訪談協助提取判斷邏輯", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 8 — 題目一：商機分析師 場景／資料／輸出
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目一  商機分析師 AI Agent  ｜  場景 × 資料 × 輸出", "從「等客戶詢價」轉為「先一步看到機會」");
  pageNumber(s, 8, TOTAL);

  // 三欄
  const cols = [
    { title: "1  應用場景（業務流程）", color: PRIMARY,
      content: "GM 業務團隊每週收到「商機雷達報告」，列出 Top N 潛在新案。\n\n業務以此作為主動敲門依據；資深業務則用此 Agent 二次驗證自身判斷，並把判斷邏輯沉澱成組織資產。\n\n從「等客戶詢價」轉為「先一步看到機會」。" },
    { title: "2  資料輸入與來源", color: SECONDARY,
      bullets: [
        "外部即時資料：景氣指標、產業新聞、研究報告、政府方案",
        "客戶動態：KA 年報、新聞稿、徵才訊息、擴廠計畫",
        "原物料行情：銅、矽鋼片、稀土等馬達主原料",
        "Autonomous Agent 產出 xlsx：標案彙總、競爭格局、聯盟地圖、護城河",
        "東元內部：ERP/CRM 詢報價紀錄、成交紀錄、客戶採購週期"
      ]
    },
    { title: "3  預期輸出內容", color: DARK,
      content: "每週一份「商機雷達」，可推送至業務手機 LINE 或 Email。",
      bullets: [
        "客戶名稱、觸發訊號、建議產品線",
        "預估金額區間（標註可信度）",
        "建議行動、業務話術建議",
        "資料來源與引用",
        "資料不足時明確標示「待補資訊」"
      ]
    },
  ];

  const cw = 4.05, ch = 5.4;
  const startX = 0.5, startY = 1.55;
  cols.forEach((c, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: c.color, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.7,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.title, {
      x: x + 0.2, y: startY + 0.1, w: cw - 0.4, h: 0.5,
      fontFace: FONT, fontSize: 14, bold: true, color: WHITE, valign: "middle", margin: 0
    });

    let yCur = startY + 0.85;
    if (c.content) {
      s.addText(c.content, {
        x: x + 0.25, y: yCur, w: cw - 0.5, h: 1.7,
        fontFace: FONT, fontSize: 11.5, color: TEXT_DEFAULT, margin: 0
      });
      yCur += 1.7;
    }
    if (c.bullets) {
      const items = c.bullets.map((b, j) => ({
        text: b,
        options: { bullet: true, breakLine: j !== c.bullets.length - 1, fontSize: 11.5, color: TEXT_DEFAULT }
      }));
      s.addText(items, {
        x: x + 0.25, y: yCur, w: cw - 0.5, h: startY + ch - yCur - 0.2,
        fontFace: FONT, valign: "top", margin: 0
      });
    }
  });
}

// ============================================================
// Slide 9 — 題目一：Phase 1-7 SOP
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目一  商機分析師  ｜  任務步驟（Phase 1 至 Phase 7）", "Phase 2「資料閘門」是設計上的硬性條件 — 未確認不分析、不推估、不下結論");
  pageNumber(s, 9, TOTAL);

  const phases = [
    { p: "Phase 1", t: "分析需求定義", d: "業務輸入目標客戶、產業、期間與分析重點" },
    { p: "Phase 2", t: "資料盤點與缺口確認", d: "盤點知識庫已有資料、列出缺口；未經業務確認，不進入後續分析", gate: true },
    { p: "Phase 3", t: "訊號結構化", d: "外部訊號轉為標準欄位（事件類型、時程、規模線索、可信度）" },
    { p: "Phase 4", t: "商機化分析", d: "轉為「東元 GM 可切入的商機」：設備型號、配套服務、潛在競品", core: true },
    { p: "Phase 5", t: "商機金額估算", d: "規則導向，僅在有合理依據時估算，一律以區間呈現", core: true },
    { p: "Phase 6", t: "排序與行動建議", d: "近期性 × 金額區間 × 與東元能力匹配度 × 客戶歷史關係", core: true },
    { p: "Phase 7", t: "輸出成果", d: "週報「商機雷達」+ 個別商機卡，可即時推送 LINE / Email" },
  ];

  const startX = 0.5, startY = 1.6, cw = 1.74, ch = 4.0, gap = 0.06;
  phases.forEach((ph, i) => {
    const x = startX + i * (cw + gap);
    const fill = ph.gate ? "FFE9D6" : (ph.core ? VLIGHT : BG_LIGHT);
    const stroke = ph.gate ? ACCENT_GOLD : (ph.core ? PRIMARY : SECONDARY);
    const titleFill = ph.gate ? ACCENT_GOLD : (ph.core ? PRIMARY : SECONDARY);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: fill }, line: { color: stroke, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.65,
      fill: { color: titleFill }, line: { color: titleFill }
    });
    s.addText(ph.p, {
      x, y: startY + 0.05, w: cw, h: 0.3,
      fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", margin: 0
    });
    s.addText(ph.t, {
      x, y: startY + 0.32, w: cw, h: 0.32,
      fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", margin: 0
    });
    s.addText(ph.d, {
      x: x + 0.1, y: startY + 0.8, w: cw - 0.2, h: ch - 1.0,
      fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, valign: "top", margin: 0
    });

    // 標籤
    if (ph.gate) {
      s.addText("硬閘門", {
        x: x + 0.1, y: startY + ch - 0.4, w: cw - 0.2, h: 0.3,
        fontFace: FONT, fontSize: 10, bold: true, color: ACCENT_GOLD, align: "center", margin: 0
      });
    } else if (ph.core) {
      s.addText("核心戰場", {
        x: x + 0.1, y: startY + ch - 0.4, w: cw - 0.2, h: 0.3,
        fontFace: FONT, fontSize: 10, bold: true, color: PRIMARY, align: "center", margin: 0
      });
    }

    // 連接箭頭（最後一個不畫）
    if (i < phases.length - 1) {
      const ax = x + cw, ay = startY + ch / 2;
      s.addShape(pres.shapes.LINE, {
        x: ax, y: ay, w: gap, h: 0,
        line: { color: TEXT_MUTED, width: 1, endArrowType: "triangle" }
      });
    }
  });

  // 圖例 + 設計理念
  s.addText("Phase 4-6 是 EgentHub Agent 的核心戰場（Phase 1-3 由 Autonomous Agent 大幅簡化）", {
    x: 0.5, y: 5.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("Phase 2「資料閘門」是稽核 AI 是否亂推論的關鍵設計。AI 在資料未確認前，只給「資訊充分度評分」，不給結論。", {
    x: 0.5, y: 6.3, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 10 — 題目一：知識庫 + 雙 Agent 架構
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目一  商機分析師  ｜  知識庫需求 與 雙 Agent 架構", "");
  pageNumber(s, 10, TOTAL);

  // 左：知識庫表
  s.addText("知識庫需求", {
    x: 0.5, y: 1.5, w: 7.0, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const tableRows = [
    [
      { text: "知識庫類型", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "內容", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "難度", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "備註", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
    ],
    [
      { text: "向量知識庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "產業景氣指標、客戶年報摘要、過往商機案例", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "RAG 技術", options: { fontSize: 10, color: TEXT_DEFAULT } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "歷史報價成交、KA 客戶往來、產品-產業對照表", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "高", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "本案最大工程", options: { fontSize: 10, bold: true, color: PRIMARY, fill: { color: BG_LIGHT } } },
    ],
    [
      { text: "工具呼叫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "原物料行情 API、客戶新聞自動推播", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "API 串接", options: { fontSize: 10, color: TEXT_DEFAULT } },
    ],
    [
      { text: "Autonomous Agent xlsx", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "客戶研究報告灌入企業知識庫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "已有現成樣本", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
    ],
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 2.0, w: 7.0,
    colW: [1.5, 3.2, 0.8, 1.5],
    fontFace: FONT, border: { type: "solid", color: LIGHT, pt: 0.5 }
  });

  // 右：雙 Agent
  s.addText("雙 Agent 架構", {
    x: 7.85, y: 1.5, w: 5.0, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  // Agent 1
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 2.0, w: 5.0, h: 1.85,
    fill: { color: BG_LIGHT }, line: { color: SECONDARY, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 2.0, w: 5.0, h: 0.45,
    fill: { color: SECONDARY }, line: { color: SECONDARY }
  });
  s.addText("Agent 1：研究助理（輔助型）", {
    x: 8.0, y: 2.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("使用時機：補資料、整理資料時", {
    x: 8.0, y: 2.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("解析使用者補充的公告、新聞、PDF、Autonomous Agent xlsx，摘要重點並標註可支援哪些商機分析欄位", {
    x: 8.0, y: 2.95, w: 4.7, h: 0.85,
    fontFace: FONT, fontSize: 11, color: TEXT_DEFAULT, margin: 0
  });

  // Agent 2
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 4.0, w: 5.0, h: 2.85,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 4.0, w: 5.0, h: 0.45,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("Agent 2：商機分析師（核心 Agent）", {
    x: 8.0, y: 4.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("業務的主要入口", {
    x: 8.0, y: 4.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("負責完整 SOP（Phase 1 至 Phase 7）", {
    x: 8.0, y: 4.95, w: 4.7, h: 0.4,
    fontFace: FONT, fontSize: 12, bold: true, color: DARK, margin: 0
  });

  s.addText([
    { text: "比對東元能力庫", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "商機可行性評分", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "排序與行動建議", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "輸出商機雷達週報", options: { bullet: true, fontSize: 11, color: TEXT_DEFAULT } },
  ], {
    x: 8.05, y: 5.4, w: 4.65, h: 1.4,
    fontFace: FONT, valign: "top", margin: 0
  });

  // 規模判斷
  s.addText("規模判斷：大型專案。Autonomous Agent 已扛下訊號蒐集，本 Agent 聚焦於商機化、評分、行動建議三個核心戰場。", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 11 — 題目二：報價策略 場景／資料／輸出
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目二  報價策略決策 AI Agent  ｜  場景 × 資料 × 輸出", "把資深業務的報價判斷邏輯結構化、可複用、可稽核");
  pageNumber(s, 11, TOTAL);

  const cols = [
    { title: "1  應用場景（業務流程）", color: PRIMARY,
      content: "業務人員收到新詢價後，AI 在數分鐘內回吐：\n\n建議報價區間 + 建議交期 + 預估勝率 + 風險提示\n\n業務確認或調整後送出。後續成交與否回填，作為下次學習素材。\n\n資深業務的判斷邏輯被 AI 結構化、複用，新進業務也能產出水準一致的初稿。" },
    { title: "2  資料輸入與來源", color: SECONDARY,
      bullets: [
        "詢價單：規格、數量、客戶、地區、交期需求",
        "東元歷史：成交價、落標價、失單價、勝負標籤",
        "競爭情報：公開招標結果、業務人員回報",
        "成本與產能：BOM 標準成本、即時原料成本、產能排程",
        "客戶分級：KA、一般、新客戶分類"
      ]
    },
    { title: "3  預期輸出內容", color: DARK,
      content: "報價建議單（PDF / Excel），業務確認或調整後送出。",
      bullets: [
        "三檔價格：上限、最適、下限",
        "建議交期（含產能風險）",
        "預估得標率",
        "風險提示：低毛利、產能瓶頸、議價空間",
        "可援引的歷史相似案例編號"
      ]
    },
  ];

  const cw = 4.05, ch = 5.4;
  const startX = 0.5, startY = 1.55;
  cols.forEach((c, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: c.color, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.7,
      fill: { color: c.color }, line: { color: c.color }
    });
    s.addText(c.title, {
      x: x + 0.2, y: startY + 0.1, w: cw - 0.4, h: 0.5,
      fontFace: FONT, fontSize: 14, bold: true, color: WHITE, valign: "middle", margin: 0
    });

    let yCur = startY + 0.85;
    if (c.content) {
      s.addText(c.content, {
        x: x + 0.25, y: yCur, w: cw - 0.5, h: 2.2,
        fontFace: FONT, fontSize: 11.5, color: TEXT_DEFAULT, margin: 0
      });
      yCur += 2.2;
    }
    if (c.bullets) {
      const items = c.bullets.map((b, j) => ({
        text: b,
        options: { bullet: true, breakLine: j !== c.bullets.length - 1, fontSize: 11.5, color: TEXT_DEFAULT }
      }));
      s.addText(items, {
        x: x + 0.25, y: yCur, w: cw - 0.5, h: startY + ch - yCur - 0.2,
        fontFace: FONT, valign: "top", margin: 0
      });
    }
  });
}

// ============================================================
// Slide 12 — 題目二：Phase 1-7 SOP
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目二  報價策略決策  ｜  任務步驟（Phase 1 至 Phase 7）", "Phase 2 資料閘門：缺口未補齊前，AI 只給「資訊充分度評分」，不給最終價格");
  pageNumber(s, 12, TOTAL);

  const phases = [
    { p: "Phase 1", t: "詢價需求定義", d: "業務輸入詢價單" },
    { p: "Phase 2", t: "資料盤點與缺口確認", d: "缺口未補齊前，AI 只給「資訊充分度評分」，不給最終價格", gate: true },
    { p: "Phase 3", t: "歷史相似案件結構化", d: "撈出近 N 年同型號 / 同客戶 / 同地區的價差區間與情境" },
    { p: "Phase 4", t: "成本與毛利試算", d: "BOM × 即時原料 + 製造費 + 銷管攤銷 → 標準成本 + 毛利區間", core: true },
    { p: "Phase 5", t: "報價策略建議", d: "三檔報價、建議交期、預估得標率，註明假設與資料來源", core: true },
    { p: "Phase 6", t: "風險提示", d: "低毛利、產能瓶頸、議價空間、競爭對手可能行動", core: true },
    { p: "Phase 7", t: "輸出成果", d: "報價建議單 PDF/Excel，業務確認後送出，成交結果回填" },
  ];

  const startX = 0.5, startY = 1.6, cw = 1.74, ch = 4.0, gap = 0.06;
  phases.forEach((ph, i) => {
    const x = startX + i * (cw + gap);
    const fill = ph.gate ? "FFE9D6" : (ph.core ? VLIGHT : BG_LIGHT);
    const stroke = ph.gate ? ACCENT_GOLD : (ph.core ? PRIMARY : SECONDARY);
    const titleFill = ph.gate ? ACCENT_GOLD : (ph.core ? PRIMARY : SECONDARY);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: fill }, line: { color: stroke, width: 1 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.65,
      fill: { color: titleFill }, line: { color: titleFill }
    });
    s.addText(ph.p, {
      x, y: startY + 0.05, w: cw, h: 0.3,
      fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", margin: 0
    });
    s.addText(ph.t, {
      x, y: startY + 0.32, w: cw, h: 0.32,
      fontFace: FONT, fontSize: 12, bold: true, color: WHITE, align: "center", margin: 0
    });
    s.addText(ph.d, {
      x: x + 0.1, y: startY + 0.8, w: cw - 0.2, h: ch - 1.0,
      fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, valign: "top", margin: 0
    });

    if (ph.gate) {
      s.addText("硬閘門", {
        x: x + 0.1, y: startY + ch - 0.4, w: cw - 0.2, h: 0.3,
        fontFace: FONT, fontSize: 10, bold: true, color: ACCENT_GOLD, align: "center", margin: 0
      });
    } else if (ph.core) {
      s.addText("核心戰場", {
        x: x + 0.1, y: startY + ch - 0.4, w: cw - 0.2, h: 0.3,
        fontFace: FONT, fontSize: 10, bold: true, color: PRIMARY, align: "center", margin: 0
      });
    }

    if (i < phases.length - 1) {
      const ax = x + cw, ay = startY + ch / 2;
      s.addShape(pres.shapes.LINE, {
        x: ax, y: ay, w: gap, h: 0,
        line: { color: TEXT_MUTED, width: 1, endArrowType: "triangle" }
      });
    }
  });

  s.addText("Phase 4-6 是核心戰場：把 BOM、原料、產能、勝負紀錄、競價情報組合成可執行的報價策略", {
    x: 0.5, y: 5.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("資料閘門設計避免 AI 在規格不全時推估出風險很高的報價建議。", {
    x: 0.5, y: 6.3, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 13 — 題目二：知識庫 + 雙 Agent
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "題目二  報價策略決策  ｜  知識庫需求 與 雙 Agent 架構", "");
  pageNumber(s, 13, TOTAL);

  s.addText("知識庫需求", {
    x: 0.5, y: 1.5, w: 7.0, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const tableRows = [
    [
      { text: "知識庫類型", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "內容", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "難度", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "備註", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "歷史成交（含勝負標籤）、BOM 標準成本、產能排程", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "高", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "核心資料源", options: { fontSize: 10, bold: true, color: PRIMARY } },
    ],
    [
      { text: "工具呼叫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "原料即時行情 API、ERP 整合查詢工具", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "外部與內部 API", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
    ],
    [
      { text: "向量知識庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "競爭對手情報筆記、特殊客戶議價歷史", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "業務人員填寫", options: { fontSize: 10, color: TEXT_DEFAULT } },
    ],
    [
      { text: "規則檔", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "毛利底線政策、客戶分級報價策略", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "業務主管制定", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
    ],
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 2.0, w: 7.0,
    colW: [1.5, 3.2, 0.8, 1.5],
    fontFace: FONT, border: { type: "solid", color: LIGHT, pt: 0.5 }
  });

  // Agent 1
  s.addText("雙 Agent 架構", {
    x: 7.85, y: 1.5, w: 5.0, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 2.0, w: 5.0, h: 1.85,
    fill: { color: BG_LIGHT }, line: { color: SECONDARY, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 2.0, w: 5.0, h: 0.45,
    fill: { color: SECONDARY }, line: { color: SECONDARY }
  });
  s.addText("Agent 1：詢價解析助理（輔助型）", {
    x: 8.0, y: 2.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("使用時機：詢價單進來時", {
    x: 8.0, y: 2.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("解析詢價單、規格抽取、產品標準化分類、比對歷史相似案件", {
    x: 8.0, y: 2.95, w: 4.7, h: 0.85,
    fontFace: FONT, fontSize: 11, color: TEXT_DEFAULT, margin: 0
  });

  // Agent 2
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 4.0, w: 5.0, h: 2.85,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.85, y: 4.0, w: 5.0, h: 0.45,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("Agent 2：報價策略分析師（核心）", {
    x: 8.0, y: 4.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("業務的主要入口", {
    x: 8.0, y: 4.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("負責完整 SOP（Phase 1 至 Phase 7）", {
    x: 8.0, y: 4.95, w: 4.7, h: 0.4,
    fontFace: FONT, fontSize: 12, bold: true, color: DARK, margin: 0
  });
  s.addText([
    { text: "成本與毛利試算", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "三檔報價建議與勝率預估", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "風險提示與議價空間分析", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "成交結果回填學習", options: { bullet: true, fontSize: 11, color: TEXT_DEFAULT } },
  ], {
    x: 8.05, y: 5.4, w: 4.65, h: 1.4,
    fontFace: FONT, valign: "top", margin: 0
  });

  s.addText("規模判斷：大型專案，比題目一更吃 ERP 與 BOM 整合精度。建議第一階段聚焦最常詢價的前 20% 馬達品項。", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 14 — 6 個月、五階段甘特圖
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "POC 實施規劃  ｜  6 個月、五階段甘特圖", "兩案併行，分階段推進，讓東元 GM 數發處有充裕時間消化、迭代與優化");
  pageNumber(s, 14, TOTAL);

  // 甘特圖
  const ganttX = 0.5, ganttY = 1.5, ganttW = 12.3, ganttH = 4.3;
  const labelW = 2.7, weeksW = ganttW - labelW;
  const TOTAL_WEEKS = 26;
  const weekW = weeksW / TOTAL_WEEKS;

  s.addShape(pres.shapes.RECTANGLE, {
    x: ganttX, y: ganttY, w: ganttW, h: 0.5,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("階段 / 工項", {
    x: ganttX + 0.1, y: ganttY + 0.1, w: labelW - 0.2, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: WHITE, margin: 0
  });
  // 顯示主要週次（W1, W4, W8, W12, W16, W20, W26）
  const showWeeks = [1, 4, 7, 10, 13, 16, 19, 22, 26];
  for (const w of showWeeks) {
    const x = ganttX + labelW + (w - 1) * weekW;
    s.addText(`W${w}`, {
      x: x - 0.3, y: ganttY + 0.1, w: 0.6, h: 0.3,
      fontFace: FONT, fontSize: 9, color: WHITE, align: "center", margin: 0
    });
  }
  // 階段邊界提示（在週次列下方畫垂直分隔線）
  const phaseBoundaries = [4, 10, 16, 22, 26];
  for (const w of phaseBoundaries) {
    const x = ganttX + labelW + w * weekW;
    s.addShape(pres.shapes.LINE, {
      x, y: ganttY, w: 0, h: 4.3,
      line: { color: LIGHT, width: 0.75, dashType: "dash" }
    });
  }

  // 階段帶 (商機案 / 報價案 / 兩案共用) — 按 5 個 Phase 排
  const tasks = [
    // Phase 1 (W1-4)
    { label: "深度訪談 + SOP 共創", start: 1, end: 4, lane: 0, label2: "商機案" },
    { label: "深度訪談 + SOP 共創", start: 1, end: 4, lane: 1, label2: "報價案" },
    // Phase 2 (W5-10)
    { label: "高難度 Prompt v1 + 雙 Agent 雛形", start: 5, end: 8, lane: 2, label2: "商機案" },
    { label: "高難度 Prompt v1 + 雙 Agent 雛形", start: 5, end: 8, lane: 3, label2: "報價案" },
    { label: "第一輪驗測 + Code Review", start: 9, end: 10, lane: 4, label2: "兩案" },
    // Phase 3 (W11-16)
    { label: "Prompt v2 調優（Phase 4-6）", start: 11, end: 13, lane: 5, label2: "商機案" },
    { label: "Prompt v2 調優（Phase 4-6）", start: 11, end: 13, lane: 6, label2: "報價案" },
    { label: "與資深業務對齊 + 第二輪驗測", start: 14, end: 16, lane: 7, label2: "兩案" },
    // Phase 4 (W17-22)
    { label: "場景擴展（更多 KA / 客製化品項）", start: 17, end: 19, lane: 8, label2: "兩案" },
    { label: "跨 Agent 協作優化 + 第三輪驗測", start: 20, end: 22, lane: 9, label2: "兩案" },
    // Phase 5 (W23-26)
    { label: "種子團隊培訓 + 教材製作", start: 23, end: 24, lane: 10, label2: "兩案" },
    { label: "試運行 + 正式上線 + 結案", start: 25, end: 26, lane: 11, label2: "兩案" },
  ];

  const laneH = 0.31;
  // 隔線
  for (let i = 0; i <= tasks.length; i++) {
    s.addShape(pres.shapes.LINE, {
      x: ganttX, y: ganttY + 0.5 + i * laneH, w: ganttW, h: 0,
      line: { color: VLIGHT, width: 0.5 }
    });
  }
  // 任務 bar
  tasks.forEach((t, i) => {
    const y = ganttY + 0.5 + i * laneH;
    // 標籤
    s.addText(`${t.label}`, {
      x: ganttX + 0.1, y: y + 0.04, w: labelW - 0.5, h: laneH - 0.06,
      fontFace: FONT, fontSize: 9, color: TEXT_DEFAULT, valign: "middle", margin: 0
    });
    s.addText(t.label2, {
      x: ganttX + labelW - 0.55, y: y + 0.04, w: 0.5, h: laneH - 0.06,
      fontFace: FONT, fontSize: 8, color: TEXT_MUTED, italic: true, valign: "middle", align: "right", margin: 0
    });
    // 任務 bar
    const bx = ganttX + labelW + (t.start - 1) * weekW;
    const bw = (t.end - t.start + 1) * weekW;
    s.addShape(pres.shapes.RECTANGLE, {
      x: bx + 0.02, y: y + 0.05, w: bw - 0.04, h: laneH - 0.1,
      fill: { color: t.label2 === "商機案" ? PRIMARY : (t.label2 === "報價案" ? SECONDARY : DARK) },
      line: { color: WHITE, width: 0.25 }
    });
  });

  // Phase 標籤帶（在甘特圖頂部）
  const phaseLabels = [
    { name: "Phase 1 啟動", start: 1, end: 4 },
    { name: "Phase 2 基礎建置", start: 5, end: 10 },
    { name: "Phase 3 迭代調優", start: 11, end: 16 },
    { name: "Phase 4 擴展優化", start: 17, end: 22 },
    { name: "Phase 5 培訓交接", start: 23, end: 26 },
  ];
  // 圖例
  const legY = ganttY + ganttH + 0.05;
  const legX = ganttX;
  const legends = [
    { color: PRIMARY, label: "商機案" },
    { color: SECONDARY, label: "報價案" },
    { color: DARK, label: "兩案共用" },
  ];
  legends.forEach((lg, i) => {
    const x = legX + i * 2.0;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: legY, w: 0.3, h: 0.2,
      fill: { color: lg.color }, line: { color: lg.color }
    });
    s.addText(lg.label, {
      x: x + 0.4, y: legY - 0.02, w: 1.5, h: 0.3,
      fontFace: FONT, fontSize: 10, color: TEXT_DEFAULT, valign: "middle", margin: 0
    });
  });

  // 五階段時數說明
  s.addText("Phase 1 啟動 (W1-4) 30h　|　Phase 2 基礎建置 (W5-10) 36h　|　Phase 3 迭代調優 (W11-16) 30h　|　Phase 4 擴展優化 (W17-22) 24h　|　Phase 5 培訓交接 (W23-26) 30h", {
    x: ganttX, y: legY + 0.5, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("6 個月、26 週、合計約 150 小時 — 各 Phase 之間的執行緩衝期，讓 GM 數發處能充分消化每階段成果、累積實作經驗。", {
    x: ganttX, y: legY + 0.85, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 15 — 顧問時數估算（Intellicon 約 150h，6 個月）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "顧問時數估算  ｜  6 個月  約 150 小時", "Intellicon 指導 + 東元數發處執行 + GM 種子團隊共創 — 分階段交付，循序漸進");
  pageNumber(s, 15, TOTAL);

  // 左：分階段時數明細表
  s.addText("Intellicon 分階段投入明細", {
    x: 0.5, y: 1.5, w: 7.5, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const phaseRows = [
    ["Phase 1 啟動", "W1-W4", "Kickoff、業務深度訪談主持、SOP 共創、知識庫架構指導", "30"],
    ["Phase 2 基礎建置", "W5-W10", "高難度 Prompt v1、雙 Agent 協作邏輯、第一輪驗測陪審", "36", true],
    ["Phase 3 迭代調優", "W11-W16", "高難度 Prompt v2 調優、與資深業務對齊、第二輪驗測", "30", true],
    ["Phase 4 擴展優化", "W17-W22", "場景擴展指導、跨 Agent 協作優化、第三輪驗測、Final Review", "24"],
    ["Phase 5 培訓交接", "W23-W26", "種子團隊培訓主講、教材製作、試運行、結案、知識交接", "30", true],
  ];

  const tableRows = [
    [
      { text: "階段", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "週次", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11, align: "center" } },
      { text: "Intellicon 主要工項", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11 } },
      { text: "時數", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 11, align: "center" } },
    ],
    ...phaseRows.map((r, i) => {
      const fill = r[4] ? VLIGHT : (i % 2 === 1 ? BG_LIGHT : WHITE);
      const sz = 11;
      return [
        { text: r[0], options: { fontSize: sz, bold: true, color: SECONDARY, fill: { color: fill } } },
        { text: r[1], options: { fontSize: sz, color: TEXT_DEFAULT, align: "center", fill: { color: fill } } },
        { text: r[2], options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: fill } } },
        { text: r[3] + " h", options: { fontSize: sz, bold: true, color: TEXT_DEFAULT, align: "center", fill: { color: fill } } },
      ];
    }),
    [
      { text: "合計", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK } } },
      { text: "26 週", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
      { text: "兩案併行（Intellicon 顧問時數）", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK } } },
      { text: "約 150 h", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
    ]
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 2.0, w: 7.5,
    colW: [1.4, 1.0, 3.7, 1.4],
    fontFace: FONT, border: { type: "solid", color: LIGHT, pt: 0.5 }
  });

  // 右上：大數字
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.3, y: 1.5, w: 4.55, h: 2.4,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("Intellicon 顧問總時數", {
    x: 8.45, y: 1.65, w: 4.25, h: 0.35,
    fontFace: FONT, fontSize: 12, color: VLIGHT, margin: 0
  });
  s.addText("約 150 小時", {
    x: 8.45, y: 2.0, w: 4.25, h: 0.85,
    fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 8.45, y: 2.95, w: 4.25, h: 0,
    line: { color: ACCENT_GOLD, width: 1.5 }
  });
  s.addText("6 個月  ｜  26 週", {
    x: 8.45, y: 3.05, w: 4.25, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("分階段交付，循序漸進", {
    x: 8.45, y: 3.45, w: 4.25, h: 0.35,
    fontFace: FONT, fontSize: 11, color: VLIGHT, italic: true, margin: 0
  });

  // 右下：分工 + 節奏
  s.addShape(pres.shapes.RECTANGLE, {
    x: 8.3, y: 4.05, w: 4.55, h: 2.85,
    fill: { color: BG_LIGHT }, line: { color: PRIMARY, width: 1 }
  });
  s.addText("分工原則的兩個關鍵設計", {
    x: 8.45, y: 4.15, w: 4.25, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("Intellicon 聚焦四個高槓桿環節：", {
    x: 8.45, y: 4.6, w: 4.25, h: 0.35,
    fontFace: FONT, fontSize: 11, bold: true, color: SECONDARY, margin: 0
  });
  s.addText([
    { text: "高難度提示詞撰寫（Phase 2 + Phase 3）", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "Code Review 與品質把關", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "資深業務判斷邏輯對齊", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "種子團隊培訓（Phase 5）", options: { bullet: true, fontSize: 10.5, color: TEXT_DEFAULT } },
  ], {
    x: 8.5, y: 4.95, w: 4.2, h: 1.2,
    fontFace: FONT, valign: "top", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 8.45, y: 6.15, w: 4.25, h: 0,
    line: { color: LIGHT, width: 0.5 }
  });
  s.addText("6 個月節奏的關鍵價值：", {
    x: 8.45, y: 6.25, w: 4.25, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: SECONDARY, margin: 0
  });
  s.addText("各 Phase 之間的緩衝期讓 GM 數發處有充裕時間執行、迭代、累積經驗。", {
    x: 8.5, y: 6.55, w: 4.2, h: 0.45,
    fontFace: FONT, fontSize: 10, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 16 — 總管理處稽核機制（六大稽核點）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "總管理處稽核機制  ｜  六大稽核點", "讓專案進度、資源、AI 行為品質都能被定期審視");
  pageNumber(s, 16, TOTAL);

  const audits = [
    { n: "01", t: "雙週進度燈號", d: "對照甘特圖工項，紅黃綠燈呈現", who: "PM 提交、總管理處審視", freq: "雙週" },
    { n: "02", t: "階段交付物簽核", d: "SOP、知識庫、行為規範、提示詞、驗測報告", who: "GM 主管 + 總管理處共同簽核", freq: "每階段" },
    { n: "03", t: "顧問工時月結對帳", d: "逐週工時表 + 工項對應", who: "總管理處對帳", freq: "每月" },
    { n: "04", t: "Autonomous Agent 研究輸入完整度", d: "每個商機案需附 Autonomous Agent 報告或同等素材", who: "資料閘門通過硬條件", freq: "每案" },
    { n: "05", t: "資料閘門通過率", d: "Agent 啟動「資料閘門退回」次數與原因", who: "稽核 AI「不亂推論」的核心指標", freq: "每月", hilite: true },
    { n: "06", t: "上線後 KPI 追蹤", d: "新商機數、轉換率、得標率、報價週期、毛利", who: "GM 業務主管 + 總管理處", freq: "上線後每月" },
  ];

  const cw = 4.05, ch = 2.55;
  const startX = 0.5, startY = 1.55;
  audits.forEach((a, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = startX + col * (cw + 0.15);
    const y = startY + row * (ch + 0.2);

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: a.hilite ? VLIGHT : BG_LIGHT },
      line: { color: a.hilite ? ACCENT_GOLD : PRIMARY, width: a.hilite ? 2 : 1 }
    });
    // 編號圓
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55,
      fill: { color: a.hilite ? ACCENT_GOLD : PRIMARY }, line: { color: a.hilite ? ACCENT_GOLD : PRIMARY }
    });
    s.addText(a.n, {
      x: x + 0.2, y: y + 0.2, w: 0.55, h: 0.55,
      fontFace: FONT, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });

    s.addText(a.t, {
      x: x + 0.85, y: y + 0.2, w: cw - 1.0, h: 0.55,
      fontFace: FONT, fontSize: 14, bold: true, color: a.hilite ? ACCENT_GOLD : DARK, valign: "middle", margin: 0
    });

    s.addText(a.d, {
      x: x + 0.25, y: y + 0.95, w: cw - 0.5, h: 0.85,
      fontFace: FONT, fontSize: 11, color: TEXT_DEFAULT, margin: 0
    });

    s.addShape(pres.shapes.LINE, {
      x: x + 0.25, y: y + ch - 0.7, w: cw - 0.5, h: 0,
      line: { color: a.hilite ? ACCENT_GOLD : LIGHT, width: 0.5 }
    });
    s.addText(`負責：${a.who}`, {
      x: x + 0.25, y: y + ch - 0.6, w: cw - 0.5, h: 0.3,
      fontFace: FONT, fontSize: 9.5, color: TEXT_MUTED, margin: 0
    });
    s.addText(`頻率：${a.freq}`, {
      x: x + 0.25, y: y + ch - 0.3, w: cw - 0.5, h: 0.3,
      fontFace: FONT, fontSize: 9.5, color: TEXT_MUTED, margin: 0
    });
  });
}

// ============================================================
// Slide 17 — 後續擴展藍圖
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "後續擴展藍圖  ｜  三層架構 + 跨事業群", "每季新增 2-3 個 Agent，Intellicon 從主導逐步轉為教練陪跑");
  pageNumber(s, 17, TOTAL);

  const layers = [
    { num: "第一層", title: "業務前段（本案範圍）", time: "本案 6 個月", color: PRIMARY,
      items: ["商機分析師", "報價策略決策"] },
    { num: "第二層", title: "業務中後段", time: "本案結案後 3-6 個月", color: SECONDARY,
      items: ["訂單交期承諾", "客戶健診（流失預警）", "技術問答（產品規格與應用）"] },
    { num: "第三層", title: "工程與供應鏈", time: "本案結案後 12 個月", color: DARK,
      items: ["規格選型", "工程圖面查找", "供應商評估", "設備故障診斷"] },
  ];

  const cw = 4.05, ch = 4.0;
  const startX = 0.5, startY = 1.55;
  layers.forEach((l, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: BG_LIGHT }, line: { color: l.color, width: 1.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.95,
      fill: { color: l.color }, line: { color: l.color }
    });
    s.addText(l.num, {
      x: x + 0.2, y: startY + 0.1, w: cw - 0.4, h: 0.35,
      fontFace: FONT, fontSize: 13, color: LIGHT, margin: 0
    });
    s.addText(l.title, {
      x: x + 0.2, y: startY + 0.4, w: cw - 0.4, h: 0.5,
      fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
    });

    s.addText(`啟動：${l.time}`, {
      x: x + 0.25, y: startY + 1.15, w: cw - 0.5, h: 0.35,
      fontFace: FONT, fontSize: 11, italic: true, color: l.color, margin: 0
    });

    const items = l.items.map((item, j) => ({
      text: item,
      options: { bullet: true, breakLine: j !== l.items.length - 1, fontSize: 13, color: TEXT_DEFAULT }
    }));
    s.addText(items, {
      x: x + 0.3, y: startY + 1.6, w: cw - 0.55, h: ch - 1.7,
      fontFace: FONT, valign: "top", margin: 0
    });
  });

  // 底部跨事業群
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.85, w: 12.3, h: 1.3,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1 }
  });
  s.addText("跨事業群擴展可能性", {
    x: 0.7, y: 5.95, w: 12.0, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("商機分析師與報價策略 Agent 在 GM 完成驗證後，可快速複製至電力能源（PE）與空調科技（HT）事業群。", {
    x: 0.7, y: 6.4, w: 12.0, h: 0.35,
    fontFace: FONT, fontSize: 11.5, color: TEXT_DEFAULT, margin: 0
  });
  s.addText("Autonomous Agent 訊號層由數發處跨事業群共用，這是本架構長期 ROI 最高的部分。", {
    x: 0.7, y: 6.75, w: 12.0, h: 0.35,
    fontFace: FONT, fontSize: 11.5, italic: true, color: PRIMARY, bold: true, margin: 0
  });
}

// ============================================================
// Slide 18 — 下一步行動清單
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "下一步行動清單", "從立即行動到 6 個月內，明確的時程與責任");
  pageNumber(s, 18, TOTAL);

  const actions = [
    { time: "立即", body: "確認本規劃書方向；安排 GM 業務深度訪談排程", who: "GM 業務主管 + Intellicon" },
    { time: "1 週內", body: "東元數發處啟動 Autonomous Agent 技術環境規劃；確認 POC 目標客戶清單（3-5 家 KA）", who: "數發處 + GM 業務 + Intellicon" },
    { time: "2 週內（Phase 1 啟動）", body: "Kickoff Meeting；種子團隊組成（PM 加 1-2 工程師）；資料源盤點", who: "GM + Intellicon + 總管理處" },
    { time: "1 個月（Phase 1 完成）", body: "GM 業務深度訪談與 SOP 共創完成；知識庫骨架建置", who: "種子團隊 + Intellicon" },
    { time: "2.5 個月（Phase 2 完成）", body: "Agent MVP 雛形完成；第一輪驗測通過", who: "種子團隊 + Intellicon" },
    { time: "4 個月（Phase 3 完成）", body: "Agent v2 內部試用上線；KPI 量測初步結果", who: "種子團隊 + Intellicon" },
    { time: "5.5 個月（Phase 4 完成）", body: "場景擴展、跨 Agent 協作優化、Final Review", who: "種子團隊 + Intellicon" },
    { time: "6 個月（Phase 5 結案）", body: "種子團隊培訓認證、正式上線；評估跨事業群（PE / HT）複製", who: "GM + PE + HT + 總管理處" },
  ];

  const tableRows = [
    [
      { text: "時程", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 12, align: "center" } },
      { text: "行動項目", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 12 } },
      { text: "負責單位", options: { bold: true, color: WHITE, fill: { color: PRIMARY }, fontSize: 12 } },
    ],
    ...actions.map((a, i) => [
      { text: a.time, options: { fontSize: 12, bold: true, color: PRIMARY, align: "center", fill: { color: i % 2 === 1 ? BG_LIGHT : WHITE } } },
      { text: a.body, options: { fontSize: 11.5, color: TEXT_DEFAULT, fill: { color: i % 2 === 1 ? BG_LIGHT : WHITE } } },
      { text: a.who, options: { fontSize: 11, color: TEXT_MUTED, italic: true, fill: { color: i % 2 === 1 ? BG_LIGHT : WHITE } } },
    ])
  ];

  s.addTable(tableRows, {
    x: 0.5, y: 1.55, w: 12.3,
    colW: [2.5, 6.0, 3.8],
    rowH: 0.45,
    fontFace: FONT, border: { type: "solid", color: LIGHT, pt: 0.5 }
  });

  // 給總管理處的請求
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.4, w: 12.3, h: 1.5,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("給總管理處的具體請求", {
    x: 0.7, y: 5.5, w: 12.0, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: WHITE, margin: 0
  });
  s.addText([
    { text: "核准本規劃書與 150 小時顧問時數估算 ｜ 指派一位協調窗口參與雙週進度會議", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "批准 GM 種子團隊（1 PM + 1-2 工程師）6 個月投入承諾 ｜ 批准數發處建置 Autonomous Agent 技術環境資源", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "確認資料閘門通過率作為核心稽核指標", options: { fontSize: 11.5, color: ACCENT_GOLD, bold: true } },
  ], {
    x: 0.7, y: 5.95, w: 12.0, h: 0.95,
    fontFace: FONT, valign: "top", margin: 0
  });
}

// ============================================================
pres.writeFile({ fileName: "/sessions/jolly-amazing-franklin/mnt/outputs/東元GM_AI_Agent導入規劃簡報.pptx" })
  .then(fileName => { console.log(`Saved: ${fileName}`); });

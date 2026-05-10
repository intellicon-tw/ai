// ============================================================
// 東元 PE AI Agent 導入規劃簡報
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
  slide.addText(`東元 PE 事業群  AI Agent 導入規劃書`, {
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
  s.addText("東元電機 電力能源事業群（PE）", {
    x: 1.2, y: 1.6, w: 11, h: 0.5,
    fontFace: FONT, fontSize: 18, color: LIGHT, margin: 0
  });

  // 主標題
  s.addText("AI Agent 導入規劃書", {
    x: 1.2, y: 2.2, w: 11, h: 1.2,
    fontFace: FONT, fontSize: 54, bold: true, color: WHITE, margin: 0
  });

  // 副標題
  s.addText("銷售流程引導  ×  合約／文件判讀", {
    x: 1.2, y: 3.6, w: 11, h: 0.6,
    fontFace: FONT, fontSize: 28, color: WHITE, margin: 0
  });

  // 設計理念 tagline
  s.addText("單層 EgentHub × 組織級知識累積", {
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
  addSlideHeader(s, "議程  Agenda", "本案涵蓋 PE 案件全生命週期的兩個關鍵負擔，從設計理念到實施稽核共九個章節");
  pageNumber(s, 2, TOTAL);

  const items = [
    ["01", "PE 業務的兩大關鍵負擔", "銷售估算 + 合約判讀的人工負擔"],
    ["02", "本案的設計理念", "五項核心原則、單層 EgentHub 架構"],
    ["03", "題目一：銷售流程引導", "場景、資料、SOP、知識庫"],
    ["04", "題目二：合約／文件判讀", "場景、資料、SOP、知識庫"],
    ["05", "POC 實施規劃與時程", "五階段、5 個月甘特圖"],
    ["06", "顧問時數估算", "Intellicon 約 130 小時"],
    ["07", "總管理處稽核機制", "六大稽核點"],
    ["08", "組織級知識累積藍圖", "PE 三大知識庫的長期價值"],
    ["09", "下一步行動建議", "立即至 5 個月行動清單"],
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
  addSlideHeader(s, "PE 業務的兩大關鍵負擔", "案件全生命週期中，兩個讓資深專業知識難以規模化的痛點");
  pageNumber(s, 3, TOTAL);

  // 左欄：負擔一 — 銷售估算
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 6.15, h: 5.4,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.2 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 6.15, h: 0.85,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("負擔一", {
    x: 0.7, y: 1.6, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 12, color: VLIGHT, margin: 0
  });
  s.addText("銷售流程與案件估算", {
    x: 0.7, y: 1.95, w: 5.8, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
  });

  const pains1 = [
    { t: "估算資訊散落多處", d: "設備單價、人月配比、SOP、估算公式、歷史案件分散在 Excel、文件、PM 腦中" },
    { t: "新人上手週期長", d: "資深 PM 經驗難以結構化，新人往往要兩年才能獨立估完整 EPC 案" },
    { t: "跨案件經驗難複用", d: "每位 PM 各自累積經驗，組織層級的學習曲線無法被加速" },
    { t: "資深 PM 退休帶走隱性知識", d: "口述傳承不可靠，知識斷層直接影響營運" },
  ];
  pains1.forEach((p, i) => {
    const y = 2.6 + i * 0.95;
    s.addShape(pres.shapes.OVAL, {
      x: 0.75, y: y + 0.05, w: 0.3, h: 0.3,
      fill: { color: PRIMARY }, line: { color: PRIMARY }
    });
    s.addText(`${i + 1}`, {
      x: 0.75, y: y + 0.05, w: 0.3, h: 0.3,
      fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(p.t, {
      x: 1.15, y: y, w: 5.4, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
    });
    s.addText(p.d, {
      x: 1.15, y: y + 0.38, w: 5.4, h: 0.55,
      fontFace: FONT, fontSize: 10.5, color: TEXT_MUTED, margin: 0
    });
  });

  // 右欄：負擔二 — 合約判讀
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 1.5, w: 6.0, h: 5.4,
    fill: { color: VLIGHT }, line: { color: SECONDARY, width: 1.2 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 1.5, w: 6.0, h: 0.85,
    fill: { color: SECONDARY }, line: { color: SECONDARY }
  });
  s.addText("負擔二", {
    x: 7.05, y: 1.6, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 12, color: VLIGHT, margin: 0
  });
  s.addText("合約／文件判讀與義務追蹤", {
    x: 7.05, y: 1.95, w: 5.7, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
  });

  const pains2 = [
    { t: "合約頁數多、條款雜", d: "100 頁以上，混合商業、技術、法務、風險條款" },
    { t: "跨角色關注點不同", d: "業務、PM、法務、技術各看各的，紅旗條款容易漏接" },
    { t: "東元慣用版本對齊困難", d: "客戶交來的合約與內部標準有何差異？人工比對耗時" },
    { t: "歷史風險案例沒有沉澱", d: "踩過的坑沒有系統化記錄，下個案件可能踩到同一個" },
  ];
  pains2.forEach((p, i) => {
    const y = 2.6 + i * 0.95;
    s.addShape(pres.shapes.OVAL, {
      x: 7.1, y: y + 0.05, w: 0.3, h: 0.3,
      fill: { color: SECONDARY }, line: { color: SECONDARY }
    });
    s.addText(`${i + 1}`, {
      x: 7.1, y: y + 0.05, w: 0.3, h: 0.3,
      fontFace: FONT, fontSize: 11, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(p.t, {
      x: 7.5, y: y, w: 5.2, h: 0.4,
      fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
    });
    s.addText(p.d, {
      x: 7.5, y: y + 0.38, w: 5.2, h: 0.55,
      fontFace: FONT, fontSize: 10.5, color: TEXT_MUTED, margin: 0
    });
  });
}

// ============================================================
// Slide 4 — 設計哲學四原則
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "本案的五項核心設計原則", "其中原則二「文件完整性閘門」與原則四「跨角色視角」是 PE 案的特有設計");
  pageNumber(s, 4, TOTAL);

  const principles = [
    { n: "01", t: "流程優先於模型", d: "先定義「PE 業務應該如何跑估算 SOP、應該如何判讀合約風險」，AI 才介入輔助每個步驟。", pe: false },
    { n: "02", t: "文件完整性是硬閘門", d: "合約少一頁、附件不齊、估算欄位缺失時，Agent 主動退回要求補資料，不對殘缺資訊做判讀。", pe: true },
    { n: "03", t: "判斷邏輯與資料分離", d: "判斷規則內建於 Agent 行為規範；條款庫、風險案例、估算項目、設備單價則存於企業知識庫。", pe: false },
    { n: "04", t: "跨角色視角支援", d: "業務、PM、法務、技術問同一份合約，Agent 依角色提供不同視角的回應，聚焦各自關注點。", pe: true },
    { n: "05", t: "人機協作，不是全自動", d: "AI 的責任是加速、結構化、指出不確定性。最終估算數字與合約簽核仍由人決策。", pe: false },
  ];

  const cw = 4.05, ch = 2.7;
  const startX = 0.5, startY = 1.5;
  principles.forEach((p, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = startX + col * (cw + 0.15);
    const y = startY + row * (ch + 0.18);

    const fillColor = p.pe ? VLIGHT : BG_LIGHT;
    const borderColor = p.pe ? ACCENT_GOLD : PRIMARY;
    const stripColor = p.pe ? ACCENT_GOLD : PRIMARY;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: fillColor }, line: { color: borderColor, width: 1.2 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.13, h: ch,
      fill: { color: stripColor }, line: { color: stripColor }
    });
    s.addText(p.n, {
      x: x + 0.32, y: y + 0.15, w: 0.9, h: 0.5,
      fontFace: FONT, fontSize: 24, bold: true, color: stripColor, margin: 0
    });
    if (p.pe) {
      s.addText("PE 特有", {
        x: x + cw - 1.1, y: y + 0.2, w: 0.95, h: 0.3,
        fontFace: FONT, fontSize: 9, bold: true, color: WHITE,
        fill: { color: ACCENT_GOLD }, align: "center", valign: "middle", margin: 0
      });
    }
    s.addText(p.t, {
      x: x + 0.32, y: y + 0.7, w: cw - 0.45, h: 0.55,
      fontFace: FONT, fontSize: 16, bold: true, color: DARK, margin: 0
    });
    s.addText(p.d, {
      x: x + 0.32, y: y + 1.3, w: cw - 0.45, h: ch - 1.4,
      fontFace: FONT, fontSize: 11, color: TEXT_DEFAULT, margin: 0
    });
  });

  // 第 6 格放整體說明
  const x6 = startX + 2 * (cw + 0.15), y6 = startY + 1 * (ch + 0.18);
  s.addShape(pres.shapes.RECTANGLE, {
    x: x6, y: y6, w: cw, h: ch,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("為什麼這 5 項原則同時存在", {
    x: x6 + 0.3, y: y6 + 0.2, w: cw - 0.5, h: 0.45,
    fontFace: FONT, fontSize: 14, bold: true, color: WHITE, margin: 0
  });
  s.addText("這 5 項原則合在一起，是 PE 案 AI Agent 的「行為憲法」 — 文件完整性閘門讓 AI 不亂判讀殘缺合約；跨角色視角讓 AI 能服務 PE 全部 5 個角色；其他三項是流程、資料、協作的基本盤。", {
    x: x6 + 0.3, y: y6 + 0.75, w: cw - 0.5, h: ch - 0.9,
    fontFace: FONT, fontSize: 11, color: VLIGHT, margin: 0
  });
}

// ============================================================
// Slide 5 — 整體架構（嵌入架構圖）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "整體架構：單層 EgentHub × 雙階段對應雙題目", "兩個題目對應 PE 案件全生命週期的兩個關鍵階段，所有 Agent 都運行在 EgentHub 平台上");
  pageNumber(s, 5, TOTAL);

  // 標題列
  s.addText("PE 案件全生命週期", {
    x: 0.5, y: 1.55, w: 12.3, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: SECONDARY, align: "center", margin: 0
  });

  // 階段一：事前 — 報價估算
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.05, w: 6.15, h: 4.5,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.05, w: 6.15, h: 0.7,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("事前：報價估算階段", {
    x: 0.7, y: 2.18, w: 5.8, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
  });
  s.addText("題目 9", {
    x: 0.7, y: 2.85, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 11, color: SECONDARY, italic: true, margin: 0
  });
  s.addText("銷售流程引導 + 估算作業", {
    x: 0.7, y: 3.15, w: 5.8, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  // 階段一：兩個 Agent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.75, w: 2.8, h: 1.5,
    fill: { color: WHITE }, line: { color: SECONDARY, width: 0.8 }
  });
  s.addText("Agent 1.1", {
    x: 0.85, y: 3.85, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 11, color: SECONDARY, bold: true, margin: 0
  });
  s.addText("估算作業查詢助手", {
    x: 0.85, y: 4.15, w: 2.5, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
  });
  s.addText("輔助型", {
    x: 0.85, y: 4.5, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 10, italic: true, color: TEXT_MUTED, margin: 0
  });
  s.addText("即時查設備單價、人月、歷史案件", {
    x: 0.85, y: 4.78, w: 2.5, h: 0.45,
    fontFace: FONT, fontSize: 10, color: TEXT_DEFAULT, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.7, y: 3.75, w: 2.8, h: 1.5,
    fill: { color: WHITE }, line: { color: PRIMARY, width: 1.2 }
  });
  s.addText("Agent 1.2", {
    x: 3.85, y: 3.85, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 11, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("銷售流程引導助手", {
    x: 3.85, y: 4.15, w: 2.5, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
  });
  s.addText("核心 Agent", {
    x: 3.85, y: 4.5, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 10, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("跑 Phase 1-7 SOP，產出完整估算引導", {
    x: 3.85, y: 4.78, w: 2.5, h: 0.45,
    fontFace: FONT, fontSize: 10, color: TEXT_DEFAULT, margin: 0
  });

  // 階段一 KB
  s.addText("知識庫", {
    x: 0.7, y: 5.4, w: 1.5, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: SECONDARY, margin: 0
  });
  s.addText("設備單價表 ｜ 歷史案件 ｜ 人月配比 ｜ 估算項目對照 ｜ SOP 文件", {
    x: 0.7, y: 5.7, w: 5.8, h: 0.7,
    fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, margin: 0
  });

  // 階段二：事中事後 — 合約管理
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 2.05, w: 6.0, h: 4.5,
    fill: { color: VLIGHT }, line: { color: SECONDARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 2.05, w: 6.0, h: 0.7,
    fill: { color: SECONDARY }, line: { color: SECONDARY }
  });
  s.addText("事中事後：合約管理階段", {
    x: 7.05, y: 2.18, w: 5.7, h: 0.45,
    fontFace: FONT, fontSize: 18, bold: true, color: WHITE, margin: 0
  });
  s.addText("題目 8", {
    x: 7.05, y: 2.85, w: 1.5, h: 0.35,
    fontFace: FONT, fontSize: 11, color: PRIMARY, italic: true, margin: 0
  });
  s.addText("合約／文件判讀與問答", {
    x: 7.05, y: 3.15, w: 5.7, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: SECONDARY, margin: 0
  });

  // 階段二：兩個 Agent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 7.05, y: 3.75, w: 2.75, h: 1.5,
    fill: { color: WHITE }, line: { color: PRIMARY, width: 0.8 }
  });
  s.addText("Agent 1.3", {
    x: 7.2, y: 3.85, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 11, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("合約解析助手", {
    x: 7.2, y: 4.15, w: 2.5, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
  });
  s.addText("輔助型 ｜ 條件式兩階段", {
    x: 7.2, y: 4.5, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 10, italic: true, color: TEXT_MUTED, margin: 0
  });
  s.addText("解析合約 PDF 結構、條款分類", {
    x: 7.2, y: 4.78, w: 2.5, h: 0.45,
    fontFace: FONT, fontSize: 10, color: TEXT_DEFAULT, margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 10.0, y: 3.75, w: 2.75, h: 1.5,
    fill: { color: WHITE }, line: { color: SECONDARY, width: 1.2 }
  });
  s.addText("Agent 1.4", {
    x: 10.15, y: 3.85, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 11, color: SECONDARY, bold: true, margin: 0
  });
  s.addText("合約問答助手", {
    x: 10.15, y: 4.15, w: 2.5, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: DARK, margin: 0
  });
  s.addText("核心 Agent ｜ 條件式兩階段", {
    x: 10.15, y: 4.5, w: 2.5, h: 0.3,
    fontFace: FONT, fontSize: 10, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("Phase 1-7 SOP，跨角色視角問答", {
    x: 10.15, y: 4.78, w: 2.5, h: 0.45,
    fontFace: FONT, fontSize: 10, color: TEXT_DEFAULT, margin: 0
  });

  // 階段二 KB
  s.addText("知識庫", {
    x: 7.05, y: 5.4, w: 1.5, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: SECONDARY, margin: 0
  });
  s.addText("上傳合約 PDF ｜ PE 標準合約條款庫 ｜ 過往合約風險案例庫", {
    x: 7.05, y: 5.7, w: 5.7, h: 0.7,
    fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, margin: 0
  });

  // 底部結語
  s.addText("4 個 Agent 都運行在同一個 EgentHub 工作室中；資源集中投入「組織級知識累積」這個 PE 真正的核心戰場。", {
    x: 0.5, y: 6.7, w: 12.3, h: 0.35,
    fontFace: FONT, fontSize: 11.5, italic: true, bold: true, color: PRIMARY, align: "center", margin: 0
  });
}

// ============================================================
// Slide 6 — 重要附註：Autonomous Agent 技術環境
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "PE 三大組織級知識庫", "本案最有長期價值的資產 — 持續累積與更新，最終成為 PE 真正的「決策大腦」");
  pageNumber(s, 6, TOTAL);

  // 引言
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 12.3, h: 1.0,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.55, w: 0.18, h: 1.0,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("AI Agent 是工具，組織級知識庫才是長期資產", {
    x: 0.85, y: 1.65, w: 11.8, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("本案會把 PE 內部分散的 SOP、設備單價、合約條款、風險案例整理成 3 個結構化知識庫。這些知識庫會隨著每次案件結案、每份合約簽訂、每次風險處理持續更新，是本案最有長期價值的產出。", {
    x: 0.85, y: 2.05, w: 11.8, h: 0.45,
    fontFace: FONT, fontSize: 11.5, color: TEXT_DEFAULT, margin: 0
  });

  // 三大知識庫卡片
  const kbs = [
    {
      title: "估算項目與歷史案件庫",
      color: PRIMARY,
      use: "服務銷售流程引導 Agent",
      pts: ["設備標準單價、人月配比、估算公式", "歷史案件實際成本、毛利、工期紀錄", "新人快速上手的學習教材"],
      update: "每個案件結案後，由 PM 回填實際成本與毛利"
    },
    {
      title: "標準合約條款庫",
      color: SECONDARY,
      use: "服務合約問答 Agent",
      pts: ["東元慣用合約版本（商業 / 技術 / 法務 / 風險）", "紅旗條款警示與修訂建議", "新合約 review 的快速比對基準"],
      update: "法務每季 review 並更新；遇到客戶提出新條款時補入"
    },
    {
      title: "過往合約風險案例庫",
      color: DARK,
      use: "服務合約問答 Agent",
      pts: ["發生過的合約糾紛與處理方式", "風險類型分類與損失區間", "新人法務的訓練素材"],
      update: "每次合約糾紛或近似案例發生時，由法務 + PM 回填"
    }
  ];

  const cw = 4.05, ch = 4.0;
  const startX = 0.5, startY = 2.75;
  kbs.forEach((kb, i) => {
    const x = startX + i * (cw + 0.15);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: ch,
      fill: { color: WHITE }, line: { color: kb.color, width: 1.5 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: startY, w: cw, h: 0.85,
      fill: { color: kb.color }, line: { color: kb.color }
    });
    s.addText(`KB ${i + 1}`, {
      x: x + 0.2, y: startY + 0.08, w: cw - 0.4, h: 0.3,
      fontFace: FONT, fontSize: 11, color: VLIGHT, margin: 0
    });
    s.addText(kb.title, {
      x: x + 0.2, y: startY + 0.4, w: cw - 0.4, h: 0.4,
      fontFace: FONT, fontSize: 14, bold: true, color: WHITE, margin: 0
    });

    s.addText(kb.use, {
      x: x + 0.25, y: startY + 1.0, w: cw - 0.5, h: 0.3,
      fontFace: FONT, fontSize: 10, italic: true, color: kb.color, margin: 0
    });

    const items = kb.pts.map((p, j) => ({
      text: p,
      options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT }
    }));
    s.addText(items, {
      x: x + 0.3, y: startY + 1.4, w: cw - 0.55, h: 1.6,
      fontFace: FONT, valign: "top", margin: 0
    });

    s.addShape(pres.shapes.LINE, {
      x: x + 0.3, y: startY + ch - 0.7, w: cw - 0.55, h: 0,
      line: { color: kb.color, width: 0.5 }
    });
    s.addText("回饋更新機制：", {
      x: x + 0.3, y: startY + ch - 0.6, w: cw - 0.55, h: 0.3,
      fontFace: FONT, fontSize: 9.5, bold: true, color: kb.color, margin: 0
    });
    s.addText(kb.update, {
      x: x + 0.3, y: startY + ch - 0.32, w: cw - 0.55, h: 0.3,
      fontFace: FONT, fontSize: 9.5, italic: true, color: TEXT_MUTED, margin: 0
    });
  });

  // 底部
  s.addText("三庫合一 = PE 決策大腦：估算階段同時引用「估算項目庫 + 歷史案件 + 風險提示」；合約階段同時引用「標準條款 + 過往風險」", {
    x: 0.5, y: SLIDE_H - 0.6, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, bold: true, color: PRIMARY, align: "center", margin: 0
  });
}

// ============================================================
// Slide 7 — 三方協作分工
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "三方協作分工", "本案涉及三個關鍵單位的協作，讓每個單位都能在熟悉的領域發揮");
  pageNumber(s, 7, TOTAL);

  const roles = [
    {
      name: "東元數發處",
      role: "主執行（Execution）",
      duties: ["EgentHub 知識庫資料準備（SOP 文件、CSV、PM 系統拋接）", "簡單提示詞撰寫與迭代測試", "Code Review 後修正", "上線部署與後續維運"],
      cycle: "1-2 位專責人員，全程",
      color: PRIMARY
    },
    {
      name: "Intellicon 顧問團隊",
      role: "主指導（Coaching）",
      duties: ["策略指導、SOP 與條款庫骨架共創主持", "高難度提示詞撰寫（資料閘門、文件完整性閘門、跨角色視角）", "Code Review 與品質把關", "種子團隊培訓與陪跑"],
      cycle: "約 130 小時，5 個月",
      color: SECONDARY
    },
    {
      name: "PE 業務團隊（種子）",
      role: "主共創（Co-creation）",
      duties: ["提供銷售估算 SOP、合約判讀方法論、條款庫初版", "組成種子團隊（PM 加 1-2 工程師）", "使用 Agent 並回饋迭代", "資深 PM 與法務深度訪談（前 3 週為主）"],
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
  s.addText("此外：PE 與總管理處於雙週節點稽核專案進度與成果；PE 資深 PM 與法務（受訪者）於前 3 週深度訪談協助提取判斷邏輯與條款風險知識", {
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
  addSlideHeader(s, "題目一  銷售流程引導 + 估算作業 AI Agent  ｜  場景 × 資料 × 輸出", "讓資深 PM 的隱性知識變成新人即時可取用的組織資產");
  pageNumber(s, 8, TOTAL);

  // 三欄
  const cols = [
    { title: "1  應用場景（業務流程）", color: PRIMARY,
      content: "PE 業務（資深 PM、新進業務、跨部門支援人員）做專案估算與投標時，可以兩種模式使用本 Agent：\n\n即時查詢：問什麼馬上回答（例如「3MW 太陽能 EPC 設備費怎麼估？」）\n\n完整流程引導：跑 Phase 1-7，產出該案件的完整估算流程指引。" },
    { title: "2  資料輸入與來源", color: SECONDARY,
      bullets: [
        "業務查詢：以自然語言提問",
        "案件特徵：客戶、案件類型、容量規模、地區、預定工期",
        "PE 內部 SOP 文件：銷售估算 SOP、簽核流程、投標 checklist",
        "結構化資料表：設備標準單價、歷史案件、人月配比、估算項目對照",
        "規則檔：估算公式、毛利率底線、預備金比例"
      ]
    },
    { title: "3  預期輸出內容", color: DARK,
      content: "依問題類型給不同輸出。",
      bullets: [
        "簡單查詢：直接答案 + KB 引用",
        "完整引導：估算流程清單 + 公式 + 檢核點",
        "歷史案件比對與金額區間",
        "風險提示與毛利區間",
        "資料不足時明確列出補資料清單"
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
  addSlideHeader(s, "題目一  銷售流程引導  ｜  任務步驟（Phase 1 至 Phase 7）", "Phase 2「資料閘門」確保 AI 不對殘缺案件特徵做估算");
  pageNumber(s, 9, TOTAL);

  const phases = [
    { p: "Phase 1", t: "問題分類", d: "判別使用者是「即時查詢」還是「完整流程引導」需求" },
    { p: "Phase 2", t: "資料盤點與缺口確認", d: "盤點案件特徵是否齊全（類型、規模、地區）；缺口時給「資訊充分度評分」，<60 不給數字答案", gate: true },
    { p: "Phase 3", t: "SOP 流程節點對應", d: "根據案件類型，定位到對應 SOP 流程節點與估算項目" },
    { p: "Phase 4", t: "估算公式與單價查詢", d: "查設備標準單價、估算項目對照、人月配比表", core: true },
    { p: "Phase 5", t: "歷史案件比對", d: "找近 3 年同類型／規模／地區的相似案件，金額區間呈現並標可信度", core: true },
    { p: "Phase 6", t: "整合輸出建議", d: "估算建議 + 檢核點 + 援引案例 + 風險提示", core: true },
    { p: "Phase 7", t: "輸出成果", d: "依問題類型給簡單答案或完整估算流程指引" },
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
  s.addText("Phase 4-6 是 EgentHub Agent 的核心戰場（查 KB、比對歷史案件、整合建議）", {
    x: 0.5, y: 5.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("Phase 2「資料閘門」是稽核 AI 是否亂推論的關鍵設計。資料不全時 AI 只給「資訊充分度評分」，不給數字答案。", {
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
  addSlideHeader(s, "題目一  銷售流程引導  ｜  知識庫需求 與 雙 Agent 架構", "");
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
      { text: "全文查找", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "PE 銷售估算 SOP、簽核流程、投標 checklist", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "RAG 應用", options: { fontSize: 10, color: TEXT_DEFAULT } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "設備標準單價、歷史案件、人月配比、估算項目對照", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "本案核心資料源", options: { fontSize: 10, bold: true, color: PRIMARY, fill: { color: BG_LIGHT } } },
    ],
    [
      { text: "規則檔", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "估算公式、毛利率底線、預備金比例", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "業務主管制定", options: { fontSize: 10, color: TEXT_DEFAULT } },
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
  s.addText("Agent 1：估算作業查詢助手（輔助型）", {
    x: 8.0, y: 2.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("使用時機：業務即時查詢時", {
    x: 8.0, y: 2.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("接收業務的即時查詢（單價、人月、SOP 步驟），快速給單點答案 + KB 引用", {
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
  s.addText("Agent 2：銷售流程引導助手（核心 Agent）", {
    x: 8.0, y: 4.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("業務的完整流程入口", {
    x: 8.0, y: 4.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("負責完整 SOP（Phase 1 至 Phase 7）", {
    x: 8.0, y: 4.95, w: 4.7, h: 0.4,
    fontFace: FONT, fontSize: 12, bold: true, color: DARK, margin: 0
  });

  s.addText([
    { text: "SOP 流程節點對應", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "估算公式與單價查詢", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "歷史案件比對與區間估算", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "整合估算流程指引", options: { bullet: true, fontSize: 11, color: TEXT_DEFAULT } },
  ], {
    x: 8.05, y: 5.4, w: 4.65, h: 1.4,
    fontFace: FONT, valign: "top", margin: 0
  });

  // 規模判斷
  s.addText("規模判斷：中型專案。最大工程是 PE 銷售估算 SOP 整理與 PM 系統歷史案件拋接，由數發處主執行。", {
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
  addSlideHeader(s, "題目二  合約／文件判讀與問答 AI Agent  ｜  場景 × 資料 × 輸出", "支援跨角色視角 — 業務、PM、法務、技術問同一份合約，得到聚焦的答案");
  pageNumber(s, 11, TOTAL);

  const cols = [
    { title: "1  應用場景（業務流程）", color: PRIMARY,
      content: "業務、PM、法務、技術人員在合約簽訂前後，將合約 PDF（或標案文件、技術規範）上傳給 Agent。\n\nAgent 解析合約結構、萃取義務與風險條款，並支援問答式查詢。\n\n每個答覆附帶原文引用（含頁碼），方便跨部門對齊。同一份合約，依使用者角色提供不同視角的回答。" },
    { title: "2  資料輸入與來源", color: SECONDARY,
      bullets: [
        "合約 PDF / Word（業務上傳）",
        "標案文件、技術規範書",
        "業務問題：條款查詢、義務檢核、風險識別",
        "PE 標準合約條款庫：東元慣用版本、紅旗條款警示",
        "過往合約風險案例：發生過的風險、處理方式"
      ]
    },
    { title: "3  預期輸出內容", color: DARK,
      content: "依問題類型給不同輸出。",
      bullets: [
        "合約摘要 + 結構化條款清單（4 類）",
        "紅旗條款警示與東元慣用版本差異",
        "問答回應 + 原文引用（含頁碼）",
        "依使用者角色調整聚焦點與用語",
        "歷史風險案例比對提示"
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
  addSlideHeader(s, "題目二  合約／文件判讀與問答  ｜  任務步驟（Phase 1 至 Phase 7）", "Phase 1-2 文件完整性閘門：殘缺合約一律退回要求補件，不做判讀");
  pageNumber(s, 12, TOTAL);

  const phases = [
    { p: "Phase 1", t: "文件理解與完整性檢查", d: "讀合約 PDF、建立章節索引；檢查文件完整性（章節、附件、頁碼）", gate: true },
    { p: "Phase 2", t: "資料盤點與缺口確認", d: "若文件不完整或缺附件，提醒補上再分析；不允許對殘缺合約做判讀", gate: true },
    { p: "Phase 3", t: "條款結構化", d: "把條款分類為商業／技術／法務／風險四類，標頁碼與原文摘要" },
    { p: "Phase 4", t: "義務與風險萃取", d: "比對 PE 標準條款庫，標示「東元慣用版本差異」「紅旗條款警示」", core: true },
    { p: "Phase 5", t: "歷史風險案例比對", d: "對照過往風險案例，識別是否曾有類似條款引發風險", core: true },
    { p: "Phase 6", t: "問答回應（跨角色）", d: "依使用者角色調整視角；附原文引用、慣用版本對照、修訂建議", core: true },
    { p: "Phase 7", t: "輸出成果", d: "合約摘要 + 義務檢核表 + 風險條款警示 + 問答記錄" },
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

  s.addText("Phase 4-6 是核心戰場：條款庫對照、紅旗識別、跨角色視角問答", {
    x: 0.5, y: 5.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("文件完整性閘門設計避免 AI 對殘缺合約做出「沒看到紅旗條款」的錯誤結論。", {
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
  addSlideHeader(s, "題目二  合約／文件判讀  ｜  知識庫需求 與 雙 Agent 架構", "");
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
      { text: "全文查找", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "業務上傳的合約 PDF / 標案文件 / 技術規範", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "Agent 即時讀取", options: { fontSize: 10, color: TEXT_DEFAULT } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "PE 標準合約條款庫（東元慣用版本、紅旗條款）", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "本案關鍵資料", options: { fontSize: 10, bold: true, color: PRIMARY, fill: { color: BG_LIGHT } } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "過往合約風險案例庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "風險識別關鍵", options: { fontSize: 10, bold: true, color: PRIMARY } },
    ],
    [
      { text: "規則檔", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "東元法務簽核準則、跨角色視角規則", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "法務主管制定", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
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
  s.addText("Agent 1：合約解析助手（輔助型）", {
    x: 8.0, y: 2.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("使用時機：上傳合約 PDF 時", {
    x: 8.0, y: 2.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("解析合約 PDF 結構、條款分類、文件完整性檢查、產出合約摘要", {
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
  s.addText("Agent 2：合約問答助手（核心）", {
    x: 8.0, y: 4.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("業務的完整流程入口", {
    x: 8.0, y: 4.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("負責完整 SOP（Phase 1 至 Phase 7）", {
    x: 8.0, y: 4.95, w: 4.7, h: 0.4,
    fontFace: FONT, fontSize: 12, bold: true, color: DARK, margin: 0
  });
  s.addText([
    { text: "比對 PE 標準條款庫", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "義務與風險條款萃取", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "歷史風險案例比對", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "跨角色視角問答回應", options: { bullet: true, fontSize: 11, color: TEXT_DEFAULT } },
  ], {
    x: 8.05, y: 5.4, w: 4.65, h: 1.4,
    fontFace: FONT, valign: "top", margin: 0
  });

  s.addText("規模判斷：中大型專案，吃條款結構化精度與法務知識深度。最大挑戰是條款庫與風險案例庫的整理。", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 14 — 5 個月、五階段甘特圖
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "POC 實施規劃  ｜  5 個月、五階段甘特圖", "兩案併行，分階段推進，讓 PE 數發處有充裕時間消化、迭代與優化");
  pageNumber(s, 14, TOTAL);

  // 甘特圖
  const ganttX = 0.5, ganttY = 1.5, ganttW = 12.3, ganttH = 4.3;
  const labelW = 2.7, weeksW = ganttW - labelW;
  const TOTAL_WEEKS = 21;
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
  const showWeeks = [1, 3, 6, 9, 12, 15, 18, 21];
  for (const w of showWeeks) {
    const x = ganttX + labelW + (w - 1) * weekW;
    s.addText(`W${w}`, {
      x: x - 0.3, y: ganttY + 0.1, w: 0.6, h: 0.3,
      fontFace: FONT, fontSize: 9, color: WHITE, align: "center", margin: 0
    });
  }
  // 階段邊界提示（在週次列下方畫垂直分隔線）
  const phaseBoundaries = [3, 8, 14, 18, 21];
  for (const w of phaseBoundaries) {
    const x = ganttX + labelW + w * weekW;
    s.addShape(pres.shapes.LINE, {
      x, y: ganttY, w: 0, h: 4.3,
      line: { color: LIGHT, width: 0.75, dashType: "dash" }
    });
  }

  // 階段帶 (銷售案 / 合約案 / 兩案共用) — 5 個 Phase
  const tasks = [
    // Phase 1 (W1-3)
    { label: "業務訪談 + SOP / 估算項目庫共創", start: 1, end: 3, lane: 0, label2: "銷售案" },
    { label: "法務訪談 + 合約方法論 / 條款庫共創", start: 1, end: 3, lane: 1, label2: "合約案" },
    // Phase 2 (W4-8)
    { label: "高難度 Prompt v1（資料閘門、Phase 2-3）", start: 4, end: 6, lane: 2, label2: "銷售案" },
    { label: "高難度 Prompt v1（文件完整性閘門）", start: 4, end: 6, lane: 3, label2: "合約案" },
    { label: "雙 Agent 雛形 + 第一輪驗測", start: 7, end: 8, lane: 4, label2: "兩案" },
    // Phase 3 (W9-14)
    { label: "Phase 4-6 估算邏輯 v2 調優", start: 9, end: 11, lane: 5, label2: "銷售案" },
    { label: "Phase 4-6 合約問答 v2 調優", start: 9, end: 11, lane: 6, label2: "合約案" },
    { label: "資深 PM / 法務對齊 + 第二輪驗測", start: 12, end: 14, lane: 7, label2: "兩案" },
    // Phase 4 (W15-18)
    { label: "場景擴展（更多案件類型 / 複雜合約）", start: 15, end: 16, lane: 8, label2: "兩案" },
    { label: "跨 Agent 協作優化 + 第三輪驗測", start: 17, end: 18, lane: 9, label2: "兩案" },
    // Phase 5 (W19-21)
    { label: "種子團隊培訓 + 教材製作", start: 19, end: 20, lane: 10, label2: "兩案" },
    { label: "試運行 + 正式上線 + 結案", start: 21, end: 21, lane: 11, label2: "兩案" },
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
      fill: { color: t.label2 === "銷售案" ? PRIMARY : (t.label2 === "合約案" ? SECONDARY : DARK) },
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
    { color: PRIMARY, label: "銷售案" },
    { color: SECONDARY, label: "合約案" },
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
  s.addText("Phase 1 啟動 (W1-3) 24h　|　Phase 2 基礎建置 (W4-8) 32h　|　Phase 3 迭代調優 (W9-14) 28h　|　Phase 4 擴展優化 (W15-18) 20h　|　Phase 5 培訓交接 (W19-21) 26h", {
    x: ganttX, y: legY + 0.5, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("5 個月、21 週、合計約 130 小時 — 各 Phase 之間的執行緩衝期，讓 PE 數發處能充分消化每階段成果、累積實作經驗。", {
    x: ganttX, y: legY + 0.85, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 15 — 顧問時數估算（Intellicon 約 130h，5 個月）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "顧問時數估算  ｜  5 個月  約 130 小時", "Intellicon 指導 + 東元數發處執行 + PE 種子團隊共創 — 分階段交付，循序漸進");
  pageNumber(s, 15, TOTAL);

  // 左：分階段時數明細表
  s.addText("Intellicon 分階段投入明細", {
    x: 0.5, y: 1.5, w: 7.5, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const phaseRows = [
    ["Phase 1 啟動", "W1-W3", "Kickoff、業務／法務深度訪談、SOP 與條款庫骨架共創", "24"],
    ["Phase 2 基礎建置", "W4-W8", "高難度 Prompt v1（資料閘門、文件完整性閘門）、雙 Agent 雛形、第一輪驗測", "32", true],
    ["Phase 3 迭代調優", "W9-W14", "Prompt v2 調優、與資深 PM／法務對齊、第二輪驗測", "28", true],
    ["Phase 4 擴展優化", "W15-W18", "場景擴展指導、跨 Agent 協作優化、第三輪驗測、Final Review", "20"],
    ["Phase 5 培訓交接", "W19-W21", "種子團隊培訓主講、教材製作、試運行、結案、知識交接", "26", true],
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
      { text: "21 週", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
      { text: "兩案併行（Intellicon 顧問時數）", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK } } },
      { text: "約 130 h", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
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
  s.addText("約 130 小時", {
    x: 8.45, y: 2.0, w: 4.25, h: 0.85,
    fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 8.45, y: 2.95, w: 4.25, h: 0,
    line: { color: ACCENT_GOLD, width: 1.5 }
  });
  s.addText("5 個月  ｜  21 週", {
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
    { text: "高難度提示詞撰寫（資料閘門、文件完整性閘門）", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "Code Review 與品質把關", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "資深 PM 與法務判斷邏輯對齊", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
    { text: "種子團隊培訓（Phase 5）", options: { bullet: true, fontSize: 10.5, color: TEXT_DEFAULT } },
  ], {
    x: 8.5, y: 4.95, w: 4.2, h: 1.2,
    fontFace: FONT, valign: "top", margin: 0
  });

  s.addShape(pres.shapes.LINE, {
    x: 8.45, y: 6.15, w: 4.25, h: 0,
    line: { color: LIGHT, width: 0.5 }
  });
  s.addText("5 個月節奏的關鍵價值：", {
    x: 8.45, y: 6.25, w: 4.25, h: 0.3,
    fontFace: FONT, fontSize: 11, bold: true, color: SECONDARY, margin: 0
  });
  s.addText("各 Phase 之間的緩衝期讓 PE 數發處有充裕時間執行、迭代、累積經驗。", {
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
    { n: "02", t: "階段交付物簽核", d: "SOP、知識庫、行為規範、提示詞、驗測報告", who: "PE 主管 + 總管理處共同簽核", freq: "每階段" },
    { n: "03", t: "顧問工時月結對帳", d: "逐週工時表 + 工項對應", who: "總管理處對帳", freq: "每月" },
    { n: "04", t: "Autonomous Agent 研究輸入完整度", d: "每個商機案需附 Autonomous Agent 報告或同等素材", who: "資料閘門通過硬條件", freq: "每案" },
    { n: "05", t: "資料閘門通過率", d: "Agent 啟動「資料閘門退回」次數與原因", who: "稽核 AI「不亂推論」的核心指標", freq: "每月", hilite: true },
    { n: "06", t: "上線後 KPI 追蹤", d: "新商機數、轉換率、得標率、報價週期、毛利", who: "PE 業務主管 + 總管理處", freq: "上線後每月" },
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
  addSlideHeader(s, "後續擴展藍圖  ｜  PE 三大知識庫的長期擴展", "本案結案後，三大知識庫持續累積，逐步擴展案件類型與應用情境");
  pageNumber(s, 17, TOTAL);

  const layers = [
    { num: "短期", title: "本案結案後 3-6 個月", time: "PE 數發處主導", color: PRIMARY,
      items: ["擴展案件類型（離岸風電、車用動力、海外合約）", "更多歷史案件回填", "條款庫每季 review"] },
    { num: "中期", title: "本案結案後 6-12 個月", time: "PE 數發處與 IT 部門合作", color: SECONDARY,
      items: ["整合 PM 系統，案件全週期追蹤", "條款庫與 ERP 雙向同步", "知識庫管理介面建置"] },
    { num: "長期", title: "本案結案後 12 個月以上", time: "PE 業務團隊主導應用方向", color: DARK,
      items: ["PE 決策大腦對外延伸", "業務簽約前直接調用紅旗檢核", "投標前由業務調用估算試算"] },
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
  s.addText("即使資深 PM 與法務退休，這份組織級記憶仍能傳承給新人 — 這是本案最有長期價值的產出。", {
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
  addSlideHeader(s, "下一步行動清單", "從立即行動到 5 個月結案，明確的時程與責任");
  pageNumber(s, 18, TOTAL);

  const actions = [
    { time: "立即", body: "確認本規劃書方向；安排 PE 業務深度訪談排程", who: "PE 業務主管 + Intellicon" },
    { time: "1 週內", body: "東元數發處啟動 Autonomous Agent 技術環境規劃；確認 POC 目標客戶清單（3-5 家 KA）", who: "數發處 + PE 業務 + Intellicon" },
    { time: "2 週內（Phase 1 啟動）", body: "Kickoff Meeting；種子團隊組成（PM 加 1-2 工程師）；資料源盤點", who: "GM + Intellicon + 總管理處" },
    { time: "1 個月（Phase 1 完成）", body: "PE 業務深度訪談與 SOP 共創完成；知識庫骨架建置", who: "種子團隊 + Intellicon" },
    { time: "2.5 個月（Phase 2 完成）", body: "Agent MVP 雛形完成；第一輪驗測通過", who: "種子團隊 + Intellicon" },
    { time: "4 個月（Phase 3 完成）", body: "Agent v2 內部試用上線；KPI 量測初步結果", who: "種子團隊 + Intellicon" },
    { time: "5.5 個月（Phase 4 完成）", body: "場景擴展、跨 Agent 協作優化、Final Review", who: "種子團隊 + Intellicon" },
    { time: "5 個月（Phase 5 結案）", body: "種子團隊培訓認證、正式上線、結案；後續擴展規劃", who: "PE + 總管理處" },
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
    { text: "核准本規劃書與 130 小時顧問時數估算 ｜ 指派一位協調窗口參與雙週進度會議", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "批准 PE 種子團隊（1 PM + 1-2 工程師）5 個月投入承諾 ｜ 批准數發處投入 PE 知識庫整理資源（含法務支援）", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "確認文件完整性閘門通過率與資料閘門通過率作為核心稽核指標", options: { fontSize: 11.5, color: ACCENT_GOLD, bold: true } },
  ], {
    x: 0.7, y: 5.95, w: 12.0, h: 0.95,
    fontFace: FONT, valign: "top", margin: 0
  });
}

// ============================================================
pres.writeFile({ fileName: "/sessions/jolly-amazing-franklin/mnt/outputs/東元PE_AI_Agent導入規劃簡報.pptx" })
  .then(fileName => { console.log(`Saved: ${fileName}`); });

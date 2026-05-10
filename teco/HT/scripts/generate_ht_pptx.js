// ============================================================
// 東元 HT AI Agent 導入規劃簡報
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
  slide.addText(`東元 HT 事業群  AI Agent 導入規劃書`, {
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

const TOTAL = 15;

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
  s.addText("東元電機 空調科技事業群（HT）", {
    x: 1.2, y: 1.6, w: 11, h: 0.5,
    fontFace: FONT, fontSize: 18, color: LIGHT, margin: 0
  });

  // 主標題
  s.addText("AI Agent 導入規劃書", {
    x: 1.2, y: 2.2, w: 11, h: 1.2,
    fontFace: FONT, fontSize: 54, bold: true, color: WHITE, margin: 0
  });

  // 副標題
  s.addText("門市銷售預測  ×  巡店與展店行動建議", {
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
  addSlideHeader(s, "議程  Agenda", "本案涵蓋 HT 通路業務的四大關鍵負擔，從設計理念到實施稽核共九個章節");
  pageNumber(s, 2, TOTAL);

  const items = [
    ["01", "HT 通路業務的兩大關鍵負擔", "銷售估算 + 合約判讀的人工負擔"],
    ["02", "本案的設計理念", "五項核心原則、單層 EgentHub 架構"],
    ["03", "題目一：銷售流程引導", "場景、資料、SOP、知識庫"],
    ["04", "題目二：合約／文件判讀", "場景、資料、SOP、知識庫"],
    ["05", "POC 實施規劃與時程", "五階段、5 個月甘特圖"],
    ["06", "顧問時數估算", "Intellicon 約 100 小時"],
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
// Slide 3 — HT 業務的四大關鍵負擔
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "HT 業務的四大關鍵負擔", "資料量大但難以萃取行動 — 不是缺資料，而是缺結構化的解讀方法");
  pageNumber(s, 3, TOTAL);

  const burdens = [
    { num: "1", title: "銷售資料看得到、用不上",
      desc: "每天 POS 匯出大量資料，但區經理拿到後不知從何開始；人工整理一份報表往往要花掉半天" },
    { num: "2", title: "下滑主因眾多但難以歸因",
      desc: "員工流動／商圈變化／競品衝擊／促銷檔期／季節影響 — 5 種候選原因組合，人工歸因高度主觀" },
    { num: "3", title: "巡店時間有限但要去的店多",
      desc: "區經理時間有限，30 家店都該去，目前依直覺排序，缺乏資料支撐的客觀標準" },
    { num: "4", title: "展店評估缺乏結構化方法",
      desc: "每次評估靠直覺與經驗，歷史成功與失敗案例的學習點沒有系統性沉澱" },
  ];

  const cw = 6.15, ch = 2.65;
  const startX = 0.5, startY = 1.55;
  burdens.forEach((b, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = startX + col * (cw + 0.2);
    const y = startY + row * (ch + 0.2);
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cw, h: ch,
      fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.2 }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.5, h: ch,
      fill: { color: PRIMARY }, line: { color: PRIMARY }
    });
    s.addText(b.num, {
      x: x + 0.05, y: y + 0.5, w: 0.4, h: 1.0,
      fontFace: FONT, fontSize: 60, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(b.title, {
      x: x + 0.7, y: y + 0.3, w: cw - 0.85, h: 0.55,
      fontFace: FONT, fontSize: 18, bold: true, color: DARK, margin: 0
    });
    s.addText(b.desc, {
      x: x + 0.7, y: y + 0.95, w: cw - 0.85, h: ch - 1.05,
      fontFace: FONT, fontSize: 12, color: TEXT_DEFAULT, margin: 0
    });
  });

  s.addText("這四個負擔的本質都是「資料量大但難以萃取行動」 — 透過 AI Agent 結構化解讀，可一次解決。", {
    x: 0.5, y: 6.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, bold: true, color: PRIMARY, align: "center", margin: 0
  });
}

// ============================================================
// Slide 4 — 設計哲學四原則
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "本案的五項核心設計原則", "其中原則四「解釋優先於預測」是 HT 案的特有設計");
  pageNumber(s, 4, TOTAL);

  const principles = [
    { n: "01", t: "流程優先於模型", d: "先定義「HT 區經理應該如何看銷售資料、如何決定巡店優先級、如何評估展店」，AI 才介入輔助每個步驟。", pe: false },
    { n: "02", t: "資料閘門 — POS 品質是硬條件", d: "品類分類不一致、日期跳日、銷售件數異常時，Agent 主動退回要求補資料；不對殘缺資料做預測。", pe: false },
    { n: "03", t: "判斷邏輯與資料分離", d: "預測模型、異常偵測規則、巡店優先級邏輯內建於 Agent；門市、商圈、銷售、巡店、展店資料則存於知識庫。", pe: false },
    { n: "04", t: "解釋優先於預測", d: "預測數字本身不重要，重要的是「為什麼會這樣」與「該怎麼做」。沒有解釋的預測不是有用的預測。", pe: true },
    { n: "05", t: "人機協作，不是全自動", d: "AI 的責任是加速、結構化、指出不確定性。最終巡店、展店、促銷決策仍由區經理、營業部主管、決策者執行。", pe: false },
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
      s.addText("HT 特有", {
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
  s.addText("這 5 項原則合在一起，是 HT 案 AI Agent 的「行為憲法」 — 解釋優先於預測讓區經理拿到的不只是數字而是行動方向；其他四項是流程、品質、資料、協作的基本盤。", {
    x: x6 + 0.3, y: y6 + 0.75, w: cw - 0.5, h: ch - 0.9,
    fontFace: FONT, fontSize: 11, color: VLIGHT, margin: 0
  });
}

// ============================================================
// Slide 5 — 整體架構：單題目雙 Agent
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "整體架構：單題目雙 Agent  ｜  從資料到行動的完整鏈路", "兩個 Agent 各自獨立可用，加總起來就是「從看資料到做決策」的完整流程");
  pageNumber(s, 5, TOTAL);

  s.addText("題目 22：門市銷售預測與巡店建議", {
    x: 0.5, y: 1.55, w: 12.3, h: 0.4,
    fontFace: FONT, fontSize: 14, bold: true, color: SECONDARY, align: "center", margin: 0
  });

  // Agent 1.1 卡片
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.1, w: 6.15, h: 4.5,
    fill: { color: VLIGHT }, line: { color: PRIMARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 2.1, w: 6.15, h: 0.7,
    fill: { color: PRIMARY }, line: { color: PRIMARY }
  });
  s.addText("Agent 1.1", {
    x: 0.7, y: 2.2, w: 5.8, h: 0.4,
    fontFace: FONT, fontSize: 13, color: VLIGHT, italic: true, margin: 0
  });
  s.addText("銷售資料分析助手", {
    x: 0.7, y: 2.55, w: 5.8, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: WHITE, margin: 0
  });
  s.addText("看資料：每日 POS 匯入後，5 分鐘內產出儀表板", {
    x: 0.7, y: 2.95, w: 5.8, h: 0.35,
    fontFace: FONT, fontSize: 12, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("輸出內容", {
    x: 0.7, y: 3.4, w: 5.8, h: 0.3,
    fontFace: FONT, fontSize: 12, bold: true, color: SECONDARY, margin: 0
  });
  s.addText([
    { text: "各店各品類銷售排名與環比變化", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "異常店清單（環比 -15% 以上）", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "下滑主因初判（5 種候選原因組合）", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "未來 1-4 週需求預測（含解釋）", options: { bullet: true, fontSize: 11.5, color: TEXT_DEFAULT } },
  ], { x: 0.85, y: 3.7, w: 5.65, h: 1.7, fontFace: FONT, valign: "top", margin: 0 });
  s.addText("知識庫", {
    x: 0.7, y: 5.5, w: 5.8, h: 0.3,
    fontFace: FONT, fontSize: 12, bold: true, color: SECONDARY, margin: 0
  });
  s.addText("每日銷售明細 ｜ 門市基本資料 ｜ 商圈與競品 ｜ 季節與促銷 ｜ 巡店紀錄", {
    x: 0.7, y: 5.8, w: 5.8, h: 0.7,
    fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, margin: 0
  });

  // Agent 1.2 卡片
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 2.1, w: 6.0, h: 4.5,
    fill: { color: VLIGHT }, line: { color: SECONDARY, width: 1.5 }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 6.85, y: 2.1, w: 6.0, h: 0.7,
    fill: { color: SECONDARY }, line: { color: SECONDARY }
  });
  s.addText("Agent 1.2", {
    x: 7.05, y: 2.2, w: 5.7, h: 0.4,
    fontFace: FONT, fontSize: 13, color: VLIGHT, italic: true, margin: 0
  });
  s.addText("巡店與展店行動助手", {
    x: 7.05, y: 2.55, w: 5.7, h: 0.45,
    fontFace: FONT, fontSize: 16, bold: true, color: WHITE, margin: 0
  });
  s.addText("做決策：基於 1.1 儀表板，給可執行的行動建議", {
    x: 7.05, y: 2.95, w: 5.7, h: 0.35,
    fontFace: FONT, fontSize: 12, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("輸出內容", {
    x: 7.05, y: 3.4, w: 5.7, h: 0.3,
    fontFace: FONT, fontSize: 12, bold: true, color: PRIMARY, margin: 0
  });
  s.addText([
    { text: "本週巡店優先順序（含優先級分數）", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "每店重點關注事項（援引巡店紀錄）", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "需立即啟動的跨店對策", options: { bullet: true, breakLine: true, fontSize: 11.5, color: TEXT_DEFAULT } },
    { text: "展店評估報告（推薦／觀望／不推薦）", options: { bullet: true, fontSize: 11.5, color: TEXT_DEFAULT } },
  ], { x: 7.2, y: 3.7, w: 5.55, h: 1.7, fontFace: FONT, valign: "top", margin: 0 });
  s.addText("知識庫", {
    x: 7.05, y: 5.5, w: 5.7, h: 0.3,
    fontFace: FONT, fontSize: 12, bold: true, color: PRIMARY, margin: 0
  });
  s.addText("門市基本資料 ｜ 商圈與競品 ｜ 巡店紀錄 ｜ 展店評估參考案例", {
    x: 7.05, y: 5.8, w: 5.7, h: 0.7,
    fontFace: FONT, fontSize: 10.5, color: TEXT_DEFAULT, margin: 0
  });

  // 中間鏈接箭頭
  s.addShape(pres.shapes.LINE, {
    x: 6.65, y: 4.0, w: 0.2, h: 0,
    line: { color: ACCENT_GOLD, width: 3, endArrowType: "triangle" }
  });
  s.addText("儀表板報告貼入", {
    x: 6.4, y: 4.15, w: 0.7, h: 0.4,
    fontFace: FONT, fontSize: 7, color: TEXT_MUTED, align: "center", margin: 0
  });

  s.addText("早上看 1.1 的儀表板了解門市表現，下午用 1.2 規劃巡店與評估展店候選地點 — 區經理一天的完整工作流。", {
    x: 0.5, y: 6.85, w: 12.3, h: 0.35,
    fontFace: FONT, fontSize: 11.5, italic: true, bold: true, color: PRIMARY, align: "center", margin: 0
  });
}

// ============================================================
// Slide 6 — 重要附註：Autonomous Agent 技術環境
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "HT 三大組織級知識庫", "本案最有長期價值的資產 — 持續累積與更新，最終成為 HT 通路業務的「決策大腦」");
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
  s.addText("本案會把 HT 內部分散的 POS 資料、商圈資訊、巡店紀錄、展店案例整理成 3 個結構化知識庫。這些知識庫會隨著每日 POS 資料、每次巡店、每次展店評估持續更新，是本案最有長期價值的產出。", {
    x: 0.85, y: 2.05, w: 11.8, h: 0.45,
    fontFace: FONT, fontSize: 11.5, color: TEXT_DEFAULT, margin: 0
  });

  // 三大知識庫卡片
  const kbs = [
    {
      title: "銷售資料分析庫",
      color: PRIMARY,
      use: "服務 Agent 1.1 銷售資料分析",
      pts: ["每日 POS 銷售明細（店 × 品類 × 期間）", "門市基本資料、商圈與競品資訊", "季節指數、促銷檔期、巡店歷史議題"],
      update: "POS 系統每日自動拋接；商圈資訊每季更新"
    },
    {
      title: "巡店判斷邏輯庫",
      color: SECONDARY,
      use: "服務 Agent 1.2 巡店建議",
      pts: ["區經理巡店優先級評分邏輯", "歷次巡店識別的議題類別與處理方式", "跨店對策與成效紀錄"],
      update: "每次巡店後，由 PM 回填新議題類型與處理方式；後續成效追蹤"
    },
    {
      title: "展店評估案例庫",
      color: DARK,
      use: "服務 Agent 1.2 展店評估",
      pts: ["歷史展店候選地評估結果", "實際開店表現追蹤（達標率、毛利）", "成功與失敗案例的學習點"],
      update: "每次展店決策後（成功與否）回填學習點；持續累積成展店方法論"
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
  s.addText("三庫合一 = HT 通路決策大腦：分析資料時引用「銷售資料 + 商圈 + 巡店紀錄」；做行動建議時引用「巡店邏輯 + 展店案例」", {
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
      cycle: "約 100 小時，5 個月",
      color: SECONDARY
    },
    {
      name: "HT 通路業務團隊（種子）",
      role: "主共創（Co-creation）",
      duties: ["提供區經理巡店判斷邏輯、展店評估方法論、銷售分析慣例", "組成種子團隊（PM 加 1-2 位區經理）", "使用 Agent 並回饋迭代", "資深區經理深度訪談（前 3 週為主）"],
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
  s.addText("此外：PE 與總管理處於雙週節點稽核專案進度與成果；PE 資深區經理（受訪者）於前 3 週深度訪談協助提取判斷邏輯與條款風險知識", {
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
  addSlideHeader(s, "題目 22  門市銷售預測與巡店建議  ｜  場景 × 資料 × 輸出", "讓資深區經理的判斷邏輯變成可重複執行的決策大腦");
  pageNumber(s, 8, TOTAL);

  // 三欄
  const cols = [
    { title: "1  應用場景（業務流程）", color: PRIMARY,
      content: "HT 通路業務（區經理、營業部主管、營運高層）以兩種模式使用本系統：\n\n模式一 每日銷售儀表板：早上貼上前一日 POS 匯出，5 分鐘內產出儀表板\n\n模式二 巡店與展店規劃：週一早會前用 1.2 規劃本週巡店與展店候選地評估" },
    { title: "2  資料輸入與來源", color: SECONDARY,
      bullets: [
        "每日銷售明細（POS 系統匯出）",
        "門市基本資料（店型、商圈、員工、店長年資）",
        "商圈與競品資訊（密度、客流、租金、客層）",
        "季節性與促銷檔（季節指數、檔期）",
        "巡店紀錄與議題（歷次巡店識別的議題）",
        "展店評估參考案例（歷史展店成功與失敗）"
      ]
    },
    { title: "3  預期輸出內容", color: DARK,
      content: "依模式給不同輸出。",
      bullets: [
        "儀表板：各店各品類排名、異常店清單",
        "下滑主因初判（5 種候選原因組合）",
        "未來 1-4 週需求預測（含解釋）",
        "本週巡店優先順序（含分數）",
        "跨店對策建議",
        "展店評估報告（推薦／觀望／不推薦）"
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
  addSlideHeader(s, "題目 22  門市銷售預測與巡店建議  ｜  任務步驟（Phase 1 至 Phase 7）", "Phase 2「資料品質閘門」確保 AI 不對殘缺 POS 資料做預測；Phase 4-6 強調解釋優先於預測");
  pageNumber(s, 9, TOTAL);

  const phases = [
    { p: "Phase 1", t: "需求定義", d: "使用者選擇模式：每日儀表板／巡店規劃／展店評估" },
    { p: "Phase 2", t: "資料品質閘門", d: "盤點 POS 資料品質：日期完整性、品類分類一致性、件數合理性；< 60 分退回", gate: true },
    { p: "Phase 3", t: "資料結構化", d: "整理為「店 × 品類 × 期間」立方體；標準化品類名稱、補齊缺漏日期" },
    { p: "Phase 4", t: "異常偵測 + 主因歸因", d: "找出環比下滑 -15% 以上的店；從 5 種候選原因組合中比對最可能主因", core: true },
    { p: "Phase 5", t: "需求預測 + 解釋", d: "基於季節指數 × 促銷檔 × 商圈活動，預測未來 1-4 週需求；每筆預測附解釋", core: true },
    { p: "Phase 6", t: "行動優先級排序", d: "巡店：依議題嚴重度 × 時效 × 難度 × 歷史成效給優先級；展店：依歷史相似案例比對", core: true },
    { p: "Phase 7", t: "輸出成果", d: "依模式產出儀表板報告或行動建議報告" },
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
  s.addText("Phase 4-6 是核心戰場：異常偵測 + 主因解釋（不只給數字）+ 行動優先級排序", {
    x: 0.5, y: 5.95, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11.5, italic: true, color: PRIMARY, bold: true, margin: 0
  });
  s.addText("Phase 2「資料品質閘門」設計避免 AI 對殘缺 POS 資料做出誤導性預測。資料品質低於 60 時退回要求補資料。", {
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
  addSlideHeader(s, "題目 22  門市銷售預測與巡店建議  ｜  知識庫需求 與 雙 Agent 架構", "");
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
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "每日銷售明細（POS 匯出）", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "高", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "需 POS 系統定期拋接", options: { fontSize: 10, bold: true, color: PRIMARY } },
    ],
    [
      { text: "SQL 表格庫", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "門市基本資料、商圈與競品、季節與促銷、巡店紀錄、展店評估案例", options: { fontSize: 10, color: TEXT_DEFAULT, fill: { color: BG_LIGHT } } },
      { text: "中", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center", fill: { color: BG_LIGHT } } },
      { text: "本案核心資料源", options: { fontSize: 10, bold: true, color: PRIMARY, fill: { color: BG_LIGHT } } },
    ],
    [
      { text: "規則檔", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "異常偵測閾值、巡店優先級權重、展店評估評分標準", options: { fontSize: 10, color: TEXT_DEFAULT } },
      { text: "低", options: { fontSize: 10, color: TEXT_DEFAULT, align: "center" } },
      { text: "區經理共同制定", options: { fontSize: 10, color: TEXT_DEFAULT } },
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
  s.addText("Agent 1：銷售資料分析助手（核心型）", {
    x: 8.0, y: 2.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("使用時機：每日 POS 匯入後", {
    x: 8.0, y: 2.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: SECONDARY, margin: 0
  });
  s.addText("處理 POS 資料、預測、異常偵測；輸出儀表板報告，含環比、預測、下滑主因解釋", {
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
  s.addText("Agent 2：巡店與展店行動助手（核心型）", {
    x: 8.0, y: 4.05, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 13, bold: true, color: WHITE, margin: 0
  });
  s.addText("基於 1.1 儀表板，產出可執行行動", {
    x: 8.0, y: 4.55, w: 4.7, h: 0.35,
    fontFace: FONT, fontSize: 11, italic: true, color: PRIMARY, margin: 0
  });
  s.addText("產出巡店優先級、跨店對策、展店評估", {
    x: 8.0, y: 4.95, w: 4.7, h: 0.4,
    fontFace: FONT, fontSize: 12, bold: true, color: DARK, margin: 0
  });

  s.addText([
    { text: "本週巡店優先順序（含分數）", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "每店重點關注事項（援引巡店紀錄）", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "需立即啟動的跨店對策", options: { bullet: true, breakLine: true, fontSize: 11, color: TEXT_DEFAULT } },
    { text: "展店評估報告（推薦／觀望／不推薦）", options: { bullet: true, fontSize: 11, color: TEXT_DEFAULT } },
  ], {
    x: 8.05, y: 5.4, w: 4.65, h: 1.4,
    fontFace: FONT, valign: "top", margin: 0
  });

  // 規模判斷
  s.addText("規模判斷：中型專案。最大工程是 POS 系統定期拋接機制與下滑主因歸因規則庫的建立，由數發處主執行。", {
    x: 0.5, y: SLIDE_H - 0.7, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 10.5, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 11 — 4 個月、五階段甘特圖
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "POC 實施規劃  ｜  5 個月、五階段甘特圖", "兩案併行，分階段推進，讓 HT 數發處有充裕時間消化、迭代與優化");
  pageNumber(s, 11, TOTAL);

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
  s.addText("5 個月、17 週、合計約 100 小時 — 各 Phase 之間的執行緩衝期，讓 HT 數發處能充分消化每階段成果、累積實作經驗。", {
    x: ganttX, y: legY + 0.85, w: 12.3, h: 0.3,
    fontFace: FONT, fontSize: 11, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 12 — 顧問時數估算（Intellicon 約 130h，5 個月）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "顧問時數估算  ｜  5 個月  約 100 小時", "Intellicon 指導 + 東元數發處執行 + HT 種子團隊共創 — 分階段交付，循序漸進");
  pageNumber(s, 12, TOTAL);

  // 左：分階段時數明細表
  s.addText("Intellicon 分階段投入明細", {
    x: 0.5, y: 1.5, w: 7.5, h: 0.4,
    fontFace: FONT, fontSize: 16, bold: true, color: PRIMARY, margin: 0
  });

  const phaseRows = [
    ["Phase 1 啟動", "W1-W3", "Kickoff、區經理深度訪談、SOP 與條款庫骨架共創", "24"],
    ["Phase 2 基礎建置", "W4-W8", "高難度 Prompt v1（資料閘門、文件完整性閘門）、雙 Agent 雛形、第一輪驗測", "32", true],
    ["Phase 3 迭代調優", "W9-W14", "Prompt v2 調優、與資深區經理對齊、第二輪驗測", "28", true],
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
      { text: "17 週", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
      { text: "兩案併行（Intellicon 顧問時數）", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK } } },
      { text: "約 100 h", options: { fontSize: 12, bold: true, color: WHITE, fill: { color: DARK }, align: "center" } },
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
  s.addText("約 100 小時", {
    x: 8.45, y: 2.0, w: 4.25, h: 0.85,
    fontFace: FONT, fontSize: 36, bold: true, color: WHITE, margin: 0
  });
  s.addShape(pres.shapes.LINE, {
    x: 8.45, y: 2.95, w: 4.25, h: 0,
    line: { color: ACCENT_GOLD, width: 1.5 }
  });
  s.addText("4 個月  ｜  17 週", {
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
    { text: "資深區經理判斷邏輯對齊", options: { bullet: true, breakLine: true, fontSize: 10.5, color: TEXT_DEFAULT } },
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
  s.addText("各 Phase 之間的緩衝期讓 HT 數發處有充裕時間執行、迭代、累積經驗。", {
    x: 8.5, y: 6.55, w: 4.2, h: 0.45,
    fontFace: FONT, fontSize: 10, italic: true, color: TEXT_MUTED, margin: 0
  });
}

// ============================================================
// Slide 13 — 總管理處稽核機制（六大稽核點）
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "總管理處稽核機制  ｜  六大稽核點", "讓專案進度、資源、AI 行為品質都能被定期審視");
  pageNumber(s, 13, TOTAL);

  const audits = [
    { n: "01", t: "雙週進度燈號", d: "對照甘特圖工項，紅黃綠燈呈現", who: "PM 提交、總管理處審視", freq: "雙週" },
    { n: "02", t: "階段交付物簽核", d: "SOP、知識庫、行為規範、提示詞、驗測報告", who: "HT 主管 + 總管理處共同簽核", freq: "每階段" },
    { n: "03", t: "顧問工時月結對帳", d: "逐週工時表 + 工項對應", who: "總管理處對帳", freq: "每月" },
    { n: "04", t: "Autonomous Agent 研究輸入完整度", d: "每個商機案需附 Autonomous Agent 報告或同等素材", who: "資料閘門通過硬條件", freq: "每案" },
    { n: "05", t: "資料閘門通過率", d: "Agent 啟動「資料閘門退回」次數與原因", who: "稽核 AI「不亂推論」的核心指標", freq: "每月", hilite: true },
    { n: "06", t: "上線後 KPI 追蹤", d: "新商機數、轉換率、得標率、報價週期、毛利", who: "HT 通路業務主管 + 總管理處", freq: "上線後每月" },
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
// Slide 14 — 後續擴展藍圖
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "後續擴展藍圖  ｜  PE 三大知識庫的長期擴展", "本案結案後，三大知識庫持續累積，逐步擴展案件類型與應用情境");
  pageNumber(s, 14, TOTAL);

  const layers = [
    { num: "短期", title: "本案結案後 3-6 個月", time: "HT 數發處主導", color: PRIMARY,
      items: ["擴展案件類型（離岸風電、車用動力、海外合約）", "更多歷史案件回填", "條款庫每季 review"] },
    { num: "中期", title: "本案結案後 6-12 個月", time: "HT 數發處與 IT 部門合作", color: SECONDARY,
      items: ["整合 PM 系統，案件全週期追蹤", "條款庫與 ERP 雙向同步", "知識庫管理介面建置"] },
    { num: "長期", title: "本案結案後 12 個月以上", time: "HT 通路業務團隊主導應用方向", color: DARK,
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
  s.addText("即使資深區經理退休，這份組織級記憶仍能傳承給新人 — 這是本案最有長期價值的產出。", {
    x: 0.7, y: 6.75, w: 12.0, h: 0.35,
    fontFace: FONT, fontSize: 11.5, italic: true, color: PRIMARY, bold: true, margin: 0
  });
}

// ============================================================
// Slide 15 — 下一步行動清單
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: WHITE };
  addSlideHeader(s, "下一步行動清單", "從立即行動到 5 個月結案，明確的時程與責任");
  pageNumber(s, 15, TOTAL);

  const actions = [
    { time: "立即", body: "確認本規劃書方向；安排 HT 通路業務深度訪談排程", who: "HT 通路業務主管 + Intellicon" },
    { time: "1 週內", body: "東元數發處啟動 Autonomous Agent 技術環境規劃；確認 POC 目標客戶清單（3-5 家 KA）", who: "數發處 + HT 通路業務 + Intellicon" },
    { time: "2 週內（Phase 1 啟動）", body: "Kickoff Meeting；種子團隊組成（PM 加 1-2 工程師）；資料源盤點", who: "GM + Intellicon + 總管理處" },
    { time: "1 個月（Phase 1 完成）", body: "HT 通路業務深度訪談與 SOP 共創完成；知識庫骨架建置", who: "種子團隊 + Intellicon" },
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
    { text: "核准本規劃書與 100 小時顧問時數估算 ｜ 指派一位協調窗口參與雙週進度會議", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "批准 HT 種子團隊（1 PM + 1-2 工程師）5 個月投入承諾 ｜ 批准數發處投入 PE 知識庫整理資源（含法務支援）", options: { breakLine: true, fontSize: 11.5, color: WHITE } },
    { text: "確認文件完整性閘門通過率與資料閘門通過率作為核心稽核指標", options: { fontSize: 11.5, color: ACCENT_GOLD, bold: true } },
  ], {
    x: 0.7, y: 5.95, w: 12.0, h: 0.95,
    fontFace: FONT, valign: "top", margin: 0
  });
}

// ============================================================
pres.writeFile({ fileName: "/sessions/jolly-amazing-franklin/mnt/outputs/東元HT_AI_Agent導入規劃簡報.pptx" })
  .then(fileName => { console.log(`Saved: ${fileName}`); });

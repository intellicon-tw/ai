// ============================================================
// 東元電機 空調科技事業群 (HT) — AI Agent 導入規劃書
// 門市銷售預測與巡店建議（單題目雙 Agent）
// ============================================================

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, TabStopType, TabStopPosition
} = require("docx");

const CLIENT_NAME = "東元電機 空調科技事業群";
const CLIENT_SHORT = "東元 HT";
const PROPOSER = "智慧方案";
const REPORT_DATE = "2026 年 5 月";
const REPORT_TITLE = "AI Agent 導入規劃書";
const REPORT_SUBTITLE = "門市銷售預測 × 巡店與展店行動建議";

// Intellicon 紫色品牌色
const PRIMARY = "8A7AD2";
const SECONDARY = "5D4894";
const ACCENT_DARK = "3D2F66";
const ACCENT_LIGHT = "E9DEF6";
const HEADER_BG = "8A7AD2";
const HEADER_TEXT = "FFFFFF";
const ROW_ALT = "F4EFFA";
const BORDER_COLOR = "D5C8EE";
const TEXT_DEFAULT = "2A2740";
const TEXT_MUTED = "6B6580";

const PAGE_W = 11906;
const MARGIN_L = 1300;
const MARGIN_R = 1300;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
    margins: cellMargins, verticalAlign: "center",
    children: [new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, color: HEADER_TEXT, font: "Microsoft JhengHei", size: 18 })] })]
  });
}
function dataCell(text, width, opts = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins, verticalAlign: "center",
    children: [new Paragraph({ alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({ text, bold: opts.bold || false, color: opts.color || TEXT_DEFAULT,
        font: "Microsoft JhengHei", size: opts.sz || 18 })] })]
  });
}
function h1(text) { return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 },
  children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 32, color: PRIMARY })] }); }
function h2(text) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 },
  children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 26, color: SECONDARY })] }); }
function h3(text) { return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 120 },
  children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 22, color: PRIMARY })] }); }
function body(text, opts = {}) { return new Paragraph({ spacing: { after: 120, line: 360 },
  alignment: opts.align || AlignmentType.LEFT,
  children: [new TextRun({ text, font: "Microsoft JhengHei", size: 20, color: opts.color || TEXT_DEFAULT,
    bold: opts.bold || false, italics: opts.italics || false })] }); }
function bodyMulti(runs) { return new Paragraph({ spacing: { after: 120, line: 360 },
  children: runs.map(r => new TextRun({ text: r.text, font: "Microsoft JhengHei", size: 20,
    color: r.color || TEXT_DEFAULT, bold: r.bold || false, italics: r.italics || false })) }); }
function empty() { return new Paragraph({ spacing: { after: 80 }, children: [] }); }
function bullet(text, ref) { return new Paragraph({ numbering: { reference: ref, level: 0 },
  spacing: { after: 80, line: 340 },
  children: [new TextRun({ text, font: "Microsoft JhengHei", size: 20, color: TEXT_DEFAULT })] }); }
function numbered(text, ref) { return new Paragraph({ numbering: { reference: ref, level: 0 },
  spacing: { after: 80, line: 340 },
  children: [new TextRun({ text, font: "Microsoft JhengHei", size: 20, color: TEXT_DEFAULT })] }); }
function genericTable(headers, data, colWidths) {
  const hr = new TableRow({ tableHeader: true, children: headers.map((h, i) => headerCell(h, colWidths[i])) });
  const rows = data.map((a, idx) => {
    const fill = idx % 2 === 1 ? ROW_ALT : undefined;
    return new TableRow({ children: a.map((v, i) => dataCell(v, colWidths[i], { fill, sz: 16 })) });
  });
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: colWidths, rows: [hr, ...rows] });
}
const numConfig = [];
for (let i = 1; i <= 30; i++) {
  numConfig.push({ reference: `b${i}`, levels: [{ level: 0, format: LevelFormat.BULLET, text: "•",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] });
  numConfig.push({ reference: `n${i}`, levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.",
    alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] });
}

// ============================================================
// CONTENT
// ============================================================
const content = [];

// ----- 第一章 -----
content.push(h1("第一章 HT 業務的關鍵負擔"));

content.push(h2("1.1 HT 事業群業務型態"));
content.push(body(
  "東元電機空調科技事業群（以下簡稱 HT）橫跨家用空調、商用空調、冰水主機、冷凍冷藏與大型 HVAC 系統整合，是台灣最大的水冷式冷卻機與封裝型空調機供應商。在通路端，HT 透過全台直營與經銷門市網絡銷售家用空調、家用冰箱、冷凍櫃等產品，是 HT 事業群唯一直接面對終端消費者的業務體系。"
));
content.push(body(
  "與 GM、PE 兩個事業群偏向 B2B 大型工程不同，HT 通路業務的關鍵特性是：店點分布廣、每日銷售資料量大、季節性波動明顯、商圈與競品變化快、店長與店員流動率高。每天每店每品類的銷售資料動輒上千筆，但要從這海量資料中萃取出「下一步該做什麼」的行動建議，目前仍仰賴區經理的經驗與直覺。"
));

content.push(h2("1.2 HT 通路業務的四個關鍵負擔"));
content.push(body(
  "在這樣的業務型態下，HT 通路業務在日常運作中承受四個關鍵的人工負擔。這四個負擔的本質都是「資料量大但難以萃取行動」 — 不是缺資料，而是缺結構化的解讀方法："
));
content.push(h3("負擔一：銷售資料看得到、用不上"));
content.push(body(
  "每天 POS 系統匯出大量銷售資料，但區經理拿到後不知道從哪裡開始。哪些店表現好、哪些店下滑、各品類在不同商圈的表現如何、未來 1-4 週需求預測 — 這些都需要結構化分析，但人工整理一份這樣的報表往往要花掉半天。"
));
content.push(h3("負擔二：下滑主因眾多但難以歸因"));
content.push(body(
  "一家店銷售下滑，可能是 8 個原因（員工流動、商圈變化、競品開店、促銷檔期、季節影響、進貨問題、陳列調整、會員流失）。人工歸因高度主觀，常常只看到表象未看到根因。歸因錯誤會導致後續行動方向錯誤 — 例如把員工問題誤判為商圈問題，調整方向完全錯誤。"
));
content.push(h3("負擔三：巡店時間有限但要去的店多"));
content.push(body(
  "區經理時間有限，但 30 家店都該去，怎麼排序？目前多半依照「直覺感受到哪家店有問題」來決定巡店優先級，缺乏資料支撐的客觀標準。重要的店如果沒被排到優先巡視，問題會持續惡化；不需要巡的店如果排到了，就浪費寶貴的巡店時間。"
));
content.push(h3("負擔四：展店評估缺乏結構化方法"));
content.push(body(
  "高層要展店，每次評估都靠直覺與經驗，沒有可複用的方法論。歷史展店成功與失敗案例的學習點沒有系統性沉澱 — 為什麼桃園藝文成功、為什麼逢甲店開了之後逐年下滑、為什麼某些百貨商圈的店表現遠優於另一些 — 這些教訓需要被組織記憶。"
));

content.push(h2("1.3 為什麼 AI Agent 是合適的解法"));
content.push(body(
  "上述四個負擔的本質是「結構化解讀方法的缺失」。透過把資深區經理的判斷邏輯轉成可重複執行的 Agent，並建立持續累積的銷售資料知識庫、巡店紀錄庫、展店評估案例庫，HT 通路業務可以：第一，讓每位區經理都能在數分鐘內取得結構化的銷售分析與巡店建議；第二，讓下滑主因的歸因從個人主觀轉為組織級客觀方法；第三，讓展店評估從直覺判斷變成可重複的方法論。"
));

// ----- 第二章 -----
content.push(h1("第二章 本案的設計理念"));

content.push(h2("2.1 雙 Agent 對應雙工作面向"));
content.push(body(
  "本案的單一題目「門市銷售預測與巡店建議」實際上涵蓋兩個不同的工作面向 — 銷售資料分析（看得到資料）與行動建議產出（知道該做什麼）。我們把這兩個面向對應到兩個 Agent："
));
content.push(genericTable(
  ["工作面向", "對應 Agent", "服務對象"],
  [
    ["銷售資料分析（看資料）", "Agent 1.1 銷售資料分析助手", "區經理、營業部主管、總公司管理層"],
    ["行動建議產出（做決策）", "Agent 1.2 巡店與展店行動助手", "區經理、營業部主管、展店決策者"]
  ],
  [2200, 4500, 2500]
));
content.push(body(
  "兩個 Agent 各自獨立可用，但加總起來就是「從資料到行動」的完整鏈路 — 業務早上看 1.1 的儀表板了解門市表現，下午用 1.2 規劃巡店與評估展店候選地點。"
));

content.push(h2("2.2 五項核心設計原則"));
content.push(body(
  "本案的五項核心設計原則，是 HT 通路業務特性下對 AI Agent 行為的具體要求："
));

content.push(h3("原則一：流程優先於模型"));
content.push(body(
  "先定義「HT 區經理應該如何看銷售資料、應該如何決定巡店優先級、應該如何評估展店」，AI 才介入輔助每個步驟。提示詞與工具都是流程的延伸，不是流程的核心。"
));

content.push(h3("原則二：資料閘門 — POS 資料品質是硬條件"));
content.push(body(
  "通路業務最常見的資料問題是「品類分類不一致」「日期區間不完整」「促銷檔期未標記」。Agent 在執行預測或分析前，先檢查資料完整性與一致性 — 缺漏時主動退回要求補資料，不對殘缺資料做預測。預測前的「資料品質報告」是本案的硬閘門。"
));

content.push(h3("原則三：判斷邏輯與資料分離"));
content.push(body(
  "預測模型、異常偵測規則、巡店優先級判斷邏輯內建於 Agent 行為規範；門市基本資料、商圈資訊、銷售明細、巡店紀錄、展店案例則存於企業知識庫。讓邏輯與資料各自演化。"
));

content.push(h3("原則四：解釋優先於預測（HT 特有）"));
content.push(body(
  "預測數字本身不重要，重要的是「為什麼會這樣」與「該怎麼做」。Agent 在給出「下週 S007 逢甲店分離式冷氣銷售會下滑 15%」這樣的預測時，必須同時給出：(1) 這個下滑是由哪些原因造成（夜市人流下降、競品開店、季節因素中的哪一項或哪幾項組合）、(2) 應該採取什麼行動（局部促銷、人員調整、提前進貨減量）、(3) 這個建議的歷史可比案例。沒有解釋的預測不是有用的預測。"
));

content.push(h3("原則五：人機協作，不是全自動"));
content.push(body(
  "AI 的責任是加速、結構化、指出不確定性。最終的巡店決策、展店決策、促銷決策仍由區經理、營業部主管、決策者執行。AI 是夥伴，不是取代。"
));

content.push(h2("2.3 三方協作分工"));
content.push(body(
  "本案涉及三個關鍵單位的協作。透過清楚的角色分工，讓每個單位都能在熟悉的領域發揮，並讓 AI 工具成為跨單位的共同語言。"
));
content.push(genericTable(
  ["協作單位", "主要職責", "投入週期"],
  [
    ["東元數發處", "主執行：EgentHub 知識庫資料準備（POS 系統資料拋接、CSV 製作、商圈資料整理）；簡單提示詞撰寫；提示詞迭代測試；上線部署與後續維運", "全專案週期，1-2 位專責人員"],
    ["Intellicon 顧問團隊", "主指導：策略指導、高難度提示詞撰寫（資料閘門、解釋邏輯、行動建議優先級）、雙 Agent 協作邏輯設計、Code Review、種子團隊培訓", "全專案週期，約 100 小時"],
    ["HT 通路業務團隊（種子）", "主共創：提供區經理巡店判斷邏輯、展店評估方法論、銷售分析慣例；組成種子團隊（1 PM 加 1-2 位區經理）；使用 Agent 並回饋迭代", "全專案週期"],
    ["HT 資深區經理（受訪者）", "深度訪談接受者，協助提取藏於腦中的判斷邏輯與下滑主因歸因經驗", "前 3 週為主"],
    ["HT 與總管理處", "稽核專案進度與成果，確認資源配置與下一階段擴展方向", "雙週節點"]
  ],
  [2200, 5500, 1500]
));

content.push(h2("2.4 為什麼採用單層 EgentHub 架構"));
content.push(body(
  "HT 案的資料源主要是 HT 內部資料（門市資料、POS 銷售明細、商圈資訊、巡店紀錄、展店案例），不需要外部訊號蒐集。因此本案採取單層 EgentHub 架構，2 個 Agent 都運行在 EgentHub 平台上，把資源集中在「銷售資料解讀方法論」與「行動建議結構化」這兩個 HT 真正的核心戰場。"
));

// ----- 第三章 — 題目 22 詳細分析 -----
content.push(h1("第三章 題目 22：門市銷售預測與巡店建議"));

content.push(h2("3.1 應用場景"));
content.push(body(
  "HT 通路業務的區經理、營業部主管、營運高層在每日／每週工作中，會以兩種模式使用本系統："
));
content.push(body(
  "**模式一：每日銷售儀表板**。早上區經理打開 EgentHub，貼上前一日 POS 匯出的銷售資料，1.1 銷售資料分析助手 5 分鐘內產出「各店各品類銷售表現」「異常偵測（誰下滑了）」「下滑主因初判」「未來 1-4 週需求預測」儀表板。"
));
content.push(body(
  "**模式二：巡店與展店規劃**。週一早會前，區經理把 1.1 產出的儀表板交給 1.2 巡店與展店行動助手，1.2 給出「本週巡店優先順序」「每店重點關注事項」「需立即啟動的對策」與（如有展店候選地）「展店評估報告」。區經理據此規劃本週行程。"
));

content.push(h2("3.2 資料輸入與來源"));
content.push(bullet("每日銷售明細：POS 系統匯出（日期、店號、品類、件數、銷售額、毛利率）", "b1"));
content.push(bullet("門市基本資料：店號、店名、區域、店型、開店年月、商圈類型、坪數、員工數", "b1"));
content.push(bullet("商圈與競品資訊：商圈密度、競品店數、平均日客流、月租金、主要客層、商圈變化", "b1"));
content.push(bullet("季節性與促銷檔：月份、品類、季節指數、主要檔期、預期轉換率提升", "b1"));
content.push(bullet("巡店紀錄與議題：歷次巡店識別的議題類別與處理狀況", "b1"));
content.push(bullet("展店評估參考案例：歷史展店候選地評估結果與實際開店表現", "b1"));

content.push(h2("3.3 預期輸出內容"));
content.push(body(
  "依使用者問題類型給不同輸出。"
));
content.push(h3("Agent 1.1 銷售資料分析助手輸出"));
content.push(body(
  "「銷售儀表板報告」（Markdown 格式，方便複製到簡報或 Email）。內含：(1) 各店各品類銷售排名與環比變化、(2) 異常店清單（環比下滑超過 15% 或月衰退超過 20% 的店）、(3) 異常下滑主因初判（從 5 種候選原因中比對，給出最可能組合）、(4) 未來 1-4 週需求預測（按店、按品類、含可信度區間）、(5) 預測的關鍵假設與資料來源。"
));
content.push(h3("Agent 1.2 巡店與展店行動助手輸出"));
content.push(body(
  "「行動建議報告」。內含：(1) 本週巡店優先順序清單（含優先級分數、推薦巡店重點、預期時間）、(2) 每店的重點關注事項與議題類別、(3) 需立即啟動的跨店對策（例如：南區整體因節日將至需啟動聯合促銷）、(4) 若有展店候選地，產出展店評估報告（含歷史相似案例比對、推薦或不推薦、關鍵風險）。"
));

content.push(h2("3.4 任務步驟（Phase 1 至 Phase 7）"));
content.push(numbered("Phase 1 需求定義：使用者選擇模式（每日儀表板 / 巡店規劃 / 展店評估）", "n1"));
content.push(numbered("Phase 2 資料盤點與品質閘門：盤點 POS 資料完整性、品類分類一致性、日期區間齊全；缺漏或不一致時退回要求補資料，不進行後續分析", "n1"));
content.push(numbered("Phase 3 資料結構化：把 POS 資料整理成「店 × 品類 × 期間」立方體，標準化品類名稱、補齊缺漏日期", "n1"));
content.push(numbered("Phase 4 異常偵測 + 主因歸因（核心）：使用環比、同比、季節調整找出異常店；針對每個異常店，從 5 種候選原因（員工流動／商圈變化／競品衝擊／促銷檔期／季節）中找出最可能組合", "n1"));
content.push(numbered("Phase 5 需求預測 + 解釋（核心）：基於季節指數 × 促銷檔期 × 商圈活動，預測未來 1-4 週各店各品類需求；同時給出解釋（為什麼這個數字）", "n1"));
content.push(numbered("Phase 6 行動建議優先級排序（核心，由 1.2 處理）：依「議題嚴重度 × 處理時效 × 處理難度」給巡店優先級；展店候選地依歷史案例特徵比對給推薦／觀望／不推薦", "n1"));
content.push(numbered("Phase 7 輸出成果：依模式產出儀表板報告或行動建議報告", "n1"));

content.push(h2("3.5 知識庫需求"));
content.push(genericTable(
  ["知識庫類型", "內容", "建置難度", "備註"],
  [
    ["SQL 表格庫", "門市基本資料、商圈與競品、季節性與促銷檔、巡店紀錄、展店評估案例", "中（需從 HT 內部系統與檔案盤點）", "本案核心資料源"],
    ["SQL 表格庫", "每日銷售明細（POS 匯出）", "高（需 POS 系統定期拋接）", "資料量大，要設計拋接機制"],
    ["規則檔", "異常偵測閾值、巡店優先級權重、展店評估評分標準", "低", "由區經理共同制定"]
  ],
  [1800, 4200, 1600, 1600]
));

content.push(h2("3.6 雙 Agent 架構"));
content.push(body(
  "本題目規劃 2 個 Agent，皆為核心型："
));
content.push(body(
  "**Agent 1.1 銷售資料分析助手**：每日 POS 匯入後處理。任務是預測、異常偵測、下滑主因解釋。輸出儀表板報告。"
));
content.push(body(
  "**Agent 1.2 巡店與展店行動助手**：基於 1.1 的分析結果 + 巡店紀錄 + 展店候選地資訊，產出行動建議。任務是巡店優先級排序、展店評估、跨店對策建議。"
));
content.push(body(
  "兩個 Agent 採鬆耦合設計 — 1.1 的儀表板報告為 Markdown 格式，可直接貼入 1.2。也可以單獨使用 1.1 看儀表板、單獨使用 1.2 評估展店候選地，不必每次都跑完整鏈路。"
));

content.push(h2("3.7 規模判斷與專案複雜度"));
content.push(body(
  "本題目屬於中型專案範圍。最大工程是「POS 系統資料拋接」與「下滑主因歸因規則庫的建立」 — 前者由東元數發處主執行，後者需要與資深區經理深度訪談共創。POC 階段先聚焦在三類典型門市（旗艦店 / 標準店 / 社區店）作為驗證範圍，之後擴展至全部門市。"
));

// ----- 第四章 -----
content.push(h1("第四章 POC 實施規劃與時程甘特圖"));

content.push(h2("4.1 五階段實施策略（4 個月）"));
content.push(body(
  "本案採用 4 個月、五階段實施策略。每階段之間都留有充裕的執行緩衝期，讓 HT 數發處可以把上一輪 Intellicon 的指導完整消化、實際操作、反覆驗證後，再進入下一階段。這個節奏設計讓 HT 數發處在 4 個月內逐步具備自主開發 AI Agent 的能力。"
));

content.push(h3("Phase 1：啟動（W1 至 W2，2 週）"));
content.push(body(
  "Kickoff Meeting、區經理深度訪談（2-3 位資深區經理，提取下滑歸因與巡店判斷邏輯）、SOP 共創、知識庫架構指導、POS 資料拋接機制設計。階段交付物：訪談紀要、SOP 框架 v1、知識庫骨架、種子團隊組成確認。"
));
content.push(h3("Phase 2：基礎建置（W3 至 W7，5 週）"));
content.push(body(
  "高難度提示詞 v1 撰寫（資料閘門、異常偵測、下滑主因解釋邏輯）、雙 Agent 協作邏輯設計、第一輪驗測陪審。聚焦範圍：先用 3 個典型店（旗艦 S001、標準 S007、社區 S004）的歷史資料做驗證。階段交付物：Agent MVP 雛形、第一輪驗測報告。"
));
content.push(h3("Phase 3：迭代調優（W8 至 W11，4 週）"));
content.push(body(
  "高難度提示詞 v2 調優（解釋邏輯、行動建議優先級）、與資深區經理對齊判斷邏輯、第二輪驗測陪審。階段交付物：Agent v2 內部試用版上線、調優記錄、KPI 量測初步結果。"
));
content.push(h3("Phase 4：擴展優化（W12 至 W14，3 週）"));
content.push(body(
  "場景擴展指導（加入更多店、更多品類、展店評估完整流程）、跨 Agent 協作流程優化、第三輪驗測。階段交付物：擴展版 Agent v3、上線前 Review 報告。"
));
content.push(h3("Phase 5：培訓交接（W15 至 W17，3 週）"));
content.push(body(
  "種子團隊培訓主講、教材製作、試運行陪跑、結案 Review、後續諮詢機制建立。階段交付物：種子團隊獨立作戰能力認證、培訓教材、結案報告、後續支援承諾書。"
));

content.push(h2("4.2 兩 Agent 併行甘特圖（17 週版本）"));
content.push(genericTable(
  ["階段 / 週次", "Agent 1.1 銷售分析", "Agent 1.2 行動建議", "里程碑"],
  [
    ["Phase 1 / W1-W2", "區經理訪談、SOP 共創、KB 骨架", "巡店與展店方法論共創", "SOP v1 + KB 骨架"],
    ["Phase 2 / W3-W4", "高難度 Prompt v1（資料閘門、異常偵測）", "高難度 Prompt v1（行動優先級邏輯）", "Prompt v1 完成"],
    ["Phase 2 / W5-W7", "MVP 雛形、3 個典型店驗測", "MVP 雛形、整合 1.1 輸出驗測", "Agent MVP 雛形"],
    ["Phase 3 / W8-W9", "Phase 4-5 異常解釋邏輯 v2 調優", "Phase 6 行動優先級 v2 調優", "Prompt v2 完成"],
    ["Phase 3 / W10-W11", "與資深區經理對齊歸因邏輯、第二輪驗測", "與資深區經理對齊巡店邏輯、第二輪驗測", "Agent v2 內部試用上線"],
    ["Phase 4 / W12-W13", "擴展至全部門市", "展店評估完整流程", "擴展知識庫"],
    ["Phase 4 / W14", "跨 Agent 協作優化、第三輪驗測", "跨 Agent 協作優化、第三輪驗測", "Agent v3 + Final Review"],
    ["Phase 5 / W15-W16", "種子團隊培訓主講", "種子團隊培訓主講", "培訓完成"],
    ["Phase 5 / W17", "試運行、正式上線、結案", "試運行、正式上線、結案", "正式上線 + 知識交接"]
  ],
  [1700, 3000, 3000, 1606]
));

content.push(h2("4.3 三方資源配置"));
content.push(body(
  "本案採「Intellicon 指導 + 東元數發處執行 + HT 業務種子團隊共創」的三方分工。Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於兩個關鍵階段（Phase 2 與 Phase 3）支援，總投入約 100 小時，扮演策略指導、高難度提示詞撰寫、品質把關、種子團隊培訓的角色。"
));
content.push(body(
  "東元數發處則指派 1 至 2 位專責人員，負責 EgentHub 知識庫資料準備（最大工程是 POS 系統定期拋接機制）、簡單提示詞撰寫、提示詞迭代測試、上線部署等執行端工作。HT 業務種子團隊（1 PM 加 1-2 位區經理）負責業務邏輯共創、提供判斷規則、最終驗收。詳細分工見第五章。"
));

content.push(h2("4.4 規模彈性說明"));
content.push(body(
  "本規劃以 4 個月、約 100 小時為標準建議，但可依 HT 內部準備度彈性調整："
));
content.push(genericTable(
  ["規模選項", "適用情境", "時程", "Intellicon 顧問時數"],
  [
    ["精簡型", "POS 拋接已建好、區經理判斷邏輯成熟；先做 1.1 銷售分析", "3 個月", "約 70 小時"],
    ["標準型（建議）", "POS 拋接需從頭建立；兩 Agent 併行", "4 個月", "約 100 小時"],
    ["完整型", "含展店評估完整流程、跨區資料整合", "5 個月", "約 130 小時"]
  ],
  [1500, 4500, 1300, 1700]
));

// ----- 第五章 顧問時數 -----
content.push(h1("第五章 顧問時數估算與分工原則"));

content.push(h2("5.1 角色分工原則"));
content.push(body(
  "本案採取「Intellicon 指導 + 東元數發處執行」的分工模式，目的是讓 HT 在 4 個月內建立內部 AI Agent 開發能力，Intellicon 在過程中扮演教練與品質把關者，而非執行端的人力外包。Intellicon 投入規模約 100 小時。"
));
content.push(genericTable(
  ["工項類別", "Intellicon 顧問", "東元數發處", "HT 業務種子團隊"],
  [
    ["專案策略指導", "主導", "—", "—"],
    ["區經理深度訪談主持", "主導", "旁聽記錄", "受訪／陪同"],
    ["SOP 與下滑歸因方法論共創", "主導", "整理 SOP 文件", "提供業務邏輯"],
    ["POS 資料拋接機制設計", "提供結構建議", "主執行", "確認資料欄位"],
    ["知識庫架構設計", "提供結構建議", "主執行（CSV 製作）", "確認欄位"],
    ["高難度提示詞（資料閘門、異常解釋、行動優先級）", "親自撰寫", "Code Review", "—"],
    ["一般提示詞（Phase 1、3、7）", "Review", "主執行撰寫", "—"],
    ["雙 Agent 協作邏輯設計", "主導", "實作", "—"],
    ["驗測規劃", "主導設計", "主執行測試", "驗收"],
    ["提示詞迭代調優", "指導與抽查", "主執行", "—"],
    ["Code Review 與品質把關", "主導", "修正", "—"],
    ["種子團隊培訓", "主講", "受訓", "受訓"],
    ["雙週進度檢視會議", "主持", "報告", "報告"],
    ["上線陪跑與結案", "陪跑", "主執行", "驗收"]
  ],
  [3000, 2400, 2200, 1426]
));

content.push(h2("5.2 顧問時數明細（4 個月、五階段）"));
content.push(genericTable(
  ["階段", "週次", "Intellicon 主要工項", "Intellicon 時數"],
  [
    ["Phase 1 啟動", "W1-W2", "Kickoff、區經理深度訪談、SOP 與 KB 骨架共創", "16 小時"],
    ["Phase 2 基礎建置", "W3-W7", "高難度 Prompt v1（資料閘門、異常解釋）、雙 Agent 協作、第一輪驗測", "28 小時"],
    ["Phase 3 迭代調優", "W8-W11", "Prompt v2 調優、與資深區經理對齊、第二輪驗測", "22 小時"],
    ["Phase 4 擴展優化", "W12-W14", "場景擴展指導、跨 Agent 協作優化、第三輪驗測、Final Review", "14 小時"],
    ["Phase 5 培訓交接", "W15-W17", "種子團隊培訓主講、教材製作、試運行、結案、知識交接", "20 小時"],
    ["合計", "17 週", "兩 Agent 併行（Intellicon 顧問時數）", "約 100 小時"]
  ],
  [1300, 1100, 4400, 1300]
));
content.push(body(
  "各階段之間的「節奏緩衝」是本案的關鍵設計 — HT 數發處在每階段之間有 1 至 3 週的執行時間，可以把 Intellicon 的指導實際操作、反覆驗證後再進入下一階段。"
));

content.push(h2("5.3 顧問配置與工作模式"));
content.push(body(
  "Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於高難度提示詞撰寫的兩個關鍵階段（Phase 2、Phase 3）支援。雙方採取雙週同步會議制，每兩週一次 1.5 小時的進度檢視會議（已含於上述時數明細）。"
));
content.push(body(
  "東元數發處需指派專責人員至少 1 位（建議 2 位）負責兩個 EgentHub Agent 的執行端工作，其中至少 1 位需熟悉 POS 系統資料結構。HT 業務種子團隊（1 PM 加 1-2 位區經理）則負責業務邏輯共創、判斷規則提供、與最終驗收。"
));

content.push(h2("5.4 顧問時數登記與對帳"));
content.push(body(
  "Intellicon 提供逐週工時表加工項對應，可月結對帳。每筆工時須對應到甘特圖中的具體工項，並附上交付物（提示詞版本、Code Review 紀錄、會議紀要、培訓教材等）。總管理處可定期抽查工時與交付物對應情況。"
));

content.push(h2("5.5 為何本案能以 100 小時完成"));
content.push(body(
  "本案規模較 GM、PE 案精簡的原因有三：第一，HT 案是單一題目（門市銷售預測與巡店建議），相較於 GM、PE 兩個獨立題目並行的工作量天然較少；第二，HT 的資料源以結構化 POS 資料為主，相較於 PE 案的合約 PDF 解析或 GM 案的多源外部訊號蒐集，提示詞複雜度較低；第三，本案聚焦在「結構化銷售解讀方法」與「行動建議優先級」這兩個核心戰場，知識庫雖多但每個欄位明確，建置難度可控。"
));

// ----- 第六章 稽核機制 -----
content.push(h1("第六章 總管理處稽核機制"));

content.push(h2("6.1 六大稽核點"));
content.push(genericTable(
  ["稽核點", "稽核方式", "頻率", "稽核責任"],
  [
    ["雙週進度燈號", "對照甘特圖工項，紅黃綠燈呈現", "雙週", "PM 提交，總管理處審視"],
    ["階段交付物簽核", "SOP、KB 清單、Agent 行為規範、提示詞版本、驗測報告", "每階段", "HT 主管 + 總管理處共同簽核"],
    ["顧問工時月結對帳", "Intellicon 提供逐週工時表加工項對應", "每月", "總管理處對帳"],
    ["資料品質閘門通過率", "Agent 啟動「資料品質退回」次數與原因", "每月", "稽核 AI 是否「不對殘缺資料亂預測」"],
    ["解釋品質抽查", "抽樣 Agent 的下滑主因解釋，由資深區經理判斷合理性", "每月", "稽核 AI 解釋是否真的反映業務 reality"],
    ["上線後 KPI 追蹤", "預測準確率（與實際銷售比對）、巡店建議採用率、區經理使用滿意度", "上線後每月", "HT 業務主管 + 總管理處"]
  ],
  [2200, 4500, 1100, 1300]
));

content.push(h2("6.2 為何「解釋品質抽查」是 HT 案的核心稽核點"));
content.push(body(
  "本案原則四「解釋優先於預測」是 HT 案的特有設計。一個沒有解釋的預測（「下週 S007 會下滑 15%」）對區經理沒有用 — 他不知道該怎麼處理。一個有解釋但解釋錯誤的預測（「下滑是因為員工流動」但其實是商圈問題）甚至比沒有預測更危險 — 它會誘導區經理採取錯誤的對策。所以「解釋品質抽查」是稽核 Agent 是否真正幫到業務的關鍵指標。"
));

content.push(h2("6.3 進度燈號定義"));
content.push(body(
  "綠燈：工項按時完成，且交付物通過簽核；黃燈：工項延遲不超過 1 週，或有 1 個交付物需補件；紅燈：工項延遲超過 2 週，或有關鍵交付物缺失。任一燈號為紅燈時，PM 須提出補救計畫並送總管理處核准。"
));

// ----- 第七章 後續擴展 -----
content.push(h1("第七章 後續擴展藍圖"));

content.push(h2("7.1 HT 知識庫的長期價值"));
content.push(body(
  "本案完成後，HT 將累積三個重要的組織級知識庫，這三個知識庫會隨著每日 POS 資料、每次巡店、每次展店評估持續累積與更新："
));
content.push(genericTable(
  ["知識庫", "建立階段", "長期價值", "回饋更新機制"],
  [
    ["銷售資料分析庫", "本案 Phase 1-2 建立", "每日 POS 資料的結構化呈現，是區經理日常決策依據", "POS 系統每日自動拋接，無需人工"],
    ["巡店判斷邏輯庫", "本案 Phase 1-3 建立", "區經理跨店巡店優先級排序的方法論，可被新進區經理快速繼承", "每次巡店後 PM 回填新議題類型與處理方式"],
    ["展店評估案例庫", "本案 Phase 4 建立", "歷史展店成功與失敗案例的學習點，建立可複用的展店評估方法論", "每次展店決策（成功與否）都回填學習點"]
  ],
  [2200, 1500, 4500, 1700]
));

content.push(h2("7.2 後續擴展方向"));
content.push(genericTable(
  ["時程", "擴展方向", "預期投入"],
  [
    ["短期（本案結案後 3 個月）", "擴展至全部門市；加入更多品類細分；POS 資料每日自動拋接優化", "HT 數發處主導"],
    ["中期（本案結案後 6 個月）", "整合會員資料，加入會員消費行為分析、流失預警；整合競品促銷情報自動爬取", "HT 數發處與 IT 部門合作"],
    ["長期（本案結案後 12 個月以上）", "向業務應用延伸：給店長日常使用、推送個人化目標達成提示；展店決策大腦對接土地評估系統", "HT 業務團隊主導應用方向"]
  ],
  [2200, 5000, 2700]
));

// ----- 第八章 下一步行動 -----
content.push(h1("第八章 下一步行動建議"));

content.push(h2("8.1 行動清單"));
content.push(genericTable(
  ["時程", "行動項目", "負責單位"],
  [
    ["立即行動", "確認本規劃書方向、規模選項（3／4／5 個月）、安排區經理深度訪談排程", "HT 主管 + Intellicon"],
    ["1 週內", "東元數發處啟動 POS 資料盤點與拋接機制設計；確認 POC 期間聚焦的店家清單（3 家典型店）", "數發處 + HT 業務 + Intellicon"],
    ["2 週內（Phase 1 啟動）", "Kickoff Meeting；種子團隊組成（PM 加 1-2 位區經理）；訪談排程定案", "HT + Intellicon + 總管理處"],
    ["2 週末（Phase 1 完成）", "區經理深度訪談完成；SOP 與 KB 骨架建置完成", "種子團隊 + Intellicon"],
    ["7 週內（Phase 2 完成）", "Agent MVP 雛形完成；第一輪驗測通過", "種子團隊 + Intellicon"],
    ["11 週內（Phase 3 完成）", "Agent v2 內部試用上線；KPI 量測初步結果", "種子團隊 + Intellicon"],
    ["14 週內（Phase 4 完成）", "場景擴展、跨 Agent 協作優化、Final Review", "種子團隊 + Intellicon"],
    ["17 週內（Phase 5 結案）", "種子團隊培訓認證、正式上線、結案；後續擴展規劃", "HT + 總管理處"]
  ],
  [2000, 5500, 1526]
));

content.push(h2("8.2 HT 端待確認事項"));
content.push(bullet("POS 系統資料拋接機制現況？是否能每日定期匯出？格式（CSV / API / 直接 DB 連接）？", "b3"));
content.push(bullet("品類分類在不同店是否一致？是否有歷史「品類重新分類」的紀錄？", "b3"));
content.push(bullet("商圈與競品資訊由誰維護？更新頻率？", "b3"));
content.push(bullet("第一階段聚焦的店家範圍？建議至少 1 旗艦店 + 1 標準店 + 1 社區店", "b3"));
content.push(bullet("第一線使用者是區經理、營業部主管、或店長？決策流程？", "b3"));
content.push(bullet("資深區經理深度訪談排程：每位需 6 至 8 小時，建議共訪 2 至 3 位資深區經理（涵蓋北中南三區）", "b3"));
content.push(bullet("展店評估是否在本次 POC 範圍？或先做銷售分析、未來再加入展店評估？", "b3"));

content.push(h2("8.3 給總管理處的具體請求"));
content.push(body(
  "請總管理處協助：核准本規劃書與 100 小時顧問時數估算（或依規模選項調整）；指派一位協調窗口參與雙週進度會議；批准 HT 種子團隊（1 PM 加 1-2 位區經理）的 4 個月投入承諾；批准數發處投入 POS 資料拋接機制建置所需資源；確認資料品質閘門通過率與解釋品質抽查作為核心稽核指標。"
));

content.push(empty());

// 結語 disclaimer
content.push(new Paragraph({
  spacing: { before: 400, after: 200 },
  border: {
    top: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY, space: 8 },
    bottom: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY, space: 8 }
  },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({
    text: "此規劃書基於 HT 事業群提供之題目方向初步估算實施範圍與顧問時數。實際導入細節仍需依據後續區經理深度訪談與 HT 內部資料盤點結果調整。",
    font: "Microsoft JhengHei", size: 18, color: TEXT_MUTED, italics: true
  })]
}));
content.push(empty());
content.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: `${PROPOSER} | EgentHub 企業 AI Agent 平台`, font: "Microsoft JhengHei", size: 20, bold: true, color: PRIMARY })]
}));

// ============================================================
// DOCUMENT
// ============================================================
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft JhengHei", size: 20 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Microsoft JhengHei", color: PRIMARY },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Microsoft JhengHei", color: SECONDARY },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, font: "Microsoft JhengHei", color: PRIMARY },
        paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 2 } },
    ]
  },
  numbering: { config: numConfig },
  sections: [
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      children: [
        empty(), empty(), empty(), empty(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: "AI Agent", font: "Microsoft JhengHei", size: 56, bold: true, color: PRIMARY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: "導入規劃書", font: "Microsoft JhengHei", size: 56, bold: true, color: PRIMARY })] }),
        empty(),
        new Paragraph({ alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: SECONDARY, space: 8 },
                    bottom: { style: BorderStyle.SINGLE, size: 4, color: SECONDARY, space: 8 } },
          spacing: { before: 200, after: 200 },
          children: [new TextRun({ text: CLIENT_NAME, font: "Microsoft JhengHei", size: 36, color: SECONDARY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: REPORT_SUBTITLE, font: "Microsoft JhengHei", size: 24, color: TEXT_MUTED })] }),
        empty(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "4 個月、五階段、單題目雙 Agent", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "Intellicon 顧問約 100 小時", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        empty(), empty(), empty(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: PROPOSER, font: "Microsoft JhengHei", size: 26, bold: true, color: PRIMARY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "EgentHub 企業 AI Agent 平台", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: REPORT_DATE, font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
      ]
    },
    {
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: MARGIN_R, bottom: 1440, left: MARGIN_L } } },
      headers: {
        default: new Header({ children: [new Paragraph({
          spacing: { after: 100 },
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: SECONDARY, space: 4 } },
          children: [
            new TextRun({ text: `${CLIENT_NAME} ${REPORT_TITLE}`, font: "Microsoft JhengHei", size: 16, color: "999999" }),
            new TextRun({ text: `\t${PROPOSER}`, font: "Microsoft JhengHei", size: 16, color: "999999" })
          ],
          tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }]
        })] })
      },
      footers: {
        default: new Footer({ children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR, space: 4 } },
          children: [
            new TextRun({ text: "第 ", font: "Microsoft JhengHei", size: 16, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Microsoft JhengHei", size: 16, color: "999999" }),
            new TextRun({ text: " 頁", font: "Microsoft JhengHei", size: 16, color: "999999" })
          ]
        })] })
      },
      children: content
    }
  ]
});

Packer.toBuffer(doc).then(buffer => {
  const outputPath = "/sessions/jolly-amazing-franklin/mnt/outputs/東元HT_AI_Agent導入規劃書.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created: ${outputPath}`);
});

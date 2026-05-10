// ============================================================
// 東元電機 機電系統事業群 (GM) — AI Agent 導入規劃書
// 商機分析師 + 報價策略決策（雙案併行）
// ============================================================

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, TabStopType, TabStopPosition
} = require("docx");

// ===== Variables =====
const CLIENT_NAME = "東元電機 機電系統事業群";
const CLIENT_SHORT = "東元 GM";
const PROPOSER = "智慧方案";
const REPORT_DATE = "2026 年 5 月";
const REPORT_TITLE = "AI Agent 導入規劃書";
const REPORT_SUBTITLE = "商機分析師 × 報價策略決策";
const AUTOAGENT = "Autonomous Agent";

// ===== Color scheme — Intellicon / EgentHub 紫色品牌色 =====
const PRIMARY = "8A7AD2";       // Intellicon 主紫
const SECONDARY = "5D4894";     // 深紫
const ACCENT_DARK = "3D2F66";   // 極深紫
const ACCENT_LIGHT = "E9DEF6";  // 淺紫
const HEADER_BG = "8A7AD2";
const HEADER_TEXT = "FFFFFF";
const ROW_ALT = "F4EFFA";       // 極淺紫
const BORDER_COLOR = "D5C8EE";
const TEXT_DEFAULT = "2A2740";  // 深紫黑
const TEXT_MUTED = "6B6580";    // 紫灰

// ===== Layout =====
const PAGE_W = 11906;
const MARGIN_L = 1300;
const MARGIN_R = 1300;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

const border = { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

// ===== Helpers =====
function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, color: HEADER_TEXT, font: "Microsoft JhengHei", size: 18 })]
    })]
  });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    margins: cellMargins,
    verticalAlign: "center",
    children: [new Paragraph({
      alignment: opts.align || AlignmentType.LEFT,
      children: [new TextRun({
        text,
        bold: opts.bold || false,
        color: opts.color || TEXT_DEFAULT,
        font: "Microsoft JhengHei",
        size: opts.sz || 18
      })]
    })]
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 200 },
    children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 32, color: PRIMARY })]
  });
}
function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 160 },
    children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 26, color: SECONDARY })]
  });
}
function h3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 120 },
    children: [new TextRun({ text, bold: true, font: "Microsoft JhengHei", size: 22, color: PRIMARY })]
  });
}
function body(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [new TextRun({
      text,
      font: "Microsoft JhengHei",
      size: 20,
      color: opts.color || TEXT_DEFAULT,
      bold: opts.bold || false,
      italics: opts.italics || false
    })]
  });
}
function bodyMulti(runs) {
  return new Paragraph({
    spacing: { after: 120, line: 360 },
    children: runs.map(r => new TextRun({
      text: r.text,
      font: "Microsoft JhengHei",
      size: 20,
      color: r.color || TEXT_DEFAULT,
      bold: r.bold || false,
      italics: r.italics || false
    }))
  });
}
function empty() { return new Paragraph({ spacing: { after: 80 }, children: [] }); }
function bullet(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 340 },
    children: [new TextRun({ text, font: "Microsoft JhengHei", size: 20, color: TEXT_DEFAULT })]
  });
}
function numbered(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { after: 80, line: 340 },
    children: [new TextRun({ text, font: "Microsoft JhengHei", size: 20, color: TEXT_DEFAULT })]
  });
}

function genericTable(headers, data, colWidths) {
  const hr = new TableRow({ tableHeader: true, children: headers.map((h, i) => headerCell(h, colWidths[i])) });
  const rows = data.map((a, idx) => {
    const fill = idx % 2 === 1 ? ROW_ALT : undefined;
    return new TableRow({ children: a.map((v, i) => dataCell(v, colWidths[i], { fill, sz: 16 })) });
  });
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: colWidths, rows: [hr, ...rows] });
}

// ===== Numbering config =====
const numConfig = [];
for (let i = 1; i <= 30; i++) {
  numConfig.push({
    reference: `b${i}`,
    levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
  });
  numConfig.push({
    reference: `n${i}`,
    levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
  });
}

// ============================================================
// CONTENT
// ============================================================

const content = [];

// ----- 第一章：專案背景與設計哲學 -----
content.push(h1("第一章 專案背景與設計哲學"));

content.push(h2("1.1 專案背景"));
content.push(body(
  "東元電機機電系統事業群（以下簡稱 GM）為東元集團起家本業，長期服務 OEM、機械、半導體設備、產業用戶與大型工程公司，在馬達、機電系統與整合工程領域具備深厚技術基礎。然而，在「商機從哪裡來、值不值得追、該怎麼追」與「報價要多少、勝率多高、風險在哪」這兩個關鍵業務命題上，GM 目前高度依賴個人經驗與人工判斷。"
));
content.push(body(
  "現況呈現以下結構性特徵：商機資訊來源高度分散；早期投資訊號往往模糊但價值最高，卻容易被忽略；分析品質仰賴資深人員，難以複製與交接；報價策略邏輯藏在資深業務腦中，新人難以承接；判斷依據欠缺系統化沉澱，無法成為組織資產。這使得 GM 在實際業務運作中，容易落入「產業鏈後段才看到機會、看到時已經太晚」的被動狀態。"
));

content.push(h2("1.2 核心問題定義"));
content.push(body(
  "生成式 AI 已能快速產出看似完整的分析報告，但在 GM 商機與報價場景中，真正的痛點不在於「寫不寫得出來」，而在於：資料不完整時，AI 與人都容易過度推論；搜尋結果良莠不齊，無法直接用於決策；無法清楚區分「已確認事實」與「合理推估」；判斷邏輯存在於資深業務腦中，無法累積為企業資產。"
));
content.push(bodyMulti([
  { text: "因此，本專案的目標不是做一個「會寫報告的 AI」，而是打造能遵循 GM 商機分析與報價決策 SOP、知道何時該停下來、並主動要求補資料的 AI Agent 團隊。" }
]));

content.push(h2("1.3 整體設計原則"));
content.push(body(
  "本規劃遵循以下四項核心原則，這四項原則同時適用於商機分析師與報價策略決策兩個 Agent："
));
content.push(h3("原則一：流程優先於模型"));
content.push(body(
  "先定義「GM 業務應該如何挖商機、如何決策報價」，AI 才介入輔助每個步驟。提示詞與工具都是流程的延伸，不是流程的核心。"
));
content.push(h3("原則二：資料確認是硬閘門"));
content.push(body(
  "在關鍵資料未確認前，AI 不分析、不推估、不下結論。寧可主動回頭要求業務補資料，也不容許「看似完整但根據不足」的輸出污染決策。"
));
content.push(h3("原則三：判斷邏輯與事實資料分離"));
content.push(body(
  "判斷規則、估算邏輯內建於 Agent 行為規範；客戶、產業、歷史報價、原料行情則存於企業知識庫。讓邏輯與資料各自演化，避免知識庫變動時必須回頭動提示詞。"
));
content.push(h3("原則四：人機協作，不是全自動"));
content.push(body(
  "AI 的責任是加速、結構化、指出不確定性；最終商機判斷與最終報價決策仍由業務或業務主管執行。"
));

// ----- 第二章：整體架構 -----
content.push(h1("第二章 整體架構：Autonomous Agent 與 EgentHub 雙層協作"));

content.push(h2("2.1 雙層架構定位"));
content.push(body(
  "本案採取雙層架構，將「外部訊號蒐集」與「商機決策分析」清楚分工，避免重複建設與工具競爭。訊號層由 Autonomous Agent 工具負責，已在 CTCI 客戶研究案中驗證可行；決策層由 EgentHub 平台上的 AI Agent 負責，是 Intellicon 顧問本案的主導開發範圍。"
));

content.push(genericTable(
  ["分層", "工具屬性", "主要任務", "負責單位", "成熟度"],
  [
    ["訊號層", "Autonomous Agent（非 EgentHub 既有，數發處建置）", "外部公開資訊抓取、客戶研究、競爭格局與聯盟地圖整理", "東元數發處（建置與維運）＋ Intellicon（指令設計建議）", "已驗證可行（CTCI 案）"],
    ["決策層", "EgentHub 平台原生 Agent", "比對東元能力、商機可行性評分、排序與行動建議", "Intellicon 主導開發、GM 種子團隊參與並交接", "本案核心開發範圍"]
  ],
  [1100, 2400, 2700, 2700, 1406]
));

content.push(h2("2.2 三方協作分工"));
content.push(body(
  "本案涉及三個關鍵單位的協作。透過清楚的角色分工，讓每個單位都能在熟悉的領域發揮，並讓 AI 工具成為跨單位的共同語言。"
));
content.push(genericTable(
  ["協作單位", "主要職責", "投入週期"],
  [
    ["東元數發處", "主執行：Autonomous Agent 技術環境建置與維運；EgentHub 知識庫資料準備（CSV、ERP 拋接）；簡單提示詞撰寫；提示詞迭代測試", "全專案週期，1-2 位專責人員"],
    ["Intellicon 顧問團隊", "主指導：策略指導、高難度提示詞撰寫（資料閘門、Phase 4-6）、雙 Agent 協作邏輯設計、Code Review、種子團隊培訓", "全專案週期，約 150 小時"],
    ["GM 業務團隊（種子）", "主共創：提供商機判斷與報價決策邏輯；組成種子團隊（1 PM 加 1-2 工程師）；使用 Agent 並回饋迭代", "全專案週期"],
    ["GM 資深業務（受訪者）", "深度訪談接受者，協助提取藏於腦中的判斷邏輯", "前 4 週為主"],
    ["GM 與總管理處", "稽核專案進度與成果，確認資源配置與下一階段擴展方向", "雙週節點"]
  ],
  [2200, 5500, 1500]
));

content.push(h2("2.3 為什麼是雙層而不是單一系統"));
content.push(body(
  "Autonomous Agent 已在 CTCI 案證明能完整產出標案彙總、競爭格局分析、聯盟生態地圖、護城河評估等深度研究素材；這層工作不需重複造輪子。EgentHub Agent 的差異化價值在於「把 Autonomous Agent 給的事實 × 東元 40 年的機電能力庫」組合成「東元可切入的商機 + 建議行動」。換句話說，Autonomous Agent 給「事實」，EgentHub Agent 給「決策」。"
));

content.push(h2("2.4 重要附註：Autonomous Agent 技術環境說明"));
content.push(body(
  "本規劃書所稱之 Autonomous Agent 並非 EgentHub 平台既有功能。Intellicon 可在指令設計、任務拆解、訊號蒐集策略等面向提供顧問建議，但初期實際的技術環境建置（包含 Autonomous Agent 執行框架、爬蟲管線、資料儲存、研究報告產出等）需由東元數發處負責，並指派專責人員維運。"
));
content.push(body(
  "Intellicon 目前正自主開發 Autonomous Agent 模組，預計於 2026 年 Q3 推出，屆時將整合進 EgentHub 平台成為原生能力。一旦正式推出，東元可評估將數發處初期建置之環境替換為 Intellicon 原生 Autonomous Agent，享有平台層級的更新、維運支援與跨事業群統一管理優勢。"
));
content.push(body(
  "此安排對本規劃書帶來兩個正面效益：第一，東元數發處在 2026 年上半年可累積 Autonomous Agent 的實作經驗，未來無論採用 Intellicon 原生方案或其他工具，都具備技術判斷力；第二，本案 EgentHub 商機分析師 Agent 與 Autonomous Agent 採鬆耦合設計（透過 xlsx 報告中介），未來替換訊號層工具時，決策層 Agent 不需重新開發。"
));

// ----- 第三章：商機分析師 -----
content.push(h1("第三章 題目一：商機分析師 AI Agent"));

content.push(h2("3.1 應用場景（業務流程）"));
content.push(body(
  "GM 業務團隊每週收到「商機雷達報告」，列出 Top N 潛在新案，含觸發訊號、建議產品線、預估金額區間、建議行動話術。業務以此作為「主動敲門」的依據，從現有的「等客戶詢價」模式轉為「先一步看到機會」。資深業務則用此 Agent 二次驗證自身判斷，並把判斷邏輯沉澱成組織資產。"
));

content.push(h2("3.2 資料輸入與來源"));
content.push(bullet("外部即時資料：全球景氣指標、產業新聞、研究報告、政府方案", "b1"));
content.push(bullet("客戶動態：KA 客戶年報、新聞稿、徵才訊息、擴廠或新建廠計畫、上下游動態", "b1"));
content.push(bullet("原物料行情：銅、矽鋼片、稀土等馬達主要原料價格波動", "b1"));
content.push(bullet("Autonomous Agent 產出：客戶研究 xlsx 報告（標案彙總、競爭格局、聯盟地圖、護城河評估）", "b1"));
content.push(bullet("東元內部歷史資料：ERP 與 CRM 中的詢報價紀錄、成交紀錄、客戶採購週期", "b1"));

content.push(h2("3.3 預期輸出內容"));
content.push(body(
  "每週一份「商機雷達」報告，可推送至業務手機 LINE 或 Email 信箱。每筆商機卡包含以下欄位：客戶名稱、觸發訊號、建議產品線、預估金額區間（區間呈現，標註可信度）、建議行動、業務話術建議、資料來源與引用、若資料不足則明確標示「待補資訊」。"
));

content.push(h2("3.4 任務步驟（Phase 1 至 Phase 7）"));
content.push(numbered("Phase 1 分析需求定義：業務輸入目標客戶、產業、期間與分析重點", "n1"));
content.push(numbered("Phase 2 資料盤點與缺口確認（硬閘門）：盤點知識庫已有資料、規劃外部搜尋來源、列出資料缺口；未經業務確認，不進入後續分析", "n1"));
content.push(numbered("Phase 3 訊號結構化：把外部訊號轉為標準欄位（客戶、事件類型、時程、規模線索、資料來源、可信度）", "n1"));
content.push(numbered("Phase 4 商機化分析：針對每筆訊號，轉為「東元 GM 可切入的商機」，列出可能需要的設備型號、配套服務、潛在競品", "n1"));
content.push(numbered("Phase 5 商機金額估算（規則導向）：僅在有合理依據時估算，一律以區間呈現，標註假設與可信度；無法估算時明確說明", "n1"));
content.push(numbered("Phase 6 排序與行動建議：依近期性、金額區間、與東元能力匹配度、與該客戶歷史關係綜合排序", "n1"));
content.push(numbered("Phase 7 輸出成果：週報「商機雷達」加上個別商機卡，可即時推送", "n1"));

content.push(h2("3.5 知識庫需求"));
content.push(genericTable(
  ["知識庫類型", "內容", "建置難度", "備註"],
  [
    ["向量知識庫", "產業景氣指標解讀、客戶年報重點摘要、過往商機分析案例", "中", "RAG 技術應用"],
    ["SQL 表格庫", "歷史報價成交紀錄、KA 客戶往來紀錄、產品與適用產業對照表", "高（需 ERP 整合）", "本案最大工程"],
    ["工具呼叫", "原物料行情查詢 API、客戶新聞自動推播", "中", "外部 API 串接"],
    ["Autonomous Agent 整合", "Autonomous Agent 產出之 xlsx 報告灌入企業知識庫", "低", "已有現成樣本"]
  ],
  [1800, 4200, 1500, 1700]
));

content.push(h2("3.6 雙 Agent 架構"));
content.push(body(
  "為降低導入風險與使用門檻，本題目規劃 2 個 Agent。研究助理 Agent 為輔助型，僅在補資料、整理資料時使用，主要任務是解析使用者補充的公告、新聞、PDF、Autonomous Agent 產出 xlsx，摘要重點資訊並標註可支援哪些商機分析欄位。商機分析師 Agent 則為主要入口，負責完整的商機分析 SOP（Phase 1 至 Phase 7）。"
));

content.push(h2("3.7 規模判斷與專案複雜度"));
content.push(body(
  "本題目屬於大型專案範圍。難點在於多源外部資料整合與 ERP 歷史資料清洗。所幸 Autonomous Agent 已在 CTCI 案中扛下了大部分外部訊號蒐集工作，讓本 Agent 能聚焦於「商機化分析、評分與行動建議」這個真正創造 GM 業務價值的核心區。建議分兩階段執行：第一階段先做「Autonomous Agent 已產出報告 + AI 比對東元能力 + 產出商機建議」；第二階段再加自動化訊號偵測與推播。"
));

// ----- 第四章：報價策略 -----
content.push(h1("第四章 題目二：報價策略決策 AI Agent"));

content.push(h2("4.1 應用場景（業務流程）"));
content.push(body(
  "業務人員收到新詢價後，AI 在數分鐘內回吐「建議報價區間 + 建議交期 + 預估勝率 + 風險提示」，業務確認或調整後送出。後續成交與否回填，作為下次學習素材。資深業務的判斷邏輯在此被 AI 結構化並複用，新進業務也能產出水準一致的初稿。"
));

content.push(h2("4.2 資料輸入與來源"));
content.push(bullet("詢價單內容：規格、數量、客戶、地區、交期需求", "b2"));
content.push(bullet("東元歷史資料：成交價、落標價、失單價、客戶往來紀錄、勝負標籤", "b2"));
content.push(bullet("競爭情報：公開招標結果、業務人員回報之市場情報", "b2"));
content.push(bullet("成本與產能：BOM 標準成本、即時原料成本、產能與排程現況", "b2"));
content.push(bullet("客戶分級資料：KA 客戶、一般客戶、新客戶分類", "b2"));

content.push(h2("4.3 預期輸出內容"));
content.push(body(
  "報價建議單，含三檔價格（上限、最適、下限）、建議交期（含產能風險評估）、預估得標率、風險提示（低毛利、產能瓶頸、客戶議價空間、競爭對手可能行動）、可援引的歷史相似案例編號與當時情境。所有建議都註明假設與資料來源。"
));

content.push(h2("4.4 任務步驟（Phase 1 至 Phase 7）"));
content.push(numbered("Phase 1 詢價需求定義：業務輸入詢價單", "n2"));
content.push(numbered("Phase 2 資料盤點與缺口確認（硬閘門）：盤點已有資料、列出缺口；缺口未補齊前，AI 只給「資訊充分度評分」，不給最終價格建議", "n2"));
content.push(numbered("Phase 3 歷史相似案件結構化：撈出近 N 年同型號、同客戶、同地區的成交價、落標價、失單價，列出價差區間與當時情境", "n2"));
content.push(numbered("Phase 4 成本與毛利試算：BOM 加即時原料加製造費加銷管攤銷得出標準成本與建議毛利區間", "n2"));
content.push(numbered("Phase 5 報價策略建議（規則導向）：給出三檔報價、建議交期、預估得標率，註明假設與資料來源", "n2"));
content.push(numbered("Phase 6 風險提示：低毛利警示、產能瓶頸警示、客戶議價空間預估、競爭對手可能行動", "n2"));
content.push(numbered("Phase 7 輸出成果：報價建議單（PDF 或 Excel），業務確認或調整後送出，後續成交結果回填", "n2"));

content.push(h2("4.5 知識庫需求"));
content.push(genericTable(
  ["知識庫類型", "內容", "建置難度", "備註"],
  [
    ["SQL 表格庫", "歷史報價成交資料庫（含勝負標籤）、產品 BOM 與標準成本、產能排程資料", "高（需 ERP 整合）", "本案核心資料源"],
    ["工具呼叫", "原物料即時行情 API、ERP 整合查詢工具", "中", "外部與內部 API"],
    ["向量知識庫", "競爭對手情報筆記、特殊客戶議價歷史", "中", "業務人員手動填寫"],
    ["規則檔", "毛利底線政策、客戶分級報價策略", "低", "由業務主管制定"]
  ],
  [1800, 4200, 1500, 1700]
));

content.push(h2("4.6 雙 Agent 架構"));
content.push(body(
  "本題目同樣採雙 Agent 架構。詢價解析助理 Agent 為輔助型，負責解析詢價單、規格抽取、產品標準化分類、比對歷史相似案件。報價策略分析師 Agent 為核心，負責完整的報價策略 SOP（Phase 1 至 Phase 7）。"
));

content.push(h2("4.7 規模判斷與專案複雜度"));
content.push(body(
  "本題目屬於大型專案範圍，比題目一更吃 ERP 與 BOM 整合精度與資料品質。建議第一階段先聚焦「典型品項」，例如最常詢價的前 20% 馬達型號；第二階段再擴大至客製化品項與全產品線。"
));

// ----- 第五章：POC 實施與時程 -----
content.push(h1("第五章 POC 實施規劃與時程甘特圖"));

content.push(h2("5.1 五階段實施策略（6 個月）"));
content.push(body(
  "本案採用 6 個月、五階段實施策略。每階段之間都留有充裕的執行緩衝期，讓 GM 數發處可以把上一輪 Intellicon 的指導完整消化、實際操作、反覆驗證後，再進入下一階段。這個節奏設計貼近真實的「種子團隊養成」目標 — 不是 12 週硬上線，而是讓 GM 數發處在 6 個月內逐步具備自主開發 AI Agent 的能力，避免出現「顧問結案後團隊還沒成長到能獨立作戰」的常見問題。"
));

content.push(h3("Phase 1：啟動（W1 至 W4，4 週）"));
content.push(body(
  "Kickoff Meeting、GM 業務深度訪談主持（兩案各 2 位資深業務）、SOP 共創、知識庫架構指導。階段交付物：SOP v1 文件、知識庫骨架設計、種子團隊組成確認。"
));
content.push(h3("Phase 2：基礎建置（W5 至 W10，6 週）"));
content.push(body(
  "高難度提示詞 v1 撰寫（資料閘門、Phase 2-3 訊號結構化）、雙 Agent 協作邏輯設計、第一輪驗測陪審。聚焦範圍：商機案先選 3 至 5 家 KA 客戶與 1 個產業；報價案先聚焦標準馬達品項中 Top 20% 詢價量產品。階段交付物：Agent MVP 雛形、第一輪驗測報告。"
));
content.push(h3("Phase 3：迭代調優（W11 至 W16，6 週）"));
content.push(body(
  "高難度提示詞 v2 調優（Phase 4-6 商機化、報價策略決策）、與資深業務對齊判斷邏輯、第二輪驗測陪審、風險審查。階段交付物：Agent v2 內部試用版上線、調優記錄、KPI 量測初步結果。"
));
content.push(h3("Phase 4：擴展優化（W17 至 W22，6 週）"));
content.push(body(
  "場景擴展指導（加入更多 KA、含客製化品項）、跨 Agent 協作流程優化、第三輪驗測與上線前 Final Review。這個階段是讓東元數發處有充裕時間累積經驗、嘗試延伸應用、發現邊界情境。階段交付物：擴展版 Agent v3、上線前 Review 報告。"
));
content.push(h3("Phase 5：培訓交接（W23 至 W26，4 週）"));
content.push(body(
  "種子團隊培訓主講、教材製作、試運行陪跑、結案 Review、後續諮詢機制建立。階段交付物：種子團隊獨立作戰能力認證、培訓教材、結案報告、後續支援承諾書。"
));

content.push(h2("5.2 兩案併行甘特圖（26 週版本）"));
content.push(genericTable(
  ["階段 / 週次", "商機分析師 Agent 工項", "報價策略 Agent 工項", "里程碑"],
  [
    ["Phase 1 / W1-W4", "業務深度訪談、SOP 共創、能力庫骨架", "業務深度訪談、SOP 共創、報價資料盤點", "SOP v1 + 知識庫骨架"],
    ["Phase 2 / W5-W7", "高難度提示詞 v1（資料閘門、Phase 2-3）", "高難度提示詞 v1（資料閘門、Phase 2-3）", "Prompt v1 完成"],
    ["Phase 2 / W8-W10", "雙 Agent 雛形、第一輪驗測（CTCI 案）", "雙 Agent 雛形、第一輪驗測（典型品項）", "Agent MVP 雛形"],
    ["Phase 3 / W11-W13", "Phase 4-6 商機化提示詞 v2 調優", "Phase 4-6 報價策略提示詞 v2 調優", "Prompt v2 完成"],
    ["Phase 3 / W14-W16", "與資深業務對齊、第二輪驗測", "與資深業務對齊、第二輪驗測", "Agent v2 內部試用上線"],
    ["Phase 4 / W17-W19", "場景擴展（更多 KA 與產業）", "場景擴展（含客製化品項）", "擴展知識庫"],
    ["Phase 4 / W20-W22", "跨 Agent 協作優化、第三輪驗測", "跨 Agent 協作優化、第三輪驗測", "Agent v3 + Final Review"],
    ["Phase 5 / W23-W24", "種子團隊培訓主講", "種子團隊培訓主講", "培訓完成"],
    ["Phase 5 / W25-W26", "試運行、正式上線、結案", "試運行、正式上線、結案", "正式上線 + 知識交接"]
  ],
  [1700, 3000, 3000, 1606]
));

content.push(h2("5.3 三方資源配置"));
content.push(body(
  "本案採「Intellicon 指導 + 東元數發處執行 + GM 種子團隊共創」的三方分工。Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於兩個關鍵週次（W4、W7）支援，總投入約 150 小時，扮演策略指導、高難度提示詞撰寫、品質把關、種子團隊培訓的角色。"
));
content.push(body(
  "東元數發處則指派 1-2 位專責人員，負責 Autonomous Agent 技術環境建置與維運、兩個 EgentHub Agent 的知識庫與簡單提示詞執行、ERP 整合等執行端工作。GM 種子團隊（1 PM 加 1-2 位業務工程師）負責業務邏輯共創、提供判斷規則、最終驗收。詳細分工見第六章。"
));

// ----- 第六章：顧問時數 + 分工 -----
content.push(h1("第六章 顧問時數估算與分工原則"));

content.push(h2("6.1 角色分工原則"));
content.push(body(
  "本案採取「Intellicon 指導 + 東元數發處執行」的分工模式，目的是讓東元在 6 個月內建立內部 AI Agent 開發能力，Intellicon 在過程中扮演教練與品質把關者，而非執行端的人力外包。這個分工讓東元數發處能在過程中累積真實的開發經驗，避免「顧問結案後團隊無法獨立作戰」的常見困境。Intellicon 投入規模約 150 小時。"
));

content.push(genericTable(
  ["工項類別", "Intellicon 顧問", "東元數發處", "GM 種子團隊"],
  [
    ["專案策略指導", "主導", "—", "—"],
    ["業務深度訪談主持", "主導", "旁聽記錄", "受訪／陪同"],
    ["SOP 共創", "主導", "整理 SOP 文件", "提供業務邏輯"],
    ["Autonomous Agent 技術環境建置", "提供建議", "主執行", "—"],
    ["知識庫架構設計", "提供結構建議", "主執行（CSV 製作、ERP 拋接）", "確認欄位"],
    ["高難度提示詞（資料閘門、Phase 4-6）", "親自撰寫", "Code Review", "—"],
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

content.push(h2("6.2 顧問時數明細（6 個月、五階段、兩案併行）"));
content.push(genericTable(
  ["階段", "週次", "Intellicon 主要工項", "Intellicon 時數"],
  [
    ["Phase 1 啟動", "W1-W4", "Kickoff、業務深度訪談主持、SOP 共創、知識庫架構指導", "30 小時"],
    ["Phase 2 基礎建置", "W5-W10", "高難度提示詞 v1、雙 Agent 協作邏輯、第一輪驗測陪審、Code Review", "36 小時"],
    ["Phase 3 迭代調優", "W11-W16", "高難度提示詞 v2 調優、與資深業務對齊、第二輪驗測、風險審查", "30 小時"],
    ["Phase 4 擴展優化", "W17-W22", "場景擴展指導、跨 Agent 協作優化、第三輪驗測、Final Review", "24 小時"],
    ["Phase 5 培訓交接", "W23-W26", "種子團隊培訓主講、教材製作、試運行陪跑、結案 Review、知識交接", "30 小時"],
    ["合計", "26 週", "兩案併行（Intellicon 顧問時數）", "約 150 小時"]
  ],
  [1300, 1100, 4400, 1300]
));

content.push(body(
  "各階段之間的「節奏緩衝」是本案有別於傳統 12 週快節奏專案的關鍵設計 — GM 數發處在每階段之間有 3 至 6 週的執行時間，可以把 Intellicon 的指導實際操作、反覆驗證後再進入下一階段。這樣的節奏不是趕進度上線，而是讓種子團隊在反覆執行與迭代後，真正具備自主開發能力。"
));

content.push(h2("6.3 顧問配置與工作模式"));
content.push(body(
  "Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於 W4 與 W7 兩個高難度提示詞撰寫週期支援。雙方採取雙週同步會議制，每兩週一次 1.5 小時的進度檢視會議（已含於上述時數明細）。"
));
content.push(body(
  "東元數發處需指派專責人員至少 1 位（建議 2 位）負責 Autonomous Agent 技術環境的建置與維運，以及兩個 EgentHub Agent 的執行端工作。GM 種子團隊（1 PM 加 1-2 位業務工程師）則負責業務邏輯共創、判斷規則提供、與最終驗收。"
));

content.push(h2("6.4 顧問時數登記與對帳"));
content.push(body(
  "Intellicon 提供逐週工時表加工項對應，可月結對帳。每筆工時須對應到甘特圖中的具體工項，並附上交付物（提示詞版本、Code Review 紀錄、會議紀要、培訓教材等）。總管理處可定期抽查工時與交付物對應情況。"
));

content.push(h2("6.5 為何本案能以 150 小時完成兩案併行"));
content.push(body(
  "傳統 AI 導入專案常見的高顧問時數（300-500 小時）多半把「執行工作」也納入顧問範圍，包含 CSV 整理、ERP 串接、提示詞反覆迭代等耗時工項。這種模式的副作用，是讓客戶端的執行能力始終建立不起來。本案採取「Intellicon 做高槓桿指導；東元數發處做執行工作」的分工原則，把顧問時數聚焦在四個高槓桿環節：高難度提示詞撰寫（Phase 2 與 Phase 3 各一輪）、Code Review 與品質把關、與資深業務對齊、種子團隊培訓。"
));
content.push(body(
  "另一個關鍵設計是「6 個月節奏」。Intellicon 的指導投入分散在 26 週中，每階段之間都留有 3 至 6 週的執行緩衝期，讓 GM 數發處可以把每一輪的指導完整消化、實際操作、累積經驗後再進入下一輪。這個分工與節奏組合讓本案在 6 個月內真正建立東元 GM 內部的 AI Agent 開發能力，而非依賴外部顧問持續投入。"
));

// ----- 第七章：稽核機制 -----
content.push(h1("第七章 總管理處稽核機制"));

content.push(h2("7.1 六大稽核點"));
content.push(genericTable(
  ["稽核點", "稽核方式", "頻率", "稽核責任"],
  [
    ["雙週進度燈號", "對照甘特圖工項，紅黃綠燈呈現", "雙週", "PM 提交，總管理處審視"],
    ["階段交付物簽核", "SOP 文件、知識庫清單、Agent 行為規範、提示詞版本、驗測報告", "每階段", "GM 主管加總管理處共同簽核"],
    ["顧問工時月結對帳", "Intellicon 提供逐週工時表加工項對應", "每月", "總管理處對帳"],
    ["Autonomous Agent 研究輸入完整度", "每個商機分析案，需附 Autonomous Agent 報告或同等級研究素材", "每案", "資料閘門通過硬條件"],
    ["資料閘門通過率", "統計 Agent 啟動「資料閘門退回」次數與原因", "每月", "稽核 AI 是否「不亂推論」"],
    ["上線後 KPI 追蹤", "商機案：新商機數、商機詢價轉換率；報價案：得標率、平均報價週期、毛利穩定度", "上線後每月", "GM 業務主管加總管理處"]
  ],
  [2200, 4500, 1100, 1300]
));

content.push(h2("7.2 為何「資料閘門通過率」是核心稽核點"));
content.push(body(
  "AI Agent 最大的風險不是「答錯」，而是「在資料不足時依然輸出看似專業、實則根據不足的結論」。資料閘門通過率這項指標，能直接反映 Agent 是否依照設計原則「未經資料確認不分析、不推估、不下結論」。這也是這個專案有別於市面上「會寫報告的 AI」的關鍵差異化。"
));

content.push(h2("7.3 進度燈號定義"));
content.push(body(
  "綠燈：工項按時完成，且交付物通過簽核；黃燈：工項延遲不超過 1 週，或有 1 個交付物需補件；紅燈：工項延遲超過 2 週，或有關鍵交付物缺失。任一燈號為紅燈時，PM 須提出補救計畫並送總管理處核准。"
));

// ----- 第八章：擴展藍圖 -----
content.push(h1("第八章 後續擴展藍圖"));

content.push(h2("8.1 三層擴展架構"));
content.push(body(
  "本案兩個題目屬於第一層業務前段應用，定位是「直接拉動營收」。完成後可依下列藍圖向第二層、第三層擴展，每季新增 2 至 3 個 Agent，由種子團隊主導開發，Intellicon 角色從「主導」逐步轉為「教練陪跑」。"
));

content.push(genericTable(
  ["層次", "建議 Agent", "啟動時機"],
  [
    ["第一層 業務前段", "商機分析師、報價策略決策", "本案 W1-W26（6 個月）"],
    ["第二層 業務中後段", "訂單交期承諾、客戶健診（流失預警）、技術問答（產品規格與應用）", "本案結案後 3 至 6 個月"],
    ["第三層 工程與供應鏈", "規格選型、工程圖面查找、供應商評估、設備故障診斷", "本案結案後 12 個月"]
  ],
  [1300, 6800, 1626]
));

content.push(h2("8.2 種子團隊獨立作戰能力培養"));
content.push(body(
  "Intellicon 的核心理念是讓客戶最終具備自主開發 AI Agent 的能力。專案進行期間，種子團隊不只是被服務的對象，更是共同開發者。Intellicon 會把高階提示詞、知識庫設計邏輯、Agent 行為規範撰寫方法毫無保留地教給種子團隊。第二層、第三層的 Agent 開發，目標是讓種子團隊從「協作」到「主導」，Intellicon 退居教練角色。"
));

content.push(h2("8.3 跨事業群擴展可能性"));
content.push(body(
  "本案在 GM 事業群完成驗證後，「商機分析師」與「報價策略決策」兩個 Agent 可以快速複製到電力能源事業群（PE）與空調科技事業群（HT），主要差異在於知識庫內容與業務 SOP 細節。Autonomous Agent 訊號層可由數發處跨事業群共用，這也是本架構長期 ROI 最高的部分。"
));

// ----- 第九章：下一步行動建議 -----
content.push(h1("第九章 下一步行動建議"));

content.push(h2("9.1 行動清單"));
content.push(genericTable(
  ["時程", "行動項目", "負責單位"],
  [
    ["立即行動", "確認本規劃書方向、安排 GM 業務深度訪談排程", "GM 業務主管 加 Intellicon"],
    ["1 週內", "東元數發處啟動 Autonomous Agent 技術環境規劃；確認 POC 期間目標客戶清單（3 至 5 家 KA）", "數發處 加 GM 業務 加 Intellicon"],
    ["2 週內", "Kickoff Meeting（Phase 1 啟動）；種子團隊組成（PM 加 1-2 工程師）；資料源盤點", "GM 加 Intellicon 加 總管理處"],
    ["1 個月內（Phase 1 完成）", "GM 業務深度訪談與 SOP 共創完成；知識庫骨架建置完成", "種子團隊 加 Intellicon"],
    ["2.5 個月內（Phase 2 完成）", "Agent MVP 雛形完成；第一輪驗測通過", "種子團隊 加 Intellicon"],
    ["4 個月內（Phase 3 完成）", "Agent v2 內部試用上線；KPI 量測初步結果", "種子團隊 加 Intellicon"],
    ["5.5 個月內（Phase 4 完成）", "場景擴展、跨 Agent 協作優化、Final Review", "種子團隊 加 Intellicon"],
    ["6 個月內（Phase 5 完成）", "種子團隊培訓認證、正式上線、結案；評估跨事業群複製可能性", "GM 加 PE 加 HT 加 總管理處"]
  ],
  [2000, 5500, 1526]
));

content.push(h2("9.2 GM 端待確認事項"));
content.push(bullet("ERP 報價與成交資料近 3 年品質如何？是否有勝負標籤？是否能拋接給 EgentHub 知識庫？", "b3"));
content.push(bullet("ERP 整合方式（直連 DB、API、Excel 匯出）？資安規範如何？", "b3"));
content.push(bullet("第一階段聚焦的 KA 客戶與產業範圍？", "b3"));
content.push(bullet("報價案是否含客製化品項？（會大幅影響規模）", "b3"));
content.push(bullet("第一線使用者是業務主管還是業務員？決策流程？", "b3"));
content.push(bullet("商機案的訊號來源優先級？哪些業務願意當第一批種子使用者？", "b3"));
content.push(bullet("資深業務深度訪談排程：每位需 8 至 12 小時，建議共訪 2 至 3 位資深業務", "b3"));

content.push(h2("9.3 給總管理處的具體請求"));
content.push(body(
  "請總管理處協助：核准本規劃書與顧問時數估算；指派一位協調窗口參與雙週進度會議；批准 GM 種子團隊（1 PM 加 2 工程師）的 12 週投入承諾；批准數發處投入建置 Autonomous Agent 技術環境所需資源；確認資料閘門通過率作為核心稽核指標。"
));

content.push(h2("9.4 Autonomous Agent 後續替換評估時點"));
content.push(body(
  "Intellicon 自主開發之 Autonomous Agent 預計於 2026 年 Q3 推出整合進 EgentHub 平台。本案採 6 個月時程，若於 2026 年 5 月 Kickoff，正好於 Phase 4 擴展優化階段（約 W17-W22）期間 Intellicon 原生方案上線，可作為自然的評估與切換時點。建議總管理處於 Phase 4 中期安排一次評估會議，盤點數發處初期建置成果與 Intellicon 原生方案的功能、維運成本、跨事業群擴展性差異，再決定是否於 Phase 5 上線時切換。本規劃書採鬆耦合設計，未來無論替換與否，EgentHub 商機分析師 Agent 都不需重新開發。"
));

content.push(empty());

// ----- 結語 disclaimer -----
content.push(new Paragraph({
  spacing: { before: 400, after: 200 },
  border: {
    top: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY, space: 8 },
    bottom: { style: BorderStyle.SINGLE, size: 6, color: PRIMARY, space: 8 }
  },
  alignment: AlignmentType.CENTER,
  children: [new TextRun({
    text: "此規劃書基於 GM 事業群提供之題目方向與既有 Autonomous Agent 案例分析，初步估算實施範圍與顧問時數。實際導入細節仍需依據後續業務深度訪談與 ERP 資料盤點結果調整。",
    font: "Microsoft JhengHei",
    size: 18,
    color: TEXT_MUTED,
    italics: true
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
    // ===== Cover =====
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
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
          children: [new TextRun({ text: "Autonomous Agent × EgentHub 雙層協作架構", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "本規劃涵蓋商機分析師與報價策略決策兩案", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        empty(), empty(), empty(),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
          children: [new TextRun({ text: PROPOSER, font: "Microsoft JhengHei", size: 26, bold: true, color: PRIMARY })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "EgentHub 企業 AI Agent 平台", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: REPORT_DATE, font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
      ]
    },
    // ===== Main =====
    {
      properties: {
        page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, right: MARGIN_R, bottom: 1440, left: MARGIN_L } }
      },
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
  const outputPath = "/sessions/jolly-amazing-franklin/mnt/outputs/東元GM_AI_Agent導入規劃書.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created: ${outputPath}`);
});

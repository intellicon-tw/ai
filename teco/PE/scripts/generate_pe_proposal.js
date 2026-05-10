// ============================================================
// 東元電機 電力能源事業群 (PE) — AI Agent 導入規劃書
// 銷售流程引導 + 合約問答助手（雙案併行）
// ============================================================

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageNumber, TabStopType, TabStopPosition
} = require("docx");

// ===== Variables =====
const CLIENT_NAME = "東元電機 電力能源事業群";
const CLIENT_SHORT = "東元 PE";
const PROPOSER = "智慧方案";
const REPORT_DATE = "2026 年 5 月";
const REPORT_TITLE = "AI Agent 導入規劃書";
const REPORT_SUBTITLE = "銷售流程引導 × 合約／文件判讀";

// ===== Color scheme — Intellicon / EgentHub 紫色品牌色 =====
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

// ----- 第一章：PE 業務的兩大關鍵負擔 -----
content.push(h1("第一章 PE 業務的兩大關鍵負擔"));

content.push(h2("1.1 PE 事業群業務型態"));
content.push(body(
  "東元電機電力能源事業群（以下簡稱 PE）聚焦於「創能、儲能、節能」三大主軸，業務涵蓋太陽能 EPC、工商業儲能（ESS）、微電網整合、重電配電盤與 GIS 開關設備、離岸風電組件供應、車用動力總成等領域。客戶端從台電、政府用電大戶、製造業 ESG 案、建商到車用整車廠都有。"
));
content.push(body(
  "這個事業群的業務型態與一般的設備銷售有根本性的差異。每一個案件都是大型工程或整合系統採購，工期動輒半年到 5 年，金額從千萬到上億新台幣，技術規格涵蓋電氣、機械、土建、軟體、控制；合約義務複雜、責任重大；客戶對技術可信度與履約能力的要求極高。"
));

content.push(h2("1.2 兩大關鍵負擔"));
content.push(body(
  "在這樣的業務型態下，PE 在每一個案件的全生命週期中，承受兩大關鍵的人工負擔。這兩個負擔不是技術問題、不是工具問題，而是「資深專業知識難以規模化」的組織問題。"
));
content.push(h3("負擔一：銷售流程與案件估算"));
content.push(body(
  "業務在投標或報價時，需要查設備標準單價、過去類似案件、人月配比、估算公式、流程節點、簽核機制等資訊。這些資訊散落在不同 SOP 文件、Excel 表格、PM 個人記憶中，沒有統一的查詢入口。新人上手週期長（往往要兩年才能獨立估一個完整 EPC 案）；跨專案的經驗無法被快速複用；資深 PM 退休或換組會帶走大量隱性知識。"
));
content.push(h3("負擔二：合約／文件判讀與義務追蹤"));
content.push(body(
  "PE 案件的合約常常 100 頁以上，混合商業條款（付款、罰則、保固、履約保證）、技術規格（性能、規格、品牌限制）、法務責任（智財、保密、不可抗力、終止）、風險條款（保險、爭議解決、稅務）。業務、PM、法務、技術四個角色看合約的關注點完全不同；紅旗條款（例如：罰款上限過高、保固範圍過大、性能保證過嚴）容易在跨部門 review 時漏看；過往合約糾紛的教訓沒有系統性沉澱，下一個合約可能踩到同樣的坑。"
));

content.push(h2("1.3 為什麼 AI Agent 是合適的解法"));
content.push(body(
  "上述兩個負擔的本質是「資深專業知識難以規模化」，這正是 AI Agent 最能發揮價值的場景。透過把資深 PM 與法務的判斷邏輯轉成可重複執行的 Agent，並建立持續累積的條款庫、風險案例庫、估算項目庫，PE 可以：第一，讓新人在數小時內取得資深 PM 兩年才能掌握的估算判斷力；第二，讓合約風險識別從「個人英雄主義」變成「組織級能力」；第三，讓每一個案件的經驗教訓回填到知識庫，形成「組織級記憶」。"
));

// ----- 第二章：本案的設計理念 -----
content.push(h1("第二章 本案的設計理念"));

content.push(h2("2.1 雙階段對應雙題目"));
content.push(body(
  "本案兩個題目剛好對應 PE 案件生命週期的兩個關鍵階段，形成完整的「事前 + 事中事後」AI 輔助體系："
));
content.push(genericTable(
  ["案件階段", "對應題目", "AI Agent 主要服務對象"],
  [
    ["事前：報價估算階段", "題目 9 — 銷售流程引導 + 估算作業", "業務、PM、新進業務"],
    ["事中事後：合約管理階段", "題目 8 — 合約／文件判讀與問答", "業務、PM、法務、技術"]
  ],
  [2200, 4500, 2500]
));
content.push(body(
  "兩個題目雖然各自獨立，但共享同一套設計理念與實施節奏，並且共用「組織級知識累積」這個長期戰略目標。"
));

content.push(h2("2.2 五項核心設計原則"));
content.push(body(
  "本案的五項核心設計原則，是 PE 案件特性下對 AI Agent 行為的具體要求："
));

content.push(h3("原則一：流程優先於模型"));
content.push(body(
  "先定義「PE 業務應該如何跑估算 SOP、應該如何判讀合約風險」，AI 才介入輔助每個步驟。提示詞與工具都是流程的延伸，不是流程的核心。"
));

content.push(h3("原則二：文件完整性是硬閘門"));
content.push(body(
  "合約是法律文件，少一頁、少一個附件、少一條條款都可能造成嚴重後果。Agent 在合約解析前先檢查文件完整性（章節是否齊全、附件是否到位、頁碼是否連續），缺漏時主動提醒補上，不會強行對殘缺合約做判讀。同樣地，估算前若關鍵欄位（案件類型、規模、地區、客戶等級）不全，Agent 只給「資訊充分度評分」並列出資料缺口，不給最終數字答案。這個原則是 PE 案最重要的安全防線 — 寧可主動退回要求補資料，也不容許 AI 對殘缺資訊做出看似專業實則風險很高的判讀。"
));

content.push(h3("原則三：判斷邏輯與資料分離"));
content.push(body(
  "判斷規則、估算邏輯、條款風險判讀邏輯內建於 Agent 行為規範；設備單價、歷史案件、合約條款庫、風險案例則存於企業知識庫。讓邏輯與資料各自演化 — 知識庫變動時不需動提示詞，提示詞改寫時不需重灌資料。"
));

content.push(h3("原則四：跨角色視角支援"));
content.push(body(
  "PE 業務涉及五個角色（業務、PM、法務、技術、財務），每個角色看同一份合約、同一個案件的關注點完全不同。Agent 應能依使用者角色提供不同視角的回答 — 法務看到的是條款風險與責任歸屬，技術看到的是規格符合度與履約難度，業務看到的是商業條件與客戶關係，PM 看到的是工期與資源配置，財務看到的是付款條件與毛利結構。這個原則讓同一個 Agent 可以服務跨部門的所有使用者，而不是只為單一角色設計。"
));

content.push(h3("原則五：人機協作，不是全自動"));
content.push(body(
  "AI 的責任是加速、結構化、指出不確定性。最終估算數字要不要送出、合約條款要不要簽、紅旗條款要不要爭取修訂，仍由業務、PM、法務、業務主管根據 AI 的建議與自身判斷做最終決策。AI 是夥伴，不是取代。"
));

content.push(h2("2.3 三方協作分工"));
content.push(body(
  "本案涉及三個關鍵單位的協作。透過清楚的角色分工，讓每個單位都能在熟悉的領域發揮，並讓 AI 工具成為跨單位的共同語言。"
));
content.push(genericTable(
  ["協作單位", "主要職責", "投入週期"],
  [
    ["東元數發處", "主執行：EgentHub 知識庫資料準備（CSV、SOP 文件整理、PM 系統拋接）；簡單提示詞撰寫；提示詞迭代測試；上線部署與後續維運", "全專案週期，1-2 位專責人員"],
    ["Intellicon 顧問團隊", "主指導：策略指導、高難度提示詞撰寫（資料閘門、文件完整性閘門、跨角色視角）、雙 Agent 協作邏輯設計、Code Review、種子團隊培訓", "全專案週期，約 130 小時"],
    ["PE 業務團隊（種子）", "主共創：提供銷售估算 SOP、合約判讀方法論、條款庫初版、過往風險案例；組成種子團隊（1 PM 加 1-2 工程師）；使用 Agent 並回饋迭代", "全專案週期"],
    ["PE 資深 PM 與法務（受訪者）", "深度訪談接受者，協助提取藏於腦中的判斷邏輯與條款風險知識", "前 4 週為主"],
    ["PE 與總管理處", "稽核專案進度與成果，確認資源配置與下一階段擴展方向", "雙週節點"]
  ],
  [2200, 5500, 1500]
));

content.push(h2("2.4 為什麼採用單層 EgentHub 架構"));
content.push(body(
  "PE 兩個題目的資料源都是 PE 內部資料（SOP 文件、設備單價表、歷史案件、合約檔案、條款庫、風險案例），不需要長時間運行的外部訊號蒐集 Agent。因此本案採取單層 EgentHub 架構，所有 Agent 都運行在 EgentHub 平台上，把資源集中在「組織級知識累積」這個 PE 真正的核心戰場 — 也就是條款庫、風險案例庫、估算項目庫的建置與長期累積。"
));

// ----- 第三章：題目一 銷售流程引導 + 估算作業 -----
content.push(h1("第三章 題目一：銷售流程引導 + 估算作業 AI Agent"));

content.push(h2("3.1 應用場景"));
content.push(body(
  "PE 業務人員（包含資深 PM、新進業務、跨部門支援人員）在做專案估算與投標時，需要查設備標準單價、過去類似案件、人月配比、估算公式、SOP 流程節點等資訊。本 Agent 提供兩種使用模式：「估算項目即時查詢」（業務問什麼、馬上回答）與「完整估算流程引導」（從詢價到投標前的完整流程指引），讓資深 PM 的隱性知識變成可被新人即時取用的組織資產。"
));

content.push(h2("3.2 資料輸入與來源"));
content.push(bullet("業務查詢：以自然語言提問，例如「3MW 太陽能 EPC 屋頂型的設備費怎麼估？」", "b1"));
content.push(bullet("案件特徵：客戶名稱、案件類型（太陽能 / ESS / 微電網 / 重電 / 離岸風電 / 車用）、容量規模、地區、預定工期", "b1"));
content.push(bullet("PE 內部 SOP 文件：銷售估算 SOP、簽核流程、投標 checklist", "b1"));
content.push(bullet("結構化資料表：設備標準單價、歷史案件估算紀錄、人月與外包配比、估算項目對照", "b1"));

content.push(h2("3.3 預期輸出內容"));
content.push(body(
  "依使用者問題類型給不同輸出。簡單查詢類：直接給答案 + 引用 KB 資料來源（例如：「3MW 太陽能 EPC 設備費估算 25-32 NTD/W，引用估算項目 EST-EQUIP-01 + 歷史案件 PE-2023-S001」）。完整流程引導類：產出該案件類型的「估算流程清單」，含必要欄位、估算公式、檢核點、參考歷史案件、風險提示、預估毛利區間。"
));

content.push(h2("3.4 任務步驟（Phase 1 至 Phase 7）"));
content.push(numbered("Phase 1 問題分類：判別使用者是「即時查詢」還是「完整流程引導」需求", "n1"));
content.push(numbered("Phase 2 資料盤點與缺口確認（硬閘門）：盤點查詢需要的案件特徵是否齊全（類型、規模、地區）；缺口時給「資訊充分度評分」，低於 60 分不給數字答案", "n1"));
content.push(numbered("Phase 3 SOP 流程節點對應：根據案件類型，定位到對應的 SOP 流程節點與估算項目", "n1"));
content.push(numbered("Phase 4 估算公式與單價查詢：查設備標準單價、估算項目對照、人月配比表", "n1"));
content.push(numbered("Phase 5 歷史案件比對（規則導向）：找近 3 年同類型／同規模／同地區的相似案件作為參考，所有金額一律以區間呈現並標可信度", "n1"));
content.push(numbered("Phase 6 整合輸出建議：估算建議 + 檢核點 + 援引案例 + 風險提示", "n1"));
content.push(numbered("Phase 7 輸出成果：依問題類型給簡單答案或完整估算流程指引", "n1"));

content.push(h2("3.5 知識庫需求"));
content.push(genericTable(
  ["知識庫類型", "內容", "建置難度", "備註"],
  [
    ["全文查找知識庫", "PE 銷售估算 SOP、簽核流程、投標 checklist", "中（需先整理 SOP 文件）", "RAG 應用"],
    ["SQL 表格庫", "設備標準單價、歷史案件估算、人月配比、估算項目對照", "中（需從 ERP / PM 系統拋接）", "本案核心資料源"],
    ["規則檔", "估算公式、毛利率底線、風險預備金比例", "低", "由業務主管制定"]
  ],
  [1800, 4200, 1600, 1600]
));

content.push(h2("3.6 雙 Agent 架構"));
content.push(body(
  "為降低使用門檻，本題目規劃 2 個 Agent。估算作業查詢助手（輔助型）負責處理業務的「即時查詢」 — 業務問什麼、馬上給單點答案 + KB 引用，適合估算過程中的快速確認。銷售流程引導助手（核心）則負責跑完整的 Phase 1 至 Phase 7 SOP，產出該案件的完整估算流程引導與建議，適合新案件啟動時的全面盤點。業務根據需求選擇進入點，不必每次都跑完整流程。"
));

content.push(h2("3.7 規模判斷與專案複雜度"));
content.push(body(
  "本題目屬於中型專案範圍。最大工程是「PE 銷售估算 SOP 文件整理」與「ERP / PM 系統的歷史案件資料拋接」 — 這兩項由東元數發處主執行，Intellicon 提供結構建議與 Code Review。第一階段先聚焦三類典型案件（太陽能 EPC、工商業 ESS、重電配電盤）作為驗證範圍，之後擴展至微電網、離岸風電、車用動力等更複雜的案件類型。"
));

// ----- 第四章：題目二 合約／文件判讀與問答 -----
content.push(h1("第四章 題目二：合約／文件判讀與問答 AI Agent"));

content.push(h2("4.1 應用場景"));
content.push(body(
  "業務、PM、法務、技術人員在合約簽訂前後，能將合約 PDF（或標案文件、技術規範文件）上傳給 Agent，由 Agent 解析合約結構、萃取義務與風險條款，並支援問答式查詢。每個答覆都附帶原文引用（含頁碼），方便後續法務、技術、業務跨部門對齊。Agent 會依使用者角色（業務 / PM / 法務 / 技術）提供不同視角的回應 — 同一份合約，法務問風險、技術問規格、業務問商業條件、PM 問工期義務，都能得到聚焦的答案。"
));

content.push(h2("4.2 資料輸入與來源"));
content.push(bullet("合約 PDF / Word：業務上傳，包含商業條款、技術規格、附件", "b2"));
content.push(bullet("標案文件：政府或大客戶的招標說明書、技術規範書", "b2"));
content.push(bullet("業務問題：自然語言提問，可能是特定條款查詢、義務檢核、風險識別", "b2"));
content.push(bullet("PE 標準合約條款庫：東元慣用版本、紅旗條款警示、修訂建議", "b2"));
content.push(bullet("過往合約風險案例：發生過的合約風險、發生原因、處理方式", "b2"));

content.push(h2("4.3 預期輸出內容"));
content.push(body(
  "依使用者問題類型給不同輸出。合約解析類：產出合約摘要 + 結構化條款清單（商業 / 技術 / 法務 / 風險四類）+ 紅旗條款警示。問答查詢類：基於上傳合約定位特定條款，引用原文（含頁碼）回答；同時對照 PE 標準條款庫，標示「該條款與東元慣用版本的差異」與「過往是否有類似條款的風險案例」。輸出時依使用者角色（業務／PM／法務／技術）調整聚焦點與用語。"
));

content.push(h2("4.4 任務步驟（Phase 1 至 Phase 7）"));
content.push(numbered("Phase 1 文件理解與完整性檢查：讀取上傳合約 PDF，建立合約結構索引（章節、頁碼、附件清單），同時檢查文件完整性 — 章節是否齊全、附件是否到位、頁碼是否連續", "n2"));
content.push(numbered("Phase 2 資料盤點與缺口確認（硬閘門）：若文件不完整或缺乏關鍵附件，提醒使用者補上缺漏部分再分析；不允許對殘缺合約做判讀", "n2"));
content.push(numbered("Phase 3 條款結構化：把合約條款分類為商業、技術、法務、風險四類，每條註明所在頁碼與原文摘要", "n2"));
content.push(numbered("Phase 4 義務與風險萃取：依分類比對 PE 標準合約條款庫，標示「東元慣用版本差異」「紅旗條款警示」", "n2"));
content.push(numbered("Phase 5 歷史風險案例比對：對照過往合約風險案例庫，識別是否曾有類似條款引發風險", "n2"));
content.push(numbered("Phase 6 問答回應（含跨角色視角）：使用者提問時，定位到對應條款，依其角色調整回應視角；附上原文引用、慣用版本對照、修訂建議", "n2"));
content.push(numbered("Phase 7 輸出成果：合約摘要 + 義務檢核表 + 風險條款警示 + 問答記錄", "n2"));

content.push(h2("4.5 知識庫需求"));
content.push(genericTable(
  ["知識庫類型", "內容", "建置難度", "備註"],
  [
    ["全文查找知識庫", "業務上傳的合約 PDF / 標案文件 / 技術規範", "低（業務即時上傳）", "Agent 即時讀取"],
    ["SQL 表格庫", "PE 標準合約條款庫（東元慣用版本、紅旗條款）", "中（需法務協助整理）", "本案關鍵資料"],
    ["SQL 表格庫", "過往合約風險案例庫", "中（需法務 + PM 協助整理）", "風險識別關鍵"]
  ],
  [1800, 4200, 1600, 1600]
));

content.push(h2("4.6 雙 Agent 架構"));
content.push(body(
  "本題目同樣採雙 Agent 架構。合約解析助手（輔助型）使用條件式兩階段執行（讀 PDF 時走步驟一→步驟二），主要任務是解析上傳合約 PDF、結構化條款分類、產出合約摘要。合約問答助手（核心）負責跑完整的 Phase 1 至 Phase 7 SOP，產出問答回應、義務檢核、風險警示，並援引 PE 標準條款庫與過往風險案例。"
));

content.push(h2("4.7 規模判斷與專案複雜度"));
content.push(body(
  "本題目屬於中大型專案範圍，吃合約條款結構化精度與法務知識深度。最大挑戰是「PE 標準合約條款庫」與「過往合約風險案例庫」的整理 — 這兩個 KB 內容直接決定 Agent 的判讀品質，需要法務 + PM 共同投入整理。建議第一階段先聚焦於三類最常見的合約類型（太陽能 EPC 統包合約、ESS 系統採購合約、重電供應合約），之後擴展至離岸風電、政府標案、海外案件。"
));

// ----- 第五章：實施規劃 -----
content.push(h1("第五章 POC 實施規劃與時程甘特圖"));

content.push(h2("5.1 五階段實施策略（5 個月）"));
content.push(body(
  "本案採用 5 個月、五階段實施策略。每階段之間都留有充裕的執行緩衝期，讓 PE 數發處可以把上一輪 Intellicon 的指導完整消化、實際操作、反覆驗證後，再進入下一階段。這個節奏設計貼近真實的「種子團隊養成」目標 — 不是趕進度上線，而是讓 PE 數發處在 5 個月內逐步具備自主開發 AI Agent 的能力。"
));

content.push(h3("Phase 1：啟動（W1 至 W3，3 週）"));
content.push(body(
  "Kickoff Meeting、業務深度訪談（銷售案訪談 2 位資深 PM，合約案訪談 1 位法務 + 1 位資深 PM）、SOP 共創、條款庫骨架共創、知識庫架構指導。階段交付物：訪談紀要、SOP 框架 v1、條款庫骨架、種子團隊組成確認。"
));
content.push(h3("Phase 2：基礎建置（W4 至 W8，5 週）"));
content.push(body(
  "高難度提示詞 v1 撰寫（資料閘門、文件完整性閘門、跨角色視角邏輯）、雙 Agent 協作邏輯設計、第一輪驗測陪審。聚焦範圍：銷售流程案先聚焦三類典型案件（太陽能 EPC、工商業 ESS、重電配電盤）；合約問答案先聚焦三類常見合約（太陽能 EPC 統包、ESS 系統採購、重電供應）。階段交付物：Agent MVP 雛形、第一輪驗測報告。"
));
content.push(h3("Phase 3：迭代調優（W9 至 W14，6 週）"));
content.push(body(
  "高難度提示詞 v2 調優（Phase 4-6 估算邏輯、合約義務萃取、風險識別）、與資深 PM 與法務對齊判斷邏輯、第二輪驗測陪審、風險審查。階段交付物：Agent v2 內部試用版上線、調優記錄、KPI 量測初步結果。"
));
content.push(h3("Phase 4：擴展優化（W15 至 W18，4 週）"));
content.push(body(
  "場景擴展指導（加入更多案件類型、複雜合約）、跨 Agent 協作流程優化、第三輪驗測與上線前 Final Review。階段交付物：擴展版 Agent v3、上線前 Review 報告。"
));
content.push(h3("Phase 5：培訓交接（W19 至 W21，3 週）"));
content.push(body(
  "種子團隊培訓主講、教材製作、試運行陪跑、結案 Review、後續諮詢機制建立。階段交付物：種子團隊獨立作戰能力認證、培訓教材、結案報告、後續支援承諾書。"
));

content.push(h2("5.2 兩案併行甘特圖（21 週版本）"));
content.push(genericTable(
  ["階段 / 週次", "銷售流程案工項", "合約問答案工項", "里程碑"],
  [
    ["Phase 1 / W1-W3", "業務深度訪談、SOP 共創、估算項目庫骨架", "法務訪談、合約方法論共創、條款庫骨架", "SOP v1 + 條款庫骨架"],
    ["Phase 2 / W4-W6", "高難度提示詞 v1（資料閘門、Phase 2-3）", "高難度提示詞 v1（文件完整性閘門、Phase 2-3）", "Prompt v1 完成"],
    ["Phase 2 / W7-W8", "雙 Agent 雛形、第一輪驗測（典型估算案）", "雙 Agent 雛形、第一輪驗測（典型合約樣本）", "Agent MVP 雛形"],
    ["Phase 3 / W9-W11", "Phase 4-6 估算邏輯提示詞 v2 調優", "Phase 4-6 合約問答提示詞 v2 調優", "Prompt v2 完成"],
    ["Phase 3 / W12-W14", "與資深 PM 對齊、第二輪驗測", "與法務／資深 PM 對齊、第二輪驗測", "Agent v2 內部試用上線"],
    ["Phase 4 / W15-W16", "場景擴展（更多案件類型）", "場景擴展（複雜合約、海外合約）", "擴展知識庫"],
    ["Phase 4 / W17-W18", "跨 Agent 協作優化、第三輪驗測", "跨 Agent 協作優化、第三輪驗測", "Agent v3 + Final Review"],
    ["Phase 5 / W19-W20", "種子團隊培訓主講", "種子團隊培訓主講", "培訓完成"],
    ["Phase 5 / W21", "試運行、正式上線、結案", "試運行、正式上線、結案", "正式上線 + 知識交接"]
  ],
  [1700, 3000, 3000, 1606]
));

content.push(h2("5.3 三方資源配置"));
content.push(body(
  "本案採「Intellicon 指導 + 東元數發處執行 + PE 業務種子團隊共創」的三方分工。Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於兩個關鍵階段（Phase 2 與 Phase 3）支援，總投入約 130 小時，扮演策略指導、高難度提示詞撰寫、品質把關、種子團隊培訓的角色。"
));
content.push(body(
  "東元數發處則指派 1 至 2 位專責人員，負責 EgentHub 知識庫資料準備、簡單提示詞撰寫、提示詞迭代測試、上線部署等執行端工作。PE 業務種子團隊（1 PM 加 1-2 位業務 / PM）負責業務邏輯共創、提供判斷規則、最終驗收。詳細分工見第六章。"
));

content.push(h2("5.4 規模彈性說明"));
content.push(body(
  "本規劃以 5 個月、約 130 小時為標準建議，但可依 PE 內部準備度彈性調整："
));
content.push(genericTable(
  ["規模選項", "適用情境", "時程", "Intellicon 顧問時數"],
  [
    ["精簡型", "PE 尚未開始整理條款庫與風險案例；先做題目 9 銷售流程案", "4 個月", "約 95 小時"],
    ["標準型（建議）", "兩案併行；PE 已有部分 SOP、條款庫但需 AI 化", "5 個月", "約 130 小時"],
    ["完整型", "兩案併行 + 跨案件類型擴展、海外合約處理等進階功能", "6 個月", "約 150 小時"]
  ],
  [1500, 4500, 1300, 1700]
));

// ----- 第六章：顧問時數 + 分工 -----
content.push(h1("第六章 顧問時數估算與分工原則"));

content.push(h2("6.1 角色分工原則"));
content.push(body(
  "本案採取「Intellicon 指導 + 東元數發處執行」的分工模式，目的是讓 PE 在 5 個月內建立內部 AI Agent 開發能力，Intellicon 在過程中扮演教練與品質把關者，而非執行端的人力外包。這個分工讓 PE 數發處能在過程中累積真實的開發經驗，避免「顧問結案後團隊無法獨立作戰」的常見困境。Intellicon 投入規模約 130 小時。"
));
content.push(genericTable(
  ["工項類別", "Intellicon 顧問", "東元數發處", "PE 業務種子團隊"],
  [
    ["專案策略指導", "主導", "—", "—"],
    ["業務／法務深度訪談主持", "主導", "旁聽記錄", "受訪／陪同"],
    ["SOP 與合約方法論共創", "主導", "整理文件", "提供業務邏輯"],
    ["知識庫架構設計", "提供結構建議", "主執行（CSV 製作、SOP 整理）", "確認欄位"],
    ["高難度提示詞（資料閘門、文件完整性、Phase 4-6）", "親自撰寫", "Code Review", "—"],
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

content.push(h2("6.2 顧問時數明細（5 個月、五階段、兩案併行）"));
content.push(genericTable(
  ["階段", "週次", "Intellicon 主要工項", "Intellicon 時數"],
  [
    ["Phase 1 啟動", "W1-W3", "Kickoff、業務／法務深度訪談主持、SOP 與條款庫骨架共創、知識庫架構指導", "24 小時"],
    ["Phase 2 基礎建置", "W4-W8", "高難度提示詞 v1、雙 Agent 協作邏輯、第一輪驗測陪審、Code Review", "32 小時"],
    ["Phase 3 迭代調優", "W9-W14", "高難度提示詞 v2 調優、與資深 PM 與法務對齊、第二輪驗測、風險審查", "28 小時"],
    ["Phase 4 擴展優化", "W15-W18", "場景擴展指導、跨 Agent 協作優化、第三輪驗測、Final Review", "20 小時"],
    ["Phase 5 培訓交接", "W19-W21", "種子團隊培訓主講、教材製作、試運行陪跑、結案 Review、知識交接", "26 小時"],
    ["合計", "21 週", "兩案併行（Intellicon 顧問時數）", "約 130 小時"]
  ],
  [1300, 1100, 4400, 1300]
));
content.push(body(
  "各階段之間的「節奏緩衝」是本案的關鍵設計 — PE 數發處在每階段之間有 2 至 4 週的執行時間，可以把 Intellicon 的指導實際操作、反覆驗證後再進入下一階段。這樣的節奏讓種子團隊在反覆執行與迭代後，真正具備自主開發能力。"
));

content.push(h2("6.3 顧問配置與工作模式"));
content.push(body(
  "Intellicon 端配置 1 位主任顧問為主，搭配提示詞工程師於高難度提示詞撰寫的兩個關鍵階段（Phase 2、Phase 3）支援。雙方採取雙週同步會議制，每兩週一次 1.5 小時的進度檢視會議（已含於上述時數明細）。"
));
content.push(body(
  "東元數發處需指派專責人員至少 1 位（建議 2 位）負責兩個 EgentHub Agent 的執行端工作。PE 業務種子團隊（1 PM 加 1-2 位業務工程師）則負責業務邏輯共創、判斷規則提供、與最終驗收。"
));

content.push(h2("6.4 顧問時數登記與對帳"));
content.push(body(
  "Intellicon 提供逐週工時表加工項對應，可月結對帳。每筆工時須對應到甘特圖中的具體工項，並附上交付物（提示詞版本、Code Review 紀錄、會議紀要、培訓教材等）。總管理處可定期抽查工時與交付物對應情況。"
));

content.push(h2("6.5 為何本案能以 130 小時完成兩案併行"));
content.push(body(
  "傳統 AI 導入專案常見的高顧問時數（300-500 小時）多半把「執行工作」也納入顧問範圍，包含 CSV 整理、SOP 文件整理、提示詞反覆迭代等耗時工項。這種模式的副作用，是讓客戶端的執行能力始終建立不起來。本案採取「Intellicon 做高槓桿指導；東元數發處做執行工作」的分工原則，把顧問時數聚焦在五個高槓桿環節：高難度提示詞撰寫（Phase 2 與 Phase 3 各一輪）、Code Review 與品質把關、與資深 PM 與法務對齊、種子團隊培訓、結案陪跑。"
));

// ----- 第七章：稽核機制 -----
content.push(h1("第七章 總管理處稽核機制"));

content.push(h2("7.1 六大稽核點"));
content.push(genericTable(
  ["稽核點", "稽核方式", "頻率", "稽核責任"],
  [
    ["雙週進度燈號", "對照甘特圖工項，紅黃綠燈呈現", "雙週", "PM 提交，總管理處審視"],
    ["階段交付物簽核", "SOP 文件、條款庫、Agent 行為規範、提示詞版本、驗測報告", "每階段", "PE 主管加總管理處共同簽核"],
    ["顧問工時月結對帳", "Intellicon 提供逐週工時表加工項對應", "每月", "總管理處對帳"],
    ["文件完整性閘門通過率", "統計合約 Agent 啟動「文件完整性退回」次數與原因", "每月", "稽核 AI 是否「不對殘缺合約亂判讀」"],
    ["資料閘門通過率", "統計估算 Agent 啟動「資訊充分度退回」次數與原因", "每月", "稽核 AI 是否「不亂推論估算」"],
    ["上線後 KPI 追蹤", "銷售案：估算時間縮短 %、新人上手週期；合約案：紅旗條款識別率、跨部門 review 時間", "上線後每月", "PE 業務主管加總管理處"]
  ],
  [2200, 4500, 1100, 1300]
));

content.push(h2("7.2 為何「文件完整性閘門」與「資料閘門」是核心稽核點"));
content.push(body(
  "AI Agent 最大的風險不是「答錯」，而是「在資料不足時依然輸出看似專業、實則根據不足的結論」。在 PE 案的合約場景中，這個風險特別嚴重 — 一個對殘缺合約做出的「沒看到紅旗條款」結論，可能讓業務以為合約安全，最終造成嚴重損失。文件完整性閘門通過率與資料閘門通過率這兩項指標，能直接反映 Agent 是否依照設計原則「未經完整性與充分度確認，不分析、不推估、不下結論」。"
));

content.push(h2("7.3 進度燈號定義"));
content.push(body(
  "綠燈：工項按時完成，且交付物通過簽核；黃燈：工項延遲不超過 1 週，或有 1 個交付物需補件；紅燈：工項延遲超過 2 週，或有關鍵交付物缺失。任一燈號為紅燈時，PM 須提出補救計畫並送總管理處核准。"
));

// ----- 第八章：組織級知識累積藍圖 -----
content.push(h1("第八章 組織級知識累積藍圖"));

content.push(h2("8.1 PE 三大知識庫的長期價值"));
content.push(body(
  "本案完成後，PE 將累積三個重要的組織級知識庫。這三個知識庫是本案最有長期價值的資產 — 它們會隨著每一個案件結案、每一份合約簽訂、每一次風險處理，持續累積與更新，最終成為 PE 真正屬於組織自己的「決策大腦」。"
));
content.push(genericTable(
  ["知識庫", "建立階段", "長期價值", "回饋更新機制"],
  [
    ["估算項目與歷史案件庫", "本案 Phase 1-2 建立", "每個新案件估算的參考依據；新人快速上手的學習教材", "每個案件結案後，由 PM 回填實際成本與毛利"],
    ["標準合約條款庫", "本案 Phase 1-3 建立", "東元慣用版本的法務防線；新合約 review 的快速比對基準", "法務每季 review 並更新標準條款；遇到客戶提出新條款時補入"],
    ["過往合約風險案例庫", "本案 Phase 1-3 建立", "避免重蹈覆轍的組織記憶；新人法務的訓練素材", "每次合約糾紛或近似案例發生時，由法務 + PM 回填"]
  ],
  [2200, 1500, 4500, 1700]
));

content.push(h2("8.2 三庫合一的「PE 決策大腦」"));
content.push(body(
  "三個知識庫不是各自獨立運作。當業務在估算階段時，銷售流程引導 Agent 會同時引用「估算項目庫」（給公式）、「歷史案件庫」（給參考值）、「過往風險案例庫」（給風險提示）。當業務在合約 review 階段時，合約問答 Agent 會同時引用「標準合約條款庫」（比對東元慣用）、「過往風險案例庫」（識別歷史踩過的坑）。三庫合一的整體效果，遠大於各自獨立運作的價值。"
));

content.push(h2("8.3 後續擴展方向"));
content.push(genericTable(
  ["時程", "擴展方向", "預期投入"],
  [
    ["短期（本案結案後 3-6 個月）", "擴展案件類型範圍（離岸風電、車用動力、海外合約）；加入更多歷史案件回填", "PE 數發處主導，Intellicon 諮詢支援"],
    ["中期（本案結案後 6-12 個月）", "整合 PM 系統，實現案件全週期追蹤；條款庫與 ERP 系統雙向同步", "PE 數發處與 IT 部門合作"],
    ["長期（本案結案後 12 個月以上）", "PE 決策大腦對外延伸：客戶簽約前可由業務直接調用紅旗檢核；投標前可由業務調用估算試算", "PE 業務團隊主導應用方向"]
  ],
  [2200, 5000, 2700]
));

// ----- 第九章：下一步行動 -----
content.push(h1("第九章 下一步行動建議"));

content.push(h2("9.1 行動清單"));
content.push(genericTable(
  ["時程", "行動項目", "負責單位"],
  [
    ["立即行動", "確認本規劃書方向、規模選項（4／5／6 個月）、安排 PE 業務與法務深度訪談排程", "PE 主管 + Intellicon"],
    ["1 週內", "東元數發處啟動 PE 知識庫資料盤點（SOP 文件、設備單價、合約樣本、歷史案件、風險案例）", "數發處 + PE 業務 + Intellicon"],
    ["2 週內（Phase 1 啟動）", "Kickoff Meeting；種子團隊組成（PM 加 1-2 工程師）；訪談排程定案", "PE + Intellicon + 總管理處"],
    ["3 週內（Phase 1 完成）", "業務 / 法務深度訪談完成；SOP 與條款庫骨架建置完成", "種子團隊 + Intellicon"],
    ["2 個月內（Phase 2 完成）", "Agent MVP 雛形完成；第一輪驗測通過", "種子團隊 + Intellicon"],
    ["3.5 個月內（Phase 3 完成）", "Agent v2 內部試用上線；KPI 量測初步結果", "種子團隊 + Intellicon"],
    ["4.5 個月內（Phase 4 完成）", "場景擴展、跨 Agent 協作優化、Final Review", "種子團隊 + Intellicon"],
    ["5 個月內（Phase 5 結案）", "種子團隊培訓認證、正式上線、結案；後續擴展規劃", "PE + 總管理處"]
  ],
  [2000, 5500, 1526]
));

content.push(h2("9.2 PE 端待確認事項"));
content.push(bullet("PE 銷售估算 SOP 文件是否完備？是否能整理為 RAG 可讀的格式？", "b3"));
content.push(bullet("PE 合約檔案管理現況？檔案格式（PDF / Word）？是否有電子簽章版本？", "b3"));
content.push(bullet("第一階段聚焦的案件類型與合約類型範圍？", "b3"));
content.push(bullet("合約問答是否含海外合約、英文合約？（會大幅影響規模）", "b3"));
content.push(bullet("第一線使用者是 PM、業務、法務還是技術？決策流程？", "b3"));
content.push(bullet("銷售估算 SOP 文件由誰負責整理？哪些 PM 願意當第一批種子使用者？", "b3"));
content.push(bullet("資深 PM 與法務深度訪談排程：每位需 8 至 12 小時，建議銷售案訪 2 位 PM、合約案訪 1 位法務加 1 位 PM", "b3"));

content.push(h2("9.3 給總管理處的具體請求"));
content.push(body(
  "請總管理處協助：核准本規劃書與 130 小時顧問時數估算（或依規模選項調整）；指派一位協調窗口參與雙週進度會議；批准 PE 種子團隊（1 PM 加 1-2 工程師）的 5 個月投入承諾；批准數發處投入 PE 知識庫整理所需資源（含法務支援）；確認文件完整性閘門通過率與資料閘門通過率作為核心稽核指標。"
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
    text: "此規劃書基於 PE 事業群提供之題目方向初步估算實施範圍與顧問時數。實際導入細節仍需依據後續業務／法務深度訪談與 PE 內部資料盤點結果調整。",
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
          children: [new TextRun({ text: "5 個月、五階段、兩案併行", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
          children: [new TextRun({ text: "Intellicon 顧問約 130 小時", font: "Microsoft JhengHei", size: 20, color: TEXT_MUTED })] }),
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
  const outputPath = "/sessions/jolly-amazing-franklin/mnt/outputs/東元PE_AI_Agent導入規劃書.docx";
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created: ${outputPath}`);
});

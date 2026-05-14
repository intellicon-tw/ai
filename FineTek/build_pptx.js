const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "桓達科技 EgentHub AI Agent 導入提案";
pres.author = "精誠資訊 × 智慧方案 Intellicon Solutions";

// ── 色票 ──────────────────────────────────────────────────
const C = {
  navy:    "0B2C5E",
  navyL:   "1A4A8A",
  orange:  "E05C1A",
  orangeL: "F4845F",
  white:   "FFFFFF",
  offW:    "F4F7FB",
  gray:    "5A6680",
  grayL:   "DDE3ED",
  grayXL:  "F4F6FA",
  kb:      "1A4A8A",
  proc:    "1A6B3A",
  data:    "7B3EA8",
  ts:      "C05000",
  text:    "1A2340",
};

const makeShadow = () => ({
  type: "outer", blur: 8, offset: 3, angle: 135,
  color: "000000", opacity: 0.12,
});

// pptxgenjs 只支援 6 位 hex；此 map 提供各主色的淺底色版本
const LIGHT_COLOR = {
  "1A4A8A": "E8F0FB",
  "1A6B3A": "E8F5EE",
  "7B3EA8": "F3ECF8",
  "C05000": "FFF0E6",
  "E05C1A": "FFF0E6",
};
function light(hex) {
  return LIGHT_COLOR[(hex || "").toUpperCase()] || "F5F5F5";
}

// ══════════════════════════════════════════════════════════
// Slide 1 — 封面
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // 橘色左側寬條
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  // 主標題
  s.addText("桓達科技（FineTek）", {
    x: 0.6, y: 1.0, w: 8.0, h: 0.6,
    fontSize: 20, color: "AABDD8", bold: false, margin: 0,
  });
  s.addText("EgentHub AI Agent\n導入提案", {
    x: 0.6, y: 1.55, w: 8.5, h: 2.0,
    fontSize: 44, color: C.white, bold: true, margin: 0,
  });

  // 副標題 badges
  const badges = [
    { label: "7 個工作室", x: 0.6 },
    { label: "19 個 AI 助理", x: 2.5 },
    { label: "POC 開發包已備妥", x: 4.7 },
  ];
  badges.forEach(b => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: b.x, y: 3.65, w: 1.7, h: 0.38,
      fill: { color: "1E4A82" }, line: { color: "3A6AAA" }, rectRadius: 0.05,
    });
    s.addText(b.label, {
      x: b.x, y: 3.65, w: 1.7, h: 0.38,
      fontSize: 11, color: C.white, align: "center", valign: "middle", margin: 0,
    });
  });

  // 分隔線
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 4.25, w: 8.8, h: 0,
    line: { color: "2A4A7A", width: 1 },
  });

  // 提案資訊
  s.addText("提案單位", {
    x: 0.6, y: 4.42, w: 2.0, h: 0.28,
    fontSize: 11, color: "7A99C0", margin: 0,
  });
  s.addText("精誠資訊股份有限公司  Systex Corporation", {
    x: 0.6, y: 4.70, w: 6.0, h: 0.32,
    fontSize: 14, color: C.white, bold: true, margin: 0,
  });
  s.addText("技術合作夥伴：智慧方案股份有限公司  Intellicon Solutions LLC", {
    x: 0.6, y: 5.02, w: 8.0, h: 0.28,
    fontSize: 11, color: "7A99C0", margin: 0,
  });

  // 右下 EgentHub logo 文字
  s.addText("EgentHub", {
    x: 7.8, y: 4.6, w: 2.0, h: 0.6,
    fontSize: 22, color: C.orange, bold: true, align: "right", margin: 0,
  });
  s.addText("Enterprise AI Agent Platform", {
    x: 6.6, y: 5.1, w: 3.2, h: 0.28,
    fontSize: 9, color: "7A99C0", align: "right", margin: 0,
  });
}

// ══════════════════════════════════════════════════════════
// Slide 2 — 桓達科技背景
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  // 頂部深藍條
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("關於桓達科技", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  // 左欄 — 公司簡介
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.95, w: 4.3, h: 4.3,
    fill: { color: C.offW }, line: { color: C.grayL },
    shadow: makeShadow(),
  });
  s.addText("公司概覽", {
    x: 0.65, y: 1.1, w: 3.8, h: 0.32,
    fontSize: 13, color: C.navy, bold: true, margin: 0,
  });
  const intro = [
    { text: "股票代號：4549（上櫃，2014）", options: { bullet: true, breakLine: true } },
    { text: "品牌：FineTek（亞洲第一大工業電子感測器）", options: { bullet: true, breakLine: true } },
    { text: "旗下品牌：mutec Instrument（歐洲）、A+Fine（北美）", options: { bullet: true, breakLine: true } },
    { text: "五座製造工廠：台灣 3 座、上海 1 座、德國 1 座", options: { bullet: true, breakLine: true } },
    { text: "全球銷售據點：中國 9 子公司 + 新加坡、印尼、馬來西亞、德國、美國", options: { bullet: true, breakLine: true } },
    { text: "200+ 全球專利、100+ 工業認證", options: { bullet: true, breakLine: true } },
    { text: "荣获 第 20 屆國家品質獎、國家磐石獎", options: { bullet: true } },
  ];
  s.addText(intro, {
    x: 0.65, y: 1.5, w: 3.85, h: 3.5,
    fontSize: 11.5, color: C.text, valign: "top", margin: 0,
    paraSpaceAfter: 5,
  });

  // 右欄 — 4 個產業特性卡片
  const cards = [
    { title: "感測器製造", desc: "料位、流量、溫濕度、壓力感測器，製程高度仰賴技術文件與規格管理", color: C.navyL },
    { title: "全球多廠布局", desc: "5 座工廠、跨國業務、多語言溝通需求，資訊標準化挑戰大", color: C.proc },
    { title: "研發驅動", desc: "200+ 專利、參與 IEC 國際標準制定，研發知識管理需求迫切", color: C.data },
    { title: "多認證體系", desc: "ATEX、IECEx、ASME、CE、UL 等複雜認證，查詢效率直接影響出口速度", color: C.ts },
  ];
  cards.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 5.0 + col * 2.4, y = 0.95 + row * 2.15;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.2, h: 1.85,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 2.2, h: 0.1,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.title, {
      x: x + 0.12, y: y + 0.18, w: 1.96, h: 0.32,
      fontSize: 12, color: c.color, bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: x + 0.12, y: y + 0.55, w: 1.96, h: 1.1,
      fontSize: 10, color: C.gray, margin: 0,
    });
  });

  // 底部頁碼
  s.addText("02", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 3 — EgentHub 平台介紹
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("EgentHub — 企業 AI Agent 管理平台", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  // 核心定位
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.92, w: 9.2, h: 0.68,
    fill: { color: "E8F0FB" }, line: { color: "C0D0F0" },
  });
  s.addText("協助企業將標準作業流程（SOP）轉化為客製化 AI 助理，實現「AI 人機協作」，最終讓客戶具備自主開發 AI Agent 的能力。", {
    x: 0.65, y: 0.92, w: 8.7, h: 0.68,
    fontSize: 12.5, color: C.navyL, bold: false, valign: "middle", margin: 0,
  });

  // 四大價值
  const values = [
    { icon: "快", title: "導入快", desc: "無需 IT 背景，幾個步驟部署專屬 AI 助理" },
    { icon: "開", title: "開發快", desc: "Prompt Designer 問答引導，非工程師也能設計 Agent" },
    { icon: "整", title: "整合快", desc: "支援 MCP / Function Call，與既有系統無縫串接" },
    { icon: "學", title: "學習快", desc: "300+ 場導入課程，陪跑企業從做中學" },
  ];
  values.forEach((v, i) => {
    const x = 0.4 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.82, w: 2.15, h: 2.2,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    // 橘色圓圈 icon
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.7, y: 1.98, w: 0.75, h: 0.75,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(v.icon, {
      x: x + 0.7, y: 1.98, w: 0.75, h: 0.75,
      fontSize: 18, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    s.addText(v.title, {
      x: x + 0.12, y: 2.88, w: 1.9, h: 0.32,
      fontSize: 13, color: C.navy, bold: true, align: "center", margin: 0,
    });
    s.addText(v.desc, {
      x: x + 0.12, y: 3.24, w: 1.9, h: 0.65,
      fontSize: 10.5, color: C.gray, align: "center", margin: 0,
    });
  });

  // 技術亮點
  const techs = [
    "模型中立（Claude / GPT / Gemini）",
    "三層權限架構（公司 / 工作室 / Agent）",
    "三種知識庫（向量 RAG / 表格 SQL / 全文查找）",
    "容器化部署，支援私有雲 / AWS",
  ];
  techs.forEach((t, i) => {
    const x = (i < 2) ? 0.4 : 5.1;
    const y = 4.25 + (i % 2) * 0.35;
    s.addShape(pres.shapes.OVAL, {
      x, y: y + 0.06, w: 0.18, h: 0.18,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    s.addText(t, { x: x + 0.26, y, w: 4.5, h: 0.3, fontSize: 11, color: C.text, margin: 0 });
  });

  s.addText("03", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 4 — 三類 Agent 說明
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("本次 POC 規劃：三類 19 個 AI 助理", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  const cats = [
    {
      color: C.kb, num: "5", label: "知識庫型",
      sub: "需預先建立文件知識庫",
      desc: "上線後 AI 能精準查詢產品規格、BOM 料號、SOP 文件、認證法規等企業知識，回答準確度高、可持續維護。",
      items: ["產品選型推薦", "業務FAQ話術", "認證法規查詢", "BOM料號查詢", "SOP查詢"],
      kb: "需準備 CSV / TXT 知識庫文件",
    },
    {
      color: C.proc, num: "9", label: "流程優化型",
      sub: "文件輸入 → 結構化輸出",
      desc: "上傳會議記錄、檢測報告、報價單等文件，AI 自動整理輸出，取代人工反覆填表，最快可在幾週內上線。",
      items: ["客戶需求整理", "8D異常報告", "檢測報告辨識", "報價單比對", "會議紀錄", "公文撰寫", "英文信件", "研發週報", "工單異常"],
      kb: "部分需兩階段隔離（PDF辨識）",
    },
    {
      color: C.data, num: "5", label: "數據分析型",
      sub: "貼入數據即分析，零門檻",
      desc: "無需預建知識庫，貼入數字或描述，AI 即時分析趨勢、搜尋市場情報、計算產能利用率，最適合 POC 首批展示。",
      items: ["品質趨勢分析", "產能利用率", "專利查詢", "供應商開發", "海外市場情報"],
      kb: "即開即用，三個使用 Google Search",
    },
  ];

  cats.forEach((c, i) => {
    const x = 0.3 + i * 3.23;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 3.05, h: 4.52,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    // 頂色條
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 0.88, w: 3.05, h: 0.12,
      fill: { color: c.color }, line: { color: c.color },
    });
    // 大數字
    s.addText(c.num, {
      x: x + 0.15, y: 1.05, w: 0.8, h: 0.8,
      fontSize: 52, color: c.color, bold: true, margin: 0,
    });
    s.addText("個", {
      x: x + 0.9, y: 1.55, w: 0.5, h: 0.35,
      fontSize: 14, color: c.color, margin: 0,
    });
    s.addText(c.label, {
      x: x + 0.15, y: 1.92, w: 2.75, h: 0.38,
      fontSize: 16, color: c.color, bold: true, margin: 0,
    });
    s.addText(c.sub, {
      x: x + 0.15, y: 2.32, w: 2.75, h: 0.3,
      fontSize: 10, color: C.gray, italic: true, margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.15, y: 2.68, w: 2.72, h: 0,
      line: { color: C.grayL, width: 0.75 },
    });
    s.addText(c.desc, {
      x: x + 0.15, y: 2.76, w: 2.75, h: 1.05,
      fontSize: 10.5, color: C.text, margin: 0,
    });
    // items
    const itemTexts = c.items.map((it, idx) => ({
      text: it,
      options: { bullet: true, breakLine: idx < c.items.length - 1, fontSize: 10 },
    }));
    s.addText(itemTexts, {
      x: x + 0.15, y: 3.88, w: 2.75, h: 0.95,
      color: C.text, margin: 0, paraSpaceAfter: 2,
    });
    // 底部提示
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 5.08, w: 3.05, h: 0.32,
      fill: { color: light(c.color) }, line: { color: c.color },
    });
    s.addText(c.kb, {
      x: x + 0.1, y: 5.08, w: 2.9, h: 0.32,
      fontSize: 9.5, color: c.color, bold: true, valign: "middle", margin: 0,
    });
  });

  s.addText("04", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 5 — 7 個工作室概覽
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("7 個工作室 · 19 個 AI 助理總覽", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  const workspaces = [
    { num: "1", name: "業務", agents: ["產品選型推薦", "業務話術FAQ", "客戶需求整理"], types: ["kb","kb","process"] },
    { num: "2", name: "研發技術", agents: ["認證法規查詢", "BOM料號查詢", "研發週報", "專利查詢"], types: ["kb","kb","process","data"] },
    { num: "3", name: "品質管理", agents: ["8D異常報告", "檢測報告辨識", "品質趨勢分析"], types: ["process","process","data"] },
    { num: "4", name: "採購", agents: ["報價單辨識比對", "供應商開發建議"], types: ["process","data"] },
    { num: "5", name: "生產管理", agents: ["SOP查詢", "工單異常分析", "產能利用率"], types: ["kb","process","data"] },
    { num: "6", name: "管理部", agents: ["會議紀錄", "公文撰寫"], types: ["process","process"] },
    { num: "7", name: "國際業務", agents: ["英文商務信件", "海外市場情報"], types: ["process","data"] },
  ];
  const typeColor = { kb: C.kb, process: C.proc, data: C.data };

  workspaces.forEach((ws, i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const x = 0.25 + col * 2.43;
    const y = 0.88 + row * 2.35;
    const w = 2.22, h = 2.15;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    // 左橘條
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 0.12, w: 0.07, h: 0.52,
      fill: { color: C.orange }, line: { color: C.orange },
    });
    // 工作室編號 + 名稱
    s.addText(ws.num, {
      x: x + 0.16, y: y + 0.12, w: 0.38, h: 0.28,
      fontSize: 18, color: C.navy, bold: true, margin: 0,
    });
    s.addText(ws.name + "工作室", {
      x: x + 0.16, y: y + 0.42, w: 2.0, h: 0.24,
      fontSize: 11, color: C.navy, bold: true, margin: 0,
    });
    // Agent 列表
    ws.agents.forEach((ag, j) => {
      const ty = ws.types[j];
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.16, y: y + 0.78 + j * 0.38 + 0.06,
        w: 0.12, h: 0.12,
        fill: { color: typeColor[ty] }, line: { color: typeColor[ty] },
      });
      s.addText(ag, {
        x: x + 0.34, y: y + 0.78 + j * 0.38,
        w: 1.8, h: 0.32,
        fontSize: 10, color: C.text, margin: 0,
      });
    });
  });

  // 圖例
  const legends = [
    { color: C.kb,   label: "知識庫型" },
    { color: C.proc, label: "流程優化型" },
    { color: C.data, label: "數據分析型" },
  ];
  legends.forEach((l, i) => {
    const lx = 0.3 + i * 1.9;
    s.addShape(pres.shapes.RECTANGLE, {
      x: lx, y: 5.28, w: 0.14, h: 0.14,
      fill: { color: l.color }, line: { color: l.color },
    });
    s.addText(l.label, {
      x: lx + 0.2, y: 5.24, w: 1.5, h: 0.24,
      fontSize: 10, color: C.gray, margin: 0,
    });
  });
  s.addText("05", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 6 — 代表 Agent 精選（3 個示範案例）
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("代表 Agent 示範 — 三種類型各一", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  const demos = [
    {
      color: C.kb, label: "知識庫型",
      num: "1.1", name: "產品選型推薦助理",
      ws: "業務工作室",
      scenario: "客戶輸入：石化廠乙醇液位量測，ATEX Zone1，4-20mA，5m 量程",
      output: "AI 推薦 FTG-200 導波雷達，列出型號、防爆認證、輸出訊號、符合說明，並附備注",
      value: "取代業務手動翻型錄，選型時間從 30 分鐘縮短至 30 秒",
    },
    {
      color: C.proc, label: "流程優化型",
      num: "3.1", name: "異常報告撰寫助理（8D）",
      ws: "品質管理工作室",
      scenario: "品工輸入：FTE-100-A 誤動作，批號 LOT-240310，20 台已出貨，暫停剩餘出貨",
      output: "AI 輸出完整 8D 格式報告，D0–D3 自動填入，D4–D8 附引導提示，可直接發送客戶",
      value: "8D 報告撰寫時間從 2 小時縮短至 10 分鐘，品工專注根本原因分析",
    },
    {
      color: C.data, label: "數據分析型",
      num: "5.3", name: "產能利用率分析助理",
      ws: "生產管理工作室",
      scenario: "生管貼入：4 條產線 3 月份設計產能與實際產出數字",
      output: "AI 計算各產線利用率，標出瓶頸站（產線C 103%）與閒置站（產線D 63%），附改善建議",
      value: "每月產能報告製作時間從 3 小時縮短至 5 分鐘，零知識庫準備",
    },
  ];

  demos.forEach((d, i) => {
    const y = 0.88 + i * 1.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 9.4, h: 1.38,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    // 左色條
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.3, y, w: 0.12, h: 1.38,
      fill: { color: d.color }, line: { color: d.color },
    });
    // 標籤
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y: y + 0.14, w: 0.82, h: 0.22,
      fill: { color: d.color }, line: { color: d.color },
    });
    s.addText(d.label, {
      x: 0.55, y: y + 0.14, w: 0.82, h: 0.22,
      fontSize: 9, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    // Agent 名稱
    s.addText(`${d.num} ${d.name}`, {
      x: 1.48, y: y + 0.12, w: 4.0, h: 0.3,
      fontSize: 13, color: d.color, bold: true, margin: 0,
    });
    s.addText(d.ws, {
      x: 1.48, y: y + 0.44, w: 2.5, h: 0.22,
      fontSize: 10, color: C.gray, margin: 0,
    });
    // 輸入/輸出
    s.addText("輸入  " + d.scenario, {
      x: 1.48, y: y + 0.7, w: 4.8, h: 0.28,
      fontSize: 10, color: C.text, margin: 0,
    });
    s.addText("輸出  " + d.output, {
      x: 1.48, y: y + 1.0, w: 4.8, h: 0.28,
      fontSize: 10, color: C.text, margin: 0,
    });
    // 右欄 — 價值
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.52, y: y + 0.14, w: 3.0, h: 1.1,
      fill: { color: light(d.color) }, line: { color: d.color },
    });
    s.addText("效益", {
      x: 6.65, y: y + 0.18, w: 1.0, h: 0.22,
      fontSize: 9, color: d.color, bold: true, margin: 0,
    });
    s.addText(d.value, {
      x: 6.65, y: y + 0.42, w: 2.7, h: 0.75,
      fontSize: 10, color: C.text, margin: 0,
    });
  });

  s.addText("06", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 7 — 兩階段隔離說明
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("技術亮點：兩階段對話隔離機制", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  // 說明框
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.88, w: 9.4, h: 0.52,
    fill: { color: "FFF3EC" }, line: { color: "F4B48A" },
  });
  s.addText("本次 POC 有 2 個 Agent 需要此設計：3.2 檢測報告辨識助理、4.1 報價單辨識比對助理", {
    x: 0.5, y: 0.88, w: 9.0, h: 0.52,
    fontSize: 12, color: C.ts, bold: true, valign: "middle", margin: 0,
  });

  // 流程圖
  const steps = [
    { num: "1", title: "使用者上傳", desc: "PDF 或圖片格式的檢測報告 / 報價單", color: C.navy },
    { num: "S1", title: "步驟一：圖像理解", desc: "AI 專注讀取文件\n嚴禁調用知識庫\n輸出結構化文字", color: C.ts },
    { num: "S2", title: "步驟二：知識庫查詢", desc: "依步驟一文字結果\n查詢規格合格範圍\n輸出比對判定表", color: C.kb },
    { num: "2", title: "使用者取得結果", desc: "合格 / 不合格判定表\n可直接用於品質報告", color: C.proc },
  ];

  steps.forEach((st, i) => {
    const x = 0.5 + i * 2.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.6, w: 2.1, h: 2.8,
      fill: { color: C.white }, line: { color: st.color },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.65, y: 1.72, w: 0.8, h: 0.8,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(st.num, {
      x: x + 0.65, y: 1.72, w: 0.8, h: 0.8,
      fontSize: 16, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    s.addText(st.title, {
      x: x + 0.1, y: 2.65, w: 1.9, h: 0.4,
      fontSize: 11, color: st.color, bold: true, align: "center", margin: 0,
    });
    s.addText(st.desc, {
      x: x + 0.1, y: 3.1, w: 1.9, h: 1.0,
      fontSize: 10, color: C.text, align: "center", margin: 0,
    });
    // 箭頭
    if (i < 3) {
      s.addShape(pres.shapes.LINE, {
        x: x + 2.12, y: 3.0, w: 0.22, h: 0,
        line: { color: C.grayL, width: 2 },
      });
      s.addText("▶", {
        x: x + 2.25, y: 2.87, w: 0.2, h: 0.25,
        fontSize: 11, color: C.grayL, margin: 0,
      });
    }
  });

  // 原因說明
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 4.62, w: 9.4, h: 0.72,
    fill: { color: "F0F4FA" }, line: { color: C.grayL },
  });
  s.addText("為什麼需要兩階段？", {
    x: 0.5, y: 4.66, w: 2.2, h: 0.3,
    fontSize: 11, color: C.navy, bold: true, margin: 0,
  });
  s.addText("EgentHub 的 LLM 同時讀取圖片並調用知識庫時，視覺記憶會干擾工具查詢結果，導致輸出產生幻覺。隔離兩個動作為獨立對話回合，是目前業界最穩定的解法。", {
    x: 0.5, y: 4.97, w: 9.0, h: 0.3,
    fontSize: 10.5, color: C.text, margin: 0,
  });

  s.addText("07", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 8 — 三階段導入時程
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("建議導入時程 — 三階段滾動上線", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  // 時間軸線
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 2.55, w: 8.8, h: 0,
    line: { color: C.grayL, width: 2 },
  });
  [0, 3.6, 7.2].forEach(pos => {
    s.addShape(pres.shapes.OVAL, {
      x: 0.6 + pos - 0.1, y: 2.45, w: 0.2, h: 0.2,
      fill: { color: C.grayL }, line: { color: C.grayL },
    });
  });
  s.addShape(pres.shapes.OVAL, {
    x: 0.6 + 8.8 - 0.1, y: 2.45, w: 0.2, h: 0.2,
    fill: { color: C.navy }, line: { color: C.navy },
  });

  const phases = [
    {
      phase: "Phase 1", weeks: "第 1–4 週", title: "快速啟動",
      type: "數據分析型 (5)", color: C.data,
      agents: ["品質趨勢分析", "產能利用率分析", "專利查詢", "供應商開發建議", "海外市場情報"],
      key: "零知識庫門檻，立即上線，讓員工看到 AI 效益",
    },
    {
      phase: "Phase 2", weeks: "第 5–8 週", title: "流程植入",
      type: "流程優化型 (9)", color: C.proc,
      agents: ["客戶需求整理", "8D異常報告", "報價單比對", "會議紀錄", "公文撰寫", "英文信件", "研發週報", "工單異常", "檢測報告辨識"],
      key: "部分 Agent 需要兩階段設定，效果直觀，適合對外展示",
    },
    {
      phase: "Phase 3", weeks: "第 9–16 週", title: "知識深化",
      type: "知識庫型 (5)", color: C.kb,
      agents: ["產品選型推薦", "業務話術FAQ", "認證法規查詢", "BOM料號查詢", "SOP查詢"],
      key: "知識庫建置週期較長，需各部門配合提供文件",
    },
  ];

  phases.forEach((p, i) => {
    const x = 0.4 + i * 3.22;
    // 上方標籤
    s.addText(p.weeks, {
      x, y: 1.0, w: 3.0, h: 0.26,
      fontSize: 10, color: C.gray, margin: 0,
    });
    s.addText(p.phase + " — " + p.title, {
      x, y: 1.28, w: 3.0, h: 0.34,
      fontSize: 13, color: p.color, bold: true, margin: 0,
    });
    // 時間軸節點
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.4, y: 2.45, w: 0.2, h: 0.2,
      fill: { color: p.color }, line: { color: p.color },
    });
    // 下方卡片
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.78, w: 3.05, h: 2.62,
      fill: { color: C.white }, line: { color: p.color },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.78, w: 3.05, h: 0.1,
      fill: { color: p.color }, line: { color: p.color },
    });
    s.addText(p.type, {
      x: x + 0.12, y: 2.94, w: 2.8, h: 0.28,
      fontSize: 11, color: p.color, bold: true, margin: 0,
    });
    const agentItems = p.agents.map((ag, j) => ({
      text: ag,
      options: { bullet: true, breakLine: j < p.agents.length - 1, fontSize: 10 },
    }));
    s.addText(agentItems, {
      x: x + 0.12, y: 3.26, w: 2.8, h: 1.38,
      color: C.text, margin: 0, paraSpaceAfter: 2,
    });
    // 重點說明
    s.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.08, y: 5.08, w: 2.9, h: 0.25,
      fill: { color: light(p.color) }, line: { color: light(p.color) },
    });
    s.addText(p.key, {
      x: x + 0.12, y: 5.08, w: 2.85, h: 0.25,
      fontSize: 9, color: p.color, margin: 0, valign: "middle",
    });
  });

  s.addText("08", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 9 — POC 開發包說明
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.72,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("每個 AI 助理均已備妥完整 POC 開發包", {
    x: 0.4, y: 0, w: 9, h: 0.72,
    fontSize: 20, color: C.white, bold: true, valign: "middle", margin: 0,
  });

  // 說明
  s.addText("本提案的 19 個 AI 助理，每一個都已產出完整的四份交付文件，可直接複製貼上部署至 EgentHub。", {
    x: 0.4, y: 0.85, w: 9.2, h: 0.38,
    fontSize: 12, color: C.text, margin: 0,
  });

  // 四個文件卡片
  const files = [
    { num: "1", name: "1_prompt.txt", desc: "完整系統提示詞（含角色、任務、執行流程、輸出格式）\n可直接複製貼上到 EgentHub Agent 設定頁", color: C.navyL },
    { num: "2", name: "2_知識庫範例資料/", desc: "CSV 表格或 TXT 文本格式的知識庫範例\n可直接上傳到 EgentHub 對應的知識庫類型", color: C.proc },
    { num: "3", name: "3_驗測情境.txt", desc: "測試資料集（可直接貼到對話框）+\n驗測情境（預期輸出、驗證重點）", color: C.data },
    { num: "4", name: "4_上線準備指南.txt", desc: "知識庫設定步驟、模型選擇建議、\n上線 Checklist、首 2 週監控指標", color: C.ts },
  ];

  files.forEach((f, i) => {
    const x = 0.35 + i * 2.38;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.42, w: 2.18, h: 3.15,
      fill: { color: C.white }, line: { color: C.grayL },
      shadow: makeShadow(),
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.67, y: 1.56, w: 0.84, h: 0.84,
      fill: { color: f.color }, line: { color: f.color },
    });
    s.addText(f.num, {
      x: x + 0.67, y: 1.56, w: 0.84, h: 0.84,
      fontSize: 28, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    s.addText(f.name, {
      x: x + 0.1, y: 2.55, w: 1.98, h: 0.4,
      fontSize: 11, color: f.color, bold: true, align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: x + 0.2, y: 3.02, w: 1.78, h: 0,
      line: { color: C.grayL, width: 0.75 },
    });
    s.addText(f.desc, {
      x: x + 0.1, y: 3.1, w: 1.98, h: 1.2,
      fontSize: 10, color: C.text, align: "center", margin: 0,
    });
  });

  // 底部量化
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 4.75, w: 9.3, h: 0.62,
    fill: { color: "E8F0FB" }, line: { color: "C0D0F0" },
  });
  const stats = [
    { num: "19", label: "個 AI 助理 Prompt" },
    { num: "71", label: "個交付檔案" },
    { num: "8", label: "個知識庫範例（CSV/TXT）" },
    { num: "2", label: "個兩階段隔離設計" },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 2.3;
    s.addText(st.num, {
      x, y: 4.8, w: 0.8, h: 0.5,
      fontSize: 26, color: C.navyL, bold: true, align: "right", valign: "middle", margin: 0,
    });
    s.addText(st.label, {
      x: x + 0.85, y: 4.88, w: 1.35, h: 0.3,
      fontSize: 10.5, color: C.text, margin: 0,
    });
  });

  s.addText("09", { x: 9.5, y: 5.3, w: 0.4, h: 0.2, fontSize: 9, color: C.grayL, align: "right", margin: 0 });
}

// ══════════════════════════════════════════════════════════
// Slide 10 — 下一步
// ══════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  // 橘色左條
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: C.orange }, line: { color: C.orange },
  });

  s.addText("下一步", {
    x: 0.6, y: 0.55, w: 8.8, h: 0.5,
    fontSize: 15, color: "7A99C0", margin: 0,
  });
  s.addText("啟動 POC 的三件事", {
    x: 0.6, y: 1.0, w: 8.8, h: 0.7,
    fontSize: 36, color: C.white, bold: true, margin: 0,
  });

  const nexts = [
    {
      n: "01", title: "確認優先工作室",
      desc: "從業務、品管、生產管理三個工作室中選定 1–2 個作為 POC 起點，指定種子團隊 2–3 人。",
      color: C.orange,
    },
    {
      n: "02", title: "準備知識庫原始資料",
      desc: "Phase 3 知識庫型 Agent 需要各部門提供：產品規格表、BOM 匯出、SOP 文件、業務 FAQ。",
      color: "5A9FE8",
    },
    {
      n: "03", title: "EgentHub 帳號開通",
      desc: "精誠資訊協助申請 EgentHub SaaS 試用帳號，智慧方案顧問提供導入陪跑與 Prompt 複製上傳協助。",
      color: "4BC78A",
    },
  ];

  nexts.forEach((nx, i) => {
    const y = 1.95 + i * 1.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55, y, w: 8.9, h: 0.92,
      fill: { color: "0F3870" }, line: { color: "1E4A8A" },
    });
    s.addText(nx.n, {
      x: 0.72, y: y + 0.08, w: 0.65, h: 0.76,
      fontSize: 30, color: nx.color, bold: true, valign: "middle", align: "center", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: 1.45, y: y + 0.18, w: 0, h: 0.56,
      line: { color: "2A5090", width: 1.5 },
    });
    s.addText(nx.title, {
      x: 1.62, y: y + 0.1, w: 7.5, h: 0.28,
      fontSize: 13, color: C.white, bold: true, margin: 0,
    });
    s.addText(nx.desc, {
      x: 1.62, y: y + 0.44, w: 7.5, h: 0.4,
      fontSize: 11, color: "AABDD8", margin: 0,
    });
  });

  // 聯絡資訊
  s.addShape(pres.shapes.LINE, {
    x: 0.6, y: 5.18, w: 8.8, h: 0,
    line: { color: "1E3A6A", width: 1 },
  });
  s.addText("精誠資訊股份有限公司  ·  技術合作：智慧方案 Intellicon Solutions  ·  EgentHub 企業 AI Agent 管理平台", {
    x: 0.6, y: 5.25, w: 9.0, h: 0.25,
    fontSize: 9, color: "5A7AA0", align: "center", margin: 0,
  });
}

// ── 輸出 ──────────────────────────────────────────────────
pres.writeFile({ fileName: "/sessions/practical-confident-gauss/mnt/outputs/桓達科技_EgentHub提案.pptx" })
  .then(() => console.log("完成：桓達科技_EgentHub提案.pptx"))
  .catch(e => { console.error(e); process.exit(1); });

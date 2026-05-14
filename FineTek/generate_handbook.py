"""
generate_handbook.py
把 桓達科技_Agents/ 的所有開發包內容嵌入單一 HTML，
方便剪貼與示範給客戶看開發過程。
"""
import os, json, re

BASE = "/sessions/practical-confident-gauss/mnt/outputs/桓達科技_Agents"
OUT  = "/sessions/practical-confident-gauss/mnt/outputs/桓達科技_開發手冊.html"

# ── 讀取所有 Agent 資料 ──────────────────────────────────────
WORKSPACES_META = [
    ("工作室1_業務",     ["1.1_產品選型推薦助理","1.2_業務話術與FAQ助理","1.3_客戶需求整理助理"]),
    ("工作室2_研發技術", ["2.1_認證法規查詢助理","2.2_BOM料號查詢助理","2.3_研發週報撰寫助理","2.4_專利查詢助理"]),
    ("工作室3_品質管理", ["3.1_異常報告撰寫助理（8D）","3.2_檢測報告辨識助理","3.3_品質異常趨勢分析助理"]),
    ("工作室4_採購",     ["4.1_報價單辨識比對助理","4.2_供應商開發建議助理"]),
    ("工作室5_生產管理", ["5.1_SOP查詢助理","5.2_工單異常分析助理","5.3_產能利用率分析助理"]),
    ("工作室6_管理部",   ["6.1_會議紀錄助理","6.2_公文撰寫助理"]),
    ("工作室7_國際業務", ["7.1_英文商務信件撰寫助理","7.2_海外市場情報助理"]),
]

TYPE_MAP = {
    "1.1":"kb","1.2":"kb","1.3":"process",
    "2.1":"kb","2.2":"kb","2.3":"process","2.4":"data",
    "3.1":"process","3.2":"process","3.3":"data",
    "4.1":"process","4.2":"data",
    "5.1":"kb","5.2":"process","5.3":"data",
    "6.1":"process","6.2":"process",
    "7.1":"process","7.2":"data",
}
TWO_STAGE = {"3.2","4.1"}

def read_file(path):
    if not os.path.exists(path): return ""
    with open(path, encoding="utf-8") as f: return f.read()

def read_kb_files(agent_dir):
    kb_dir = os.path.join(agent_dir, "2_知識庫範例資料")
    if not os.path.isdir(kb_dir): return []
    files = []
    for fn in sorted(os.listdir(kb_dir)):
        fp = os.path.join(kb_dir, fn)
        enc = "utf-8-sig" if fn.endswith(".csv") else "utf-8"
        try:
            with open(fp, encoding=enc) as f: content = f.read()
        except:
            content = "(無法讀取)"
        files.append({"name": fn, "content": content})
    return files

def collect():
    data = []
    for ws_folder, agents in WORKSPACES_META:
        ws_path = os.path.join(BASE, ws_folder)
        ws_agents = []
        for agent_name in agents:
            num = agent_name.split("_")[0]
            agent_path = os.path.join(ws_path, agent_name)
            prompt    = read_file(os.path.join(agent_path, "1_prompt.txt"))
            scenarios = read_file(os.path.join(agent_path, "3_驗測情境.txt"))
            launch    = read_file(os.path.join(agent_path, "4_正式上線前的準備指南.txt"))
            kb_files  = read_kb_files(agent_path)
            ws_agents.append({
                "num": num,
                "name": agent_name.split("_", 1)[1],
                "type": TYPE_MAP.get(num, "process"),
                "two_stage": num in TWO_STAGE,
                "prompt": prompt,
                "scenarios": scenarios,
                "launch": launch,
                "kb_files": kb_files,
            })
        data.append({"folder": ws_folder, "ws_name": ws_folder.split("_",1)[1], "agents": ws_agents})
    return data

# ── HTML 產生 ──────────────────────────────────────────────
def esc(s):
    return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace('"','&quot;')

def parse_prompt(raw):
    """把 1_prompt.txt 拆成 (meta_html, prompt_only)
    meta_html  : 所屬工作室/知識庫/工具/兩階段隔離等說明的 HTML（顯示在框外）
    prompt_only: 可直接貼入 EgentHub 的純 Prompt 文字（放進暗色框）
    """
    prompt_only = raw.strip()

    # 抓 ```markdown ... ``` 區塊（最常見格式）
    m = re.search(r'```(?:markdown)?\n(.*?)```', raw, re.DOTALL)
    if m:
        prompt_only = m.group(1).strip()
    else:
        # 備用：取 --- 分隔線之後的內容
        parts = raw.split('\n---\n', 1)
        if len(parts) == 2:
            # 再去掉 ## 完整 Prompt 說明行
            after = re.sub(r'^##\s+完整\s*Prompt\s*\n', '', parts[1].lstrip(), flags=re.MULTILINE)
            after = re.sub(r'^>\s+以下內容.*?\n', '', after, flags=re.MULTILINE)
            prompt_only = after.strip()

    # 解析 header（--- 之前）取出 metadata
    parts = raw.split('\n---\n', 1)
    header = parts[0] if parts else raw

    meta_items = []
    for line in header.split('\n'):
        hit = re.match(r'[–\-]\s+\*\*(.+?)\*\*[：:]\s*(.*)', line)
        if hit:
            k, v = hit.group(1).strip(), hit.group(2).strip()
            meta_items.append((k, v))

    meta_html = ""
    if meta_items:
        items_html = "".join(
            f'<span class="meta-item"><span class="meta-key">{esc(k)}</span>'
            f'<span class="meta-val">{esc(v) if v else "—"}</span></span>'
            for k, v in meta_items
        )
        meta_html = f'<div class="prompt-meta">{items_html}</div>'

    return meta_html, prompt_only

TYPE_LABEL = {"kb":"知識庫型","process":"流程優化型","data":"數據分析型"}
TYPE_COLOR = {"kb":"#1a4a8a","process":"#1a6b3a","data":"#7b3ea8"}

def agent_section(a, ws_idx):
    num   = a["num"]
    atype = a["type"]
    ts    = a["two_stage"]
    color = TYPE_COLOR[atype]
    label = TYPE_LABEL[atype]
    uid   = num.replace(".","_")
    meta_html, prompt_only = parse_prompt(a["prompt"])

    tags = f'<span class="tag" style="background:{color}">{label}</span>'
    if ts:   tags += ' <span class="tag tag-ts">兩階段隔離</span>'

    # KB 檔案
    kb_html = ""
    for kf in a["kb_files"]:
        fn = kf['name']
        # 判斷 MIME type
        mime = "text/csv" if fn.endswith(".csv") else "text/plain"
        safe_fn = fn.replace("'", "\\'")
        kb_html += f"""
        <div class="kb-file">
          <div class="kb-file-header">
            <span class="kb-filename">{esc(fn)}</span>
            <div class="kb-btn-group">
              <button class="copy-btn small" onclick="copyText('kb_{uid}_{esc(fn)}')">複製</button>
              <button class="copy-btn small dl-btn" onclick="downloadFile('kb_{uid}_{esc(fn)}','{safe_fn}','{mime}')">下載</button>
            </div>
          </div>
          <pre id="kb_{uid}_{esc(fn)}" class="code-block kb-content">{esc(kf['content'])}</pre>
        </div>"""

    kb_section = ""
    if kb_html:
        kb_section = f"""
      <div class="tab-content" id="tab_{uid}_kb">
        <h4 class="section-sub">知識庫範例資料</h4>
        {kb_html}
      </div>"""
    else:
        kb_section = f"""
      <div class="tab-content" id="tab_{uid}_kb">
        <div class="callout info">本 Agent 不需要預先建立知識庫，屬於純提示工程或即時工具查詢設計。</div>
      </div>"""

    return f"""
  <div class="agent-card" id="agent_{uid}" data-type="{atype}" data-ts="{'1' if ts else '0'}">
    <div class="agent-card-header" onclick="toggleAgent('{uid}')">
      <div class="agent-header-left">
        <span class="agent-num-badge">{num}</span>
        <span class="agent-name">{esc(a['name'])}</span>
        <div class="tag-row">{tags}</div>
      </div>
      <div class="collapse-icon" id="icon_{uid}">▼</div>
    </div>
    <div class="agent-body" id="body_{uid}">
      <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('{uid}','prompt',this)">Prompt</button>
        <button class="tab-btn" onclick="switchTab('{uid}','kb',this)">知識庫範例</button>
        <button class="tab-btn" onclick="switchTab('{uid}','scenarios',this)">驗測情境</button>
        <button class="tab-btn" onclick="switchTab('{uid}','launch',this)">上線指南</button>
      </div>

      <div class="tab-content active" id="tab_{uid}_prompt">
        {meta_html}
        <div class="code-toolbar">
          <span class="code-label">Prompt（可直接貼入 EgentHub）</span>
          <button class="copy-btn" onclick="copyText('prompt_{uid}')">複製全文</button>
        </div>
        <pre id="prompt_{uid}" class="code-block">{esc(prompt_only)}</pre>
      </div>

      {kb_section}

      <div class="tab-content" id="tab_{uid}_scenarios">
        <div class="code-toolbar">
          <span class="code-label">3_驗測情境.txt</span>
          <button class="copy-btn" onclick="copyText('scenarios_{uid}')">複製全文</button>
        </div>
        <pre id="scenarios_{uid}" class="code-block">{esc(a['scenarios'])}</pre>
      </div>

      <div class="tab-content" id="tab_{uid}_launch">
        <div class="code-toolbar">
          <span class="code-label">4_正式上線前的準備指南.txt</span>
          <button class="copy-btn" onclick="copyText('launch_{uid}')">複製全文</button>
        </div>
        <pre id="launch_{uid}" class="code-block">{esc(a['launch'])}</pre>
      </div>
    </div>
  </div>"""

def build_html(data):
    # 側邊導覽
    nav_items = ""
    for ws in data:
        ws_id = ws["folder"].replace(" ","_")
        nav_items += f'<li class="nav-ws"><a href="#{ws_id}">{ws["ws_name"]}</a><ul>'
        for a in ws["agents"]:
            uid = a["num"].replace(".","_")
            nav_items += f'<li><a href="#agent_{uid}" class="nav-agent">{a["num"]} {esc(a["name"])}</a></li>'
        nav_items += "</ul></li>"

    # 工作室區塊
    ws_sections = ""
    for wi, ws in enumerate(data):
        ws_id = ws["folder"].replace(" ","_")
        agents_html = "".join(agent_section(a, wi) for a in ws["agents"])
        ws_sections += f"""
<section class="ws-section" id="{ws_id}">
  <div class="ws-title-row">
    <div class="ws-icon">{wi+1}</div>
    <h2 class="ws-title">{esc(ws['ws_name'])}</h2>
    <span class="ws-badge">{len(ws['agents'])} 個助理</span>
  </div>
  {agents_html}
</section>"""

    total = sum(len(w["agents"]) for w in data)

    return f"""<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>桓達科技 EgentHub 開發手冊 — 精誠資訊</title>
<style>
:root{{
  --primary:#0b2c5e; --primary-l:#1a4a8a; --accent:#e05c1a;
  --bg:#f4f6fb; --surface:#fff; --border:#dde3ed;
  --text:#1a2340; --muted:#5a6680;
  --tag-kb:#1a4a8a; --tag-proc:#1a6b3a; --tag-data:#7b3ea8; --tag-ts:#c05000;
  --nav-w:240px; --shadow:0 2px 12px rgba(11,44,94,.1);
}}
*,*::before,*::after{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:-apple-system,"PingFang TC","Microsoft JhengHei",Arial,sans-serif;
  background:var(--bg);color:var(--text);font-size:14px;line-height:1.6;
  display:flex;flex-direction:column;min-height:100vh}}

/* ── 頂部 bar ── */
.top-bar{{background:linear-gradient(135deg,var(--primary),var(--primary-l));
  color:#fff;padding:18px 28px;display:flex;align-items:center;
  justify-content:space-between;gap:16px;flex-shrink:0;
  border-bottom:3px solid var(--accent);position:sticky;top:0;z-index:200}}
.top-bar h1{{font-size:17px;font-weight:700;line-height:1.2}}
.top-bar .sub{{font-size:12px;opacity:.75;margin-top:2px}}
.top-bar-right{{text-align:right;font-size:12px;opacity:.8}}

/* ── 篩選 bar ── */
.filter-bar{{background:var(--surface);border-bottom:1px solid var(--border);
  padding:10px 28px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;
  position:sticky;top:73px;z-index:190;box-shadow:0 2px 6px rgba(0,0,0,.05)}}
.filter-btn{{padding:5px 14px;border-radius:16px;border:1.5px solid var(--border);
  background:#fff;cursor:pointer;font-size:12px;font-family:inherit;
  color:var(--muted);transition:all .15s}}
.filter-btn:hover{{border-color:var(--primary);color:var(--primary)}}
.filter-btn.active{{color:#fff;border-color:transparent}}
.filter-btn.active[data-f="all"]{{background:var(--primary)}}
.filter-btn.active[data-f="kb"]{{background:var(--tag-kb)}}
.filter-btn.active[data-f="process"]{{background:var(--tag-proc)}}
.filter-btn.active[data-f="data"]{{background:var(--tag-data)}}
.filter-btn.active[data-f="ts"]{{background:var(--tag-ts)}}
.filter-count{{margin-left:auto;font-size:12px;color:var(--muted)}}
.filter-count b{{color:var(--primary)}}

/* ── 主體佈局 ── */
.layout{{display:flex;flex:1;overflow:hidden}}

/* ── 側邊導覽 ── */
.sidenav{{width:var(--nav-w);flex-shrink:0;background:var(--surface);
  border-right:1px solid var(--border);overflow-y:auto;
  position:sticky;top:120px;height:calc(100vh - 120px);padding:16px 0}}
.sidenav ul{{list-style:none}}
.nav-ws>a{{display:block;padding:8px 20px;font-size:13px;font-weight:700;
  color:var(--primary);text-decoration:none}}
.nav-ws>a:hover{{background:#f0f4fa}}
.nav-ws ul{{padding-left:8px;margin-bottom:4px}}
.nav-agent{{display:block;padding:5px 20px;font-size:12px;color:var(--muted);
  text-decoration:none;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}
.nav-agent:hover{{background:#f0f4fa;color:var(--primary)}}

/* ── 內容區 ── */
.content{{flex:1;overflow-y:auto;padding:28px 32px 60px;max-width:960px}}

/* ── 工作室 ── */
.ws-section{{margin-bottom:44px}}
.ws-title-row{{display:flex;align-items:center;gap:12px;margin-bottom:16px}}
.ws-icon{{width:32px;height:32px;border-radius:8px;background:var(--primary);
  color:#fff;display:flex;align-items:center;justify-content:center;
  font-size:15px;font-weight:700;flex-shrink:0}}
.ws-title{{font-size:17px;font-weight:700;color:var(--primary)}}
.ws-badge{{font-size:12px;color:var(--muted);background:#eef2fa;
  padding:2px 10px;border-radius:10px}}

/* ── Agent 卡片 ── */
.agent-card{{background:var(--surface);border:1.5px solid var(--border);
  border-radius:10px;margin-bottom:12px;overflow:hidden;
  box-shadow:var(--shadow);transition:opacity .2s}}
.agent-card.hidden{{display:none}}
.agent-card-header{{display:flex;align-items:center;justify-content:space-between;
  padding:14px 18px;cursor:pointer;user-select:none;gap:12px}}
.agent-card-header:hover{{background:#f8fafd}}
.agent-header-left{{display:flex;align-items:center;gap:10px;flex-wrap:wrap}}
.agent-num-badge{{background:var(--primary);color:#fff;border-radius:5px;
  padding:2px 8px;font-size:12px;font-weight:700;flex-shrink:0}}
.agent-name{{font-size:14px;font-weight:700}}
.tag-row{{display:flex;gap:5px;flex-wrap:wrap}}
.tag{{display:inline-block;padding:2px 9px;border-radius:9px;
  font-size:11px;font-weight:600;color:#fff}}
.tag-ts{{background:var(--tag-ts)}}
.collapse-icon{{font-size:12px;color:var(--muted);flex-shrink:0;
  transition:transform .2s}}
.agent-body{{border-top:1px solid var(--border);display:none}}
.agent-body.open{{display:block}}

/* ── Tabs ── */
.tabs{{display:flex;gap:0;border-bottom:1px solid var(--border);
  padding:0 18px;background:#f8fafd}}
.tab-btn{{padding:9px 16px;border:none;background:transparent;
  font-size:13px;cursor:pointer;color:var(--muted);font-family:inherit;
  border-bottom:2px solid transparent;transition:all .15s}}
.tab-btn:hover{{color:var(--primary)}}
.tab-btn.active{{color:var(--primary);border-bottom-color:var(--primary);font-weight:600}}
.tab-content{{display:none;padding:16px 18px}}
.tab-content.active{{display:block}}
.section-sub{{font-size:13px;font-weight:700;margin-bottom:10px;color:var(--primary)}}

/* ── Prompt metadata 說明（框外） ── */
.prompt-meta{{display:flex;flex-wrap:wrap;gap:8px;
  margin-bottom:10px;padding:10px 14px;
  background:#f0f4fa;border-radius:8px;border:1px solid #dde3ed}}
.meta-item{{display:flex;align-items:center;gap:5px;
  font-size:12px;color:var(--text)}}
.meta-key{{font-weight:700;color:var(--primary);white-space:nowrap}}
.meta-key::after{{content:"：";color:var(--muted)}}
.meta-val{{color:var(--muted)}}
.meta-item:not(:last-child)::after{{content:"｜";color:#c8d0e0;margin-left:8px}}

/* ── 程式碼區塊 ── */
.code-toolbar{{display:flex;align-items:center;justify-content:space-between;
  margin-bottom:6px}}
.code-label{{font-size:12px;color:var(--muted);font-family:monospace}}
.copy-btn{{padding:4px 12px;border-radius:6px;border:1px solid var(--border);
  background:#fff;cursor:pointer;font-size:12px;color:var(--primary);
  font-family:inherit;transition:all .15s}}
.copy-btn:hover{{background:var(--primary);color:#fff;border-color:var(--primary)}}
.copy-btn.small{{padding:2px 8px;font-size:11px}}
.copy-btn.copied{{background:#1a6b3a;color:#fff;border-color:#1a6b3a}}
.code-block{{background:#1e2638;color:#d4daf0;border-radius:8px;
  padding:16px;font-size:12.5px;font-family:"SF Mono","Fira Code",monospace;
  line-height:1.6;white-space:pre-wrap;word-break:break-word;
  max-height:480px;overflow-y:auto;border:1px solid #2a3450}}

/* ── KB 檔案 ── */
.kb-file{{margin-bottom:14px}}
.kb-file-header{{display:flex;align-items:center;justify-content:space-between;
  margin-bottom:5px}}
.kb-filename{{font-size:12px;font-weight:600;color:var(--primary);font-family:monospace}}
.kb-content{{max-height:320px}}

/* ── Callout ── */
.callout{{padding:12px 16px;border-radius:8px;font-size:13px;border-left:4px solid}}
.callout.info{{background:#e8f0fb;border-color:var(--primary-l);color:#1a3a6b}}

/* ── 頁尾 ── */
footer{{text-align:center;padding:20px;font-size:12px;color:var(--muted);
  border-top:1px solid var(--border)}}

@media(max-width:768px){{
  .sidenav{{display:none}}
  .content{{padding:16px 12px 40px}}
}}
</style>
</head>
<body>

<div class="top-bar">
  <div>
    <div class="top-bar h1">桓達科技（FineTek）EgentHub AI 助理開發手冊</div>
    <div class="sub">7 個工作室 · {total} 個 AI 助理 · 每個助理均含完整 Prompt + 知識庫範例 + 驗測情境 + 上線指南</div>
  </div>
  <div class="top-bar-right">
    <div>提案單位：精誠資訊股份有限公司</div>
    <div style="margin-top:3px">技術合作：智慧方案 Intellicon Solutions</div>
  </div>
</div>

<div class="filter-bar">
  <span style="font-size:12px;color:var(--muted);font-weight:500">篩選：</span>
  <button class="filter-btn active" data-f="all">全部 ({total})</button>
  <button class="filter-btn" data-f="kb">知識庫型 (5)</button>
  <button class="filter-btn" data-f="process">流程優化型 (9)</button>
  <button class="filter-btn" data-f="data">數據分析型 (5)</button>
  <button class="filter-btn" data-f="ts">兩階段隔離 (2)</button>
  <div class="filter-count">顯示 <b id="cnt">{total}</b> 個</div>
</div>

<div class="layout">
  <nav class="sidenav"><ul>{nav_items}</ul></nav>
  <div class="content">
    {ws_sections}
  </div>
</div>

<footer>桓達科技 EgentHub 開發手冊 · 由精誠資訊 × 智慧方案 Intellicon Solutions 提供</footer>

<script>
function toggleAgent(uid){{
  const body=document.getElementById('body_'+uid);
  const icon=document.getElementById('icon_'+uid);
  const isOpen=body.classList.contains('open');
  body.classList.toggle('open',!isOpen);
  icon.style.transform=isOpen?'':'rotate(180deg)';
}}
function switchTab(uid,tab,btn){{
  document.querySelectorAll('#body_'+uid+' .tab-content').forEach(el=>el.classList.remove('active'));
  document.querySelectorAll('#body_'+uid+' .tab-btn').forEach(el=>el.classList.remove('active'));
  document.getElementById('tab_'+uid+'_'+tab).classList.add('active');
  btn.classList.add('active');
}}
function copyText(id){{
  const el=document.getElementById(id);
  if(!el)return;
  navigator.clipboard.writeText(el.textContent).then(()=>{{
    const btn=event.target;
    const orig=btn.textContent;
    btn.textContent='已複製';
    btn.classList.add('copied');
    setTimeout(()=>{{btn.textContent=orig;btn.classList.remove('copied');}},2000);
  }});
}}
// 篩選
document.querySelectorAll('.filter-btn').forEach(btn=>{{
  btn.addEventListener('click',()=>{{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    let count=0;
    document.querySelectorAll('.agent-card').forEach(card=>{{
      let show=false;
      if(f==='all') show=true;
      else if(f==='ts') show=card.dataset.ts==='1';
      else show=card.dataset.type===f;
      card.classList.toggle('hidden',!show);
      if(show) count++;
    }});
    document.getElementById('cnt').textContent=count;
  }});
}});
</script>
</body>
</html>"""

if __name__ == "__main__":
    data = collect()
    html = build_html(data)
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(html)
    total = sum(len(w["agents"]) for w in data)
    print(f"完成：{OUT}")
    print(f"共 {total} 個 Agent，{len(data)} 個工作室")

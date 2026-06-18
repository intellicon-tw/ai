# -*- coding: utf-8 -*-
"""逐部門建站 + 注入 Drive 補資料指引 + 返回首頁連結 + 組首頁部門目錄。"""
import os, sys, json, subprocess, html
from urllib.parse import quote

SK = "/sessions/brave-epic-darwin/mnt/.claude/skills/egenthub-poc-teaching-web/scripts/build_site.py"
ROOT = os.path.dirname(os.path.abspath(__file__))          # _src
SITE = os.path.dirname(ROOT)                                # 高柏科技_AI教學網
SRC  = ROOT

# (src資料夾, 顯示名, 級別, drive_folder_id, drive補資料說明)
DEPTS = [
 ("業務處","業務處（業務銷售管理處）","A","1-koKcKPMYgQuw2pXfowmuZjoexQcGDBT","客戶詢價單樣張、參考牌價表（含K/R值與軟硬度欄位定義）、HP系統庫存與訂單查詢的實際匯出欄位"),
 ("營管","營業管理部","A","1dy4oeBnahaB4TR4R0-nPwyGlTX5pdlcb","Invoice/Packing List 範本實際檔、BC/HubSpot/快遞費率表的欄位規格與一筆真實範例、子公司互買識別規則"),
 ("生管","生產管理及資材處","A","17RvU2V8ddcYb2tLV5ftpiNbq5Mv4FPSO","成本表、生產工單明細、現場工時回饋、庫存明細帳、BOM 表、銷貨明細的實際欄位與去識別化樣本"),
 ("製造部","製造部","A","1uxXe9ywiXqJC5ENc_cZDOApEkgZ97z6x","工作中心對照表、機台參數表、模具配置表與料品分類帳、MES 報工欄位、PLC 報警碼與維修手冊"),
 ("會計處","會計處","A","1F9kA-3ptswo29Agl61ZQ_2UtaTOp-2Zx","ERP(鼎新/JDE)各報表實際匯出欄位與權限、差旅費用規範全文、完整會計科目對照表、各子公司報表格式與關係人交易清單、財務預測歷史三表與假設參數"),
 ("專案管理處","專案管理處","A","1eZm6AcK3XE_jhRpVkrV5vkm3_OsOocdA","ERP/PLM 各報表實際匯出欄位與權限、真實 BOM 與供應商報價樣本、RFQ 與訂單歷史資料、成本中心報表格式，並確認 PLM 與 HubSpot 介接可行性"),
 ("永續發展暨文管中心","永續發展暨文管中心","A","1Eb7Gh77Nqb_3eZUr5e8Jnrlhdea_-5eY","ERP 進貨/銷貨單實際匯出欄位、員工通勤回填表實際資料、機場代碼與里程對照、環境部最新版碳排係數、合約電子簽核與歸檔系統介接"),
 ("倉管課","倉管課","A","1l6DXbjy81Srgt5loooHtYzJrfTg4fyf3","ERP 客戶訂單與庫存批號實際匯出欄位、總廠/福安廠別判定完整規則、料號對照表、檢驗報告範本、到貨群組通知格式"),
 ("採購課","採購課","A","1ne06Whafb40cXZ9sElnum6XTbyYNFtiR","ERP 採購單/請購單/進貨資料實際匯出欄位、供應商聯絡資料、群組通知格式、即將到期天數門檻定義"),
 ("製一部","製一部","B","1Z_4LlwaMo6ImCVRru8VPOIyKB36RPo25","歷年熱壓參數(模溫/預抽/加硫)與對應物料特性、首測硬度與合格與否的資料表——資料越多預測越準"),
 ("製二部","製二部","B","1s0sCBmUkv5W4rvr_jEiZBYyjq7i-wwDC","歷年流延紙本數據與每批首件軟硬度數位化資料表、型號/尺寸/矽油比/生產參數對照"),
 ("人資","人資","B","18My_2rRtE3TeDYI_AruTCwhqD-8RZpvR","員工手冊/請假辦法全文、職缺JD與歷史履歷樣本(去識別化)、出勤/績效/問卷的欄位定義"),
 ("總務","總務","B","1w49x3p1H9nezHtI4NjMvs9SrbP7OI3_X","採購歷史與供應商報價樣本、ISO/SOP文件全文、行政FAQ清單、活動與員工名冊欄位"),
 ("職安","職安","B","158z9YAVevnXmK2M3TmKb5bC8UgWYMR8P","歷年職災/虛驚案例紀錄、巡檢表單與現場照片樣本、承攬商資格文件清單、ISO45001條文、教育訓練課程與測驗題庫"),
 ("MIS","MIS","C","1w8zNsYMgWlEzVgnN_hkApfKfgiusKIhM","實際每天/每週重複處理的查詢與報表清單、帳號權限與系統異常通報流程、AOI 資料欄位與一份匯出樣本"),
 ("研發","研發","C","1Hhv_WQt83VhgtJA6aoCUB-WS4Fc-0e7R","熱模擬報告樣本、材料規格與試驗數據、技術文件、客戶規格(Tech Pack)範例與實際痛點清單"),
 ("行銷","行銷","C","1UjEk-U6j11x_ru9GAatPy5NRgdsaxx0i","合約/簽呈/預算表樣本、行銷活動類別與通路清單、產品賣點規格、展覽籌備實際節點"),
 ("品保部","品保部","C","1TcyGit9gnHjuY848FcGqVo1YxA_FGdiI","歷史8D報告、客訴RMA紀錄、承認書公版、SPC數據、供應商評比表、ISO/QMS文件，並把每個關鍵字展開成具體任務"),
]
GRADE_COLOR={"A":"#5a2d8a","B":"#b8860b","C":"#888888"}
GRADE_DESC={"A":"場景完整，可直接開發","B":"策略主題已具雛形，待細化成任務","C":"盤點較少，題目為產業推測候選"}
DRIVE_BASE="https://drive.google.com/drive/folders/"

def esc(s): return html.escape(s or "", quote=True)

def drive_callout(disp, fid, need):
    url=DRIVE_BASE+fid
    return (
    '<div style="border:1px solid #cdebe6;background:#eafaf7;border-left:5px solid #00A896;'
    'border-radius:12px;padding:16px 20px;margin:0 0 22px">'
    '<div style="font-weight:700;color:#00766b;font-size:16px;margin-bottom:6px">'
    '📤 幫我們把你的 Agent 真正做出來：上傳補充資料</div>'
    f'<p style="margin:0 0 10px;color:#2c4a46;font-size:14px;line-height:1.7">本頁的提示詞與知識庫都是「示範用」。要讓 Agent 真正貼合 <b>{esc(disp)}</b> 的實際作業，最關鍵的一步是你提供真實資料 —— 建議補上：{esc(need)}。資料越完整，Agent 開發得越準、越快。</p>'
    f'<a href="{esc(url)}" target="_blank" rel="noopener" style="display:inline-block;background:#00A896;color:#fff;'
    f'text-decoration:none;font-weight:700;border-radius:8px;padding:9px 18px;font-size:14px">開啟 {esc(disp)} 專屬上傳資料夾 →</a>'
    f'<p style="margin:10px 0 0;color:#5c726e;font-size:12.5px">這是 {esc(disp)} 的專屬資料夾，請把補充資料放這裡，方便我們對應每一題。</p>'
    '</div>')

HOME_LINK='<a class="backlink" href="../index.html" style="display:inline-block;margin-bottom:10px;font-size:13px;color:#d9c8f0;text-decoration:none">← 回部門總目錄</a>\n'

import re
def safe(s):
    return re.sub(r'[\\/:*?"<>|\s]+','_',(s or '').strip())

def build_dept(src, disp, grade, fid, need):
    spec0=os.path.join(SRC,src,"site.json")
    spec=os.path.join(SRC,src,"site_build.json")
    data=json.load(open(spec0,encoding='utf-8'))
    for p in data.get("pocs",[]):
        if not p.get("filename"):
            no=p.get("no",""); title=p.get("title_zh") or "page"
            p["filename"]=(f"{safe(no)}_{safe(title)}" if no else safe(title))+".html"
    json.dump(data,open(spec,'w',encoding='utf-8'),ensure_ascii=False)
    outdir=os.path.join(SITE,src)
    r=subprocess.run([sys.executable, SK, spec, "--out", outdir],capture_output=True,text=True)
    if r.returncode!=0:
        raise RuntimeError(f"build failed {src}: {r.stderr}")
    n=len(json.load(open(spec,encoding='utf-8'))["pocs"])
    # post-process index.html: home link + drive callout
    idx=os.path.join(outdir,"index.html")
    h=open(idx,encoding='utf-8').read()
    h=h.replace('<header class="hero">\n','<header class="hero">\n  '+HOME_LINK,1)
    h=h.replace('<main>\n','<main>\n  '+drive_callout(disp,fid,need)+'\n',1)
    open(idx,'w',encoding='utf-8').write(h)
    # post-process每個 poc 頁：加 drive callout 於 main 後
    for fn in os.listdir(outdir):
        if fn.endswith(".html") and fn!="index.html":
            p=os.path.join(outdir,fn)
            hh=open(p,encoding='utf-8').read()
            hh=hh.replace('<main>\n','<main>\n'+drive_callout(disp,fid,need)+'\n',1)
            open(p,'w',encoding='utf-8').write(hh)
    return n

# build all
counts={}
for src,disp,grade,fid,need in DEPTS:
    counts[src]=build_dept(src,disp,grade,fid,need)
    print(f"built {src}: {counts[src]} pages")

# ---------- homepage ----------
CSS = """:root{--ink:#1d1430;--purple:#5a2d8a;--purple2:#7b46b8;--lav:#f3eefb;--line:#e6ddf2;--muted:#7a7290;--bg:#fff;}
*{box-sizing:border-box}body{margin:0;background:#fff;color:var(--ink);font-family:-apple-system,"PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif;line-height:1.75}
.hero{background:linear-gradient(135deg,#3a1c5e,#5a2d8a 55%,#7b46b8);color:#fff;padding:48px 7vw 38px}
.hero .crumb{font-size:13px;letter-spacing:.06em;color:#d9c8f0;margin:0 0 10px}
.hero h1{margin:0 0 10px;font-size:34px;line-height:1.25}
.hero .sub{color:#e7dbf7;font-size:15.5px;margin:0 0 18px;max-width:760px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);color:#fff;font-size:12.5px;padding:5px 11px;border-radius:8px}
.chip b{font-weight:700}
main{padding:34px 7vw 70px;max-width:1100px;margin:0 auto}
.intro{max-width:860px;color:#4a4360;margin:0 0 8px}
.gnote{background:var(--lav);border-radius:12px;padding:14px 18px;margin:14px 0 26px;font-size:14px;color:#3a3450}
.gsec{margin:0 0 30px}
.gh{display:flex;align-items:center;gap:10px;margin:0 0 4px}
.gbadge{display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;color:#fff;font-weight:800;font-size:16px}
.gh h2{font-size:20px;margin:0}
.gh .gd{color:var(--muted);font-size:13px;margin:0 0 0 2px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-top:14px}
.card{display:block;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:14px;padding:18px 20px;transition:.15s;background:#fff;border-left-width:5px}
.card:hover{box-shadow:0 8px 24px rgba(90,45,138,.12);transform:translateY(-2px)}
.card .ct{display:flex;justify-content:space-between;align-items:center}
.card h3{margin:8px 0 4px;font-size:19px}
.gtag{display:inline-block;font-size:12px;font-weight:800;color:#fff;border-radius:999px;padding:2px 10px}
.cnt{font-size:12.5px;color:var(--muted);font-weight:600}
.cdesc{font-size:13.5px;color:#4a4360;margin:6px 0 0}
.driveband{border:1px solid #cdebe6;background:#eafaf7;border-left:5px solid #00A896;border-radius:12px;padding:16px 20px;margin:0 0 26px}
.driveband b{color:#00766b}
.driveband a{display:inline-block;background:#00A896;color:#fff;text-decoration:none;font-weight:700;border-radius:8px;padding:8px 16px;font-size:14px;margin-top:8px}
footer{border-top:1px solid var(--line);padding:24px 7vw;color:var(--muted);font-size:13px;text-align:center}"""

def card(src,disp,grade,n):
    col=GRADE_COLOR[grade]
    href=quote(src)+"/index.html"
    return (f'<a class="card" href="{href}" style="border-left-color:{col}">'
            f'<div class="ct"><span class="gtag" style="background:{col}">{grade} 級</span>'
            f'<span class="cnt">{n} 題 POC</span></div>'
            f'<h3>{esc(disp)}</h3>'
            f'<p class="cdesc">{esc(GRADE_DESC[grade])}</p></a>')

sections=[]
for g in ["A","B","C"]:
    items=[d for d in DEPTS if d[2]==g]
    if not items: continue
    cards="".join(card(s,disp,gr,counts[s]) for s,disp,gr,fid,need in items)
    col=GRADE_COLOR[g]
    sections.append(
      f'<div class="gsec"><div class="gh"><span class="gbadge" style="background:{col}">{g}</span>'
      f'<h2>{g} 級部門</h2></div><p class="gd">{esc(GRADE_DESC[g])}</p>'
      f'<div class="grid">{cards}</div></div>')

total=sum(counts.values())
homepage=f"""<!DOCTYPE html><html lang="zh-Hant"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>高柏科技 AI Agent 開發實務工作坊 · 部門目錄</title><style>{CSS}</style></head><body>
<header class="hero">
  <p class="crumb">智慧方案 × 高柏科技</p>
  <h1>高柏科技 AI Agent 開發實務工作坊</h1>
  <p class="sub">由各部門「AI Agent 任務盤點表」轉化的 POC 解題示範。選擇你的部門，逐題了解：需求與痛點 → 開發思路 → 完整提示詞 → 知識庫設計 → 建置流程 → 驗測情境。</p>
  <div class="chips"><span class="chip"><b>共</b> 11 個部門</span><span class="chip"><b>合計</b> {total} 款 Agent POC</span><span class="chip">分級 A / B / C 反映盤點完整度</span></div>
</header>
<main>
  <p class="intro">每個部門依「任務盤點表填寫的完整度」分級：<b>A 級</b>場景具體、可直接開發；<b>B 級</b>已有策略主題，待細化為任務；<b>C 級</b>盤點較少，題目為依產業特性推測的建議候選。各部門頁面上方都有針對該部門的講評與建議。</p>
  <div class="driveband">
    <b>📤 想讓 AI Agent 真正落地？請各部門上傳更多資料</b>
    <p style="margin:6px 0 0;font-size:14px;color:#2c4a46">這些 POC 的提示詞與知識庫都是示範用。要做出真正好用的 Agent，最關鍵是各題提出者提供真實資料。我們已為每個部門開好專屬資料夾，請進入你的部門頁面點「上傳補充資料」，或直接開啟總資料夾。</p>
    <a href="https://drive.google.com/drive/folders/1OWZ6hYKUFAYPzvD3YPRhzqiR-hMQZE2z" target="_blank" rel="noopener">開啟總資料夾「高柏 AI Agent 開發資料」 →</a>
  </div>
  {''.join(sections)}
</main>
<footer>智慧方案股份有限公司　Intellicon Solutions　·　高柏科技 AI Agent 開發實務工作坊　·　部門目錄</footer>
</body></html>"""
open(os.path.join(SITE,"index.html"),'w',encoding='utf-8').write(homepage)
print("homepage written. total pages=",total+11+ sum(counts.values())*0)
print("counts:",counts)

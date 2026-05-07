# 若水金禾 EgentHub Agent 開發包

28 個 AI Agent 完整開發包的教學網站,涵蓋若水金禾餐飲股份有限公司六大功能部門。

## 結構

```
.
├── index.html              # 首頁(總覽、統計、Agent 表格)
├── agent.html              # Agent 詳情頁(用 ?id=1-1 等參數載入)
├── workshop.html           # 工作坊講義
├── assets/
│   ├── style.css
│   └── app.js
└── data/
    ├── manifest.json       # Agent 索引(供前端讀取)
    └── agents/
        └── {ws}-{num}/     # 每個 Agent 的子目錄
            ├── prompt.md
            ├── validation.md
            ├── onboarding.md
            └── kb/
                ├── *.csv
                └── *.txt
```

## 本地預覽

```bash
cd 若水金禾_AgentDocs_Site
python3 -m http.server 8000
```

開啟 http://localhost:8000

## 部署到 GitHub Pages

### 方法 1:user-name.github.io 個人站

1. 在 GitHub 建立名為 `<your-username>.github.io` 的公開 repo
2. 把本資料夾所有內容(包含 index.html、assets/、data/ 等)放進 repo 根目錄
3. push 到 main branch
4. 訪問 `https://<your-username>.github.io`

### 方法 2:子路徑專案站(推薦)

1. 在 GitHub 建立任意公開 repo,例如 `ruoshui-egenthub-docs`
2. 把本資料夾所有內容放進 repo 根目錄
3. push 到 main branch
4. 進入 repo Settings → Pages
5. 在 Source 選擇 `Deploy from a branch`,branch 選 `main`,資料夾選 `/ (root)`
6. 等 1-2 分鐘後,訪問 `https://<your-username>.github.io/<repo-name>/`

### 私有 repo + Pages

如需限制只有特定人員存取,GitHub Pro/Team 帳號可使用「Private Pages」(企業方案才能限制存取),
或考慮用 Cloudflare Pages、Vercel 等支援私有部署的服務。

## 維護更新

當 Agent 內容有更新(例如新增 Agent、修改 prompt):

1. 編輯 `若水金禾_Agents_v2/` 下的原始 .txt 檔案
2. 在本地執行 `python3 build_site.py` 重新產出本網站
3. 把更新後的內容 push 到 GitHub repo
4. 等待 GitHub Pages 自動部署(約 1-2 分鐘)

## 隱私提醒

- 本網站包含若水金禾的內部營運資訊、Agent 設計規範、知識庫範例資料
- **若 repo 設為 public,請先檢查是否有商業敏感資料外洩風險**
- 建議:重要案例(合約、財務、股東)使用 private repo + 有訪問權限管控的部署方案

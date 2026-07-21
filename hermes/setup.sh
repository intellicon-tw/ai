#!/bin/bash
# =============================================================================
#  Mac mini 佈署安裝器  —  cloudflared tunnel + SSH 金鑰 + 電源設定
#  智慧方案 Intellicon
#  發佈位置：https://g.intellicon.tw/hermes/setup.sh （公開；本檔不含任何機密）
#
#  客戶端用法（顧問把 <TOKEN> 換成該客戶專屬授權碼後，整行給客戶貼上）：
#    curl -fsSL https://g.intellicon.tw/hermes/setup.sh | bash -s -- "<TOKEN>"
#
#  安全：Cloudflare tunnel token 是機密，絕不寫進本檔或任何公開位置，
#       一律由上面指令的參數帶入。公鑰放這裡沒問題（公鑰本就是公開的）。
# =============================================================================
set -euo pipefail

# ── 顧問公鑰（可公開）─────────────────────────────────────────────────────────
ADMIN_PUBKEY="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPN722Y8MAFoCANri4VoId4u16/iqbTIDCYQ7tdxCA9m albert@openclaw"
# ───────────────────────────────────────────────────────────────────────────

# token 一律由參數帶入（方式：curl ... | bash -s -- "<TOKEN>"）
CF_TOKEN="${1:-}"

P="\033[1;35m"; G="\033[1;32m"; Y="\033[1;33m"; R="\033[1;31m"; N="\033[0m"
say()  { echo -e "${P}▶${N} $*"; }
ok()   { echo -e "${G}✔${N} $*"; }
warn() { echo -e "${Y}⚠${N} $*"; }
die()  { echo -e "${R}✘${N} $*"; exit 1; }

[ -z "$CF_TOKEN" ] && die "缺少授權碼。請使用顧問提供的完整指令（含授權碼）再試一次。"

say "先取得管理員權限（會要求輸入這台電腦的開機密碼；輸入時畫面不會顯示，屬正常）…"
sudo -v || die "無法取得管理員權限。"
( while true; do sudo -n true; sleep 50; kill -0 "$$" 2>/dev/null || exit; done ) 2>/dev/null &

# ── 1. 下載並安裝 cloudflared ────────────────────────────────────────────────
ARCH="$(uname -m)"
case "$ARCH" in
  arm64)  ASSET="cloudflared-darwin-arm64.tgz"; ALT="cloudflared-darwin-amd64.tgz" ;;
  x86_64) ASSET="cloudflared-darwin-amd64.tgz"; ALT="cloudflared-darwin-arm64.tgz" ;;
  *) die "未知的 CPU 架構：$ARCH" ;;
esac
BASE="https://github.com/cloudflare/cloudflared/releases/latest/download"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
fetch() { curl -fsSL "$1" -o "$2" 2>/dev/null && gzip -t "$2" 2>/dev/null; }

say "下載 cloudflared（$ARCH）…"
if fetch "$BASE/$ASSET" "$TMP/cf.tgz"; then
  ok "取得 $ASSET"
elif fetch "$BASE/$ALT" "$TMP/cf.tgz"; then
  warn "改用 $ALT（相容模式）。"
  if [ "$ARCH" = "arm64" ] && ! /usr/bin/arch -x86_64 /usr/bin/true 2>/dev/null; then
    say "安裝 Rosetta 2…"
    sudo softwareupdate --install-rosetta --agree-to-license || warn "Rosetta 安裝未完成，如無法啟動請告知顧問。"
  fi
else
  die "cloudflared 下載失敗，請檢查網路後重試，或聯絡顧問。"
fi

tar -xzf "$TMP/cf.tgz" -C "$TMP"
BIN="$(find "$TMP" -maxdepth 2 -type f -name cloudflared | head -n1)"
[ -n "$BIN" ] || die "解壓後找不到 cloudflared 檔案。"
sudo mkdir -p /usr/local/bin
sudo mv "$BIN" /usr/local/bin/cloudflared
sudo chmod +x /usr/local/bin/cloudflared
sudo xattr -dr com.apple.quarantine /usr/local/bin/cloudflared 2>/dev/null || true
ok "cloudflared 已安裝：$(/usr/local/bin/cloudflared --version 2>/dev/null | head -n1)"

# ── 2. 安裝顧問 SSH 公鑰 ─────────────────────────────────────────────────────
say "設定 SSH 遠端金鑰…"
mkdir -p "$HOME/.ssh"; chmod 700 "$HOME/.ssh"
touch "$HOME/.ssh/authorized_keys"; chmod 600 "$HOME/.ssh/authorized_keys"
if grep -qxF "$ADMIN_PUBKEY" "$HOME/.ssh/authorized_keys"; then
  ok "金鑰已存在，略過。"
else
  echo "$ADMIN_PUBKEY" >> "$HOME/.ssh/authorized_keys"; ok "已加入顧問公鑰。"
fi
if sudo systemsetup -setremotelogin on >/dev/null 2>&1; then
  ok "遠端登入（SSH）已開啟。"
else
  warn "無法自動開啟遠端登入。請確認「系統設定 → 一般 → 共享 → 遠端登入」已打開（指南步驟三）。"
fi

# ── 3. 電源與伺服器行為 ──────────────────────────────────────────────────────
say "設定電源行為（不休眠、斷電自動開機、網路喚醒）…"
sudo pmset -a sleep 0 2>/dev/null || true
sudo pmset -a disablesleep 1 2>/dev/null || true
sudo pmset -a womp 1 2>/dev/null || true
sudo pmset autorestart 1 2>/dev/null || true
ok "電源設定完成。"

# ── 4. 安裝 cloudflared 為開機自啟服務 ───────────────────────────────────────
say "安裝 Cloudflare Tunnel 服務（開機自動啟動、免登入）…"
sudo /usr/local/bin/cloudflared service install "$CF_TOKEN"
sleep 3
if sudo launchctl list 2>/dev/null | grep -qi cloudflared; then
  ok "Cloudflare Tunnel 服務執行中。"
else
  warn "服務狀態未確認，顧問連線後會再檢查。"
fi

echo
echo -e "${G}========================================${N}"
echo -e "${G}  全部完成！請通知顧問「已經完成」。${N}"
echo -e "${G}  這台電腦請保持開機、網路與電源接著。${N}"
echo -e "${G}========================================${N}"

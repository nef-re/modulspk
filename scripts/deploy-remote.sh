#!/usr/bin/env bash
# Умный деплой на VPS: static | build | full | noop
# static — только public/ (Next отдаёт без пересборки)
# build  — код/стили, без смены зависимостей (next build, кэш .next сохраняется)
# full   — package.json/lock или нет node_modules/.next (npm ci + clean build)
# noop   — нет изменений или только docs/deploy-скрипты

set -euo pipefail

APP_DIR="${APP_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$APP_DIR"

FORCE="${DEPLOY_FORCE:-}"
SERVICE="${MODULSPK_SERVICE:-modulspk}"
PORT="${MODULSPK_PORT:-3000}"

log() { printf '==> %s\n' "$*" >&2; }

ensure_swap() {
  if swapon --show 2>/dev/null | grep -q /swapfile; then
    return 0
  fi
  log 'Adding 1G swap for build…'
  fallocate -l 1G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=1024 status=none
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
}

git_sync() {
  git fetch origin >/dev/null 2>&1
  git checkout master >/dev/null 2>&1
  local old new orig
  old=$(git rev-parse HEAD)
  git pull --ff-only origin master >/dev/null 2>&1
  new=$(git rev-parse HEAD)
  if [ "$old" != "$new" ]; then
    git diff --name-only "$old" "$new"
    return
  fi
  if git rev-parse -q --verify ORIG_HEAD >/dev/null 2>&1; then
    orig=$(git rev-parse ORIG_HEAD)
    if [ "$orig" != "$new" ]; then
      git diff --name-only "$orig" "$new"
    fi
  fi
}

needs_full_artifacts() {
  ! { [ -x node_modules/.bin/next ] && [ -d .next ]; }
}

classify_changes() {
  local files=$1

  if [ -n "$FORCE" ]; then
    echo "$FORCE"
    return
  fi

  if needs_full_artifacts; then
    echo 'full'
    return
  fi

  if [ -z "$files" ]; then
    echo 'noop'
    return
  fi

  local needs_ci=false
  local needs_build=false
  local has_public=false

  while IFS= read -r f; do
    [ -z "$f" ] && continue

    case "$f" in
      package.json|package-lock.json)
        needs_ci=true
        needs_build=true
        ;;
      next.config.ts|postcss.config.mjs|tsconfig.json|tailwind.config.*)
        needs_build=true
        ;;
      app/*|components/*|lib/*|server/*|assets/*|app/globals.css)
        needs_build=true
        ;;
      scripts/clean.mjs|scripts/dev.mjs|scripts/generate-favicons.mjs|scripts/process-logo.mjs)
        needs_build=true
        ;;
      public/*)
        has_public=true
        ;;
      README*|deploy/*|scripts/deploy*|.gitignore|.env.example|public/llms.txt|public/about.md)
        ;;
      *)
        log "Unknown path '$f' — using build mode"
        needs_build=true
        ;;
    esac
  done <<< "$files"

  if $needs_ci; then
    echo 'full'
  elif $needs_build; then
    echo 'build'
  elif $has_public; then
    echo 'static'
  else
    echo 'noop'
  fi
}

verify_service() {
  systemctl is-active "$SERVICE"
  curl -sI "http://127.0.0.1:${PORT}" | head -n 1
}

CHANGED=$(git_sync)
MODE=$(classify_changes "$CHANGED")

log "Deploy mode: $MODE"
if [ -n "$CHANGED" ]; then
  log 'Changed files:'
  echo "$CHANGED" | sed 's/^/  /'
fi

export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=768}"

case "$MODE" in
  noop)
    log 'No site rebuild required.'
    verify_service || {
      log 'Service down — running full deploy…'
      ensure_swap
      npm ci --no-audit --no-fund
      npm run build
      systemctl restart "$SERVICE"
      verify_service
    }
    ;;
  static)
    log 'Static files only — skip build & restart.'
    verify_service
    ;;
  build)
    ensure_swap
    log 'Light deploy: next build (cache kept)…'
    npm run build:fast
    systemctl restart "$SERVICE"
    verify_service
    ;;
  full)
    ensure_swap
    log 'Full deploy: npm ci + clean build…'
    npm ci --no-audit --no-fund
    npm run build
    systemctl restart "$SERVICE"
    verify_service
    ;;
  *)
    echo "Unknown mode: $MODE" >&2
    exit 1
    ;;
esac

log 'Deploy finished successfully.'

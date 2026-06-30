#!/usr/bin/env bash
# Deploy en el VPS por git pull (lo invoca GitHub Actions vía SSH, o a mano).
# sergiolab = 1 contenedor `sergiolab` (build ./app, Node/Express + React build).
# Red externa nginx-proxy_default. No hay datos persistentes en disco.
#
#   bash scripts/deploy-git.sh
set -euo pipefail

REMOTE_DIR="${DEPLOY_DIR:-/opt/sites/sergiolab}"
BRANCH="${DEPLOY_BRANCH:-main}"
CONTAINER="sergiolab"

cd "$REMOTE_DIR"

echo "▶ Comprobando .env…"
test -f .env || { echo "✗ Falta $REMOTE_DIR/.env. Créalo y chmod 600 antes de desplegar."; exit 1; }

echo "▶ git pull origin $BRANCH…"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"
echo "  HEAD ahora en: $(git rev-parse --short HEAD) — $(git log -1 --pretty=%s)"

echo "▶ Reconstruyendo y levantando el contenedor…"
docker compose up -d --build

echo "▶ Estado del contenedor…"
docker compose ps

echo "▶ Health check (red interna nginx-proxy_default, la app no expone puerto al host)…"
# La app tarda un par de segundos en arrancar tras el `up`: reintentamos.
code="000"
for i in $(seq 1 15); do
  code="$(docker run --rm --network nginx-proxy_default curlimages/curl:latest \
    -s -o /dev/null -w '%{http_code}' "http://${CONTAINER}:3000/" 2>/dev/null || true)"
  case "$code" in
    200|301|302|307|308) break ;;
  esac
  echo "  intento $i: HTTP $code — esperando…"
  sleep 2
done
case "$code" in
  200|301|302|307|308)
    echo "✓ La app responde $code en ${CONTAINER}:3000" ;;
  *)
    echo "⚠ La app devolvió '$code' tras 15 intentos. Revisa los logs:"
    echo "   docker compose logs --tail=50 ${CONTAINER}"
    exit 1 ;;
esac

echo "✓ Deploy completado."

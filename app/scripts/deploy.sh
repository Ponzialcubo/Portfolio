#!/usr/bin/env bash
#
# Despliega los cambios locales del portfolio al VPS (sergiolab.es).
#
# Uso (desde la raíz del proyecto, en Git Bash):
#   bash scripts/deploy.sh
#
# Qué hace:
#   1. Empaqueta el código local (src, api/, index.html, configs…).
#   2. Lo extrae en /opt/sites/sergiolab/app/ del servidor.
#   3. Reconstruye el contenedor (Vite build → dist/ dentro de Docker) y reinicia.
#   4. Verifica que responde.
#
# Notas:
#   · NO sube node_modules, dist, .git, .env* ni las capturas de audit/.
#   · NO pisa el Dockerfile, server.js ni el .env del servidor (no están en local).
#   · OJO: sobrescribe el código de app/ con tu versión local. Si editas también
#     en el servidor (VS Code Remote-SSH), sincroniza primero para no perder cambios.
#   · Usa el OpenSSH de Windows para aprovechar el ssh-agent (clave con passphrase).
set -euo pipefail

HOST="servidor1"
REMOTE="/opt/sites/sergiolab"

SSH="/c/Windows/System32/OpenSSH/ssh.exe"
SCP="/c/Windows/System32/OpenSSH/scp.exe"
if [ ! -x "$SSH" ]; then SSH="ssh"; SCP="scp"; fi
export MSYS_NO_PATHCONV=1

cd "$(dirname "$0")/.."
OUT="$(pwd)/.deploy"; mkdir -p "$OUT"
winpath() { cygpath -w "$1" 2>/dev/null || echo "$1"; }

echo "→ Empaquetando código…"
tar --exclude=node_modules --exclude=dist --exclude=.git --exclude=audit \
    --exclude='.env' --exclude='.env.local' --exclude='.deploy' \
    -czf "$OUT/portfolio-src.tgz" .

echo "→ Subiendo y extrayendo en app/…"
"$SCP" -q "$(winpath "$OUT/portfolio-src.tgz")" "$HOST:$REMOTE/portfolio-src.tgz"
"$SSH" "$HOST" "cd $REMOTE && tar xzf portfolio-src.tgz -C app && rm portfolio-src.tgz"

echo "→ Reconstruyendo y reiniciando…"
"$SSH" "$HOST" "cd $REMOTE && docker compose up -d --build 2>&1 | tail -3"

echo "→ Verificando que responde…"
"$SSH" "$HOST" "docker run --rm --network nginx-proxy_default curlimages/curl:latest \
  -s -o /dev/null -w 'sergiolab -> HTTP %{http_code}\n' http://sergiolab:3000/"

echo "✅ Deploy completado → https://sergiolab.es"

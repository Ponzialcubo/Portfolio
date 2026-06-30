# sergiolab (Portfolio) — Infraestructura y Deploy

Portfolio profesional de Sergio (`sergiolab.es`). La app vive en **`app/`**
(React + Vite, prerender estático) y se sirve con un pequeño servidor Node/Express.
La documentación del proyecto está en **[`app/CLAUDE.md`](app/CLAUDE.md)** y
`app/docs/`. Este archivo cubre solo la infraestructura del repo y el deploy.

## Estructura del repo

- `app/` — el proyecto en sí (React/Vite, `app/Dockerfile`, `app/api`, `app/src`).
- `docker-compose.yml` (raíz) — define el contenedor `sergiolab` (`build: ./app`).
- `scripts/deploy-git.sh` — script de deploy que corre en el VPS.

## Producción / Deploy

VPS IONOS `82.165.217.57`, `/opt/sites/sergiolab/`: 1 contenedor `sergiolab`
tras Nginx Proxy Manager (red `nginx-proxy_default`, puerto 3000 interno).

### 🚀 Deploy automático (push → VPS)

**El despliegue es automático por CI/CD.** Al hacer `git push origin main`,
GitHub Actions entra por SSH al VPS y ejecuta `scripts/deploy-git.sh`
(`git reset --hard origin/main` → `docker compose up -d --build` → health check).

> **Flujo de trabajo tras hacer cambios** (IMPORTANTE):
> 1. Commit descriptivo en inglés.
> 2. `git push origin main` → **despliega solo** (no entrar al VPS a mano).
> 3. Verificar: `gh run watch` o la pestaña **Actions**.
>
> El VPS es de **solo lectura** en git; GitHub `main` es la única fuente de verdad.

### ⚠️ Notas críticas

- **El `.env` de producción vive SOLO en el VPS** (`/opt/sites/sergiolab/.env`,
  con `RESEND_API_KEY`, `ANTHROPIC_API_KEY`…). **NUNCA** commitearlo — este repo
  es **PÚBLICO**. Está en `.gitignore`; mantenerlo así.
- `.gitattributes` fuerza **LF**: no reintroducir CRLF desde Windows.
- El commit es la fuente de verdad: el código dockerizado del VPS ya está
  sincronizado con `main` (estructura `app/` + compose).

## Reglas

- Código en **inglés**, respuestas en **español**.
- Cambios de la web → editar dentro de `app/`. Cambios de infra/deploy → raíz.

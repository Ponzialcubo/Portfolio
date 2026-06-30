// server.js — Sustituto de Vercel para el portfolio SergioLab.
// Hace DOS trabajos en un solo proceso Node:
//   1) Servir la web React ya compilada (carpeta dist/)
//   2) Atender las 3 funciones que antes eran "serverless" en Vercel
//      (/api/contact, /api/chat, /api/send-conversation)
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Importamos tus 3 funciones TAL CUAL están (no hace falta reescribirlas)
import contact from './api/contact.js'
import chat from './api/chat.js'
import sendConversation from './api/send-conversation.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()

// Express lee el cuerpo JSON de las peticiones y lo deja en req.body
// (esto es lo que Vercel hacía automáticamente por ti).
app.use(express.json({ limit: '1mb' }))

// --- Las rutas del mini-backend ---
app.all('/api/contact',            (req, res) => contact(req, res))
app.all('/api/chat',               (req, res) => chat(req, res))
app.all('/api/send-conversation',  (req, res) => sendConversation(req, res))

// --- La web React compilada ---
const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

// "SPA fallback": como React Router gestiona las rutas en el navegador,
// cualquier URL que no sea /api ni un archivo, devuelve index.html
// y deja que React decida qué mostrar.
app.get('*', (req, res) => res.sendFile(path.join(distDir, 'index.html')))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`SergioLab escuchando en el puerto ${PORT}`))

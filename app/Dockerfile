# Imagen base: Node 20 sobre Alpine (Linux mínimo y ligero)
FROM node:20-alpine
WORKDIR /app

# 1) Copiamos primero los manifiestos e instalamos dependencias.
#    (Se hace antes de copiar el código para aprovechar la caché de Docker.)
COPY package.json package-lock.json ./
RUN npm install
# Añadimos Express, que es lo que necesita nuestro server.js
RUN npm install express@^4.21.0

# 2) Copiamos el resto del código (React, api/, server.js, etc.)
COPY . .

# 3) Compilamos el React → genera la carpeta dist/
RUN npm run build

# 4) El contenedor escucha en el 3000 y arranca el servidor
EXPOSE 3000
CMD ["node", "server.js"]

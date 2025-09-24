# Etapa 1: Build
FROM node:18-alpine AS builder

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json/yarn.lock primero
COPY package*.json ./

# Instalar dependencias (solo las necesarias para build)
RUN npm install --legacy-peer-deps

# Copiar todo el código de la aplicación
COPY . .

# Compilar el proyecto (Nest compila a dist/)
RUN npm run build


# Etapa 2: Runtime
FROM node:18-alpine AS runner

WORKDIR /app

# Copiar solo lo necesario desde el builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Puerto de la app
EXPOSE 3000

# Comando para ejecutar la app en modo producción
CMD ["node", "dist/main.js"]

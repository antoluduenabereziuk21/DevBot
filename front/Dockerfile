# Etapa 1: Construir la aplicación
FROM node:18-bullseye as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Crear la imagen final
FROM node:18-bullseye

WORKDIR /app

# Copia solo los archivos necesarios de la etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala solo las dependencias necesarias para la ejecución
RUN npm install --only=production

# Puerto de exposición (ajusta según sea necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]



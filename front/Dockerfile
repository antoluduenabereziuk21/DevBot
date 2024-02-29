# Etapa 1: Construir la aplicación
FROM node:18-bullseye as builder

WORKDIR /app/front

COPY front/package*.json ./
RUN npm install
COPY @bot-whatsapp /app/front/node_modules/@bot-whatsapp
COPY . .
RUN npm run build

# Etapa 2: Crear la imagen final
FROM node:18-bullseye

WORKDIR /app/front

# Copia solo los archivos necesarios de la etapa anterior
COPY --from=builder /app/front/dist ./dist
COPY --from=builder /app/front/package*.json ./

# Instala solo las dependencias necesarias para la ejecución
RUN npm install --only=production

# Puerto de exposición (ajusta según sea necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]



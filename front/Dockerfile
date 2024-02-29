# Etapa 1: Construir la aplicación
FROM node:18-bullseye as builder

WORKDIR /front

COPY package*.json ./
RUN npm install
COPY @bot-whatsapp front/node_modules/@bot-whatsapp
COPY . .
RUN npm run build

# Etapa 2: Crear la imagen final
FROM node:18-bullseye

WORKDIR /front

# Copia solo los archivos necesarios de la etapa anterior
COPY --from=builder /front/dist ./dist
COPY --from=builder /front/package*.json ./

# Instala solo las dependencias necesarias para la ejecución
RUN npm install --only=production

# Puerto de exposición (ajusta según sea necesario)
EXPOSE 3000

# Comando para ejecutar la aplicación  asdasd
CMD ["npm", "start"]



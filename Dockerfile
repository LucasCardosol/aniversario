FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar todos os arquivos primeiro
COPY . .

# Instalar dependências do backend
RUN npm install --omit=dev

# Instalar dependências do frontend
RUN cd client && npm install

# Build do React
RUN cd client && npm run build

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]

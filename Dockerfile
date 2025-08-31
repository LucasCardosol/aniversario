# Build stage
FROM node:18-alpine AS builder

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para cache de dependências
COPY package*.json ./
COPY client/package*.json ./client/

# Instalar dependências do backend
RUN npm install --omit=dev

# Instalar dependências do frontend
RUN cd client && npm install

# Copiar código fonte
COPY . .

# Build do React
RUN cd client && npm run build

# Production stage
FROM node:18-alpine AS production

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm install --omit=dev

# Copiar código do backend
COPY server.js ./
COPY config.js ./

# Copiar build do React
COPY --from=builder /app/client/build ./client/build

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]

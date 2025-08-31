FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache python3 make g++

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY client/package*.json ./client/

# Instalar dependências
RUN npm ci --only=production
RUN cd client && npm ci

# Copiar código fonte
COPY . .

# Build do React
RUN cd client && npm run build

# Expor porta
EXPOSE 5000

# Comando para iniciar
CMD ["npm", "start"]

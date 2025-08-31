# 🚀 Guia de Deploy para Produção

## 🌐 **Opção 1: Render (Recomendado - Gratuito)**

### Passos:
1. **Crie uma conta** em [render.com](https://render.com)
2. **Conecte seu GitHub** e selecione este repositório
3. **Clique em "New Web Service"**
4. **Configure:**
   - **Name**: `lista-convidados-aniversario`
   - **Environment**: `Node`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment Variables**: `NODE_ENV=production`

### ✅ **Vantagens:**
- **Gratuito** para sempre
- **Deploy automático** a cada push
- **SSL automático** (https)
- **Custom domain** gratuito
- **Banco SQLite** funciona perfeitamente

---

## 🐳 **Opção 2: Docker (Mais Profissional)**

### 1. Crie o Dockerfile:
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN cd client && npm ci && npm run build

EXPOSE 5000
CMD ["npm", "start"]
```

### 2. Build e Deploy:
```bash
docker build -t lista-convidados .
docker run -p 5000:5000 lista-convidados
```

---

## ☁️ **Opção 3: Vercel (Frontend) + Railway (Backend)**

### Frontend (Vercel):
1. **Conecte o GitHub** em [vercel.com](https://vercel.com)
2. **Selecione a pasta `client`**
3. **Deploy automático**

### Backend (Railway):
1. **Conecte o GitHub** em [railway.app](https://railway.app)
2. **Selecione este repositório**
3. **Configure a pasta raiz**
4. **Deploy automático**

---

## 🖥️ **Opção 4: VPS/Server (Mais Controle)**

### 1. Prepare o servidor:
```bash
# Clone o projeto
git clone <seu-repositorio>
cd aniversario

# Execute o build
./build.sh

# Inicie em produção
npm start
```

### 2. Use PM2 para manter rodando:
```bash
npm install -g pm2
pm2 start server.js --name "lista-convidados"
pm2 startup
pm2 save
```

### 3. Configure Nginx (opcional):
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 **Configurações de Produção**

### Variáveis de Ambiente:
```bash
NODE_ENV=production
PORT=5000
DB_PATH=./convidados.db
```

### Scripts Disponíveis:
```bash
# Build completo
./build.sh

# Iniciar em produção
npm start

# Build apenas do React
cd client && npm run build
```

---

## 📱 **Teste o Deploy**

Após o deploy, teste:
- ✅ **Frontend**: Acesse a URL fornecida
- ✅ **API**: Teste `/api/stats`
- ✅ **Banco**: Adicione alguns convidados
- ✅ **Responsividade**: Teste em mobile

---

## 🎯 **Recomendação Final**

**Para começar rápido**: Use **Render** - é gratuito, fácil e funciona perfeitamente!

**Para algo mais profissional**: Use **Docker** ou **VPS** com PM2.

---

**🚀 Seu app estará online em poucos minutos!**

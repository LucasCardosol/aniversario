#!/bin/bash

echo "🚀 Deploy Rápido para Produção"
echo "================================"

# Verificar se está no git
if [ ! -d ".git" ]; then
    echo "❌ Erro: Este diretório não é um repositório git!"
    echo "💡 Execute: git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Build para produção
echo "🔨 Fazendo build para produção..."
./build.sh

if [ $? -ne 0 ]; then
    echo "❌ Erro no build!"
    exit 1
fi

echo ""
echo "✅ Build concluído com sucesso!"
echo ""
echo "🌐 Opções de Deploy:"
echo ""
echo "1️⃣  RENDER (Recomendado - Gratuito):"
echo "   • Acesse: https://render.com"
echo "   • Conecte seu GitHub"
echo "   • New Web Service"
echo "   • Build: cd client && npm install && npm run build"
echo "   • Start: npm start"
echo ""
echo "2️⃣  DOCKER:"
echo "   • docker build -t lista-convidados ."
echo "   • docker run -p 5000:5000 lista-convidados"
echo ""
echo "3️⃣  VPS/SERVIDOR:"
echo "   • git clone <seu-repo>"
echo "   • ./build.sh"
echo "   • npm start"
echo ""
echo "4️⃣  LOCAL PRODUÇÃO:"
echo "   • NODE_ENV=production npm start"
echo ""
echo "📱 Seu app estará online em poucos minutos!"
echo "🎯 Recomendação: Use RENDER - é o mais fácil e gratuito!"

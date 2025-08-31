#!/bin/bash

echo "🚀 Iniciando build para produção..."

# Instalar dependências do backend
echo "📦 Instalando dependências do backend..."
npm install --production

# Instalar dependências do frontend
echo "📦 Instalando dependências do frontend..."
cd client
npm install

# Build do React
echo "🔨 Fazendo build do React..."
npm run build

# Voltar para pasta raiz
cd ..

echo "✅ Build concluído!"
echo "🎯 Para iniciar em produção: npm start"

#!/bin/bash

echo "🚀 =========================================="
echo "   INICIANDO INKMASTER PORTFOLIO SERVER"
echo "=========================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "   Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js detectado: $(node --version)"

# Verificar dependencias
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "📁 Verificando carpetas de imágenes..."

# Crear carpetas si no existen
mkdir -p imagenes/homepage
mkdir -p imagenes/artist
mkdir -p imagenes/portafolio
mkdir -p imagenes/gallery

echo "✅ Carpetas verificadas"
echo ""
echo "🌐 URLs importantes:"
echo "   • Admin Panel: http://localhost:3001/admin/settings.html"
echo "   • Homepage: http://localhost:3001/pages/homepage.html"
echo "   • Artist Profile: http://localhost:3001/pages/artist_profile.html"
echo ""
echo "🎯 ¡Servidor iniciando...!"
echo "=========================================="
echo ""

# Iniciar servidor
npm run server
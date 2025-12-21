#!/bin/bash
# 🚀 InkMaster Portfolio - Servidor Local Rápido
# Solución para problemas de CORS

cd "$(dirname "$0")" || exit 1

echo "🚀 InkMaster Portfolio - Servidor Local"
echo "======================================"
echo "🔧 Solucionando problemas de CORS..."
echo "🌐 Iniciando servidor en puerto 3000..."
echo ""
echo "📖 URLs que estarán disponibles:"
echo "   🏠 http://localhost:3000/pages/homepage.html"
echo "   ⚙️ http://localhost:3000/admin/settings.html"
echo "   🔧 http://localhost:3000/debug-system.html"
echo ""
echo "💡 Presiona Ctrl+C para detener"
echo "======================================"

python3 -m http.server 3000
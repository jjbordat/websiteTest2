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


 {
      "id": 1,
      "title": "Tatuaje realista 1",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (1).jpeg",
      "location": "Antebrazo",
      "style": "realismo-en-sombras",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 2,
      "title": "Tatuaje realista 2",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (2).jpeg",
      "location": "Brazo completo",
      "style": "Realismo oscuro",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 3,
      "title": "Tatuaje realista 3",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (3).jpeg",
      "location": "Bíceps",
      "style": "Realismo black & grey",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 4,
      "title": "Tatuaje realista 4",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (4).jpeg",
      "location": "Tríceps",
      "style": "realismo-en-sombras",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 5,
      "title": "Tatuaje realista 5",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (5).jpeg",
      "location": "Espalda",
      "style": "Realismo oscuro",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 6,
      "title": "Tatuaje realista 6",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (6).jpeg",
      "location": "Hombro",
      "style": "Realismo black & grey",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 7,
      "title": "Tatuaje realista 7",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (7).jpeg",
      "location": "Pantorrilla",
      "style": "realismo-en-sombras",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 8,
      "title": "Tatuaje realista 8",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (8).jpeg",
      "location": "Pecho",
      "style": "Realismo oscuro",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 9,
      "title": "Tatuaje realista 9",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (9).jpeg",
      "location": "Antebrazo",
      "style": "Realismo black & grey",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 10,
      "title": "Tatuaje realista 10",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (10).jpeg",
      "location": "Brazo completo",
      "style": "realismo-en-sombras",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 11,
      "title": "Tatuaje realista 11",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (11).jpeg",
      "location": "Bíceps",
      "style": "Realismo oscuro",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 12,
      "title": "Tatuaje realista 12",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (12).jpeg",
      "location": "Tríceps",
      "style": "Realismo black & grey",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 13,
      "title": "Tatuaje realista 13",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (13).jpeg",
      "location": "Espalda",
      "style": "realismo-en-sombras",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 14,
      "title": "Tatuaje realista 14",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (14).jpeg",
      "location": "Hombro",
      "style": "Realismo oscuro",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 15,
      "title": "Tatuaje realista 15",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (15).jpeg",
      "location": "Pantorrilla",
      "style": "Realismo black & grey",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 16,
      "title": "Tatuaje realista 16",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (16).jpeg",
      "location": "Pecho",
      "style": "realismo-en-sombras",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 17,
      "title": "Tatuaje realista 17",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (17).jpeg",
      "location": "Antebrazo",
      "style": "Realismo oscuro",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 18,
      "title": "Tatuaje realista 18",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (18).jpeg",
      "location": "Brazo completo",
      "style": "Realismo black & grey",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 19,
      "title": "Tatuaje realista 19",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.19 PM (19).jpeg",
      "location": "Bíceps",
      "style": "realismo-en-sombras",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 20,
      "title": "Tatuaje realista 20",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (1).jpeg",
      "location": "Tríceps",
      "style": "Realismo oscuro",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 21,
      "title": "Tatuaje realista 21",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (2).jpeg",
      "location": "Espalda",
      "style": "Realismo black & grey",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 22,
      "title": "Tatuaje realista 22",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (3).jpeg",
      "location": "Hombro",
      "style": "realismo-en-sombras",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 23,
      "title": "Tatuaje realista 23",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (4).jpeg",
      "location": "Pantorrilla",
      "style": "Realismo oscuro",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 24,
      "title": "Tatuaje realista 24",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (5).jpeg",
      "location": "Pecho",
      "style": "Realismo black & grey",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 25,
      "title": "Tatuaje realista 25",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (6).jpeg",
      "location": "Antebrazo",
      "style": "realismo-en-sombras",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 26,
      "title": "Tatuaje realista 26",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (7).jpeg",
      "location": "Brazo completo",
      "style": "Realismo oscuro",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 27,
      "title": "Tatuaje realista 27",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (8).jpeg",
      "location": "Bíceps",
      "style": "Realismo black & grey",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 28,
      "title": "Tatuaje realista 28",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (9).jpeg",
      "location": "Tríceps",
      "style": "realismo-en-sombras",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 29,
      "title": "Tatuaje realista 29",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (10).jpeg",
      "location": "Espalda",
      "style": "Realismo oscuro",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 30,
      "title": "Tatuaje realista 30",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (11).jpeg",
      "location": "Hombro",
      "style": "Realismo black & grey",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 31,
      "title": "Tatuaje realista 31",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (12).jpeg",
      "location": "Pantorrilla",
      "style": "realismo-en-sombras",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 32,
      "title": "Tatuaje realista 32",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (13).jpeg",
      "location": "Pecho",
      "style": "Realismo oscuro",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 33,
      "title": "Tatuaje realista 33",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (14).jpeg",
      "location": "Antebrazo",
      "style": "Realismo black & grey",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 34,
      "title": "Tatuaje realista 34",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (15).jpeg",
      "location": "Brazo completo",
      "style": "realismo-en-sombras",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 35,
      "title": "Tatuaje realista 35",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.20 PM (16).jpeg",
      "location": "Bíceps",
      "style": "Realismo oscuro",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 36,
      "title": "Tatuaje realista 36",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (1).jpeg",
      "location": "Tríceps",
      "style": "Realismo black & grey",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 37,
      "title": "Tatuaje realista 37",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (2).jpeg",
      "location": "Espalda",
      "style": "realismo-en-sombras",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 38,
      "title": "Tatuaje realista 38",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (3).jpeg",
      "location": "Hombro",
      "style": "Realismo oscuro",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 39,
      "title": "Tatuaje realista 39",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (4).jpeg",
      "location": "Pantorrilla",
      "style": "Realismo black & grey",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 40,
      "title": "Tatuaje realista 40",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (5).jpeg",
      "location": "Pecho",
      "style": "realismo-en-sombras",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 41,
      "title": "Tatuaje realista 41",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (6).jpeg",
      "location": "Antebrazo",
      "style": "Realismo oscuro",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 42,
      "title": "Tatuaje realista 42",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (7).jpeg",
      "location": "Brazo completo",
      "style": "Realismo black & grey",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 43,
      "title": "Tatuaje realista 43",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (8).jpeg",
      "location": "Bíceps",
      "style": "realismo-en-sombras",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 44,
      "title": "Tatuaje realista 44",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (9).jpeg",
      "location": "Tríceps",
      "style": "Realismo oscuro",
      "placement": "Tríceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 45,
      "title": "Tatuaje realista 45",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (10).jpeg",
      "location": "Espalda",
      "style": "Realismo black & grey",
      "placement": "Espalda",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 46,
      "title": "Tatuaje realista 46",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (11).jpeg",
      "location": "Hombro",
      "style": "realismo-en-sombras",
      "placement": "Hombro",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 47,
      "title": "Tatuaje realista 47",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (12).jpeg",
      "location": "Pantorrilla",
      "style": "Realismo oscuro",
      "placement": "Pantorrilla",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 48,
      "title": "Tatuaje realista 48",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (13).jpeg",
      "location": "Pecho",
      "style": "Realismo black & grey",
      "placement": "Pecho",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 49,
      "title": "Tatuaje realista 49",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (14).jpeg",
      "location": "Antebrazo",
      "style": "realismo-en-sombras",
      "placement": "Antebrazo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 50,
      "title": "Tatuaje realista 50",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.21 PM (15).jpeg",
      "location": "Brazo completo",
      "style": "Realismo oscuro",
      "placement": "Brazo completo",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
    {
      "id": 51,
      "title": "Tatuaje realista 51",
      "description": "Tatuaje en estilo realismo con alto nivel de detalle, volumen y contraste en black & grey.",
      "category": "realismo-en-sombras",
      "image": "imagenes/portafolio/realismo/WhatsApp Image 2026-01-14 at 3.20.22 PM.jpeg",
      "location": "Bíceps",
      "style": "Realismo black & grey",
      "placement": "Bíceps",
      "sessions": "2-4 sesiones",
      "year": "2026",
      "tags": [
        "realismo-en-sombras",
        "blackwork",
        "black&grey",
        "detalle",
        "alto contraste"
      ],
      "active": true
    },
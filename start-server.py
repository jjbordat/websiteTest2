#!/usr/bin/env python3
"""
🚀 Servidor Local InkMaster Portfolio
Soluciona problemas de CORS para carga de config.json
"""

import http.server
import socketserver
import webbrowser
import sys
import os
from pathlib import Path

# Configuración del servidor
PORT = 3000
DIRECTORY = Path(__file__).parent.resolve()

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler HTTP con soporte para CORS"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)

    def end_headers(self):
        # Agregar headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

    def do_OPTIONS(self):
        # Manejar preflight requests
        self.send_response(200)
        self.end_headers()

def main():
    print("🚀 InkMaster Portfolio - Servidor Local")
    print("=" * 50)
    print(f"📁 Directorio: {DIRECTORY}")
    print(f"🌐 Puerto: {PORT}")
    print(f"🔗 URL: http://localhost:{PORT}")
    print("=" * 50)

    # Verificar archivos importantes
    config_file = DIRECTORY / "config.json"
    pages_dir = DIRECTORY / "pages"
    admin_dir = DIRECTORY / "admin"

    print("\n📋 Verificando archivos...")
    if config_file.exists():
        print("✅ config.json encontrado")
    else:
        print("❌ config.json NO encontrado")

    if pages_dir.exists():
        print("✅ Carpeta pages/ encontrada")
        html_files = list(pages_dir.glob("*.html"))
        print(f"   📄 {len(html_files)} archivos HTML encontrados")
    else:
        print("❌ Carpeta pages/ NO encontrada")

    if admin_dir.exists():
        print("✅ Carpeta admin/ encontrada")
    else:
        print("❌ Carpeta admin/ NO encontrada")

    print("\n🔧 Iniciando servidor...")

    try:
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            print(f"✅ Servidor iniciado en http://localhost:{PORT}")
            print("\n📖 URLs Disponibles:")
            print(f"   🏠 Homepage: http://localhost:{PORT}/pages/homepage.html")
            print(f"   🎨 Portfolio: http://localhost:{PORT}/pages/portfolio_gallery.html")
            print(f"   👤 Artista: http://localhost:{PORT}/pages/artist_profile.html")
            print(f"   📋 Estilos: http://localhost:{PORT}/pages/category_explorer.html")
            print(f"   📞 Contacto: http://localhost:{PORT}/pages/contact.html")
            print(f"   📅 Reservas: http://localhost:{PORT}/pages/booking_information.html")
            print(f"   ⚙️ Admin: http://localhost:{PORT}/admin/settings.html")
            print(f"   🔧 Debug: http://localhost:{PORT}/debug-system.html")

            print(f"\n💡 Presiona Ctrl+C para detener el servidor")
            print("=" * 50)

            # Abrir página principal automáticamente
            try:
                webbrowser.open(f"http://localhost:{PORT}/pages/homepage.html")
                print("🌐 Página principal abierta en el navegador")
            except:
                print("⚠️ No se pudo abrir automáticamente el navegador")

            print("\n🟢 Servidor funcionando... (esperando conexiones)")
            httpd.serve_forever()

    except KeyboardInterrupt:
        print("\n\n🛑 Servidor detenido por el usuario")
        print("👋 ¡Hasta luego!")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"\n❌ ERROR: El puerto {PORT} ya está en uso")
            print("💡 Soluciones:")
            print(f"   1. Usa otro puerto: python3 -m http.server 8080")
            print(f"   2. Detén otros servidores en el puerto {PORT}")
            print(f"   3. Espera unos minutos y vuelve a intentar")
        else:
            print(f"\n❌ ERROR: {e}")
    except Exception as e:
        print(f"\n❌ ERROR inesperado: {e}")
    finally:
        print("\n🔄 Proceso finalizado")

if __name__ == "__main__":
    main()
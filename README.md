# InkMaster Portfolio

Un portfolio frontend completo para artistas de tatuajes construido con HTML5, Tailwind CSS y JavaScript vanilla.

## 🚀 Características

- **Frontend Puro** - HTML5 moderno con Tailwind CSS, sin dependencias de backend
- **Sistema Local** - Funciona completamente desde archivos locales
- **Carga Instantánea** - Sistema ultra-optimizado sin delays
- **Responsive** - Diseño adaptable a todos los dispositivos
- **Temas Personalizables** - Colores guardados en localStorage
- **Sin Servidor** - No requiere instalación de backend ni base de datos

## 📋 Prerrequisitos

- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor HTTP local para desarrollo (opcional)

## 🛠️ Instalación y Uso

### Método 1: Abrir Directamente
```bash
# Simplemente abrir los archivos HTML en el navegador
open pages/homepage.html
# O en Windows
start pages/homepage.html
```

### Método 2: Servidor Local (Recomendado)
```bash
# Usando Python
python3 -m http.server 8080

# Usando Node.js
npx serve . -p 8080

# Usando PHP
php -S localhost:8080
```

Luego acceder a: `http://localhost:8080/pages/homepage.html`

## 📁 Estructura del Proyecto

```
diseño rocket/
├── pages/                  # Páginas principales
│   ├── homepage.html      # Página de inicio
│   ├── artist_profile.html # Perfil del artista
│   ├── portfolio_gallery.html # Galería de trabajos
│   ├── contact.html       # Página de contacto
│   └── ...
├── css/                   # Estilos CSS
│   └── main.css          # Estilos principales con Tailwind
├── js/                    # JavaScript
│   └── ultra-fast-loader.js # Sistema de carga optimizado
├── imagenes/              # Recursos de imágenes
└── config.json           # Configuración opcional

```

## 🎨 Páginas Disponibles

- **Homepage** - `pages/homepage.html`
- **Perfil del Artista** - `pages/artist_profile.html`
- **Galería del Portfolio** - `pages/portfolio_gallery.html`
- **Explorador de Categorías** - `pages/category_explorer.html`
- **Información de Reservas** - `pages/booking_information.html`
- **Contacto** - `pages/contact.html`

## ⚙️ Configuración

### Personalizar Datos del Artista

Los datos se almacenan en `localStorage` y se pueden modificar editando el archivo `js/ultra-fast-loader.js`:

```javascript
const DEFAULT_DATA = {
    artist: {
        name: 'Tu Nombre',
        title: 'Tu Especialidad',
        profileImage: 'URL_de_tu_imagen',
        heroImage: 'URL_de_imagen_principal'
    },
    siteConfig: {
        site_title: 'Tu Portfolio',
        site_tagline: 'Tu Eslogan',
        site_description: 'Descripción de tu trabajo'
    }
};
```

### Personalizar Colores

Los colores están definidos en `css/main.css` usando variables CSS:

```css
:root {
    --color-primary: #1a1a1a;
    --color-accent: #740DB5;
    --color-background: #0f0f0f;
    /* ... más colores */
}
```

## 🔧 Modificación Directa en Código

### Cambiar Colores Directamente

Si prefieres modificar los colores directamente en el código, necesitas editar estos archivos:

#### 1. **config.json** (Líneas 31-32)
```json
"theme": {
  "colors": {
    "primary": "#740DB5",    // Color principal
    "accent": "#740DB5",     // Color de acento
    "background": "#0a0a0a", // Color de fondo
    "surface": "#1a1a1a",    // Color de superficie
    "textPrimary": "#ffffff" // Color de texto
  }
}
```

#### 2. **js/instant-fix.js** (Líneas 44 y 56)
```javascript
// Línea 44 - Valores por defecto
theme: { colors: { primary: '#740DB5', accent: '#740DB5' } },

// Línea 56 - Color de fallback
const accentColor = this.config?.theme?.colors?.accent || '#740DB5';
```

### Cambiar el Nombre de la Marca

Para cambiar "InkMaster" por tu propio nombre, edita estas líneas en **todas las páginas HTML**:

#### En cada archivo de `pages/*.html`:
- **Header (desktop)**: Buscar `<span class="font-headline text-2xl font-semibold text-gradient-gold">Alaska ink</span>`
- **Menú móvil**: Buscar la misma línea dentro del menú móvil
- **Footer**: Buscar `<span class="font-headline text-2xl font-semibold text-gradient-gold">Alaska ink</span>`
- **Copyright**: Cambiar `© 2025 InkMaster Portfolio` por tu nombre

#### Archivos específicos y líneas aproximadas:
```
pages/homepage.html:
- Línea 34: Header desktop
- Línea 59: Menú móvil
- Línea 499: Footer
- Línea 564: Copyright

pages/artist_profile.html: (similares ubicaciones)
pages/portfolio_gallery.html: (similares ubicaciones)
pages/booking_information.html: (similares ubicaciones)
pages/contact.html: (similares ubicaciones)
pages/category_explorer.html: (similares ubicaciones)
```

#### También cambiar en metadatos:
- `<title>` tags
- `<meta name="description">`
- `<meta name="keywords">`
- `aria-label` attributes

### Ejemplo de Cambio Completo:
```html
<!-- ANTES -->
<span class="font-headline text-2xl font-semibold text-gradient-gold">Alaska ink</span>

<!-- DESPUÉS -->
<span class="font-headline text-2xl font-semibold text-gradient-gold">Tu Nombre</span>
```

> **💡 Tip**: Usa "Buscar y Reemplazar" en tu editor para cambiar "InkMaster" por tu nombre en todos los archivos de una vez.

## 🔧 Desarrollo

### Modificar Estilos
```bash
# Los estilos están en css/main.css
# Se puede usar Tailwind CLI para regenerar si es necesario
npx tailwindcss -i ./css/main.css -o ./css/main.css --watch
```

### Añadir Nuevas Páginas
1. Crear archivo HTML en el directorio `pages/`
2. Incluir el script optimizado: `<script src="../js/ultra-fast-loader.js"></script>`
3. Usar las clases CSS y datos disponibles

## 🌟 Características Técnicas

- **Carga Ultra-Rápida**: Sistema optimizado que carga en <20ms
- **Sin Dependencias Externas**: Todo funciona localmente
- **Cache Inteligente**: Usa localStorage para persistencia
- **Responsive Design**: Adaptable a todos los tamaños de pantalla
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 📱 Compatibilidad

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 Contribuir

Este es un proyecto frontend puro. Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Haz push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

## 🎯 Roadmap

- [ ] PWA (Progressive Web App)
- [ ] Modo offline completo
- [ ] Sistema de temas avanzado
- [ ] Generador de páginas dinámico
- [ ] Integración con APIs de redes sociales

---

## 💡 Nota

Este portfolio está diseñado para funcionar completamente sin backend. Todos los datos se manejan localmente usando localStorage y archivos estáticos. Es perfecto para artistas que quieren un portfolio rápido, hermoso y fácil de mantener sin la complejidad de un servidor.
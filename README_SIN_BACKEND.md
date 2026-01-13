# InkMaster Portfolio - Sistema Sin Backend

Este proyecto ha sido modificado para funcionar completamente **sin necesidad de backend, Docker o Node.js**. Ahora usa un sistema de configuración local que permite cambiar textos e imágenes directamente desde la interfaz de administración.

## 🚀 Características Principales

- ✅ **Sin backend** - Funciona completamente en el navegador
- ✅ **Sin Docker** - No requiere contenedores
- ✅ **Sin Node.js** - No requiere servidor local
- ✅ **Gestión de imágenes locales** - Las imágenes se almacenan en carpetas del proyecto
- ✅ **Panel de administración** - Sin necesidad de login
- ✅ **Configuración editable** - Textos y configuraciones modificables
- ✅ **Exportación/Importación** - Respaldo completo de configuración

## 📁 Estructura de Carpetas

```
📦 diseño rocket/
├── 📂 imagenes/                    # Carpeta de imágenes locales
│   ├── 📂 homepage/                # Imágenes para la página principal
│   │   ├── hero.jpg               # Imagen principal del hero
│   │   ├── featured1.jpg          # Trabajo destacado 1
│   │   ├── featured2.jpg          # Trabajo destacado 2
│   │   └── featured3.jpg          # Trabajo destacado 3
│   ├── 📂 artist/                 # Imágenes del artista
│   │   ├── profile.jpg            # Foto de perfil del artista
│   │   ├── gallery1.jpg           # Imagen de galería 1
│   │   ├── gallery2.jpg           # Imagen de galería 2
│   │   └── gallery3.jpg           # Imagen de galería 3
│   └── 📂 portafolio/             # Trabajos del portafolio
│       ├── trabajo1.jpg           # Ejemplo de trabajo
│       ├── trabajo2.jpg           # Ejemplo de trabajo
│       └── ...                    # Más trabajos
├── 📂 pages/                      # Páginas principales
├── 📂 admin/                      # Panel de administración
├── 📂 js/
│   ├── local-api.js              # Sistema de API local (NUEVO)
│   └── ...
├── config.json                   # Archivo de configuración (NUEVO)
└── README_SIN_BACKEND.md         # Este archivo
```

## 🛠️ Instalación y Uso

### 1. Abrir el Proyecto
Simplemente abre el archivo `index.html` en tu navegador web. **No necesitas instalar nada.**

### 2. Acceder al Panel de Administración
1. Navega a `admin/settings.html` en tu navegador
2. **No se requiere login** - El acceso es directo
3. Desde allí puedes modificar toda la configuración

### 3. Agregar Imágenes
1. Copia tus imágenes a las carpetas correspondientes:
   - `imagenes/homepage/` para imágenes de la página principal
   - `imagenes/artist/` para imágenes del artista
   - `imagenes/portafolio/` para trabajos del portafolio

2. Desde el panel de administración, puedes:
   - Subir nuevas imágenes
   - Cambiar imágenes existentes
   - Reemplazar la imagen principal del homepage
   - Actualizar la foto de perfil del artista

## ⚙️ Configuración

### Archivo config.json
Toda la configuración se almacena en `config.json`:

```json
{
  "site": {
    "title": "InkMaster Portfolio",
    "tagline": "Arte que vive contigo",
    "description": "Descripción del sitio..."
  },
  "artist": {
    "name": "Alejandro Morales",
    "title": "Maestro del Arte Corporal",
    "bio": "Biografía del artista...",
    "whatsapp": "+34600000000",
    "email": "contacto@inkmaster.es"
  },
  "theme": {
    "colors": {
      "primary": "#9535d4",
      "accent": "#9535d4"
    }
  }
}
```

### Panel de Administración
Accede a `admin/settings.html` para modificar:

#### 🎨 Configuración del Sitio
- Título del sitio
- Eslogan/Tagline
- Descripción

#### 👤 Perfil del Artista
- Nombre del artista
- Título profesional
- Biografía
- Certificaciones/Badge
- Imagen de perfil
- Imagen principal del homepage

#### 📞 Información de Contacto
- WhatsApp (se actualiza automáticamente en todos los botones)
- Email
- Ubicación

#### 🌐 Redes Sociales
- Instagram
- Facebook
- TikTok
- YouTube

#### 🎨 Editor de Tema
- Colores personalizados
- Logo del sitio
- Previsualización en tiempo real

#### 📊 Estadísticas
- Años de experiencia
- Clientes atendidos
- Premios/Reconocimientos

## 💾 Respaldo y Restauración

### Exportar Configuración
1. Ve al panel de administración
2. Haz clic en "Exportar Datos"
3. Se descargará un archivo `inkmaster-config.json`

### Importar Configuración
1. Ve al panel de administración
2. Haz clic en "Importar Datos"
3. Selecciona tu archivo de respaldo
4. La página se recargará automáticamente

## 🖼️ Gestión de Imágenes

### Formatos Recomendados
- **Imágenes del hero**: 800x1000px (JPG/PNG)
- **Fotos de perfil**: 400x400px (JPG/PNG)
- **Trabajos del portafolio**: 800x800px (JPG/PNG)
- **Logo**: PNG con transparencia

#### 🎨 Especificaciones del Logo
- **Tamaño mínimo**: 40x40px
- **Tamaño máximo**: 120x120px (el sistema permite hasta 3x el tamaño original)
- **Formato**: PNG con transparencia recomendado
- **Relación de aspecto**: Se mantiene automáticamente
- **Colocación**: Se reemplaza automáticamente en header y footer
- **Compatibilidad**: Si no se carga logo personalizado, se muestra el SVG por defecto

### Cambiar Imágenes
1. **Opción 1 - Panel de Administración**:
   - Ve a `admin/settings.html`
   - Usa los uploaders para subir nuevas imágenes
   - Las imágenes se almacenan localmente

2. **Opción 2 - Directamente en Carpetas**:
   - Reemplaza los archivos en las carpetas `imagenes/`
   - Mantén los nombres de archivo originales
   - Refresca la página para ver los cambios

## 🎯 Funcionalidades Especiales

### Sistema de Portafolio
- Agrega trabajos directamente desde el panel de administración
- Las imágenes se guardan en `imagenes/portafolio/`
- Se muestran automáticamente en la homepage

### Botón de WhatsApp
- Se actualiza automáticamente con el número configurado
- Funciona en todos los botones de WhatsApp del sitio
- Detección automática del código de país para Colombia (+57)

### Temas Personalizables
- Cambia colores en tiempo real
- Previsualización antes de guardar
- Sistema de caché para carga instantánea

## 🔧 Resolución de Problemas

### Las imágenes no se muestran
1. Verifica que las imágenes estén en las carpetas correctas
2. Comprueba que los nombres de archivo coincidan
3. Asegúrate de que el formato sea JPG o PNG

### Los cambios no se guardan
1. Usa el botón "Recargar Configuración" en el panel de admin
2. Verifica que no haya errores en la consola del navegador
3. Exporta e importa tu configuración como respaldo

### Restablecer configuración
1. Ve al panel de administración
2. Haz clic en "Restaurar" en la sección de temas
3. O elimina el archivo `config.json` y recarga la página

## 📱 Compatibilidad
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles y tablets
- ✅ No requiere conexión a internet (excepto para fuentes externas)

## 🚀 Puesta en Producción

Para subir el sitio a un servidor web:
1. Sube todos los archivos a tu hosting
2. Asegúrate de incluir la carpeta `imagenes/`
3. El sitio funcionará inmediatamente sin configuración adicional

## 📧 Soporte
Si tienes alguna duda sobre el uso del sistema sin backend, revisa:
1. Este archivo README
2. Los comentarios en el código de `js/local-api.js`
3. La consola del navegador para posibles errores

¡Disfruta de tu nuevo sitio web sin complicaciones técnicas! 🎉
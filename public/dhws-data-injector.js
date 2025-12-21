/**
 * Data Injector - Sincroniza datos de configuración con las páginas públicas
 * Carga datos desde localStorage (donde settings los guarda) y actualiza el DOM
 */

class DataInjector {
    constructor() {
        this.config = null;
        this.init();
    }

    async init() {
        await this.loadConfig();
        this.injectData();
        console.log('🔄 Data Injector inicializado');
    }

    /**
     * Cargar configuración SOLO desde config.json
     */
    async loadConfig() {
        try {
            console.log('🔍 Cargando configuración ÚNICAMENTE desde config.json...');

            // Cache buster para asegurar que se carga el archivo más reciente
            const response = await fetch(`../config.json?_=${Date.now()}`);
            if (response.ok) {
                this.config = await response.json();
                console.log('✅ Configuración cargada desde config.json (cache-bust)');
                console.log('📄 Config cargado:', this.config);
                return;
            } else {
                console.error('❌ No se pudo cargar config.json - Status:', response.status);
                this.config = null;
                return;
            }
        } catch (e) {
            console.error('❌ Error cargando config.json:', e.message);
            this.config = null;
        }
    }


    /**
     * Inyectar datos en el DOM SOLO si config.json está disponible
     */
    injectData() {
        if (!this.config) {
            console.warn('⚠️ config.json no disponible - No se inyectarán datos');
            return;
        }

        console.log('🔄 Iniciando inyección de datos desde config.json');

        try {
            // Actualizar título del sitio (solo si existe)
            if (this.config.site) {
                this.updateSiteTitle();
            }

            // Actualizar textos de homepage (solo si existen)
            if (this.config.texts?.homepage) {
                this.updateHomepageTexts();
            }

            // Actualizar información del artista (solo si existe)
            if (this.config.artist) {
                this.updateArtistInfo();
            }

            // Actualizar imágenes (solo las que existen)
            if (this.config.images) {
                this.updateImages();
            }

            // Actualizar tema/colores (solo si existe)
            if (this.config.theme?.colors) {
                this.updateTheme();
            }

            // Actualizar metadatos (solo si existe)
            if (this.config.site) {
                this.updateMetadata();
            }

            // Actualizar categorías (solo si existen)
            if (this.config.categories) {
                this.updateCategories();
            }

            console.log('✅ Datos inyectados desde config.json');

        } catch (error) {
            console.error('❌ Error inyectando datos:', error);
        }
    }

    /**
     * Actualizar título del sitio
     */
    updateSiteTitle() {
        // Actualizar títulos de página
        const titleElement = document.querySelector('title');
        if (titleElement && this.config.site) {
            titleElement.textContent = `${this.config.site.title} - ${this.config.site.tagline}`;
        }

        // Actualizar logos/nombre en navegación
        // DESHABILITADO: Mantener "InkMaster" como nombre de marca fijo para evitar delay
        // const logoElements = document.querySelectorAll('[class*="font-headline"]:not([data-dynamic-text])');
        // logoElements.forEach(element => {
        //     if (element.textContent.includes('InkMaster') && this.config.site.title) {
        //         element.textContent = this.config.site.title;
        //         element.setAttribute('data-dynamic-text', 'site-title');
        //     }
        // });

        console.log('🏷️ Nombre de marca "InkMaster" mantenido como fijo (no dinámico)');
    }

    /**
     * Actualizar textos de homepage
     */
    updateHomepageTexts() {
        if (!this.config.texts?.homepage) {
            console.log('⚠️ No hay datos de textos de homepage para actualizar');
            return;
        }

        console.log('📝 Actualizando textos de homepage:', this.config.texts.homepage);

        // Título principal de homepage
        if (this.config.texts.homepage.heroTitle) {
            const titleElements = document.querySelectorAll('[data-homepage-title]');
            titleElements.forEach(element => {
                element.textContent = this.config.texts.homepage.heroTitle;
                console.log('✅ Título homepage actualizado:', this.config.texts.homepage.heroTitle);
            });
        }

        // Título accent de homepage
        if (this.config.texts.homepage.heroTitleAccent) {
            const accentElements = document.querySelectorAll('[data-homepage-title-accent]');
            accentElements.forEach(element => {
                element.textContent = this.config.texts.homepage.heroTitleAccent;
                console.log('✅ Título accent homepage actualizado:', this.config.texts.homepage.heroTitleAccent);
            });
        }

        // Descripción de homepage
        if (this.config.texts.homepage.heroDescription) {
            const descElements = document.querySelectorAll('[data-homepage-description]');
            descElements.forEach(element => {
                element.textContent = this.config.texts.homepage.heroDescription;
                element.setAttribute('data-dynamic-text', 'hero-description');
                console.log('✅ Descripción homepage actualizada:', this.config.texts.homepage.heroDescription);
            });
        }
    }

    /**
     * Actualizar información del artista
     */
    updateArtistInfo() {
        if (!this.config.artist) {
            console.log('⚠️ No hay datos de artista para actualizar');
            return;
        }

        console.log('🎨 Actualizando información del artista:', this.config.artist);

        // Badge del artista - buscar por clase específica
        const badgeElements = document.querySelectorAll('.badge span, .badge-gold span');
        let badgeUpdated = false;
        badgeElements.forEach(element => {
            if (this.config.artist.badge) {
                element.textContent = this.config.artist.badge;
                element.setAttribute('data-dynamic-text', 'artist-badge');
                badgeUpdated = true;
                console.log('✅ Badge actualizado:', this.config.artist.badge);
            }
        });
        if (!badgeUpdated && badgeElements.length === 0) {
            console.log('⚠️ No se encontraron elementos de badge para actualizar');
        }

        // Nombre del artista - buscar en elementos específicos
        if (this.config.artist.name) {
            const artistNameElements = document.querySelectorAll('[data-artist-name], .artist-name');
            if (artistNameElements.length === 0) {
                console.log('⚠️ No se encontraron elementos específicos para nombre de artista');
            } else {
                artistNameElements.forEach(element => {
                    element.textContent = this.config.artist.name;
                    element.setAttribute('data-dynamic-text', 'artist-name');
                    console.log('✅ Nombre de artista actualizado:', this.config.artist.name);
                });
            }
        }

        // Biografía del artista - buscar por data attribute o clase específica
        if (this.config.artist.bio) {
            const bioElements = document.querySelectorAll('[data-artist-bio], .artist-bio');
            if (bioElements.length === 0) {
                // Fallback: buscar párrafos que contengan texto específico
                const fallbackBioElements = document.querySelectorAll('p');
                let bioUpdated = false;
                fallbackBioElements.forEach(element => {
                    if ((element.textContent.includes('años transformando') ||
                         element.textContent.includes('Transformo visiones') ||
                         element.textContent.includes('línea que trazo')) &&
                        !element.hasAttribute('data-dynamic-text')) {
                        element.textContent = this.config.artist.bio;
                        element.setAttribute('data-dynamic-text', 'artist-bio');
                        bioUpdated = true;
                        console.log('✅ Biografía actualizada (fallback):', this.config.artist.bio);
                    }
                });
                if (!bioUpdated) {
                    console.log('⚠️ No se encontraron elementos de biografía para actualizar');
                }
            } else {
                bioElements.forEach(element => {
                    element.textContent = this.config.artist.bio;
                    element.setAttribute('data-dynamic-text', 'artist-bio');
                    console.log('✅ Biografía actualizada:', this.config.artist.bio);
                });
            }
        }

        // Título/profesión del artista
        if (this.config.artist.title) {
            const titleElements = document.querySelectorAll('[data-artist-title], .artist-title');
            titleElements.forEach(element => {
                element.textContent = this.config.artist.title;
                element.setAttribute('data-dynamic-text', 'artist-title');
                console.log('✅ Título de artista actualizado:', this.config.artist.title);
            });
        }
    }

    /**
     * Verificar si es una ruta de imagen válida
     */
    isValidImagePath(imagePath) {
        if (!imagePath || typeof imagePath !== 'string') {
            return false;
        }

        // Aceptar URLs completas (http/https)
        if (imagePath.startsWith('http')) {
            return true;
        }

        // Aceptar rutas relativas hacia arriba (../)
        if (imagePath.startsWith('../')) {
            return true;
        }

        // Aceptar data URLs (base64)
        if (imagePath.startsWith('data:')) {
            return true;
        }

        // Aceptar rutas relativas dentro del proyecto (imagenes/...)
        if (imagePath.startsWith('imagenes/')) {
            return true;
        }

        // Log para rutas no reconocidas
        console.log(`⚠️ Ruta de imagen no reconocida: ${imagePath}`);
        return false;
    }

    /**
     * Normalizar ruta de imagen para uso desde páginas
     */
    normalizeImagePath(imagePath) {
        // URLs completas se mantienen igual
        if (imagePath.startsWith('http') || imagePath.startsWith('data:')) {
            return imagePath;
        }

        // Rutas que ya empiezan con ../ se mantienen
        if (imagePath.startsWith('../')) {
            return imagePath;
        }

        // Rutas relativas se convierten para acceso desde pages/
        if (imagePath.startsWith('imagenes/')) {
            return `../${imagePath}`;
        }

        console.log(`⚠️ No se pudo normalizar la ruta: ${imagePath}`);
        return imagePath;
    }

    /**
     * Actualizar imágenes SOLO si existen en config.json
     */
    updateImages() {
        console.log('🖼️ Verificando imágenes en config.json...');

        // Imagen hero de homepage - SOLO si existe en config
        const heroImage = this.config.images?.hero || this.config.images?.homepage?.hero;
        const heroImgElements = document.querySelectorAll('[data-homepage-hero-image]');

        if (heroImage && this.isValidImagePath(heroImage)) {
            const imageSrc = this.normalizeImagePath(heroImage);
            heroImgElements.forEach(img => {
                this.setImageDirectly(img, imageSrc, 'hero homepage');
            });
        } else {
            // Si no hay imagen válida, asegurar que no tenga src
            heroImgElements.forEach(img => {
                img.removeAttribute('src');
                console.log('ℹ️ No hay imagen hero válida - elemento sin src');
            });
        }

        // Imagen de perfil del artista - SOLO si existe en config
        const profileImage = this.config.images?.artistProfile || this.config.images?.artist?.profile;
        const profileImgElements = document.querySelectorAll('[data-artist-profile-image]');

        if (profileImage && this.isValidImagePath(profileImage)) {
            const imageSrc = this.normalizeImagePath(profileImage);
            profileImgElements.forEach(img => {
                this.setImageDirectly(img, imageSrc, 'perfil artista');
            });
        } else {
            // Si no hay imagen válida, asegurar que no tenga src
            profileImgElements.forEach(img => {
                img.removeAttribute('src');
                console.log('ℹ️ No hay imagen perfil válida - elemento sin src');
            });
        }
    }

    /**
     * Establecer imagen directamente sin delays ni transiciones
     */
    setImageDirectly(imgElement, imageSrc, imageName) {
        // Verificar si es la misma imagen para evitar recargas innecesarias
        const currentSrc = imgElement.src;
        const absoluteSrc = new URL(imageSrc, window.location.href).href;

        if (currentSrc === absoluteSrc) {
            console.log(`ℹ️ Imagen ${imageName} ya está correcta`);
            return;
        }

        // Establecer imagen directamente SIN transiciones ni pre-carga
        imgElement.src = imageSrc;
        imgElement.setAttribute('data-dynamic-image', imageName.replace(' ', '-'));

        console.log(`✅ Imagen ${imageName} establecida:`, imageSrc);
    }

    /**
     * Actualizar tema y colores
     */
    updateTheme() {
        if (!this.config.theme?.colors) return;

        const root = document.documentElement;
        const colors = this.config.theme.colors;

        // Aplicar colores CSS custom properties
        if (colors.primary) {
            root.style.setProperty('--color-primary', colors.primary);
            root.style.setProperty('--color-accent', colors.accent || colors.primary);
        }

        if (colors.background) {
            root.style.setProperty('--color-background', colors.background);
        }

        if (colors.surface) {
            root.style.setProperty('--color-surface', colors.surface);
        }

        if (colors.textPrimary) {
            root.style.setProperty('--color-text-primary', colors.textPrimary);
        }

        console.log('🎨 Tema aplicado a página pública:', colors);
    }

    /**
     * Actualizar metadatos SEO
     */
    updateMetadata() {
        if (!this.config.site) return;

        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && this.config.site.description) {
            metaDesc.setAttribute('content', `${this.config.site.title} - ${this.config.site.tagline}. ${this.config.site.description}`);
        }

        // Meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && this.config.site.title) {
            const keywords = `tatuajes, tattoo artist, arte corporal, tatuajes personalizados, ${this.config.site.title}`;
            metaKeywords.setAttribute('content', keywords);
        }
    }

    /**
     * Actualizar categorías dinámicamente
     */
    updateCategories() {
        if (!this.config.categories || !Array.isArray(this.config.categories)) {
            console.log('⚠️ No hay categorías para actualizar');
            return;
        }

        console.log('📂 Actualizando categorías desde config.json:', this.config.categories);

        const categoriesGrid = document.getElementById('categoriesGrid');
        if (!categoriesGrid) {
            console.log('⚠️ No se encontró el contenedor de categorías (categoriesGrid)');
            return;
        }

        // Limpiar contenido existente
        categoriesGrid.innerHTML = '';

        // Crear categorías dinámicamente
        this.config.categories.forEach((category, index) => {
            if (category.active !== false) { // Solo mostrar categorías activas
                const categoryCard = this.createCategoryCard(category, index);
                categoriesGrid.appendChild(categoryCard);
            }
        });

        // Actualizar contador de resultados
        const resultCount = document.getElementById('resultCount');
        if (resultCount) {
            const activeCategories = this.config.categories.filter(cat => cat.active !== false);
            resultCount.textContent = activeCategories.length;
        }

        console.log('✅ Categorías actualizadas dinámicamente');
    }

    /**
     * Crear elemento de tarjeta de categoría
     */
    createCategoryCard(category, index) {
        const article = document.createElement('article');

        // Crear classes y atributos
        const tags = Array.isArray(category.tags) ? category.tags.join(' ') : '';
        article.className = 'category-card card card-hover glow-gold group animate-scale-in';
        article.setAttribute('data-tags', tags);
        article.setAttribute('data-complexity', category.complexity || 'medium');
        article.setAttribute('data-name', category.name);
        article.style.animationDelay = `${index * 0.1}s`;

        // Normalizar ruta de imagen
        let imageSrc = category.image || 'https://via.placeholder.com/400x400/1a1a1a/ffffff?text=' + encodeURIComponent(category.name);
        if (imageSrc && !imageSrc.startsWith('http') && !imageSrc.startsWith('data:')) {
            imageSrc = this.normalizeImagePath(imageSrc);
        }

        // Crear contenido HTML
        article.innerHTML = `
            <div class="relative overflow-hidden aspect-portfolio">
                <img
                    src="${imageSrc}"
                    alt="${category.description || 'Tatuaje estilo ' + category.name}"
                    class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    loading="${index === 0 ? 'eager' : 'lazy'}"
                    onerror="this.src='https://via.placeholder.com/400x400/1a1a1a/ffffff?text=${encodeURIComponent(category.name)}'; this.onerror=null;"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
                <div class="overlay group-hover:opacity-100"></div>

                ${category.badge ? `
                    <div class="absolute top-4 right-4">
                        <span class="badge badge-gold text-xs">${category.badge}</span>
                    </div>
                ` : ''}

                <div class="absolute inset-0 flex flex-col justify-end p-6">
                    <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 class="font-headline text-2xl font-semibold text-white mb-2">${category.name}</h3>
                        <p class="text-text-secondary text-sm mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            ${category.description || 'Estilo único con características especiales.'}
                        </p>
                        ${category.tags && category.tags.length > 0 ? `
                            <div class="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                ${category.tags.map(tag => `<span class="text-xs px-2 py-1 bg-accent/20 text-accent rounded">${this.formatTag(tag)}</span>`).join('')}
                            </div>
                        ` : ''}
                        <a href="${category.link || 'portfolio_gallery.html'}" class="btn btn-outline btn-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span>Ver Trabajos</span>
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        `;

        return article;
    }

    /**
     * Formatear etiquetas para mostrar
     */
    formatTag(tag) {
        const tagMap = {
            'color': 'Color',
            'blackwork': 'Blanco y Negro',
            'detailed': 'Alta Detalle',
            'detallado': 'Alta Detalle',
            'minimalist': 'Minimalista',
            'large': 'Grande',
            'small': 'Pequeño',
            'traditional': 'Tradicional',
            'modern': 'Moderno',
            'moderno': 'Moderno',
            'grande': 'Grande',
            'cultural': 'Cultural',
            'bold': 'Audaz',
            'clásico': 'Clásico',
            'clasico': 'Clásico',
            'artístico': 'Artístico',
            'artistico': 'Artístico',
            'abstracto': 'Abstracto',
            'stippling': 'Puntillismo'
        };

        return tagMap[tag.toLowerCase()] || tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    /**
     * Recargar configuración (útil para actualizaciones en vivo)
     */
    async reloadConfig() {
        await this.loadConfig();
        this.injectData();
        console.log('🔄 Configuración recargada');
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.dataInjector = new DataInjector();
    });
} else {
    window.dataInjector = new DataInjector();
}

// NO escuchar cambios en localStorage - Solo config.json
console.log('ℹ️ Sistema configurado para leer ÚNICAMENTE desde config.json');

// Exponer función global para recarga manual
window.reloadSiteConfig = async () => {
    console.log('🔄 Recarga manual de configuración solicitada');
    if (window.dataInjector) {
        await window.dataInjector.reloadConfig();
    } else {
        console.warn('⚠️ Data Injector no está disponible');
    }
};

// Función de debugging - Solo para config.json
window.debugDataInjector = async () => {
    console.log('🛠️ DEBUG: Estado actual del Data Injector');
    if (window.dataInjector) {
        console.log('📊 Config actual desde config.json:', window.dataInjector.config);
        console.log('🔄 Recargando desde config.json...');
        await window.dataInjector.reloadConfig();
    } else {
        console.warn('⚠️ Data Injector no está disponible');
    }
};
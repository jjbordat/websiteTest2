/**
 * Sistema de Logo Dinámico para InkMaster Portfolio
 * Reemplaza automáticamente el SVG del logo por la imagen configurada en settings
 */

class DynamicLogoManager {
    constructor() {
        this.config = null;
        this.baseConfigPath = '../config.json';

        // Detectar si estamos en pages/ o en raíz
        if (window.location.pathname.includes('/pages/')) {
            this.baseConfigPath = '../config.json';
        } else {
            this.baseConfigPath = './config.json';
        }

        console.log('🎨 DynamicLogoManager inicializado');
    }

    async init() {
        try {
            console.log('🚀 Cargando configuración del logo...');
            await this.loadConfig();
            this.applyLogoToPage();
            console.log('✅ Logo dinámico configurado correctamente');
        } catch (error) {
            console.error('❌ Error configurando logo dinámico:', error);
            console.log('🔄 Usando logo por defecto');
        }
    }

    async loadConfig() {
        try {
            const response = await fetch(`${this.baseConfigPath}?_=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.config = await response.json();
            console.log('✅ Configuración cargada:', this.config);
        } catch (error) {
            console.warn('⚠️ No se pudo cargar config.json, usando logo por defecto');
            this.config = { theme: {} };
        }
    }

    applyLogoToPage() {
        const theme = this.config.theme || {};
        const logoPath = theme.logo;

        console.log('🎨 Aplicando logo:', logoPath);

        if (logoPath && logoPath.trim() !== '') {
            // Hay un logo configurado - reemplazar todos los SVGs del logo
            this.replaceLogoSVGs(logoPath);
        } else {
            // No hay logo configurado - usar SVG por defecto
            console.log('📋 Usando logo SVG por defecto');
        }
    }

    replaceLogoSVGs(logoPath) {
        // Selectores para encontrar los logos SVG
        const logoSelectors = [
            // Logo principal en header
            'header svg[viewBox="0 0 40 40"]',
            // Logo en footer
            'footer svg[viewBox="0 0 40 40"]',
            // Cualquier SVG que contenga el gradiente dorado específico
            'svg:has(defs linearGradient[id*="goldGradient"])',
            // Logos en navegación
            '.logo svg',
            // Selectores específicos por contenido
            'svg:has(path[d*="M20 8L22 15L28 12L24 18L32 20L24 22L28 28L22 25L20 32L18 25L12 28L16 22L8 20L16 18L12 12L18 15L20 8Z"])'
        ];

        // Normalizar ruta del logo
        const normalizedPath = this.normalizePath(logoPath);

        let replacedCount = 0;

        logoSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(svg => {
                    if (this.isLogoSVG(svg)) {
                        this.replaceSVGWithImage(svg, normalizedPath);
                        replacedCount++;
                    }
                });
            } catch (error) {
                // Algunos selectores pueden no ser compatibles en todos los navegadores
                console.warn(`⚠️ Selector no compatible: ${selector}`);
            }
        });

        console.log(`✅ ${replacedCount} logos SVG reemplazados por imagen`);
    }

    isLogoSVG(svg) {
        // Verificar si es realmente un SVG del logo basado en características específicas
        const viewBox = svg.getAttribute('viewBox');
        const hasGoldGradient = svg.querySelector('linearGradient[id*="goldGradient"]');
        const hasLogoPath = svg.querySelector('path[d*="M20 8L22 15L28 12L24 18L32 20L24 22L28 28L22 25L20 32L18 25L12 28L16 22L8 20L16 18L12 12L18 15L20 8Z"]');

        return viewBox === '0 0 40 40' || hasGoldGradient || hasLogoPath;
    }

    replaceSVGWithImage(svg, logoPath) {
        // Obtener dimensiones del SVG original
        const computedStyle = window.getComputedStyle(svg);
        const originalWidth = svg.getAttribute('width') || computedStyle.width || '40px';
        const originalHeight = svg.getAttribute('height') || computedStyle.height || '40px';
        const classes = svg.className.baseVal || svg.className || '';

        // Crear elemento img
        const img = document.createElement('img');
        img.src = logoPath;
        img.alt = 'InkMaster Logo';

        // Procesar clases eliminando las que limitan el tamaño
        if (classes) {
            // Remover clases de Tailwind que limitan el tamaño (w-*, h-*)
            const filteredClasses = classes.split(' ').filter(className => {
                return !className.match(/^w-\d+$/) && !className.match(/^h-\d+$/);
            }).join(' ');

            if (filteredClasses) {
                img.className = filteredClasses;
            }
        }

        // Configurar dimensiones de manera más flexible
        // Permitir que el logo sea más grande que el original si la imagen lo soporta
        const minSize = Math.max(
            parseInt(originalWidth) || 40,
            parseInt(originalHeight) || 40
        );

        // Establecer dimensiones más generosas para permitir logos más grandes
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.minWidth = minSize + 'px';
        img.style.minHeight = minSize + 'px';
        img.style.maxWidth = Math.max(minSize * 3, 120) + 'px'; // Permitir hasta el triple del tamaño original
        img.style.maxHeight = Math.max(minSize * 3, 120) + 'px';
        img.style.objectFit = 'contain';
        img.style.display = 'inline-block';

        // Asegurar que mantenga las proporciones y se vea bien
        img.style.verticalAlign = 'middle';

        // Copiar otros atributos importantes
        const importantAttrs = ['id', 'data-*', 'aria-*'];
        importantAttrs.forEach(attr => {
            if (attr === 'data-*' || attr === 'aria-*') {
                // Copiar todos los atributos data-* y aria-*
                Array.from(svg.attributes).forEach(attribute => {
                    if (attribute.name.startsWith(attr.replace('*', ''))) {
                        img.setAttribute(attribute.name, attribute.value);
                    }
                });
            } else if (svg.hasAttribute(attr)) {
                img.setAttribute(attr, svg.getAttribute(attr));
            }
        });

        // Manejar errores de carga
        img.onerror = () => {
            console.error('❌ Error cargando logo:', logoPath);
            console.log('🔄 Restaurando SVG original');
            // No reemplazar si hay error - mantener SVG original
        };

        img.onload = () => {
            console.log('✅ Logo cargado exitosamente:', logoPath);
        };

        // Reemplazar SVG con IMG
        svg.parentNode.replaceChild(img, svg);

        console.log(`🔄 SVG reemplazado por imagen: ${logoPath}`);
    }

    normalizePath(logoPath) {
        // Si es una URL externa, devolverla tal como está
        if (logoPath.startsWith('http://') || logoPath.startsWith('https://')) {
            return logoPath;
        }

        // Si es una ruta relativa que empieza con 'imagenes/', agregar '../' si estamos en pages/
        if (logoPath.startsWith('imagenes/')) {
            if (window.location.pathname.includes('/pages/')) {
                return `../${logoPath}`;
            }
            return logoPath;
        }

        // Si ya tiene '../', devolverla tal como está
        if (logoPath.startsWith('../')) {
            return logoPath;
        }

        // Para cualquier otra ruta, asumir que es relativa y necesita '../' si estamos en pages/
        if (window.location.pathname.includes('/pages/')) {
            return `../${logoPath}`;
        }

        return logoPath;
    }
}

// Auto-inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const logoManager = new DynamicLogoManager();
    logoManager.init();
});

// Exportar para uso global si es necesario
window.DynamicLogoManager = DynamicLogoManager;
/**
 * 🎨 Force Theme Loader - Aplicación forzada de tema
 * Soluciona problemas cuando dhws-data-injector no aplica colores correctamente
 */

class ForceThemeLoader {
    constructor() {
        this.config = null;
        this.applied = false;
        this.init();
    }

    async init() {
        console.log('🎨 ForceThemeLoader iniciando...');

        // Cargar config inmediatamente
        await this.loadConfig();

        // Aplicar tema inmediatamente
        this.applyTheme();

        // Volver a aplicar después de un momento (por si acaso)
        setTimeout(() => {
            this.applyTheme();
        }, 1000);

        // Aplicar cuando el DOM esté completamente cargado
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.applyTheme(), 500);
            });
        }

        console.log('✅ ForceThemeLoader inicializado');
    }

    async loadConfig() {
        try {
            const response = await fetch('../config.json?_=' + Date.now());
            if (response.ok) {
                this.config = await response.json();
                console.log('📄 Config cargado por ForceThemeLoader:', this.config.theme?.colors);
                return true;
            }
        } catch (error) {
            console.error('❌ ForceThemeLoader - Error cargando config:', error);
        }
        return false;
    }

    applyTheme() {
        if (!this.config?.theme?.colors) {
            console.warn('⚠️ ForceThemeLoader - No hay colores para aplicar');
            return;
        }

        const colors = this.config.theme.colors;
        console.log('🎨 ForceThemeLoader aplicando colores:', colors);

        try {
            this.setCSSVariables(colors);
            this.overrideTailwindClasses(colors);
            this.forceElementStyles(colors);
            this.updateArtistBadge(); // ← Nuevo: actualizar badge

            this.applied = true;
            console.log('✅ Tema aplicado exitosamente por ForceThemeLoader');

            // Disparar evento personalizado
            window.dispatchEvent(new CustomEvent('themeForceApplied', {
                detail: { colors }
            }));

        } catch (error) {
            console.error('❌ Error aplicando tema:', error);
        }
    }

    setCSSVariables(colors) {
        const root = document.documentElement;

        // Variables principales
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-accent', colors.accent || colors.primary);
        root.style.setProperty('--color-background', colors.background);
        root.style.setProperty('--color-surface', colors.surface);
        root.style.setProperty('--color-text-primary', colors.textPrimary);

        // Variables adicionales para compatibilidad
        root.style.setProperty('--accent-color', colors.accent || colors.primary);
        root.style.setProperty('--primary-color', colors.primary);
        root.style.setProperty('--bg-primary', colors.primary);
        root.style.setProperty('--text-accent', colors.accent || colors.primary);

        console.log('🔧 Variables CSS aplicadas');
    }

    overrideTailwindClasses(colors) {
        // Crear o actualizar hoja de estilos dinámicos
        let dynamicStyles = document.getElementById('force-theme-styles');
        if (!dynamicStyles) {
            dynamicStyles = document.createElement('style');
            dynamicStyles.id = 'force-theme-styles';
            document.head.appendChild(dynamicStyles);
        }

        const accentColor = colors.accent || colors.primary;
        const primaryColor = colors.primary;

        // CSS override para clases de Tailwind
        const css = `
            /* 🎨 Override forzado de colores - ForceThemeLoader */
            .text-accent,
            .hover\\:text-accent:hover,
            .text-gradient-gold {
                color: ${accentColor} !important;
            }

            .bg-accent,
            .hover\\:bg-accent:hover {
                background-color: ${accentColor} !important;
            }

            .border-accent,
            .hover\\:border-accent:hover {
                border-color: ${accentColor} !important;
            }

            .btn-primary {
                background-color: ${accentColor} !important;
                border-color: ${accentColor} !important;
            }

            .btn-primary:hover {
                background-color: ${accentColor} !important;
                filter: brightness(1.1) !important;
            }

            .glow-gold {
                box-shadow: 0 0 20px ${accentColor}40 !important;
            }

            .shadow-gold-lg {
                box-shadow: 0 10px 15px -3px ${accentColor}40, 0 4px 6px -2px ${accentColor}20 !important;
            }

            /* SVG fills para iconos */
            .text-accent svg,
            [fill="currentColor"] {
                fill: ${accentColor} !important;
            }

            /* Gradientes */
            .text-gradient-gold {
                background: linear-gradient(135deg, ${accentColor}, ${accentColor}dd) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
                background-clip: text !important;
            }

            /* Badge gold */
            .badge-gold {
                background-color: ${accentColor}20 !important;
                border-color: ${accentColor}40 !important;
                color: ${accentColor} !important;
            }

            /* Card gold */
            .card-gold {
                border-color: ${accentColor}40 !important;
                background: linear-gradient(135deg, ${accentColor}10, ${accentColor}05) !important;
            }

            /* Floating WhatsApp button */
            .fixed.bg-accent,
            #floatingWhatsappBtn {
                background-color: ${accentColor} !important;
            }

            /* Stop colors for gradients */
            #goldGradient stop {
                stop-color: ${accentColor} !important;
            }

            /* Navigation active states */
            .text-accent.font-medium {
                color: ${accentColor} !important;
            }

            /* Footer brand */
            #goldGradientFooter stop {
                stop-color: ${accentColor} !important;
            }

            /* Elementos adicionales que podrían faltar */
            .accent-color,
            [class*="accent"]:not(.bg-accent):not(.text-accent):not(.border-accent) {
                color: ${accentColor} !important;
            }

            /* Links hover */
            a:hover,
            .hover\\:text-accent-light:hover {
                color: ${accentColor}dd !important;
            }

            /* Card hovers */
            .card-hover:hover {
                border-color: ${accentColor}40 !important;
            }

            /* Progress bars, indicators */
            .progress-accent,
            .indicator-accent {
                background-color: ${accentColor} !important;
            }

            /* Form elements focus */
            input:focus,
            textarea:focus,
            select:focus {
                border-color: ${accentColor} !important;
                box-shadow: 0 0 0 3px ${accentColor}20 !important;
            }

            /* Active states */
            .active,
            .is-active,
            [data-active="true"] {
                color: ${accentColor} !important;
            }

            /* Badge responsive text - FIX para texto largo */
            .badge,
            .badge-gold {
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                max-width: none !important;
                flex-shrink: 0 !important;
            }

            .badge span,
            .badge-gold span {
                font-size: 0.875rem !important;
                line-height: 1.2 !important;
                white-space: normal !important;
                word-break: break-word !important;
            }

            /* Mobile responsive badge */
            @media (max-width: 640px) {
                .badge span,
                .badge-gold span {
                    font-size: 0.8rem !important;
                    line-height: 1.1 !important;
                }
            }
        `;

        dynamicStyles.textContent = css;
        console.log('🎨 Override CSS aplicado con mejoras para badge');
    }

    forceElementStyles(colors) {
        const accentColor = colors.accent || colors.primary;

        // Forzar elementos específicos que podrían no responder al CSS
        const elementsToForce = [
            // Botones primarios
            { selector: '.btn-primary', style: 'backgroundColor', value: accentColor },
            { selector: '.btn-primary', style: 'borderColor', value: accentColor },

            // Texto accent - MEJORADO
            { selector: '.text-accent', style: 'color', value: accentColor },
            { selector: '.text-gradient-gold', style: 'color', value: accentColor },
            { selector: '.hover\\:text-accent:hover', style: 'color', value: accentColor },
            { selector: '.hover\\:text-accent-light:hover', style: 'color', value: `${accentColor}dd` },
            { selector: 'a.text-accent', style: 'color', value: accentColor },

            // Backgrounds - MEJORADO
            { selector: '.bg-accent', style: 'backgroundColor', value: accentColor },
            { selector: '.hover\\:bg-accent:hover', style: 'backgroundColor', value: accentColor },
            { selector: '#floatingWhatsappBtn', style: 'backgroundColor', value: accentColor },
            { selector: '.floating', style: 'backgroundColor', value: accentColor },

            // Borders - NUEVO
            { selector: '.border-accent', style: 'borderColor', value: accentColor },
            { selector: '.hover\\:border-accent:hover', style: 'borderColor', value: accentColor },
            { selector: '.border-accent\\/20', style: 'borderColor', value: `${accentColor}33` },
            { selector: '.border-accent\\/30', style: 'borderColor', value: `${accentColor}4D` },

            // SVGs con gradientes
            { selector: '#goldGradient stop', style: 'stopColor', value: accentColor },
            { selector: '#goldGradientFooter stop', style: 'stopColor', value: accentColor }
        ];

        elementsToForce.forEach(({ selector, style, value }) => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    if (element && element.style) {
                        element.style[style] = value;
                    }
                });
            } catch (error) {
                // Silenciar errores de selectores inválidos
            }
        });

        console.log('🔧 Estilos forzados aplicados');
    }

    updateArtistBadge() {
        if (!this.config?.artist?.badge) {
            console.warn('⚠️ No hay badge del artista para actualizar');
            return;
        }

        const badgeText = this.config.artist.badge;
        console.log('📛 Actualizando badge del artista:', badgeText);

        // Buscar elementos con data-artist-badge
        const badgeElements = document.querySelectorAll('[data-artist-badge]');
        badgeElements.forEach(element => {
            if (element) {
                element.textContent = badgeText;
                console.log('✅ Badge actualizado:', badgeText);
            }
        });

        // También buscar por texto específico (fallback)
        const textNodes = document.querySelectorAll('.badge span, .badge-gold span');
        textNodes.forEach(element => {
            if (element && (
                element.textContent.includes('Profesional Certificado') ||
                element.textContent.includes('Artista Profesional')
            )) {
                element.textContent = badgeText;
                console.log('✅ Badge encontrado y actualizado (fallback):', badgeText);
            }
        });
    }

    // Función pública para re-aplicar tema
    reapply() {
        console.log('🔄 Re-aplicando tema...');
        this.applyTheme();
    }

    // Función para verificar si el tema está aplicado
    isApplied() {
        return this.applied;
    }

    // Función para obtener colores actuales
    getCurrentColors() {
        return this.config?.theme?.colors || null;
    }
}

// Crear instancia global
window.forceThemeLoader = new ForceThemeLoader();

// Función global para re-aplicar tema
window.reapplyTheme = function() {
    if (window.forceThemeLoader) {
        window.forceThemeLoader.reapply();
    }
};

// Auto-reaplicar si se detectan cambios
let lastThemeCheck = '';
setInterval(() => {
    if (window.forceThemeLoader && window.forceThemeLoader.config) {
        const currentTheme = JSON.stringify(window.forceThemeLoader.config.theme?.colors);
        if (currentTheme !== lastThemeCheck) {
            lastThemeCheck = currentTheme;
            console.log('🔄 Cambio de tema detectado, re-aplicando...');
            window.forceThemeLoader.reapply();
        }
    }
}, 2000);

console.log('🎨 Force Theme Loader script cargado');
/**
 * 🔥 INSTANT FIX - Solución inmediata para problemas específicos
 * Aplica correcciones directas sin depender de otros sistemas
 */

console.log('🔥 Instant Fix cargando...');

class InstantFix {
    constructor() {
        this.config = null;
        this.applied = false;
        this.fixAttempts = 0;
        this.maxAttempts = 10;

        this.init();
    }

    async init() {
        console.log('🎯 InstantFix: Iniciando reparaciones específicas...');

        // Cargar config
        await this.loadConfig();

        // Aplicar fixes inmediatamente
        this.applyInstantFixes();

        // Continuar aplicando cada 500ms hasta que funcione
        this.startPeriodicFix();

        // También aplicar cuando el DOM cambie
        this.observeDOMChanges();
    }

    async loadConfig() {
        try {
            const response = await fetch('../config.json?_=' + Date.now());
            if (response.ok) {
                this.config = await response.json();
                console.log('📄 Config cargado por InstantFix');
            }
        } catch (error) {
            console.warn('⚠️ InstantFix no pudo cargar config, usando valores por defecto');
            this.config = {
                theme: { colors: { primary: '#D4AF37', accent: '#D4AF37' } },
                artist: { badge: 'INgeniero Profesional Certificado' }
            };
        }
    }

    applyInstantFixes() {
        if (this.fixAttempts >= this.maxAttempts) return;
        this.fixAttempts++;

        console.log(`🔧 InstantFix: Aplicando correcciones (intento ${this.fixAttempts})...`);

        const accentColor = this.config?.theme?.colors?.accent || '#D4AF37';

        try {
            // 1. FIX: Botones específicos que fallan
            this.fixSpecificButtons(accentColor);

            // 2. FIX: Badge del artista cortado
            this.fixArtistBadge();

            // 3. FIX: Aplicar CSS forzado
            this.injectForceCSS(accentColor);

            // 4. FIX: Elementos por ID específico
            this.fixElementsByID(accentColor);

            console.log('✅ InstantFix: Todas las correcciones aplicadas');
            this.applied = true;

        } catch (error) {
            console.error('❌ Error en InstantFix:', error);
        }
    }

    fixSpecificButtons(accentColor) {
        console.log('🎯 Reparando botones específicos...');

        // Botones problema identificados:
        const buttonFixes = [
            // "Ver Portafolio" button
            { selector: 'a[href="portfolio_gallery.html"].btn-primary', name: 'Ver Portafolio' },

            // "Ver Galería Completa" button
            { selector: 'a[href="portfolio_gallery.html"].btn-outline', name: 'Ver Galería Completa' },

            // WhatsApp buttons comentados para evitar problemas de visualización
            // { selector: '#heroWhatsappBtn', name: 'Consulta WhatsApp' },
            // { selector: '#ctaWhatsappBtn', name: 'Contactar WhatsApp' },
            // { selector: '#floatingWhatsappBtn', name: 'Floating WhatsApp' },

            // Todos los btn-outline
            { selector: '.btn-outline', name: 'Botones Outline' },

            // Todos los btn-primary
            { selector: '.btn-primary', name: 'Botones Primary' }
        ];

        buttonFixes.forEach(({ selector, name }) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (element) {
                    // Aplicar estilos directamente
                    element.style.setProperty('background-color', accentColor, 'important');
                    element.style.setProperty('border-color', accentColor, 'important');
                    element.style.setProperty('color', 'white', 'important');

                    // Para btn-outline, ajustar
                    if (element.classList.contains('btn-outline')) {
                        element.style.setProperty('background-color', 'transparent', 'important');
                        element.style.setProperty('color', accentColor, 'important');

                        // Al hacer hover
                        element.addEventListener('mouseenter', () => {
                            element.style.setProperty('background-color', accentColor, 'important');
                            element.style.setProperty('color', 'white', 'important');
                        });

                        element.addEventListener('mouseleave', () => {
                            element.style.setProperty('background-color', 'transparent', 'important');
                            element.style.setProperty('color', accentColor, 'important');
                        });
                    }

                    console.log(`✅ ${name} reparado: ${selector}`);
                }
            });
        });
    }

    fixArtistBadge() {
        console.log('📛 Reparando badge del artista...');

        const badgeText = this.config?.artist?.badge || 'INgeniero Profesional Certificado';

        // 1. Buscar por data-artist-badge
        const badgeElements = document.querySelectorAll('[data-artist-badge]');
        badgeElements.forEach(element => {
            element.textContent = badgeText;
            console.log('✅ Badge actualizado (data-attribute)');
        });

        // 2. Buscar por contenido de texto
        const allSpans = document.querySelectorAll('.badge span, .badge-gold span');
        allSpans.forEach(element => {
            if (element.textContent.includes('Profesional') || element.textContent.includes('Certificado')) {
                element.textContent = badgeText;
                console.log('✅ Badge actualizado (texto)');
            }
        });

        // 3. Arreglar CSS del badge para evitar cortes
        const badgeContainers = document.querySelectorAll('.badge, .badge-gold');
        badgeContainers.forEach(badge => {
            // Asegurar que el contenedor permita el texto completo
            badge.style.setProperty('white-space', 'nowrap', 'important');
            badge.style.setProperty('overflow', 'visible', 'important');
            badge.style.setProperty('text-overflow', 'unset', 'important');
            badge.style.setProperty('max-width', 'none', 'important');
            badge.style.setProperty('flex-shrink', '0', 'important');

            // Ajustar padding si es necesario
            badge.style.setProperty('padding', '0.5rem 0.75rem', 'important');
            badge.style.setProperty('line-height', '1.2', 'important');

            console.log('✅ Badge CSS reparado');
        });

        // 4. Para mobile, hacer el texto más pequeño pero visible
        const mediaQuery = window.matchMedia('(max-width: 640px)');
        if (mediaQuery.matches) {
            badgeContainers.forEach(badge => {
                const span = badge.querySelector('span');
                if (span) {
                    span.style.setProperty('font-size', '0.8rem', 'important');
                    span.style.setProperty('white-space', 'normal', 'important');
                    span.style.setProperty('word-break', 'break-word', 'important');
                    span.style.setProperty('line-height', '1.1', 'important');
                    console.log('✅ Badge responsive para móvil');
                }
            });
        }
    }

    injectForceCSS(accentColor) {
        console.log('💉 Inyectando CSS forzado...');

        // Crear o actualizar hoja de estilos
        let forceStyles = document.getElementById('instant-fix-styles');
        if (!forceStyles) {
            forceStyles = document.createElement('style');
            forceStyles.id = 'instant-fix-styles';
            document.head.appendChild(forceStyles);
        }

        const css = `
            /* 🔥 INSTANT FIX - Estilos forzados específicos */

            /* Botones primarios - FORZADO */
            .btn-primary,
            a.btn-primary,
            button.btn-primary {
                background-color: ${accentColor} !important;
                border-color: ${accentColor} !important;
                color: white !important;
            }

            .btn-primary:hover,
            a.btn-primary:hover,
            button.btn-primary:hover {
                background-color: ${accentColor} !important;
                filter: brightness(1.1) !important;
                transform: translateY(-1px) !important;
            }

            /* Botones outline - FORZADO */
            .btn-outline,
            a.btn-outline,
            button.btn-outline {
                background-color: transparent !important;
                border-color: ${accentColor} !important;
                color: ${accentColor} !important;
            }

            .btn-outline:hover,
            a.btn-outline:hover,
            button.btn-outline:hover {
                background-color: ${accentColor} !important;
                border-color: ${accentColor} !important;
                color: white !important;
            }

            /* Botones específicos por ID - COMENTADO para evitar problemas de visualización */
            /*
            #heroWhatsappBtn,
            #ctaWhatsappBtn,
            #floatingWhatsappBtn {
                background-color: ${accentColor} !important;
                border-color: ${accentColor} !important;
            }
            */

            /* Glow effects - OVERRIDE del dorado */
            .glow-gold {
                box-shadow: 0 0 20px ${accentColor}40 !important;
            }

            .shadow-gold-lg {
                box-shadow: 0 10px 15px -3px ${accentColor}40, 0 4px 6px -2px ${accentColor}20 !important;
            }

            /* Badge fix - ANTI-CORTE */
            .badge,
            .badge-gold {
                white-space: nowrap !important;
                overflow: visible !important;
                text-overflow: unset !important;
                max-width: none !important;
                flex-shrink: 0 !important;
                padding: 0.5rem 0.75rem !important;
            }

            .badge span,
            .badge-gold span {
                white-space: normal !important;
                word-break: break-word !important;
                line-height: 1.2 !important;
                display: inline !important;
                font-size: 0.875rem !important;
            }

            /* Mobile badge */
            @media (max-width: 640px) {
                .badge span,
                .badge-gold span {
                    font-size: 0.8rem !important;
                    line-height: 1.1 !important;
                }
            }

            /* Floating button específico - COMENTADO para evitar problemas */
            /*
            .fixed.bottom-6.right-6 {
                background-color: ${accentColor} !important;
            }
            */

            /* Links accent */
            .text-accent,
            a.text-accent {
                color: ${accentColor} !important;
            }

            .hover\\:text-accent:hover {
                color: ${accentColor} !important;
            }

            /* Gradientes SVG */
            #goldGradient stop,
            #goldGradientFooter stop {
                stop-color: ${accentColor} !important;
            }
        `;

        forceStyles.textContent = css;
        console.log('✅ CSS forzado inyectado');
    }

    fixElementsByID(accentColor) {
        console.log('🆔 Reparando elementos específicos por ID...');

        // Elementos de WhatsApp comentados para evitar problemas de visualización
        const specificElements = [
            // 'heroWhatsappBtn',
            // 'ctaWhatsappBtn',
            // 'floatingWhatsappBtn',
            // 'footerWhatsappBtn'
        ];

        specificElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.setProperty('background-color', accentColor, 'important');
                element.style.setProperty('border-color', accentColor, 'important');
                console.log(`✅ Elemento #${id} reparado`);
            }
        });
    }

    startPeriodicFix() {
        // Aplicar fix cada 500ms durante los primeros 5 segundos
        const interval = setInterval(() => {
            if (this.fixAttempts >= this.maxAttempts) {
                clearInterval(interval);
                console.log('🏁 InstantFix: Completado después de', this.fixAttempts, 'intentos');
                return;
            }

            this.applyInstantFixes();
        }, 500);

        // Parar después de 5 segundos
        setTimeout(() => {
            clearInterval(interval);
        }, 5000);
    }

    observeDOMChanges() {
        // Observar cambios en el DOM para reaplicar fixes
        const observer = new MutationObserver((mutations) => {
            let shouldReapply = false;

            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if ((node.classList?.contains('btn') && !node.id?.includes('Whatsapp')) || node.classList?.contains('badge')) {
                                shouldReapply = true;
                            }
                        }
                    });
                }
            });

            if (shouldReapply && this.fixAttempts < this.maxAttempts) {
                console.log('🔄 DOM changed, reapplying fixes...');
                setTimeout(() => this.applyInstantFixes(), 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Método público para reaplicar manualmente
    reapply() {
        console.log('🔄 InstantFix: Reaplicación manual...');
        this.fixAttempts = 0; // Reset counter
        this.applyInstantFixes();
    }
}

// Crear instancia global
window.instantFix = new InstantFix();

// Función global para reaplicar
window.reapplyInstantFix = function() {
    if (window.instantFix) {
        window.instantFix.reapply();
    }
};

console.log('🔥 Instant Fix script cargado y activo');
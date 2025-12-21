/**
 * Sistema de Enlaces Dinámicos para InkMaster Portfolio
 * Carga automáticamente enlaces de WhatsApp, email y redes sociales desde config.json
 *
 * Uso: Incluir este archivo en todas las páginas HTML
 */

class DynamicLinksManager {
    constructor() {
        this.config = null;
        this.baseConfigPath = '../config.json';

        // Detectar si estamos en pages/ o en raíz
        if (window.location.pathname.includes('/pages/')) {
            this.baseConfigPath = '../config.json';
        } else {
            this.baseConfigPath = './config.json';
        }

        console.log('🔗 DynamicLinksManager inicializado');
    }

    async init() {
        try {
            console.log('🚀 Cargando enlaces dinámicos...');
            await this.loadConfig();
            this.updateAllLinks();
            this.setupGlobalFunctions();
            console.log('✅ Enlaces dinámicos configurados correctamente');
        } catch (error) {
            console.error('❌ Error configurando enlaces dinámicos:', error);
        }
    }

    async loadConfig() {
        try {
            const response = await fetch(`${this.baseConfigPath}?_=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            this.config = await response.json();
            console.log('✅ Config cargado:', this.config);
        } catch (error) {
            console.warn('⚠️ No se pudo cargar config.json, usando valores por defecto');
            this.config = { artist: {} };
        }
    }

    updateAllLinks() {
        const artist = this.config.artist || {};

        this.updateWhatsAppLinks(artist.whatsapp || '');
        this.updateEmailLinks(artist.email || '');
        this.updateSocialLinks({
            instagram: artist.instagram || '',
            facebook: artist.facebook || '',
            tiktok: artist.tiktok || '',
            youtube: artist.youtube || ''
        });
    }

    updateWhatsAppLinks(whatsappNumber) {
        console.log('📱 Actualizando enlaces de WhatsApp:', whatsappNumber);

        const message = encodeURIComponent('¡Hola! Me interesa obtener más información sobre tus trabajos de tatuajes. ¿Podríamos agendar una consulta?');
        const cleanNumber = whatsappNumber ? whatsappNumber.replace(/[^\d]/g, '') : '';
        const whatsappURL = cleanNumber ? `https://wa.me/${cleanNumber}?text=${message}` : '#';

        console.log('🔗 URL de WhatsApp:', whatsappURL);

        // Selectores comunes para botones de WhatsApp
        const selectors = [
            // Por ID específicos
            '#heroWhatsappBtn',
            '#ctaWhatsappBtn',
            '#footerWhatsappBtn',
            '#floatingWhatsappBtn',

            // Por clases y contenido (removido 'a[href*="contact.html"]' que causaba problemas)
            'a[aria-label*="WhatsApp" i]',
            'a[aria-label*="Contactar por WhatsApp" i]'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (this.isWhatsAppButton(element)) {
                    this.setupWhatsAppLink(element, whatsappURL);
                }
            });
        });
    }

    isWhatsAppButton(element) {
        const text = element.textContent.toLowerCase();
        const aria = (element.getAttribute('aria-label') || '').toLowerCase();
        const id = element.id?.toLowerCase() || '';

        // Excluir específicamente los botones del header de navegación
        if (id === 'headercontactbtn' || id === 'mobilecontactbtn') {
            return false;
        }

        return text.includes('whatsapp') ||
               text.includes('contactar') ||
               aria.includes('whatsapp') ||
               aria.includes('contactar') ||
               element.querySelector('svg path[d*="17.472"]'); // SVG específico de WhatsApp
    }

    setupWhatsAppLink(element, whatsappURL) {
        console.log('🔧 Configurando enlace WhatsApp:', element);

        element.href = whatsappURL;
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', 'noopener noreferrer');

        // Event listener para forzar apertura
        element.addEventListener('click', function(e) {
            console.log('📱 Click en WhatsApp:', this.href);

            if (this.href && this.href !== '#' && this.href.includes('wa.me')) {
                e.preventDefault();
                console.log('🚀 Abriendo WhatsApp:', this.href);
                window.open(this.href, '_blank', 'noopener,noreferrer');
                return false;
            }
        });
    }

    updateEmailLinks(email) {
        console.log('📧 Actualizando enlaces de email:', email);

        const emailURL = email ? `mailto:${email}?subject=${encodeURIComponent('Consulta sobre tatuajes - InkMaster')}` : '#';

        const selectors = [
            '#footerEmailBtn',
            'a[href*="mailto:"]',
            'a[aria-label*="Email" i]'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.href = emailURL;
                if (email) {
                    element.setAttribute('target', '_blank');
                    element.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });
    }

    updateSocialLinks(socialData) {
        console.log('🌐 Actualizando redes sociales:', socialData);

        // Instagram
        console.log('📸 Configurando Instagram:', socialData.instagram);
        const instagramElements = document.querySelectorAll('#instagramBtn, #mainInstagramBtn, a[aria-label*="Instagram" i]');
        console.log('🔍 Elementos Instagram encontrados:', instagramElements.length);
        instagramElements.forEach(element => {
            console.log('🔧 Configurando elemento Instagram:', element);
            console.log('  📍 ID del elemento:', element.id);
            console.log('  📍 Clases:', element.className);
            console.log('  📍 Href actual:', element.href);

            element.href = socialData.instagram || '#';
            if (socialData.instagram && socialData.instagram !== '#') {
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');

                // Agregar event listener forzado para los botones del footer
                element.addEventListener('click', function(e) {
                    console.log('🚀 CLICK DETECTADO en', this.id, '- navegando a:', this.href);
                    if (this.href && this.href !== '#' && this.href.includes('instagram.com')) {
                        e.preventDefault();
                        console.log('🔴 Forzando apertura de Instagram:', this.href);
                        window.open(this.href, '_blank', 'noopener,noreferrer');
                        return false;
                    }
                });

                console.log('✅ Instagram configurado con URL:', element.href);
            } else {
                console.log('⚠️ Instagram sin URL válida');
            }
        });

        // Facebook
        console.log('👥 Configurando Facebook:', socialData.facebook);
        const facebookElements = document.querySelectorAll('#facebookBtn, #mainFacebookBtn, a[aria-label*="Facebook" i]');
        console.log('🔍 Elementos Facebook encontrados:', facebookElements.length);
        facebookElements.forEach(element => {
            console.log('🔧 Configurando elemento Facebook:', element);
            console.log('  📍 ID del elemento:', element.id);
            console.log('  📍 Clases:', element.className);
            console.log('  📍 Href actual:', element.href);

            element.href = socialData.facebook || '#';
            if (socialData.facebook && socialData.facebook !== '#') {
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');

                // Agregar event listener forzado para los botones del footer
                element.addEventListener('click', function(e) {
                    console.log('🚀 CLICK DETECTADO en', this.id, '- navegando a:', this.href);
                    if (this.href && this.href !== '#' && this.href.includes('facebook.com')) {
                        e.preventDefault();
                        console.log('🔴 Forzando apertura de Facebook:', this.href);
                        window.open(this.href, '_blank', 'noopener,noreferrer');
                        return false;
                    }
                });

                console.log('✅ Facebook configurado con URL:', element.href);
            } else {
                console.log('⚠️ Facebook sin URL válida');
            }
        });

        // TikTok
        console.log('🎵 Configurando TikTok:', socialData.tiktok);
        const tiktokElements = document.querySelectorAll('#tiktokBtn, a[aria-label*="TikTok" i]');
        tiktokElements.forEach(element => {
            element.href = socialData.tiktok || '#';
            if (socialData.tiktok && socialData.tiktok !== '#') {
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');
            }
        });

        // YouTube
        console.log('📹 Configurando YouTube:', socialData.youtube);
        const youtubeElements = document.querySelectorAll('#youtubeBtn, a[aria-label*="YouTube" i]');
        youtubeElements.forEach(element => {
            element.href = socialData.youtube || '#';
            if (socialData.youtube && socialData.youtube !== '#') {
                element.setAttribute('target', '_blank');
                element.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    setupGlobalFunctions() {
        // Funciones globales para debugging
        window.testWhatsApp = () => {
            const artist = this.config.artist || {};
            const number = artist.whatsapp || '+573118321831';
            const message = encodeURIComponent('¡Hola! Me interesa obtener más información sobre tus trabajos de tatuajes. ¿Podríamos agendar una consulta?');
            const cleanNumber = number.replace(/[^\d]/g, '');
            const testURL = `https://wa.me/${cleanNumber}?text=${message}`;

            console.log('🧪 PRUEBA DE WHATSAPP:');
            console.log('📞 Número:', number);
            console.log('🔗 URL:', testURL);

            window.open(testURL, '_blank');
            return testURL;
        };

        window.debugLinks = () => {
            console.log('🔍 DEBUG DE ENLACES:');
            console.log('📋 Config actual:', this.config);

            console.log('\n📱 ENLACES DE WHATSAPP:');
            document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
                console.log('  🟢', link.id || 'sin-id', '→', link.href);
            });

            console.log('\n📧 ENLACES DE EMAIL:');
            document.querySelectorAll('a[href*="mailto:"]').forEach(link => {
                console.log('  📧', link.id || 'sin-id', '→', link.href);
            });

            console.log('\n🌐 ENLACES DE REDES SOCIALES:');
            document.querySelectorAll('#instagramBtn, #mainInstagramBtn, #facebookBtn, #mainFacebookBtn, #tiktokBtn, #youtubeBtn').forEach(link => {
                console.log('  🔗', link.id, '→', link.href, `(${link.getAttribute('aria-label')})`);
            });

            console.log('\n🔍 TODOS LOS ENLACES CON #:');
            document.querySelectorAll('a[href="#"]').forEach(link => {
                console.log('  ⚠️', link.id || 'sin-id', '→', link.textContent.trim().substring(0, 30));
            });
        };

        window.testSocial = () => {
            console.log('🧪 PRUEBA DE REDES SOCIALES:');
            const artist = this.config.artist || {};

            console.log('📋 URLs en config:');
            console.log('  📸 Instagram:', artist.instagram);
            console.log('  👥 Facebook:', artist.facebook);
            console.log('  🎵 TikTok:', artist.tiktok);
            console.log('  📹 YouTube:', artist.youtube);

            // Probar Instagram
            const instagramBtn = document.getElementById('instagramBtn') || document.getElementById('mainInstagramBtn');
            if (instagramBtn && artist.instagram) {
                console.log('📸 Abriendo Instagram:', artist.instagram);
                window.open(artist.instagram, '_blank');
            } else {
                console.log('❌ No se pudo abrir Instagram:', {
                    button: !!instagramBtn,
                    url: artist.instagram
                });
            }

            // Probar Facebook
            const facebookBtn = document.getElementById('facebookBtn') || document.getElementById('mainFacebookBtn');
            if (facebookBtn && artist.facebook) {
                console.log('👥 Abriendo Facebook:', artist.facebook);
                window.open(artist.facebook, '_blank');
            } else {
                console.log('❌ No se pudo abrir Facebook:', {
                    button: !!facebookBtn,
                    url: artist.facebook
                });
            }
        };

        window.testFooterSocial = () => {
            console.log('🦶 PRUEBA ESPECÍFICA DE BOTONES DEL FOOTER:');

            const instagramFooter = document.getElementById('instagramBtn');
            const facebookFooter = document.getElementById('facebookBtn');

            console.log('📸 Instagram Footer:');
            if (instagramFooter) {
                console.log('  ✅ Elemento encontrado:', instagramFooter);
                console.log('  🔗 Href:', instagramFooter.href);
                console.log('  🎯 Target:', instagramFooter.target);
                console.log('  👆 Probando click...');
                instagramFooter.click();
            } else {
                console.log('  ❌ Botón Instagram del footer NO encontrado');
            }

            console.log('\n👥 Facebook Footer:');
            if (facebookFooter) {
                console.log('  ✅ Elemento encontrado:', facebookFooter);
                console.log('  🔗 Href:', facebookFooter.href);
                console.log('  🎯 Target:', facebookFooter.target);
                console.log('  👆 Probando click...');
                facebookFooter.click();
            } else {
                console.log('  ❌ Botón Facebook del footer NO encontrado');
            }
        };

        window.reloadLinks = () => {
            console.log('🔄 Recargando enlaces dinámicos...');
            this.init();
        };
    }
}

// Crear instancia global
const dynamicLinks = new DynamicLinksManager();

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => dynamicLinks.init());
} else {
    dynamicLinks.init();
}

// Exportar para uso manual
window.dynamicLinks = dynamicLinks;
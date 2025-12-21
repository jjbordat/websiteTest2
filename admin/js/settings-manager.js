/**
 * Settings Manager - Gestiona configuración desde config.json
 */

class SettingsManager {
    constructor() {
        this.config = {};
        this.loadConfig();
        this.initializeForm();
        this.setupEventListeners();
    }

    // Cargar configuración desde config.json
    async loadConfig() {
        try {
            const response = await fetch('../config.json');
            this.config = await response.json();
            console.log('✅ Configuración cargada:', this.config);
            this.populateForm();
        } catch (error) {
            console.error('❌ Error cargando config:', error);
            this.showNotification('Error cargando configuración', 'error');
        }
    }

    // Inicializar formulario
    initializeForm() {
        this.createFormHTML();
    }

    // Crear HTML del formulario
    createFormHTML() {
        const container = document.getElementById('settings-container');
        if (!container) return;

        container.innerHTML = `
            <div class="admin-card">
                <h2 class="text-2xl font-bold mb-6">⚙️ Configuración del Sitio</h2>

                <!-- Información del Sitio -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">🌐 Información del Sitio</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="admin-form-group">
                            <label class="admin-label">Título del Sitio</label>
                            <input type="text" id="site-title" class="admin-input" placeholder="InkMaster Portfolio">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Eslogan</label>
                            <input type="text" id="site-tagline" class="admin-input" placeholder="Arte que vive contigo">
                        </div>
                    </div>
                    <div class="admin-form-group">
                        <label class="admin-label">Descripción</label>
                        <textarea id="site-description" class="admin-textarea" rows="3" placeholder="Descripción del sitio"></textarea>
                    </div>
                </div>

                <!-- Información del Artista -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">👤 Información del Artista</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="admin-form-group">
                            <label class="admin-label">Nombre del Artista</label>
                            <input type="text" id="artist-name" class="admin-input" placeholder="Alejandro Morales">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Título Profesional</label>
                            <input type="text" id="artist-title" class="admin-input" placeholder="Maestro del Arte Corporal">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Años de Experiencia</label>
                            <input type="number" id="artist-experience" class="admin-input" placeholder="10">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Clientes Atendidos</label>
                            <input type="number" id="artist-clients" class="admin-input" placeholder="500">
                        </div>
                    </div>
                    <div class="admin-form-group">
                        <label class="admin-label">Biografía</label>
                        <textarea id="artist-bio" class="admin-textarea" rows="4" placeholder="Biografía del artista"></textarea>
                    </div>
                </div>

                <!-- Contacto y Redes Sociales -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">📞 Contacto y Redes Sociales</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="admin-form-group">
                            <label class="admin-label">WhatsApp</label>
                            <input type="tel" id="artist-whatsapp" class="admin-input" placeholder="+34600000000">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Email</label>
                            <input type="email" id="artist-email" class="admin-input" placeholder="contacto@inkmaster.es">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Instagram</label>
                            <input type="url" id="artist-instagram" class="admin-input" placeholder="https://instagram.com/inkmaster">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Facebook</label>
                            <input type="url" id="artist-facebook" class="admin-input" placeholder="https://facebook.com/inkmaster">
                        </div>
                    </div>
                </div>

                <!-- Imágenes -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">🖼️ Gestión de Imágenes</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="admin-form-group">
                            <label class="admin-label">Imagen Hero (Homepage)</label>
                            <div class="image-upload-container">
                                <input type="file" id="hero-image" class="hidden" accept="image/*">
                                <button type="button" class="upload-btn" onclick="document.getElementById('hero-image').click()">
                                    📁 Seleccionar Imagen Hero
                                </button>
                                <div id="hero-preview" class="image-preview"></div>
                            </div>
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Foto de Perfil (Artista)</label>
                            <div class="image-upload-container">
                                <input type="file" id="profile-image" class="hidden" accept="image/*">
                                <button type="button" class="upload-btn" onclick="document.getElementById('profile-image').click()">
                                    📁 Seleccionar Foto de Perfil
                                </button>
                                <div id="profile-preview" class="image-preview"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Textos de Homepage -->
                <div class="mb-8">
                    <h3 class="text-lg font-semibold mb-4">📝 Textos de Homepage</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="admin-form-group">
                            <label class="admin-label">Título Hero</label>
                            <input type="text" id="hero-title" class="admin-input" placeholder="Arte que">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-label">Título Hero (Acento)</label>
                            <input type="text" id="hero-title-accent" class="admin-input" placeholder="Vive Contigo">
                        </div>
                    </div>
                    <div class="admin-form-group">
                        <label class="admin-label">Descripción Hero</label>
                        <textarea id="hero-description" class="admin-textarea" rows="4"></textarea>
                    </div>
                </div>

                <!-- Botones de Acción -->
                <div class="flex gap-4">
                    <button type="button" id="save-config" class="btn btn-primary">
                        💾 Guardar Configuración
                    </button>
                    <button type="button" id="reset-config" class="btn btn-secondary">
                        🔄 Restaurar
                    </button>
                </div>
            </div>
        `;

        // Agregar estilos CSS
        this.addStyles();
    }

    // Agregar estilos CSS
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .upload-btn {
                background: #9535d4;
                color: white;
                padding: 10px 20px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s ease;
            }
            .upload-btn:hover {
                background: #7c2db8;
                transform: translateY(-2px);
            }
            .image-preview {
                margin-top: 10px;
                border: 2px dashed #444;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                min-height: 100px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #1a1a1a;
            }
            .image-preview img {
                max-width: 100%;
                max-height: 200px;
                object-fit: cover;
                border-radius: 4px;
            }
            .image-preview.has-image {
                border-color: #9535d4;
                background: #2a1a3a;
            }
        `;
        document.head.appendChild(style);
    }

    // Poblar formulario con datos existentes
    populateForm() {
        if (!this.config) return;

        // Información del sitio
        this.setFieldValue('site-title', this.config.site?.title);
        this.setFieldValue('site-tagline', this.config.site?.tagline);
        this.setFieldValue('site-description', this.config.site?.description);

        // Información del artista
        this.setFieldValue('artist-name', this.config.artist?.name);
        this.setFieldValue('artist-title', this.config.artist?.title);
        this.setFieldValue('artist-bio', this.config.artist?.bio);
        this.setFieldValue('artist-experience', this.config.artist?.experience);
        this.setFieldValue('artist-clients', this.config.artist?.clients);
        this.setFieldValue('artist-whatsapp', this.config.artist?.whatsapp);
        this.setFieldValue('artist-email', this.config.artist?.email);
        this.setFieldValue('artist-instagram', this.config.artist?.instagram);
        this.setFieldValue('artist-facebook', this.config.artist?.facebook);

        // Textos de homepage
        this.setFieldValue('hero-title', this.config.texts?.homepage?.heroTitle);
        this.setFieldValue('hero-title-accent', this.config.texts?.homepage?.heroTitleAccent);
        this.setFieldValue('hero-description', this.config.texts?.homepage?.heroDescription);

        // Mostrar imágenes actuales
        this.showCurrentImages();
    }

    // Establecer valor de campo
    setFieldValue(id, value) {
        const field = document.getElementById(id);
        if (field && value !== undefined) {
            field.value = value;
        }
    }

    // Mostrar imágenes actuales
    showCurrentImages() {
        // Imagen hero
        if (this.config.images?.homepage?.hero) {
            this.showImagePreview('hero-preview', '../' + this.config.images.homepage.hero);
        }

        // Imagen de perfil
        if (this.config.images?.artist?.profile) {
            this.showImagePreview('profile-preview', '../' + this.config.images.artist.profile);
        }
    }

    // Mostrar preview de imagen
    showImagePreview(containerId, imageSrc) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<img src="${imageSrc}" alt="Preview">`;
            container.classList.add('has-image');
        }
    }

    // Configurar event listeners
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            // Botón guardar
            const saveBtn = document.getElementById('save-config');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => this.saveConfig());
            }

            // Botón reset
            const resetBtn = document.getElementById('reset-config');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => this.loadConfig());
            }

            // Carga de imágenes
            this.setupImageUploads();
        });
    }

    // Configurar carga de imágenes
    setupImageUploads() {
        // Hero image
        const heroInput = document.getElementById('hero-image');
        if (heroInput) {
            heroInput.addEventListener('change', (e) => {
                this.handleImageUpload(e, 'hero', 'hero-preview');
            });
        }

        // Profile image
        const profileInput = document.getElementById('profile-image');
        if (profileInput) {
            profileInput.addEventListener('change', (e) => {
                this.handleImageUpload(e, 'profile', 'profile-preview');
            });
        }
    }

    // Manejar carga de imagen
    async handleImageUpload(event, type, previewId) {
        const file = event.target.files[0];
        if (!file) return;

        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            this.showNotification('Por favor selecciona una imagen válida', 'error');
            return;
        }

        // Validar tamaño (5MB máximo)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('La imagen debe ser menor a 5MB', 'error');
            return;
        }

        try {
            // Mostrar preview
            const reader = new FileReader();
            reader.onload = (e) => {
                this.showImagePreview(previewId, e.target.result);
            };
            reader.readAsDataURL(file);

            // Simular carga (en el futuro aquí iría la carga real al servidor)
            await this.simulateImageUpload(file, type);

            this.showNotification(`Imagen ${type} cargada correctamente`, 'success');

        } catch (error) {
            console.error('Error cargando imagen:', error);
            this.showNotification('Error cargando la imagen', 'error');
        }
    }

    // Simular carga de imagen (placeholder)
    async simulateImageUpload(file, type) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`Imagen ${type} simulada:`, file.name);
                // Actualizar rutas en config
                if (type === 'hero') {
                    this.config.images.homepage.hero = `imagenes/homepage/hero.jpg`;
                } else if (type === 'profile') {
                    this.config.images.artist.profile = `imagenes/artist/profile.jpg`;
                }
                resolve();
            }, 1000);
        });
    }

    // Guardar configuración
    async saveConfig() {
        try {
            // Recopilar datos del formulario
            const updatedConfig = this.gatherFormData();

            // Actualizar config local
            this.config = { ...this.config, ...updatedConfig };

            // Simular guardado (en el futuro sería una llamada al servidor)
            await this.simulateSaveConfig(this.config);

            this.showNotification('✅ Configuración guardada correctamente', 'success');
            console.log('Config guardada:', this.config);

        } catch (error) {
            console.error('Error guardando config:', error);
            this.showNotification('❌ Error guardando configuración', 'error');
        }
    }

    // Recopilar datos del formulario
    gatherFormData() {
        return {
            site: {
                title: document.getElementById('site-title')?.value || '',
                tagline: document.getElementById('site-tagline')?.value || '',
                description: document.getElementById('site-description')?.value || ''
            },
            artist: {
                ...this.config.artist,
                name: document.getElementById('artist-name')?.value || '',
                title: document.getElementById('artist-title')?.value || '',
                bio: document.getElementById('artist-bio')?.value || '',
                experience: parseInt(document.getElementById('artist-experience')?.value) || 0,
                clients: parseInt(document.getElementById('artist-clients')?.value) || 0,
                whatsapp: document.getElementById('artist-whatsapp')?.value || '',
                email: document.getElementById('artist-email')?.value || '',
                instagram: document.getElementById('artist-instagram')?.value || '',
                facebook: document.getElementById('artist-facebook')?.value || ''
            },
            texts: {
                homepage: {
                    heroTitle: document.getElementById('hero-title')?.value || '',
                    heroTitleAccent: document.getElementById('hero-title-accent')?.value || '',
                    heroDescription: document.getElementById('hero-description')?.value || ''
                }
            }
        };
    }

    // Simular guardado de configuración
    async simulateSaveConfig(config) {
        return new Promise(resolve => {
            setTimeout(() => {
                console.log('💾 Config simulada guardada en config.json');
                localStorage.setItem('inkmaster_config_backup', JSON.stringify(config));
                resolve();
            }, 500);
        });
    }

    // Mostrar notificación
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            zIndex: '9999',
            fontSize: '14px',
            fontWeight: '500',
            backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'
        });

        document.body.appendChild(notification);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});
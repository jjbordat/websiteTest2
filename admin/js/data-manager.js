/**
 * InkMaster Portfolio - Data Manager
 * Sistema de gestión de datos para el panel de administración
 */

class DataManager {
    constructor() {
        this.storageKey = 'inkmaster_portfolio_data';
        this.init();
    }

    // Estructura de datos inicial basada en el contenido actual del sitio
    getDefaultData() {
        return {
            artist: {
                name: "Alejandro Morales",
                title: "Maestro del Arte Corporal",
                bio: "Con más de 10 años transformando visiones en arte permanente, cada línea que trazo cuenta una historia única. Mi pasión es crear obras maestras que vivan contigo para siempre, donde tu historia se convierte en arte que respira.",
                profileImage: "https://images.unsplash.com/photo-1516299755140-cfafcff700c8",
                badge: "Artista Certificado desde 2015",
                stats: {
                    experience: 10,
                    clients: 500,
                    awards: 15
                },
                social: {
                    instagram: "",
                    facebook: "",
                    whatsapp: ""
                }
            },

            portfolio: [
                {
                    id: this.generateId(),
                    title: "Retrato Realista",
                    description: "Detalles fotográficos que capturan la esencia",
                    category: "realismo-en-sombras",
                    image: "https://img.rocket.new/generatedImages/rocket_gen_img_126b08c74-1765294156010.png",
                    tags: ["retrato", "blanco-negro", "brazo"],
                    featured: true,
                    location: "Brazo",
                    dateCreated: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "Geometría Sagrada",
                    description: "Mandalas y patrones simétricos precisos",
                    category: "geometrico",
                    image: "https://img.rocket.new/generatedImages/rocket_gen_img_161017052-1764834283813.png",
                    tags: ["mandala", "simetria", "antebrazo"],
                    featured: true,
                    location: "Antebrazo",
                    dateCreated: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: "Dragón Tradicional",
                    description: "Estilo japonés con colores vibrantes",
                    category: "japones",
                    image: "https://images.unsplash.com/photo-1713606300740-3d6b1ece8431",
                    tags: ["dragon", "tradicional", "espalda"],
                    featured: true,
                    location: "Espalda",
                    dateCreated: new Date().toISOString()
                }
            ],

            categories: [
                {
                    id: this.generateId(),
                    name: "realismo-en-sombras",
                    description: "Detalles fotográficos que capturan la esencia de retratos y escenas con precisión impresionante.",
                    image: "https://img.rocket.new/generatedImages/rocket_gen_img_126b08c74-1765294156010.png",
                    tags: ["color", "detailed", "large", "modern"],
                    badge: "Alta Demanda",
                    complexity: "high",
                    popular: true
                },
                {
                    id: this.generateId(),
                    name: "Geométrico",
                    description: "Patrones simétricos y mandalas que combinan precisión matemática con belleza espiritual.",
                    image: "https://img.rocket.new/generatedImages/rocket_gen_img_161017052-1764834283813.png",
                    tags: ["blackwork", "detailed", "modern", "minimalist"],
                    badge: "Trending",
                    complexity: "high",
                    popular: true
                },
                {
                    id: this.generateId(),
                    name: "Japonés",
                    description: "Tradición milenaria que incorpora dragones, flores y elementos característicos del arte oriental.",
                    image: "https://images.unsplash.com/photo-1713606300740-3d6b1ece8431",
                    tags: ["color", "traditional", "large", "detailed"],
                    badge: "Clásico",
                    complexity: "high",
                    popular: true
                },
                {
                    id: this.generateId(),
                    name: "Blackwork",
                    description: "Tinta negra sólida creando diseños impactantes con alto contraste y definición.",
                    image: "https://images.unsplash.com/photo-1645385404966-7b8222c5071d",
                    tags: ["blackwork", "bold", "minimalist", "modern"],
                    badge: "Popular",
                    complexity: "medium",
                    popular: false
                }
            ],

            theme: {
                colors: {
                    primary: "#D4AF37",    // Gold accent
                    background: "#000000", // Black background
                    surface: "#262626",    // Card backgrounds
                    text: {
                        primary: "#FFFFFF",
                        secondary: "#CFCFCF",
                        tertiary: "#999999"
                    }
                },
                fonts: {
                    headline: "Playfair Display",
                    body: "Inter",
                    cta: "Montserrat",
                    accent: "Cinzel"
                }
            },

            settings: {
                siteTitle: "InkMaster Portfolio",
                tagline: "Arte que Vive Contigo",
                description: "Transformo visiones en arte permanente con precisión en cada línea. Cada tatuaje es una colaboración única entre artista y cliente, donde tu historia se convierte en una obra maestra que llevarás contigo para siempre.",
                contact: {
                    whatsapp: "",
                    email: "",
                    location: ""
                },
                lastUpdated: new Date().toISOString()
            }
        };
    }

    // Inicializar datos
    init() {
        const existingData = this.loadData();
        if (!existingData) {
            this.saveData(this.getDefaultData());
        }
    }

    // Generar ID único
    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    // Cargar datos del localStorage
    loadData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    }

    // Guardar datos en localStorage
    saveData(data) {
        try {
            data.settings.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            this.notifyChange('Data saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            this.notifyChange('Error saving data', 'error');
            return false;
        }
    }

    // Obtener todos los datos
    getData() {
        return this.loadData() || this.getDefaultData();
    }

    // Actualizar sección específica
    updateSection(section, newData) {
        const currentData = this.getData();
        currentData[section] = { ...currentData[section], ...newData };
        return this.saveData(currentData);
    }

    // Gestión del perfil del artista
    getArtistProfile() {
        return this.getData().artist;
    }

    updateArtistProfile(profileData) {
        return this.updateSection('artist', profileData);
    }

    // Gestión del portfolio
    getPortfolio() {
        return this.getData().portfolio || [];
    }

    addPortfolioItem(item) {
        const data = this.getData();
        item.id = this.generateId();
        item.dateCreated = new Date().toISOString();
        data.portfolio.push(item);
        return this.saveData(data);
    }

    updatePortfolioItem(id, updates) {
        const data = this.getData();
        const index = data.portfolio.findIndex(item => item.id === id);
        if (index !== -1) {
            data.portfolio[index] = { ...data.portfolio[index], ...updates };
            return this.saveData(data);
        }
        return false;
    }

    deletePortfolioItem(id) {
        const data = this.getData();
        data.portfolio = data.portfolio.filter(item => item.id !== id);
        return this.saveData(data);
    }

    // Gestión de categorías
    getCategories() {
        return this.getData().categories || [];
    }

    addCategory(category) {
        const data = this.getData();
        category.id = this.generateId();
        data.categories.push(category);
        return this.saveData(data);
    }

    updateCategory(id, updates) {
        const data = this.getData();
        const index = data.categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
            data.categories[index] = { ...data.categories[index], ...updates };
            return this.saveData(data);
        }
        return false;
    }

    deleteCategory(id) {
        const data = this.getData();
        // Verificar si hay trabajos en esta categoría
        const hasPortfolioItems = data.portfolio.some(item => item.category ===
            data.categories.find(cat => cat.id === id)?.name.toLowerCase());

        if (hasPortfolioItems) {
            this.notifyChange('Cannot delete category with portfolio items', 'error');
            return false;
        }

        data.categories = data.categories.filter(cat => cat.id !== id);
        return this.saveData(data);
    }

    // Gestión del tema
    getTheme() {
        return this.getData().theme;
    }

    updateTheme(themeData) {
        return this.updateSection('theme', themeData);
    }

    // Configuración general
    getSettings() {
        return this.getData().settings;
    }

    updateSettings(settingsData) {
        return this.updateSection('settings', settingsData);
    }

    // Exportar/Importar datos
    exportData() {
        const data = this.getData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `inkmaster-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.notifyChange('Backup exported successfully');
    }

    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // Validar estructura básica
                    if (data.artist && data.portfolio && data.categories && data.theme) {
                        if (this.saveData(data)) {
                            this.notifyChange('Data imported successfully');
                            resolve(true);
                        } else {
                            reject(new Error('Failed to save imported data'));
                        }
                    } else {
                        reject(new Error('Invalid data format'));
                    }
                } catch (error) {
                    reject(new Error('Invalid JSON file'));
                }
            };
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    // Estadísticas del panel
    getStats() {
        const data = this.getData();
        return {
            portfolioCount: data.portfolio.length,
            categoriesCount: data.categories.length,
            featuredCount: data.portfolio.filter(item => item.featured).length,
            lastUpdated: data.settings.lastUpdated
        };
    }

    // Notificaciones
    notifyChange(message, type = 'success') {
        // Dispatch custom event for UI notifications
        window.dispatchEvent(new CustomEvent('dataManagerNotification', {
            detail: { message, type, timestamp: new Date().toISOString() }
        }));
    }

    // Validaciones
    validateImageSize(file) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        return file.size <= maxSize;
    }

    validateImageType(file) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        return allowedTypes.includes(file.type);
    }

    // Utilidades
    compressImage(file, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                const maxWidth = 1200;
                const maxHeight = 1200;

                let { width, height } = img;

                // Calcular nuevas dimensiones manteniendo proporción
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(resolve, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Convertir imagen a base64
    imageToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

// Instancia global del data manager
window.dataManager = new DataManager();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
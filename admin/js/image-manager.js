/**
 * Image Manager - Gestiona carga de imágenes con nombres consistentes
 * Mantiene los mismos nombres de archivo para evitar delays de carga
 */

class ImageManager {
    constructor() {
        this.imageConfig = {
            hero: {
                path: 'imagenes/homepage/',
                filename: 'hero.jpg',
                maxSize: 5 * 1024 * 1024, // 5MB
                dimensions: { width: 1200, height: 800 }
            },
            profile: {
                path: 'imagenes/artist/',
                filename: 'profile.jpg',
                maxSize: 3 * 1024 * 1024, // 3MB
                dimensions: { width: 600, height: 600 }
            },
            featured: {
                path: 'imagenes/homepage/',
                filename: 'featured',
                maxSize: 2 * 1024 * 1024, // 2MB
                dimensions: { width: 800, height: 600 }
            }
        };

        console.log('🖼️ Image Manager inicializado');
    }

    /**
     * Procesar carga de imagen
     * @param {File} file - Archivo de imagen
     * @param {string} type - Tipo de imagen (hero, profile, featured)
     * @param {number} index - Índice para imágenes múltiples
     */
    async processImage(file, type, index = null) {
        try {
            console.log(`📤 Procesando imagen ${type}:`, file.name);

            // Validar archivo
            const validation = this.validateImage(file, type);
            if (!validation.valid) {
                throw new Error(validation.error);
            }

            // Redimensionar imagen si es necesario
            const processedImage = await this.resizeImage(file, type);

            // Generar nombre final consistente
            const finalFilename = this.generateFilename(type, index);
            const fullPath = this.imageConfig[type].path + finalFilename;

            // Simular guardado (en implementación real sería upload al servidor)
            await this.saveImage(processedImage, fullPath);

            console.log(`✅ Imagen ${type} guardada como: ${fullPath}`);

            return {
                success: true,
                path: fullPath,
                filename: finalFilename,
                originalName: file.name,
                size: processedImage.size
            };

        } catch (error) {
            console.error(`❌ Error procesando imagen ${type}:`, error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Validar imagen
     */
    validateImage(file, type) {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
            return { valid: false, error: 'El archivo debe ser una imagen' };
        }

        // Validar formatos aceptados
        const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!acceptedTypes.includes(file.type)) {
            return { valid: false, error: 'Formato no soportado. Use JPG, PNG o WebP' };
        }

        // Validar tamaño
        const config = this.imageConfig[type];
        if (file.size > config.maxSize) {
            const maxMB = Math.round(config.maxSize / (1024 * 1024));
            return { valid: false, error: `La imagen debe ser menor a ${maxMB}MB` };
        }

        return { valid: true };
    }

    /**
     * Redimensionar imagen manteniendo proporción
     */
    async resizeImage(file, type) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                try {
                    const config = this.imageConfig[type];
                    const { width: targetWidth, height: targetHeight } = config.dimensions;

                    // Calcular nuevas dimensiones manteniendo proporción
                    const aspectRatio = img.width / img.height;
                    let newWidth, newHeight;

                    if (aspectRatio > targetWidth / targetHeight) {
                        // Imagen más ancha
                        newWidth = targetWidth;
                        newHeight = targetWidth / aspectRatio;
                    } else {
                        // Imagen más alta
                        newHeight = targetHeight;
                        newWidth = targetHeight * aspectRatio;
                    }

                    // Configurar canvas
                    canvas.width = newWidth;
                    canvas.height = newHeight;

                    // Dibujar imagen redimensionada
                    ctx.drawImage(img, 0, 0, newWidth, newHeight);

                    // Convertir a blob
                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Crear archivo con nombre original para referencia
                            const processedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now()
                            });
                            resolve(processedFile);
                        } else {
                            reject(new Error('Error al procesar la imagen'));
                        }
                    }, 'image/jpeg', 0.9); // Calidad 90%

                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => reject(new Error('Error cargando la imagen'));
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Generar nombre de archivo consistente
     */
    generateFilename(type, index = null) {
        const config = this.imageConfig[type];

        if (index !== null && type === 'featured') {
            return `${config.filename}${index + 1}.jpg`;
        }

        return config.filename;
    }

    /**
     * Simular guardado de imagen
     * En implementación real sería upload al servidor
     */
    async saveImage(file, path) {
        return new Promise((resolve) => {
            // Simular delay de upload
            setTimeout(() => {
                console.log(`💾 Imagen simulada guardada en: ${path}`);
                // Guardar referencia en localStorage para demo
                const imageData = {
                    path: path,
                    filename: path.split('/').pop(),
                    size: file.size,
                    timestamp: Date.now()
                };
                localStorage.setItem(`inkmaster_image_${path.replace(/[\/\.]/g, '_')}`, JSON.stringify(imageData));
                resolve();
            }, 1000);
        });
    }

    /**
     * Crear estructura de directorios
     */
    async ensureDirectories() {
        const directories = [
            'imagenes/homepage',
            'imagenes/artist',
            'imagenes/portafolio',
            'imagenes/testimonials',
            'imagenes/gallery'
        ];

        console.log('📁 Verificando estructura de directorios...');

        // En implementación real se crearían los directorios en el servidor
        directories.forEach(dir => {
            console.log(`✅ Directorio verificado: ${dir}`);
        });
    }

    /**
     * Obtener preview de imagen
     */
    generatePreview(file) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    }

    /**
     * Limpiar imágenes temporales
     */
    cleanupTempImages() {
        // Limpiar URLs de objeto creadas
        const urls = document.querySelectorAll('img[src^="blob:"]');
        urls.forEach(img => {
            URL.revokeObjectURL(img.src);
        });
    }

    /**
     * Obtener información de imagen existente
     */
    getImageInfo(type, index = null) {
        const filename = this.generateFilename(type, index);
        const fullPath = this.imageConfig[type].path + filename;

        // En implementación real sería una consulta al servidor
        const stored = localStorage.getItem(`inkmaster_image_${fullPath.replace(/[\/\.]/g, '_')}`);

        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return null;
            }
        }

        return null;
    }

    /**
     * Eliminar imagen
     */
    async deleteImage(type, index = null) {
        const filename = this.generateFilename(type, index);
        const fullPath = this.imageConfig[type].path + filename;

        try {
            // En implementación real sería delete del servidor
            localStorage.removeItem(`inkmaster_image_${fullPath.replace(/[\/\.]/g, '_')}`);
            console.log(`🗑️ Imagen eliminada: ${fullPath}`);
            return { success: true };
        } catch (error) {
            console.error('Error eliminando imagen:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Listar todas las imágenes
     */
    listImages() {
        const images = {};

        Object.keys(this.imageConfig).forEach(type => {
            const info = this.getImageInfo(type);
            if (info) {
                images[type] = info;
            }
        });

        return images;
    }
}

// Instancia global
window.imageManager = new ImageManager();

// Auto-inicializar directorios
document.addEventListener('DOMContentLoaded', () => {
    window.imageManager.ensureDirectories();
});
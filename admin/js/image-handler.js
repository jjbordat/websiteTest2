/**
 * InkMaster Portfolio - Image Handler
 * Sistema de gestión de imágenes con drag & drop
 */

class ImageHandler {
    constructor() {
        this.maxFileSize = 5 * 1024 * 1024; // 5MB
        this.allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        this.compressionQuality = 0.8;
    }

    // Crear zona de drop para imágenes
    createDropZone(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with id ${containerId} not found`);
            return null;
        }

        const defaultOptions = {
            multiple: false,
            preview: true,
            compress: true,
            maxWidth: 300,
            maxHeight: 300,
            placeholder: "Arrastra una imagen aquí o haz clic para seleccionar",
            acceptText: "JPG, PNG, WebP (máx. 5MB)"
        };

        const config = { ...defaultOptions, ...options };

        // HTML de la zona de drop
        container.innerHTML = `
            <div class="image-drop-zone border-2 border-dashed border-border hover:border-accent transition-colors duration-300 rounded-lg p-8 text-center cursor-pointer group"
                 data-multiple="${config.multiple}">
                <div class="drop-content">
                    <svg class="w-12 h-12 mx-auto text-text-tertiary group-hover:text-accent transition-colors duration-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <p class="text-text-secondary mb-2">${config.placeholder}</p>
                    <p class="text-sm text-text-tertiary">${config.acceptText}</p>
                </div>
                <input type="file" class="hidden" ${config.multiple ? 'multiple' : ''} accept="image/*">
                <div class="preview-container mt-4 hidden"></div>
            </div>
        `;

        const dropZone = container.querySelector('.image-drop-zone');
        const fileInput = container.querySelector('input[type="file"]');
        const previewContainer = container.querySelector('.preview-container');
        const dropContent = container.querySelector('.drop-content');

        // Event listeners
        dropZone.addEventListener('click', () => fileInput.click());
        dropZone.addEventListener('dragover', (e) => this.handleDragOver(e, dropZone));
        dropZone.addEventListener('dragleave', (e) => this.handleDragLeave(e, dropZone));
        dropZone.addEventListener('drop', (e) => this.handleDrop(e, dropZone, config, previewContainer, dropContent));
        fileInput.addEventListener('change', (e) => this.handleFileSelect(e, config, previewContainer, dropContent));

        return {
            container: dropZone,
            input: fileInput,
            preview: previewContainer,
            getFiles: () => this.getFiles(fileInput),
            clear: () => this.clearPreview(previewContainer, dropContent, fileInput),
            setImage: (url) => this.setPreviewImage(url, previewContainer, dropContent)
        };
    }

    // Manejar drag over
    handleDragOver(e, dropZone) {
        e.preventDefault();
        dropZone.classList.add('border-accent', 'bg-accent/5');
    }

    // Manejar drag leave
    handleDragLeave(e, dropZone) {
        e.preventDefault();
        dropZone.classList.remove('border-accent', 'bg-accent/5');
    }

    // Manejar drop
    async handleDrop(e, dropZone, config, previewContainer, dropContent) {
        e.preventDefault();
        dropZone.classList.remove('border-accent', 'bg-accent/5');

        const files = Array.from(e.dataTransfer.files);
        await this.processFiles(files, config, previewContainer, dropContent);
    }

    // Manejar selección de archivos
    async handleFileSelect(e, config, previewContainer, dropContent) {
        const files = Array.from(e.target.files);
        await this.processFiles(files, config, previewContainer, dropContent);
    }

    // Procesar archivos
    async processFiles(files, config, previewContainer, dropContent) {
        const validFiles = [];

        for (const file of files) {
            if (!this.validateFile(file)) continue;

            let processedFile = file;
            if (config.compress) {
                try {
                    processedFile = await this.compressImage(file, this.compressionQuality);
                } catch (error) {
                    console.error('Error compressing image:', error);
                }
            }

            validFiles.push(processedFile);
        }

        if (validFiles.length > 0) {
            await this.showPreview(validFiles, config, previewContainer, dropContent);
            this.dispatchChangeEvent(validFiles);
        }
    }

    // Validar archivo
    validateFile(file) {
        // Verificar tipo
        if (!this.allowedTypes.includes(file.type)) {
            this.showError(`Tipo de archivo no válido: ${file.name}. Solo se permiten: JPG, PNG, WebP, GIF`);
            return false;
        }

        // Verificar tamaño
        if (file.size > this.maxFileSize) {
            this.showError(`Archivo muy grande: ${file.name}. Tamaño máximo: 5MB`);
            return false;
        }

        return true;
    }

    // Comprimir imagen
    compressImage(file, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                const maxWidth = 1200;
                const maxHeight = 1200;

                let { width, height } = img;

                // Mantener proporción y reducir si es necesario
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

                canvas.toBlob((blob) => {
                    // Crear nuevo File object con el blob
                    const compressedFile = new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                    resolve(compressedFile);
                }, 'image/jpeg', quality);
            };

            img.src = URL.createObjectURL(file);
        });
    }

    // Mostrar preview
    async showPreview(files, config, previewContainer, dropContent) {
        previewContainer.innerHTML = '';
        previewContainer.classList.remove('hidden');
        dropContent.classList.add('hidden');

        for (const file of files) {
            const previewItem = await this.createPreviewItem(file, config);
            previewContainer.appendChild(previewItem);
        }
    }

    // Crear item de preview
    async createPreviewItem(file, config) {
        const div = document.createElement('div');
        div.className = 'preview-item relative group';

        const url = URL.createObjectURL(file);
        const base64 = await this.fileToBase64(file);

        div.innerHTML = `
            <div class="relative overflow-hidden rounded-lg border-2 border-border">
                <img src="${url}" alt="Preview"
                     class="w-full h-48 object-cover"
                     style="max-width: ${config.maxWidth}px; max-height: ${config.maxHeight}px">
                <div class="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button type="button" class="remove-image bg-error text-white p-2 rounded-full hover:bg-error-dark transition-colors duration-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="mt-2 text-center">
                <p class="text-sm text-text-secondary truncate">${file.name}</p>
                <p class="text-xs text-text-tertiary">${this.formatFileSize(file.size)}</p>
            </div>
        `;

        // Guardar datos del archivo
        div.dataset.file = JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            base64: base64
        });

        // Event listener para eliminar
        const removeBtn = div.querySelector('.remove-image');
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removePreviewItem(div);
        });

        return div;
    }

    // Eliminar item de preview
    removePreviewItem(item) {
        const container = item.closest('.preview-container');
        const dropContent = item.closest('.image-drop-zone').querySelector('.drop-content');

        item.remove();

        // Si no hay más items, mostrar el drop zone otra vez
        if (container.children.length === 0) {
            container.classList.add('hidden');
            dropContent.classList.remove('hidden');
        }

        this.dispatchChangeEvent([]);
    }

    // Limpiar preview
    clearPreview(previewContainer, dropContent, fileInput) {
        previewContainer.innerHTML = '';
        previewContainer.classList.add('hidden');
        dropContent.classList.remove('hidden');
        fileInput.value = '';
    }

    // Establecer imagen desde URL
    setPreviewImage(url, previewContainer, dropContent) {
        previewContainer.innerHTML = `
            <div class="preview-item">
                <div class="relative overflow-hidden rounded-lg border-2 border-border">
                    <img src="${url}" alt="Current image" class="w-full h-48 object-cover">
                </div>
                <div class="mt-2 text-center">
                    <p class="text-sm text-text-secondary">Imagen actual</p>
                </div>
            </div>
        `;
        previewContainer.classList.remove('hidden');
        dropContent.classList.add('hidden');
    }

    // Obtener archivos procesados
    getFiles(input) {
        const container = input.closest('.image-drop-zone');
        const previewItems = container.querySelectorAll('.preview-item');

        return Array.from(previewItems).map(item => {
            const data = JSON.parse(item.dataset.file || '{}');
            return data;
        });
    }

    // Convertir archivo a base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    // Formatear tamaño de archivo
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Mostrar error
    showError(message) {
        // Dispatch evento de error para que el UI lo maneje
        window.dispatchEvent(new CustomEvent('imageHandlerError', {
            detail: { message, timestamp: new Date().toISOString() }
        }));
    }

    // Dispatch evento de cambio
    dispatchChangeEvent(files) {
        window.dispatchEvent(new CustomEvent('imageHandlerChange', {
            detail: { files, timestamp: new Date().toISOString() }
        }));
    }

    // Crear editor simple de imagen (crop básico)
    createImageEditor(imageUrl, options = {}) {
        const defaultOptions = {
            aspectRatio: 1,
            width: 400,
            height: 400
        };

        const config = { ...defaultOptions, ...options };

        return new Promise((resolve, reject) => {
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-primary/90 backdrop-blur-custom z-50 flex items-center justify-center p-4';

            modal.innerHTML = `
                <div class="bg-secondary rounded-2xl p-6 max-w-2xl w-full">
                    <h3 class="text-xl font-headline font-semibold text-text-primary mb-4">Editar Imagen</h3>
                    <div class="image-editor-container">
                        <img src="${imageUrl}" alt="Edit" class="max-w-full h-auto rounded-lg">
                    </div>
                    <div class="flex justify-end gap-4 mt-6">
                        <button type="button" class="btn btn-outline cancel-edit">Cancelar</button>
                        <button type="button" class="btn btn-primary save-edit">Guardar</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Event listeners
            modal.querySelector('.cancel-edit').addEventListener('click', () => {
                document.body.removeChild(modal);
                reject(new Error('Edit cancelled'));
            });

            modal.querySelector('.save-edit').addEventListener('click', () => {
                // Aquí iría la lógica de crop/edición
                document.body.removeChild(modal);
                resolve(imageUrl); // Por ahora devolvemos la original
            });
        });
    }
}

// Instancia global del image handler
window.imageHandler = new ImageHandler();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageHandler;
}
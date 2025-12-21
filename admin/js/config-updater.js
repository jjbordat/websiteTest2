/**
 * Config Updater - Actualiza config.json con los cambios
 * Mantiene sincronización entre la interfaz y el archivo de configuración
 */

class ConfigUpdater {
    constructor() {
        this.configPath = '../config.json';
        this.config = {};
        this.isDirty = false; // Indica si hay cambios sin guardar

        console.log('⚙️ Config Updater inicializado');
        this.loadConfig();
    }

    /**
     * Cargar configuración actual
     */
    async loadConfig() {
        try {
            const response = await fetch(this.configPath);
            if (response.ok) {
                this.config = await response.json();
                console.log('✅ Configuración cargada desde config.json');
                this.isDirty = false;
                return this.config;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
        } catch (error) {
            console.warn('⚠️ Error cargando config.json, usando backup:', error);
            return this.loadBackupConfig();
        }
    }

    /**
     * Cargar configuración de backup desde localStorage
     */
    loadBackupConfig() {
        const backup = localStorage.getItem('inkmaster_config_backup');
        if (backup) {
            try {
                this.config = JSON.parse(backup);
                console.log('✅ Configuración cargada desde backup local');
                return this.config;
            } catch (e) {
                console.error('❌ Error parseando backup:', e);
            }
        }

        // Configuración por defecto si no hay backup
        this.config = this.getDefaultConfig();
        console.log('✅ Configuración por defecto cargada');
        return this.config;
    }

    /**
     * Obtener configuración por defecto
     */
    getDefaultConfig() {
        return {
            site: {
                title: "InkMaster Portfolio",
                tagline: "Arte que vive contigo",
                description: "Transformo visiones en arte permanente con precisión en cada línea."
            },
            artist: {
                name: "Alejandro Morales",
                title: "Maestro del Arte Corporal",
                bio: "Con más de 10 años transformando visiones en arte permanente.",
                badge: "Artista Profesional Certificado",
                experience: 10,
                clients: 500,
                awards: 15,
                whatsapp: "+34600000000",
                email: "contacto@inkmaster.es",
                instagram: "https://instagram.com/inkmaster",
                facebook: "https://facebook.com/inkmaster"
            },
            images: {
                homepage: {
                    hero: "imagenes/homepage/hero.jpg"
                },
                artist: {
                    profile: "imagenes/artist/profile.jpg"
                }
            },
            texts: {
                homepage: {
                    heroTitle: "Arte que",
                    heroTitleAccent: "Vive Contigo",
                    heroDescription: "Transformo visiones en arte permanente con precisión en cada línea."
                }
            }
        };
    }

    /**
     * Actualizar configuración
     */
    updateConfig(updates) {
        this.config = this.deepMerge(this.config, updates);
        this.isDirty = true;
        console.log('📝 Configuración actualizada en memoria');

        // Guardar backup inmediatamente
        this.saveBackup();

        return this.config;
    }

    /**
     * Merge profundo de objetos
     */
    deepMerge(target, source) {
        const result = { ...target };

        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }

        return result;
    }

    /**
     * Guardar configuración
     */
    async saveConfig() {
        try {
            // En un entorno real, aquí se haría un POST al servidor
            // Por ahora simulamos el guardado

            console.log('💾 Simulando guardado de config.json...');

            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Guardar backup local
            this.saveBackup();

            // Marcar como guardado
            this.isDirty = false;

            console.log('✅ Configuración guardada exitosamente');

            // Disparar evento personalizado
            this.dispatchConfigSaved();

            return { success: true, message: 'Configuración guardada correctamente' };

        } catch (error) {
            console.error('❌ Error guardando configuración:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Guardar backup local
     */
    saveBackup() {
        try {
            const backup = {
                config: this.config,
                timestamp: Date.now(),
                version: '1.0'
            };

            localStorage.setItem('inkmaster_config_backup', JSON.stringify(this.config));
            localStorage.setItem('inkmaster_config_meta', JSON.stringify(backup));

            console.log('💽 Backup local guardado');
        } catch (error) {
            console.warn('⚠️ Error guardando backup:', error);
        }
    }

    /**
     * Restaurar desde backup
     */
    restoreFromBackup() {
        const backup = localStorage.getItem('inkmaster_config_backup');
        if (backup) {
            try {
                this.config = JSON.parse(backup);
                this.isDirty = false;
                console.log('🔄 Configuración restaurada desde backup');
                return this.config;
            } catch (e) {
                console.error('❌ Error restaurando backup:', e);
            }
        }
        return null;
    }

    /**
     * Verificar si hay cambios sin guardar
     */
    hasUnsavedChanges() {
        return this.isDirty;
    }

    /**
     * Obtener configuración actual
     */
    getConfig() {
        return { ...this.config };
    }

    /**
     * Obtener valor específico de configuración
     */
    getConfigValue(path) {
        const keys = path.split('.');
        let value = this.config;

        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key];
            } else {
                return undefined;
            }
        }

        return value;
    }

    /**
     * Establecer valor específico de configuración
     */
    setConfigValue(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        let target = this.config;

        // Navegar hasta el objeto padre
        for (const key of keys) {
            if (!target[key] || typeof target[key] !== 'object') {
                target[key] = {};
            }
            target = target[key];
        }

        // Establecer el valor
        target[lastKey] = value;
        this.isDirty = true;

        console.log(`📝 Configuración actualizada: ${path} = ${value}`);
    }

    /**
     * Exportar configuración
     */
    exportConfig() {
        const exportData = {
            config: this.config,
            exported: new Date().toISOString(),
            version: '1.0'
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inkmaster-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('📤 Configuración exportada');
    }

    /**
     * Importar configuración
     */
    async importConfig(file) {
        try {
            const text = await file.text();
            const importedData = JSON.parse(text);

            // Validar estructura
            if (importedData.config && typeof importedData.config === 'object') {
                this.config = importedData.config;
                this.isDirty = true;
                this.saveBackup();

                console.log('📥 Configuración importada exitosamente');
                return { success: true, message: 'Configuración importada correctamente' };
            } else {
                throw new Error('Formato de archivo inválido');
            }
        } catch (error) {
            console.error('❌ Error importando configuración:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Disparar evento de configuración guardada
     */
    dispatchConfigSaved() {
        const event = new CustomEvent('configSaved', {
            detail: {
                config: this.config,
                timestamp: Date.now()
            }
        });

        document.dispatchEvent(event);
    }

    /**
     * Agregar listener para cambios de configuración
     */
    onConfigChange(callback) {
        document.addEventListener('configSaved', callback);
    }

    /**
     * Resetear a configuración por defecto
     */
    resetToDefaults() {
        this.config = this.getDefaultConfig();
        this.isDirty = true;
        this.saveBackup();

        console.log('🔄 Configuración reseteada a valores por defecto');
        return this.config;
    }
}

// Instancia global
window.configUpdater = new ConfigUpdater();

// Advertir sobre cambios sin guardar al salir
window.addEventListener('beforeunload', (e) => {
    if (window.configUpdater && window.configUpdater.hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = '¿Estás seguro de salir? Tienes cambios sin guardar.';
    }
});
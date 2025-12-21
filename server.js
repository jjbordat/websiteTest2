#!/usr/bin/env node

/**
 * Servidor local para InkMaster Portfolio
 * Maneja la carga automática de imágenes y sirve archivos estáticos
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir archivos estáticos
app.use(express.static(__dirname));

// Configurar multer para diferentes tipos de imágenes
const createStorage = (destination) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, destination);
            // Crear directorio si no existe
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            // Generar nombre único con timestamp
            const timestamp = Date.now();
            const ext = path.extname(file.originalname).toLowerCase();
            const prefix = req.body.type || 'image';
            const fileName = `${prefix}_${timestamp}${ext}`;
            cb(null, fileName);
        }
    });
};

// Diferentes configuraciones de multer
const uploadConfigs = {
    homepage: multer({
        storage: createStorage('imagenes/homepage'),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|webp/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Solo se permiten imágenes (JPG, PNG, GIF, WebP)'));
            }
        }
    }),
    artist: multer({
        storage: createStorage('imagenes/artist'),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|webp/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Solo se permiten imágenes (JPG, PNG, GIF, WebP)'));
            }
        }
    }),
    logo: multer({
        storage: createStorage('imagenes'),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype) || file.mimetype === 'image/svg+xml';

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Solo se permiten imágenes y SVG'));
            }
        }
    }),
    portfolio: multer({
        storage: createStorage('imagenes/portafolio'),
        limits: { fileSize: 5 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedTypes = /jpeg|jpg|png|gif|webp/;
            const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
            const mimetype = allowedTypes.test(file.mimetype);

            if (mimetype && extname) {
                return cb(null, true);
            } else {
                cb(new Error('Solo se permiten imágenes (JPG, PNG, GIF, WebP)'));
            }
        }
    })
};

// Endpoint principal para subir imágenes
app.post('/api/upload/:type', (req, res) => {
    const { type } = req.params;

    // Validar tipo de upload
    if (!uploadConfigs[type]) {
        return res.status(400).json({
            success: false,
            error: `Tipo de upload no válido: ${type}. Tipos disponibles: homepage, artist, logo, portfolio`
        });
    }

    const upload = uploadConfigs[type].single('image');

    upload(req, res, (err) => {
        if (err) {
            console.error('❌ Error subiendo archivo:', err.message);
            return res.status(400).json({
                success: false,
                error: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No se recibió ningún archivo'
            });
        }

        // Generar ruta relativa para config.json
        const relativePath = path.join('imagenes',
            type === 'logo' ? '' : type,
            req.file.filename
        ).replace(/\\/g, '/'); // Normalizar slashes para web

        console.log(`✅ Imagen ${type} guardada: ${req.file.filename}`);
        console.log(`📂 Ruta completa: ${req.file.path}`);
        console.log(`🔗 Ruta relativa: ${relativePath}`);

        res.json({
            success: true,
            message: 'Imagen guardada correctamente',
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                path: req.file.path,
                relativePath: relativePath,
                size: req.file.size,
                type: type
            }
        });
    });
});

// Endpoint para guardar config.json
app.post('/api/save-config', (req, res) => {
    try {
        const configPath = path.join(__dirname, 'config.json');
        const configData = req.body;

        // Validar que recibimos datos
        if (!configData || typeof configData !== 'object') {
            return res.status(400).json({
                success: false,
                error: 'Datos de configuración inválidos'
            });
        }

        // Guardar config.json
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8');

        console.log('✅ config.json actualizado correctamente');

        res.json({
            success: true,
            message: 'Configuración guardada correctamente'
        });

    } catch (error) {
        console.error('❌ Error guardando config.json:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error guardando configuración: ' + error.message
        });
    }
});

// Endpoint para obtener config.json actual
app.get('/api/config', (req, res) => {
    try {
        const configPath = path.join(__dirname, 'config.json');

        if (!fs.existsSync(configPath)) {
            return res.status(404).json({
                success: false,
                error: 'config.json no encontrado'
            });
        }

        const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        res.json({
            success: true,
            data: configData
        });

    } catch (error) {
        console.error('❌ Error leyendo config.json:', error.message);
        res.status(500).json({
            success: false,
            error: 'Error leyendo configuración: ' + error.message
        });
    }
});

// Endpoint para verificar el estado del servidor
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Servidor InkMaster funcionando correctamente',
        timestamp: new Date().toISOString(),
        folders: {
            homepage: fs.existsSync(path.join(__dirname, 'imagenes/homepage')),
            artist: fs.existsSync(path.join(__dirname, 'imagenes/artist')),
            portfolio: fs.existsSync(path.join(__dirname, 'imagenes/portafolio')),
            general: fs.existsSync(path.join(__dirname, 'imagenes'))
        }
    });
});

// Crear carpetas necesarias al iniciar
const requiredFolders = [
    'imagenes',
    'imagenes/homepage',
    'imagenes/artist',
    'imagenes/portafolio',
    'imagenes/gallery'
];

requiredFolders.forEach(folder => {
    const folderPath = path.join(__dirname, folder);
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
        console.log(`📁 Carpeta creada: ${folder}/`);
    }
});

// Ruta por defecto para SPA
app.get('*', (req, res, next) => {
    // Si es una request de API, pasar al siguiente handler
    if (req.path.startsWith('/api/')) {
        return next();
    }

    // Para todo lo demás, servir archivos estáticos
    next();
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('\n🚀 ========================================');
    console.log('   SERVIDOR INKMASTER PORTFOLIO INICIADO');
    console.log('========================================');
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📂 Directorio base: ${__dirname}`);
    console.log('');
    console.log('📋 ENDPOINTS DISPONIBLES:');
    console.log(`   • Admin Panel: http://localhost:${PORT}/admin/settings.html`);
    console.log(`   • Homepage: http://localhost:${PORT}/pages/homepage.html`);
    console.log(`   • Artist Profile: http://localhost:${PORT}/pages/artist_profile.html`);
    console.log(`   • API Health: http://localhost:${PORT}/api/health`);
    console.log('');
    console.log('📁 CARPETAS DE IMÁGENES VERIFICADAS:');
    requiredFolders.forEach(folder => {
        const exists = fs.existsSync(path.join(__dirname, folder));
        console.log(`   ${exists ? '✅' : '❌'} ${folder}/`);
    });
    console.log('');
    console.log('🎯 ¡Listo para subir imágenes automáticamente!');
    console.log('========================================\n');
});

// Manejo de errores
process.on('uncaughtException', (err) => {
    console.error('❌ Error no capturado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promesa rechazada no manejada en:', promise, 'razón:', reason);
});
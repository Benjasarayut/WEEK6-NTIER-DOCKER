// server.js
// Main entry point for Task Board API
// ENGSE207 - Week 7 Cloud Version (Updated for Railway)

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { healthCheck } = require('./src/config/database');
const taskRoutes = require('./src/routes/taskRoutes');
// ป้องกัน Error กรณีหาไฟล์ middleware ไม่เจอ (ถ้าไม่มีให้ comment บรรทัดนี้)
// const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================

// --- แก้ไขส่วน CORS สำหรับ Railway ---
const corsOptions = {
    origin: function (origin, callback) {
        // อนุญาต requests ที่ไม่มี origin (เช่น mobile apps, curl, postman)
        if (!origin) return callback(null, true);

        const allowedOrigins = [
            'http://localhost:3000',
            'http://localhost:8080',
            'http://localhost:5500', // VS Code Live Server
            'http://127.0.0.1:5500',
            /\.railway\.app$/  // อนุญาตทุก subdomain ของ railway.app (สำคัญมาก!)
        ];
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (allowed instanceof RegExp) return allowed.test(origin);
            return allowed === origin;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('⚠️ CORS Warning (Development): Allow blocked origin:', origin);
            // สำหรับ Lab อนุญาตไปก่อน เพื่อลดปัญหา Connection
            callback(null, true); 
        }
    },
    credentials: true, // อนุญาตให้ส่ง Cookies/Headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// ------------------------------------

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// ============================================
// Routes
// ============================================

// Health check endpoint
app.get('/api/health', async (req, res) => {
    const dbHealth = await healthCheck();
    const healthy = dbHealth.status === 'healthy';
    
    res.status(healthy ? 200 : 503).json({
        status: healthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'development',
        database: dbHealth
    });
});

// API info
app.get('/api', (req, res) => {
    res.json({
        name: 'Task Board API',
        version: '2.0.0',
        description: 'ENGSE207 Week 7 - Cloud Deployment (Railway)',
        endpoints: {
            health: 'GET /api/health',
            tasks: {
                list: 'GET /api/tasks',
                get: 'GET /api/tasks/:id',
                create: 'POST /api/tasks',
                update: 'PUT /api/tasks/:id',
                delete: 'DELETE /api/tasks/:id',
                stats: 'GET /api/tasks/stats'
            }
        }
    });
});

// Task routes
app.use('/api/tasks', taskRoutes);

// ============================================
// Error Handling
// ============================================

// ถ้ามีไฟล์ middleware ให้ใช้ code นี้
// app.use(notFoundHandler);
// app.use(errorHandler);

// ถ้าไม่มีไฟล์ middleware ให้ใช้ code นี้แทน (กัน Error)
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// ============================================
// Start Server
// ============================================

const startServer = async () => {
    try {
        // Test database connection
        const dbHealth = await healthCheck();
        
        // บน Railway บางที DB อาจจะ start ช้ากว่า API นิดหน่อย
        if (dbHealth.status !== 'healthy') {
            console.error('❌ Database connection failed:', dbHealth.error);
            console.log('⏳ Waiting for database... (Retry in 5s)');
            setTimeout(startServer, 5000);
            return;
        }

        app.listen(PORT, '0.0.0.0', () => {
            console.log('=========================================');
            console.log('🚀 Task Board API Started (Railway Ready)');
            console.log('=========================================');
            console.log(`📡 Server running on port ${PORT}`);
            console.log(`🗄️  Database: ${dbHealth.database}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log('=========================================');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        setTimeout(startServer, 5000);
    }
};

startServer();
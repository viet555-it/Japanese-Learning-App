import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import axios from 'axios';
dotenv.config();

import db from './config/db.js';
import { initializeIndexes } from './config/add_indexes.js';

const initDatabase = async () => {
    try {
        await initializeIndexes();

        // Khởi tạo bảng login history (nếu chưa có) cho tính năng Visit Calendar
        await db.query(`
            CREATE TABLE IF NOT EXISTS user_login_history (
                ID INT AUTO_INCREMENT PRIMARY KEY,
                UserID INT NOT NULL,
                LoginDate DATE NOT NULL,
                UNIQUE KEY unique_user_date (UserID, LoginDate),
                FOREIGN KEY (UserID) REFERENCES user(UserID) ON DELETE CASCADE
            )
        `);

        // Initialize feedback table if not exists
        await db.query(`
            CREATE TABLE IF NOT EXISTS feedback (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                rating VARCHAR(20) NOT NULL,
                category VARCHAR(100) NOT NULL,
                description TEXT NOT NULL,
                image_data LONGTEXT,
                upvotes INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(UserID) ON DELETE SET NULL
            )
        `);

        // Initialize chat history table if not exists
        await db.query(`
            CREATE TABLE IF NOT EXISTS chat_messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                role ENUM('user', 'model') NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES user(UserID) ON DELETE CASCADE
            )
        `);
        console.log("Database initialized successfully.");
    } catch (err) {
        console.error("Database initialization error:", err.message);
    }
};

initDatabase();

import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Main API Router
app.use('/api', routes);

// Global Error Handler Middleware (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
    
    // Auto ping to keep server alive on free Render tier
    const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL || `http://localhost:${PORT}/api/lessons`;
    setInterval(() => {
        axios.get(KEEP_ALIVE_URL)
            .then(() => console.log('[Keep-Alive] Ping successful'))
            .catch(err => console.error('[Keep-Alive] Ping failed', err.message));
    }, 14 * 60 * 1000); // 14 mins
});
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import characterRoutes from './routes/characterRoutes.js';
import kanjiRoutes from './routes/kanjiRoutes.js';
import vocabRoutes from './routes/vocabRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/kanji', kanjiRoutes);
app.use('/api/vocab', vocabRoutes);
app.use('/api/stats', statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại port ${PORT}`);
});
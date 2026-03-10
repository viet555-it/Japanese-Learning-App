import db from '../config/db.js';

export const saveQuizResult = async (req, res) => {
    try {
        const { category, levelId, difficulty, score, totalQuestions, duration } = req.body;
        
        const [result] = await db.query(
            `INSERT INTO quiz_history (category, level_id, difficulty, score, total_questions, duration_seconds) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [category, levelId, difficulty, score, totalQuestions, duration]
        );
        
        res.status(201).json({ message: "Đã lưu kết quả!", id: result.insertId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
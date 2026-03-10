import express from 'express';
import { saveQuizResult } from '../controllers/statsController.js';

const router = express.Router();

router.post('/save-result', saveQuizResult);

export default router;
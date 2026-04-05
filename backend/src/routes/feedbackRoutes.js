import express from 'express';
import { createFeedback, getFeedbacks, upvoteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/', getFeedbacks);
router.post('/', createFeedback);
router.patch('/:id/upvote', upvoteFeedback);

export default router;

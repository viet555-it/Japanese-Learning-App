import axiosInstance from './axiosInstance';

/**
 * GET /api/feedback - Fetch all feedback posts for community feed
 */
export const getFeedbacks = async () => {
  const response = await axiosInstance.get('/feedback');
  return response.data;
};

/**
 * POST /api/feedback - Submit a new feedback
 */
export const submitFeedback = async (feedbackData) => {
  const response = await axiosInstance.post('/feedback', feedbackData);
  return response.data;
};

/**
 * PATCH /api/feedback/:id/upvote - Upvote a feedback post
 */
export const upvoteFeedback = async (id) => {
  const response = await axiosInstance.patch(`/feedback/${id}/upvote`);
  return response.data;
};

# API Implementation Plan for Japanese Learning Web

This document outlines the required API CRUD operations for your project based on the provided ERD, project overview, and the current state of your frontend/backend codebase.

## 1. Authentication & Users
To support user accounts, login persistence (Refresh Tokens), and streak tracking.

### User Authentication
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate user, return JWT Access Token and Refresh Token.
- `POST /api/auth/refresh`: Issue a new Access Token using a valid Refresh Token.
- `POST /api/auth/logout`: Revoke Refresh Token and log user out.

### User Profile
- `GET /api/users/profile`: Retrieve user profile, current streak, and join date.
- `PUT /api/users/profile`: Update user details (e.g., display name, avatar).

---

## 2. Learning Content (Lessons, Kana, Kanji, Vocab)
Based on `Lessons` (replacing `Unit`), `KanaChart`, `Kanji`, and `Vocabulary` in the ERD.

### Lessons (Units)
- `GET /api/lessons`: Get a list of lessons.
  - *Query Params:* `?level=N5&type=Vocabulary` (to filter for frontend selection).
- `GET /api/lessons/:id`: Get details of a specific lesson.
- *(Admin)* `POST /api/lessons`, `PUT /api/lessons/:id`, `DELETE /api/lessons/:id`.

### Content Data (Read for Users, CRUD for Admins)
- `GET /api/kana`: Get Kana characters (Hiragana/Katakana) for the Kana Learning page.
- `GET /api/vocab`: Get vocabulary list.
  - *Query Params:* `?lessonId=123`.
- `GET /api/kanji`: Get Kanji list.
  - *Query Params:* `?lessonId=123`.
- *(Admin)* CRUD endpoints for Kana, Vocab, and Kanji (`POST`, `PUT`, `DELETE`).

---

## 3. Quiz Engine
Transforming content into playable quizzes. These endpoints interact with [Quiz](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/questionController.js#67-98) and `Quiz_Items`.

*(Note: Partially implemented in [questionController.js](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/questionController.js))*
- `GET /api/quizzes`: List available quizzes (already implemented [getQuizzes](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/questionController.js#67-98)).
- `GET /api/quizzes/:quizId/questions`: Fetch the questions for a specific quiz (already implemented [getQuestions](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/questionController.js#3-66)).
- *(Admin)* `POST /api/quizzes`: Create a new Quiz wrapper.
- *(Admin)* `PUT /api/quizzes/:id`, `DELETE /api/quizzes/:id`: Update/delete a Quiz.
- *(Admin)* `POST /api/quizzes/:quizId/items`: Bulk add vocabulary/kanji/kana IDs into a quiz (`Quiz_Items`).

---

## 4. Gameplay & Analytics (Progress)
Tracking user performance, sessions, and achievements for the `ProgressPage`.

### Quiz Sessions
*(Note: Partially implemented in [sessionController.js](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/sessionController.js))*
- `POST /api/sessions`: Initialize a new playthrough (already implemented [createSession](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/sessionController.js#3-18)).
- `POST /api/sessions/:sessionId/statistics`: Submit the final score, accuracy, and time (already implemented [saveStatistic](file:///d:/study_materials/SS2_SpecialSubject2/FinalProject_SS2/backend/src/controllers/sessionController.js#19-36)).

### Progress & Statistics Data
- `GET /api/users/progress`: Retrieve user's learning statistics (total correct, average accuracy, time spent) for charting on the Progress Page.
- `GET /api/users/history`: Get recent `Quiz_Session` history.

### Achievements
- `GET /api/achievements`: List all available system achievements.
- `GET /api/users/achievements`: List achievements unlocked by the current user.
- `POST /api/users/achievements/check`: (Internal/Backend trigger) Evaluate if the recent session unlocked a new achievement and insert into `User_Achievement` if criteria met.

---

## Verification Plan

### Automated/Manual Verification
1. **Database Schema Matches:** Ensure that these API routes map 1:1 with the tables listed in `ERD_Explanation_v2.docx`.
2. **Frontend Integration:** Ensure that `pages/Kana`, `pages/Vocab`, `pages/Kanji`, and `pages/Progress` have matching endpoints to fetch their required data.
3. **Admin vs User:** Ensure robust role-based access control (RBAC) middleware is established so normal users cannot `POST/PUT/DELETE` learning content.

# FitTrack — Fitness & Wellness Platform

A full-stack MERN fitness tracker with authentication, workouts, daily tasks, nutrition logs, progress tracking, and dark/light themes.

## Stack
- React + Vite, React Router, Axios, Recharts, Lucide React
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication in HttpOnly cookies; bcryptjs password hashing

## Requirements
- Node.js 20+
- MongoDB Atlas account or local MongoDB

## Setup

### 1. Backend
```bash
cd server
cp .env.example .env
# Set MONGODB_URI and JWT_SECRET in .env
npm install
npm run dev
```
Backend runs at `http://localhost:5000`.

### 2. Frontend
In a second terminal:
```bash
cd client
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

Register an account in the app to start tracking. API requests use an HttpOnly cookie; credentials are never stored in localStorage.

## API
- `POST /api/auth/register` — create account
- `POST /api/auth/login` — sign in
- `POST /api/auth/logout` — sign out
- `GET /api/auth/me` — current user
- `GET|POST /api/workouts`, `PATCH|DELETE /api/workouts/:id`
- `GET|POST /api/tasks`, `PATCH|DELETE /api/tasks/:id`
- `GET|POST /api/meals`, `DELETE /api/meals/:id`
- `GET|POST /api/progress`
- `GET /api/dashboard/summary`
- `GET /api/health`

All data endpoints require authentication and are scoped to the signed-in user.

## Security notes
- Configure a strong unique `JWT_SECRET` and use HTTPS in production.
- Set `CLIENT_URL` to your deployed frontend origin.
- Set `COOKIE_SECURE=true` in production (HTTPS).
- Add rate limiting, email verification, password reset, monitoring, and automated tests before public production use.
- Fitness and nutrition values are user-entered estimates, not medical advice.

## License
MIT

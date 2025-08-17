# Project: GPT Check

A full-stack application built with **Node.js (Express + MongoDB)** on the backend and **React (Vite)** on the frontend.

---

## 📂 Project Structure

```
gpt_chcek/
├── backend/        # Express + MongoDB backend
│   ├── src/
│   │   ├── app.js             # Express app setup
│   │   ├── server.js          # Entry point for backend
│   │   ├── config/db.js       # MongoDB connection config
│   │   ├── models/            # Mongoose models (decision, events, members, messages, metrics)
│   │   ├── routes/            # API routes (events, members, messages, etc.)
│   │   ├── services/          # Business logic & LLM services
│   │   └── seed/              # Seed scripts for DB
│   ├── package.json
│   └── .env (ignored)
│
└── my-app/         # React + Vite frontend
    ├── src/
    │   ├── App.jsx            # Main React component
    │   ├── main.jsx           # Entry point
    │   ├── App.css, index.css # Styling
    │   └── assets/            # Static assets
    ├── index.html
    ├── vite.config.js
    └── .env (ignored)
```

---

## 🚀 Features

* **Backend (Express + MongoDB)**

  * REST APIs for managing events, members, messages, and metrics.
  * Services for event generation, retrieval, and integration with LLM.
  * Seed scripts for populating initial data.
  * MongoDB models for structured data.

* **Frontend (React + Vite)**

  * Single-page application consuming backend APIs.
  * Modern React setup with Vite for fast development.
  * Clean UI with modular components.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd gpt_chcek
```

### 2. Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file in `backend/` with:

```env
PORT=5000
MONGO_URI=<your-mongo-uri>
```

* Run backend:

```bash
npm start
```

Backend will be available at `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd ../my-app
npm install
```

* Create a `.env` file in `my-app/` with:

```env
VITE_API_URL=http://localhost:5000
```

* Run frontend:

```bash
npm run dev
```

Frontend will be available at `http://localhost:5173` (default Vite port).

---

## 📌 Scripts

### Backend

* `npm start` → Run Express server
* `npm run seed` → Seed initial database data (if configured)

### Frontend

* `npm run dev` → Start development server
* `npm run build` → Build production-ready app
* `npm run preview` → Preview production build

---

## 📖 API Endpoints (Backend)

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| GET    | `/events`   | Get all events                |
| POST   | `/events`   | Create a new event            |
| GET    | `/members`  | Get all members               |
| POST   | `/members`  | Add a new member              |
| GET    | `/messages` | Get related messages          |
| POST   | `/why`      | LLM/decision service endpoint |

---

## 🛠️ Tech Stack

* **Frontend:** React, Vite, JavaScript, CSS
* **Backend:** Node.js, Express.js, MongoDB, Mongoose
* **Other:** dotenv, LLM integration, REST APIs

---

## 📜 License

This project is licensed under the MIT License.

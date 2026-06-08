# ♻️ Waste Collection & Recycling Management System

## 📁 Project Structure

```
waste-management/
├── frontend/                      → Next.js Frontend (Port 3000)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js            → Home
│   │   │   ├── about/             → About
│   │   │   ├── categories/        → Recycling Categories
│   │   │   ├── schedule/          → Collection Schedule
│   │   │   ├── request/           → Submit Request
│   │   │   ├── status/            → Track Status
│   │   │   ├── reports/           → Public Reports
│   │   │   ├── contact/           → Contact
│   │   │   └── admin/
│   │   │       ├── login/         → Admin Login
│   │   │       └── dashboard/     → Admin Dashboard
│   │   │           ├── requests/  → Manage Requests
│   │   │           ├── categories/→ Manage Categories
│   │   │           ├── teams/     → Manage Teams
│   │   │           ├── schedules/ → Manage Schedules
│   │   │           ├── reports/   → Admin Reports
│   │   │           └── messages/  → Contact Messages
│   │   ├── components/
│   │   │   ├── public/            → Navbar, Footer
│   │   │   └── admin/             → Sidebar, AuthGuard
│   │   └── lib/
│   │       └── api.js             → All API calls (fetch to backend)
│   └── .env.local                 → NEXT_PUBLIC_API_URL=http://localhost:5000/api
│
└── backend/                       → Express.js Backend (Port 5000)
    ├── src/
    │   ├── index.js               → Entry point
    │   ├── models/                → MongoDB Mongoose models
    │   │   ├── AdminUser.js
    │   │   ├── CollectionRequest.js
    │   │   ├── RecyclingCategory.js
    │   │   ├── CollectionTeam.js
    │   │   ├── Schedule.js
    │   │   └── ContactMessage.js
    │   ├── routes/                → Express routes
    │   │   ├── auth.js
    │   │   ├── requests.js
    │   │   ├── categories.js
    │   │   ├── teams.js
    │   │   ├── schedules.js
    │   │   ├── contact.js
    │   │   └── reports.js
    │   └── middleware/
    │       └── auth.js            → JWT middleware
    └── .env                       → MONGODB_URI, JWT_SECRET, PORT
```

---

## 🚀 Setup & Run

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start both servers (2 terminals)

```bash
# Terminal 1 — Backend (http://localhost:5000)
cd backend
npm run dev

# Terminal 2 — Frontend (http://localhost:3000)
cd frontend
npm run dev
```

### 3. Create admin account (first time only)

Visit in browser:
```
http://localhost:5000/api/auth/seed
```
- **Email:** admin@waste.com
- **Password:** Admin@123

---

## 🌐 Pages

| URL | Description |
|-----|-------------|
| `localhost:3000/` | Public home page |
| `localhost:3000/request` | Submit waste collection request |
| `localhost:3000/status` | Track request by ID |
| `localhost:3000/schedule` | View collection schedule |
| `localhost:3000/categories` | Recycling info |
| `localhost:3000/contact` | Contact form |
| `localhost:3000/admin/login` | Admin login |
| `localhost:3000/admin/dashboard` | Admin panel |

## 📡 API Endpoints (Port 5000)

```
POST   /api/auth/login
GET    /api/auth/seed

GET/POST        /api/requests
GET/PUT/DELETE  /api/requests/:id

GET/POST        /api/categories
GET/PUT/DELETE  /api/categories/:id

GET/POST        /api/teams
GET/PUT/DELETE  /api/teams/:id

GET/POST        /api/schedules
GET/PUT/DELETE  /api/schedules/:id

POST            /api/contact
GET/PUT/DELETE  /api/contact/:id   (admin only)

GET             /api/reports
GET             /api/health
```

---
*Intern Project — June 2026*

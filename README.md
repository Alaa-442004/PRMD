# NMU IntelliLearn Platform

Advanced AI-Powered Learning, Examination & Digital Certification System

## Overview

NMU IntelliLearn Platform is a modern digital learning and examination platform designed to manage professional training programs, online exams, and verifiable digital certificates. The platform focuses on delivering an advanced, secure, and user-centric digital experience for learners and administrators.

## Features

### User Features
- 🎓 **Comprehensive Course Catalog** - Browse and enroll in professional courses
- 📝 **Interactive Exam Interface** - Take exams with real-time timer and auto-save
- 🏆 **Digital Certificates** - Earn verifiable digital certificates upon completion
- 📊 **Dashboard Analytics** - Track progress, performance, and achievements
- 👤 **Profile Management** - Manage your account and preferences
- 🌗 **Dark/Light Mode** - Toggle between themes with preferences saved

### Admin Features
- 📚 **Course Management** - Create and manage courses
- ❓ **Question Bank** - Build and organize exam questions
- 📋 **Exam Builder** - Create comprehensive exams
- 👥 **Student Management** - View and manage student accounts
- 💰 **Payment Tracking** - Monitor revenue and transactions
- 📈 **Analytics & Reports** - Comprehensive platform analytics

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** SQL (SQLite via Prisma; switch to PostgreSQL/MySQL in production)
- **Backend:** Next.js API Routes (no PHP)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form + Zod
- **Charts & Analytics:** Recharts
- **Icons:** Lucide Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd prmd
```

2. Install dependencies
```bash
npm install
```

3. Set up the database (SQLite)
   - Copy `.env.example` to `.env`
   - Ensure `.env` contains: `DATABASE_URL="file:./dev.db"`
   - Create DB and tables: `npm run db:push`
   - Seed sample student data: `npm run db:seed`

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Database & Chatbot

- **Students** are stored in SQL (Prisma + SQLite). Admin students page loads from `GET /api/students`.
- **Chatbot**: A floating chat button (bottom-right) opens the IntelliLearn assistant. Messages are saved in the database. By default the bot uses rule-based answers; set `OPENAI_API_KEY` in `.env` to use OpenAI for AI-powered replies.

### Face verification (online exams)

The exam page (`/exam/[id]`) uses your **face recognition Python project** to verify the test-taker during the exam. To enable it:

1. In the face-recognition project folder, install dependencies and run the Flask server:
   ```bash
   cd path/to/face-recogantion
   pip install -r requirements.txt
   python server.py
   ```
2. In this project (PRMD), set in `.env`:
   ```env
   FACE_SERVICE_URL=http://127.0.0.1:5000/verify
   ```
3. Register a face once using the desktop proctoring app (run `main.py` and complete registration); that creates `encodings/student.pkl` used by the server. Then take an exam in the browser; the page will send camera frames to `/api/face-verify`, which forwards them to the Python service.

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin pages
│   ├── courses/           # Course pages
│   ├── dashboard/         # User dashboard
│   ├── exam/              # Exam pages
│   ├── certificates/      # Certificate viewer
│   └── profile/           # User profile
├── components/            # React components
│   ├── navigation/        # Navigation components
│   ├── providers/         # Context providers
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and stores
│   ├── store/             # Zustand stores
│   └── utils/             # Utility functions
└── public/                # Static assets
```

## Color Palette

- **Primary (Dark Burgundy):** #6A0F1C
- **Secondary:** #1E1E1E
- **Accent:** #C9A24D
- **Success:** #2ECC71
- **Error:** #E74C3C

## Key Pages

### User Pages
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard
- `/courses` - Course listing
- `/courses/[id]` - Course details
- `/exam/[id]` - Exam interface
- `/exam/results/[id]` - Exam results
- `/certificates/[id]` - Certificate viewer
- `/profile` - User profile

### Admin Pages
- `/admin/dashboard` - Admin dashboard
- `/admin/courses` - Course management
- `/admin/questions` - Question bank
- `/admin/exams` - Exam builder
- `/admin/students` - Student management
- `/admin/payments` - Payment overview
- `/admin/analytics` - Analytics & reports

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Features in Detail

### Dark Mode
The platform supports dark and light modes. User preference is saved in LocalStorage and persists across sessions.

### Animations
Smooth animations are implemented using Framer Motion for:
- Page transitions
- Hover effects
- Loading states
- Success animations

### Responsive Design
The platform is fully responsive and works on:
- Desktop
- Tablet
- Mobile devices

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

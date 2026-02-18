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

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

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

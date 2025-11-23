# 🏋️ FitSpot - Premium Gym Finder

FitSpot is a modern, full-stack web application that helps users discover and book premium gyms in Algeria. Built with Next.js, Tailwind CSS, and SQLite.

## ✨ Features

- **🔍 Smart Search**: Filter gyms by price, facilities, and rating.
- **🗺️ Interactive Map**: Visualize gym locations across Algeria.
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile.
- **🔐 User Authentication**: Secure login and registration system.
- **👤 User Profiles**: Update your information and profile picture.
- **👑 Admin Dashboard**: Manage gyms and view bookings.
- **📅 Booking System**: Book daily, monthly, or annual passes.

---

## 🚀 Getting Started (Beginner Friendly)

Follow these steps to get the project running on your local machine.

### 1. Prerequisites

Make sure you have **Node.js** installed.
- [Download Node.js](https://nodejs.org/) (LTS version recommended)
- Verify installation by running `node -v` in your terminal.

### 2. Clone the Repository

```bash
git clone <your-repo-url>
cd gymfinder
```

### 3. Installation

```bash
# Install dependencies
npm install
```

### 4. Database Setup

The database file (`gymfinder.db`) is included in the repository with all the gyms already seeded! 

**If you need to reset the database**, run these scripts:

```bash
# 1. Initialize the database structure
node scripts/init-db.js

# 2. Create Admin and User accounts
node scripts/seed-users.js

# 3. Add Algerian gym data
node scripts/seed-gyms-v2.js
```

### 5. Run the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Credentials

Use these accounts to test the application:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| **Admin** | `admin@example.com` | `password123` | Full access + Admin Dashboard |
| **User** | `user@example.com` | `password123` | Booking & Search |

---

## 🇩🇿 Algerian Gyms

The app features **8 premium gyms** across major Algerian cities:

- **Alger** - Fitness Park Alger (Premium)
- **Oran** - Iron Gym Oran (Bodybuilding)
- **Constantine** - CrossFit Constantine
- **Annaba** - Zen Yoga Annaba
- **Sétif** - Power Gym Sétif
- **Tlemcen** - Elite Fitness Tlemcen
- **Blida** - Fight Club Blida (Martial Arts)
- **Béjaïa** - Ladies Gym Béjaïa (Women-only)

All prices are in **Algerian Dinar (DZD)** ranging from 3,500 to 8,000 DZD/month.

---

## 🛠️ Troubleshooting

### "I can't log in!"
If you see a "decryption failed" error or login doesn't work:
1. **Clear your browser cookies** for `localhost`.
2. Or try opening the app in an **Incognito/Private window**.
3. Restart the server (`Ctrl+C` then `npm run dev`).

### "The map isn't loading"
- The map requires a client-side environment. If it's blank, refresh the page.
- Ensure you have an internet connection to load the map tiles.

### "Database errors"
If you see errors about missing tables:
- Run `node scripts/init-db.js` again to reset the database.
- Then run the seed scripts to repopulate data.

---

## 💻 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
- **Auth**: [NextAuth.js](https://next-auth.js.org/)
- **Map**: [React Leaflet](https://react-leaflet.js.org/)

---

## 📁 Project Structure

```
gymfinder/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/              # Database & auth config
│   └── types/            # TypeScript definitions
├── scripts/              # Database seeding scripts
├── public/               # Static assets
└── gymfinder.db          # SQLite database (included!)
```

---

## 🤝 Contributing

This project is set up for easy collaboration:
1. The database is included in the repo
2. All seed scripts are ready to use
3. Just clone, install, and run!

---

## 📝 License

MIT License - feel free to use this project for learning or personal use.

# 🧠 LC Practice – Practice LeetCode-Style Contests with Friends

**LC Practice** is a web app designed for competitive programmers and algorithm enthusiasts to collaboratively solve problems, compete in custom contests, and grow together.

> ✅ Build a room → 🧩 Add problems → ⏳ Set duration → 🤝 Invite friends → 📊 View live standings

---

## 🚀 Features

- 🔒 **Private Rooms**: Create and join contests using a shared room code.
- 📑 **Custom Problems**: Add your favorite problems from any source.
- ⏱ **Time-Based Penalty**: Live leaderboard reflects solving order and time penalties.
- 💬 **Simple & Trust-Based**: Friends mark problems as solved manually (for now).
- 👥 **Collaborative Practice**: Focused on improving with peers, not competing with strangers.

---

## 🛠 Tech Stack

### 🧩 Backend
- **Node.js** + **Express**
- **MongoDB** (via Mongoose)
- **Socket.IO** – real-time communication
- **JWT + BcryptJS** – auth & security
- **dotenv, cors, cookie-parser** – setup helpers

### 🎨 Frontend
- **React** + **Vite** for blazing-fast builds
- **Tailwind CSS** + **MUI** + **Lucide Icons**
- **Redux Toolkit** + **redux-persist**
- **React Hook Form** + **Zod** – form validation
- **Firebase** – optional (for auth/session features)

---

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud, like Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/dhananjaysingh10/dsa-trainer.git
cd dsa-trainer
````

### 2. Backend Setup

```bash
cd server
npm install
# Create .env file with your Mongo URI and JWT secret
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🗺 Planned Features

* 📊 **User Dashboard**: Track past contests, stats, and solved problems.
* 🌐 **Public Contests**: Open rooms for anyone to join.
* ✨ **UI Improvements**: Cleaner design and mobile responsiveness.
* 🔍 **Online Judge Integration**: Move from trust-based to auto-verification of submissions.

---

## 🤝 Contributing

Have ideas, feedback, or want to help build the next big thing for programmers?

1. Fork this repo
2. Create a branch (`git checkout -b feature-x`)
3. Commit your changes
4. Push and open a PR

---

## 💬 Contact

**Dhananjay Singh**  
[LinkedIn](https://www.linkedin.com/in/dhananjay-singh-0335a5259/)  
[X](https://x.com/DhananjaySing_h)

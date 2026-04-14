<div align="center">
  <br />
  <h1>💸 Smart Personal Finance Tracker</h1>
  <p>
    <strong>A robust, AI-assisted Web Application to manage personal finances, visualize expenses, and track financial goals.</strong>
  </p>
  <p>
    Built with the <strong>MERN Stack</strong> (MongoDB, Express, React, Node.js) and styled beautifully with <strong>Tailwind CSS</strong>.
  </p>
</div>

<br />

## 🌟 About the Project

**Smart Personal Finance Tracker** is a production-level financial management web app designed to showcase full-stack development skills. It was built with a strong focus on secure data handling, responsive design, and intuitive user experiences. The application empowers users to take control of their finances through clear visualizations, intelligent categorization, and an interactive AI Chatbot.

This repository serves as a showcase of best practices in modern web development, representing a deep understanding of RESTful API design, complex state management, secure user authentication, and high-quality frontend styling.

---

## 🚀 Key Features

* **🛡️ Secure JWT Authentication**: Implements hardened, token-based authorization with bcrypt password hashing and protected React routes.
* **📊 Comprehensive Dashboard**: Gives users an instant, bird's-eye view of their financial health, using `Recharts` for interactive, beautiful data visualization.
* **💳 Transaction Management**: Seamlessly add, update, search, and categorize daily financial activities (Incomes and Expenses).
* **🎯 Budgeting & Goals**: Empowers proactive finance tracking. Users can set targets, track savings, and compare budget allocation against mapped spending.
* **🤖 AI-Powered Chatbot**: A customized floating interactive assistant to guide users or provide tailored financial suggestions.
* **💎 Premium Professional UI**: A meticulously crafted interface. Utilizes modern `Tailwind CSS` utilities to ensure an entirely responsive, fast-loading, cross-platform experience.
* **🔒 Production-Ready Backend**: A scalable `Node.js` + `Express` architecture adhering to MVP-controller patterns, utilizing MongoDB/Mongoose for rigid data structuring and rapid querying.
* **💸 Seamless Payment Integration Prep**: Architected to support rapid plugin interactions like Razorpay for future billing structures.

---

## 💻 Tech Stack

### Frontend
- **React.js (v19)**: Component-centric UI architecture.
- **Vite**: Ultra-fast frontend build tooling.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI styling.
- **Context API**: Native, lightweight global state management for authentication.
- **React Router DOM**: Client-side dynamic multi-page routing.
- **Recharts & Lucide React**: Premium icon integration and fully responsive SVGs data charts.

### Backend
- **Node.js**: Asynchronous event-driven JavaScript runtime.
- **Express.js**: Fast, unopinionated, minimalist web framework.
- **MongoDB & Mongoose**: NoSQL document database combined with robust object data modeling (ODM).
- **JWT & bcryptjs**: Cryptographic secure password management and stateless authentication flows.
- **Cors & Dotenv**: Environment management and secure cross-origin resource sharing.

---

## 🏗️ Architecture & Folder Structure

```text
├── client/                 # React Frontend Wrapper (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI Elements (Navbar, Layout, Chatbot)
│   │   ├── context/        # State management (AuthContext)
│   │   ├── pages/          # View logic (Dashboard, Login, Signup, Budget, Analytics...)
│   │   └── index.css       # Global thematic styling hooks
│   └── package.json        # Frontend Dependencies
│
├── server/                 # Node.js + Express Backend Services
│   ├── config/             # DB & Environment Configuration
│   ├── controllers/        # Route Handlers & Business Logic
│   ├── middleware/         # Custom Middlewares (JWT verify Auth, Error handling)
│   ├── models/             # Mongoose Data Schemas (User, Transaction, Goal)
│   ├── routes/             # RESTful API Endpoints definitions
│   └── server.js           # Server application bootstrapper
│
└── package.json            # Root configuration for concurrent execution
```

---

## ⚙️ Local Setup & Installation

Follow these instructions to run the project locally for development or demonstration purposes.

> **Prerequisites:** Ensure you have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en) installed. You will also need a Local MongoDB connection or a MongoDB Atlas URI string.

**1. Clone the repository**
```bash
git clone <repository-url>
cd i_project1
```

**2. Setup Backend Environment Variables**
Navigate to the `server/` directory and explicitly create a `.env` file containing the following:
```env
NODE_ENV=development
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**3. Install Dependencies Structure**
In the root directory, there should be a `package.json` that installs both client and server:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

**4. Spin up the application**
From the root directory, start the concurrent process which safely boots both client (Vite) and server (Nodemon):
```bash
npm run dev
```

Your backend will instantly mount on `http://localhost:5001` and your frontend UI will become available at `http://localhost:5173`. 

---

## 📈 Future Roadmaps & Enhancements

- Fully integrating a production-level payment gateway (Razorpay API).
- Exportable PDF financial reports.
- Light/Dark mode specific toggles with customized contrast colors.

<br />

<div align="center">
  <b>Built with ❤️ as a showcase of modern full-stack development patterns.</b>
</div>

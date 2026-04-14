const express = require('express');
const dotenv = require('dotenv'); // Re-triggering nodemon to force restart
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const chatRoutes = require('./routes/chatRoutes');
const goalRoutes = require('./routes/goalRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://finance-trackers-nine.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/chat', chatRoutes);
app.use('/api/v1/goals', goalRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const User = require('./models/User');
app.get('/user-count', async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    next(error);
  }
});

// Error Handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

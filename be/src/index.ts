
import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import questionRoutes from './routes/questionRoutes';
import gamificationRoutes from './routes/gamificationRoutes';
import badgeRoutes from './routes/badgeRoutes'; // Import badge routes

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/gamification', gamificationRoutes);
app.use('/api/v1/badges', badgeRoutes); // Use badge routes

app.get('/', (req, res) => {
  res.json({ success: true, message: 'MathPro API is running...' });
});

// Port configuration
const port = process.env.PORT || 5001;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set a longer timeout for the server (e.g., 5 minutes)
server.setTimeout(300000);

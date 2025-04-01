// server.ts
import express, { Application } from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/Auth';
import MongoStore from 'connect-mongo';

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Connect to MongoDB
// pass:  blahBluh.11
// email: sydell@campatar.com
mongoose
  .connect(process.env.MONGODB_URI || '')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err: any) => console.error('MongoDB connection error:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    // Use MongoStore to persist session data in your MongoDB database
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || '',
        // Optional: set session expiration in seconds (e.g., 14 days)
        ttl: 14 * 24 * 60 * 60,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Cookie expires after 1 day (in milliseconds)
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production with HTTPS
      },
  })
);

// Use the authentication routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

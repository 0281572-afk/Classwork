import express from 'express';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import { loadEnvFile } from "node:process";
import { protect, requireAdmin } from './middleware/authMiddleware.js';
import { AppError } from './utils/appError.js';
import { connectDB } from './config/db.js';
import { createUser } from './services/user-service.js';

loadEnvFile(); //this function will load the .env file and set the environment variables
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const dbName = "test";


const app = express();
const PORT = 3000;

const mongoUrl = `mongodb+srv://${dbuser}:${dbpassword}@cluster0.l8fwd5m.mongodb.net/${dbName}`;
connectDB(mongoUrl); //connect to the database

// Body parser
app.use(express.json());

// TODO: Serve static files from the 'public' directory so index.html loads on http://localhost:3000
app.use(express.static('public'));

// TODO: Mount Routers
// Mount authRoutes on '/api/auth'
// Mount apiRoutes on '/api/'

app.use('/api/auth', requireAdmin, authRoutes);
app.use('/api', protect, apiRoutes);
app.post("/user", (req, res) => {
  const { username, name, email, password } = req.body;
  if(!username || !name || !email || !password)
    return res.status(400).json({ error: "All fields are requiered!" });
  createUser({ username, name, email, password })
    .then((user) => res.json(user))
    .catch((err) => next(err));
});


// 404 Unhandled Route Handler
app.all("/{*splat}", (req, res, next) => {
    next(new AppError(`Cannot find route ${req.originalUrl} on this server!`, 404));
});

// Centralized Global Error Handler
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 SustainHub Server running at http://localhost:${PORT}`);
});

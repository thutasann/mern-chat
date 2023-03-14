import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/userRoutes';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
app.use('/api/user', userRoutes);

// Server Listen
app.listen(PORT, () => {
	console.log(`Server is Running on PORT : ${PORT} 🚀`);
});

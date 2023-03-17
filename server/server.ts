import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/user-routes';
import chatRoutes from './routes/chat-routes';
import { ErrorHandler, NotFound } from './middlewares/error-middleware';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use(NotFound);
app.use(ErrorHandler);

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is Running on PORT : ${PORT} 🚀`);
});

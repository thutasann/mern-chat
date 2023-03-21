import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import userRoutes from './routes/user-routes';
import chatRoutes from './routes/chat-routes';
import messageRoutes from './routes/message-routes';
import { ErrorHandler, NotFound } from './middlewares/error-middleware';
import cors from 'cors';
import { Server } from 'socket.io';
import { ChatProps, SocketEmitNames, SocketNames, UserProps } from './types';

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.use(
	cors({
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'https://mern-t-chat.vercel.app',
		],
	}),
);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use(NotFound);
app.use(ErrorHandler);

// Server Listen
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
	console.log(`Server is Running on PORT : ${PORT} 🚀`);
});

// Socket IO
const io: Server = new Server(server, {
	pingTimeout: 60000,
	cors: {
		origin: [
			'http://localhost:3000',
			'http://localhost:3001',
			'https://mern-t-chat.vercel.app',
		],
	},
});

io.on('connection', (socket) => {
	socket.on<SocketNames>('setup', (userData: UserProps) => {
		socket.join(userData._id);
		socket.emit<SocketEmitNames>('connected');
	});

	socket.on<SocketNames>('joinChat', (room: ChatProps) => {
		socket.join(room._id);
		console.log('User Joined Room: ' + room);
	});
});

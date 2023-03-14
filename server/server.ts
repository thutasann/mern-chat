import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('API is running');
});

app.listen(PORT, () => {
	console.log(`Server is Running on PORT : ${PORT}`);
});

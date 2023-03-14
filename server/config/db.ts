import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI!, {});
		console.log(`MongoDB Connected: ✅`);
	} catch (error: any) {
		console.error(`MongoDB Connection Error: ${error.message} 🔴`);
		process.exit();
	}
};

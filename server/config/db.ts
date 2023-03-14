import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const con = await mongoose.connect(process.env.MONGO_URI!, {});
		console.log(`MongoDB Connected: ${con.connection.host}`);
	} catch (error: any) {
		console.error(`MongoDB Connection Error: ${error.message}`);
		process.exit();
	}
};

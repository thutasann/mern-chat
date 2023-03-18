import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserProps } from '../types';

const userModel = new mongoose.Schema<UserProps>(
	{
		name: { type: 'String', required: true },
		email: { type: 'String', unique: true, required: true },
		password: { type: 'String', required: true },
		pic: {
			type: 'String',
			default:
				'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	},
);

/**
 * Match Password Function
 */
userModel.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Password Hash
 */
userModel.pre('save', async function (next) {
	if (!this.isModified) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

export const User = mongoose.model<UserProps>('User', userModel);

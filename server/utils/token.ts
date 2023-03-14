import jwt from 'jsonwebtoken';

/**
 * Generate Token
 * @param id
 * @returns JWT
 */
export const generateToken = (id: any) => {
	return jwt.sign({ id }, process.env.JWT_SECRET!, {
		expiresIn: '30d',
	});
};

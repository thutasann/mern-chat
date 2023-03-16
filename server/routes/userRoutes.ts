import express from 'express';
import {
	allUsers,
	authUser,
	registerUser,
} from '../controllers/userControllers';
const router = express.Router();

router.route('/').post(registerUser).get(allUsers);
router.post('/login', authUser);

export default router;

import express from 'express';
import {
	allUsers,
	authUser,
	registerUser,
} from '../controllers/user-controllers';
import { protect } from '../middlewares/auth-middleware';
const router = express.Router();

router.route('/').post(registerUser).get(protect, allUsers);
router.post('/login', authUser);

export default router;

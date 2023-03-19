import express from 'express';
import {
	accessChat,
	createGroupChat,
	fetchChats,
} from '../controllers/chat-controllers';
import { protect } from '../middlewares/auth-middleware';

const router = express.Router();

router.route('/').post(protect, accessChat);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
// router.route("/rename").put(protect, renameGroup);
// router.route("/groupremove").put(protect, removeFromGroup);
// router.route("/groupadd").put(protect, addToGroup);

export default router;

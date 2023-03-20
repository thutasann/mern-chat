import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/message-controller';
import { protect } from '../middlewares/auth-middleware';
const router = express.Router();

router.route('/').post(protect, sendMessage);
router.route('/:chatId').get(protect, getAllMessages);

export default router;

import { Router } from 'express';

import { commentController } from '../controller';

const router = Router();

router.post('/', commentController.createComment);
router.get('/:userId', commentController.getUserComments);
router.post('/action', commentController.setLikeDislike);

export const commentRouter = router;

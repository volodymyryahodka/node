import { Router } from 'express';

import { postController } from '../controller';

const router = Router();

router.post('/', postController.createPost);
router.get('/:userId', postController.getUserPosts);
router.patch('/:postId', postController.updatePost);

export const postRouter = router;

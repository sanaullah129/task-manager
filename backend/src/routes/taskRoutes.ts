import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();
const controller = new TaskController();

router.post('/', requireAuth, controller.create);
router.get('/', requireAuth, controller.list);
router.get('/:id', requireAuth, controller.get);
router.put('/:id', requireAuth, controller.update);
router.delete('/:id', requireAuth, requireAdmin, controller.delete);

export default router;

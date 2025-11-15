import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const controller = new AuthController();

router.post('/signup', controller.register);
router.post('/signin', controller.login);

export default router;

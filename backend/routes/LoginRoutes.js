import {Router} from 'express';

import LoginController from '../controllers/LoginControllers.js';

const router = new Router();

router.post('/', LoginController.login);

export default router;
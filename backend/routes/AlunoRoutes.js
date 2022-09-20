import {Router} from 'express'; 

import AlunoController from '../controllers/AlunoControllers.js';

const router = new Router();

router.post('/registro', AlunoController.registro);
router.post('/login', AlunoController.login);
router.get('/checaAluno', AlunoController.checaAluno);
router.get('/:id', AlunoController.getAlunoById);
router.patch('/:id', AlunoController.editAluno);




export default router;
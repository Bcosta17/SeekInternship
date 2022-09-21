import {Router} from 'express'; 

import AlunoController from '../controllers/AlunoControllers.js';

import verificaToken from '../helpers/verifica-token.js';

const router = new Router();

router.post('/registro', AlunoController.registro);
router.post('/login', AlunoController.login);
router.get('/checaAluno', AlunoController.checaAluno);
router.get('/:id', AlunoController.getAlunoById);
router.patch('/:id', verificaToken, AlunoController.editAluno);




export default router;
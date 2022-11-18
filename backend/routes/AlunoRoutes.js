import {Router} from 'express'; 

import AlunoController from '../controllers/AlunoControllers.js';

import verificaToken from '../helpers/verifica-token.js';
import  fileUpload from '../helpers/curriculo-upload.js';

const router = new Router();

router.post('/registro', fileUpload.single("curriculo"), AlunoController.registro);
router.get('/', AlunoController.getAll);
router.get('/:id', AlunoController.getAlunoById);
router.put('/:id',fileUpload.single("curriculo"), verificaToken, AlunoController.editAluno);




export default router;
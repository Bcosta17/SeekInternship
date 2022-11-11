import {Router} from 'express'; 

import EmpresaController from '../controllers/EmpresaControllers.js';

import verificaToken from '../helpers/verifica-token.js';

const router = new Router();

router.post('/registro', EmpresaController.registro);
router.get('/', EmpresaController.getAll);
router.get('/checaEmpresa',EmpresaController.checaEmpresa);
router.get('/:id', EmpresaController.getEmpresaById);
router.patch('/:id', verificaToken, EmpresaController.editEmpresa);
router.post('/enviaEmail', EmpresaController.sendMail);




export default router;
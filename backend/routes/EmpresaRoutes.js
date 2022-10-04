import {Router} from 'express'; 

import EmpresaController from '../controllers/EmpresaControllers.js';
import VagaController from '../controllers/VagaControllers.js';

import verificaToken from '../helpers/verifica-token.js';

const router = new Router();

router.post('/registro', EmpresaController.registro);
router.get('/', EmpresaController.getAll)
router.post('/login', EmpresaController.login);
router.get('/checaEmpresa',EmpresaController.checaEmpresa);
router.get('/:id', EmpresaController.getEmpresaById);
router.patch('/:id', verificaToken, EmpresaController.editEmpresa);




export default router;
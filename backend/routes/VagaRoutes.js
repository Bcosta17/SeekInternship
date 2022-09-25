import {Router} from "express";

import VagaControllers from "../controllers/VagaControllers.js";

//middleware
import verificatoken from "../helpers/verifica-token.js";


const router = new Router();


router.post("/cadastro", verificatoken, VagaControllers.create);
router.get('/', VagaControllers.getAll);
router.get('/minhasVagas', verificatoken, VagaControllers.getVagasPorEmpresa);
router.get('/minhasCandidaturas', verificatoken, VagaControllers.getVagasPorAluno);
router.get('/:id', VagaControllers.getVagaById);
router.delete('/:id', verificatoken, VagaControllers.deleteVagaById);
router.patch('/:id', verificatoken, VagaControllers.updateVaga);
router.patch('/candidatar/:id', verificatoken, VagaControllers.candidatarVaga);
// router.patch('/conclude/:id', verificatoken, VagaControllers.concludeAdoption);

export default router;
import {Router} from "express";

import VagaControllers from "../controllers/VagaControllers.js";
import verificatoken from "../helpers/verifica-token.js";
  
const router = new Router();


router.post("/cadastro", verificatoken, VagaControllers.create);
router.get('/', VagaControllers.getAll);
router.get('/minhasVagas', verificatoken, VagaControllers.getVagasPorEmpresa);
router.get('/minhasCandidaturas', verificatoken, VagaControllers.getVagasPorAluno);
router.get('/:id', VagaControllers.getVagaById);
router.delete('/:id', verificatoken, VagaControllers.deleteVagaById);
router.put('/:id', verificatoken, VagaControllers.updateVaga);
router.post('/candidatar/:id', verificatoken, VagaControllers.candidatarVaga);

 
export default router;
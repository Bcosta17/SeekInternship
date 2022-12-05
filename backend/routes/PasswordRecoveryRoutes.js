import {Router} from 'express'; 
import PasswordRecoveryControllers from '../controllers/PasswordRecoveryControllers.js';


const router = new Router();

router.post('/forgotPassword', PasswordRecoveryControllers.forgotPassword);
router.post('/resetPassword', PasswordRecoveryControllers.resetPassword);



export default router;
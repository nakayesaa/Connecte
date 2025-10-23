import { Router } from "express";
import { createUserCont, loginUserCont, getUname, logoutUserCont, getData, updateUserData} from "../Controllers/userController";
import { checkToken } from "../middleware/token";

const router = Router();

router.post('/signup', createUserCont); 
router.post('/login', loginUserCont);
router.get('/getUsername', getUname);
router.post('/logout', logoutUserCont);
router.get('/getData', checkToken, getData);
router.patch('/Update', checkToken, updateUserData)
export default router;
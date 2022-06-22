import { Router } from 'express';
import { validate } from 'express-validation';
import * as userController from '../controllers/user/user.controller.js';
import * as userValidator from '../controllers/user/user.validator.js';
const router = Router();

router.post('/recruitments', validate(userValidator.addRecruitment), userController.addRecruitment);

export default router;

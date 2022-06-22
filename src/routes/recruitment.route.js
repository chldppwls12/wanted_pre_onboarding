import { Router } from 'express';
import { validate } from 'express-validation';
import * as recruitmentController from '../controllers/recruitment/recruitment.controller.js';
import * as recruitmentValidator from '../controllers/recruitment/recruitment.validator.js';
const router = Router();

router.get('/', recruitmentController.getAllRecruitments);
router.post('/', validate(recruitmentValidator.addRecruitment), recruitmentController.addRecruitment);

export default router;

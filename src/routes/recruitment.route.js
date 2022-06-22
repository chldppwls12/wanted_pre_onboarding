import { Router } from 'express';
import { validate } from 'express-validation';
import * as recruitmentController from '../controllers/recruitment/recruitment.controller.js';
import * as recruitmentValidator from '../controllers/recruitment/recruitment.validator.js';
const router = Router();

router.get('/', validate(recruitmentValidator.getAllRecruitments), recruitmentController.getAllRecruitments);
router.post('/', validate(recruitmentValidator.addRecruitment), recruitmentController.addRecruitment);
router.patch('/:recruitment_id', validate(recruitmentValidator.updateRecruitment), recruitmentController.updateRecruitment);
router.get('/:recruitment_id', validate(recruitmentValidator.getRecruitment), recruitmentController.getRecruitment);

export default router;

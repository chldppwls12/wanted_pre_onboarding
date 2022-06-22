import { Router } from 'express';
import * as recruitmentController from '../controllers/recruitment/recruitment.controller.js';

const router = Router();

router.get('/', recruitmentController.getAllRecruitments);

export default router;

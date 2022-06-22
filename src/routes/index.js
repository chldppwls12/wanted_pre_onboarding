import { Router } from 'express';
import recruitmentRoutes from './recruitment.route.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/recruitments',
    route: recruitmentRoutes
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

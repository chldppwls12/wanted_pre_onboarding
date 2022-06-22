import { Router } from 'express';
import recruitmentRoutes from './recruitment.route.js';
import userRoutes from './user.route.js';

const router = Router();

const defaultRoutes = [
  {
    path: '/recruitments',
    route: recruitmentRoutes
  },
  {
    path: '/users',
    route: userRoutes
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

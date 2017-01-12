//api 루트 라우터 생성

import express from 'express';

import auth from './auth';
import dashboard from './dashboard';
import authCheckMiddleware from './../middleware/auth-check';
const router = express.Router();

// pass the authenticaion checker middleware
router.use('/dashboard', authCheckMiddleware);


/*
 * /api/dashboard
 */
router.use('/dashboard', dashboard);


/*
* /api/auth
*/
router.use('/auth', auth);

export default router;




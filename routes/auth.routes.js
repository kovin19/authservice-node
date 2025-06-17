import express from 'express';

import logger from '../middleware/logger.js';

import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/auth/v1/login', logger, login);

export default router;
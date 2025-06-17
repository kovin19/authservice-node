import express from 'express';

import { findAllUsers, createUser, findUserById, updateUser } from "../controllers/users.controller.js";
import { validateUser } from '../middleware/users.validation.js';
import logger from '../middleware/logger.js';

const router = express.Router();

router.get('/auth/v1/users', logger, findAllUsers);

router.get('/auth/v1/users/:id', logger, findUserById);

router.post('/auth/v1/users', logger, validateUser, createUser);

router.put('/auth/v1/users/:id', logger, validateUser, updateUser);

export default router;
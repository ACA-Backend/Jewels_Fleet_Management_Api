import express from 'express';
import { register, login } from '../app/controllers/authController.js';
import { validate, userSchema } from '../app/middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/register', validate(userSchema), register);
router.post('/login', validate(Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})), login);

export default router;
import Joi from 'joi';

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Example schemas (add more as needed)
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string().valid('admin', 'user').default('user')
});

const vehicleSchema = Joi.object({
  plateNumber: Joi.string().required(),
  model: Joi.string().required(),
  capacity: Joi.number().integer().min(1).required(),
  status: Joi.string().valid('active', 'in_maintenance', 'retired').required(),
  assignedDriverId: Joi.string().optional()
});

// Add more schemas as needed

export { validate, userSchema, vehicleSchema };
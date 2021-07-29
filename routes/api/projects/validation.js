const Joi = require("joi");

const schemaCreateProject = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateProject = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createProject = (req, _res, next) => {
  return validate(schemaCreateProject, req.body, next);
};

module.exports.updateProject = (req, _res, next) => {
  return validate(schemaUpdateProject, req.body, next);
};

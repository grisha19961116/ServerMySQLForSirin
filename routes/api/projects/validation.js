const Joi = require("joi");

const schemaCreateProject = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  project: Joi.string().alphanum().min(3).max(30).required(),
});

const schemaUpdateProject = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  project: Joi.string().alphanum().min(3).max(30).optional(),
  url: Joi.string().alphanum().min(8).max(60).optional(),
  stars: Joi.number().min(0).max(5).optional(),
  forks: Joi.number().max(1000).optional(),
  problems: Joi.number().max(1000).optional(),
  data: Joi.number().optional(),
}).min(1);

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

const Joi = require("joi");

const schemaAuthUser = Joi.object({
  email: Joi.string().email().min(6).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
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

module.exports.authUser = (req, _res, next) => {
  return validate(schemaAuthUser, req.body, next);
};

const rateLimit = require("express-rate-limit");
const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Too many registrations, please try again later",
    });
  },
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (_req, res, _next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Too many requests, please try again later.",
    });
  },
});

module.exports = { createAccountLimiter, apiLimiter };

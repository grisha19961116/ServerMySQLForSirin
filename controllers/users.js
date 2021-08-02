const jwt = require("jsonwebtoken");
const Users = require("../models").User;
const { HttpCode } = require("../helpers/constants");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const reg = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        message: "Email is already use",
      });
    }
    const newUser = await Users.create({
      email,
      password: await bcrypt.hash(password, bcrypt.genSaltSync(8), null),
    });
    return res.status(HttpCode.CREATED).json({
      data: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
    user.token = token;
    await user.save();

    return res.status(HttpCode.OK).json({
      data: {
        token,
        email,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, _next) => {
  const id = req.user.id;
  await Users.update({ token: null }, { where: { id } });
  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = { reg, login, logout };

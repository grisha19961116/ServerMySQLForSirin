const Projects = require("../models").Project;

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await Projects.findAll({ where: { owner: userId } });
    return res.json({
      status: "success",
      code: 200,
      data: {
        projects,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await Projects.findOne({
      where: { id: req.params.id, owner: userId },
    });
    if (project) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          project,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await Projects.create({ ...req.body, owner: userId });
    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        project,
      },
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const project = await Projects.findOne({
      where: { id: req.params.id, owner: userId },
    });
    if (project) {
      await Projects.destroy({
        where: { id: req.params.id, owner: userId },
      });
      return res.json({
        status: "success",
        code: 200,
        data: {
          project,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await Projects.update(req.body, {
      where: { id: req.params.id, owner: userId },
    });
    const project = await Projects.findOne({
      where: { id: req.params.id, owner: userId },
    });
    if (project) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          project,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};

const axios = require("axios");

const Projects = require("../models").Project;
const { HttpCode } = require("../helpers/constants");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projects = await Projects.findAll({ where: { owner: userId } });
    return res.status(HttpCode.OK).json({
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
      return res.status(HttpCode.OK).json({
        data: {
          project,
        },
      });
    }
    return res.status(HttpCode.NO_FOUND).json({
      message: "NOT FOUND",
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, project } = req.body;
    const dataFetch = await axios.get(
      `http://api.github.com/repos/${name}/${project}`,
      {
        headers: {
          Authorization: `No Auth`,
        },
      }
    );
    const {
      url,
      stargazers_count,
      forks_count,
      open_issues_count,
      created_at,
    } = await dataFetch.data;

    const newProject = await {
      name,
      project,
      url,
      stars: stargazers_count,
      forks: forks_count,
      problems: open_issues_count,
      constructed: created_at,
    };
    console.log(created_at, `time`);
    const createdProject = await Projects.create({
      ...newProject,
      owner: userId,
    });
    if (createdProject) {
      return res.status(HttpCode.CREATED).json({
        data: {
          createdProject,
        },
      });
    } else {
      return res.status(HttpCode.NO_FOUND).json({
        message: "NOT FOUND",
      });
    }
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
      return res.status(HttpCode.OK).json({
        data: {
          project,
        },
      });
    }
    return res.status(HttpCode.NO_FOUND).json({
      message: "NOT FOUND",
    });
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
      return res.status(HttpCode.OK).json({
        data: {
          project,
        },
      });
    }

    return res.status(HttpCode.NO_FOUND).json({
      message: "NOT FOUND",
    });
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

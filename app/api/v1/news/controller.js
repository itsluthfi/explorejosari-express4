// import services images
const {
  getAllNews,
  createNews,
  getOneNews,
} = require('../../../services/mongoose/news');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
  try {
    const result = await createNews(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllNews(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneNews(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, find };

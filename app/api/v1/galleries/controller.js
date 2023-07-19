// import services galleries
const {
  getAllGalleries,
  getOneGalleries,
  createGalleries,
  deleteGalleries,
} = require('../../../services/mongoose/galleries');

const { StatusCodes } = require('http-status-codes');

const create = async (req, res, next) => {
  try {
    const result = await createGalleries(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const index = async (req, res, next) => {
  try {
    const result = await getAllGalleries(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(err);
  }
};

const find = async (req, res, next) => {
  try {
    const result = await getOneGalleries(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const result = await deleteGalleries(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { create, index, find, destroy };

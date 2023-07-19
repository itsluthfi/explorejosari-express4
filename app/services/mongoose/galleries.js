// import model news
const Gallery = require('../../api/v1/galleries/model');

// import custom error not found
const { NotFoundError } = require('../../errors');

// import slugify
const slugify = require('slugify');

// import filesystem dan path
const fs = require('fs');
const path = require('path');

const __basedir = path.resolve();

const slugOptions = {
  replacement: '-',
  remove: undefined,
  lower: true,
  strict: true,
  locale: 'en',
};

const getAllGalleries = async () => {
  const result = await Gallery.find();

  return result;
};

const createGalleries = async (req) => {
  const { title, description } = req.body;

  const slug = slugify(title, slugOptions);

  const result = await Gallery.create({
    title,
    slug,
    description,
    photo: `uploads/${req.file.filename}`,
  });

  return result;
};

const getOneGalleries = async (req) => {
  const { slug } = req.params;

  const result = await Gallery.findOne({ slug: slug });

  if (!result) throw new NotFoundError(`Tidak ada foto dengan judul ${slug}`);

  return result;
};

const deleteGalleries = async (req) => {
  const { id } = req.params;

  const result = await Gallery.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada foto dengan id: ${id}`);

  const photoPath = path.join(__basedir, 'public', result.photo);
  fs.unlinkSync(photoPath);

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllGalleries,
  createGalleries,
  getOneGalleries,
  deleteGalleries,
};

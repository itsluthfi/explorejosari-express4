// import model news
const News = require('../../api/v1/news/model');

// import custom error not found dan bad request
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

const getAllNews = async () => {
  const result = await News.find();

  return result;
};

const createNews = async (req) => {
  const { title, date, content, category } = req.body;

  const slug = slugify(title, slugOptions);

  const result = await News.create({
    title,
    slug,
    date,
    content,
    photo: req.file
      ? `uploads/${req.file.filename}`
      : 'uploads/photo/news-default.jpg',
    category,
    // author: req.user.name,
  });

  return result;
};

const getOneNews = async (req) => {
  const { slug } = req.params;

  const result = await News.findOne({ slug: slug });

  if (!result) throw new NotFoundError(`Tidak ada berita dengan judul ${slug}`);

  return result;
};

const updateNews = async (req) => {
  const { id } = req.params;
  const { title, date, content, category } = req.body;

  const existingNews = await News.findOne({ _id: id });

  const slug = slugify(title, slugOptions);

  if (req.file && existingNews.photo) {
    const previousPhotoPath = path.join(
      __basedir,
      'public',
      existingNews.photo
    );
    fs.unlinkSync(previousPhotoPath);
  }

  const result = await News.findOneAndUpdate(
    { _id: id },
    {
      title,
      slug,
      date,
      content,
      photo: req.file ? `uploads/${req.file.filename}` : existingNews.photo,
      category,
      // author: req.user.name,
    },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada berita dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada berita dengan id: ${id}`);

  return result;
};

const deleteNews = async (req) => {
  const { id } = req.params;

  const result = await News.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada berita dengan id: ${id}`);

  const photoPath = path.join(__basedir, 'public', result.photo);
  fs.unlinkSync(photoPath);

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllNews,
  createNews,
  getOneNews,
  updateNews,
  deleteNews,
};

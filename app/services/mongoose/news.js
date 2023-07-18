// import model news
const News = require('../../api/v1/news/model');

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

// import slugify
const slugify = require('slugify');

const getAllNews = async () => {
  const result = await News.find();

  return result;
};

const createNews = async (req) => {
  const { title, date, content, category } = req.body;

  const options = {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    locale: 'en',
  };

  const slug = slugify(title, options);

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

module.exports = {
  getAllNews,
  createNews,
  getOneNews,
};

// import model sme
const Sme = require('../../api/v1/smes/model');

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

const getAllSmes = async () => {
  const result = await Sme.find();

  return result;
};

const createSmes = async (req) => {
  const { name, owner, category, address, contact, maps, ecommerce } = req.body;

  const slug = slugify(name, slugOptions);

  const result = await Sme.create({
    name,
    slug,
    owner,
    category,
    address,
    contact,
    maps,
    ecommerce,
    photo: req.file ? `uploads/${req.file.filename}` : '',
  });

  return result;
};

const getOneSmes = async (req) => {
  const { slug } = req.params;

  const result = await Sme.findOne({ slug: slug });

  if (!result) throw new NotFoundError(`Tidak ada UMKM dengan nama ${slug}`);

  return result;
};

const updateSmes = async (req) => {
  const { id } = req.params;
  const { name, owner, category, address, contact, maps, ecommerce } = req.body;

  const existingSmes = await Sme.findOne({ _id: id });

  const slug = slugify(name, slugOptions);

  if (req.file && existingSmes.photo) {
    const previousPhotoPath = path.join(
      __basedir,
      'public',
      existingSmes.photo
    );
    fs.unlinkSync(previousPhotoPath);
  }

  const result = await Sme.findOneAndUpdate(
    { _id: id },
    {
      name,
      slug,
      owner,
      category,
      address,
      contact,
      maps,
      ecommerce,
      photo: req.file ? `uploads/${req.file.filename}` : existingSmes.photo,
    },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada UMKM dengan id` yang dikirim client
  if (!result) throw new NotFoundError(`Tidak ada UMKM dengan id: ${id}`);

  return result;
};

const deleteSmes = async (req) => {
  const { id } = req.params;

  const result = await Sme.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada UMKM dengan id: ${id}`);

  const photoPath = path.join(__basedir, 'public', result.photo);
  fs.unlinkSync(photoPath);

  await result.deleteOne();

  return result;
};

module.exports = {
  getAllSmes,
  createSmes,
  getOneSmes,
  updateSmes,
  deleteSmes,
};

const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let gallerySchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul foto harus diisi'],
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, 'Deskripsi harus diisi'],
    },
    photo: {
      type: String,
      required: [true, 'Foto harus ditambahkan'],
    },
  },
  { timestamps: true }
);

module.exports = model('Gallery', gallerySchema);

const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Judul berita atau informasi harus diisi'],
    },
    slug: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'Tanggal harus diisi'],
    },
    content: {
      type: String,
      required: [true, 'Isi konten berita atau informasi harus diisi'],
    },
    photo: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'Kategori harus diisi'],
    },
    // category: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'Category',
    //   required: true,
    // },
    // author: {
    //   type: mongoose.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = model('News', newsSchema);

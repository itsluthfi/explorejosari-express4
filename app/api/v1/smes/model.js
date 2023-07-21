const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let smeSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Nama UMKM harus diisi'],
    },
    slug: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: [true, 'Nama pemilik UMKM harus diisi'],
    },
    category: {
      type: String,
      required: [true, 'Kategori UMKM harus diisi'],
    },
    address: {
      type: String,
      required: [true, 'Alamat UMKM harus diisi'],
    },
    contact: {
      type: String,
      required: [true, 'Kontak UMKM harus diisi'],
    },
    maps: {
      type: String,
    },
    ecommerce: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model('Sme', smeSchema);

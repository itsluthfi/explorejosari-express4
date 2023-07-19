const express = require('express');
const router = express();
const { create, index, find, destroy } = require('./controller');
const upload = require('../../../middlewares/multer');

router.get('/galleries', index);
router.get('/galleries/:slug', find);
router.delete('/galleries/:id', destroy);
router.post('/galleries', upload.single('photo'), create);

module.exports = router;

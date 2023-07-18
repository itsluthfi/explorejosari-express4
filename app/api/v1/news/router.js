const express = require('express');
const router = express();
const { create, index, find } = require('./controller');
const upload = require('../../../middlewares/multer');

router.get('/news', index);
router.get('/news/:slug', find);
// router.put('/news/:id', update);
// router.delete('/news/:id', destroy);
router.post('/news', upload.single('photo'), create);

module.exports = router;

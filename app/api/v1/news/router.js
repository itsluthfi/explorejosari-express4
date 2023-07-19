const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const upload = require('../../../middlewares/multer');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/news', index);
router.get('/news/:slug', find);
router.put(
  '/news/:id',
  upload.single('photo'),
  authenticateUser,
  authorizeRoles('admin'),
  update
);
router.delete('/news/:id', authenticateUser, authorizeRoles('admin'), destroy);
router.post(
  '/news',
  upload.single('photo'),
  authenticateUser,
  authorizeRoles('admin'),
  create
);

module.exports = router;

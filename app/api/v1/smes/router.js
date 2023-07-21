const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');
const upload = require('../../../middlewares/multer');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/smes', index);
router.get('/smes/:slug', find);
router.put(
  '/smes/:id',
  upload.single('photo'),
  authenticateUser,
  authorizeRoles('admin'),
  update
);
router.delete('/smes/:id', authenticateUser, authorizeRoles('admin'), destroy);
router.post(
  '/smes',
  upload.single('photo'),
  authenticateUser,
  authorizeRoles('admin'),
  create
);

module.exports = router;

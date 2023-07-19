const express = require('express');
const router = express();
const { create, index, find, destroy } = require('./controller');
const upload = require('../../../middlewares/multer');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/galleries', index);
router.get('/galleries/:slug', find);
router.delete(
  '/galleries/:id',
  authenticateUser,
  authorizeRoles('admin'),
  destroy
);
router.post(
  '/galleries',
  upload.single('photo'),
  authenticateUser,
  authorizeRoles('admin'),
  create
);

module.exports = router;

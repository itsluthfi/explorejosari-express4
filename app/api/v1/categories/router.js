const express = require('express');
const router = express();
const { create, index, find, update, destroy } = require('./controller');

const {
  authenticateUser,
  authorizeRoles,
} = require('../../../middlewares/auth');

router.get('/categories', index);
router.get('/categories/:id', find);
router.put(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('admin'),
  update
);
router.delete(
  '/categories/:id',
  authenticateUser,
  authorizeRoles('admin'),
  destroy
);
router.post('/categories', authenticateUser, authorizeRoles('admin'), create);

module.exports = router;
